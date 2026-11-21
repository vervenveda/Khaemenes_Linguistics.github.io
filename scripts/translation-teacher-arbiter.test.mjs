import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
const source=await readFile(new URL("../assets/khaemenes-translation-teacher-arbiter.js",import.meta.url),"utf8");
function load(){
 const window={};vm.runInNewContext(source,{window},{timeout:2000});return window.KhaemenesTranslationTeacherArbiter;
}
const candidate=(translation,confidence,learningBias=0)=>({source:"hello",translation,confidence,learningBias});
test("preserves conservative laNGgwij Teacher thresholds",()=>{
 const policy=load().policy;
 assert.equal(policy.minimumBestScore,0.48);
 assert.equal(policy.minimumWinnerMargin,0.06);
 assert.equal(policy.learningBiasMaxAbsolute,0.12);
});
test("no evidence and blocked inputs WITHHOLD",()=>{
 const t=load();
 assert.equal(t.arbitrate([]).decision,"WITHHOLD");
 assert.equal(t.arbitrate([candidate("bonjour",0.99)],{blocked:true}).decision,"WITHHOLD");
});
test("minimum confidence always enforced",()=>{
 const r=load().arbitrate([candidate("bonjour",0.47)]);
 assert.equal(r.decision,"WITHHOLD");assert.equal(r.reason,"low-confidence");
});
test("ambiguous near-tie triggers WITHHOLD",()=>{
 const r=load().arbitrate([candidate("bonjour",0.62),candidate("salut",0.59)]);
 assert.equal(r.decision,"WITHHOLD");assert.equal(r.reason,"ambiguous");
});
test("strong enough distinct result is suggestion ONLY",()=>{
 const r=load().arbitrate([candidate("bonjour",0.74),candidate("salut",0.5)]);
 assert.equal(r.decision,"SUGGEST_FOR_REVIEW");
 assert.equal(r.selected.translation,"bonjour");
 assert.equal(r.promote,false);
 assert.equal(r.selected.reviewStatus,"candidate-unreviewed");
});
test("excessive feedback bias, NaN and malformed candidates do not gain authority",()=>{
 const t=load();
 const r=t.arbitrate([candidate("rogue",0.99,0.95),candidate("bonjour",0.6)]);
 assert.equal(r.selected.translation,"bonjour");
 assert.equal(t.arbitrate([candidate("rogue",NaN)]).decision,"WITHHOLD");
});
test("advisory process never needs network, file writes, or model execution",()=>{
 assert.doesNotMatch(source,/fetch\s*\(|XMLHttpRequest|localStorage\.|indexedDB\.|eval\s*\(|new Function/);
});
