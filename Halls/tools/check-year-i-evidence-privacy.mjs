#!/usr/bin/env node
/* Source-level Year I evidence privacy contract checks, plus two fictional learner simulations.
 * Run: node Halls/tools/check-year-i-evidence-privacy.mjs
 * This does NOT certify a real user profile integration or browser storage isolation.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const errors=[];
const manifest=JSON.parse(fs.readFileSync(path.join(root,'Halls/docs/year-i-listening-source-manifest.json'),'utf8'));
if(manifest.lessons.length!==8)errors.push('Expected eight listening manifest records');
for(const entry of manifest.lessons){
 const page=path.join(root,entry.lesson);
 if(!fs.existsSync(page)){errors.push('Missing '+entry.lesson);continue}
 const source=fs.readFileSync(page,'utf8');
 if(!source.includes('four-skill-evidence-v2')) errors.push('Missing four-skill studio '+entry.lesson);
 if(!source.includes('lesson-navigation'))errors.push('Missing lesson navigation '+entry.lesson);
 const match=source.match(/const QUESTIONS=(\[[\s\S]*?\]);/);
 if(!match){errors.push('Missing quiz bank '+entry.lesson);continue}
 const questions=JSON.parse(match[1]);
 if(questions.length!==10)errors.push('Quiz count mismatch '+entry.lesson);
 if(entry.status==='approved'&&(!entry.audio_file||!entry.transcript_file||!entry.language_reviewer||!entry.rights||entry.comprehension_check_status!=='approved'))errors.push('Unjustified approved audio '+entry.lesson);
}
function evidenceKey(learner,course,week){
 if(!/^[a-zA-Z0-9_-]{3,80}$/.test(learner)) throw Error('Invalid non-identifying learner key');
 if(!/^(arabic|russian)-1$/.test(course)||![6,7,20,21].includes(week))throw Error('Out-of-scope course or week');
 return 'khaemenes:private-evidence:v1:'+learner+':'+course+':'+String(week).padStart(2,'0');
}
const simulatedStorage=new Map();
const alpha='test-learner-alpha',beta='test-learner-beta';
for(const id of [alpha,beta])for(const course of ['arabic-1','russian-1'])for(const week of [6,7,20,21])simulatedStorage.set(evidenceKey(id,course,week),JSON.stringify({note:id+' '+course+' '+week}));
for(const [k,v] of simulatedStorage)for(const other of [alpha,beta])if(!k.includes(':'+other+':')&&JSON.parse(v).note.startsWith(other+' '))errors.push('Simulated cross-learner key collision');
// Simulate explicit active-profile ownership enforcement, not just distinct key strings.
function privateRead(activeLearner,requestedLearner,course,week){
 if(activeLearner!==requestedLearner)throw Error('Cross-learner access refused');
 return simulatedStorage.get(evidenceKey(requestedLearner,course,week));
}
function privateWrite(activeLearner,requestedLearner,course,week,value){
 if(activeLearner!==requestedLearner)throw Error('Cross-learner write refused');
 simulatedStorage.set(evidenceKey(requestedLearner,course,week),JSON.stringify(value));
}
const originalAlpha=privateRead(alpha,alpha,'arabic-1',6);
let deniedReads=0,deniedWrites=0;
for(const [active,other] of [[alpha,beta],[beta,alpha]]){
 try{privateRead(active,other,'arabic-1',6)}catch{deniedReads++}
 try{privateWrite(active,other,'arabic-1',6,{note:'unauthorized'})}catch{deniedWrites++}
}
if(deniedReads!==2||deniedWrites!==2)errors.push('Simulated active learner ownership enforcement failed');
if(privateRead(alpha,alpha,'arabic-1',6)!==originalAlpha)errors.push('Simulated unauthorized write altered original evidence');
if(privateRead(alpha,alpha,'arabic-1',6)===privateRead(alpha,alpha,'russian-1',6))errors.push('Simulated cross-course records collide');
if(privateRead(alpha,alpha,'arabic-1',6)===privateRead(alpha,alpha,'arabic-1',7))errors.push('Simulated cross-week records collide');
// Only approved audio with complete manifest metadata may count toward media availability.
for(const entry of manifest.lessons){
 if(entry.status==='approved'){
  if(!entry.audio_file||!entry.transcript_file||!entry.rights||!entry.language_reviewer||!entry.review_date||entry.comprehension_check_status!=='approved')errors.push('Audio approval metadata incomplete '+entry.lesson);
 }
}
const sample=evidenceKey(alpha,'arabic-1',6);
if(simulatedStorage.get(sample)===simulatedStorage.get(evidenceKey(beta,'arabic-1',6)))errors.push('Simulated learners share records');
console.log(JSON.stringify({status:errors.length?'FAIL':'PASS',checked:manifest.lessons.length,simulated_records:simulatedStorage.size,scope:'source and isolated-key simulation only',errors},null,2));
if(errors.length)process.exitCode=1;
