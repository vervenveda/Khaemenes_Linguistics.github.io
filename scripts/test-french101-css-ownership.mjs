import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("apps/French_101_index.html","utf8");

test("empty toolbar-fit block stays removed",()=>{
 assert.ok(!html.includes('id="french101-toolbar-fit"'));
});

test("French 101 retains forty-four non-empty style blocks after C02 safe cut",()=>{
 const blocks=[...html.matchAll(/<style(?:\s+id="([^"]+)")?[^>]*>([\s\S]*?)<\/style>/g)];
 assert.equal(blocks.length,44);
 for(const [,id,css] of blocks) assert.ok(css.trim().length>0,(id||"anonymous")+" unexpectedly empty");
});

test("critical current feature style owners remain intact",()=>{
 for(const id of [
  "french101-vnv-ka-crisp-parchment-v3",
  "french101-current-unit-archive-v1",
  "french101-resumable-assessment-v1",
  "french101-unit-progress-v1",
  "french101-learner-family-dashboard-v1",
  "french101-secondary-navigation-narrator-v1",
  "french101-translation-exact-controls"
 ]) assert.ok(html.includes('id="'+id+'"'),id);
});
