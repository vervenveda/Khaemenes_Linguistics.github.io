/* Pierre · Sovereign Translator mentor bridge v1.
 * User-driven copy and direct navigation only. No transmission, no cross-origin
 * chat access, no access to local reviewed pairs, grades, cloudFS or vaults.
 * Dictionary translations remain owned by Khaemenes Sovereign Translator.
 */
(function(root){"use strict";
 if(root.PierreTranslatorMentor?.version===1)return;
 const PROFILE="../assets/pierre-core-profile.v1.json";
 const CHAT="https://artist1970.github.io/Pierre.gihub.io/#talk";
 const PIN="dee9019c0e37be778b556a30f7cde3a271b46192";
 let profileState="pending";
 function validProfile(p){
   return !!p && p.schema==="pierre-public-core-profile-v1" && p.mentorId==="pierre" &&
     p.name==="Pierre" && p.source?.repository==="artist1970/CORE" &&
     p.source?.path==="PierreCore/AI_CORE_MANIFEST.json" && p.source?.gitBlobSha===PIN &&
     p.authority?.publicEducationalGuidance===true &&
     p.authority?.delegatedAdministrativeAuthority===false &&
     p.authority?.protectedRuntimeAccess===false && p.authority?.consequentialExecution===false &&
     p.synchronization?.automaticDraftPublication===false &&
     p.synchronization?.privateCloudAccess===false;
 }
 const status=document.getElementById("pierreMentorStatus");
 async function verify(){
   try{
     const res=await fetch(PROFILE,{credentials:"same-origin",cache:"no-cache",redirect:"error"});
     if(!res.ok||!validProfile(await res.json()))throw Error("invalid-public-profile");
     profileState="verified";
   }catch(_){profileState="unavailable";}
   if(status&&profileState==="unavailable"){
     status.textContent="Pierre's public identity record is unavailable. You can still open the public chat; no translator data will be sent automatically.";
   }
   return profileState;
 }
 async function copyContext(){
   if(!status)return false;
   const input=document.getElementById("input")?.value?.trim()||"";
   const output=document.getElementById("output")?.textContent?.trim()||"";
   const from=document.getElementById("langFrom")?.selectedOptions?.[0]?.textContent?.trim()||"";
   const to=document.getElementById("langTo")?.selectedOptions?.[0]?.textContent?.trim()||"";
   if(!input && !output){
     status.textContent="Enter or translate a passage first, or open Pierre's chat directly.";
     return false;
   }
   // We never copy stored personal review libraries, lesson identity or any
   // browser-origin persistent data; this is only visible current workspace text.
   const selected=[input&&"Original ("+from+"): "+input.slice(0,1200),
     output&&"Translator output ("+to+", unverified until reviewed): "+output.slice(0,1200)]
     .filter(Boolean).join("\n\n");
   if(!root.navigator?.clipboard?.writeText){
     status.textContent="Clipboard not available. Select and copy your text manually, then open Pierre's chat.";
     return false;
   }
   try{
     await root.navigator.clipboard.writeText(selected);
     status.textContent="Current text copied locally. Review it for private details before pasting into Pierre's chat. No message was sent.";
     return true;
   }catch(_){
     status.textContent="Clipboard permission unavailable. Copy the passage yourself; the chat link remains available.";
     return false;
   }
 }
 document.getElementById("pierreCopyContext")?.addEventListener("click",copyContext);
 root.PierreTranslatorMentor=Object.freeze({version:1,profileUrl:PROFILE,chatUrl:CHAT,
   get profileStatus(){return profileState;},verify,copyContext});
 verify();
})(window);
