#!/usr/bin/env node
/* Validate sovereign translation trust without browser, network or dependencies. */
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import {fileURLToPath} from "node:url";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const ctx={window:{}};vm.runInNewContext(read("assets/khaemenes-review-policy.js"),ctx,{timeout:1500});
const api=ctx.window.KhaemenesReviewPolicy;
const check=(pass,msg)=>{if(!pass)throw Error("REVIEW_POLICY=FAIL "+msg)};
check(api&&api.validPair("en→fr"),"valid language pair");
check(!api.validPair("__proto__"),"prototype key rejected");
check(!api.reviewedRecord({translation:"bonjour",reviewConfirmed:false}),"unreviewed cannot be promoted");
const approved=api.reviewedRecord({translation:" bonjour ",reviewConfirmed:true,sourceType:"edited-online-draft"});
check(approved.verified&&approved.reviewStatus==="self-reviewed"&&approved.translation==="bonjour","explicit edited review");
const packet={schema:"khaemenes-interlingual-library",version:2,pairs:{
 "en→fr":{"hello":{translation:"bonjour",verified:true},"bird":{translation:"oiseau",verified:false}},
 "__proto__":{"hack":{translation:"wrong",verified:true}},
 "en→es":{"goodbye":{translation:"adiós",verified:true}}
}};
const previous={schema:"khaemenes-interlingual-library",version:2,pairs:{"en→fr":{"hello":{translation:"salut",verified:true,reviewStatus:"self-reviewed"}}}};
const draft=api.importPack(previous,packet,{trustReviewed:false,maxPairs:25});
check(draft.ok&&draft.added===2&&draft.importedDrafts===2&&draft.reviewed===0,"default draft-only import");
check(draft.library.pairs["en→fr"].hello.translation==="salut","reviewed local pair is never overwritten");
check(draft.library.pairs["en→fr"].bird.verified===false,"draft remains unverified");
check(draft.library.pairs["en→es"].goodbye.verified===false,"imported reviewed label not silently trusted");
check(!Object.hasOwn(draft.library.pairs,"__proto__"),"prototype key not imported");
const trusted=api.importPack(previous,packet,{trustReviewed:true,maxPairs:25});
check(trusted.ok&&trusted.library.pairs["en→es"].goodbye.verified===true&&trusted.reviewed===1,"explicit opt-in preserves known reviewed exports");
check(trusted.library.pairs["en→fr"].bird.verified===false,"unreviewed content not promoted even with opt-in");
check(api.importPack(previous,{schema:"unrelated",version:2,pairs:{}}).ok===false,"other schemas rejected");
const markup=read("apps/translator.html");
check(markup.includes("../assets/khaemenes-review-policy.js"),"review engine included");
for(const id of ['reviewText','reviewAttestation','trustImportedReviewed']){
 check(markup.includes('id="'+id+'"'),"missing review control "+id);
}
check(markup.includes("reviewConfirmed:true")&&markup.includes("meta.reviewConfirmed===true"),"explicit review gate wired");
check(markup.includes("trustReviewed:els.trustImportedReviewed.checked"),"import option wired");
const embedded=[...markup.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)];
for(const m of embedded)new vm.Script(m[1],{filename:"apps/translator.html"});
console.log("REVIEW_POLICY=PASS manual confirmation, preserved imports, draft-by-default, prototype guard, syntax");
