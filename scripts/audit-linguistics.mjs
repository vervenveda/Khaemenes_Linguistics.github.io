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
check(apps.length===29,"Homepage application registry expected 29 current entries");
check(new Set(apps.map(app=>app.file)).size===apps.length,"Homepage app registry contains duplicate paths");
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
check(storyStudio.includes('Math.floor(Math.random()*(j+1))'),"French story comprehension choices must shuffle");
check(storyStudio.includes('correct:j===q.answer'),"French story correct-answer identity must survive shuffling");
check(storyStudio.includes('if(answers.length!==idx)return'),"French story must reject duplicate answers");
const lexiconMatch=storyStudio.match(/^const FRENCH_LEXICON=(.*);$/m);
check(Boolean(lexiconMatch),"French reader dictionary missing");
if(lexiconMatch){const words=JSON.parse(lexiconMatch[1]);check(Object.keys(words).length>=30,"French reader vocabulary too small");check(Boolean(words.bonjour?.meaning&&words.bonjour?.part),"French word grammar attributes missing")}
check(storyStudio.includes('function speakVocabulary('),"French vocabulary pronunciation action missing");
check(masteryMap.includes('readingByLevel:titles.map'),"Mastery constellation reading history missing");
check(soundStudio.includes("soundAnswered=true"),"French sound practice duplicate answer guard missing");
check(soundStudio.includes('soundPlayed&&!soundWrong'),"French first-try listening evidence qualification missing");
check(soundStudio.includes('sound_guided_study'),"French guided sound study distinction missing");
check(soundStudio.includes("sound_audio_assisted_first_try"),"Sound lab revised evidence category missing");
check(soundStudio.includes('b.disabled=true;b.onclick='),"Sound choices must require an initial audio attempt");
check(storyStudio.includes('sovereign-dictionary.generated.js'),"Read-only canonical dictionary connection missing");
check(storyStudio.includes("function canonicalDictionaryReference("),"Dictionary provenance adapter missing");
check(storyStudio.includes("const FRENCH_NARRATORS="),"French narrator profiles missing");
check(storyStudio.includes("function frenchVoice(profile)"),"French voice matching missing");
check(storyStudio.includes("function stopNarration()"),"Narration stop action missing");
check(storyStudio.includes("function highlightSentence(i)"),"French sentence highlighting missing");
check(storyStudio.includes("function speakFrom(start,oneSentence=false)"),"Sequential French narration missing");
check(storyStudio.includes('id="repeatSentence"'),"Repeat-sentence control missing");
check(storyStudio.includes('id="practiceSentence"'),"Spoken rehearsal control missing");
check(storyStudio.includes("utterance.onend="),"Narration sentence progression missing");
check(storyStudio.includes('p.tabIndex=0'),"French reader keyboard-focusable sentences missing");
check(storyStudio.includes('e.key==="Enter"||e.key===" "'),"French reader keyboard activation missing");
check(storyStudio.includes('function narrateStory(){speakFrom(activeSentence)}'),"French narration must begin at selected sentence");
check(storyStudio.includes('"narrationSpeed").addEventListener("change",stopNarration)'),"Speed changes must cancel active narration");
check(storyStudio.includes('id="narratorStatus"'),"Narration status missing");
check(storyStudio.includes("voices.filter(v=>/^fr("),"French voice locale preference missing");
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
for(const path of ["apps/deutsche-geschichten/index.html","apps/deutsches-klanglabor/index.html","apps/die-lebendige-welt/index.html","apps/german-mastery-constellation/index.html"]){const html=read(path);check(html.includes('e.key==="german_active_learner"'),"German learner cross-tab refresh missing: "+path)}
check(read("apps/German_coach_index.html").includes("function coachKey(key)"),"German Coach learner-scoped key resolver missing");
check(read("apps/German_coach_index.html").includes("function replaceCoachPortfolioSafely(values)"),"German Coach import rollback missing");
for(const token of ["function coachExportData()","function exportLegacyBackup()","learnerRecord:coachLearnerId()","legacy-shared-device"]){check(read("apps/German_coach_index.html").includes(token),"German Coach export safeguard missing "+token)}
for(const token of ["function validateCoachImport(input)","function previewCoachImport()","function confirmCoachImport()",'confirmCoachImport").disabled=true',"data.source!==target","confirm(\"Replace all German Coach progress"]){check(read("apps/German_coach_index.html").includes(token),"German Coach import safeguard missing "+token)}

