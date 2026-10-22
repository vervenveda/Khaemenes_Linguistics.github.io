import { chromium } from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const pages=["apps/French_101_index.html","apps/German_coach_index.html"],issues=[];
for(const route of pages){
 const context=await browser.newContext({viewport:{width:255,height:760}});
 const page=await context.newPage();
 await page.goto("http://127.0.0.1:8765/"+route,{waitUntil:"domcontentloaded"});
 try{
  await page.waitForFunction(()=>typeof window.VNVLanguage==="object",{timeout:20000});
  await page.evaluate(()=>window.VNVLanguage.setLanguage("ar"));
  const audit=await page.evaluate(()=>{
   const candidates=[...document.querySelectorAll("body *")].filter(e=>!e.closest("[aria-hidden=true],.drawer")&&getComputedStyle(e).display!=="none"&&getComputedStyle(e).visibility!=="hidden");
   const overflow=candidates.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>innerWidth+18&&getComputedStyle(e).position!=="fixed"}).slice(0,6).map(e=>({tag:e.tagName,id:e.id,className:String(e.className).slice(0,50)}));
   return {lang:document.documentElement.lang,dir:document.documentElement.dir,select:!!document.querySelector("#vnv-language-select"),overflow};
  });
  if(audit.lang!=="ar"||audit.dir!=="rtl"||!audit.select)issues.push(route+" language control "+JSON.stringify(audit));
  if(audit.overflow.length)issues.push(route+" visible overflow "+JSON.stringify(audit.overflow));
  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>typeof window.VNVLanguage==="object",{timeout:20000});
  if(await page.evaluate(()=>window.VNVLanguage.getLanguage())!=="ar")issues.push(route+" language preference lost");
  const inputIntegrity=await page.evaluate(()=>{
   const field=document.createElement("textarea");field.value="Student response in Arabic العربية";field.setAttribute("data-student","true");document.body.append(field);
   window.VNVLanguage.setLanguage("fr");const preserved=field.value==="Student response in Arabic العربية";field.remove();return preserved;
  });
  if(!inputIntegrity)issues.push(route+" changed student response");
  console.log("FIVE_BUBBLE_BROWSER_SAMPLE",route,JSON.stringify(audit));
 }catch(e){issues.push(route+" "+e.message)}finally{await context.close()}
}
await browser.close();
if(issues.length){console.error("FIVE_BUBBLE_BROWSER_FAILURES",JSON.stringify(issues));process.exitCode=1}
else console.log("FRENCH_GERMAN_BROWSER_SMOKE=PASS");
