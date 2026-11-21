/* Khaemenes Sovereign Translation Candidate Lab v1 — opt-in, memory-only.
 * Read-only sync with existing KhaemenesSovereignTranslate.lookupLocal and
 * lookupDefinition. Inspired by AffixSix bounded pattern-memory and
 * Checkers Variant Lab outcome-based reinforcement, NOT game code copied.
 * No network, localStorage, IndexedDB, cookies, auto cloud write or promotion.
 */
(function(root){"use strict";
const MAX=240, MAX_PHRASE=120, REJECT=Object.freeze({ok:false,status:"withheld"});
const LANG=/^[a-z]{2,8}(?:-[a-z0-9]{2,8})?$/i;
const normalize=s=>typeof s==="string"?s.normalize("NFC").trim():"";
const safe=s=>!!s&&s.length<=MAX_PHRASE&&!/[\r\n<>\u0000-\u001f]/.test(s)&&
 !/(?:\b\d{3}[-. ]?\d{2}[-. ]?\d{4}\b|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|(?:api[_-]?key|password|passphrase|secret|token)\s*[:=])/i.test(s);
const key=(from,to,source,translation)=>JSON.stringify([from,to,source,translation]);
let enabled=false;
const candidates=new Map();
const stats={withheld:0,observed:0};
function snapshot(record){return Object.freeze({...record})}
function status(){return {enabled,observed:stats.observed,withheld:stats.withheld,candidates:candidates.size,persistentWrites:0,cloudWrites:0,automaticPromotions:0}}
function optIn(value){
 enabled=value===true;
 if(!enabled)candidates.clear();
 return status();
}
function observe({from,to,source,translation,origin="public-ui",reviewConfirmed=false}={}){
 if(!enabled||origin!=="public-ui"||reviewConfirmed===true){stats.withheld++;return REJECT}
 from=normalize(from).toLowerCase();to=normalize(to).toLowerCase();
 source=normalize(source);translation=normalize(translation);
 if(!LANG.test(from)||!LANG.test(to)||from===to||!safe(source)||!safe(translation)){
  stats.withheld++;return REJECT;
 }
 const core=root.KhaemenesSovereignTranslate;
 if(!core||typeof core.lookupLocal!=="function"){stats.withheld++;return REJECT}
 // Exact authoritative source of existing translation semantics; no model guess.
 const found=core.lookupLocal({from,to,text:source});
 const identical=found&&normalize(found.translation)===translation;
 const identity=key(from,to,source,translation);
 const earlier=candidates.get(identity);
 const n=Math.min(12,(earlier?.observations||0)+1);
 const conflict=!!(found&&!identical);
 // Repetition is weak evidence only; never a trust or review grant.
 const confidence=Math.max(0,Math.min(0.85,0.2+Math.log2(1+n)*0.08+(identical?0.18:0)-(conflict?0.18:0)));
 const candidate={from,to,source,translation,origin,observations:n,confidence:Number(confidence.toFixed(3)),
  dictionaryMatch:!!identical,dictionarySource:typeof found?.source==="string"?found.source:null,
  conflict,reviewStatus:"candidate-unreviewed",promotionAllowed:false};
 if(candidates.has(identity))candidates.delete(identity);
 candidates.set(identity,candidate);
 if(candidates.size>MAX)candidates.delete(candidates.keys().next().value);
 stats.observed++;
 return {ok:true,status:"candidate-unreviewed",candidate:snapshot(candidate)};
}
function list({limit=25}={}){
 const max=Number.isInteger(limit)?Math.max(1,Math.min(50,limit)):25;
 return [...candidates.values()].sort((a,b)=>b.confidence-a.confidence||b.observations-a.observations)
  .slice(0,max).map(snapshot);
}
function recommend({from,to,source}={}){
 const arbiter=root.KhaemenesTranslationTeacherArbiter;
 if(!enabled||typeof arbiter?.arbitrate!=="function")return {decision:"WITHHOLD",reason:"not-enabled-or-arbiter-missing",selected:null};
 from=normalize(from).toLowerCase();to=normalize(to).toLowerCase();source=normalize(source);
 const matches=[...candidates.values()].filter(x=>x.from===from&&x.to===to&&x.source===source)
  .map(x=>({source:x.source,translation:x.translation,confidence:x.confidence,learningBias:0}));
 return arbiter.arbitrate(matches);
}
function reviewedProposal({from,to,source,translation,reviewConfirmed=false,reviewNote=""}={}){
 if(!enabled||reviewConfirmed!==true)return REJECT;
 const id=key(normalize(from).toLowerCase(),normalize(to).toLowerCase(),normalize(source),normalize(translation));
 const candidate=candidates.get(id);
 const policy=root.KhaemenesReviewPolicy;
 if(!candidate||typeof policy?.reviewedRecord!=="function")return REJECT;
 const approved=policy.reviewedRecord({translation:candidate.translation,reviewConfirmed:true,
  sourceType:"manual-translation-candidate-review",purpose:"translate",reviewNote});
 if(!approved)return REJECT;
 // Return a proposal for existing manual review/save UI. Never mutate canonical
 // dictionary or browser reviewed library here.
 return {ok:true,status:"owner-reviewed-proposal-not-saved",pair:{from:candidate.from,to:candidate.to,source:candidate.source},
  record:approved,requiresExistingReviewSave:true};
}
function clear(){candidates.clear();return status()}
root.KhaemenesTranslationCandidateLab=Object.freeze({version:"1.1.0",optIn,observe,list,status,recommend,reviewedProposal,clear});
})(window);
