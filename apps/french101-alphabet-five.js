/* French 101: Five alphabet lessons inside the preserved Lesson 01 route.
   Formative, learner-scoped. Never changes canonical V4 or legacy mastery. */
(function(){
"use strict";
const L=[
{id:"A",title:"A–G · First seven letters",letters:"ABCDEFG",names:["a","bé","cé","dé","e","effe","gé"],
why:"Learn the first seven letters; distinguish the name of a letter from its sound in a word.",
guide:["French has 26 basic alphabet letters, but each letter's French name can differ from its English name.","Write A–G in both cases. Practice recognizing each out of order and listening to each French name.","In « café », the written letters are C–A–F–É. The accent is part of the correct spelling; accents are explored fully in alphabet lesson 5."],
read:"« Bonjour ! Alice écrit A, B, C sur une carte. Elle écrit aussi le mot café. »",
gloss:"Alice writes A, B, C on a card. She also writes café.",
ask:"What three letters does Alice write? Which word does she also write? Does the text tell us the color of the card?",
task:"Close the model. Write A–G and a–g. Give the French names of three unfamiliar choices from the group, write an original name containing two of these letters, and state a detail absent from the reading.",
q:[
["What follows C?",["D","B","E"],0,"D follows C."],
["What comes before G?",["E","F","H"],1,"F comes before G."],
["Which set contains only A–G?",["A D H","B E G","C F I"],1,"B E G are within the first seven letters."],
["What is lowercase B?",["b","d","p"],0,"B maps to b."],
["What is lowercase G?",["q","g","c"],1,"G maps to g."],
["What is the French letter name for B?",["dé","gé","bé"],2,"B is named bé."],
["What is the French letter name for F?",["effe","elle","enne"],0,"F is named effe."],
["What does Alice write first?",["A, B, C","D, E, F","B, C, D"],0,"The passage gives A, B, C."],
["What word does she also write?",["merci","garçon","café"],2,"She writes café."],
["What color is the card?",["Red","Not stated","Blue"],1,"The text does not describe the card's color."]
]},
{id:"B",title:"H–N · Letter names and spelling",letters:"HIJKLMN",names:["ache","i","ji","ka","elle","emme","enne"],
why:"Identify H–N in sequence, distinguish H's letter name from sounds in words, and spell names.",
guide:["Continue the alphabet H, I, J, K, L, M, N and compare each letter with its neighbors.","H is named « ache » when spelling. The written H in « Hugo » does not make an independent pronounced consonant in the standard French pronunciation.","Spell a name letter by letter and compare it with the pronunciation of the complete name. The distinction matters for reading."],
read:"« Hugo écrit son nom : H – U – G – O. Mina écrit : M – I – N – A. Ils cherchent la lettre J. »",
gloss:"Hugo and Mina spell their names, then look for J.",
ask:"Who spells H–U–G–O? Which letters does Mina spell? What letter are they looking for? Does the passage give their ages?",
task:"Write H–N from memory, reorder N K H M J I L, spell Hugo and another name, and explain the difference between H's letter name and the sound of Hugo.",
q:[
["Which letter follows J?",["I","L","K"],2,"J is followed by K."],
["What comes before M?",["N","L","K"],1,"L precedes M."],
["Which sequence is correct?",["L M N","L N M","M L N"],0,"The order is L, M, N."],
["Which is within H–N?",["O","G","J"],2,"J belongs to H–N."],
["What is lowercase N?",["n","h","m"],0,"N corresponds to n."],
["How is H named in the alphabet?",["a","ache","ji"],1,"H is named ache."],
["Which is the French letter name for M?",["enne","elle","emme"],2,"M is named emme."],
["Who spells H–U–G–O?",["Mina","Hugo","Neither"],1,"Hugo spells his name."],
["Which letter do they seek?",["K","H","J"],2,"They look for J."],
["How old is Mina?",["Not stated","Nine","Thirteen"],0,"Her age is not given."]
]},
{id:"C",title:"O–U · Seven more letters",letters:"OPQRSTU",names:["o","pé","ku","erre","esse","té","u"],
why:"Identify O–U and learn why a written letter name differs from a word's pronunciation.",
guide:["Practice O P Q R S T U, then locate each letter out of sequence.","The French letter U is not pronounced like English « you ». Listen to a French speaking model rather than assuming English letter names.","The written spelling « tu » is T–U and « tout » is T–O–U–T. Written letters and spoken vowel sounds are different forms of evidence."],
read:"« Paul regarde une affiche. Il voit O, P, Q, R, S, T et U. Il montre U à son amie. »",
gloss:"Paul looks at a poster showing O–U and points to U.",
ask:"What appears on the poster? Which letter does Paul point to? Does the text mention a color?",
task:"Write O–U, name the neighbors of R, spell tu and tout, explain their different spellings, and write one original sentence about a letter.",
q:[
["Which letter follows P?",["R","Q","O"],1,"P is followed by Q."],
["Which comes before U?",["T","S","V"],0,"T precedes U."],
["What comes before R?",["S","Q","P"],1,"Q precedes R."],
["What is lowercase T?",["f","r","t"],2,"T corresponds to t."],
["Which ordering is correct?",["O Q P R S T U","O P Q R S T U","P O Q R S T U"],1,"O P Q R S T U is correct."],
["How is « tu » spelled?",["T–U","T–O–U","U–T"],0,"Tu has two letters: T and U."],
["How is « tout » spelled?",["T–U–T","T–O–T","T–O–U–T"],2,"Tout has four letters."],
["What letter does Paul point to?",["P","S","U"],2,"He points to U."],
["How should you learn the French name of U?",["Assume English 'you'.","Use a French voice model.","Do not attempt pronunciation."],1,"U differs from the English word you."],
["What is the color of the poster?",["White","Green","Not stated"],2,"No color is stated."]
]},
{id:"D",title:"V–Z · Complete A–Z",letters:"VWXYZ",names:["vé","double vé","iks","i grec","zède"],
why:"Finish V–Z, retrieve all 26 letters, and independently repair alphabet ordering mistakes.",
guide:["Complete the last five letters V W X Y Z. W is called « double vé » and Y « i grec » in French.","Bring all groups together: A–G, H–N, O–U and V–Z. Those four groups cover the 26 basic letters exactly once.","Close the models and write A–Z. Check omissions, repeated letters and letters written out of order."],
read:"« Zoé montre Y et Z. Yves montre V et W. Ensemble, ils récitent l'alphabet de A à Z. »",
gloss:"Zoé shows Y/Z; Yves shows V/W. They recite the alphabet.",
ask:"Who shows Y and Z? What does Yves show? What do they do together? Does the text give the time?",
task:"Write V–Z in both cases, recite A–Z without a model, repair T U W V X Y Z, spell an unfamiliar name and explain the correction.",
q:[
["What follows V?",["U","W","X"],1,"W follows V."],
["What is before Y?",["X","W","Z"],0,"X precedes Y."],
["Which is the correct ending?",["V W Y X Z","V W X Y Z","U W X Y Z"],1,"The order is V W X Y Z."],
["What is W named in French?",["double u","double vé","deux vé"],1,"W is called double vé."],
["What is Y named in French?",["elle","i grec","vé"],1,"Y is called i grec."],
["What is lowercase Z?",["y","s","z"],2,"Z corresponds to z."],
["How many basic letters are in the alphabet?",["26","25","27"],0,"French uses 26 basic Latin letters."],
["What repairs T U W V X Y Z?",["Delete V","Swap W V to V W","Change X to Q"],1,"V comes before W."],
["Who shows Y and Z?",["Yves","Both","Zoé"],2,"Zoé shows Y and Z."],
["At what time do they recite?",["Not stated","Noon","Evening"],0,"The passage gives no time."]
]},
{id:"E",title:"Accents and spelling conversations",letters:"ÉÈÊËÇ",names:["e accent aigu","e accent grave","e accent circonflexe","e tréma","c cédille"],
why:"Preserve written accents and spelling marks, ask how a name is written, and compose a meaningful exchange.",
guide:["An accented letter is not another base letter. É, È, Ê and Ë are forms of E; Ç is a form of C.","Study école (é), père (è), fête (ê), Noël (ë), and garçon (ç). Marks belong in accurate writing. Do not infer perfect pronunciation from a written accent alone.","Ask « Comment ça s'écrit ? » and spell a name with every written letter and accent. A replayed synthetic voice is rehearsal, not verified speaking or listening proficiency."],
read:"« Bonjour ! Je m'appelle Chloé. — Comment ça s'écrit ? — C – H – L – O – É. — Merci, Chloé ! »",
gloss:"Chloé is asked to spell her name and includes the accented É.",
ask:"Who introduces herself? Which question asks about spelling? What accent is in the name? Is the person's address known?",
task:"Mark each accent in école, père, fête, Noël and garçon. Correct ecole, Noel and garcon. Write an original four-line name-spelling dialogue and explain two corrections.",
q:[
["Which word uses an acute accent?",["père","Noël","école"],2,"École uses é."],
["Which word uses a grave accent?",["père","fête","garçon"],0,"Père contains è."],
["Which word uses a circumflex?",["école","fête","Noël"],1,"Fête contains ê."],
["Which word uses a diaeresis (tréma)?",["garçon","Noël","père"],1,"Noël contains ë."],
["Which word uses a cedilla?",["fête","école","garçon"],2,"Garçon contains ç."],
["Which spelling is accurate?",["ecole","ècole","école"],2,"École begins with é."],
["Which spelling preserves the name?",["Chloe","Chloé","Chloè"],1,"Chloé ends with é."],
["What does « Comment ça s'écrit ? » request?",["A price","A name's spelling","An age"],1,"It asks how something is spelled."],
["Do these marks add new basic letters?",["No","Yes","Only ç does"],0,"Marks modify base letters."],
["Does the passage say where Chloé lives?",["In France","In Canada","No"],2,"No residence is provided."]
]}
];
const LETTERS=[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
if(L.length!==5||L.slice(0,4).flatMap(x=>[...x.letters]).join("")!==LETTERS.join(""))throw Error("Alphabet groups must cover A–Z without overlap.");
for(const l of L){if(l.q.length!==10)throw Error(l.id+" incomplete");for(const q of l.q){if(q.length!==4||q[3]===""||q[2]<0||q[2]>=q[1].length||new Set(q[1]).size!==q[1].length)throw Error("Invalid question in "+l.id);}}
function E(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
function B(text,action){const b=E("button",text);b.type="button";b.addEventListener("click",action);return b;}
function S(){const p=E("p","");p.setAttribute("role","status");return p;}
function css(){
 if(document.getElementById("french-alphabet-five-style"))return;
 const x=E("style");x.id="french-alphabet-five-style";
 x.textContent="#french-alphabet-five{margin:14px auto;max-width:960px;padding:18px;border:1px solid #b3a181;border-radius:7px;background:#fffaf0;color:#25312e;line-height:1.55;font-size:16px}#french-alphabet-five :is(p,label,button,legend,textarea,summary){font-size:16px}#french-alphabet-five .alphabet-nav{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:7px}#french-alphabet-five button{min-height:45px;border:1px solid #af956a;border-radius:7px;background:#293936;color:#fff4da;padding:10px;cursor:pointer}#french-alphabet-five button[aria-current=step]{outline:3px solid #b18f46;outline-offset:1px}#french-alphabet-five button:focus-visible,#french-alphabet-five textarea:focus-visible{outline:3px solid #b18f46;outline-offset:2px}#french-alphabet-five .alphabet-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:7px}#french-alphabet-five .alphabet-cards button{min-height:60px}#french-alphabet-five textarea{width:100%;max-width:100%;min-height:115px;box-sizing:border-box;padding:12px;border:1px solid #b1a085;border-radius:7px;background:#fff;color:#25312e}#french-alphabet-five .alphabet-answer{display:flex;align-items:center;gap:10px;padding:7px 0}#french-alphabet-five .alphabet-answer input{width:20px;height:20px}#french-alphabet-five fieldset{padding:12px;margin:10px 0;border:1px solid #b6a17e;border-radius:7px}#french-alphabet-five .alphabet-actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}#french-alphabet-five .alphabet-actions button{flex:1 1 175px}#french101-unit01-day01>.french-alphabet-legacy{padding:12px;border:1px solid #b6a17e;border-radius:7px;margin:15px 0}#french101-unit01-day01>.french-alphabet-legacy summary{cursor:pointer;font-size:17px}body.printing-alphabet-five #alphabet-five-print{display:block!important;position:static!important;width:100%!important;max-width:none!important;padding:0!important;margin:0!important;background:white!important;color:black!important;font:12pt/1.5 Georgia,serif!important} @media print{body.printing-alphabet-five>*:not(#alphabet-five-print){display:none!important}body.printing-alphabet-five #alphabet-five-print p{break-inside:avoid}body.printing-alphabet-five #alphabet-five-print h3{break-after:avoid}body.printing-alphabet-five #alphabet-five-print .printline{height:26px;border-bottom:1px solid #aaa;margin:8px 0}}";
 document.head.append(x);
}
function printPart(l,env,teacher){
 const sheet=E("section");sheet.id="alphabet-five-print";
 sheet.append(E("h2","Khaemenes Academy · French 101"),E("h3","Unit One · The Alphabet · Session "+l.id+" / 5: "+l.title),E("p","Student: _______________________________  Date: ______________"));
 l.guide.forEach((g,i)=>sheet.append(E("h3","Teaching step "+(i+1)),E("p",g)));
 sheet.append(E("h3","Read"),E("p",l.read),E("p","English support: "+l.gloss),E("h3","Comprehension"),E("p",l.ask));
 for(let i=0;i<4;i++)sheet.append(E("div",undefined,"printline"));
 sheet.append(E("h3","Independent task"),E("p",l.task));
 const wrote=env.safeGet(env.learnerKey+"_alphabetFive_"+l.id+"_writing_v1");
 if(wrote)sheet.append(E("p","Learner writing: "+wrote));
 for(let i=0;i<5;i++)sheet.append(E("div",undefined,"printline"));
 sheet.append(E("h3","Correction journal"),E("p",env.safeGet(env.learnerKey+"_alphabetFive_"+l.id+"_corrections_v1")||"Explain an error and your correction."));
 for(let i=0;i<3;i++)sheet.append(E("div",undefined,"printline"));
 sheet.append(E("h3",teacher?"Educator answer key and rubric":"Independent practice check"));
 l.q.forEach((q,i)=>sheet.append(E("p",(i+1)+". "+q[0]+(teacher?" Answer: "+q[1][q[2]]+". "+q[3]:" _____________________________"))));
 if(teacher)sheet.append(E("p","Rubric: spelling/order, comprehension, independent transfer, corrections (0–3). Human-observed listening/speaking assessed separately or Not assessed."));
 const prior=document.getElementById("alphabet-five-print");if(prior)prior.remove();
 document.body.append(sheet);document.body.classList.add("printing-alphabet-five");
 let cleaned=false;const clean=()=>{if(cleaned)return;cleaned=true;sheet.remove();document.body.classList.remove("printing-alphabet-five");window.removeEventListener("afterprint",clean);};
 window.addEventListener("afterprint",clean,{once:true});try{window.print();}catch(e){clean();throw e;}
}
function mount(section,env){
 if(!section||section.querySelector("#french-alphabet-five"))return;
 css();
 const legacy=E("details",undefined,"french-alphabet-legacy");
 legacy.append(E("summary","Complete original Lesson 01 reference and saved historical work · optional"));
 while(section.firstChild)legacy.append(section.firstChild);
 const root=E("section",undefined);root.id="french-alphabet-five";
 root.append(E("h3","Unit One · The French Alphabet"),E("p","Five short alphabet lessons; choose one session at a time. All earlier Lesson 01 teaching and learner responses are preserved below."),E("p","The 8/10 checks measure formative practice readiness only. The original 80% mastery record is not changed."));
 const nav=E("nav",undefined,"alphabet-nav"),panel=E("article"),notice=S();nav.setAttribute("aria-label","Alphabet session menu");
 const buttons=L.map((l,i)=>{const b=B((i+1)+" · "+l.title,()=>choose(i));nav.append(b);return b;});
 const key=env.learnerKey+"_alphabetFive_selected_v1";
 function writeArea(l,type,label){
  const storage=env.learnerKey+"_alphabetFive_"+l.id+"_"+type+"_v1",holder=E("div");
  const input=E("textarea");input.setAttribute("aria-label",label);input.rows=type==="writing"?7:4;input.value=env.safeGet(storage)||"";
  const saved=S();input.addEventListener("input",()=>{saved.textContent=env.safeSet(storage,input.value)?"Saved on this device.":"Saving failed; copy or print this work.";});
  holder.append(E("label",label),input,saved);return holder;
 }
 function choose(i){
  if(i<0||i>=L.length)return;
  env.safeSet(key,String(i+1));
  const l=L[i];buttons.forEach((b,j)=>{if(i===j)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");});
  panel.replaceChildren(E("h4","Alphabet Session "+(i+1)+" of 5 · "+l.title),E("p",l.why));
  l.guide.forEach((g,j)=>panel.append(E("h4","Study step "+(j+1)),E("p",g)));
  panel.append(E("h4","Letter names · Hear and repeat"));
  const cards=E("div",undefined,"alphabet-cards"),audio=S();
  [...l.letters].forEach((letter,j)=>cards.append(B(letter+" · "+l.names[j],()=>{
   const ok=env.speakFR(letter);audio.textContent=ok?"French letter playback requested. Rehearsal only.":"French audio unavailable; listening not assessed.";
  })));
  panel.append(cards,audio,E("h4","Original reading"),E("p",l.read),E("p","English support: "+l.gloss));
  panel.append(B("Listen to this reading",()=>{const ok=env.speakFR(l.read);audio.textContent=ok?"French reading playback requested; rehearsal only.":"Audio unavailable. Reading remains possible."; }));
  panel.append(E("h4","Comprehension and reasoning"),E("p",l.ask),E("h4","Independent application"),E("p",l.task),writeArea(l,"writing","Independent written response"));
  panel.append(E("h4","Correction and reflection"),writeArea(l,"corrections","One error, its explanation and the corrected version"));
  panel.append(E("h4","Ten-question comprehension check"),E("p","Complete all ten before checking. Eight correct is a practice milestone, not formal mastery. Retry keeps the same questions and answer order."));
  const fields=[],board=E("section");
  l.q.forEach((q,n)=>{
   const fs=E("fieldset");fs.append(E("legend",(n+1)+". "+q[0]));
   const radios=q[1].map((choice,j)=>{const label=E("label",undefined,"alphabet-answer"),radio=E("input");radio.type="radio";radio.name="alf-"+l.id+"-"+n;radio.value=String(j);label.append(radio,E("span",choice));fs.append(label);return radio;});
   const feedback=S();fs.append(feedback);board.append(fs);fields.push({q,radios,feedback});
  });
  const score=S(),actions=E("div",undefined,"alphabet-actions");
  const check=B("Check ten answers",()=>{
   const picks=fields.map(f=>f.radios.find(r=>r.checked));
   if(picks.some(p=>!p)){score.textContent="Answer all ten questions before checking. No attempt saved.";return;}
   let n=0;fields.forEach((f,j)=>{
    const correct=Number(picks[j].value)===f.q[2];if(correct)n++;
    f.feedback.textContent=(correct?"Correct. ":"Correction: "+f.q[1][f.q[2]]+". ")+f.q[3];
    f.radios.forEach(r=>r.disabled=true);
   });
   const record={part:l.id,score:n,total:10,passed:n>=8,at:new Date().toISOString(),formativeOnly:true,oralVerified:false};
   const storage=env.learnerKey+"_alphabetFive_"+l.id+"_attempts_v1";
   let prior=[];try{const a=JSON.parse(env.safeGet(storage)||"[]");if(Array.isArray(a))prior=a}catch(_){}
   const saved=env.safeSet(storage,JSON.stringify([...prior,record].slice(-20)));
   if(record.passed)env.safeSet(env.learnerKey+"_alphabetFive_"+l.id+"_practice_pass_v1",JSON.stringify(record));
   score.textContent=n+"/10 · "+(record.passed?"Practice milestone reached.":"Review corrections and retry.")+(saved?" Saved on this device.":" Saving failed.")+" Official mastery unchanged.";
   check.disabled=true;retry.disabled=false;
  });
  const retry=B("Retry same questions",()=>{fields.forEach(f=>{f.radios.forEach(r=>{r.checked=false;r.disabled=false;});f.feedback.textContent="";});score.textContent="Ready to retry without reshuffling.";check.disabled=false;retry.disabled=true;});
  retry.disabled=true;actions.append(check,retry);
  if(env.safeGet(env.learnerKey+"_alphabetFive_"+l.id+"_practice_pass_v1"))score.textContent="Previously passed practice saved. Review or retry as needed.";
  panel.append(board,actions,score);
  const more=E("div",undefined,"alphabet-actions");
  more.append(B("Print learner worksheet",()=>printPart(l,env,false)),B("Print educator answers",()=>printPart(l,env,true)));
  if(i>0)more.append(B("Previous alphabet lesson",()=>choose(i-1)));
  if(i<4)more.append(B("Next alphabet lesson",()=>choose(i+1)));
  panel.append(more,E("p","Educator note: synthetic French audio is rehearsal; use unfamiliar observed prompts for independent listening and speaking assessment."));
  notice.textContent="Alphabet Lesson "+(i+1)+" of 5 ready. Historical Lesson 01 work is preserved in the section below.";
 }
 root.append(nav,panel,notice);section.append(root,legacy);
 const previous=Number(env.safeGet(key)||"1");choose(previous>=1&&previous<=5?previous-1:0);
}
function mountMenu(section,options){
 if(!section||section.querySelector("#french-alphabet-five-map"))return;
 const wrap=E("section");wrap.id="french-alphabet-five-map";wrap.className="french-canonical-assessment";
 wrap.append(E("h4","Unit One · Five Alphabet Lessons"),E("p","Five short alphabet sessions inside the protected Lesson 01 route. No prior completion or mastery is replaced."));
 const grid=E("div");grid.className="french-canonical-lessons";
 L.forEach((l,i)=>{
  const b=B("Alphabet "+(i+1)+" · "+l.title,()=>{
   options.safeSet(options.learnerKey+"_alphabetFive_selected_v1",String(i+1));
   options.openLessonOne();
   requestAnimationFrame(()=>document.getElementById("french-alphabet-five")?.scrollIntoView({block:"start"}));
  });b.className="french-canonical-lesson";grid.append(b);
 });
 wrap.append(grid);section.append(wrap);
}
window.French101AlphabetFive=Object.freeze({meta:L.map(x=>({id:x.id,title:x.title,letters:x.letters,questions:x.q.length})),mount,mountMenu});
})();