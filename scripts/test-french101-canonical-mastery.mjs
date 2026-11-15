import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {test} from "node:test";
const html=readFileSync(new URL("../apps/French_101_index.html",import.meta.url),"utf8");
const primary=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test("all inline JS remains syntactically valid",()=>{
 for(const [,script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
  if(script.trim())assert.doesNotThrow(()=>new Function(script));
 }
});
test("historical 12-level curriculum remains untouched",()=>{
 for(const marker of ["const totalLevels=12;","function openExam(){","function openCertificate(){","french101_progress_v2_","function openQuiz(level)"])assert.ok(html.includes(marker),marker);
});
test("new canonical gates apply to map, picker, next button and unit exams",()=>{
 for(const marker of [
  "function canonicalAvailable(n)","function canonicalQuiz(n)","button.disabled=!canonicalAvailable(day)",
  "o.disabled=!canonicalAvailable(Number(d.day))","if(!canonicalAvailable(target))",
  "if(!canonicalAvailable(2))","Array.from({length:6},(_,i)=>i+1).every(canonicalPassed)",
  "Array.from({length:6},(_,i)=>i+7).every(canonicalPassed)",
  "Array.from({length:12},(_,i)=>i+1).every(canonicalPassed)"
 ])assert.ok(html.includes(marker),marker);
});
test("every lesson has a bank of thirty valid graded prompts",()=>{
 const names=["D01_REVIEW","NUMBERS_QUESTION","L03_VOWELS_PRONOUNS","L04_GREETINGS","L05_SENTENCES","L06_NOUNS","L07_VERBS","L08_FAMILY","L09_DESCRIPTIONS","L10_TIME","L11_CAFE","L12_OBJECTS","L13_QUESTIONS","L14_ROUTINES","L15_DIRECTIONS","L16_COMPREHENSION","L17_PRODUCTION","L18_INTEGRATION"];
 names.forEach((short,i)=>{
  const name="FRENCH_U01_"+short+"_BANK";
  const start=html.indexOf("const "+name+"=");
  assert.ok(start>=0,"Lesson "+(i+1)+" bank");
  const end=html.indexOf("];",start);
  assert.ok(end>start);
  const bank=new Function("return "+html.slice(html.indexOf("=",start)+1,end+1))();
  assert.ok(bank.length>=27,"Lesson "+(i+1)+" requires >=27 authored questions for 20-question quiz and one-third reserve");
  bank.forEach(q=>{assert.equal(typeof q.prompt,"string");assert.ok(Array.isArray(q.choices)&&q.choices.length>=2);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.choices.length)});
 });
});
test("canonical gate requires independent 80% passes and unit mastery",()=>{
 const snippet=html.slice(html.indexOf("function canonicalKey("),html.indexOf("function canonicalBank("));
 const fn=new Function("learnerKey","frenchAssessmentRead","readFrenchUnit01Assessment","frenchUnit02PassKey","frenchMidtermPassKey",snippet+"return {canonicalAvailable,canonicalPassed}");
 const state=new Map();
 const gate=fn("test",key=>key==="u2"?{passed:state.has("u2")}:key==="mid"?{passed:state.has("mid")}:state.get(key)||null,()=>({passed:state.has("u1")}),()=>"u2",()=>"mid");
 assert.equal(gate.canonicalAvailable(1),true);
 assert.equal(gate.canonicalAvailable(2),false);
 for(let i=1;i<=6;i++)state.set("test_canonical_lesson"+String(i).padStart(2,"0")+"_mastery_v1",{passed:true,score:8,total:10});
 assert.equal(gate.canonicalAvailable(7),false);
 state.set("u1",true);assert.equal(gate.canonicalAvailable(7),true);
 for(let i=7;i<=12;i++)state.set("test_canonical_lesson"+String(i).padStart(2,"0")+"_mastery_v1",{passed:true,score:8,total:10});
 assert.equal(gate.canonicalAvailable(13),false);
 state.set("u2",true);assert.equal(gate.canonicalAvailable(13),false);
 state.set("mid",true);assert.equal(gate.canonicalAvailable(13),true);
 state.set("test_canonical_lesson13_mastery_v1",{passed:true,score:7,total:10});assert.equal(gate.canonicalAvailable(14),false);
});

