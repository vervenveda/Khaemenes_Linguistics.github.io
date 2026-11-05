#!/usr/bin/env node
/* Read-only regression contract for French 101 Unit 01 extension.
   Run: node scripts/test-french101-unit01.mjs
   Does not touch learner records, live pages or the authoritative V4 course. */
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {Script,runInNewContext} from "node:vm";
const main=readFileSync(new URL("../apps/French_101_index.html",import.meta.url),"utf8");
const extension=readFileSync(new URL("../apps/french101-unit01-extension.js",import.meta.url),"utf8");
let scripts=0;
for(const match of main.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)){
 if(match[1].trim()){new Script(match[1],{filename:"French_101_index.html inline "+scripts});scripts++;}
}
new Script(extension,{filename:"french101-unit01-extension.js"});
const ctx={window:{}};
const injected=extension.replace(
 "window.French101Unit01Extensions=Object.freeze",
 "window.__testLessons=LESSONS;window.French101Unit01Extensions=Object.freeze"
);
assert.notEqual(injected,extension,"Test hook must find the extension export.");
runInNewContext(injected,ctx);
const {numberWord,numberQuestions}=ctx.window.French101Unit01Extensions;
const lessons=ctx.window.__testLessons;
assert.equal(lessons.length,5);
assert.deepEqual(Array.from(lessons,l=>l.code),["A","B","C","D","E"]);
assert.equal(numberQuestions.length,30);
const ranges=[...Array(101).keys()].map(numberWord);
assert.equal(ranges.every(Boolean),true);
assert.equal(new Set(ranges).size,101,"Every integer 0–100 needs a unique spelling.");
for(const [n,expected] of Object.entries({
 0:"zéro",21:"vingt et un",31:"trente et un",41:"quarante et un",
 51:"cinquante et un",61:"soixante et un",70:"soixante-dix",
 71:"soixante et onze",72:"soixante-douze",79:"soixante-dix-neuf",
 80:"quatre-vingts",81:"quatre-vingt-un",90:"quatre-vingt-dix",
 91:"quatre-vingt-onze",95:"quatre-vingt-quinze",
 99:"quatre-vingt-dix-neuf",100:"cent"
}))assert.equal(numberWord(Number(n)),expected);
assert.equal(numberWord(-1),null);assert.equal(numberWord(101),null);
const bySkill=Object.create(null);
for(const q of numberQuestions){
 bySkill[q.skill]=(bySkill[q.skill]||0)+1;
 assert.equal(q.range,"21-100");
 assert.ok(q.explain);
 assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.choices.length);
 assert.equal(new Set(q.choices).size,q.choices.length,"No duplicate choices");
}
for(const name of ["recognition","writing","sequence","quantities","reasoning","transfer"])assert.equal(bySkill[name],5);
for(const lesson of lessons){
 assert.equal(lesson.q.length,10,lesson.code+" needs ten independently graded prompts");
 assert.ok(lesson.guide.length>=3&&lesson.reading&&lesson.prompts&&lesson.independent);
 for(const q of lesson.q){
  assert.ok(Number.isInteger(q[3])&&q[3]>=0&&q[3]<q[2].length);
  assert.equal(new Set(q[2]).size,q[2].length);
  assert.ok(q[4]);
 }
}
const match=main.match(/const FRENCH_101_UNIT01_CANONICAL_BANK=([\s\S]*?);\s*function frenchUnit01AssessmentKey/);
assert.ok(match,"Canonical checkpoint bank should exist");
const official=runInNewContext("("+match[1]+")");
assert.equal(official.length,42,"36 original + 6 higher-number items");
assert.equal(official.filter(q=>q.strand==="numbers"&&q.depth==="advanced").length,6);
for(const q of official)assert.ok(q.choices[q.answer]&&q.explain);
assert.match(main,/const passed=correct>=16/,"16 of 20 remains required");
assert.match(main,/questions:set,questionOrders/,"Below 80 retries must retain questions and option order");
assert.match(main,/mountUnit\(section,\{learnerKey,safeGet,safeSet,speakFR\}\)/);
assert.match(main,/mountNumbers\(sec,\{learnerKey,safeGet,safeSet,speakFR\}\)/);
assert.match(main,/french101-unit01-extension\.js/);
assert.match(main,/const totalLevels=12/,"Preserved level compatibility remains");
assert.match(main,/FRENCH_101_CANONICAL_SPINE/,"18-lesson canonical map remains");
assert.match(main,/let learnerKey="french101_progress"/,"Existing progress key remains");
assert.doesNotMatch(extension,/_canonical_unit01_assessment_v1|_canonical_midterm_v1|_assessment_attempts_v3/,"The extension may not write official/legacy stores");
console.log("PASS: French 101 Unit 01 extension: "+scripts+" inline scripts, 101 number forms, 30 advanced questions, 5 supplemental lessons, 50 questions, 42-item canonical bank, 80% gate, saved-key isolation.");
