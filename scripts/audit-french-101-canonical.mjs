#!/usr/bin/env node
import {readFileSync} from "node:fs";

const source=readFileSync("apps/French_101_index.html","utf8");
const hall=readFileSync("Halls/index.html","utf8");
const map=JSON.parse(readFileSync("data/french-101-curriculum.json","utf8"));
const topology=JSON.parse(readFileSync("data/course-topology.json","utf8"));
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};

check(map.lessons.length===18,"canonical map must contain 18 lessons");
check(map.units.length===6&&map.units.every(u=>u.lessons.length===3),"canonical map must contain six three-lesson units");
check(map.lessons.filter(x=>x.status==="developed").map(x=>x.lesson).join(",")==="1,2,3,4,5,6,7,8,9,10,11,12","developed lesson set must be 01–12");
check(map.lessons.find(x=>x.lesson===13)?.status==="next-development","Lesson 13 must be next-development");
check(map.preservation.no_retroactive_downgrade===true,"no-retroactive-downgrade rule missing");
check(map.reviewer_roles.privileged_account_required===false,"soft reviewer role rule missing");

for(const n of [9,10,11,12]){
 const names={9:"DESCRIPTIONS",10:"TIME",11:"CAFE",12:"OBJECTS"};
 const bankName="FRENCH_U01_L"+String(n).padStart(2,"0")+"_"+names[n]+"_BANK";
 check(source.includes("const "+bankName+"=["),"missing "+bankName);
 check(source.includes("function addFrenchLesson"+String(n).padStart(2,"0")),"missing canonical Lesson "+n+" studio");
 check(source.includes("_u01_day"+n+"_writing"),"legacy Lesson "+n+" writing key not preserved");
}
check(source.includes('"title":"Useful sound combinations"'),"legacy Day 09 source missing");
check(source.includes('"title":"Spelling names in conversation"'),"legacy Day 10 source missing");
check(source.includes('"title":"Reading and copying unfamiliar words"'),"legacy Day 11 source missing");
check(source.includes('"title":"Pronunciation in greetings"'),"legacy Day 12 source missing");
check(source.includes('d.day>=13?"Archive · Earlier'),"Lessons 13–15 are not clearly archival");
check(source.includes("Compatibility Unit 01 Checkpoint · 80% Knowledge Gate"),"compatibility checkpoint not labeled");
check(source.includes("French 101 — Preserved 12-Level Final Exam"),"legacy final not labeled");
check(source.includes("Lessons 01–12 are developed in the current curriculum"),"current lesson-library status wrong");

for(const block of ["Lessons 01–03","Lessons 04–06","Lessons 07–09","Lessons 10–12","Lessons 13–15","Lessons 16–18"])check(hall.includes(block),"V4 Hall missing "+block);
check(hall.includes("KH-LANG-FR-101-2026"),"V4 Hall curriculum ID missing");
check(topology.curriculum_contracts?.french_101?.path==="data/french-101-curriculum.json","topology curriculum contract missing");

if(errors.length){console.error("FRENCH_101_CANONICAL=FAIL\n"+errors.map(x=>" - "+x).join("\n"));process.exitCode=1}
else console.log("FRENCH_101_CANONICAL=PASS; lessons-developed=12/18; legacy-progress=preserved; next=13");
