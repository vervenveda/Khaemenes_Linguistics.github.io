/* Academy evidence identity bridge — dormant v0.1.
 * No auto-init, storage scanning, network, or edits to existing journals.
 * Integrator supplies authenticated canonical learner identity and permission decisions.
 */
(function(root){"use strict";
const KEY="khaemenes_evidence_bridge_v1:";
const ID=/^[a-zA-Z0-9_-]{8,128}$/;
const WEEK=/^(arabic|russian)-1:week-(0[1-9]|[12][0-9]|3[0-2])$/;
const PERMISSIONS=new Set(["evidence:read","evidence:write","evidence:review","evidence:restore"]);
const plain=x=>x&&typeof x==="object"&&!Array.isArray(x);
const safeText=(x,n=12000)=>typeof x==="string"?x.slice(0,n):"";
function create({storage,authorize}={}){
 if(!storage||typeof storage.getItem!=="function"||typeof storage.setItem!=="function"||typeof authorize!=="function")throw Error("Explicit storage and authorization adapter required");
 function verify(context,permission,learnerId){
  if(!plain(context)||!ID.test(learnerId||"")||!PERMISSIONS.has(permission))throw Error("Invalid bridge request");
  // An ID from localStorage is never authorization. The embedding profile must re-authorize EACH action.
  if(authorize({context,permission,learnerId})!==true)throw Error("Permission denied");
 }
 function read(learnerId){
  const raw=storage.getItem(KEY+learnerId);
  if(!raw)return {schema:1,learnerId,records:{}};
  const value=JSON.parse(raw);
  if(!plain(value)||value.schema!==1||value.learnerId!==learnerId||!plain(value.records))throw Error("Invalid learner evidence store");
  return value;
 }
 function save(context,{learnerId,week,id,text}={}){
  verify(context,"evidence:write",learnerId);
  if(!WEEK.test(week||"")||!ID.test(id||"")||typeof text!=="string"||text.length>12000)throw Error("Invalid evidence");
  const doc=read(learnerId);
  if(Object.hasOwn(doc.records,id))throw Error("Evidence already exists; overwrite denied");
  doc.records[id]={id,week,text,review:{status:"pending"},createdAt:new Date().toISOString()};
  storage.setItem(KEY+learnerId,JSON.stringify(doc));
  return {ok:true,id};
 }
 function list(context,{learnerId,week}={}){
  verify(context,"evidence:read",learnerId);
  if(week!==undefined&&!WEEK.test(week))throw Error("Invalid week");
  return Object.values(read(learnerId).records).filter(e=>!week||e.week===week).map(e=>({id:e.id,week:e.week,text:safeText(e.text),review:{...e.review}}));
 }
 function adopt(context,{learnerId,week,id,text,confirm}={}){
  verify(context,"evidence:restore",learnerId);
  if(confirm!==true)throw Error("Explicit adoption confirmation required");
  // Draft origin is not inferred. Caller must resolve the owner with a trusted profile session.
  verify(context,"evidence:write",learnerId);
  return save(context,{learnerId,week,id,text});
 }
 function review(context,{learnerId,id,status,note}={}){
  verify(context,"evidence:review",learnerId);
  if(!ID.test(id||"")||!["needs-revision","reviewed"].includes(status))throw Error("Invalid review request");
  const doc=read(learnerId),record=doc.records[id];
  if(!record)throw Error("Unknown evidence");
  // Review permission must come from canonical identity/role authority, not student-controlled input.
  record.review={status,note:safeText(note,1200),updatedAt:new Date().toISOString()};
  storage.setItem(KEY+learnerId,JSON.stringify(doc));
  return {ok:true,id};
 }
 return Object.freeze({save,list,adopt,review,storagePrefix:KEY});
}
root.KhaemenesEvidenceBridge=Object.freeze({version:"0.1.0",create});
})(window);
