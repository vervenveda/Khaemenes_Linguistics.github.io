/* Khaemenes Academy · Five-Language Hall · Learner-Scoped V4 Authority v1
   Preserves the original shared V4 record until a user explicitly assigns it.
   Named learner records are stored separately and never merged automatically. */
(()=>{"use strict";
const LEGACY_KEY="arshif.languageHall.v4";
const OLD_V3_KEY="arshif.languageHall.v3";
const ACTIVE_KEY="arshif.languageHall.v4.activeLearner";
const REGISTRY_KEY="arshif.languageHall.v4.learners";
const PREFIX="arshif.languageHall.v4.learner:";
const SCHEMA="khaemenes-language-hall-v4-learner-scope-v1";
const MAX_LABEL=70;
const safeGet=k=>{try{return localStorage.getItem(k)}catch{return null}};
const safeSet=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const safeRemove=k=>{try{localStorage.removeItem(k);return true}catch{return false}};
const parse=(v,f)=>{try{const x=JSON.parse(v);return x??f}catch{return f}};
const clone=v=>JSON.parse(JSON.stringify(v));
const clean=v=>String(v||"").trim().replace(/\s+/g," ").slice(0,MAX_LABEL);
const idFor=label=>{
 const s=clean(label).toLocaleLowerCase("en");
 return s?Array.from(s,c=>c.codePointAt(0).toString(16)).join("-"):"";
};
const cleanId=v=>{const s=String(v||"").trim().slice(0,700);return /^[0-9a-f-]+$/i.test(s)?s:""};
const scopedKey=id=>PREFIX+cleanId(id);
function registry(){
 const r=parse(safeGet(REGISTRY_KEY)||"{}",{});
 return r&&typeof r==="object"&&!Array.isArray(r)?r:{};
}
function writeRegistry(r){return safeSet(REGISTRY_KEY,JSON.stringify(r))}
function activeId(){return cleanId(safeGet(ACTIVE_KEY)||"")}
function currentKey(){const id=activeId();return id?scopedKey(id):LEGACY_KEY}
function currentMode(){return activeId()?"learner":"legacy-shared"}
function currentDescriptor(){
 const id=activeId(),r=registry();
 if(!id)return {mode:"legacy-shared",id:"",label:"Legacy shared V4 record",key:LEGACY_KEY};
 return {mode:"learner",id,label:r[id]?.label||id,key:scopedKey(id)};
}
function list(){
 const r=registry();
 return Object.entries(r).map(([id,v])=>({id,label:clean(v?.label)||id,createdAt:v?.createdAt||null,lastOpenedAt:v?.lastOpenedAt||null,key:scopedKey(id)})).sort((a,b)=>a.label.localeCompare(b.label));
}
function touch(id,label,createdAt){
 const r=registry(),now=new Date().toISOString(),prior=r[id]||{};
 r[id]={label:clean(label)||prior.label||id,createdAt:prior.createdAt||createdAt||now,lastOpenedAt:now};
 if(!writeRegistry(r))throw Error("Unable to save learner registry.");
}
function loadCurrent(){
 return parse(safeGet(currentKey())||"null",null);
}
function saveCurrent(state){
 const d=currentDescriptor(),value=clone(state);
 value.recordScope=d.mode==="learner"
  ?{schema:SCHEMA,type:"learner",learnerId:d.id,learnerLabel:d.label}
  :{schema:SCHEMA,type:"legacy-shared"};
 if(!safeSet(d.key,JSON.stringify(value)))throw Error("Unable to save the current V4 record.");
 if(d.mode==="learner")touch(d.id,d.label,value.createdAt);
 return value;
}
function openLearner(label,createRecord){
 const name=clean(label),id=idFor(name);
 if(!id)throw Error("Enter a learner name.");
 const key=scopedKey(id),existing=parse(safeGet(key)||"null",null);
 let record=existing;
 if(!record){
  if(typeof createRecord!=="function")throw Error("Learner record does not exist.");
  record=createRecord(name,id);
  if(!record||typeof record!=="object"||Array.isArray(record))throw Error("Unable to create learner record.");
  record.profile={...(record.profile||{}),learner:name};
  record.recordScope={schema:SCHEMA,type:"learner",learnerId:id,learnerLabel:name};
  if(!safeSet(key,JSON.stringify(record)))throw Error("Unable to create learner record.");
 }
 touch(id,name,record.createdAt);
 if(!safeSet(ACTIVE_KEY,id))throw Error("Unable to activate learner record.");
 return clone(record);
}
function openById(id){
 const learnerId=cleanId(id),r=registry(),entry=r[learnerId];
 if(!learnerId||!entry)throw Error("Learner record was not found.");
 const record=parse(safeGet(scopedKey(learnerId))||"null",null);
 if(!record)throw Error("Learner record data is missing.");
 touch(learnerId,entry.label,record.createdAt);
 if(!safeSet(ACTIVE_KEY,learnerId))throw Error("Unable to activate learner record.");
 return clone(record);
}
function openLegacy(){
 safeRemove(ACTIVE_KEY);
 return parse(safeGet(LEGACY_KEY)||"null",null);
}
function legacyRecord(){return parse(safeGet(LEGACY_KEY)||"null",null)}
function assignLegacy(label){
 const name=clean(label),id=idFor(name);
 if(!id)throw Error("Enter a learner name before assigning the legacy record.");
 const target=scopedKey(id);
 if(safeGet(target)!==null)throw Error("A named V4 record already exists for this learner. The legacy record was not copied.");
 const legacy=legacyRecord();
 if(!legacy)throw Error("No legacy shared V4 record exists to assign.");
 const copy=clone(legacy),now=new Date().toISOString();
 copy.profile={...(copy.profile||{}),learner:name};
 copy.recordScope={schema:SCHEMA,type:"learner",learnerId:id,learnerLabel:name,source:"legacy-v4-explicit-copy",copiedAt:now,legacySourcePreserved:true};
 copy.updatedAt=now;
 if(!safeSet(target,JSON.stringify(copy)))throw Error("Unable to create learner copy.");
 touch(id,name,copy.createdAt);
 if(!safeSet(ACTIVE_KEY,id))throw Error("Learner copy was created but could not be activated.");
 return clone(copy);
}
function clearCurrent(){
 const d=currentDescriptor();
 if(d.mode==="learner"){
  safeRemove(d.key);
  const r=registry();delete r[d.id];writeRegistry(r);safeRemove(ACTIVE_KEY);
  return {cleared:"learner",id:d.id,label:d.label,legacyPreserved:safeGet(LEGACY_KEY)!==null};
 }
 safeRemove(LEGACY_KEY);
 return {cleared:"legacy-shared",legacyPreserved:false};
}
function exportRegistry(){
 return {schema:SCHEMA,exportedAt:new Date().toISOString(),active:currentDescriptor(),learners:list(),legacySharedPresent:safeGet(LEGACY_KEY)!==null,v3Present:safeGet(OLD_V3_KEY)!==null};
}
window.KhaemenesV4LearnerScope={
 schema:SCHEMA,LEGACY_KEY,OLD_V3_KEY,ACTIVE_KEY,REGISTRY_KEY,PREFIX,
 clean,cleanId,idFor,scopedKey,registry,list,activeId,currentKey,currentMode,currentDescriptor,
 loadCurrent,saveCurrent,openLearner,openById,openLegacy,legacyRecord,assignLegacy,clearCurrent,exportRegistry
};
})();