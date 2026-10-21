const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('assets/foundation-unit03-checkpoint.js','utf8');
const language=process.argv[2]||'spanish';if(!['spanish','mandarin','japanese'].includes(language))throw Error('Unknown language');
const html=fs.readFileSync('apps/language-worlds/'+language+'/unit-03-checkpoint.html','utf8');
const match=html.match(/<script type="application\/json" id="config">([\s\S]*?)<\/script>/);
assert.ok(match,'Missing checkpoint config for '+language);
const config=JSON.parse(match[1]);assert.equal(config.lang,language);
const elements={};const make=()=>({value:'',textContent:'',files:[],children:[],append(...items){this.children.push(...items)},replaceChildren(){this.children=[]},click(){}});
const get=id=>elements[id]||(elements[id]=make());get('config').textContent=JSON.stringify(config);
const data=new Map(),storage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};
const ctx={document:{getElementById:get,createElement:make},localStorage:storage,Blob:class{},URL:{createObjectURL(){return '#'},revokeObjectURL(){}},confirm(){return true},window:{print(){}},console,setTimeout};
function boot(){vm.runInNewContext(source,ctx,{filename:'foundation-unit03-checkpoint.js'})}
function select(name){get('student').value=name;get('select').onclick()}
function evidence(prefix){for(const key of ['reading','grammar','conversation','listening','listeningSource','culture'])get(key).value=prefix+' '+key;get('save').onclick()}
function review(high){get('teacher').value='Test reviewer';get('notes').value='Independent performance evidence recorded';const scores=high?[26,17,17,13,13]:[12,10,10,10,10];['conversation','grammar','listening','reading','culture'].forEach((name,i)=>get('score_'+name).value=String(scores[i]));get('speakingPass').value='pass';get('listeningPass').value='pass';get('decision').value='approved';get('review').onclick()}
(async()=>{
boot();select('Test Learner A');evidence('alpha');review(true);assert.match(get('status').textContent,/approved/);
select('Test Learner B');assert.equal(get('reading').value,'');evidence('beta');review(false);assert.match(get('status').textContent,/Approval requires/);
select('Test Learner A');assert.equal(get('reading').value,'alpha reading');assert.equal(get('decision').value,'approved');
boot();select('Test Learner A');assert.equal(get('reading').value,'alpha reading');
get('reading').value='revised work';get('save').onclick();assert.equal(get('decision').value,'');
select('Test Learner B');
const importObject=async item=>{const serialized=JSON.stringify(item);get('import').files=[{size:serialized.length,text:async()=>serialized}];await get('import').onchange()};
await importObject({schema:'khae-u03-checkpoint-v1',language,student:'Test Learner A',record:{reading:'wrong'}});assert.match(get('status').textContent,/mismatch/);
await importObject({schema:'khae-u03-checkpoint-v1',language,student:'Test Learner B',record:{reading:'restored',grammar:'g',conversation:'c',listening:'l',listeningSource:'source',culture:'culture'}});assert.equal(get('reading').value,'restored');
await importObject({schema:'khae-u03-checkpoint-v1',language:'wrong-language',student:'Test Learner B',record:{reading:'wrong language'}});assert.match(get('status').textContent,/mismatch/);
const forged={reading:'r',grammar:'g',conversation:'c',listening:'l',listeningSource:'source',culture:'culture',teacher:'Reviewer',notes:'Evidence',speakingPass:'pass',listeningPass:'pass',decision:'approved',score_conversation:30,score_grammar:20,score_listening:20,score_reading:15,score_culture:15,total:101,reviewedAt:'2026-10-21T12:00:00Z'};
await importObject({schema:'khae-u03-checkpoint-v1',language,student:'Test Learner B',record:forged});assert.match(get('status').textContent,/Inconsistent rubric total/);
assert.equal(get('reading').value,'restored');
console.log('PASS '+language+': two learners, mastery threshold, reload, review invalidation, wrong-language and forged-total rejection, backup isolation and valid recovery');
})().catch(error=>{console.error(error);process.exitCode=1});