check(read("apps/German_coach_index.html").includes("khaemenes_german_coach_v2_"),"German Coach named learner namespace missing");
check(read("apps/German_coach_index.html").includes("coachKey('gt_trav_completed')"),"German Coach reset must use selected learner's namespace");
check(read("apps/deutsches-klanglabor/index.html").includes("u.onerror="),"German sound audio-failure handler missing");
check(read("apps/deutsches-klanglabor/index.html").includes("audio_assisted_first_try"),"German sound audio-assisted evidence missing");
for(const path of ["apps/deutsche-geschichten/index.html","apps/german-mastery-constellation/index.html","apps/deutsches-klanglabor/index.html","apps/die-lebendige-welt/index.html"]){
 const app=read(path);
 check(!/<script[^>]+src=[^>]*>\\s*window\\.addEventListener/.test(app),"Ignored external-script learner handler in "+path);
 check(app.includes('window.addEventListener("storage"'),"Learner switching listener absent: "+path);
}
check(read("apps/die-lebendige-welt/index.html").includes("Audio playback failed"),"German world missing audio-error fallback");
for(const path of ["apps/deutsche-geschichten/index.html","apps/deutsches-klanglabor/index.html","apps/die-lebendige-welt/index.html"]){const page=read(path);check(page.includes("overflow-wrap:anywhere"),"German page lacks narrow-screen word wrapping: "+path);check(page.includes("a:focus-visible"),"German link focus styling missing: "+path);check(page.includes("max-width:300px"),"German mobile breakpoint missing: "+path)}
const germanMap=read("apps/german-mastery-constellation/index.html");
syntaxCheck(germanMap,"apps/german-mastery-constellation/index.html");
check(germanMap.includes("function snapshot()"),"German read-only mastery summary missing");
for(const key of ["gt_trav_completed","gt_trav_quizHistory","gt_trav_examHistory","khaemenes_german_stories_v1_","khaemenes_german_sound_v1_","khaemenes_german_world_v1_"])check(germanMap.includes(key),"German mastery source missing "+key);
check(germanMap.includes("Legacy shared-device Coach data"),"German Coach shared legacy attribution missing");
check(germanMap.includes("coachPrefix+"),"German dashboard learner-scoped Coach adapter missing");
check(germanMap.includes('graded:false'),"German dashboard export must remain ungraded");
const germanWorld=read("apps/die-lebendige-welt/index.html");
syntaxCheck(germanWorld,"apps/die-lebendige-welt/index.html");
const germanWorldSet=germanWorld.match(/const SCENES=(\[[^;]+\]);/);
check(Boolean(germanWorldSet),"German conversation missions missing");
const followups=germanWorld.match(/const FOLLOWUPS=(\[[\s\S]*?\]);\s*let conversationStep=/);
check(Boolean(followups),"German conversation followups missing");
if(followups){const items=vm.runInNewContext("("+followups[1]+")",Object.create(null),{timeout:1000});check(items.length===3,"German world followups must cover three missions");for(const item of items)check(item.options.length===3&&item.options.filter(x=>x[2]).length===1,"German followup responses invalid: "+item.prompt)}
check(germanWorld.includes("record(firstTurnCorrect&&item.correct)"),"German completion must require both correct dialogue turns");
for(const token of ["const VOCABULARY=","function showVocabulary()","function renderPrintout()","window.print()"]){check(germanWorld.includes(token),"German world vocabulary/portfolio feature missing: "+token)}
check(!germanWorld.includes('defer>window.addEventListener'),"German cross-tab listener must not sit inside external-script element");

