import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("apps/vocabulary-mini-cloud/index.html","utf8");

test("page review intake remains explicit and browser-local",()=>{
  for(const token of [
    'id="pageReviewFile"',
    'id="clearPageReview"',
    'function parsePageReview(raw)',
    'schema!=="vnv-page-vocabulary-review-v1"',
    'approvedForVault!==false',
    'status!=="unreviewed-page-translation"',
    'sourceType!=="public-rendered-text"',
    'contextual phrase(s) are shown for review only',
    'Select this candidate for review',
    'Candidate selected but NOT saved',
    'vnv-page-translation:unverified'
  ]) assert(html.includes(token),"missing page review safety token: "+token);
  assert(html.includes('$("saveVocabulary").addEventListener("click",save)'),
    "existing explicit Encrypt and Save gate must remain");
  assert(!html.includes("stagePageWords("),"client must not silently batch-stage page candidates");
});

test("page review cannot bypass ciphertext-only GitHub writer",()=>{
  assert(html.includes("Only encrypted envelopes cross a separately authorized GitHub write bridge."));
  assert(html.includes("const blob=await seal({schema:NS,entries:next},secret),sha256=await hash(blob);"));
  assert(html.includes("await b.put({namespace:NS,identity,expectedRevision:revision,blob,sha256})"));
  assert(html.includes("GitHub ciphertext readback failed; save not verified."));
});

test("page review export is bounded and private paths are denied",()=>{
  assert(html.includes("file.size>2*1024*1024"));
  assert(html.includes("obj.entries.length>900"));
  for(const word of ["admin","private","account","student-profile","learner-profile","parent-profile","family","vault","cloud","stos","enrollment","assessment"])
    assert(html.includes(word),"private-path guard missing "+word);
});
