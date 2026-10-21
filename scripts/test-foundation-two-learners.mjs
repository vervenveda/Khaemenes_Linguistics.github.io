import assert from"node:assert/strict";import vm from"node:vm";import{readFileSync}from"node:fs";
const src=readFileSync(new URL("../assets/foundation-performance-rubric.js",import.meta.url),"utf8"),storage=new Map(),els=new Map(),listeners={};
function el(id){if(!els.has(id))els.set(id,{value:"",textContent:"",dataset:{language:"spanish",lesson:"2"},addEventListener(type,fn){(this.listeners??={})[type]=fn}});return els.get(id)}
el("unitReview").dataset={language:"spanish",lesson:"2"};
const cx={document:{getElementById:el},localStorage:{getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,v)}},window:{addEventListener(t,fn){listeners[t]=fn}},setTimeout(f){f()},Date,JSON,Number,Array};
vm.createContext(cx);vm.runInContext(src,cx);
function setLearner(n){el("learner").value=n;el("learner").listeners.change()}
function assess(score){for(const f of ["comprehension","grammar","originality","communication"])el("rubric_"+f).value=String(score);el("rubricReviewer").value="Teacher";el("rubricEvidence").value="Observed an independent dialogue and grammar transfer";el("rubricSave").onclick()}
setLearner("Ava");assess(4);assert.match(el("rubricStatus").textContent,/16\/16/);
setLearner("Ben");assert.equal(el("rubricReviewer").value,"");assess(2);assert.match(el("rubricStatus").textContent,/8\/16/);
setLearner("Ava");assert.equal(el("rubric_comprehension").value,"4");assert.match(el("rubricStatus").textContent,/16\/16|Last review saved/);
assert.equal(storage.size,2);console.log("FOUNDATION_TWO_LEARNERS=PASS");