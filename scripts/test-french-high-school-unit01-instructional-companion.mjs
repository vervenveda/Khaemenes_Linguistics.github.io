import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const page=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const hall=readFileSync("Halls/index.html","utf8");
const marker="const packs=",end=";\nfunction escapeHtml";
function extract(){
 const a=page.indexOf(marker),b=page.indexOf(end,a);
 assert.ok(a>=0&&b>a,"Study companion source must retain literal four-grade data");
 return JSON.parse(page.slice(a+marker.length,b));
}
const p=extract();
const expectations={
 hs1:["greeting","accent","family","class","food","mission"],
 hs2:["past","agreement","imparfait","pronoun","narrative","mission"],
 hs3:["evidence","counterargument","conditional","relative","sources","mission"],
 hs4:["memory","provenance","counterfactual","translation","archive","mission"]
};
for(const [course,targets] of Object.entries(expectations)){
 test(course+" has six independently authored instructional sections",()=>{
  const guide=p[course];
  assert.equal(guide.lessons.length,6);
  for(let i=0;i<6;i++){
   const l=guide.lessons[i];
   assert.equal(l.length,8,"A lesson requires title, objective, explanation, model, reading, practice, product and feedback");
   for(const [j,value] of l.entries())assert.ok(typeof value==="string"&&value.trim().length>=35,
    "Missing instructional section "+course+" lesson "+(i+1)+" field "+j);
   assert.match(l[0].toLowerCase(),new RegExp(targets[i]));
   assert.ok(/[À-ÿ]|\b(?:le|la|les|je|nous|vous)\b/i.test(l[3]),"French model must use French");
  }
 });
}
test("Only French I–IV can navigate to the companion from the Hall",()=>{
 assert.match(hall,/state\.activeLanguage==="french"&&\["hs1","hs2","hs3","hs4"\]\.includes\(state\.activeCourse\)/);
 assert.ok(hall.includes("./french-high-school-unit01-instruction.html#"));
 assert.ok(page.includes("location.hash=grade.value"));
 assert.ok(page.includes('Object.hasOwn(packs,id)'));
});
test("Companion preserves offline-friendly, learner-data-free practice",()=>{
 assert.ok(page.includes('lang="fr"'));
 assert.ok(page.includes("window.print()"));
 assert.ok(page.includes("aria-live"));
 assert.ok(!/localStorage|sessionStorage|indexedDB|fetch\(/.test(page));
 assert.ok(!/submitAssessment|gradeAttempt|save\(\)/.test(page));
});
