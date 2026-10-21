import assert from "node:assert/strict";import vm from "node:vm";import{readFileSync}from"node:fs";
const html=readFileSync(new URL("../apps/French_101_index.html",import.meta.url),"utf8");
const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(x=>x.includes("function validate(data)"));assert.ok(code);
const store=new Map(),items=new Map(),events={};function el(id){if(!items.has(id))items.set(id,{value:"",disabled:true,files:[],textContent:"",events:{},addEventListener(type,fn){(this.events[type]??=[]).push(fn)}});return items.get(id)}const fire=(id,type)=>Promise.all((el(id).events[type]||[]).map(fn=>fn()));
const context={document:{getElementById:el},window:{confirm(){return true},addEventListener(type,fn){events[type]=fn}},console,JSON,Object,Number,String,Array,Date,localStorage:{getItem(k){return store.get(k)??null},setItem(k,v){store.set(k,v)}},safeSet(k,v){store.set(k,v);return true},buildLevelGrid(){},showOnly(){},progress:{},learnerKey:"",};
vm.createContext(context);
function choose(name){el("learnerName").value=name;context.learnerKey="french101_progress_v2_"+Array.from(name,c=>c.codePointAt(0).toString(16)).join("-");Object.keys(context.progress).forEach(k=>delete context.progress[k]);Object.assign(context.progress,JSON.parse(store.get(context.learnerKey)||"{}"))}
choose("alice");vm.runInContext(code,context);const aKey=context.learnerKey;store.set(aKey,JSON.stringify({"1":"completed","quizScore_1":90}));
choose("bob");const bKey=context.learnerKey;store.set(bKey,JSON.stringify({"2":"completed"}));choose("alice");
const backup={format:"khaemenes-french101-v2",learner:"alice",progress:{"1":"completed","quizScore_1":90}};
store.set(aKey,JSON.stringify({"1":"locked"}));el("frenchImportFile").files=[{size:500,text:async()=>JSON.stringify(backup)}];await fire("frenchImportFile","change");assert.equal(el("frenchImportConfirm").disabled,false);await fire("frenchImportConfirm","click");
assert.deepEqual(JSON.parse(store.get(aKey)),backup.progress);assert.deepEqual(JSON.parse(store.get(bKey)),{"2":"completed"});
choose("bob");el("frenchImportFile").files=[{size:500,text:async()=>JSON.stringify(backup)}];await fire("frenchImportFile","change");assert.equal(el("frenchImportConfirm").disabled,true);
assert.deepEqual(JSON.parse(store.get(bKey)),{"2":"completed"});
console.log("FRENCH_RECOVERY_ISOLATION=PASS");
