/* German evidence print template: local-only, ungraded and reusable. */
(()=>{"use strict";
 const root=document.querySelector("[data-german-evidence]");
 if(!root)return;
 const kind=root.dataset.germanEvidence;
 const printButton=document.createElement("button");
 printButton.type="button";printButton.textContent="Print Academy practice evidence";
 const sheet=document.createElement("article");
 sheet.className="german-evidence-sheet";sheet.setAttribute("aria-label","Khaemenes Academy practice record");
 root.append(printButton,sheet);
 const style=document.createElement("style");
 style.textContent=".german-evidence-sheet{display:none}@media print{.german-evidence-sheet{display:block!important;background:#fff;color:#111;padding:10mm 4mm;font:16px/1.5 Georgia,serif;break-inside:avoid}.german-evidence-sheet h2{text-align:center;font-weight:400;font-size:22px}.german-evidence-sheet p{margin:8px 0}.german-evidence-sheet .review-line{margin-top:24px;border-bottom:1px solid #444;min-height:25px}body[data-german-printing] main>*:not(:has([data-german-evidence])):not([data-german-evidence]){display:none!important}body[data-german-printing] main [data-german-evidence]:not(.german-evidence-sheet){display:block!important}body[data-german-printing] [data-german-evidence]{display:block!important;border:0!important}body[data-german-printing] [data-german-evidence]>:not(.german-evidence-sheet){display:none!important}}";
 document.head.append(style);
 const safe=(key,fallback)=>{try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw)}catch{return fallback}};
 function evidence(){
  let n="";try{n=(localStorage.getItem("german_active_learner")||"").trim()}catch{}
  const id=n?Array.from(n.toLocaleLowerCase("de").slice(0,70),c=>c.codePointAt(0).toString(16)).join("-"):"anonymous";
  const storyLevels=Array.from({length:12},(_,i)=>i+1);
  const storyAttempts=storyLevels.reduce((sum,level)=>{const v=safe("khaemenes_german_stories_v1_"+id+"_"+level+"_attempts",[]);return sum+(Array.isArray(v)?v.length:0)},0);
  const sounds=safe("khaemenes_german_sound_v1_"+id,[]);
  const conversations=safe("khaemenes_german_world_v1_"+id,[]);
  const count=x=>Array.isArray(x)?x.length:0;
  const chosen=kind==="story"?"Deutsche Geschichten · Reading & writing":kind==="sound"?"Deutsches Klanglabor · Listening and sounds":kind==="world"?"Die Lebendige Welt · Conversations":"German Mastery Constellation · Practice overview";
  const extra=kind==="story"?"Story practice attempts: "+storyAttempts:kind==="sound"?"Sound-practice attempts: "+count(sounds):kind==="world"?"Conversation attempts: "+count(conversations):"Story attempts: "+storyAttempts+" · Sound attempts: "+count(sounds)+" · Conversation attempts: "+count(conversations);
  sheet.replaceChildren();
  const line=(tag,value,css)=>{const el=document.createElement(tag);el.textContent=value;if(css)el.className=css;sheet.append(el)};
  line("h2","Khaemenes Academy");
  line("p","German Language Arts · Homeschool Practice Evidence");
  line("p","Student: "+(n||"________________________"));
  line("p","Date: "+new Date().toLocaleDateString());
  line("p","Course: German · Activity: "+chosen);
  line("p",extra);
  line("p","Practice record only — ungraded. This printout does not certify mastery or modify academic assessments.");
  line("p","Parent / teacher review: ____________________________________","review-line");
  line("p","Review date: __________________   Notes: _______________________","review-line");
  line("p","Jennifer Kay Pearl");
 }
 printButton.addEventListener("click",()=>{evidence();document.body.dataset.germanPrinting="true";window.print()});
 window.addEventListener("afterprint",()=>{delete document.body.dataset.germanPrinting});
})();
