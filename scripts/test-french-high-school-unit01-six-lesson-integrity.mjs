import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FRENCH_HS_COURSES,examBlueprint,validateAssessmentBank,drawAssessment,gradeAttempt} from "../assets/french-high-school-assessment-contract.mjs";

const allIds=new Set();
for(const course of FRENCH_HS_COURSES){
 test(course+" Unit 01 six-lesson authored source audit",()=>{
  const banks=Array.from({length:6},(_,i)=>JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson0"+(i+1)+"-bank.json","utf8")));
  const questions=[];
  for(let i=0;i<banks.length;i++){
   const b=banks[i],lesson=i+1;
   assert.equal(b.course,course);assert.equal(b.unit,1);assert.equal(b.lesson,lesson);
   assert.equal(b.status,"authoring-review-not-published");
   assert.equal(b.questions.length,27);
   const bp=examBlueprint(course,"lesson",{lesson});
   assert.deepEqual(validateAssessmentBank(bp,b.questions).errors,[]);
   for(const domain of ["language-use","interpretation","transfer"]){
    assert.equal(b.questions.filter(q=>q.domain===domain).length,9);
   }
   for(const answer of [0,1,2])assert.equal(b.questions.filter(q=>q.answer===answer).length,9);
   questions.push(...b.questions);
  }
  assert.equal(questions.length,162);
  assert.equal(new Set(questions.map(q=>q.id)).size,162);
  assert.equal(new Set(questions.map(q=>q.prompt.normalize("NFC").trim().toLowerCase())).size,162);
  for(const q of questions){assert.ok(!allIds.has(q.id),"Question identity reused across grades: "+q.id);allIds.add(q.id);}
  const unit=examBlueprint(course,"unit",{unit:1});
  const validated=validateAssessmentBank(unit,questions);
  assert.deepEqual(validated.errors,[]);
  assert.equal(validated.ready,true);
  // The contract is formative-only, not a permission to administer or grant mastery.
  assert.equal(unit.officialStatus,"not-published");
  const first=drawAssessment(unit,questions,{random:()=>0.37});
  assert.equal(first.length,50);
  assert.equal(new Set(first.map(q=>q.id)).size,50);
  assert.equal(gradeAttempt(unit,first,first.map(q=>q.answer)).passed,true);
  assert.equal(gradeAttempt(unit,first,first.map(q=>(q.answer+1)%q.choices.length)).passed,false);
  const next=drawAssessment(unit,questions,{previousIds:first.map(q=>q.id),random:()=>0.37});
  assert.equal(next.filter(q=>!first.some(p=>p.id===q.id)).length,50);
 });
}
test("Unit 01 retains four distinct grades, each with six banks",()=>{
 assert.equal(allIds.size,648);
});
