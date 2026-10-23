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
const sample=evidenceKey(alpha,'arabic-1',6);
if(simulatedStorage.get(sample)===simulatedStorage.get(evidenceKey(beta,'arabic-1',6)))errors.push('Simulated learners share records');
console.log(JSON.stringify({status:errors.length?'FAIL':'PASS',checked:manifest.lessons.length,simulated_records:simulatedStorage.size,scope:'source and isolated-key simulation only',errors},null,2));
if(errors.length)process.exitCode=1;
