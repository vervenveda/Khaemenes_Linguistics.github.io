import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FRENCH_HS_COURSES,examBlueprint,validateAssessmentBank,drawAssessment,gradeAttempt} from "../assets/french-high-school-assessment-contract.mjs";

const allPrompts=[];
for(const course of FRENCH_HS_COURSES){
 test(course+" Unit 01 Lesson 02 draft bank contract",()=>{
  const bank=JSON.parse(readFileSync("data/french-"+course+"-unit01-lesson02-bank.json","utf8"));
  assert.equal(bank.course,course);
  assert.equal(bank.unit,1);
  assert.equal(bank.lesson,2);
  assert.equal(bank.status,"authoring-review-not-published");
  assert.equal(bank.editorialReview,"assistant-initial-editorial-pass-independent-review-pending");
  assert.equal(bank.questions.length,27);
  const bp=examBlueprint(course,"lesson",{lesson:2});
  const validation=validateAssessmentBank(bp,bank.questions);
  assert.deepEqual(validation.errors,[]);
  assert.equal(validation.ready,true);
  for(const domain of ["language-use","interpretation","transfer"]){
    assert.equal(bank.questions.filter(q=>q.domain===domain).length,9);
  }
  for(const index of [0,1,2])assert.equal(bank.questions.filter(q=>q.answer===index).length,9);
  const prompts=bank.questions.map(q=>q.prompt.normalize("NFC").toLowerCase().trim());
  assert.equal(new Set(prompts).size,27);
  allPrompts.push(...prompts);
  const first=drawAssessment(bp,bank.questions,{random:()=>0.43});
  assert.equal(first.length,20);
  assert.equal(new Set(first.map(q=>q.id)).size,20);
  assert.equal(gradeAttempt(bp,first,first.map(q=>q.answer)).passed,true);
  assert.equal(gradeAttempt(bp,first,first.map(q=>(q.answer+1)%q.choices.length)).passed,false);
  assert.throws(()=>gradeAttempt(bp,first,first.map(q=>q.answer).slice(1)));
  const second=drawAssessment(bp,bank.questions,{previousIds:first.map(q=>q.id),random:()=>0.43});
  assert.equal(second.filter(q=>!first.some(f=>f.id===q.id)).length,7);
 });
}
test("Lesson 02 authored prompts are unique across all four courses",()=>{
 assert.equal(allPrompts.length,108);
 assert.equal(new Set(allPrompts).size,108);
});
test("Critical grammar, agreement and source-attribution distinctions are retained",()=>{
 const load=c=>JSON.parse(readFileSync("data/french-"+c+"-unit01-lesson02-bank.json","utf8")).questions;
 const keyed=(c,i)=>{const q=load(c)[i-1];return q.choices[q.answer]};
 assert.equal(keyed("hs1",5),"J");
 assert.equal(keyed("hs1",6),"G");
 assert.equal(keyed("hs2",3),"partis");
 assert.equal(keyed("hs2",4),"arrivées");
 assert.equal(keyed("hs3",3),"Bien que");
 assert.equal(keyed("hs3",12),"That the campaign caused the reduction.");
 assert.equal(keyed("hs4",1),"The original dated meeting minutes.");
 assert.equal(keyed("hs4",8),"Le document aurait été rédigé vers 1920.");
});
