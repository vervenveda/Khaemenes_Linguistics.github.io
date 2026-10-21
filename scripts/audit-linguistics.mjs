#!/usr/bin/env node
/* Structural, dependency-free regression checks for the public Linguistics gateway.
 * Does not claim browser-level layout, audio quality, or pedagogical validation. */
import {readFileSync, existsSync} from "node:fs";
import {resolve, dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import vm from "node:vm";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const errors=[];
const check=(condition,description)=>{if(!condition)errors.push(description)};
const read=path=>readFileSync(join(root,path),"utf8");
function jsonScript(text,id){
 const escaped=id.replace(/[.*+?^\x24{}()|[\]\\]/g,"\\$&");
 const pattern=new RegExp('<script\\s+type="application/json"\\s+id="'+escaped+'">([\\s\\S]*?)<\\/script>');
 const match=text.match(pattern);
 if(!match)throw Error("Missing JSON payload: "+id);
 return JSON.parse(match[1]);
}
function syntaxCheck(html,path){
 let count=0;
 for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  if(/type=["']application\/json["']/.test(match[1])||!match[2].trim())continue;
  try{new vm.Script(match[2],{filename:path})}catch(error){errors.push(path+": "+error.message)}
  count++;
 }
 return count;
}
const home=read("index.html"),french=read("apps/French_101_index.html"),hall=read("Halls/index.html"),v3=read("Halls/language-learning-v3_index.html"),language=read("assets/vnv-language.js");
const apps=jsonScript(home,"appRegistry");
check(apps.length===30,"Homepage application count must match advertised 30");
const seen=new Set();
for(const app of apps){
 check(!seen.has(app.file),"Duplicate app destination: "+app.file);seen.add(app.file);
 check(typeof app.file==="string"&&!app.file.includes("..")&&existsSync(join(root,"apps",app.file)),"Missing app destination: "+app.file);
}
const hallData=JSON.parse(hall.match(/<script\s+type="application\/json"[^>]*>([\s\S]*?)<\/script>/)[1]);
check(Object.keys(hallData.languages||{}).length===5,"Expected five formal program languages");
check(hallData.levels?.length===11,"Expected eleven stages per formal language");
for(const [key,program] of Object.entries(hallData.languages||{})){
 check(program.stages?.length===11,"Program "+key+" must have eleven stage definitions");
 for(let i=0;i<(program.stages||[]).length;i++){
  const stage=program.stages[i],weeks=hallData.levels[i]?.weeks||0;
  const themes=stage.themes?.length||0;
  check((weeks===36&&themes===6)||(weeks===16&&themes===4),key+" stage "+i+" themes mismatch for "+weeks+" weeks");
 }
}
const previous=JSON.parse(v3.match(/<script\s+type="application\/json"[^>]*>([\s\S]*?)<\/script>/)[1]);
check(previous.cards?.length===206,"Historical world-language atlas must retain 206 dossiers");
check(previous.modules?.length===40,"Foundations library must retain 40 modules");
const lessonMatch=french.match(/const LESSONS=(\{[^\n]*\});/);
check(Boolean(lessonMatch),"French 101 requires structured lesson data");
if(lessonMatch){
 const lessons=JSON.parse(lessonMatch[1]);
 check(Object.keys(lessons).length===12,"French 101 must have 12 lessons");
 for(let i=1;i<=12;i++)check(lessons[i]?.length===5,"French level "+i+" must have five practice phrases");
}
check(french.includes("score>=Math.ceil(set.length*.8)"),"French 101 quiz must require 80%");
check(french.includes("score>=8"),"French 101 final must require 8/10");
check(french.includes("function makeListeningPractice("),"French listening activity missing");
check(french.includes("function addFrenchMatchingGame("),"French matching game missing");
check(french.includes("addFrenchMatchingGame(box,level)"),"French matching game not wired into lessons");
check(french.includes("function addFrenchGameShelf("),"Academy language-game shelf missing");
const cafe=read("apps/le-monde-vivant/index.html");
check(french.includes('link.href="./le-monde-vivant/"'),"French 101 Level 7 must link to café mission");
check(cafe.includes('const steps=['),"French café mission scenes missing");
check(cafe.includes('steps.length-1?"Finish mission"'),"French café mission completion path missing");
check(cafe.includes('graded:false'),"French café practice must remain explicitly ungraded");
check(cafe.includes('function draw()'),"French café rendering function missing");
check(cafe.includes('id="products"'),"French café interactive objects missing");
check(cafe.includes('function basketTotal()'),"French café basket calculation missing");
check(cafe.includes('function renderTheater()'),"French conversation theater missing");
check(cafe.includes('function startTheater()'),"French theater restart missing");
check(cafe.includes('paintCart();'),"French café basket initialization missing");
syntaxCheck(cafe,"apps/le-monde-vivant/index.html");
const storyStudio=read("apps/chroniques-francophones/index.html");
const soundStudio=read("apps/atelier-des-sons/index.html");
const masteryMap=read("apps/maitrise-constellation/index.html");
for(const [path,html] of [["apps/chroniques-francophones/index.html",storyStudio],["apps/atelier-des-sons/index.html",soundStudio],["apps/maitrise-constellation/index.html",masteryMap]])syntaxCheck(html,path);
check(cafe.includes("missionRecorded=true"),"French café mission duplicate completion guard missing");
check(cafe.includes("theaterRecorded=true"),"French theater duplicate completion guard missing");
check(storyStudio.includes("storyRecorded=true"),"French story duplicate completion guard missing");
const storyDataset=storyStudio.match(/const STORIES=(\[[^;]+\]);/);
check(Boolean(storyDataset),"French graded reader dataset missing");
if(storyDataset){
 const stories=JSON.parse(storyDataset[1]);
 check(stories.length===12,"French reader must include twelve stories");
 for(let i=0;i<12;i++){const story=stories[i];check(story?.level===i+1,"French story level mismatch "+(i+1));check(story?.lines?.length>=5,"French story too short "+(i+1));check(story?.questions?.length>=2,"French story comprehension missing "+(i+1));}
}
check(storyStudio.includes('level===7?"cafe_story"'),"French café legacy evidence compatibility missing");
check(french.includes('./chroniques-francophones/?level="+level'),"French story level-specific deep links missing");
check(storyStudio.includes('new URLSearchParams(location.search).get("level")'),"French story query-level navigation missing");
check(storyStudio.includes('function renderVocabulary()'),"French reading vocabulary guidance missing");
check(storyStudio.includes('function sequenceQuestion()'),"French story sequencing practice missing");
check(storyStudio.includes('id="inference"'),"French story written inference missing");
check(storyStudio.includes('writingKey()+"_inference"'),"French inference learner-specific storage missing");
check(storyStudio.includes('id="wordDetail"'),"French selectable expression explorer missing");
check(masteryMap.includes('readingByLevel:titles.map'),"Mastery constellation reading history missing");
check(soundStudio.includes("soundAnswered=true"),"French sound practice duplicate answer guard missing");
check(soundStudio.includes('soundPlayed&&!soundWrong'),"French first-try listening evidence qualification missing");
check(soundStudio.includes('sound_guided_study'),"French guided sound study distinction missing");
check(storyStudio.includes('khaemenes_french_story_cafe_writing_v2_'),"French story learner-specific draft storage missing");
check(masteryMap.includes('soundListeningFirstTry:countActivity'),"Mastery map first-try listening evidence missing");
check(masteryMap.includes('soundGuided:countActivity'),"Mastery map guided sound evidence missing");
check(masteryMap.includes("practiceAttempts:{"),"French learner practice dashboard missing");
check(french.includes("./maitrise-constellation/"),"French 101 mastery map link missing");

for(const p of ["apps/atelier-des-sons/index.html","apps/chroniques-francophones/index.html"]){const html=read(p);syntaxCheck(html,p);check(html.includes("Khaemenes Academy"),p+" Academy attribution missing")}
check(french.includes("./atelier-des-sons/"),"French 101 sound studio link missing");
check(french.includes("./chroniques-francophones/"),"French 101 story reader link missing");
check(cafe.includes("../atelier-des-sons/"),"Café sound studio link missing");
check(cafe.includes("../chroniques-francophones/"),"Café story reader link missing");
check(french.includes("addFrenchGameShelf(box)"),"Academy language-game shelf not wired into lessons");
check(french.includes("makeListeningPractice(box,level)"),"French lesson must present listening practice");
check(french.includes('direction:i<3?"fr-en":"en-fr"'),"French quiz must cover both translation directions");
check(french.includes("matchesTranslation(set[index],input.value)"),"French quiz accepted translations missing");
check(french.includes("function exportFrenchPortfolio("),"French portfolio export missing");
check(french.includes("learnerKey+\"_writing_\"+level"),"French learner-specific writing missing");
check(french.includes("assessmentSession++"),"French stale-assessment guard missing");
check(!french.includes("onclick=\"speakFR("),"French vocabulary must not use inline speaking handlers");
check(home.includes('src="./assets/vnv-language.js"'),"Homepage must load multilingual interface");
check(home.includes('href="https://vervenveda.com/Khaemenes_Academy.github.io/"'),"Homepage must link back to Academy");
check(language.includes('const CODES=["en","es","fr","ar","zh","de","ru","pt","hi","ja","ko","it","bn"]'),"Thirteen expected UI languages must be supported");
check(language.includes("function coverage()"),"Missing translation coverage report");
check(language.includes("function completeMissingTranslations()"),"Missing optional complete-text translation controls");
check(language.includes("window.confirm("),"Online translation must require explicit confirmation");
check(language.includes('const POLYGLOT_ROWS='),"Missing dedicated Polyglot translations");
const sw=read("service-worker.js");
check(sw.includes("'./assets/vnv-language.js'"),"Multilingual module missing from PWA shell");
for(const cached of ["./apps/translator.html","./assets/khaemenes-campus-phrases.js","./assets/sovereign-dictionary.generated.js","./assets/sovereign-dictionary-v1-errata.js","./assets/khaemenes-interlingual-core.js","./assets/khaemenes-review-policy.js"]){
 check(sw.includes("'"+cached+"'"),"Sovereign library missing from offline cache: "+cached);
 check(existsSync(join(root,cached)),"Sovereign library file missing: "+cached);
}

check(sw.includes("polyglot-v1.4.0-review-gate"),"PWA cache version is stale");
const ids=new Set([...home.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const x of home.matchAll(/href="#([^"]+)"/g))check(ids.has(x[1]),"Missing home anchor #"+x[1]);
const scripts=["index.html","apps/French_101_index.html","Halls/index.html","Halls/language-learning-v3_index.html"];
for(const p of scripts)syntaxCheck(read(p),p);
try{new vm.Script(language,{filename:"assets/vnv-language.js"})}catch(e){errors.push(e.message)}
try{new vm.Script(sw,{filename:"service-worker.js"})}catch(e){errors.push(e.message)}
if(errors.length){
 console.error("LINGUISTICS_INTEGRITY=FAIL\n"+errors.map(e=>" - "+e).join("\n"));
 process.exitCode=1;
}else{
 console.log("LINGUISTICS_INTEGRITY=PASS; apps=30, formal=5x11, atlas=206, foundations=40, French=12x5, languages=13");
}
