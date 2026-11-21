/* Khaemenes translation candidate arbitration — advisory only.
 * Adapts conservative thresholds from laNGgwij's teacher-policy.json.
 * It is NOT laNGgwij's C17 Teacher, an ABBY receipt, or an authority to save.
 */
(function(root){"use strict";
const POLICY=Object.freeze({minimumBestScore:0.48,minimumWinnerMargin:0.06,learningBiasMaxAbsolute:0.12});
const finite=n=>typeof n==="number"&&Number.isFinite(n);
function arbitrate(candidates,{blocked=false}={}){
 if(blocked||!Array.isArray(candidates)||!candidates.length)return {decision:"WITHHOLD",reason:"blocked-or-no-evidence",selected:null};
 const ranked=candidates.filter(c=>c&&typeof c==="object"&&typeof c.source==="string"&&typeof c.translation==="string"&&
  finite(c.confidence)&&c.confidence>=0&&c.confidence<=1&&
  finite(c.learningBias??0)&&Math.abs(c.learningBias??0)<=POLICY.learningBiasMaxAbsolute)
  .map(c=>({source:c.source,translation:c.translation,
   reviewStatus:"candidate-unreviewed",score:Math.min(1,Math.max(0,c.confidence+(c.learningBias??0)))}))
  .sort((a,b)=>b.score-a.score);
 if(!ranked.length)return {decision:"WITHHOLD",reason:"no-admissible-candidates",selected:null};
 const best=ranked[0],second=ranked[1],margin=second?best.score-second.score:1;
 if(best.score<POLICY.minimumBestScore)return {decision:"WITHHOLD",reason:"low-confidence",selected:null};
 if(margin<POLICY.minimumWinnerMargin)return {decision:"WITHHOLD",reason:"ambiguous",selected:null};
 // Suggest only. Learning and source matching cannot authorize publication.
 return {decision:"SUGGEST_FOR_REVIEW",reason:"advisory-only",selected:Object.freeze({...best}),margin:Number(margin.toFixed(3)),promote:false};
}
root.KhaemenesTranslationTeacherArbiter=Object.freeze({version:"1.0.0",policy:POLICY,arbitrate});
})(window);
