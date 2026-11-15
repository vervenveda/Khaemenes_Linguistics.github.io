import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
const source=readFileSync(new URL("../apps/French_101_index.html",import.meta.url),"utf8");
const guideStart=source.indexOf("/* French 101 Lesson 01: nine-stage, non-destructive navigation pilot. */");
const lessonStart=source.indexOf("function addAlphabetDailyLesson(parent){");
assert.ok(guideStart>=0&&lessonStart>guideStart,"Guide must precede the original Lesson 01 renderer");
const guide=source.slice(guideStart,lessonStart);
const required=[
 "Orientation","Discover","Listen & Observe","Guided Practice","Read & Understand",
 "Create & Communicate","Practice Laboratory","Review & Corrections","Save, Print & Continue"
];
for(const title of required)assert.ok(guide.includes('"'+title+'"'),"Missing learning stage: "+title);
assert.ok(source.includes("enhanceFrenchEarlyStudio(section,1);addFrenchLesson01StageGuide(section);parent.append(section);"),"Guide must be additive and placed after original learning tools");
assert.ok(guide.includes('button.type="button"'),"Stage jumps must not submit forms");
assert.ok(guide.includes('setAttribute("aria-controls"'),"Stage jumps require declared targets");
assert.ok(guide.includes('dest.focus({preventScroll:true})'),"Stage jumps require keyboard focus");
assert.ok(guide.includes("@media print"),"Navigation must not print");
for(const key of ["_u01_d01_assignment","_u01_d01_dialogue_v1","_u01_d01_corrections_v1","_u01_d01_spelling_v1","_u01_d01_oral_observation_v1","_u01_d01_performance_feedback_v1"]){
 assert.ok(source.includes(key),"Student work key absent: "+key);
}
assert.ok(source.includes("function openCanonicalUnit01Assessment()"),"Original canonical checkpoint missing");
assert.ok(source.includes("function openQuiz(level)"),"Legacy level quizzes missing");
console.log("FRENCH101_LESSON01_STAGE_GUIDE=SOURCE_PASS; runtime-and-accessibility-QA=pending");
