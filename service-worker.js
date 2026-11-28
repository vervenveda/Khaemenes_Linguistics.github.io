/* Polyglot — Khaemenes Academy Linguistics Hall
   Static-site service worker. Update CACHE_VERSION whenever core files change. */

const CACHE_VERSION = 'polyglot-v1.5.15-home-theme-20261128';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL = [
  './',
  './index.html',
  './data/course-topology.json',
  './assets/course-authority-bridge.js',
  './assets/v4-learner-scope.js',
  './Halls/index.html',
  './apps/language-worlds/index.html',
  './apps/language-worlds/french/index.html',
  './apps/language-worlds/german/index.html',
  './apps/language-worlds/russian/index.html',
  './apps/language-worlds/english-esl/index.html',
  './apps/arabic-learning-worlds/index.html',
  './assets/linguistics-landing.css',
  './assets/polyglot-home.css',
  './Halls/hall-i18n-pack.js',
  './apps/language-worlds/spanish/index.html',
  './apps/language-worlds/mandarin/index.html',
  './apps/language-worlds/japanese/index.html',
  './Halls/courses/arabic-1/index.html',
  './Halls/courses/russian-1/index.html',
  './apps/ESL_course_index.html',
  './404.html',
  './offline.html',
  './manifest.webmanifest',
  './register-service-worker.js',
  './assets/vnv-language.js',
  './apps/translator.html',
  './apps/German_hub_index.html',
  './apps/German_coach_index.html',
  './apps/Russian_hub_index.html',
  './apps/Russian_skills_lab_index.html',
  './apps/russian-conversation-world/index.html',
  './apps/russian-mastery-constellation/index.html',
  './apps/deutsche-geschichten/index.html',
  './apps/deutsches-klanglabor/index.html',
  './apps/die-lebendige-welt/index.html',
  './apps/german-mastery-constellation/index.html',
  './assets/german-portfolio-print.js',
  './apps/French_101_index.html',
  './apps/chroniques-francophones/index.html',
  './apps/atelier-des-sons/index.html',
  './apps/le-monde-vivant/index.html',
  './apps/maitrise-constellation/index.html',
  './assets/khaemenes-campus-phrases.js',
  './assets/sovereign-dictionary.generated.js',
  './assets/sovereign-dictionary-v1-errata.js',
  './assets/khaemenes-interlingual-core.js',
  './assets/khaemenes-review-policy.js',
  './assets/khaemenes-lexicon-expansion.js',
  './assets/khaemenes-transliteration.js',
  './assets/khaemenes-translator-loader.js',
  './assets/khaemenes-translation-request-guard.js',
  './assets/khaemenes-translation-teacher-arbiter.js',
  './assets/khaemenes-translation-candidate-lab.js',
  './assets/khaemenes-translation-candidate-ui.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('polyglot-') && ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Runtime entries are bounded; the precached teaching shell is never pruned.
const RUNTIME_LIMIT=400;
let cacheQueue=Promise.resolve();
// Normalize only known public static entrances. Unknown query keys are never cached.
const PUBLIC_HALL_LANGUAGES=new Set(["spanish","french","german","mandarin","japanese"]);
const PUBLIC_UI_LANGUAGES=new Set(["en","es","fr","ar","zh","de","ru","pt","hi","ja","ko","it","bn"]);
function cacheKey(request,url){
 const copy=new URL(url.href);
 const scope=new URL(self.registration.scope);
 const relative=copy.pathname.slice(scope.pathname.length);
 const keys=[...copy.searchParams.keys()];
 if(new Set(keys).size!==keys.length)return null;
 if(request.mode==='navigate'){
  if(copy.searchParams.has('lang')&&!PUBLIC_UI_LANGUAGES.has(copy.searchParams.get('lang')))return null;
  const hall=relative==='Halls/index.html'||relative==='Halls/';
  if(keys.some(k=>k!=='lang'&&!(hall&&(k==='language'||k==='course'))))return null;
  if(hall&&copy.searchParams.has('language')&&!PUBLIC_HALL_LANGUAGES.has(copy.searchParams.get('language')))return null;
  if(hall&&copy.searchParams.has('course')&&(!copy.searchParams.has('language')||! /^(?:[a-z0-9-]{1,20})$/.test(copy.searchParams.get('course'))))return null;
  copy.search='';
  if(relative===''||relative.endsWith('/'))copy.pathname+='index.html';
 }else{
  if(keys.some(k=>k!=='v'))return null;
  // Only local, explicitly precached assets may share a versioned/unversioned key.
  if(copy.searchParams.has('v')&&!APP_SHELL.includes('./'+relative))return copy.href;
  if(copy.searchParams.has('v')&&!/\.(?:js|css)$/i.test(relative))return null;
  copy.searchParams.delete('v');
 }
 copy.hash='';
 return copy.href;
}
function remember(key,response){
 if(!key||!response.ok||response.type!=='basic'||/no-store|private/i.test(response.headers.get('Cache-Control')||''))return Promise.resolve();
 const copy=response.clone();
 cacheQueue=cacheQueue.then(async()=>{
  const cache=await caches.open(RUNTIME_CACHE);
  await cache.put(key,copy);
  const keys=await cache.keys();
  for(const old of keys.slice(0,Math.max(0,keys.length-RUNTIME_LIMIT)))await cache.delete(old);
 }).catch(()=>{});
 return cacheQueue;
}
async function cached(key){
 if(!key)return undefined;
 const runtime=await caches.open(RUNTIME_CACHE);
 return await runtime.match(key)||await caches.match(key);
}
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope)||request.headers.has('Authorization'))return;
 if(/(?:^|\/)apps\/vocabulary-mini-cloud(?:\/|$)/i.test(url.pathname))return;
 const key=cacheKey(request,url);
 if(!key)return;
 const networkFirst=request.mode==='navigate'||request.destination==='script'||request.destination==='style'||/\.(?:js|mjs|css)$/i.test(url.pathname);
 if(networkFirst){
  event.respondWith((async()=>{
   let fallback;try{fallback=await cached(key)}catch{}
   try{
    const response=await fetch(request);
    if(!response.ok)return fallback||response;
    await remember(key,response);return response;
   }catch{
    return fallback||(request.mode==='navigate'?await caches.match('./offline.html'):null)||Response.error();
   }
  })());
  return;
 }
 const update=fetch(request).then(async response=>{await remember(key,response);return response}).catch(()=>null);
 event.waitUntil(update.then(()=>{}));
 event.respondWith((async()=>{
  let fallback;try{fallback=await cached(key)}catch{}
  return fallback||await update||Response.error();
 })());
});
