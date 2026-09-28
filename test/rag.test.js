import test from "node:test";
import assert from "node:assert/strict";
import { chunkDocument, formatContext, retrieve, tokenize } from "../server/rag.js";

test("tokenize removes common words and punctuation", () => {
  assert.deepEqual(tokenize("What is the late-work policy?"), ["late-work", "policy"]);
});

test("tokenize preserves single-digit assignment numbers", () => {
  assert.deepEqual(tokenize("What is exercise 2?"), ["exercise", "2"]);
});

test("retrieval ranks a relevant passage above unrelated material", () => {
  const source = { title: "Syllabus", file: "syllabus.md" };
  const chunks = [
    ...chunkDocument("Late assignments receive a ten percent deduction.", source),
    ...chunkDocument("The classroom is on the second floor.", source)
  ];
  const matches = retrieve("What is the late assignment policy?", chunks, 2);
  assert.equal(matches[0].text, "Late assignments receive a ten percent deduction.");
});

test("retrieval rejects an unrelated question with only one generic overlap", () => {
  const source = { title: "iOS Development", file: "ios.md" };
  const chunks = chunkDocument("Build an iOS app using Swift and Xcode.", source);
  const matches = retrieve("Can you help me make an app for baking a cake?", chunks);
  assert.deepEqual(matches, []);
});

test("retrieval preserves useful single-term course searches", () => {
  const source = { title: "Swift", file: "swift.md" };
  const chunks = chunkDocument("Closures capture values from their surrounding context.", source);
  const matches = retrieve("closures", chunks);
  assert.equal(matches.length, 1);
});

test("formatContext numbers retrieved sources", () => {
  const context = formatContext([{ text: "Office hours are Friday.", source: { title: "Syllabus", file: "syllabus.md" } }]);
  assert.match(context, /\[Source 1: Syllabus \(syllabus.md\)\]/);
});

test("chunkDocument keeps Markdown heading sections separate", () => {
  const source = { title: "Assignments", file: "assignments.md" };
  const chunks = chunkDocument("# Assignments\n\n## Exercise 1\n\nBuild a greeting.\n\n## Exercise 2\n\nBuild a counter.", source);
  assert.equal(chunks.length, 3);
  assert.match(chunks[1].text, /Exercise 1[\s\S]*greeting/);
  assert.doesNotMatch(chunks[1].text, /Exercise 2/);
  assert.match(chunks[2].text, /Exercise 2[\s\S]*counter/);
});
