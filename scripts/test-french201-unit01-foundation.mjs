import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {test} from "node:test";
const root=new URL("../",import.meta.url);
const data=JSON.parse(readFileSync(new URL("data/french-201-unit01.json",root),"utf8"));
const html=readFileSync(new URL("apps/French_201_index.html",root),"utf8");
test("six-lesson intermediate unit is complete as a curriculum foundation",()=>{
 assert.equal(data.curriculum_id,"KH-LANG-FR-201-2026");
 assert.equal(data.unit,1);assert.equal(data.lessons.length,6);
 assert.equal(new Set(data.lessons.map(l=>l.id)).size,6);
 for(const [i,l] of data.lessons.entries()){
  assert.equal(l.number,i+1);
  assert.ok(l.title&&l.english&&l.focus&&l.grammar);
  assert.ok(l.model.length>85&&l.reading.length>300);
  assert.ok(l.targets.length>=3&&l.guided.length>=3&&l.questions.length>=3);
  assert.ok(l.production.length>=90&&l.feedback);
 }
});
test("assessment thresholds and reserves are specified, but not misrepresented as working exams",()=>{
 const a=data.assessment_plan;
 assert.deepEqual([a.lesson_quiz.questions,a.lesson_quiz.pass_correct,a.lesson_quiz.min_authored_bank],[20,16,27]);
 assert.deepEqual([a.unit_exam.questions,a.unit_exam.pass_correct,a.unit_exam.min_authored_bank],[50,40,67]);
 assert.deepEqual([a.midterm.questions,a.midterm.pass_correct],[150,120]);
 assert.deepEqual([a.final.questions,a.final.pass_correct],[200,160]);
 assert.match(a.lesson_quiz.status,/not_published/);
 assert.match(a.unit_exam.status,/not_published/);
 assert.match(html,/Formal assessments are/);
 assert.doesNotMatch(html,/localStorage\.setItem\([^)]*formal_mastery/);
});
test("learner interface preserves separate official authority",()=>{
 assert.equal(data.authority.formal_record,"Halls/index.html");
 assert.equal(data.record_policy.formal_grade_awarded,false);
 for(const x of ['id="lessonButtons"','id="lessonContent"','id="learner"','id="export"','id="portfolioProgress"','french-201-unit01.json','khae.fr201.unit01.evidence.v1','aria-live="polite"'])assert.ok(html.includes(x),x);
});
test("all inline script blocks parse",()=>{
 for(const [,source] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(source.trim())assert.doesNotThrow(()=>new Function(source));
});
