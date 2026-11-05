/* Khaemenes Academy French 101 · Unit 01 additive instructional extension
   Read-only toward formal V4 mastery and all preserved 12-level / 18-lesson keys.
   2026-11-04 · Five supplemental lessons A–E; core Lesson 02 remains intact.
   Core France-French traditional spellings are used consistently. */
(function(){
"use strict";
const SMALL=["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"];
const TENS={20:"vingt",30:"trente",40:"quarante",50:"cinquante",60:"soixante"};
function numberWord(n){
 n=Number(n);
 if(!Number.isInteger(n)||n<0||n>100)return null;
 if(n<=16)return SMALL[n];
 if(n<20)return "dix-"+SMALL[n-10];
 if(n===100)return "cent";
 if(n===80)return "quatre-vingts";
 if(n>80)return "quatre-vingt-"+numberWord(n-80);
 if(n>=70)return n===71?"soixante et onze":"soixante-"+numberWord(n-60);
 const tens=Math.floor(n/10)*10,ones=n%10;
 return TENS[tens]+(ones===0?"":ones===1?" et un":"-"+SMALL[ones]);
}
const EXPECTED={0:"zéro",16:"seize",17:"dix-sept",20:"vingt",21:"vingt et un",31:"trente et un",41:"quarante et un",51:"cinquante et un",61:"soixante et un",70:"soixante-dix",71:"soixante et onze",72:"soixante-douze",79:"soixante-dix-neuf",80:"quatre-vingts",81:"quatre-vingt-un",90:"quatre-vingt-dix",91:"quatre-vingt-onze",95:"quatre-vingt-quinze",99:"quatre-vingt-dix-neuf",100:"cent"};
Object.entries(EXPECTED).forEach(([n,w])=>{if(numberWord(Number(n))!==w)throw Error("French 101 number verification failed: "+n)});
function q(skill,prompt,choices,answer,explain){return {skill,prompt,choices,answer,explain,range:"21-100"};}
const numberQuestions=[
 q("recognition","What number is « trente-sept »?",["73","37","47"],1,"Trente is 30; plus sept gives 37."),
 q("recognition","What number is « soixante et onze »?",["61","70","71"],2,"60 + 11 makes 71."),
 q("recognition","What number is « quatre-vingt-quinze »?",["95","85","75"],0,"Four twenties (80) plus 15 makes 95."),
 q("recognition","What number is « quatre-vingts »?",["20","80","100"],1,"Quatre × vingt = 80; terminal vingts takes s."),
 q("recognition","Which French number is 100?",["dix cents","cent","un centième"],1,"The cardinal 100 is cent."),
 q("writing","Which spelling represents 21 in the taught traditional pattern?",["vingt-un","vingt et un","vingt-et-deux"],1,"21 uses et un; twenty-two is vingt-deux."),
 q("writing","Which spelling is 71?",["soixante et onze","soixante-onze et un","soixante-douze"],0,"71 is soixante et onze."),
 q("writing","Which spelling is correct for exactly 80?",["quatre-vingt","quatre-vingt-un","quatre-vingts"],2,"Standalone cardinal 80 has s on vingts."),
 q("writing","Which spelling is 81?",["quatre-vingts-un","quatre-vingt-un","quatre-vingt et un"],1,"The s disappears before another number; no et."),
 q("writing","Which spelling represents 99?",["quatre-vingt-dix-neuf","quatre-vingts-dix-neuf","quatre-vingt-neuf"],0,"80 + 19 = quatre-vingt-dix-neuf."),
 q("sequence","Which number follows « soixante-neuf »?",["soixante-dix","soixante-huit","soixante et un"],0,"After 69 comes 70, soixante-dix."),
 q("sequence","What comes immediately after « soixante et onze »?",["soixante-dix","soixante-douze","quatre-vingts"],1,"71 is followed by 72."),
 q("sequence","What number comes directly before « quatre-vingts »?",["soixante-dix-neuf","quatre-vingt-un","soixante-neuf"],0,"79 precedes 80."),
 q("sequence","What follows « quatre-vingt-dix-neuf »?",["quatre-vingts","cent","quatre-vingt-dix"],1,"99 is followed by 100."),
 q("sequence","What number precedes « trente et un »?",["vingt-neuf","trente-deux","trente"],2,"30 precedes 31."),
 q("quantities","There are « vingt-quatre pommes » and « seize poires ». How many fruits?",["40","38","41"],0,"24 + 16 = 40, quarante."),
 q("quantities","Lina has « soixante euros » and spends « vingt euros ». How many euros remain?",["80","40","30"],1,"60 − 20 = 40."),
 q("quantities","A box has « quatre-vingts crayons ». How many pencils?",["18","88","80"],2,"Quatre-vingts = 80."),
 q("quantities","A library has 90 books and lends 15. How many remain?",["65","75","85"],1,"90 − 15 = 75 (soixante-quinze)."),
 q("quantities","There are « trente et un élèves » and « vingt-neuf invités ». Total people?",["59","61","60"],2,"31 + 29 = 60."),
 q("reasoning","Why does « quatre-vingts » lose s in « quatre-vingt-un »?",["Another number follows vingt.","Because 81 is plural.","Because un is an adjective."],0,"The terminal s on vingt is absent when a numeral follows."),
 q("reasoning","Which decomposition gives 95?",["60+15","4×20+15","9×10+5 in French spelling"],1,"The taught France-French form is four twenties plus fifteen."),
 q("reasoning","Why is « soixante-dix » 70 rather than 60?",["Dix means 100.","It means 60−10.","It combines 60 and 10."],2,"Soixante (60) + dix (10) = 70."),
 q("reasoning","In the taught number system, which form uses et before the final unit?",["quarante et un","quatre-vingt-un","quatre-vingt-onze"],0,"41 uses et un; 81 and 91 do not."),
 q("reasoning","Which claim about « septante » is most accurate?",["It is always an error.","It is a regional variant for 70.","It means 17 in France."],1,"Septante is used in some French-speaking regions; this course teaches the France-French 70 pattern."),
 q("transfer","A ticket costs 81 euros. Which price is accurate?",["quatre-vingts euros","soixante et onze euros","quatre-vingt-un euros"],2,"81 is quatre-vingt-un."),
 q("transfer","Choose the accurate statement about age 31.",["J'ai trente et un ans.","Je suis trente et un ans.","J'ai trente-un âge."],0,"Age is expressed with avoir: J'ai trente et un ans."),
 q("transfer","Which number completes « Il y a ___ livres » for 47 books?",["quarante-sept","soixante-sept","quatre-vingt-sept"],0,"47 = quarante-sept."),
 q("transfer","You hear « soixante-dix-neuf »; which number should be written?",["69","79","89"],1,"60+19 =79."),
 q("transfer","Which total is supported by 42 notebooks and 38 pens?",["70","90","80"],2,"42+38=80, quatre-vingts.")
];

const LESSONS=[
{code:"A",title:"Numbers 21–69 · Patterns and structure",
 goals:"Build 21–69 from known tens; interpret et un and hyphens; explain a new number without copying.",
 guide:[
 "Learn vingt, trente, quarante, cinquante and soixante. Combine the tens with units: trente-quatre = 30 + 4 = 34.",
 "In traditional France-French spelling, 21, 31, 41, 51 and 61 use « et un »: cinquante et un. Other final units normally use a hyphen: cinquante-deux.",
 "Do not treat the letter string as arithmetic alone. Recognize the quantity, spell the word, then use it in a communicative sentence."
 ],
 reading:"« Dans notre classe, il y a vingt-six élèves. La bibliothèque prête trente-quatre livres. Aujourd'hui, nous recevons quarante et une cartes. »",
 prompts:"Identify the three quantities. Which is largest? How many more cards than students? Explain 41 − 26 = 15 in a complete response. Do not assume each student receives a card.",
 independent:"Write 21, 27, 31, 38, 41, 46, 51, 59, 61 and 68 in French; describe an original classroom inventory using three different totals. Correct two invented spelling errors and explain why.",
 q:[
 ["recognition","Which number is trente-sept?",["73","37","47"],1,"30+7=37."],
 ["structure","Which is the taught spelling of 41?",["quarante-un","quarante et un","quarante et onze"],1,"41 = quarante et un."],
 ["reading","How many students are in the reading?",["26","34","41"],0,"The class has vingt-six élèves."],
 ["logic","How many more cards (41) than students (26)?",["25","16","15"],2,"41−26=15."],
 ["spelling","Which spelling is 52?",["cinquante-deux","cinquante et deux","cinquante-douze"],0,"52 is cinquante-deux."],
 ["recognition","What is soixante-huit?",["86","68","78"],1,"60+8=68."],
 ["transfer","Write 31 as a phrase.",["trente-un","trente-deux","trente et un"],2,"31 uses et un."],
 ["reading","What is loaned in the reading?",["34 books","26 books","41 books"],0,"Trente-quatre livres are loaned."],
 ["logic","Which statement is NOT established by the reading?",["The class has 26 students.","Each student receives a card.","41 cards arrive."],1,"The distribution of the cards is not stated."],
 ["error","Which rule correctly explains 47?",["Use quarante-sept.","Use quarante et sept.","Use quarante-dix-sept."],0,"47 = quarante-sept."]
 ]},
{code:"B",title:"Numbers 70–100 · Arithmetic and spelling",
 goals:"Explain the 60+ and four-twenties patterns; distinguish 80/81; accurately interpret 70, 71, 90 and 100.",
 guide:[
 "70 is soixante-dix (60+10). 71 is soixante et onze (60+11). 72–79 use soixante plus twelve through nineteen, joined with a hyphen.",
 "80 is quatre-vingts (4×20), with s when it ends the cardinal number. 81 is quatre-vingt-un: no terminal s, and no et. 90 is quatre-vingt-dix.",
 "France-French forms are the teaching standard in this pathway. Septante, nonante and huitante exist in regional French; they are not nonsensical or defective French."
 ],
 reading:"« Le théâtre a quatre-vingts sièges. Soixante et onze billets sont vendus. Neuf sièges restent disponibles. À midi, la billetterie ferme. »",
 prompts:"Check the arithmetic 80−71=9. Does the text state how much a ticket costs? Explain why no price can be inferred. Compare the spelling of 80 and 81.",
 independent:"Write 70–79, then 80, 81, 89, 90, 91, 95, 99 and 100. Explain why 71 has et, why 81 has no s, and why 100 is cent. Write three original quantities in context.",
 q:[
 ["recognition","What number is soixante et onze?",["61","71","77"],1,"60+11=71."],
 ["structure","Which form means 80?",["quatre-vingt-un","quatre-vingts","soixante-vingts"],1,"Four twenties = 80."],
 ["structure","Which is the correct 81?",["quatre-vingts-un","quatre-vingt et un","quatre-vingt-un"],2,"81 has neither terminal s nor et."],
 ["recognition","Which number is quatre-vingt-quinze?",["95","85","75"],0,"80+15=95."],
 ["reading","How many seats does the theater have?",["71","80","9"],1,"Quatre-vingts sièges = 80."],
 ["logic","How many seats remain unsold?",["19","11","9"],2,"80−71=9."],
 ["evidence","How much is one theater ticket?",["Not specified","Nine euros","Seventy-one euros"],0,"The passage does not give a price."],
 ["spelling","What is 100 in French?",["cent-un","cent","cents"],1,"100 is cent."],
 ["structure","What is 90?",["soixante-vingt","quatre-vingts-dix","quatre-vingt-dix"],2,"80+10=90."],
 ["transfer","How should 79 be written?",["soixante-dix-neuf","soixante-neuf","quatre-vingt-neuf"],0,"60+19=79."]
 ]},
{code:"C",title:"Practical numbers · Ages, money and quantities",
 goals:"Use numbers 0–100 to answer meaningful questions about prices, inventory, age and totals without adding unsupported details.",
 guide:[
 "Ask « Combien ça coûte ? » for a price, and « Combien de livres ? » for a quantity. Listen for the object and unit before interpreting the number.",
 "French commonly uses avoir to give an age: « J'ai trente et un ans. » It does not use the English pattern « I am thirty-one years ».",
 "Read a price, an age, and an object count as different facts. A numeral without context does not tell you what is being measured."
 ],
 reading:"« Au kiosque, un carnet coûte quinze euros. Un stylo coûte trois euros. Malo a vingt et un ans. Il achète deux carnets et quatre stylos. »",
 prompts:"Compute the total: (2×15)+(4×3) = 42 euros. Which number is Malo's age? Is his cash balance stated? Can you infer change due without the amount paid?",
 independent:"Write a five-line market exchange in French including a greeting, a quantity, a request for the price, an answer and a polite leave-taking. Use two unfamiliar numbers through 100 and explain one calculation.",
 q:[
 ["reading","How old is Malo?",["12","21","15"],1,"Vingt et un ans is age 21."],
 ["price","How much is one notebook?",["3 euros","30 euros","15 euros"],2,"Un carnet coûte quinze euros."],
 ["logic","What is the price of two notebooks?",["30 euros","18 euros","15 euros"],0,"Two at 15 is 30."],
 ["logic","What do four pens cost?",["9 euros","12 euros","15 euros"],1,"Four times three is twelve."],
 ["logic","Total cost of the purchase?",["40 euros","46 euros","42 euros"],2,"30+12=42 euros."],
 ["evidence","How much change should Malo receive?",["Unknown without cash tendered","58 euros","21 euros"],0,"No amount tendered is stated."],
 ["grammar","Choose the correct age expression.",["Je suis vingt et un ans.","J'ai vingt et un ans.","Je vingt et un ans."],1,"French age uses avoir."],
 ["purpose","Which question asks the price?",["Quel âge as-tu ?","Combien de stylos ?","Combien ça coûte ?"],2,"Combien ça coûte? asks a price."],
 ["writing","How is the price 42 expressed?",["quarante-deux euros","quarante et deux euros","quatre-vingt-deux euros"],0,"42 is quarante-deux."],
 ["comprehension","Which object has a unit price of 3 euros?",["The notebook","The pen","Both objects"],1,"Un stylo costs three euros."]
 ]},
{code:"D",title:"Numbers in reading · Evidence and inference",
 goals:"Separate facts, arithmetic inferences and unknowns in French reading; justify conclusions with words from the source.",
 guide:[
 "First identify who, what, how many and when. Underline numeral words, then convert them to quantities. Do not invent prices, destinations or other facts.",
 "A supported calculation uses quantities actually stated. For example 24+31−15=40 is justified when the text says fifteen of the combined fruits are given away.",
 "Comprehension includes saying « le texte ne le dit pas » when a detail is missing."
 ],
 reading:"« Au marché, Léa achète vingt-quatre pommes. Amir achète trente et une poires. Ensemble, ils donnent quinze fruits à l'école. Le vendeur ferme à dix-huit heures. L'affiche annonce quatre-vingts paniers, mais elle ne précise pas leur prix. »",
 prompts:"Find the fruit quantities. How many are bought in total? How many are left after fifteen are given? Does the text say whose fruit was donated? What is the closing time? Is the price of the baskets known?",
 independent:"Write a four-sentence French summary using three accurate numbers. Underline two source facts, show one calculation, and identify two things that cannot be known from the passage.",
 q:[
 ["reading","How many apples does Léa buy?",["24","31","15"],0,"Vingt-quatre pommes means 24 apples."],
 ["reading","How many pears does Amir buy?",["13","31","21"],1,"Trente et une poires means 31 pears."],
 ["logic","How many fruits are bought in total?",["40","70","55"],2,"24+31=55."],
 ["logic","How many fruits remain after donating fifteen?",["40","45","50"],0,"55−15=40."],
 ["evidence","Which person's fruits were donated?",["Only Léa's","The passage does not say.","Only Amir's"],1,"The source gives a total donation, not its origin."],
 ["time","When does the seller close?",["At 8:00","At noon","At 18:00"],2,"Dix-huit heures = 18:00."],
 ["reading","How many baskets does the notice announce?",["80","18","15"],0,"Quatre-vingts paniers is 80 baskets."],
 ["evidence","What is the price of one basket?",["80 euros","Not stated","18 euros"],1,"The notice does not specify the price."],
 ["reasoning","Which statement is a supported inference?",["They each give the same fruit count.","Every basket contains apples.","The number of remaining fruits is 40."],2,"The calculation follows the stated quantities."],
 ["language","What does « ensemble » indicate in the passage?",["Together","Tomorrow","Never"],0,"Ensemble means together."]
 ]},
{code:"E",title:"Unit 01 transfer · Unseen numbers and corrections",
 goals:"Retrieve numbers through 100, interpret a new message, write independently, correct errors and document the limits of audio practice.",
 guide:[
 "Retrieve before reviewing. Read unseen numerals and produce the French spellings without copying the reference. Check accents, et and the plural s on terminal quatre-vingts.",
 "Use the 0–100 pattern knowledge together with subject pronouns, greetings and simple sentences. Correct both the language and the reasoning, not just the final numeral.",
 "A synthetic French voice can support pronunciation rehearsal. Pressing Play or viewing the transcript is not independent listening or speaking certification."
 ],
 reading:"« Bonjour, je m'appelle Nadia. J'ai dix-sept ans. Notre atelier prépare soixante-deux invitations. Nous en envoyons trente-huit aujourd'hui et nous gardons les autres pour demain. »",
 prompts:"Who introduces herself? How old is she? How many invitations remain? (62−38=24.) What does the text say about today's mailing? Does it state the event's location? Explain your evidence.",
 independent:"Without a number chart, spell 27, 41, 57, 68, 70, 71, 80, 81, 95 and 100; write a fresh five-line exchange using numbers and one question; correct at least three mistakes with explanations. Have a human observer record speaking only if actually assessed.",
 q:[
 ["reading","How old is Nadia?",["27","17","70"],1,"Dix-sept ans = 17."],
 ["reading","How many invitations are prepared?",["26","38","62"],2,"Soixante-deux means 62."],
 ["reading","How many invitations are mailed today?",["38","24","62"],0,"Trente-huit invitations are mailed today."],
 ["logic","How many invitations remain?",["26","24","32"],1,"62−38=24."],
 ["evidence","Where is the event taking place?",["At the school","At a library","The location is not stated."],2,"The passage supplies no location."],
 ["spelling","Which form is 80?",["quatre-vingts","quatre-vingt","quatre-vingts-un"],0,"80 takes terminal s."],
 ["spelling","Which is the taught 71?",["soixante-onze","soixante et onze","soixante-dix-un"],1,"71 is soixante et onze."],
 ["spelling","Which is 95?",["quatre-vingt-cinq","quatre-vingts-quinze","quatre-vingt-quinze"],2,"80+15=95."],
 ["source","Which activity demonstrates verified independent speaking?",["An educator-observed unprompted reply","Pressing the audio playback button","Reading a written transcript silently"],0,"Independent speaking requires separately observed evidence."],
 ["transfer","Which sentence combines an accurate greeting and quantity?",["Bonjour. Je est cinquante livres.","Bonjour. J'ai cinquante livres.","Bonsoir. Je cinquante livres."],1,"J'ai cinquante livres is grammatical and has the intended quantity."]
 ]}
];

function el(tag,text,cls){
 const n=document.createElement(tag);if(text!==undefined&&text!==null)n.textContent=String(text);
 if(cls)n.className=cls;return n;
}
function button(text,cb){const b=el("button",text);b.type="button";b.addEventListener("click",cb);return b;}
function addStyle(){
 if(document.getElementById("fr-u01e-css"))return;
 const css=el("style");css.id="fr-u01e-css";
 css.textContent=".fr-u01e{border:1px solid #b5a68f;border-radius:7px;padding:18px;margin:18px auto;color:inherit;max-width:930px;font-size:16px;line-height:1.65}.fr-u01e h4,.fr-u01e h3{line-height:1.35;margin:12px 0}.fr-u01e p{margin:10px 0}.fr-u01e input,.fr-u01e textarea,.fr-u01e select{width:100%;max-width:100%;box-sizing:border-box;font-size:16px;padding:11px;line-height:1.45;border-radius:7px;border:1px solid #91816b;background:#fffaf0;color:#242b28}.fr-u01e button{background:#2f3835;color:#fff7e7;border:1px solid #9b885e;border-radius:7px;min-height:45px;padding:9px 13px;font-size:16px;margin:5px;cursor:pointer}.fr-u01e button:focus-visible,.fr-u01e summary:focus-visible{outline:3px solid #bd9144;outline-offset:2px}.fr-u01e button:disabled{opacity:.65;cursor:default}.fr-u01e details{border:1px solid #b5a68f;border-radius:7px;padding:12px;margin:10px 0}.fr-u01e details>summary{cursor:pointer;font-size:17px;font-weight:600;padding:6px}.fr-u01e fieldset{border:1px solid #b9aa8e;padding:13px;margin:10px 0;border-radius:7px}.fr-u01e legend{font-size:16px;padding:5px}.fr-u01e label{display:block;margin:10px 0}.fr-u01e .fr-u01e-choice{display:flex;gap:10px;align-items:flex-start;line-height:1.5}.fr-u01e .fr-u01e-choice input{width:18px;min-width:18px;height:18px;margin-top:4px}.fr-u01e .fr-u01e-notice{border-left:3px solid #b49462;padding:8px 12px}.fr-u01e .fr-u01e-vocab{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:8px}.fr-u01e .fr-u01e-vocab button{text-align:left}.fr-u01e .fr-u01e-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}.fr-u01e .fr-u01e-row>*{flex:1 1 180px}.fr-u01e .fr-u01e-correction{padding:8px;border-left:3px solid #b49462}.fr-u01e [role=status]{min-height:1.4em}@media print{body.printing-fr-u01e>*:not(#fr-u01e-print-copy){display:none!important}body.printing-fr-u01e #fr-u01e-print-copy{display:block!important;position:static!important;width:100%!important;max-width:none!important;max-height:none!important;overflow:visible!important;margin:0!important;padding:0!important;border:0!important;background:#fff!important;color:#111!important;font:12pt/1.5 Georgia,serif!important}body.printing-fr-u01e #fr-u01e-print-copy p{page-break-inside:avoid!important}body.printing-fr-u01e #fr-u01e-print-copy h2,body.printing-fr-u01e #fr-u01e-print-copy h3{break-after:avoid!important}body.printing-fr-u01e #fr-u01e-print-copy .fr-u01e-blank{border-bottom:1px solid #bbb;height:28px;margin:7px 0}}";
 document.head.append(css);
}
function statusNode(){const x=el("p");x.setAttribute("role","status");x.setAttribute("aria-live","polite");return x;}
function printLesson(lesson,env,educator){
 const root=el("section");root.id="fr-u01e-print-copy";
 root.append(el("h2","Khaemenes Academy · French 101 · Unit 01 Additional Lesson "+lesson.code),el("h3",lesson.title),el("p",lesson.goals),el("p","Learner: _________________________________   Date: __________________"));
 for(const p of lesson.guide)root.append(el("p",p));
 root.append(el("h3","Reading"),el("p",lesson.reading),el("h3","Comprehension and reasoning"),el("p",lesson.prompts));
 for(let i=0;i<5;i++)root.append(el("div",null,"fr-u01e-blank"));
 root.append(el("h3","Independent work"),el("p",lesson.independent));
 const writing=env.safeGet(env.learnerKey+"_u01e_"+lesson.code+"_writing_v1")||"";
 if(writing.trim())root.append(el("p","Saved learner response: "+writing));
 for(let i=0;i<6;i++)root.append(el("div",null,"fr-u01e-blank"));
 root.append(el("h3","Correction journal"),el("p",env.safeGet(env.learnerKey+"_u01e_"+lesson.code+"_corrections_v1")||"Error and explanation: ____________________________________"));
 if(educator){
  root.append(el("h3","Educator guidance and evidence rubric"),el("p","Rate 0–3 or Not assessed for: comprehension, spelling and number accuracy, independent transfer, correction quality, human-observed listening/speaking. Synthetic playback alone never demonstrates oral proficiency."));
  lesson.q.forEach((a,i)=>root.append(el("p",(i+1)+". "+a[1]+" — "+a[2][a[3]]+". "+a[4])));
 }else{
  lesson.q.forEach((a,i)=>root.append(el("p",(i+1)+". "+a[1]+"  ____________________________________")));
 }
 document.body.append(root);document.body.classList.add("printing-fr-u01e");
 let cleaned=false;
 function cleanup(){if(cleaned)return;cleaned=true;document.body.classList.remove("printing-fr-u01e");root.remove();window.removeEventListener("afterprint",cleanup);}
 window.addEventListener("afterprint",cleanup,{once:true});
 try{window.print();}catch(error){cleanup();throw error;}
}
function mountNumbers(sec,env){
 if(!sec||sec.querySelector("#fr-u01e-number-explorer"))return;
 addStyle();const wrap=el("section",null,"fr-u01e");wrap.id="fr-u01e-number-explorer";
 wrap.append(el("h4","Advanced number laboratory · 21–100"),el("p","The introductory 0–20 models remain above. This additional studio supplies the complete 21–100 system with traditional France-French spelling and pronunciation rehearsal."),
 el("p","21 = vingt et un; 31 = trente et un; 61 = soixante et un; 70 = soixante-dix (60+10); 71 = soixante et onze (60+11); 79 = soixante-dix-neuf; 80 = quatre-vingts; 81 = quatre-vingt-un (no s, no et); 90 = quatre-vingt-dix; 95 = quatre-vingt-quinze; 100 = cent."),
 el("p","Regional note: septante, nonante, and in some areas huitante are legitimate regional variants. This learning pathway consistently assesses the France-French patterns shown here."));
 const select=el("select");select.setAttribute("aria-label","Choose French number interval");
 for(const [a,b] of [[0,20],[21,39],[40,59],[60,69],[70,79],[80,89],[90,100]]){const op=el("option",a+"–"+b);op.value=a+":"+b;select.append(op)}
 select.value="21:39";const grid=el("div",null,"fr-u01e-vocab");const audioStatus=statusNode();
 function paint(){grid.replaceChildren();const [lo,hi]=select.value.split(":").map(Number);for(let n=lo;n<=hi;n++){grid.append(button(n+" · "+numberWord(n),()=>{const r=env.speakFR(numberWord(n));audioStatus.textContent=r?"Pronunciation rehearsal requested for "+numberWord(n)+".":"French speech unavailable: read the written spelling. Playback is not speaking assessment."}))}}
 select.addEventListener("change",paint);wrap.append(el("label","Reference and pronunciation range"),select,grid,audioStatus);
 const input=el("input");input.type="number";input.min="0";input.max="100";input.step="1";input.placeholder="Enter an integer from 0 to 100";input.setAttribute("aria-label","Look up a number from zero to one hundred");
 const show=statusNode();wrap.append(el("h4","Find, explain and speak an unfamiliar number"),input,button("Show French word",()=>{const n=Number(input.value);show.textContent=input.value.trim()!==""&&Number.isInteger(n)&&n>=0&&n<=100?n+" = "+numberWord(n)+". Explain its tens and units.":"Enter a whole number between 0 and 100."}),show);
 const reading=el("p","New reading: « Au marché, Zoé achète vingt-quatre pommes, Amir achète trente et une poires, et ils donnent quinze fruits. » There are 55 fruits before the donation and 40 after it. It is not stated whose fruit was donated.");
 const task=el("p","Independent response: write 21, 37, 41, 58, 61, 70, 71, 79, 80, 81, 90, 95, 99 and 100 in French. Explain 71 and the 80/81 spelling contrast; then write an original four-line market conversation.");
 const key=env.learnerKey+"_u01e_numbers_21_100_written_v1";const area=el("textarea");area.rows=7;area.setAttribute("aria-label","Independent number writing 21 to 100");area.value=env.safeGet(key)||"";const saving=statusNode();area.addEventListener("input",()=>{saving.textContent=env.safeSet(key,area.value)?"Independent work saved on this device.":"Storage unavailable. Copy or print your work."});
 wrap.append(el("h4","Unfamiliar-number reading and reasoning"),reading,task,area,saving);
 sec.append(wrap);paint();
}
function mountUnit(section,env){
 if(!section||section.querySelector("#fr-u01e-additional-lessons"))return;
 addStyle();const wrap=el("section",null,"fr-u01e");wrap.id="fr-u01e-additional-lessons";
 wrap.append(el("h3","Unit 01 · Five additional depth lessons"),el("p","Lessons A–E deepen the six canonical Foundations lessons without renumbering Lessons 01–18. These are learner-scoped formative lessons. A score of 8/10 demonstrates local practice readiness, not official V4 credit or independent oral proficiency."));
 LESSONS.forEach(lesson=>{
  const details=el("details");const summary=el("summary","Additional Lesson "+lesson.code+" · "+lesson.title);details.append(summary,el("p",lesson.goals));
  lesson.guide.forEach((part,i)=>details.append(el("h4","Teaching step "+(i+1)),el("p",part)));
  const spoken=button("Hear the original reading",()=>{const r=env.speakFR(lesson.reading);result.textContent=r?"Synthetic French audio requested; this is rehearsal, not independently assessed listening.":"French audio unavailable. Read the text; listening remains not assessed."});
  const result=statusNode();details.append(el("h4","Original French reading"),el("p",lesson.reading),spoken,result,el("h4","Comprehension and logic"),el("p",lesson.prompts),el("h4","Independent written transfer"),el("p",lesson.independent));
  function savedField(label,suffix,rows){const id=env.learnerKey+"_u01e_"+lesson.code+"_"+suffix+"_v1";const t=el("textarea");t.rows=rows;t.setAttribute("aria-label",label);t.value=env.safeGet(id)||"";const state=statusNode();t.addEventListener("input",()=>{state.textContent=env.safeSet(id,t.value)?"Saved on this device.":"Storage unavailable. Copy or print your response."});details.append(el("label",label),t,state)}
  savedField("Independent response", "writing",7);
  savedField("Correction journal · error, reason and accurate replacement","corrections",4);
  const knowledge=el("section");knowledge.append(el("h4","Ten-question comprehension, logic and accuracy check"),el("p","80% (8/10) is the practice-readiness threshold. Complete all ten before checking; explanations identify the correct reasoning. Retry uses the same ten questions without reshuffling."));
  const fields=[];
  lesson.q.forEach((data,i)=>{
   const fs=el("fieldset"),legend=el("legend",(i+1)+". "+data[1]);fs.append(legend);
   data[2].forEach((answer,j)=>{
    const label=el("label",null,"fr-u01e-choice");const radio=el("input");radio.type="radio";radio.name="fr-u01e-"+lesson.code+"-q"+i;radio.value=String(j);label.append(radio,el("span",answer));fs.append(label);
   });
   const feedback=statusNode();fs.append(feedback);knowledge.append(fs);fields.push({fs,feedback,data});
  });
  const key=env.learnerKey+"_u01e_"+lesson.code+"_attempts_v1",passKey=env.learnerKey+"_u01e_"+lesson.code+"_formative_pass_v1";const state=statusNode();
  const prior=env.safeGet(passKey);if(prior)state.textContent="Previously passed practice (learner-scoped); official Academy mastery unchanged.";
  function attempt(){
   const picks=fields.map(({fs})=>fs.querySelector("input:checked"));
   if(picks.some(x=>!x)){state.textContent="Answer all ten questions before checking. No attempt recorded.";return;}
   let correct=0;fields.forEach(({feedback,data,fs},i)=>{const good=Number(picks[i].value)===data[3];if(good)correct++;feedback.textContent=(good?"Correct. ":"Correction: "+data[2][data[3]]+". ")+data[4];fs.querySelectorAll("input").forEach(x=>x.disabled=true);});
   const record={version:1,lesson:lesson.code,score:correct,total:10,passed:correct>=8,at:new Date().toISOString(),type:"formative-practice-only",formalV4:false,independentSpeakingCertified:false};
   let arr=[];try{const parsed=JSON.parse(env.safeGet(key)||"[]");if(Array.isArray(parsed))arr=parsed}catch(_){}
   const ok=env.safeSet(key,JSON.stringify([...arr,record].slice(-30)));
   if(record.passed&&!prior)env.safeSet(passKey,JSON.stringify(record));
   state.textContent=(ok?"Attempt saved. ":"Storage unavailable; record not saved. ")+correct+"/10 — "+(record.passed?"80% practice threshold met.":"Review corrections and retry without penalty.")+" Official mastery unchanged.";
   check.disabled=true;retry.disabled=false;
  }
  const check=button("Check ten answers",attempt);
  const retry=button("Retry same questions",()=>{fields.forEach(({fs,feedback})=>{fs.querySelectorAll("input").forEach(x=>{x.checked=false;x.disabled=false});feedback.textContent=""});state.textContent="New attempt ready. Questions and answer order are unchanged.";check.disabled=false;retry.disabled=true});retry.disabled=true;
  knowledge.append(check,retry,state);details.append(knowledge);
  const guidance=el("details");guidance.append(el("summary","Educator-only review guidance and answer reasoning"),el("p","Evidence rubric: 0 not shown, 1 emerging, 2 supported, 3 accurate independently, or Not assessed. Examine comprehension, language/spelling, quantitative logic, original transfer, corrections. Listening and speaking must be observed separately."));
  lesson.q.forEach((r,i)=>guidance.append(el("p",(i+1)+". "+r[2][r[3]]+" — "+r[4])));
  details.append(guidance,button("Print learner worksheet",()=>printLesson(lesson,env,false)),button("Print educator copy",()=>printLesson(lesson,env,true)));
  wrap.append(details);
 });
 section.append(wrap);
}
window.French101Unit01Extensions=Object.freeze({numberWord,numberQuestions,mountNumbers,mountUnit,version:"2026-11-04"});
})();
