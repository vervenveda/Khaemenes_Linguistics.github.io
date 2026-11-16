import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const hall=readFileSync("Halls/index.html","utf8");
const crosswalk=JSON.parse(readFileSync("data/french-high-school-unit01-pilot-theme-crosswalk.json","utf8"));
function embedded(name,next){
 const start=html.indexOf("const "+name+"="),end=html.indexOf(";\n"+next,start);
 assert.ok(start>=0&&end>start,name+" literal source exists");
 return JSON.parse(html.slice(start+("const "+name+"=").length,end));
}
const pageCrosswalk=embedded("themeCrosswalk","function escapeHtml");
const lessons=embedded("packs","const themeCrosswalk");
const official={
 hs1:{title:"French I · Novice-High Francophone Communication",themes:["identity","school/work","food","city life","travel","traditions"]},
 hs2:{title:"French II · Narration & Everyday Complexity",themes:["past experiences","home/community","health","media","services","travel problems"]},
 hs3:{title:"French III · Opinions & Francophone Perspectives",themes:["education","environment","technology","arts","food systems","community issues"]},
 hs4:{title:"French IV · Advanced High-School Communication",themes:["identity & migration","history/memory","science","literature/film","civic life","global issues"]}
};
test("crosswalk mirror exactly matches its source document",()=>{
 assert.deepEqual(pageCrosswalk,crosswalk);
 assert.equal(crosswalk.status,"draft-review-required-not-authoritative");
 assert.equal(crosswalk.pilotLessonsAreOfficialWeeks,false);
 assert.equal(crosswalk.hallPhaseSequence.length,6);
});
for(const [course,spec] of Object.entries(official)){
 test(course+" uses the original Hall themes without shifting weeks or completion",()=>{
  assert.ok(hall.includes('"title":"'+spec.title+'","themes":'+JSON.stringify(spec.themes)));
  assert.deepEqual(crosswalk.courses[course].themes,spec.themes);
  assert.equal(crosswalk.courses[course].lessons.length,6);
  assert.equal(lessons[course].lessons.length,6);
  for(const [i,l] of crosswalk.courses[course].lessons.entries()){
   assert.ok(l.officialUnits.length>=1);
   assert.equal(new Set(l.officialUnits).size,l.officialUnits.length);
   assert.ok(l.officialUnits.every(n=>Number.isInteger(n)&&n>=1&&n<=6));
   assert.ok(["within-primary-theme","cross-unit-extension","cross-unit-integration","context-revision-required"].includes(l.status));
   assert.ok(l.note.trim().length>=35);
  }
 });
}
test("known first-unit mismatches remain explicitly visible",()=>{
 assert.equal(crosswalk.courses.hs1.lessons[3].status,"cross-unit-extension");
 assert.deepEqual(crosswalk.courses.hs1.lessons[4].officialUnits,[3]);
 assert.ok(crosswalk.courses.hs3.lessons.slice(0,5).every(x=>x.status==="context-revision-required"));
 assert.ok(crosswalk.courses.hs4.lessons.slice(0,3).every(x=>x.status==="context-revision-required"));
});
test("presentation exposes crosswalk and preserves local data boundaries",()=>{
 assert.ok(html.includes("Original Hall theme mapping (provisional)"));
 assert.ok(html.includes("Teaching-context revision required"));
 assert.ok(html.includes("Cross-unit pilot extension"));
 assert.ok(html.includes("LESSON01_BLUEPRINT"));
 assert.ok(html.includes("p.lessons.map(renderLesson).join"));
 assert.ok(!/localStorage|sessionStorage|indexedDB|fetch\(/.test(html));
 assert.ok(!html.includes("r.complete=true"));
});
