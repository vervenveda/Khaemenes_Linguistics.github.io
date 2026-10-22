/* Arabic I / Russian I evidence journal, formative only, browser-local. */
(()=>{"use strict";
const match=location.pathname.match(/\/(arabic-1|russian-1)\/week-(\d{2})\/index\.html$/);
if(!match)return;
const course=match[1],week=match[2],KEY="khae-language-evidence-v1:"+course+":"+week+":";
const area=document.createElement("section");
area.id="khaeLanguageEvidenceJournal";
area.setAttribute("data-i18n-ignore","");
area.style.cssText="max-width:960px;margin:18px auto;padding:16px;background:#fffdf8;color:#252a30;border:1px solid #cdbda7;border-radius:7px;direction:ltr;text-align:left";
area.innerHTML='<h2>Four-skill evidence journal (formative)</h2><p>Save reading, writing, listening and speaking reflections on this device. Do not include sensitive personal information. Work remains private to this browser profile; this journal does not grade quizzes, grant mastery or replace teacher assessment.</p><label for="khaeEvidenceLearner">Learner record label (distinct on a shared device)</label><input id="khaeEvidenceLearner" type="text" maxlength="60" autocomplete="off" placeholder="Choose a non-sensitive record label" style="display:block;width:100%;max-width:420px;margin:6px 0 12px"><p id="khaeEvidenceStatus" role="status" aria-live="polite">Enter your record label to load saved work.</p>'+["reading","writing","listening","speaking"].map(t=>'<label style="display:block;margin:12px 0" for="khaeEvidence-'+t+'">'+t[0].toUpperCase()+t.slice(1)+' evidence<textarea id="khaeEvidence-'+t+'" rows="3" style="width:100%;display:block;direction:auto" disabled></textarea></label>').join("")+'<button type="button" id="khaeEvidenceSave">Save draft</button> <button type="button" id="khaeEvidenceExport">Export JSON</button><p>Teacher verification must be completed separately. This is not a secure credential or identity system.</p>';
const script=document.currentScript;
(script?.parentElement||document.body).append(area);
const $=id=>area.querySelector("#"+id),status=$("khaeEvidenceStatus"),label=$("khaeEvidenceLearner");
const fields=["reading","writing","listening","speaking"],record={};
let activeKey=null;
const safe=s=>String(s||"").trim().slice(0,60);
const storageKey=val=>KEY+Array.from(safe(val).toLowerCase(),c=>c.codePointAt(0).toString(16)).join("-");
function reset(){for(const k of fields)$( "khaeEvidence-"+k).value="";}
function read(key){try{const v=JSON.parse(localStorage.getItem(key)||"null");return v&&v.course===course&&v.week===week&&v.label===safe(label.value)?v:null}catch{return null}}
label.addEventListener("change",()=>{
 const value=safe(label.value);activeKey=value?storageKey(value):null;reset();
 for(const k of fields)$( "khaeEvidence-"+k).disabled=!activeKey;
 const entry=activeKey?read(activeKey):null;if(entry)for(const k of fields)$( "khaeEvidence-"+k).value=String(entry[k]||"");
 status.textContent=!activeKey?"Enter a record label.":entry?"Saved draft loaded for this label.":"New draft for this record label.";
});
function snapshot(){const v={schema:"khae-language-evidence-v1",course,week,label:safe(label.value),updatedAt:new Date().toISOString()};for(const k of fields)v[k]=$( "khaeEvidence-"+k).value;return v;}
$("khaeEvidenceSave").addEventListener("click",()=>{
 if(!activeKey||activeKey!==storageKey(label.value)){status.textContent="Confirm the learner label first.";return}
 try{localStorage.setItem(activeKey,JSON.stringify(snapshot()));status.textContent="Draft saved locally for this label."}catch{status.textContent="Storage unavailable. Export your draft instead."}
});
$("khaeEvidenceExport").addEventListener("click",()=>{
 if(!activeKey){status.textContent="Choose a record label first.";return}
 const blob=new Blob([JSON.stringify(snapshot(),null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download=course+"-week-"+week+"-evidence.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
 status.textContent="JSON evidence exported. Keep it private.";
});
})();
