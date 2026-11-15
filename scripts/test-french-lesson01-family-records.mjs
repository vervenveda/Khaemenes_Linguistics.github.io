import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {test} from "node:test";
const f101=readFileSync(new URL("../apps/French_101_index.html",import.meta.url),"utf8");
const f201=readFileSync(new URL("../apps/French_201_index.html",import.meta.url),"utf8");
test("both pages preserve their existing lesson curriculum and quizzes",()=>{
 for(const [source,markers] of [[f101,["function addAlphabetDailyLesson(parent)","function canonicalQuiz(n)","function frenchAssessmentRun(config)","function frenchAssessmentDraftKey(config)"]],
 [f201,["function lesson01Quiz(root,data)","function enhanceLesson01(host)","function saveField(field,value)","fetch(\"../data/french-201-unit01.json\")"]]])
  for(const marker of markers)assert.ok(source.includes(marker),marker);
});
test("French 101 lesson one report uses original record keys without rewriting grades",()=>{
 for(const suffix of ["_u01_d01_assignment","_u01_d01_dialogue_v1","_u01_d01_corrections_v1",
 "_u01_d01_spelling_v1","_u01_d01_oral_observation_v1","_u01_d01_performance_feedback_v1",
 "_canonical_lesson01_mastery_v1","_canonical_lesson01_attempts_v1",
 "_canonical_lesson01_mastery_v1_inprogress_v1","_canonical_unit01_assessment_v1",
 "_canonical_lesson_checklist_v1"])assert.ok(f101.includes(suffix),suffix);
 for(const marker of ["function french101Lesson01Summary()","function french101Lesson01RawRecords()",
 "french101Lesson01FamilyPanel()","Export complete Lesson 01 report & source records"])
  assert.ok(f101.includes(marker),marker);
 const reportSource=f101.slice(f101.indexOf("/* French 101 Lesson 01 —"),f101.indexOf("let currentLevel=null;"));
 assert.doesNotMatch(reportSource,/localStorage\.setItem\(/);
 assert.doesNotMatch(reportSource,/safeSet\(/);
});
test("French 201 family export includes original writing, attempts and unfinished quizzes",()=>{
 for(const marker of [
  "function french201Lesson01Records()","function french201FamilySummary()","function french201ExportFullReport()",
  "quiz-draft-v1","attempts-v1","all_unit01_evidence:state","raw_quiz_records:records",
  "formal_grade:false","function french201RenderFamilyReport()","Refresh student progress",
  '$(\"export\").addEventListener(\"click\",french201ExportFullReport)'
 ])assert.ok(f201.includes(marker),marker);
 assert.doesNotMatch(f201.slice(f201.indexOf("/* French 201 Lesson 01 —"),f201.indexOf("function openDesk()")),/localStorage\.setItem\(/);
});
test("no formal grade fabrication or crossover between source keys",()=>{
 assert.ok(f101.includes("canonicalRecord(n)"));
 assert.ok(f201.includes("This is practice evidence only"));
 assert.ok(f201.includes("not synced to a parent cloud"));
 assert.doesNotMatch(f201,/localStorage\.setItem\(\s*["']french101/);
 assert.doesNotMatch(f101.slice(f101.indexOf("/* French 101 Lesson 01 —"),f101.indexOf("let currentLevel=null;")),/khae\.fr201/);
});
test("all inline scripts pass syntax checks",()=>{
 for(const html of [f101,f201])for(const [,code] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)){
  if(code.trim())assert.doesNotThrow(()=>new Function(code));
 }
});
