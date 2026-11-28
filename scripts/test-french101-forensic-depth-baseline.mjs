import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";

const html=readFileSync("apps/French_101_index.html","utf8");

test("French 101 retains eighteen canonical lesson banks",()=>{
 const names=["D01_REVIEW","NUMBERS_QUESTION","L03_VOWELS_PRONOUNS","L04_GREETINGS","L05_SENTENCES","L06_NOUNS","L07_VERBS","L08_FAMILY","L09_DESCRIPTIONS","L10_TIME","L11_CAFE","L12_OBJECTS","L13_QUESTIONS","L14_ROUTINES","L15_DIRECTIONS","L16_COMPREHENSION","L17_PRODUCTION","L18_INTEGRATION"];
 assert.equal(names.length,18);
 for(const short of names){
  const marker="const FRENCH_U01_"+short+"_BANK=";
  const start=html.indexOf(marker);
  assert.ok(start>=0,marker);
  const end=html.indexOf("];",start);
  const bank=new Function("return "+html.slice(html.indexOf("=",start)+1,end+1))();
  assert.ok(bank.length>=27,marker+" requires >=27 authored prompts");
 }
});

test("course keeps current mastery totals and 80 percent thresholds",()=>{
 for(const token of [
  "passCount:16,questionCount:20",
  "passCount:40,questionCount:50",
  "passCount:120,questionCount:150",
  "passCount:160,questionCount:200",
  "Array.from({length:6},(_,i)=>i+1).every(canonicalPassed)",
  "Array.from({length:6},(_,i)=>i+7).every(canonicalPassed)",
  "Array.from({length:6},(_,i)=>i+13).every(canonicalPassed)",
  "frenchAllLessonsPassed()"
 ]) assert.ok(html.includes(token),token);
});

test("resumable assessment and evidence boundaries remain present",()=>{
 for(const token of [
  "french101-resumable-v1",
  "Save & return to French 101",
  "Resume saved assessment",
  "Student & Family Report",
  "does not automatically certify independent oral proficiency",
  "Listening and speaking must be observed separately"
 ]) assert.ok(html.includes(token),token);
});

test("consolidation baseline records page complexity without changing it",()=>{
 const styles=[...html.matchAll(/<style(?:\s+id="([^"]+)")?[^>]*>/g)];
 const inlineScripts=[...html.matchAll(/<script(?![^>]+src=)[^>]*>/g)];
 // C02 removed the documented empty toolbar-fit block; CSS ownership test guards the active owners.
 assert.equal(styles.length,44,"style-block count changed; update both ownership and forensic baselines deliberately");
 assert.ok(!html.includes('id="french101-toolbar-fit"'));
 assert.equal(inlineScripts.length,8,"inline-script count changed; update forensic audit deliberately");
 assert.ok(html.length>800000,"unexpected large page reduction requires forensic review");
});
