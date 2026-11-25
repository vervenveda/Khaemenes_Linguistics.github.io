import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
const guardSource=await readFile(new URL("../assets/khaemenes-translation-request-guard.js",import.meta.url),"utf8");
const page=await readFile(new URL("../apps/translator.html",import.meta.url),"utf8");
function create(){
 const ctx={window:{},AbortController};vm.runInNewContext(guardSource,ctx,{timeout:2000});
 return ctx.window.KhaemenesTranslationRequestGuard.createTranslationRequestGuard();
}
const state={from:"en",to:"fr",text:"hello",service:"online"};
test("request accepts only its exact source language pair and service",()=>{
 const g=create(),r=g.start(state);
 assert.equal(g.isCurrent(r,state),true);
 assert.equal(g.isCurrent(r,{...state,text:"goodbye"}),false);
 assert.equal(g.isCurrent(r,{...state,to:"es"}),false);
 assert.equal(g.isCurrent(r,{...state,service:"offline"}),false);
});
test("later request aborts previous fetch, even if response resolves out of order",()=>{
 const g=create(),old=g.start(state),newer=g.start({...state,text:"goodbye"});
 assert.equal(old.signal.aborted,true);
 assert.equal(g.isCurrent(old,state),false);
 assert.equal(g.isCurrent(newer,{...state,text:"goodbye"}),true);
});
test("clear, editing, input language and mode changes invalidate pending responses",()=>{
 for(const update of [{...state,text:"new"},{...state,from:"es"},{...state,to:"ar"},{...state,service:"offline"}]){
  const g=create(),r=g.start(state);g.invalidate();
  assert.equal(r.signal.aborted,true);
  assert.equal(g.isCurrent(r,update),false);
 }
});
test("finishing does not grant old request renewed authority",()=>{
 const g=create(),a=g.start(state);g.finish(a);
 assert.equal(g.isCurrent(a,state),true);
 const b=g.start(state);
 g.finish(a);
 assert.equal(g.isCurrent(a,state),false);
 assert.equal(g.isCurrent(b,state),true);
});
test("translator uses request guard across fetch, JSON, cache and review",()=>{
 assert.match(page,/KhaemenesTranslationRequestGuard\.createTranslationRequestGuard\(\)/);
 assert.match(page,/signal:request\.signal/);
 assert.match(page,/if\(!stillCurrent\(\)\)return;/);
 assert.match(page,/onlineRequestGuard\.finish\(request\)/);
 assert.match(page,/function invalidateTranslation\(\{preserveOutput=false\}=\{\}\)/);
 assert.match(page,/els\.input\.addEventListener\("input",\(\)=>\{invalidateTranslation\(\)/);
 assert.match(page,/els\.service\.addEventListener\("change",\(\)=>\{invalidateTranslation\(\);closeConsent\(\)/);
 assert.match(page,/function clearWorkspace\(\)\{\s*invalidateTranslation\(\)/);
});
test("machine text no longer persists to browser online cache",()=>{
 assert.doesNotMatch(page,/writeJSON\(LS_CACHE/);
 assert.doesNotMatch(page,/readJSON\(LS_CACHE/);
 assert.match(page,/try\{localStorage\.removeItem\(LS_CACHE\)\}catch\{\}/);
 assert.match(page,/let transientOnlineCache=/);
 assert.match(page,/function clearOnlineCache\(\)/);
 assert.match(page,/temporary online drafts \(memory only\)/);
 assert.match(page,/if\(els\.service\.value!=="online"\)return;/);
});
test("Teacher observation carries provider tier and manually reviewed save retains origin distinction",()=>{
 assert.match(page,/providerTier:translationEvidence\.providerTier,providerSource:translationEvidence\.providerSource/);
 assert.match(page,/providerTier:"online-machine-draft"/);
 assert.match(page,/providerTier:"online-memory-draft"/);
 assert.match(page,/providerTier:hit\.verified===true\?"offline-reviewed":"offline-source-draft"/);
 assert.match(page,/reviewSnapshot\.providerTier\?\.startsWith\("online-"\)/);
});

test("new offline cache version includes the request guard and Teacher evidence modules",async()=>{
 const worker=await readFile(new URL("../service-worker.js",import.meta.url),"utf8");
 assert.match(worker,/polyglot-v1\.5\.12-forensic-20261125/);
 for(const resource of ["khaemenes-translation-request-guard.js","khaemenes-translation-candidate-lab.js",
  "khaemenes-translation-teacher-arbiter.js","khaemenes-translation-candidate-ui.js",
  "sovereign-dictionary.generated.js"]){
  assert.ok(worker.includes(resource),"missing offline resource "+resource);
 }
});
test("editing context clears previously displayed translation and review authority",()=>{
 assert.match(page,/function invalidateTranslation\(\{preserveOutput=false\}=\{\}\)/);
 assert.match(page,/if\(!preserveOutput\)els\.output\.textContent=""/);
 assert.match(page,/async function runTranslation\(\)\{\s*invalidateTranslation\(\)/);
 assert.match(page,/onlineRequestGuard\.start\(\{from,to,text,service:"online",purpose\}\)/);
 assert.match(page,/invalidateTranslation\(\{preserveOutput:true\}\)/);
});

test("legacy translator delegates without another persistent cache or external request",async()=>{
 const legacy=await readFile(new URL("../multilingual-translator_index.html",import.meta.url),"utf8");
 assert.match(legacy,/location\.replace\(next\.href\)/);
 assert.match(legacy,/apps\/translator\.html/);
 assert.doesNotMatch(legacy,/localStorage|fetch\(|LS_CACHE|["']text["']/);
});
