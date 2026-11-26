import test from "node:test";
import assert from "node:assert/strict";
import {runInNewContext} from "node:vm";
import {readFileSync} from "node:fs";
const page=readFileSync("Halls/french-high-school-unit01-instruction.html","utf8");
const hall=readFileSync("Halls/index.html","utf8");
const marker="const packs=",end=";\nconst themeCrosswalk";
function extract(){
 const a=page.indexOf(marker),b=page.indexOf(end,a);
 assert.ok(a>=0&&b>a,"Study companion source must retain literal four-grade data");
 return JSON.parse(page.slice(a+marker.length,b));
}
const p=extract();
const expectations={
 hs1:["greeting","accent","family","school","food","mission"],
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
   for(const [j,value] of l.entries())assert.ok(typeof value==="string"&&value.trim().length>=(j===0?10:35),
    "Missing instructional section "+course+" lesson "+(i+1)+" field "+j);
   assert.match(l[0].toLowerCase(),new RegExp(targets[i]));
   assert.ok(/[À-ÿ]|\b(?:le|la|les|je|nous|vous)\b/i.test(l[3]),"French model must use French");
  }
 });
}
test("Only French I–IV can navigate to the companion from the Hall",()=>{
 assert.match(hall,/state\.activeLanguage==="french"&&\["hs1","hs2","hs3","hs4"\]\.includes\(state\.activeCourse\)/);
 assert.ok(hall.includes("./french-high-school-unit01-instruction.html#"));
 assert.ok(page.includes("location.hash=next"));
 assert.ok(page.includes('Object.hasOwn(packs,id)'));
});
test("Companion preserves offline-friendly, learner-data-free practice",()=>{
 assert.ok(page.includes('lang="fr"'));
 assert.ok(page.includes("window.print()"));
 assert.ok(page.includes("aria-live"));
 assert.ok(!/localStorage|sessionStorage|indexedDB|fetch\(/.test(page));
 assert.ok(!/submitAssessment|gradeAttempt|save\(\)/.test(page));
});

// Execute the actual page navigation handlers with synthetic DOM state.
test("grade selection and hash navigation preserve drafts on cancellation",()=>{
 const start=page.indexOf("let activeGrade=grade.value;"),end=page.indexOf("function preparePrint(target)",start);
 assert.ok(start>=0&&end>start);
 const handlers={},windowHandlers={},draft={value:"synthetic student draft"},grade={value:"hs1",addEventListener:(name,fn)=>handlers[name]=fn};
 let renders=0,approved=false,prompts=0;
 const location={hash:"#hs1"},history={replaceState:(_a,_b,hash)=>{location.hash=hash;}};
 const window={confirm:()=>{prompts++;return approved;},addEventListener:(name,fn)=>windowHandlers[name]=fn};
 runInNewContext(page.slice(start,end),{grade,location,history,window,packs:p,lessons:{querySelectorAll:()=>[draft]},render:()=>{renders++;draft.value="";}});
 grade.value="hs2";handlers.change();assert.equal(grade.value,"hs1");assert.equal(location.hash,"#hs1");assert.equal(draft.value,"synthetic student draft");assert.equal(renders,0);
 location.hash="#hs3";windowHandlers.hashchange();assert.equal(grade.value,"hs1");assert.equal(location.hash,"#hs1");assert.equal(draft.value,"synthetic student draft");assert.equal(renders,0);
 location.hash="#invalid";windowHandlers.hashchange();assert.equal(grade.value,"hs1");assert.equal(renders,0);assert.equal(prompts,2);
 approved=true;grade.value="hs2";handlers.change();assert.equal(grade.value,"hs2");assert.equal(location.hash,"hs2");assert.equal(renders,1);
 location.hash="#hs2";windowHandlers.hashchange();assert.equal(renders,1);
 location.hash="#hs4";windowHandlers.hashchange();assert.equal(grade.value,"hs4");assert.equal(renders,2);
});
