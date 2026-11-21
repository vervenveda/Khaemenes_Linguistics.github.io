import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import vm from "node:vm";
const src=await readFile(new URL("../assets/khaemenes-translation-candidate-lab.js",import.meta.url),"utf8");
function lab(lookup=()=>null){
 const window={
  KhaemenesSovereignTranslate:{lookupLocal:lookup},
  KhaemenesReviewPolicy:{reviewedRecord:({translation,reviewConfirmed})=>reviewConfirmed?{translation,verified:true,reviewStatus:"self-reviewed"}:null}
 };
 vm.runInNewContext(src,{window},{timeout:2000});
 return window.KhaemenesTranslationCandidateLab;
}
const entry={from:"en",to:"fr",source:"hello",translation:"bonjour"};
test("off by default, no automatic capture or cloud writes",()=>{
 const a=lab();
 assert.equal(a.status().enabled,false);
 assert.equal(a.observe(entry).ok,false);
 assert.equal(a.status().cloudWrites,0);
});
test("opt-in observes a bounded unreviewed candidate against canonical lookup",()=>{
 const a=lab(()=>({translation:"bonjour",source:"sovereign-preschool-dictionary"}));a.optIn(true);
 const out=a.observe(entry);
 assert.equal(out.ok,true);assert.equal(out.candidate.dictionaryMatch,true);
 assert.equal(out.candidate.reviewStatus,"candidate-unreviewed");
 assert.equal(out.candidate.promotionAllowed,false);
});
test("repeated exposure increases capped score but never authority",()=>{
 const a=lab();a.optIn(true);
 const early=a.observe(entry).candidate;
 for(let i=0;i<40;i++)a.observe(entry);
 const high=a.list()[0];
 assert.ok(high.confidence>=early.confidence);
 assert.ok(high.confidence<=0.85);
 assert.equal(high.observations,12);
 assert.equal(high.promotionAllowed,false);
});
test("conflicting canonical translation is marked as conflict, not trusted",()=>{
 const a=lab(()=>({translation:"salut",source:"sovereign-local-reviewed"}));a.optIn(true);
 const r=a.observe(entry).candidate;assert.equal(r.conflict,true);
 assert.equal(r.dictionaryMatch,false);
 assert.equal(r.reviewStatus,"candidate-unreviewed");
});
test("blocks secrets, email, markup, private page contexts and lengthy texts",()=>{
 const a=lab();a.optIn(true);
 for(const unsafe of ["my@email.com","password: example","<script>","x".repeat(121)])
  assert.equal(a.observe({...entry,source:unsafe}).ok,false);
 assert.equal(a.observe({...entry,origin:"private-learner"}).ok,false);
});
test("no review proposal without explicit attestation and original candidate",()=>{
 const a=lab();a.optIn(true);a.observe(entry);
 assert.equal(a.reviewedProposal({...entry,reviewConfirmed:false}).ok,false);
 const p=a.reviewedProposal({...entry,reviewConfirmed:true});
 assert.equal(p.ok,true);assert.equal(p.requiresExistingReviewSave,true);
 assert.equal(p.status,"owner-reviewed-proposal-not-saved");
});
test("memory cleared on disabling, no automatic upload or persisted history",()=>{
 const a=lab();a.optIn(true);a.observe(entry);
 assert.equal(a.status().candidates,1);
 a.optIn(false);assert.equal(a.status().candidates,0);
 assert.equal(a.status().persistentWrites,0);
});
test("requires current dictionary adapter and no guessing",()=>{
 const a=lab();a.optIn(true);
 const b=lab();b.optIn(true);
 assert.equal(a.list().length,0);
 assert.equal(b.observe({...entry,translation:""}).ok,false);
});

test("explicit feedback changes bounded suggestion bias but never allows publication",()=>{
 const a=lab(()=>({translation:"bonjour",source:"sovereign-dictionary"}));a.optIn(true);
 assert.equal(a.feedback({...entry,outcome:"helpful"}).ok,false);
 a.observe(entry);
 for(let i=0;i<20;i++)assert.equal(a.feedback({...entry,outcome:"helpful",explicitReview:true}).ok,true);
 assert.equal(a.list()[0].learningBias,0.12);
 assert.equal(a.list()[0].promotionAllowed,false);
 for(let i=0;i<20;i++)a.feedback({...entry,outcome:"incorrect",explicitReview:true});
 assert.equal(a.list()[0].learningBias,-0.12);
 assert.equal(a.status().cloudWrites,0);
});
