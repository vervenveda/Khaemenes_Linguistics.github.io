import assert from "node:assert/strict";import {readFileSync} from "node:fs";import vm from "node:vm";
const html=readFileSync(new URL("../apps/russian-conversation-world/index.html",import.meta.url),"utf8");
const code=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];assert.ok(code);new vm.Script(code);
const scenes=[...code.matchAll(/title:"Week (\d+) ·/g)].map(x=>Number(x[1]));assert.equal(scenes.join(","),"1,2,3,4,5,6");
for(const token of ["russian_active_learner","khaemenes_russian_world_v1_","graded:false","onerror","printout","Parent / teacher review","russian-conversation-practice.json"]){assert.ok(html.includes(token),token)}
const sw=readFileSync(new URL("../service-worker.js",import.meta.url),"utf8");assert.ok(sw.includes("./apps/russian-conversation-world/index.html"));
for(const path of ["Russian_hub_index.html","Russian_skills_lab_index.html"]){const page=readFileSync(new URL("../apps/"+path,import.meta.url),"utf8");assert.ok(page.includes("./russian-conversation-world/"),path)}
console.log("RUSSIAN_CONVERSATION_WORLD=PASS");
