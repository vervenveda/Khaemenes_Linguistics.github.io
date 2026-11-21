/* Sovereign Translator — opt-in translation study candidate UI.
 * Memory only. No network, browser storage, vault bridge calls, or writes.
 */
(function(root){"use strict";
function byId(id){return document.getElementById(id)}
const enabled=byId("candidateLearningOptIn"),summary=byId("candidateLearningStatus"),
 list=byId("candidateLearningList"),clear=byId("candidateLearningClear");
const lab=root.KhaemenesTranslationCandidateLab;
const limit=15;
if(!enabled||!summary||!list||!clear||!lab){return}
function display(){
 const state=lab.status();
 summary.textContent=(state.enabled?"Learning observation enabled. ":"Learning observation disabled. ")+
  state.candidates+" unreviewed candidate(s) in memory; 0 automatic dictionary saves.";
 list.replaceChildren();
 for(const item of lab.list({limit})){
  const li=document.createElement("li");
  const verdict=lab.recommend({from:item.from,to:item.to,source:item.source});
  const description=document.createElement("span");
  description.textContent=item.source+" → "+item.translation+" ("+item.from+" / "+item.to+") · "+
    item.observations+" observation(s) · bias "+(item.learningBias||0).toFixed(2)+" · "+
    (verdict.decision==="WITHHOLD"?"Teacher WITHHOLD": "Teacher suggestion for human review")+
    (item.conflict?" · dictionary conflict":"");
  li.appendChild(description);
  for(const [label,outcome] of [["Helpful","helpful"],["Needs correction","incorrect"]]){
   const button=document.createElement("button");button.type="button";button.className="secondary";
   button.textContent=label+" (advisory)";
   button.addEventListener("click",()=>{
    lab.feedback({from:item.from,to:item.to,source:item.source,translation:item.translation,
     outcome,explicitReview:true});
    display();
   });
   li.appendChild(button);
  }
  list.appendChild(li);
 }
}
enabled.addEventListener("change",()=>{lab.optIn(enabled.checked);display()});
clear.addEventListener("click",()=>{enabled.checked=false;lab.optIn(false);display()});
root.KhaemenesTranslationCandidateTeachingUI=Object.freeze({
 capture({from,to,source,translation,origin="public-ui"}={}){
  const outcome=lab.observe({from,to,source,translation,origin});
  display();
  return outcome;
 },
 status:()=>lab.status()
});
display();
})(window);
