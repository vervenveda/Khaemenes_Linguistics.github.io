/* Year I teacher-review companion: unverified local record, no certificate or grade gate. */
(()=>{"use strict";
const m=location.pathname.match(/\/(arabic-1|russian-1)\/week-(\d{2})\/index\.html$/);
if(!m)return;
const course=m[1],week=m[2],root=document.getElementById("khaeLanguageEvidenceJournal");
if(!root)return;
const criteria=course==="arabic-1"?[
["Reading","Identify connected letter forms, diacritics when shown, and meaning in short Arabic passages."],
["Writing","Form legible contextual Arabic script and accurately express the week's meaning."],
["Listening","Identify target sounds and meaning in an unseen instructor-supplied Arabic clip."],
["Speaking","Produce intelligible Arabic sounds and context-appropriate words or sentences."]
]:[
["Reading","Interpret Cyrillic text including contextual vocabulary and grammatical endings."],
["Writing","Use appropriate Russian noun forms and agreement in original sentences."],
["Listening","Identify word stress and meaning in an unseen instructor-supplied Russian clip."],
["Speaking","Demonstrate intelligible word stress and appropriate inflection in spoken Russian."]
];
const section=document.createElement("section");section.setAttribute("data-i18n-ignore","");
section.setAttribute("aria-label","Teacher-review rubric");
section.innerHTML='<h3>Language-specific proficiency review · Instructor worksheet</h3><p>This is a local, self-entered review note, not authenticated teacher signoff, formal credit, or a certificate. Four skills are scored independently, 0–4 each (16 points). Knowledge quiz results remain formative and are never converted into proficiency.</p>'+criteria.map(([skill,anchor],i)=>'<div style="margin:12px 0"><label for="khaeTeacherScore'+i+'">'+skill+': '+anchor+'</label><select id="khaeTeacherScore'+i+'"><option value="">Not yet reviewed</option>'+[0,1,2,3,4].map(n=>'<option value="'+n+'">'+n+' / 4</option>').join("")+'</select></div>').join("")+'<p>0 = not demonstrated · 1 = emerging · 2 = developing · 3 = independently competent · 4 = accurate and transferable.</p><label for="khaeTeacherAudioSource">Listening source reference (instructor-read passage or approved recording ID)</label><input id="khaeTeacherAudioSource" maxlength="240" autocomplete="off"><p>Do not include student identities, private URLs or recordings. Source reference is self-declared and not independent verification.</p><label for="khaeTeacherReviewer">Reviewer label (self-entered, unverified)</label><input id="khaeTeacherReviewer" maxlength="60"><label for="khaeTeacherNotes">Feedback and next practice</label><textarea id="khaeTeacherNotes" rows="3" style="width:100%;display:block"></textarea><button type="button" id="khaeTeacherSave">Save review note for selected learner</button> <button type="button" id="khaeTeacherPrint">Print review worksheet</button><p id="khaeTeacherStatus" role="status" aria-live="polite"></p>';
root.append(section);
const el=id=>section.querySelector("#"+id),learner=document.getElementById("khaeEvidenceLearner");
const key=()=> "khae-language-review-v1:"+course+":"+week+":"+Array.from(learner.value.trim().toLowerCase(),c=>c.codePointAt(0).toString(16)).join("-");
function clear(){criteria.forEach((_,i)=>el("khaeTeacherScore"+i).value="");el("khaeTeacherReviewer").value="";el("khaeTeacherAudioSource").value="";el("khaeTeacherNotes").value=""}
learner.addEventListener("change",()=>{
 clear();if(!learner.value.trim())return;
 try{const v=JSON.parse(localStorage.getItem(key())||"null");if(v&&v.label===learner.value.trim()&&v.course===course&&v.week===week){criteria.forEach((_,i)=>el("khaeTeacherScore"+i).value=v.scores?.[i]??"");el("khaeTeacherReviewer").value=v.reviewer||"";el("khaeTeacherAudioSource").value=v.listeningSource||"";el("khaeTeacherNotes").value=v.notes||""}}catch{}
});
el("khaeTeacherSave").addEventListener("click",()=>{
 const label=learner.value.trim(),scores=criteria.map((_,i)=>el("khaeTeacherScore"+i).value);
 if(!label){el("khaeTeacherStatus").textContent="Choose a learner record label first.";return}
 const listeningSource=el("khaeTeacherAudioSource").value.trim();
 if(scores[2]!==""&&!listeningSource){el("khaeTeacherStatus").textContent="Listening score not saved: enter a teacher-approved source reference, or leave listening unassessed.";return}
 const reviewed=scores.every(n=>/^[0-4]$/.test(n)),points=reviewed?scores.reduce((a,b)=>a+Number(b),0):null;
 const v={schema:"khae-language-review-v1",course,week,label,scores,listeningSource,reviewer:el("khaeTeacherReviewer").value.trim(),notes:el("khaeTeacherNotes").value,points,reviewComplete:reviewed,verified:false,updatedAt:new Date().toISOString()};
 try{localStorage.setItem(key(),JSON.stringify(v));el("khaeTeacherStatus").textContent="Local review note saved ("+(reviewed?points+"/16":"incomplete")+"). Reviewer identity is not verified; no mastery or credit awarded."}catch{el("khaeTeacherStatus").textContent="Storage unavailable. Print the worksheet."}
});
el("khaeTeacherPrint").addEventListener("click",()=>window.print());
})();