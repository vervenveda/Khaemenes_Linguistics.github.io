#!/usr/bin/env node
import {readFileSync} from "node:fs";
const hall=readFileSync("Halls/index.html","utf8");
const helper=readFileSync("assets/v4-learner-scope.js","utf8");
const topology=JSON.parse(readFileSync("data/course-topology.json","utf8"));
const sw=readFileSync("service-worker.js","utf8");
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};

check(hall.includes('../assets/v4-learner-scope.js'),"Hall does not load learner-scope helper");
check(hall.indexOf('../assets/v4-learner-scope.js')<hall.indexOf('const SCOPE=window.KhaemenesV4LearnerScope'),"Helper is not loaded before Hall scope use");
for(const id of ["openLearnerRecord","openSelectedLearner","openLegacyV4","assignLegacyV4","learnerRecordSelect","recordScopeStatus"])check(hall.includes('id="'+id+'"')||hall.includes('$("#'+id+'")'),"Hall learner control missing: "+id);
check(hall.includes("SCOPE.saveCurrent(state)"),"Hall save path is not scoped");
check(hall.includes("SCOPE.assignLegacy(name)"),"Hall lacks explicit legacy assignment");
check(hall.includes("SCOPE.clearCurrent()"),"Hall clear path is not current-record scoped");
check(!hall.includes("localStorage.setItem(KEY,JSON.stringify(state))"),"Hall still writes formal state directly to shared V4 key");
check(!hall.includes("localStorage.removeItem(KEY);state=fresh()"),"Hall still clears shared V4 directly");
check(helper.includes("legacySourcePreserved:true"),"Legacy assignment preservation marker missing");
check(helper.includes("if(safeGet(target)!==null)throw Error"),"Legacy assignment overwrite guard missing");

const v4=topology.record_authorities?.v4_five_language||{};
check(v4.learner_storage_prefix==="arshif.languageHall.v4.learner:","Topology missing named V4 learner prefix");
check(v4.legacy_storage_key==="arshif.languageHall.v4","Topology missing legacy shared key");
check(v4.active_learner_key==="arshif.languageHall.v4.activeLearner","Topology missing active learner key");
check(sw.includes("'./assets/v4-learner-scope.js'"),"Service worker does not cache learner-scope helper");

if(errors.length){console.error("V4_LEARNER_SCOPE_INTEGRATION=FAIL\n"+errors.map(x=>" - "+x).join("\n"));process.exitCode=1}
else console.log("V4_LEARNER_SCOPE_INTEGRATION=PASS; direct-shared-writes=0; legacy-assignment=explicit");
