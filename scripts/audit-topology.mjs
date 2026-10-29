#!/usr/bin/env node
import {readFileSync, existsSync} from "node:fs";
import {resolve, dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const errors=[];
const check=(ok,msg)=>{if(!ok)errors.push(msg)};
const read=p=>readFileSync(join(root,p),"utf8");
const exists=p=>existsSync(join(root,p));
const stripQuery=p=>String(p||"").split("?")[0].split("#")[0];

const topology=JSON.parse(read("data/course-topology.json"));
const home=read("index.html");
const manifest=JSON.parse(read("manifest.webmanifest"));
const mentor=JSON.parse(read("mentor-manifest.json"));
const sw=read("service-worker.js");

check(topology.schema_version==="1.0.0","Unexpected topology schema version");
check(topology.principal_routes?.length===topology.stats?.principal_language_routes,"Principal route count mismatch");

const ids=new Set();
for(const route of topology.principal_routes||[]){
  check(route.id&&!ids.has(route.id),"Duplicate/missing principal route id: "+route.id);
  ids.add(route.id);
  const learner=stripQuery(route.learner_experience);
  const authority=stripQuery(route.academic_authority);
  check(exists(learner),"Missing learner experience: "+learner);
  check(exists(authority),"Missing academic authority: "+authority);
  check(Boolean(topology.record_authorities?.[route.record_authority]),"Missing record authority for "+route.id);
  const homeHref="./"+learner.replace(/index\.html$/,"");
  const acceptable=[
    'href="./'+learner+'"',
    'href="./'+learner.replace(/index\.html$/,"")+'"',
    'href="./'+learner.replace(/\/index\.html$/,"/")+'"'
  ];
  check(acceptable.some(token=>home.includes(token)),"Homepage principal route missing: "+route.id+" -> "+learner);
}
for(const archive of topology.archives||[]){
  check(exists(archive.path),"Missing preserved archive: "+archive.path);
  check(archive.new_course_entry===false,"Archive may not be a new-course entry: "+archive.path);
}
check(exists(topology.translator_surfaces?.canonical?.path),"Canonical translator missing");
for(const item of topology.translator_surfaces?.compatibility||[])check(exists(item.path),"Translator compatibility surface missing: "+item.path);

const appMatch=home.match(/<script\s+type="application\/json"\s+id="appRegistry">([\s\S]*?)<\/script>/);
check(Boolean(appMatch),"Homepage appRegistry missing");
if(appMatch){
  const apps=JSON.parse(appMatch[1]);
  check(apps.length===topology.stats.local_app_registry_count,"Homepage appRegistry count "+apps.length+" != topology "+topology.stats.local_app_registry_count);
  check(new Set(apps.map(a=>a.file)).size===apps.length,"Homepage appRegistry has duplicate file paths");
  for(const app of apps)check(exists(join("apps",app.file)),"Homepage app target missing: "+app.file);
}
check(home.includes(topology.stats.local_app_registry_count+" local language apps"),"Homepage visible app count is stale");
check(home.includes("Browse "+topology.stats.local_app_registry_count+" local apps"),"Homepage browse-app count is stale");

const homeIds=new Set([...home.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
for(const shortcut of manifest.shortcuts||[]){
  const hash=String(shortcut.url||"").match(/#([^#?]+)/)?.[1];
  check(Boolean(hash)&&homeIds.has(hash),"PWA shortcut points to missing home anchor: "+shortcut.url);
}

const mentorUrls=new Set((mentor.resources||[]).map(r=>r.url));
const publicBase="https://vervenveda.com/Khaemenes_Linguistics.github.io/";
const requiredMentorPaths=[
  "",
  "Halls/",
  "apps/French_101_index.html",
  "apps/German_hub_index.html",
  "apps/language-worlds/spanish/",
  "apps/language-worlds/mandarin/",
  "apps/language-worlds/japanese/",
  "Halls/courses/arabic-1/",
  "Halls/courses/russian-1/",
  "apps/translator.html"
];
for(const p of requiredMentorPaths)check(mentorUrls.has(publicBase+p),"Mentor manifest missing canonical resource: "+p);

check(sw.includes("'./data/course-topology.json'"),"Service worker does not cache topology registry");
for(const p of topology.offline_policy?.canonical_entrances||[]){
  const normalized=p==="index.html"?"./index.html":"./"+p;
  check(sw.includes("'"+normalized+"'"),"Service worker shell missing canonical entrance: "+p);
}

if(errors.length){
  console.error("TOPOLOGY_INTEGRITY=FAIL\n"+errors.map(e=>" - "+e).join("\n"));
  process.exitCode=1;
}else{
  console.log("TOPOLOGY_INTEGRITY=PASS; principal="+topology.principal_routes.length+", apps="+topology.stats.local_app_registry_count+", formal-v4="+topology.stats.formal_v4_courses);
}
