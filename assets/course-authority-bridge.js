/* Khaemenes Academy · Course Authority Evidence Bridge v1
   Review-only bridge between language-specific learner experiences and the formal Language Hall.
   It never writes to arshif.languageHall.v4, never changes unlocks, and never awards mastery. */
(()=>{"use strict";
const SCHEMA="khaemenes-course-authority-bridge-v1";
const PREFIX="khaemenes.courseAuthorityBridge.v1:";
const MAX_LABEL=70;
const safeGet=k=>{try{return localStorage.getItem(k)}catch{return null}};
const safeSet=(k,v)=>{try{localStorage.setItem(k,v);return true}catch{return false}};
const parse=(v,f)=>{try{const x=JSON.parse(v);return x??f}catch{return f}};
const clean=v=>String(v||"").trim().replace(/\s+/g," ").slice(0,MAX_LABEL);
const learnerId=(label,locale="en")=>{const s=clean(label).toLocaleLowerCase(locale);return s?Array.from(s,c=>c.codePointAt(0).toString(16)).join("-"):""};
const bridgeKey=(courseId,id)=>PREFIX+courseId+":"+id;
const pct=(score,total)=>Number.isFinite(score)&&Number.isFinite(total)&&total>0?Math.round((score/total)*100):null;
const maxNumber=values=>values.filter(Number.isFinite).reduce((a,b)=>Math.max(a,b),-Infinity);
function download(data,name){
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"})),a=document.createElement("a");
 a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function base(courseId,target,label,id){
 return {
  schema:SCHEMA,version:1,courseId,targetAuthority:target,learnerLabel:clean(label),learnerRecordId:id,
  generatedAt:new Date().toISOString(),disposition:"review-only",formalMasteryAwarded:false,
  authorityEffects:{writesFormalRecord:false,changesUnlocks:false,changesScores:false,changesCompletion:false},
  privacy:"Summary evidence only. Written learner responses and assessment answer details are not copied into this bridge record."
 };
}
function frenchCandidate(label){
 const id=learnerId(label,"en");if(!id)throw Error("Choose a named French learner before preparing Academy review evidence.");
 const progressKey="french101_progress_v2_"+id,progress=parse(safeGet(progressKey)||"{}",{});
 const levels=[];let completedLevels=0,quizzesAt80=0,writingCount=0;
 for(let level=1;level<=12;level++){
  const completed=progress[level]==="completed";if(completed)completedLevels++;
  const score=Number(progress["quizScore_"+level]),total=Number(progress["quizTotal_"+level]);
  const percent=pct(score,total);if(percent!==null&&percent>=80)quizzesAt80++;
  const writingPresent=Boolean((safeGet(progressKey+"_writing_"+level)||"").trim());if(writingPresent)writingCount++;
  levels.push({level,completed,quizPercent:percent,writingPresent});
 }
 const rawExam=Number(progress.examScore);
 const finalPercent=Number.isFinite(rawExam)?(rawExam<=10?Math.round(rawExam*10):Math.round(rawExam)):null;
 const attempts=parse(safeGet(progressKey+"_assessment_attempts_v3")||"[]",[]);
 const validAttempts=Array.isArray(attempts)?attempts:[];
 const oralCertified=validAttempts.some(x=>x&&x.oralProficiencyCertified===true);
 const practice=parse(safeGet("khaemenes_french_practice_v1_"+id)||"{}",{});
 const practiceCount=practice&&typeof practice==="object"&&!Array.isArray(practice)?Object.values(practice).reduce((n,v)=>n+(Array.isArray(v)?v.length:0),0):0;
 const checkpoint=parse(safeGet(progressKey+"_u01_checkpoint_v1")||"null",null);
 const reviewNotesPresent=Boolean((safeGet("khaemenes_french_portfolio_review_v1_"+progressKey)||"").trim());
 const evidenceComplete=completedLevels===12&&quizzesAt80===12&&finalPercent!==null&&finalPercent>=80&&progress.examPassed===true;
 return {
  ...base("french-101","Halls/index.html?language=french&course=101",label,id),
  source:{experience:"apps/French_101_index.html",summary:"apps/maitrise-constellation/index.html",progressNamespace:progressKey},
  classification:"candidate-course-evidence",
  evidence:{
   completedLevels,totalLevels:12,quizzesAtOrAbove80:quizzesAt80,levels,
   unit01CheckpointPassed:checkpoint?.passed===true||progress.u01CheckpointPassed===true,
   finalExamPercent:finalPercent,finalExamPassedAt80:progress.examPassed===true&&finalPercent!==null&&finalPercent>=80,
   writingLevelsPresent:writingCount,practiceAttemptCount:practiceCount,parentTeacherNotesPresent:reviewNotesPresent,
   oralProficiencyCertified:oralCertified
  },
  review:{candidateReadyForHumanReview:evidenceComplete,formalEquivalenceVerified:false,acceptedIntoV4:false},
  warnings:[
   "This package does not mark V4 units, competencies, tasks, midterm, final, capstone, review, or course completion.",
   "Browser/synthetic speech activity is not independent proof of oral proficiency.",
   "French 101 evidence must be reviewed against the formal V4 course requirements before any V4 completion decision."
  ]
 };
}
function germanCandidate(label){
 const id=learnerId(label,"de");if(!id)throw Error("Choose a named German learner before preparing Academy review evidence.");
 const coachPrefix="khaemenes_german_coach_v2_"+id+"_";
 const completed=parse(safeGet(coachPrefix+"gt_trav_completed")||"[]",[]);
 const quiz=parse(safeGet(coachPrefix+"gt_trav_quizHistory")||"[]",[]);
 const exams=parse(safeGet(coachPrefix+"gt_trav_examHistory")||"[]",[]);
 const quizPercents=(Array.isArray(quiz)?quiz:[]).map(x=>pct(Number(x?.score),Number(x?.total))).filter(Number.isFinite);
 const examPercents=(Array.isArray(exams)?exams:[]).map(x=>Number(x?.pct)).filter(Number.isFinite);
 const stories=[];let storyAttempts=0,writingStories=0;
 for(let level=1;level<=12;level++){
  const k="khaemenes_german_stories_v1_"+id+"_"+level;
  const a=parse(safeGet(k+"_attempts")||"[]",[]),attemptCount=Array.isArray(a)?a.length:0;
  const writingPresent=Boolean((safeGet(k+"_writing")||"").trim());
  storyAttempts+=attemptCount;if(writingPresent)writingStories++;
  stories.push({level,attemptCount,writingPresent});
 }
 const sound=parse(safeGet("khaemenes_german_sound_v1_"+id)||"[]",[]);
 const world=parse(safeGet("khaemenes_german_world_v1_"+id)||"[]",[]);
 const bestQuiz=quizPercents.length?maxNumber(quizPercents):null,bestExam=examPercents.length?maxNumber(examPercents):null;
 const reviewNotesPresent=Boolean((parse(safeGet("khaemenes_german_portfolio_review_v1_"+id)||'""',"")||"").trim?.());
 return {
  ...base("german-learning-evidence","Halls/index.html?language=german",label,id),
  source:{experience:"apps/German_hub_index.html",summary:"apps/german-mastery-constellation/index.html",coachNamespace:coachPrefix},
  classification:"supplemental-course-evidence",
  evidence:{
   coachDaysCompleted:new Set((Array.isArray(completed)?completed:[]).map(String)).size,
   quizRecordCount:Array.isArray(quiz)?quiz.length:0,bestQuizPercent:bestQuiz,
   examRecordCount:Array.isArray(exams)?exams.length:0,bestExamPercent:bestExam,academy80ExamEvidence:bestExam!==null&&bestExam>=80,
   readingStoryAttempts:storyAttempts,writingStoriesPresent:writingStories,stories,
   soundAttemptCount:Array.isArray(sound)?sound.length:0,
   conversationAttemptCount:Array.isArray(world)?world.length:0,
   conversationMissions:Array.isArray(world)?new Set(world.map(x=>x?.scene).filter(Boolean)).size:0,
   parentTeacherNotesPresent:reviewNotesPresent
  },
  review:{candidateReadyForHumanReview:Boolean((Array.isArray(completed)&&completed.length)||(Array.isArray(exams)&&exams.length)||storyAttempts),formalEquivalenceVerified:false,acceptedIntoV4:false},
  warnings:[
   "German Coach and studio evidence is supplemental and does not equal completion of a specific V4 German course.",
   "The bridge evaluates German exam evidence against the Academy 80% threshold even if an older Coach record used a lower local pass threshold.",
   "No V4 course unit, competency, task, assessment, review, or completion field is changed by this package."
  ]
 };
}
function saveCandidate(data){
 const key=bridgeKey(data.courseId,data.learnerRecordId);
 if(!safeSet(key,JSON.stringify(data)))throw Error("Browser storage is unavailable. No bridge record was written.");
 return key;
}
function readCandidate(courseId,label,locale){
 const id=learnerId(label,locale);return id?parse(safeGet(bridgeKey(courseId,id))||"null",null):null;
}
function addBuilder(kind){
 const main=document.querySelector("main");if(!main||document.getElementById("courseAuthorityBridgeBuilder"))return;
 const section=document.createElement("article");section.id="courseAuthorityBridgeBuilder";
 const h=document.createElement("h2");h.textContent="Academy Authority Bridge";
 const p=document.createElement("p");p.textContent="Prepare a learner-scoped evidence summary for formal Academy review. This does not change grades, unlocks, mastery, or completion.";
 const prepare=document.createElement("button");prepare.type="button";prepare.textContent="Prepare Academy review evidence";
 const exp=document.createElement("button");exp.type="button";exp.textContent="Export prepared bridge JSON";exp.disabled=true;
 const status=document.createElement("p");status.setAttribute("role","status");status.setAttribute("aria-live","polite");
 section.append(h,p,prepare,exp,status);
 const footer=main.querySelector("footer");footer?main.insertBefore(section,footer):main.append(section);
 let current=null;
 const label=()=>kind==="french"?clean(document.getElementById("learner")?.value):clean(document.getElementById("learnerName")?.value||safeGet("german_active_learner"));
 prepare.addEventListener("click",()=>{
  try{
   current=kind==="french"?frenchCandidate(label()):germanCandidate(label());
   saveCandidate(current);exp.disabled=false;
   if(kind==="french")status.textContent="Prepared for review: "+current.evidence.completedLevels+"/12 levels complete; "+current.evidence.quizzesAtOrAbove80+"/12 quizzes at 80%+; final "+(current.evidence.finalExamPercent??"not recorded")+"%. V4 was not changed.";
   else status.textContent="Prepared supplemental German evidence: "+current.evidence.coachDaysCompleted+" Coach days; best exam "+(current.evidence.bestExamPercent??"not recorded")+"%. No V4 course completion was changed.";
  }catch(e){current=null;exp.disabled=true;status.textContent=e.message||"Unable to prepare bridge evidence."}
 });
 exp.addEventListener("click",()=>{if(current)download(current,current.courseId+"-authority-bridge.json")});
}
function hallContext(){try{return typeof window.KhaemenesLanguageAuthorityContext==="function"?window.KhaemenesLanguageAuthorityContext():null}catch{return null}}
function renderHall(){
 const host=document.getElementById("courseDetail");if(!host)return;
 document.getElementById("courseAuthorityBridgeReview")?.remove();
 const ctx=hallContext();if(!ctx||ctx.recordScope!=="learner"||!clean(ctx.learner))return;
 let courseId=null,locale="en";
 if(ctx.language==="french"&&ctx.course==="101")courseId="french-101";
 else if(ctx.language==="german"){courseId="german-learning-evidence";locale="de"}
 else return;
 const record=readCandidate(courseId,ctx.learner,locale);
 const box=document.createElement("section");box.id="courseAuthorityBridgeReview";box.className="unit-review";
 const h=document.createElement("h3");h.textContent="External learner evidence · review only";box.append(h);
 const intro=document.createElement("p");intro.textContent="This panel reads a learner-scoped bridge package. It cannot change V4 readiness or course completion.";box.append(intro);
 if(!record){
  const p=document.createElement("p");p.textContent="No prepared bridge evidence was found for "+clean(ctx.learner)+". Prepare it from the language-specific mastery/portfolio page if needed.";box.append(p);
  host.append(box);return;
 }
 const summary=document.createElement("p");
 if(courseId==="french-101")summary.textContent="French 101: "+record.evidence.completedLevels+"/12 levels complete · "+record.evidence.quizzesAtOrAbove80+"/12 quizzes at 80%+ · final "+(record.evidence.finalExamPercent??"—")+"% · formal equivalence not yet verified.";
 else summary.textContent="German supplemental evidence: "+record.evidence.coachDaysCompleted+" Coach days · best exam "+(record.evidence.bestExamPercent??"—")+"% · "+record.evidence.readingStoryAttempts+" reading attempts · not equivalent to a V4 German course.";
 box.append(summary);
 const note=document.createElement("p");note.textContent="Generated "+new Date(record.generatedAt).toLocaleString()+". Formal V4 fields remain unchanged.";box.append(note);
 const exp=document.createElement("button");exp.type="button";exp.className="btn";exp.textContent="Export bridge evidence";exp.addEventListener("click",()=>download(record,courseId+"-authority-bridge.json"));box.append(exp);
 host.append(box);
}
function boot(){
 const path=location.pathname;
 if(path.includes("/maitrise-constellation/"))addBuilder("french");
 else if(path.includes("/german-mastery-constellation/"))addBuilder("german");
 if(path.includes("/Halls/")&&document.getElementById("courseDetail")){
  renderHall();
  const host=document.getElementById("courseDetail");
  new MutationObserver(()=>{if(!document.getElementById("courseAuthorityBridgeReview"))queueMicrotask(renderHall)}).observe(host,{childList:true,subtree:false});
  document.getElementById("saveProfile")?.addEventListener("click",()=>setTimeout(renderHall,0));
  document.getElementById("tabs")?.addEventListener("click",()=>setTimeout(renderHall,0));
  window.addEventListener("khaemenes-v4-learner-change",()=>setTimeout(renderHall,0));
 }
}
window.KhaemenesCourseAuthorityBridge={schema:SCHEMA,prepareFrench:frenchCandidate,prepareGerman:germanCandidate,save:saveCandidate,read:readCandidate};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();