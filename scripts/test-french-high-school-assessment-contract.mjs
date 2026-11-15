import test from "node:test";
import assert from "node:assert/strict";
import {FRENCH_HS_COURSES,FRENCH_HS_EXAMS,examBlueprint,validateAssessmentBank,drawAssessment,gradeAttempt} from "../assets/french-high-school-assessment-contract.mjs";

function bank(bp,n=bp.minimumBank){
 const questions=[];
 for(let i=0;i<n;i++){
  const lesson=bp.kind==="lesson"?bp.lesson:
   bp.units[(i%bp.units.length)]*6-5+Math.floor(i/bp.units.length)%6;
  questions.push({id:bp.course+"-"+bp.kind+"-"+String(bp.unit??0)+"-"+String(bp.lesson??0)+"-"+i,
   prompt:"Select the correct French meaning for scenario number "+i,
   choices:["Le premier exemple "+i,"Le deuxième exemple "+i,"Le troisième exemple "+i],
   answer:i%3,explanation:"This choice fits the specific contextual task "+i+".",
   domain:i%2?"interpretation":"language-use",unit:Math.ceil(lesson/6),lesson});
 }
 return questions;
}
for(const course of FRENCH_HS_COURSES){
 test(course+" shared four-stage contract",()=>{
  for(const [kind,spec] of Object.entries(FRENCH_HS_EXAMS)){
   const bp=examBlueprint(course,kind,{unit:1,lesson:1});
   assert.equal(bp.questions,spec.questions);
   assert.equal(bp.minimumCorrect,Math.ceil(bp.questions*0.8));
   assert.equal(bp.minimumBank,Math.ceil(bp.questions*4/3));
   assert.equal(bp.officialStatus,"not-published");
   const questions=bank(bp);
   assert.equal(validateAssessmentBank(bp,questions).ready,true);
   assert.equal(validateAssessmentBank(bp,questions.slice(1)).ready,false);
   assert.equal(validateAssessmentBank(bp,[...questions,questions[0]]).ready,false);
   const out=drawAssessment(bp,questions,{random:()=>0.42});
   assert.equal(out.length,bp.questions);
   assert.equal(new Set(out.map(q=>q.id)).size,out.length);
   assert.equal(gradeAttempt(bp,out,out.map(q=>q.answer)).passed,true);
   assert.equal(gradeAttempt(bp,out,out.map(q=>(q.answer+1)%q.choices.length)).passed,false);
   assert.throws(()=>gradeAttempt(bp,out,out.map(q=>q.answer).slice(1)));
   assert.throws(()=>drawAssessment(bp,questions,{random:()=>1}));
  }
 });
}
test("scope and input fail closed",()=>{
 assert.throws(()=>examBlueprint("hs5","lesson",{lesson:1}));
 assert.throws(()=>examBlueprint("hs1","lesson",{lesson:0}));
 assert.throws(()=>examBlueprint("hs1","unit",{unit:7}));
 const bp=examBlueprint("hs1","lesson",{lesson:1}),qs=bank(bp);
 qs[0].explanation="";
 assert.equal(validateAssessmentBank(bp,qs).ready,false);
 qs[0].explanation="Explanation restored with sufficient detail.";
 qs[0].unit=2;
 assert.equal(validateAssessmentBank(bp,qs).ready,false);
});
test("retakes prioritize previously unseen questions",()=>{
 const bp=examBlueprint("hs2","lesson",{lesson:1}),qs=bank(bp);
 const first=drawAssessment(bp,qs,{random:()=>0.3});
 const second=drawAssessment(bp,qs,{previousIds:first.map(q=>q.id),random:()=>0.3});
 assert.equal(second.length,20);
 assert.equal(second.filter(q=>!first.some(p=>p.id===q.id)).length,7);
});
