(function attachKhaemenesLinguisticsContinuation(global){
"use strict";
const VERSION="1.0.0",PASS=80;
const REGISTRY_URL="https://vervenveda.com/Khaemenes_Academy.github.io/assets/khaemenes-family-registry.js";
const CONT_URL="https://vervenveda.com/Khaemenes_Academy.github.io/assets/khaemenes-learning-continuation.js";
const COURSES={
 "arabic-1":{title:"Arabic I",language:"Arabic"},
 "russian-1":{title:"Russian I",language:"Russian"}
};
function loadScript(src){return new Promise((resolve,reject)=>{const e=[...document.scripts].find(s=>s.src===src);if(e){if(e.dataset.khaeReady==="1"||e.readyState==="complete")return resolve(e);e.addEventListener("load",()=>resolve(e),{once:true});e.addEventListener("error",reject,{once:true});return}const s=document.createElement("script");s.src=src;s.async=false;s.addEventListener("load",()=>{s.dataset.khaeReady="1";resolve(s)},{once:true});s.addEventListener("error",reject,{once:true});document.head.append(s)})}
function context(){
 const path=decodeURIComponent(global.location?.pathname||"");
 const m=path.match(/\/Halls\/courses\/(arabic-1|russian-1)(?:\/week-(\d{2}))?/i);
 if(!m)return null;
 const id=m[1].toLowerCase(),week=m[2]?Number(m[2]):null;
 return {courseId:id,week,...COURSES[id]};
}
function learner(){
 const R=global.KhaemenesFamilyRegistry;if(!R)return null;
 const ids=R.activeIds?.()||{},adult=R.getAdult?.(ids.adultId)||null;
 let l=R.getLearner?.(ids.learnerId)||null;
 if(!l&&adult)l=R.getAdultLearner?.(adult.adultId)||null;
 return l||null;
}
function key(l,c){return `khaemenes.linguistics.progress.v1:${encodeURIComponent(l.learnerId)}:${c.courseId}`}
function blank(){return {version:1,lastVisitedWeek:null,weeks:{},midterm:null,final:null,updatedAt:null}}
function read(l,c){try{const x=JSON.parse(localStorage.getItem(key(l,c))||"null");return x&&typeof x==="object"?Object.assign(blank(),x):blank()}catch{return blank()}}
function save(l,c,s){try{s.updatedAt=new Date().toISOString();localStorage.setItem(key(l,c),JSON.stringify(s));return true}catch{return false}}
function clamp(n){n=Number(n);return Number.isFinite(n)?Math.max(0,Math.min(100,n)):null}
function bestQuiz(s,w){return clamp(s.weeks?.[w]?.bestScore)}
function recordQuiz(l,c,w,score){
 score=clamp(score);if(score===null)return;
 const s=read(l,c),prior=s.weeks[w]||{bestScore:0,attempts:0};
 s.lastVisitedWeek=Math.max(Number(s.lastVisitedWeek)||0,w);
 s.weeks[w]={bestScore:Math.max(Number(prior.bestScore)||0,score),latestScore:score,attempts:(Number(prior.attempts)||0)+1,updatedAt:new Date().toISOString()};
 save(l,c,s);publish(l,c,s);
}
function recordAssessment(l,c,kind,score){
 score=clamp(score);if(score===null)return;
 const s=read(l,c),prior=s[kind]||{bestScore:0,attempts:0};
 s[kind]={bestScore:Math.max(Number(prior.bestScore)||0,score),latestScore:score,attempts:(Number(prior.attempts)||0)+1,updatedAt:new Date().toISOString()};
 s.lastVisitedWeek=Math.max(Number(s.lastVisitedWeek)||0,kind==="midterm"?16:32);
 save(l,c,s);publish(l,c,s);
}
function action(c,s){
 let w=Math.max(1,Math.min(32,Number(s.lastVisitedWeek)||1));
 if(w===16){
   const best=clamp(s.midterm?.bestScore);
   if(best===null)return {status:"assessment",label:"Midterm Review",title:"Week 16 · Instructor-Reviewed Midterm",href:"week-16/index.html",summary:"The public page is an assessment blueprint. Record the instructor-reviewed result after administration.",best:null};
   if(best<PASS)return {status:"corrections",label:"Review Midterm",title:"Week 16 · Midterm Reassessment",href:"week-16/index.html",summary:`Instructor-reviewed midterm result: ${Math.round(best)}%. Review and reassess as appropriate.`,best};
   w=17;
 }
 if(w===32){
   const best=clamp(s.final?.bestScore);
   if(best===null)return {status:"assessment",label:"Final Review",title:"Week 32 · Instructor-Reviewed Final",href:"week-32/index.html",summary:"The public page is a final assessment blueprint. Record the instructor-reviewed result after administration.",best:null};
   if(best<PASS)return {status:"corrections",label:"Review Final",title:"Week 32 · Final Reassessment",href:"week-32/index.html",summary:`Instructor-reviewed final result: ${Math.round(best)}%. Review and reassess as appropriate.`,best};
   return {status:"complete",label:"Review Language Portfolio",title:`${c.title} · Year I Complete`,href:"week-32/index.html",summary:"The full 32-week sequence and instructor-reviewed final have been recorded.",best:100};
 }
 const best=bestQuiz(s,w);
 if(best!==null&&best>0&&best<PASS)return {status:"practice",label:"Practice This Week",title:`Week ${String(w).padStart(2,"0")} · Readiness Practice`,href:`week-${String(w).padStart(2,"0")}/index.html`,summary:`Best formative quiz score: ${Math.round(best)}%. Review the lesson and retry; teacher listening/writing evidence remains separate.`,best};
 if(best!==null&&best>=PASS){
   const next=w===15?16:w===31?32:Math.min(32,w+1);
   if(next===16)return {status:"assessment",label:"Open Midterm",title:"Week 16 · Instructor-Reviewed Midterm",href:"week-16/index.html",summary:"Weeks 01–15 readiness work is recorded. The instructor-reviewed midterm is the next course milestone.",best};
   if(next===32)return {status:"assessment",label:"Open Final",title:"Week 32 · Instructor-Reviewed Final",href:"week-32/index.html",summary:"Weeks 17–31 readiness work is recorded. The instructor-reviewed final is the next course milestone.",best};
   return {status:"continue",label:"Continue Language Course",title:`Week ${String(next).padStart(2,"0")}`,href:`week-${String(next).padStart(2,"0")}/index.html`,summary:"Continue to the next 32-week language lesson.",best};
 }
 return {status:"continue",label:"Continue Language Course",title:`Week ${String(w).padStart(2,"0")}`,href:`week-${String(w).padStart(2,"0")}/index.html`,summary:"Continue the current language week and complete its formative readiness evidence.",best:null};
}
function publish(l,c,s=read(l,c)){
 const C=global.KhaemenesLearningContinuation;if(!C?.publish||!l?.learnerId)return false;
 const a=action(c,s);
 const quizReady=Object.entries(s.weeks||{}).filter(([,r])=>Number(r?.bestScore)>=PASS).length;
 const completed=quizReady+(Number(s.midterm?.bestScore)>=PASS?1:0)+(Number(s.final?.bestScore)>=PASS?1:0);
 try{
   C.publish({
     learnerId:l.learnerId,courseId:`linguistics:${c.courseId}`,school:"Khaemenes Linguistics",stage:l.stage||"linguistics",grade:l.grade||"",
     subject:"World Languages",courseTitle:c.title,status:a.status,nextLabel:a.label,nextTitle:a.title,nextHref:a.href,summary:a.summary,
     progress:{completed,total:32,percent:Math.round(completed/32*100)},
     mastery:{best:a.best,threshold:PASS,mastered:a.status==="complete"},
     family:{needsAction:false,label:"",summary:"",href:""},
     source:`linguistics-${c.courseId}-continuation`
   });return true;
 }catch{return false}
}
function injectContinueCard(l,c,s){
 if(c.week!==null||document.getElementById("khaeLanguageContinue"))return;
 const header=document.querySelector("main>header,header");if(!header)return;
 const a=action(c,s),section=document.createElement("section");section.id="khaeLanguageContinue";
 section.innerHTML=`<h2 style="margin-top:0">Continue ${c.title}</h2><p><strong>${a.title}</strong></p><p>${a.summary}</p><p><a href="${a.href}" style="display:inline-flex;min-height:42px;align-items:center;justify-content:center;padding:8px 12px;border:1px solid #8b744e;border-radius:7px;background:#fff8ea;text-decoration:none"> ${a.label} → </a></p>`;
 header.insertAdjacentElement("afterend",section);
}
function injectAssessmentRecorder(l,c,s){
 if(![16,32].includes(c.week)||document.getElementById("khaeLanguageAssessmentRecord"))return;
 const kind=c.week===16?"midterm":"final",prior=clamp(s[kind]?.bestScore);
 const section=document.createElement("section");section.id="khaeLanguageAssessmentRecord";
 section.innerHTML=`<h2>Record instructor-reviewed result</h2><p>This control records the reviewed rubric total as a percentage for learner continuity. It does not auto-grade the assessment, create secure exam content, or award external credit.</p><label style="display:grid;gap:6px;max-width:320px;margin:auto">Reviewed score (0–100)<input id="khaeLanguageReviewedScore" type="number" min="0" max="100" value="${prior??""}" style="min-height:42px;padding:8px;border:1px solid #8b744e;border-radius:7px;background:#fff"></label><p><button id="khaeLanguageSaveReviewed" type="button">Save reviewed result</button></p><p id="khaeLanguageRecordStatus" role="status" aria-live="polite"></p>`;
 const main=document.querySelector("main");main?.append(section);
 document.getElementById("khaeLanguageSaveReviewed")?.addEventListener("click",()=>{
   const n=clamp(document.getElementById("khaeLanguageReviewedScore")?.value),out=document.getElementById("khaeLanguageRecordStatus");
   if(n===null){if(out)out.textContent="Enter a score from 0 to 100.";return}
   recordAssessment(l,c,kind,n);if(out)out.textContent=`Reviewed result saved: ${Math.round(n)}%.`;
 });
}
function bindQuiz(l,c){
 if(!c.week||[16,32].includes(c.week))return;
 const button=document.getElementById("checkQuiz")||document.getElementById("grade");
 if(!button||button.dataset.khaeContinuityBound==="1")return;
 button.dataset.khaeContinuityBound="1";
 button.addEventListener("click",()=>setTimeout(()=>{
   const status=document.getElementById("quizStatus")||document.getElementById("status");
   const m=String(status?.textContent||"").match(/(\d+)\s*\/\s*(\d+)/);
   if(!m||Number(m[2])<=0)return;
   const pct=Math.round(Number(m[1])/Number(m[2])*100);
   recordQuiz(l,c,c.week,pct);
 },30));
}
async function boot(){
 const c=context();if(!c)return;
 try{if(!global.KhaemenesFamilyRegistry)await loadScript(REGISTRY_URL);if(!global.KhaemenesLearningContinuation)await loadScript(CONT_URL)}catch{}
 const l=learner();if(!l?.learnerId)return;
 const s=read(l,c);
 if(c.week){s.lastVisitedWeek=c.week;save(l,c,s)}
 bindQuiz(l,c);injectAssessmentRecorder(l,c,s);injectContinueCard(l,c,s);publish(l,c,read(l,c));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
global.KhaemenesLinguisticsContinuation=Object.freeze({version:VERSION,context,read,publish});
})(window);