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
const fresh=name=>({profile:{learner:name,home:"",teacher:""},activeLanguage:"spanish",activeCourse:"ms1",courses:{},foundationDone:{},favorites:{},notes:{},notebook:"",createdAt:"2026-10-29T12:00:00.000Z",updatedAt:"2026-10-29T12:00:00.000Z"});

localStorage.setItem(api.LEGACY_KEY,JSON.stringify({...fresh("Legacy Shared"),courses:{legacy:{complete:true}}}));
localStorage.setItem(api.OLD_V3_KEY,JSON.stringify({v3:"preserved"}));

let alice=api.openLearner("Alice",fresh);
alice.courses["spanish:ms1"]={complete:true};
alice.foundationDone["foundation-1"]=true;
api.saveCurrent(alice);
const backup=api.makeBackup(api.loadCurrent());
check(backup.format===api.BACKUP_FORMAT,"Backup format wrong");
check(backup.learner.label==="Alice","Backup learner label wrong");
check(backup.record.courses["spanish:ms1"].complete===true,"Backup lost course completion");

let bob=api.openLearner("Bob",fresh);
bob.courses["german:ms1"]={complete:true};
api.saveCurrent(bob);
const bobBefore=JSON.stringify(api.loadCurrent());

let crossRejected=false;
try{api.restoreBackup(backup)}catch{crossRejected=true}
check(crossRejected,"Alice backup restored into Bob");
check(JSON.stringify(api.loadCurrent())===bobBefore,"Rejected cross-learner restore changed Bob");

let rawSnapshotRejected=false;
try{api.validateBackup({schema:"arshif-language-hall-v4",profile:{learner:"Alice"}})}catch{rawSnapshotRejected=true}
check(rawSnapshotRejected,"Generic/legacy V4 snapshot was accepted as restore backup");

api.openById(api.idFor("Alice"));
let current=api.loadCurrent();
current.courses["french:101:beginner-v2"]={complete:false};
current.notebook="newer local work";
api.saveCurrent(current);
const beforeRestore=JSON.stringify(api.loadCurrent());

const restored=api.restoreBackup(backup);
check(restored.courses["spanish:ms1"].complete===true,"Matching restore lost backup course data");
check(restored.courses["french:101:beginner-v2"]===undefined,"Matching restore retained newer non-backup course data");
check(restored.notebook==="","Matching restore retained newer notebook data");
check(api.recoverySummary().available===1,"Pre-restore recovery snapshot missing");

const legacyAfter=localStorage.getItem(api.LEGACY_KEY);
const v3After=localStorage.getItem(api.OLD_V3_KEY);
api.openById(api.idFor("Bob"));
check(api.loadCurrent().courses["german:ms1"].complete===true,"Alice restore affected Bob");

api.openById(api.idFor("Alice"));
const undone=api.undoLastRestore();
check(JSON.stringify({...undone,recordScope:undefined,updatedAt:undefined})!==JSON.stringify({...restored,recordScope:undefined,updatedAt:undefined}),"Undo did not change restored record");
check(undone.notebook==="newer local work","Undo did not recover pre-restore notebook");
check(undone.courses["french:101:beginner-v2"].complete===false,"Undo did not recover pre-restore course state");
check(api.recoverySummary().available===0,"Undo did not consume latest recovery snapshot");
check(localStorage.getItem(api.LEGACY_KEY)===legacyAfter,"Backup/restore changed legacy shared V4");
check(localStorage.getItem(api.OLD_V3_KEY)===v3After,"Backup/restore changed V3");

let noRecoveryRejected=false;
try{api.undoLastRestore()}catch{noRecoveryRejected=true}
check(noRecoveryRejected,"Undo succeeded without a recovery snapshot");

const tampered=JSON.parse(JSON.stringify(backup));
tampered.learner.label="Mallory";
let tamperRejected=false;try{api.validateBackup(tampered)}catch{tamperRejected=true}
check(tamperRejected,"Tampered learner label was accepted");

const proto=JSON.parse(JSON.stringify(backup));
proto.record.courses={constructor:{polluted:true}};
let unsafeRejected=false;try{api.validateBackup(proto)}catch{unsafeRejected=true}
check(unsafeRejected,"Unsafe object key was accepted");

if(errors.length){
 console.error("V4_LEARNER_BACKUP=FAIL\n"+errors.map(x=>" - "+x).join("\n"));
 process.exitCode=1;
}else{
 console.log("V4_LEARNER_BACKUP=PASS; cross-learner=blocked; recovery=verified; legacy=preserved; V3=preserved");
}
