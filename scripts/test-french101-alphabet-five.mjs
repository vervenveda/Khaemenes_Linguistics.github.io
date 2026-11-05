#!/usr/bin/env node
/* Repeatable, read-only five-part alphabet regression test.
   node scripts/test-french101-alphabet-five.mjs
   Does not access or mutate actual learner storage. */
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {runInNewContext,Script} from "node:vm";
const html=readFileSync(new URL("../apps/French_101_index.html",import.meta.url),"utf8");
const src=readFileSync(new URL("../apps/french101-alphabet-five.js",import.meta.url),"utf8");
const wrapper={window:{}};
const injected=src.replace("window.French101AlphabetFive=Object.freeze",
 "window.__alphabetTestLessons=L;window.French101AlphabetFive=Object.freeze");
assert.notEqual(injected,src,"Test hook must find the five-lesson export.");
new Script(src);
runInNewContext(injected,wrapper);
const lessons=wrapper.window.__alphabetTestLessons;
assert.equal(lessons.length,5);
assert.equal(lessons.map(x=>x.id).join(""),"ABCDE");
assert.equal(lessons.slice(0,4).map(x=>x.letters).join(""),"ABCDEFGHIJKLMNOPQRSTUVWXYZ");
assert.equal(new Set(lessons.slice(0,4).flatMap(x=>[...x.letters])).size,26);
assert.equal(lessons[4].letters,"ÉÈÊËÇ");
for(const part of lessons){
 assert.equal(part.q.length,10,part.id+" should have 10 questions");
 assert.ok(part.guide.length>=3&&part.read&&part.gloss&&part.ask&&part.task);
 for(const [prompt,choices,index,why] of part.q){
  assert.ok(prompt&&why);
  assert.equal(choices.length,3);
  assert.ok(Number.isInteger(index)&&index>=0&&index<3);
  assert.equal(new Set(choices).size,3);
 }
}
assert.match(html,/french101-alphabet-five\.js/);
assert.match(html,/French101AlphabetFive\?\.mount\(section,\{learnerKey,safeGet,safeSet,speakFR\}\)/);
assert.match(html,/French101AlphabetFive\?\.mountMenu\(section/);
assert.match(html,/french-alphabet-legacy/);
assert.match(html,/let learnerKey="french101_progress"/);
assert.match(html,/const totalLevels=12/);
assert.match(html,/FRENCH_101_CANONICAL_SPINE/);
assert.match(html,/"day":2,"title":"Numbers · 0–100"/);
assert.doesNotMatch(src,/_canonical_unit01_assessment_v1|_canonical_midterm_v1|_assessment_attempts_v3/);
const inline=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
for(const [i,tag] of inline.entries()){if(tag[1].trim())new Script(tag[1],{filename:"French_101_index inline "+i});}
console.log("PASS · Five alphabet sessions A–E · 26 letters · 50 answer-keyed items · preservation & syntax.");
