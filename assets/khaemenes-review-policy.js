/* Khaemenes Sovereign Translation Review Policy
 * Local-only trust gates; not a credentialing or independent certification system.
 * Published source drafts and online machine results never become reviewed silently.
 */
(function(root){"use strict";
const BLOCK=new Set(["__proto__","constructor","prototype"]);
const trim=(value,max)=>typeof value==="string"?value.trim().slice(0,max):"";
const validPair=key=>typeof key==="string"&&key.length<=29&&/^[a-zA-Z]{2,8}(?:-[a-zA-Z0-9]{2,8})?→[a-zA-Z]{2,8}(?:-[a-zA-Z0-9]{2,8})?$/.test(key);
const safeKey=key=>typeof key==="string"&&key.length>0&&key.length<=12000&&!BLOCK.has(key);
function reviewedRecord({translation,reviewConfirmed=false,sourceType="manual",purpose="translate",reviewNote=""}={}){
 const value=trim(translation,12000);
 if(!reviewConfirmed||!value)return null;
 return {translation:value,verified:true,reviewStatus:"self-reviewed",reviewedAt:new Date().toISOString(),
   savedAt:new Date().toISOString(),source:"local-human-review",origin:trim(sourceType,40)||"manual",
   purpose:trim(purpose,40)||"translate",reviewNote:trim(reviewNote,300)};
}
function importPack(existing,raw,{trustReviewed=false,maxPairs=1600}={}){
 if(!raw||raw.schema!=="khaemenes-interlingual-library"||Number(raw.version)!==2||
 !raw.pairs||typeof raw.pairs!=="object"||Array.isArray(raw.pairs))return {ok:false,error:"Incompatible library file"};
 const dest={schema:"khaemenes-interlingual-library",version:2,updatedAt:new Date().toISOString(),pairs:Object.create(null)};
 let count=0;
 for(const [key,bucket] of Object.entries(existing?.pairs||{})){
  if(!validPair(key)||!bucket||typeof bucket!=="object"||Array.isArray(bucket))continue;
  const output=Object.create(null);
  for(const [src,record] of Object.entries(bucket)){
   if(!safeKey(src)||!record||typeof record.translation!=="string")continue;
   output[src]=record;count++;
  }
  dest.pairs[key]=output;
 }
 let added=0,skipped=0,reviewed=0;
 for(const [key,bucket] of Object.entries(raw.pairs)){
  if(!validPair(key)||!bucket||typeof bucket!=="object"||Array.isArray(bucket)){skipped++;continue}
  if(!Object.hasOwn(dest.pairs,key))dest.pairs[key]=Object.create(null);
  for(const [src,record] of Object.entries(bucket)){
   if(count>=maxPairs){skipped++;continue}
   if(!safeKey(src)||!record||typeof record!=="object"||Array.isArray(record)){skipped++;continue}
   const translation=trim(record.translation,12000);
   if(!translation||!safeKey(translation)){skipped++;continue}
   // Never overwrite an existing local decision, especially a reviewed pair.
   if(Object.hasOwn(dest.pairs[key],src)){skipped++;continue}
   const approved=trustReviewed&&record.verified===true;
   dest.pairs[key][src]={
    translation,verified:approved,reviewStatus:approved?"imported-self-reviewed":"imported-draft",
    savedAt:new Date().toISOString(),source:approved?"imported-human-reviewed-library":"imported-unreviewed-pack",
    purpose:trim(record.purpose,40)||"translate",
    reviewedAt:approved?trim(record.reviewedAt,45)||null:null,
    reviewNote:approved?"User explicitly trusted this imported library":null
   };
   count++;added++;if(approved)reviewed++;
  }
 }
 return {ok:true,library:dest,added,skipped,reviewed,importedDrafts:added-reviewed};
}
root.KhaemenesReviewPolicy=Object.freeze({reviewedRecord,importPack,validPair});
})(window);
