#!/usr/bin/env node
import {readFileSync} from "node:fs";
import vm from "node:vm";

const code=readFileSync("assets/course-authority-bridge.js","utf8");
class Store{
 constructor(){this.m=new Map()}
 getItem(k){return this.m.has(k)?this.m.get(k):null}
 setItem(k,v){this.m.set(String(k),String(v))}
 removeItem(k){this.m.delete(String(k))}
 key(i){return [...this.m.keys()][i]??null}
 get length(){return this.m.size}
}
const localStorage=new Store();
const window={};
const document={readyState:"loading",addEventListener(){}};
const sandbox={window,document,localStorage,location:{pathname:"/test/"},URL,Blob,console,setTimeout,clearTimeout,Date,JSON,Math,Number,String,Array,Set,Error,Object,Boolean};
vm.createContext(sandbox);
new vm.Script(code,{filename:"course-authority-bridge.js"}).runInContext(sandbox);
const api=window.KhaemenesCourseAuthorityBridge;
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};
check(Boolean(api),"Bridge API not exposed");

function id(name,locale="en"){return Array.from(name.trim().toLocaleLowerCase(locale),c=>c.codePointAt(0).toString(16)).join("-")}
function set(k,v){localStorage.setItem(k,typeof v==="string"?v:JSON.stringify(v))}
const alice=id("Alice"),bob=id("Bob");
const aliceKey="french101_progress_v2_"+alice,bobKey="french101_progress_v2_"+bob;
const completeProgress=exam=>{const p={examPassed:true,examScore:exam,u01CheckpointPassed:true};for(let i=1;i<=12;i++){p[i]="completed";p["quizScore_"+i]=8;p["quizTotal_"+i]=10}return p};
set(aliceKey,completeProgress(8));
set(bobKey,{1:"completed",quizScore_1:9,quizTotal_1:10,examPassed:false});
set(aliceKey+"_writing_1","bonjour");
set("khaemenes_french_portfolio_review_v1_"+aliceKey,"review note");
set("arshif.languageHall.v4",JSON.stringify({sentinel:"must-not-change",courses:{}}));
const before=localStorage.getItem("arshif.languageHall.v4");

const a=api.prepareFrench("Alice"),b=api.prepareFrench("Bob");
check(a.learnerRecordId!==b.learnerRecordId,"French learner IDs collided");
check(a.evidence.completedLevels===12,"Alice French completion summary wrong");
check(a.evidence.quizzesAtOrAbove80===12,"Alice French 80% quiz summary wrong");
check(a.evidence.finalExamPercent===80,"Alice French final percentage wrong");
check(a.evidence.parentTeacherNotesPresent===true,"French portfolio review compatibility key not detected");
check(a.review.candidateReadyForHumanReview===true,"Alice should be review-ready, not mastered");
check(b.evidence.completedLevels===1,"Bob French evidence leaked from Alice");
check(b.review.candidateReadyForHumanReview===false,"Bob incorrectly review-ready");
api.save(a);api.save(b);
check(api.read("french-101","Alice","en").learnerRecordId===alice,"Alice bridge retrieval failed");
check(api.read("french-101","Bob","en").learnerRecordId===bob,"Bob bridge retrieval failed");
check(localStorage.getItem("arshif.languageHall.v4")===before,"French bridge mutated V4 authority record");

let anonymousRejected=false;try{api.prepareFrench("")}catch{anonymousRejected=true}
check(anonymousRejected,"Anonymous French bridge was not rejected");

const anna=id("Anna","de"),ben=id("Ben","de");
set("khaemenes_german_coach_v2_"+anna+"_gt_trav_completed",[1,2,3]);
set("khaemenes_german_coach_v2_"+anna+"_gt_trav_examHistory",[{pct:75,passed:true}]);
set("khaemenes_german_coach_v2_"+ben+"_gt_trav_completed",[1]);
set("khaemenes_german_coach_v2_"+ben+"_gt_trav_examHistory",[{pct:85,passed:true}]);
set("german_active_learner","Anna");
const ga=api.prepareGerman("Anna"),gb=api.prepareGerman("Ben");
check(ga.evidence.coachDaysCompleted===3,"Anna German completion summary wrong");
check(ga.evidence.bestExamPercent===75,"Anna German exam summary wrong");
check(ga.evidence.academy80ExamEvidence===false,"Legacy 75% German pass was incorrectly promoted to Academy 80% evidence");
check(gb.evidence.coachDaysCompleted===1,"Ben German evidence leaked from Anna");
check(gb.evidence.academy80ExamEvidence===true,"Ben 85% German exam not recognized as 80%+ evidence");
api.save(ga);api.save(gb);
check(localStorage.getItem("arshif.languageHall.v4")===before,"German bridge mutated V4 authority record");

let germanAnonymousRejected=false;try{api.prepareGerman("")}catch{germanAnonymousRejected=true}
check(germanAnonymousRejected,"Anonymous German bridge was not rejected");

if(errors.length){
 console.error("AUTHORITY_BRIDGE_TWO_LEARNER=FAIL\n"+errors.map(x=>" - "+x).join("\n"));
 process.exitCode=1;
}else{
 console.log("AUTHORITY_BRIDGE_TWO_LEARNER=PASS; french=2; german=2; V4-mutations=0; anonymous=blocked");
}
