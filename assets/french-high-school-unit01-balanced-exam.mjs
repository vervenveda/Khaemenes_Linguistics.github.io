// Four-grade French Unit 01 assessment balancing, version 1.
// Pure draft-only sampling. It never reads/writes learner records or grants course completion.
import {FRENCH_HS_COURSES,examBlueprint,validateAssessmentBank} from "./french-high-school-assessment-contract.mjs";

export const FRENCH_UNIT01_BALANCE_SCHEMA="khaemenes.french.high-school.unit01-balance.v1";
export const FRENCH_UNIT01_DOMAINS=Object.freeze(["language-use","interpretation","transfer"]);
export const FRENCH_UNIT01_LESSON_QUOTAS=Object.freeze([
 Object.freeze([3,3,3]),
 Object.freeze([3,3,3]),
 Object.freeze([3,3,2]),
 Object.freeze([3,2,3]),
 Object.freeze([2,3,3]),
 Object.freeze([3,3,2])
]);
export const FRENCH_UNIT01_DOMAIN_TOTALS=Object.freeze([17,17,16]);

function isBlueprint(bp){
 return bp&&bp.schema==="khaemenes.french.high-school.assessment.v1"&&
  FRENCH_HS_COURSES.includes(bp.course)&&bp.kind==="unit"&&bp.unit===1&&
  bp.questions===50&&bp.minimumBank===67&&bp.officialStatus==="not-published";
}
function isBankItem(q,course){
 return q&&typeof q.id==="string"&&q.id.startsWith(course+"-u01-l")&&
  q.unit===1&&Number.isInteger(q.lesson)&&q.lesson>=1&&q.lesson<=6&&
  q.id.startsWith(course+"-u01-l"+String(q.lesson).padStart(2,"0")+"-")&&
  FRENCH_UNIT01_DOMAINS.includes(q.domain);
}
export function validateBalancedFrenchUnit01(course,items){
 const bp=examBlueprint(course,"unit",{unit:1});
 const base=validateAssessmentBank(bp,items);
 const errors=[...base.errors];
 if(!isBlueprint(bp))errors.push("Official Unit 01 blueprint missing or modified");
 const quotas=FRENCH_UNIT01_LESSON_QUOTAS.map(x=>[...x]);
 const counts=quotas.map(row=>row.map(()=>0));
 if(Array.isArray(items)){
  for(const q of items){
   if(!isBankItem(q,course)){errors.push("Question has invalid course, unit, lesson or domain: "+String(q?.id));continue;}
   counts[q.lesson-1][FRENCH_UNIT01_DOMAINS.indexOf(q.domain)]++;
  }
 }
 for(let l=0;l<6;l++)for(let d=0;d<3;d++){
  if(counts[l][d]<quotas[l][d]+1)
   errors.push("Insufficient retake reserve for lesson "+(l+1)+", domain "+FRENCH_UNIT01_DOMAINS[d]);
 }
 return {ready:errors.length===0,errors,counts,quotas,
  totals:FRENCH_UNIT01_DOMAIN_TOTALS.slice(),minimumBank:bp.minimumBank,
  examSize:bp.questions,officialStatus:"not-published"};
}
function shuffle(a,random){
 for(let i=a.length-1;i>0;i--){
  const sample=random();
  if(typeof sample!=="number"||!Number.isFinite(sample)||sample<0||sample>=1)throw Error("Invalid random sample");
  const j=Math.floor(sample*(i+1));[a[i],a[j]]=[a[j],a[i]];
 }
 return a;
}
export function drawBalancedFrenchUnit01(course,items,{previousIds=[],random=Math.random}={}){
 const check=validateBalancedFrenchUnit01(course,items);
 if(!check.ready)throw Error("Balanced Unit 01 assessment withheld: "+check.errors.join("; "));
 if(typeof random!=="function"||!Array.isArray(previousIds)||previousIds.some(x=>typeof x!=="string"))
  throw Error("Invalid retake selection options");
 const seen=new Set(previousIds),chosen=[];
 for(let l=0;l<6;l++)for(let d=0;d<3;d++){
  const pool=items.filter(q=>q.lesson===l+1&&q.domain===FRENCH_UNIT01_DOMAINS[d]);
  const fresh=shuffle(pool.filter(q=>!seen.has(q.id)).slice(),random);
  const repeat=shuffle(pool.filter(q=>seen.has(q.id)).slice(),random);
  const selected=[...fresh,...repeat].slice(0,FRENCH_UNIT01_LESSON_QUOTAS[l][d]);
  if(selected.length!==FRENCH_UNIT01_LESSON_QUOTAS[l][d])
   throw Error("Balanced Unit 01 quota cannot be met");
  chosen.push(...selected);
 }
 if(chosen.length!==50||new Set(chosen.map(q=>q.id)).size!==50)
  throw Error("Balanced Unit 01 final count or uniqueness failure");
 return shuffle(chosen.slice(),random).map(q=>({...q,choices:q.choices.slice()}));
}
// Returns structural counts without exposing correct answers or performing any grading.
export function inspectBalancedFrenchUnit01Draw(draw){
 if(!Array.isArray(draw))return {balanced:false,counts:[],total:0};
 const counts=FRENCH_UNIT01_LESSON_QUOTAS.map(row=>row.map(()=>0));
 const ids=new Set();
 for(const q of draw){
  if(!q||!Number.isInteger(q.lesson)||q.lesson<1||q.lesson>6||
   !FRENCH_UNIT01_DOMAINS.includes(q.domain)||typeof q.id!=="string")return {balanced:false,counts,total:draw.length};
  ids.add(q.id);
  counts[q.lesson-1][FRENCH_UNIT01_DOMAINS.indexOf(q.domain)]++;
 }
 const balanced=draw.length===50&&ids.size===50&&counts.every((r,l)=>r.every((n,d)=>n===FRENCH_UNIT01_LESSON_QUOTAS[l][d]));
 return {balanced,counts,total:draw.length,domainTotals:FRENCH_UNIT01_DOMAINS.map((_,d)=>counts.reduce((s,row)=>s+row[d],0))};
}