if(germanWorldSet){const scenes=JSON.parse(germanWorldSet[1]);check(scenes.length===3,"German conversation world must have three missions");for(const scene of scenes)check(scene.options.length===3&&scene.words.length===3&&scene.options.filter(x=>x[2]).length===1,"German mission answer bank invalid: "+scene.title)}
for(const path of ["apps/German_hub_index.html","apps/German_coach_index.html"])check(read(path).includes("./die-lebendige-welt/"),"German world link missing from "+path);
check(read("apps/deutsche-geschichten/index.html").includes("../die-lebendige-welt/"),"German story-to-world link missing");
const germanSounds=read("apps/deutsches-klanglabor/index.html");
syntaxCheck(germanSounds,"apps/deutsches-klanglabor/index.html");
const germanSoundSet=germanSounds.match(/const TOPICS=(\[[\s\S]*?\]);const \$=/);
check(Boolean(germanSoundSet),"German sound dataset missing");
if(germanSoundSet)check(JSON.parse(germanSoundSet[1]).length===6,"German Sound Lab must include six sound investigations");
check(germanSounds.includes("audio_assisted_first_try"),"German listening evidence category missing");
check(germanSounds.includes("guided_study"),"German text-supported practice distinction missing");
check(!germanSounds.includes("defer>window.addEventListener"),"German sound listener incorrectly placed");
check(read("apps/German_hub_index.html").includes("./deutsches-klanglabor/"),"German Hub sound lab link missing");
check(read("apps/German_coach_index.html").includes("./deutsches-klanglabor/"),"German Coach sound lab link missing");
check(read("apps/deutsche-geschichten/index.html").includes("../deutsches-klanglabor/"),"German reader sound lab link missing");
const germanStories=read("apps/deutsche-geschichten/index.html");
syntaxCheck(germanStories,"apps/deutsche-geschichten/index.html");
const germanSet=germanStories.match(/const STORIES=(\[[^;]+\]);/);
check(Boolean(germanSet),"German story dataset missing");
if(germanSet){const rows=JSON.parse(germanSet[1]);check(rows.length===12,"German reader must have 12 stories");for(let i=0;i<rows.length;i++)check(rows[i].level===i+1&&rows[i].lines.length>=5&&rows[i].questions.length>=2,"German story progression incomplete: "+(i+1))}
check(germanStories.includes('lang="de"'),"German narration language metadata missing");
check(germanStories.includes('function play(one=false)'),"German narration replay engine missing");
check(read("apps/German_hub_index.html").includes("./deutsche-geschichten/"),"German Hub reading route missing");
check(read("apps/German_coach_index.html").includes("./deutsche-geschichten/"),"German Coach reading route missing");
const sw=read("service-worker.js");
check(sw.includes("'./assets/vnv-language.js'"),"Multilingual module missing from PWA shell");
for(const cached of ["./apps/translator.html","./assets/khaemenes-campus-phrases.js","./assets/sovereign-dictionary.generated.js","./assets/sovereign-dictionary-v1-errata.js","./assets/khaemenes-interlingual-core.js","./assets/khaemenes-review-policy.js"]){
 check(sw.includes("'"+cached+"'"),"Sovereign library missing from offline cache: "+cached);
 check(existsSync(join(root,cached)),"Sovereign library file missing: "+cached);
}

check(sw.includes("polyglot-v1.4.5-german-constellation"),"PWA cache version is stale");
check(sw.includes("'./apps/german-mastery-constellation/index.html'"),"German mastery overview not precached");
check(sw.includes("'./apps/die-lebendige-welt/index.html'"),"German world missing from offline pre-cache");
check(sw.includes("'./apps/deutsches-klanglabor/index.html'"),"German Sound Lab missing from offline pre-cache");
for(const file of ["./apps/German_hub_index.html","./apps/German_coach_index.html","./apps/deutsche-geschichten/index.html"]){check(sw.includes("'"+file+"'"),"German offline cache entry missing "+file);check(existsSync(join(root,file)),"German offline file missing "+file)}

for(const path of ["./apps/French_101_index.html","./apps/chroniques-francophones/index.html","./apps/atelier-des-sons/index.html","./apps/le-monde-vivant/index.html","./apps/maitrise-constellation/index.html"]){
 check(sw.includes("'"+path+"'"),"French learning tool missing from offline cache: "+path);
 check(existsSync(join(root,path)),"Missing French offline target: "+path);
}
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
