#!/usr/bin/env node
import {readFileSync} from "node:fs";
const read=p=>readFileSync(p,"utf8"),errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};
const bridge=read("assets/course-authority-bridge.js");
const french=read("apps/maitrise-constellation/index.html");
const german=read("apps/german-mastery-constellation/index.html");
const hall=read("Halls/index.html");
const topology=JSON.parse(read("data/course-topology.json"));
const sw=read("service-worker.js");

for(const token of [
 "khaemenes-course-authority-bridge-v1",
 "khaemenes.courseAuthorityBridge.v1:",
 "formalMasteryAwarded:false",
 "writesFormalRecord:false",
 "changesCompletion:false",
 "prepareFrench",
 "prepareGerman"
])check(bridge.includes(token),"Bridge contract missing "+token);

check(!bridge.includes('localStorage.setItem("arshif.languageHall.v4"'),"Bridge must not write V4 authority key");
check(!bridge.includes("r.complete=true"),"Bridge must not set V4 completion");
check(french.includes("../../assets/course-authority-bridge.js"),"French mastery page missing bridge");
check(german.includes("../../assets/course-authority-bridge.js"),"German mastery page missing bridge");
check(hall.includes("../assets/course-authority-bridge.js"),"Formal Hall missing bridge reader");
check(hall.includes("KhaemenesLanguageAuthorityContext"),"Formal Hall missing read-only bridge context");
check(sw.includes("'./assets/course-authority-bridge.js'"),"Bridge asset missing from offline shell");

const f=topology.principal_routes.find(x=>x.id==="french"),g=topology.principal_routes.find(x=>x.id==="german");
check(f?.bridge_status==="review-only-evidence-bridge-v1","French topology bridge status stale");
check(g?.bridge_status==="review-only-evidence-bridge-v1","German topology bridge status stale");

if(errors.length){console.error("AUTHORITY_BRIDGE=FAIL\n"+errors.map(x=>" - "+x).join("\n"));process.exitCode=1}
else console.log("AUTHORITY_BRIDGE=PASS; mode=review-only; V4-writes=0");
