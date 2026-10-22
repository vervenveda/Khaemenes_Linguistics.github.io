/* Arabic I / Russian I evidence journal, formative only, browser-local. */
(()=>{"use strict";
const match=location.pathname.match(/\/(arabic-1|russian-1)\/week-(\d{2})\/index\.html$/);
if(!match)return;
const course=match[1],week=match[2],KEY="khae-language-evidence-v1:"+course+":"+week+":";
const area=document.createElement("section");
area.id="khaeLanguageEvidenceJournal";
area.setAttribute("data-i18n-ignore","");
area.style.cssText="max-width:960px;margin:18px auto;padding:16px;background:#fffdf8;color:#252a30;border:1px solid #cdbda7;border-radius:7px;direction:ltr;text-align:left";
area.innerHTML='<h2>Four-skill evidence journal (formative)</h2><p>Save reading, writing, listening and speaking reflections on this device. Do not include sensitive personal information. Work remains private to this browser profile; this journal does not grade quizzes, grant mastery or replace teacher assessment.</p><label for="khaeEvidenceLearner">Learner record label (distinct on a shared device)</label><input id="khaeEvidenceLearner" type="text" maxlength="60" autocomplete="off" placeholder="Choose a non-sensitive record label" style="display:block;width:100%;max-width:420px;margin:6px 0 12px"><p id="khaeEvidenceStatus" role="status" aria-live="polite">Enter your record label to load saved work.</p>'+["reading","writing","listening","speaking"].map(t=>'<label style="display:block;margin:12px 0" for="khaeEvidence-'+t+'">'+t[0].toUpperCase()+t.slice(1)+' evidence<textarea id="khaeEvidence-'+t+'" rows="3" style="width:100%;display:block;direction:auto" disabled></textarea></label>').join("")+'<button type="button" id="khaeEvidenceSave">Save draft</button> <button type="button" id="khaeEvidenceExport">Export JSON</button> <label for="khaeEvidenceImport">Preview JSON backup</label> <input type="file" id="khaeEvidenceImport" accept=".json,application/json" disabled> <button type="button" id="khaeEvidenceRestore" disabled>Confirm matching backup restore</button> <p id="khaeEvidencePreview" aria-live="polite"></p><p>Teacher verification must be completed separately. This is not a secure credential or identity system.</p>';
const script=document.currentScript;
(script?.parentElement||document.body).append(area);
const $=id=>area.querySelector("#"+id),status=$("khaeEvidenceStatus"),label=$("khaeEvidenceLearner");
const fields=["reading","writing","listening","speaking"],record={};
let activeKey=null,pending=null;
const safe=s=>String(s||"").trim().slice(0,60);
const storageKey=val=>KEY+Array.from(safe(val).toLowerCase(),c=>c.codePointAt(0).toString(16)).join("-");
function reset(){for(const k of fields)$( "khaeEvidence-"+k).value="";}
function read(key){try{const v=JSON.parse(localStorage.getItem(key)||"null");return v&&v.course===course&&v.week===week&&v.label===safe(label.value)?v:null}catch{return null}}
label.addEventListener("change",()=>{
 const value=safe(label.value);activeKey=value?storageKey(value):null;pending=null;$("khaeEvidenceRestore").disabled=true;$("khaeEvidencePreview").textContent="";$("khaeEvidenceImport").disabled=!activeKey;reset();
 for(const k of fields)$( "khaeEvidence-"+k).disabled=!activeKey;
 const entry=activeKey?read(activeKey):null;if(entry)for(const k of fields)$( "khaeEvidence-"+k).value=String(entry[k]||"");
 status.textContent=!activeKey?"Enter a record label.":entry?"Saved draft loaded for this label.":"New draft for this record label.";
});
function snapshot(){const previous=activeKey?read(activeKey):null;const v={schema:"khae-language-evidence-v1",course,week,label:safe(label.value),updatedAt:new Date().toISOString(),attempts:Array.isArray(previous?.attempts)?previous.attempts:[]};for(const k of fields)v[k]=$( "khaeEvidence-"+k).value;return v;}
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

const quizStatus=document.getElementById("status");
if(quizStatus){
 const observer=new MutationObserver(()=>{
  const text=quizStatus.textContent||"",m=text.match(/^(\\d+)\\/10\\s*[—-]/);
  if(!m||!activeKey||activeKey!==storageKey(label.value))return;
  const score=Number(m[1]);if(score<0||score>10)return;
  const prior=read(activeKey)||snapshot();
  const entry={score,total:10,recordedAt:new Date().toISOString(),kind:"formative-recognition-only"};
  const last=(prior.attempts||[]).slice(-1)[0];
  if(last&&last.score===score&&Date.now()-Date.parse(last.recordedAt)<2000)return;
  prior.attempts=[...(Array.isArray(prior.attempts)?prior.attempts:[]).slice(-49),entry];
  try{localStorage.setItem(activeKey,JSON.stringify(prior));status.textContent="Formative quiz result "+score+"/10 saved for this label; practical skills still require teacher review."}
  catch{status.textContent="Quiz scored, but local storage is unavailable. Export your work."}
 });
 observer.observe(quizStatus,{childList:true,characterData:true,subtree:true});
}
$("khaeEvidenceImport").addEventListener("change",async e=>{
 pending=null;$("khaeEvidenceRestore").disabled=true;
 const file=e.target.files?.[0];if(!file||!activeKey)return;
 if(file.size>300000){$("khaeEvidencePreview").textContent="Backup exceeds the 300 KB limit.";return}
 try{
  const v=JSON.parse(await file.text());
  if(!v||v.schema!=="khae-language-evidence-v1"||v.course!==course||v.week!==week||v.label!==safe(label.value)||fields.some(k=>typeof v[k]!=="string"||v[k].length>30000)||!Array.isArray(v.attempts??[])){
   $("khaeEvidencePreview").textContent="Backup rejected: schema, course, week, learner label or field validation failed.";return
  }
  pending=v;$("khaeEvidenceRestore").disabled=false;
  $("khaeEvidencePreview").textContent="Matching backup preview: "+course+" Week "+week+"; label "+v.label+"; "+(v.attempts?.length||0)+" formative attempts; evidence fields "+fields.filter(k=>v[k].trim()).join(", ")+". Confirm to replace this learner's local draft.";
 }catch{$("khaeEvidencePreview").textContent="Unable to parse this JSON backup."}
});
$("khaeEvidenceRestore").addEventListener("click",()=>{
 if(!pending||!activeKey||pending.label!==safe(label.value)||pending.course!==course||pending.week!==week)return;
 try{
  localStorage.setItem(activeKey,JSON.stringify(pending));
  for(const k of fields)$("khaeEvidence-"+k).value=pending[k];
  status.textContent="Matching backup restored to this learner label.";
 }catch{status.textContent="Restore failed; browser storage unavailable."}
 pending=null;$("khaeEvidenceRestore").disabled=true;$("khaeEvidencePreview").textContent="";
});
})();
