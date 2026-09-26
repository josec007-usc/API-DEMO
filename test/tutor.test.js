import test from "node:test";
import assert from "node:assert/strict";
import {
  buildTutorPrompt,
  GROUNDING_FAILURE_RESPONSE,
  NO_COURSE_SUPPORT_RESPONSE,
  TUTOR_SYSTEM_INSTRUCTION,
  validateTutorAnswer
} from "../server/tutor.js";

test("tutor is restricted to supplied course sources", () => {
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /closed-book/i);
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /cannot browse/i);
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /Never invent a citation/i);
});

test("tutor coaches instead of completing graded work", () => {
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /do not complete graded work/i);
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /small illustrative snippets/i);
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /one next step at a time/i);
});

test("tutor escalates unsupported or overly complex questions", () => {
  assert.match(TUTOR_SYSTEM_INSTRUCTION, /recommend bringing the code, error, and attempted fixes to the professor/i);
  assert.match(NO_COURSE_SUPPORT_RESPONSE, /cannot consult the wider web/i);
  assert.match(NO_COURSE_SUPPORT_RESPONSE, /professor/i);
});

test("student prompt clearly separates sources from student content", () => {
  const prompt = buildTutorPrompt("[Source 1]\nUse @State.", "Why is my view stale?");
  assert.match(prompt, /COURSE SOURCES/);
  assert.match(prompt, /STUDENT QUESTION OR CODE/);
  assert.match(prompt, /Why is my view stale/);
});

test("grounding validator accepts only available source citations", () => {
  assert.equal(validateTutorAnswer("Check @State [Source 1].", 2).valid, true);
  assert.equal(validateTutorAnswer("Check @State.", 2).reason, "missing_citation");
  assert.equal(validateTutorAnswer("Check @State [Source 3].", 2).reason, "invalid_citation");
  assert.match(GROUNDING_FAILURE_RESPONSE, /do not want to guess/i);
});

test("grounding validator permits an explicit escalation without a citation", () => {
  const answer = "This goes beyond the course material I have access to. I cannot consult the wider web. Please ask your professor.";
  const result = validateTutorAnswer(answer, 0);
  assert.equal(result.valid, true);
  assert.equal(result.boundary, true);
});
