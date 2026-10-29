#!/usr/bin/env node
import {readFileSync} from "node:fs";
import vm from "node:vm";

const code=readFileSync("assets/v4-learner-scope.js","utf8");
class Store{
 constructor(){this.m=new Map()}
 getItem(k){return this.m.has(k)?this.m.get(k):null}
 setItem(k,v){this.m.set(String(k),String(v))}
 removeItem(k){this.m.delete(String(k))}
 key(i){return [...this.m.keys()][i]??null}
 get length(){return this.m.size}
}
const localStorage=new Store(),window={};
vm.runInNewContext(code,{window,localStorage,Date,JSON,String,Array,Object,Error});
const api=window.KhaemenesV4LearnerScope,errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};
check(Boolean(api),"Scope API missing");

const legacy={profile:{learner:"Old Shared Name",home:"",teacher:""},courses:{"french:101:beginner-v2":{complete:true}},foundationDone:{},favorites:{},notes:{},notebook:"",createdAt:"2026-01-01T00:00:00.000Z",updatedAt:"2026-01-01T00:00:00.000Z"};
localStorage.setItem(api.LEGACY_KEY,JSON.stringify(legacy));
localStorage.setItem(api.OLD_V3_KEY,JSON.stringify({sentinel:"v3"}));

check(api.currentMode()==="legacy-shared","Initial mode should remain legacy shared");
check(api.loadCurrent().courses["french:101:beginner-v2"].complete===true,"Legacy record not readable");

const fresh=(label)=>({profile:{learner:label,home:"",teacher:""},activeLanguage:"spanish",activeCourse:"ms1",courses:{},foundationDone:{},favorites:{},notes:{},notebook:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
const alice=api.openLearner("Alice",fresh);
api.saveCurrent({...alice,courses:{"spanish:ms1":{complete:true}}});
const aliceKey=api.currentKey();
check(aliceKey!==api.LEGACY_KEY,"Alice still uses shared key");
check(JSON.parse(localStorage.getItem(aliceKey)).courses["spanish:ms1"].complete===true,"Alice save failed");

api.openLearner("Bob",fresh);
check(api.loadCurrent().courses["spanish:ms1"]===undefined,"Bob inherited Alice course evidence");
api.saveCurrent({...api.loadCurrent(),courses:{"german:ms1":{complete:true}}});
const bobKey=api.currentKey();
check(bobKey!==aliceKey,"Alice and Bob keys collided");

api.openById(api.idFor("Alice"));
check(api.loadCurrent().courses["spanish:ms1"].complete===true,"Alice record changed after Bob work");
check(api.loadCurrent().courses["german:ms1"]===undefined,"Bob evidence leaked into Alice");

api.openLegacy();
check(api.loadCurrent().courses["french:101:beginner-v2"].complete===true,"Legacy shared record was altered by learner work");

const carol=api.assignLegacy("Carol");
check(carol.courses["french:101:beginner-v2"].complete===true,"Explicit legacy assignment did not clone course evidence");
check(JSON.parse(localStorage.getItem(api.LEGACY_KEY)).courses["french:101:beginner-v2"].complete===true,"Legacy source was removed/changed during assignment");
let overwriteBlocked=false;try{api.assignLegacy("Carol")}catch{overwriteBlocked=true}
check(overwriteBlocked,"Legacy assignment overwrote an existing learner");

const carolKey=api.currentKey();
api.clearCurrent();
check(localStorage.getItem(carolKey)===null,"Current named record was not cleared");
check(localStorage.getItem(aliceKey)!==null,"Clearing Carol deleted Alice");
check(localStorage.getItem(bobKey)!==null,"Clearing Carol deleted Bob");
check(localStorage.getItem(api.LEGACY_KEY)!==null,"Clearing Carol deleted legacy shared V4");
check(localStorage.getItem(api.OLD_V3_KEY)!==null,"Learner operations deleted V3");

api.openLegacy();
api.clearCurrent();
check(localStorage.getItem(api.LEGACY_KEY)===null,"Explicit legacy clear failed");
check(localStorage.getItem(aliceKey)!==null&&localStorage.getItem(bobKey)!==null,"Legacy clear deleted named learners");
check(localStorage.getItem(api.OLD_V3_KEY)!==null,"Legacy clear deleted V3");

if(errors.length){console.error("V4_LEARNER_SCOPE=FAIL\n"+errors.map(x=>" - "+x).join("\n"));process.exitCode=1}
else console.log("V4_LEARNER_SCOPE=PASS; learners-isolated=2; legacy-copy=non-destructive; V3=preserved");