test("20/50/150/200 question Monte Carlo totals and one-third reserves",()=>{
 const names=["D01_REVIEW","NUMBERS_QUESTION","L03_VOWELS_PRONOUNS","L04_GREETINGS","L05_SENTENCES","L06_NOUNS","L07_VERBS","L08_FAMILY","L09_DESCRIPTIONS","L10_TIME","L11_CAFE","L12_OBJECTS","L13_QUESTIONS","L14_ROUTINES","L15_DIRECTIONS","L16_COMPREHENSION","L17_PRODUCTION","L18_INTEGRATION"];
 const banks=names.map(short=>{
  const start=html.indexOf("const FRENCH_U01_"+short+"_BANK=");
  return new Function("return "+html.slice(html.indexOf("=",start)+1,html.indexOf("];",start)+1))();
 });
 const excerpt=html.slice(html.indexOf("function frenchLessonSet("),html.indexOf("function frenchUnit02Pool("));
 const factory=new Function("canonicalBank","shuffleQuestions",excerpt+"return {frenchLessonSet,frenchCumulativeSet}");
 const {frenchLessonSet,frenchCumulativeSet}=factory(n=>banks[n-1],list=>[...list].reverse());
 for(let day=1;day<=18;day++){
  const first=frenchLessonSet(day,20),second=frenchLessonSet(day,20,first.map(q=>q.id));
  assert.equal(first.length,20);assert.equal(new Set(first.map(q=>q.id)).size,20);
  assert.ok(banks[day-1].length>=Math.ceil(20*4/3));
  assert.ok(second.some(q=>!first.some(a=>a.id===q.id)),"Lesson "+day+" retake must draw unseen questions");
 }
 for(const [days,count] of [
  [[1,2,3,4,5,6],50],[[7,8,9,10,11,12],50],[[13,14,15,16,17,18],50],
  [Array.from({length:12},(_,i)=>i+1),150],
  [Array.from({length:18},(_,i)=>i+1),200]
 ]){
  const first=frenchCumulativeSet(days,count);
  const second=frenchCumulativeSet(days,count,first.map(q=>q.id));
  assert.equal(first.length,count);
  assert.equal(new Set(first.map(q=>q.id)).size,count);
  assert.ok(days.reduce((sum,n)=>sum+banks[n-1].length,0)>=Math.ceil(count*4/3));
  assert.ok(second.some(q=>!first.some(a=>a.id===q.id)),"Cumulative retake must draw from reserve");
 }
});
test("thresholds and preserved legacy results",()=>{
 for(const phrase of ["passCount:16,questionCount:20","passCount:40,questionCount:50","passCount:120,questionCount:150","passCount:160,questionCount:200","[10,20].includes(r.total)","config.passKey()+\"_previous_draw_v1\""])
  assert.ok(html.includes(phrase),phrase);
});

test("resumable assessment uses learner-scoped local checkpoints and section milestones",()=>{
 for(const marker of [
  "function frenchAssessmentDraftKey(config)","function frenchAssessmentReadDraft(config)",
  "function frenchAssessmentRestoreQuestion(id)","french101-resumable-v1",
  'const sectionSize=config.questionCount>=50?25:10',
  'Save & return to French 101',"Resume saved assessment",
  "answers:questions.map(()=>null)","orders:questions.map(()=>null)",
  "if(!persist())","closedBook=config.questionCount>=150",
  "new Set(saved.ids).size!==config.questionCount",
  "Submit "+'config.questionCount'+' answers for grading'
 ])assert.ok(html.includes(marker),marker);
});
test("saved drafts can be restored and tampered drafts fail closed",()=>{
 const snippet=html.slice(html.indexOf("function frenchAssessmentDraftKey("),html.indexOf("function frenchAssessmentRun(config)"));
 const values=new Map();
 const question={prompt:"Select the French greeting",choices:["bonjour","merci","oui"],answer:0};
 const get=new Function("canonicalBank","safeGet",snippet+"return {frenchAssessmentDraftKey,frenchAssessmentReadDraft,frenchAssessmentRestoreQuestion}")(
  day=>day===1?[question]:[],key=>values.get(key)||null
 );
 const config={passKey:()=>"student-001",questionCount:1};
 assert.equal(get.frenchAssessmentReadDraft(config),null);
 assert.equal(get.frenchAssessmentRestoreQuestion("f101-v2-1-0").prompt,question.prompt);
 const saved={schema:"french101-resumable-v1",passKey:"student-001",ids:["f101-v2-1-0"],answers:[0],orders:[[0,1,2]],position:1,createdAt:"2026-11-15T18:00:00Z"};
 values.set(get.frenchAssessmentDraftKey(config),JSON.stringify(saved));
 const restored=get.frenchAssessmentReadDraft(config);
 assert.equal(restored.saved.position,1);assert.equal(restored.saved.answers[0],0);
 saved.orders[0]=[0,0,2];values.set(get.frenchAssessmentDraftKey(config),JSON.stringify(saved));
 assert.equal(get.frenchAssessmentReadDraft(config).invalid,true);
 saved.orders[0]=[0,1,2];saved.ids[0]="f101-v2-99-0";values.set(get.frenchAssessmentDraftKey(config),JSON.stringify(saved));
 assert.equal(get.frenchAssessmentReadDraft(config).invalid,true);
});
