import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {test} from "node:test";
const html=readFileSync(new URL("../apps/French_201_index.html",import.meta.url),"utf8");
const depth=JSON.parse(readFileSync(new URL("../data/french-201-unit01-lesson01-depth.json",import.meta.url),"utf8"));
const base=JSON.parse(readFileSync(new URL("../data/french-201-unit01.json",import.meta.url),"utf8"));
test("source Lesson 01 remains unchanged and extension is additive",()=>{
 assert.equal(base.lessons[0].id,"FR201-U01-L01");
 assert.equal(base.lessons[0].title,"Passer de la phrase au paragraphe");
 assert.equal(depth.lesson_id,base.lessons[0].id);
 assert.equal(depth.sections.length,4);assert.equal(depth.labs.length,3);
 assert.equal(depth.rubric.length,4);
 assert.match(html,/if\(chosen===1\)enhanceLesson01\(host\)/);
});
test("30 authored questions are unique, valid and balanced",()=>{
 assert.equal(depth.questions.length,30);
 assert.equal(new Set(depth.questions.map(q=>q.id)).size,30);
 assert.equal(new Set(depth.questions.map(q=>q.prompt)).size,30);
 for(const skill of depth.assessment.domains)assert.equal(depth.questions.filter(q=>q.skill===skill).length,6);
 for(const question of depth.questions){
  assert.ok(question.prompt.length>12);
  assert.equal(question.choices.length,3);
  assert.equal(new Set(question.choices).size,3);
  assert.ok(Number.isInteger(question.answer)&&question.answer>=0&&question.answer<3);
  assert.ok(question.explain.length>20);
 }
});
test("20 scored questions with 80% threshold and one-third reserve",()=>{
 assert.equal(depth.assessment.questions_per_attempt,20);
 assert.equal(depth.assessment.passing_correct,16);
 assert.equal(depth.questions.length>=Math.ceil(20*4/3),true);
 assert.equal(depth.assessment.certifies_formal_mastery,undefined);
 assert.equal(depth.assessment.formal_grade,false);
 for(const str of ["const draft={schema:\"fr201-l01-quiz-v1\"","orders:ids.map(()=>orderChoices())","new Set(d.ids).size===20","const scored=questions.map((q,i)=>d.answers[i]===q.answer)","correct>=16","renderWelcome()"])assert.ok(html.includes(str),str);
});
test("evidence stays separated from academic authority and past course results",()=>{
 assert.match(html,/khae\.fr201\.unit01\.evidence\.v1/);
 assert.match(html,/This is practice evidence only/);
 assert.match(html,/Formal assessments are/);
 assert.doesNotMatch(html,/arshif\.languageHall\.v4\.learner:.*setItem/);
});
test("single shared chrome and valid inline JavaScript",()=>{
 assert.equal((html.match(/linguistics-global-standard-v1\.js/g)||[]).length,1);
 assert.equal((html.match(/<header>/g)||[]).length,0);
 for(const [,src] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(src.trim())assert.doesNotThrow(()=>new Function(src));
});
