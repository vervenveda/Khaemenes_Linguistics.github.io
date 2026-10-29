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
const BACKUP_FORMAT="khaemenes-five-language-v4-learner-backup-v1";
const RECOVERY_PREFIX="arshif.languageHall.v4.recovery:";
const MAX_RECOVERY=3;
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

function assertPlainObject(value,label){
 if(!value||typeof value!=="object"||Array.isArray(value))throw Error(label+" must be an object.");
 for(const key of Object.keys(value))if(["__proto__","prototype","constructor"].includes(key))throw Error(label+" contains an unsafe key.");
 return value;
}
function validateStateShape(record){
 assertPlainObject(record,"V4 record");
 assertPlainObject(record.profile||{},"Profile");
 assertPlainObject(record.courses||{},"Courses");
 assertPlainObject(record.foundationDone||{},"Foundation progress");
 assertPlainObject(record.favorites||{},"Favorites");
 assertPlainObject(record.notes||{},"Notes");
 if(typeof record.notebook!=="string")throw Error("Notebook must be text.");
 if(typeof record.activeLanguage!=="string"||record.activeLanguage.length>40)throw Error("Invalid active language.");
 if(typeof record.activeCourse!=="string"||record.activeCourse.length>40)throw Error("Invalid active course.");
 if(Object.keys(record.courses||{}).length>100)throw Error("Backup has too many course records.");
 if(Object.keys(record.foundationDone||{}).length>100)throw Error("Backup has too many foundation records.");
 if(Object.keys(record.favorites||{}).length>500)throw Error("Backup has too many favorites.");
 if(Object.keys(record.notes||{}).length>500)throw Error("Backup has too many notes.");
 if(record.notebook.length>200000)throw Error("Notebook is too large.");
 return record;
}
function makeBackup(state){
 const d=currentDescriptor();
 if(d.mode!=="learner"||!d.id)throw Error("Open a named learner record before creating a backup.");
 const record=validateStateShape(clone(state));
 record.profile={...(record.profile||{}),learner:d.label};
 record.recordScope={schema:SCHEMA,type:"learner",learnerId:d.id,learnerLabel:d.label};
 return {format:BACKUP_FORMAT,version:1,exportedAt:new Date().toISOString(),learner:{id:d.id,label:d.label},record};
}
function validateBackup(data){
 assertPlainObject(data,"Backup");
 if(data.format!==BACKUP_FORMAT||data.version!==1)throw Error("This is not a supported learner-scoped V4 backup.");
 assertPlainObject(data.learner,"Backup learner");
 const label=clean(data.learner.label),id=cleanId(data.learner.id);
 if(!label||!id||id!==idFor(label))throw Error("Backup learner identity is invalid.");
 const record=validateStateShape(clone(data.record));
 const scope=assertPlainObject(record.recordScope||{},"Record scope");
 if(scope.type!=="learner"||cleanId(scope.learnerId)!==id)throw Error("Backup record scope does not match its learner.");
 if(clean(scope.learnerLabel)!==label||clean(record.profile?.learner)!==label)throw Error("Backup learner label does not match the record.");
 return {format:BACKUP_FORMAT,version:1,exportedAt:String(data.exportedAt||""),learner:{id,label},record};
}
function recoveryKey(id){return RECOVERY_PREFIX+cleanId(id)}
function recoveryHistory(id){
 const list=parse(safeGet(recoveryKey(id))||"[]",[]);
 return Array.isArray(list)?list.filter(x=>x&&typeof x==="object").slice(-MAX_RECOVERY):[];
}
function pushRecovery(id,label,record,reason){
 const list=recoveryHistory(id);
 list.push({savedAt:new Date().toISOString(),learnerId:id,learnerLabel:label,reason:String(reason||"restore"),record:clone(record)});
 while(list.length>MAX_RECOVERY)list.shift();
 if(!safeSet(recoveryKey(id),JSON.stringify(list)))throw Error("Unable to save the pre-restore recovery snapshot.");
}
function restoreBackup(data){
 const parsed=validateBackup(data),d=currentDescriptor();
 if(d.mode!=="learner"||!d.id)throw Error("Open the named learner record before restoring a backup.");
 if(parsed.learner.id!==d.id||parsed.learner.label!==d.label)throw Error("Backup belongs to a different learner. No record was changed.");
 const current=parse(safeGet(d.key)||"null",null);
 if(current)pushRecovery(d.id,d.label,current,"before-backup-restore");
 const restored=clone(parsed.record),now=new Date().toISOString();
 restored.profile={...(restored.profile||{}),learner:d.label};
 restored.recordScope={schema:SCHEMA,type:"learner",learnerId:d.id,learnerLabel:d.label,restoredFromBackupAt:now,backupExportedAt:parsed.exportedAt||null};
 restored.updatedAt=now;
 if(!safeSet(d.key,JSON.stringify(restored)))throw Error("Unable to restore the learner backup.");
 touch(d.id,d.label,restored.createdAt);
 return clone(restored);
}
function undoLastRestore(){
 const d=currentDescriptor();
 if(d.mode!=="learner"||!d.id)throw Error("Open a named learner record before using restore recovery.");
 const list=recoveryHistory(d.id);
 if(!list.length)throw Error("No pre-restore recovery snapshot is available for this learner.");
 const prior=list.pop(),record=validateStateShape(clone(prior.record));
 record.profile={...(record.profile||{}),learner:d.label};
 record.recordScope={schema:SCHEMA,type:"learner",learnerId:d.id,learnerLabel:d.label,recoveredAt:new Date().toISOString(),recoverySource:prior.savedAt};
 record.updatedAt=new Date().toISOString();
 if(!safeSet(d.key,JSON.stringify(record)))throw Error("Unable to recover the previous learner record.");
 if(list.length)safeSet(recoveryKey(d.id),JSON.stringify(list));else safeRemove(recoveryKey(d.id));
 touch(d.id,d.label,record.createdAt);
 return clone(record);
}
function recoverySummary(){
 const d=currentDescriptor();
 if(d.mode!=="learner"||!d.id)return {available:0,latest:null};
 const list=recoveryHistory(d.id),latest=list.at(-1)||null;
 return {available:list.length,latest:latest?{savedAt:latest.savedAt,reason:latest.reason}:null};
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
 loadCurrent,saveCurrent,openLearner,openById,openLegacy,legacyRecord,assignLegacy,
 BACKUP_FORMAT,makeBackup,validateBackup,restoreBackup,undoLastRestore,recoverySummary,
 clearCurrent,exportRegistry
};
})();