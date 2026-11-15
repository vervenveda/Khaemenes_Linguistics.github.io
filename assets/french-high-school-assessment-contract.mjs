// Khaemenes Academy French I–IV, assessment foundation v1.
// Pure, storage-free contract: no learner-grade writes, unlocks or certificates.
export const FRENCH_HS_COURSES=Object.freeze(["hs1","hs2","hs3","hs4"]);
export const FRENCH_HS_EXAMS=Object.freeze({
 lesson:Object.freeze({questions:20,reserve:27,pass:16}),
 unit:Object.freeze({questions:50,reserve:67,pass:40}),
 midterm:Object.freeze({questions:150,reserve:200,pass:120}),
 final:Object.freeze({questions:200,reserve:267,pass:160})
});
export const FRENCH_HS_SCHEMA="khaemenes.french.high-school.assessment.v1";

export function isFrenchHighSchool(course){
 return FRENCH_HS_COURSES.includes(course);
}
export function examBlueprint(course,kind,{unit=null,lesson=null}={}){
 if(!isFrenchHighSchool(course))throw Error("Unrecognized French high-school course");
 const spec=FRENCH_HS_EXAMS[kind];
 if(!spec)throw Error("Unrecognized assessment kind");
 if((kind==="lesson"&&(!Number.isInteger(lesson)||lesson<1||lesson>36))||
    (kind==="unit"&&(!Number.isInteger(unit)||unit<1||unit>6)))throw Error("Invalid unit or lesson");
 const units=kind==="lesson"?[Math.ceil(lesson/6)]:kind==="unit"?[unit]:kind==="midterm"?[1,2,3]:[1,2,3,4,5,6];
 return Object.freeze({schema:FRENCH_HS_SCHEMA,course,kind,unit,lesson,units,
  questions:spec.questions,minimumBank:spec.reserve,minimumCorrect:spec.pass,
  thresholdPercent:80,officialStatus:"not-published",legacyUnaffected:true});
}
function validQuestion(q){
 return q&&typeof q.id==="string"&&/^[A-Za-z0-9][A-Za-z0-9._:-]{3,}$/.test(q.id)
 &&typeof q.prompt==="string"&&q.prompt.trim().length>=12
 &&Array.isArray(q.choices)&&q.choices.length>=2&&q.choices.length<=6
 &&q.choices.every(c=>typeof c==="string"&&c.trim().length>0)
 &&new Set(q.choices.map(c=>c.normalize("NFC").trim().toLocaleLowerCase())).size===q.choices.length
 &&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.choices.length
 &&typeof q.explanation==="string"&&q.explanation.trim().length>=20
 &&typeof q.domain==="string"&&q.domain.trim().length>=3
 &&Number.isInteger(q.unit)&&q.unit>=1&&q.unit<=6
 &&Number.isInteger(q.lesson)&&q.lesson>=1&&q.lesson<=36
 &&q.unit===Math.ceil(q.lesson/6);
}
export function validateAssessmentBank(blueprint,questions){
 const errors=[];
 if(!blueprint||blueprint.schema!==FRENCH_HS_SCHEMA||!isFrenchHighSchool(blueprint.course)||!FRENCH_HS_EXAMS[blueprint.kind]){
  return {ready:false,errors:["Invalid blueprint"],validCount:0};
 }
 if(!Array.isArray(questions))return {ready:false,errors:["Bank is not an array"],validCount:0};
 if(questions.length<blueprint.minimumBank)errors.push("Insufficient authored question reserve");
 const ids=new Set(),domains=new Set();
 for(const [i,q] of questions.entries()){
  if(!validQuestion(q)){errors.push("Invalid item at index "+i);continue}
  if(ids.has(q.id))errors.push("Duplicate question ID: "+q.id);
  ids.add(q.id);domains.add(q.domain);
  if(!blueprint.units.includes(q.unit))errors.push("Question outside scope: "+q.id);
  if(blueprint.kind==="lesson"&&q.lesson!==blueprint.lesson)errors.push("Wrong lesson: "+q.id);
 }
 if(domains.size<2)errors.push("Assessment requires at least two learning domains");
 return {ready:errors.length===0,errors,validCount:ids.size,domains:[...domains].sort()};
}
// Caller may supply deterministic RNG for tests; sampling never writes a grade.
// Prior question IDs are deprioritized without promising zero repeats.
export function drawAssessment(blueprint,questions,{previousIds=[],random=Math.random}={}){
 const check=validateAssessmentBank(blueprint,questions);
 if(!check.ready)throw Error("Assessment withheld: "+check.errors.join("; "));
 if(typeof random!=="function")throw Error("Random source required");
 const previous=new Set(previousIds),items=questions.map(q=>({...q}));
 const shuffle=arr=>{
  for(let i=arr.length-1;i>0;i--){
   const r=random();
   if(!Number.isFinite(r)||r<0||r>=1)throw Error("Invalid random sample");
   const j=Math.floor(r*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
 };
 const fresh=shuffle(items.filter(x=>!previous.has(x.id)));
 const seen=shuffle(items.filter(x=>previous.has(x.id)));
 const selected=[...fresh,...seen].slice(0,blueprint.questions);
 if(selected.length!==blueprint.questions||new Set(selected.map(x=>x.id)).size!==selected.length){
  throw Error("Assessment draw incomplete or duplicated");
 }
 return shuffle(selected);
}
export function gradeAttempt(blueprint,draw,answers){
 if(!blueprint||blueprint.schema!==FRENCH_HS_SCHEMA||!Array.isArray(draw)
    ||draw.length!==blueprint.questions||!Array.isArray(answers)
    ||answers.length!==draw.length||new Set(draw.map(q=>q.id)).size!==draw.length
    ||draw.some(q=>!validQuestion(q)))throw Error("Invalid assessment attempt");
 if(answers.some(a=>!Number.isInteger(a)||a<0))throw Error("Incomplete assessment");
 const correct=draw.reduce((n,q,i)=>n+Number(answers[i]===q.answer),0);
 return Object.freeze({score:correct,total:draw.length,passed:correct>=blueprint.minimumCorrect,
  percent:Math.round(correct/draw.length*10000)/100,
  status:"formative-engine-result-not-official",schema:FRENCH_HS_SCHEMA});
}
