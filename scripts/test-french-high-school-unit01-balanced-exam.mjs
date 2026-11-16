import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {FRENCH_HS_COURSES,examBlueprint,gradeAttempt} from "../assets/french-high-school-assessment-contract.mjs";
import {FRENCH_UNIT01_DOMAINS,FRENCH_UNIT01_DOMAIN_TOTALS,FRENCH_UNIT01_LESSON_QUOTAS,validateBalancedFrenchUnit01,drawBalancedFrenchUnit01,inspectBalancedFrenchUnit01Draw,gradeBalancedFrenchUnit01Attempt} from "../assets/french-high-school-unit01-balanced-exam.mjs";

function load(course){
 return Array.from({length:6},(_,i)=>JSON.parse(readFileSync(
  "data/french-"+course+"-unit01-lesson0"+(i+1)+"-bank.json","utf8"
 )).questions).flat();
}
test("distribution blueprint totals exactly 50 by lesson and domain",()=>{
 assert.deepEqual(FRENCH_UNIT01_LESSON_QUOTAS.map(r=>r.reduce((a,b)=>a+b,0)),[9,9,8,8,8,8]);
 assert.deepEqual(FRENCH_UNIT01_DOMAINS.map((_,d)=>FRENCH_UNIT01_LESSON_QUOTAS.reduce((sum,row)=>sum+row[d],0)),FRENCH_UNIT01_DOMAIN_TOTALS);
 assert.equal(FRENCH_UNIT01_LESSON_QUOTAS.flat().reduce((a,b)=>a+b,0),50);
});
for(const course of FRENCH_HS_COURSES){
 test(course+" six-lesson, three-domain balanced draft and retake",()=>{
  const questions=load(course),bp=examBlueprint(course,"unit",{unit:1});
  const check=validateBalancedFrenchUnit01(course,questions);
  assert.deepEqual(check.errors,[]);
  assert.equal(check.ready,true);
  assert.equal(check.examSize,50);
  assert.equal(check.minimumBank,67);
  assert.equal(check.officialStatus,"not-published");
  assert.deepEqual(check.counts,Array.from({length:6},()=>[9,9,9]));
  const first=drawBalancedFrenchUnit01(course,questions,{random:()=>0.418});
  const report=inspectBalancedFrenchUnit01Draw(first);
  assert.equal(report.balanced,true);
  assert.deepEqual(report.counts,FRENCH_UNIT01_LESSON_QUOTAS.map(row=>[...row]));
  assert.deepEqual(report.domainTotals,[17,17,16]);
  assert.equal(first.length,50);
  assert.equal(gradeBalancedFrenchUnit01Attempt(course,first,first.map(q=>q.answer)).passed,true);
  assert.equal(gradeBalancedFrenchUnit01Attempt(course,first,first.map(q=>q.answer)).gradingAuthority,
   "formative-only-no-learner-record-write");
  assert.throws(()=>gradeBalancedFrenchUnit01Attempt(course,first.slice(1),first.slice(1).map(q=>q.answer)),/Unbalanced/);
  assert.throws(()=>gradeBalancedFrenchUnit01Attempt(course,
   [{...first[0],id:"hs5-u01-l01-q999"},...first.slice(1)],first.map(q=>q.answer)),/wrong-course/);
  assert.throws(()=>gradeBalancedFrenchUnit01Attempt(course,first,first.map((q,i)=>i===0?99:q.answer)),/invalid Unit 01 responses/);

  assert.equal(gradeAttempt(bp,first,first.map(q=>q.answer)).score,50);
  assert.equal(gradeAttempt(bp,first,first.map(q=>(q.answer+1)%q.choices.length)).passed,false);
  assert.equal(gradeAttempt(bp,first,first.map((q,i)=>i<40?q.answer:(q.answer+1)%q.choices.length)).passed,true);
  assert.equal(gradeAttempt(bp,first,first.map((q,i)=>i<39?q.answer:(q.answer+1)%q.choices.length)).passed,false);
  const second=drawBalancedFrenchUnit01(course,questions,{previousIds:first.map(q=>q.id),random:()=>0.418});
  assert.equal(inspectBalancedFrenchUnit01Draw(second).balanced,true);
  assert.equal(second.filter(q=>first.some(p=>p.id===q.id)).length,0,
   "Full 162-item bank should supply a distinct second attempt");
  assert.throws(()=>drawBalancedFrenchUnit01(course,questions,{random:()=>1}),/Invalid random/);
  assert.throws(()=>drawBalancedFrenchUnit01(course,questions,{previousIds:[null]}),/Invalid retake/);
 });
 test(course+" rejects missing learning-domain cell despite ample total items",()=>{
  const bank=load(course);
  const missing=bank.filter(q=>!(q.lesson===6&&q.domain==="transfer"));
  assert.ok(missing.length>=67);
  const result=validateBalancedFrenchUnit01(course,missing);
  assert.equal(result.ready,false);
  assert.match(result.errors.join(" "),/lesson 6, domain transfer/);
  assert.throws(()=>drawBalancedFrenchUnit01(course,missing),/withheld/);
 });
 test(course+" rejects another grade's question and duplicate identifiers",()=>{
  const bank=load(course);
  const extra={...bank[0],id:"other-course-u01-l01-q999"};
  assert.equal(validateBalancedFrenchUnit01(course,[...bank,extra]).ready,false);
  assert.equal(validateBalancedFrenchUnit01(course,[...bank,bank[0]]).ready,false);
 });
}
test("scope is restricted to French I-IV only",()=>{
 assert.throws(()=>validateBalancedFrenchUnit01("101",[]));
 assert.throws(()=>drawBalancedFrenchUnit01("hs5",[]));
});
