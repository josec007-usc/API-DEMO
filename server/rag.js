import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const SUPPORTED_EXTENSIONS = new Set([".md", ".txt"]);
const STOP_WORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "by", "can", "could",
  "explain", "for", "from", "help", "how", "i", "in", "is", "it", "learn",
  "make", "need", "of", "on", "or", "please", "show", "that", "the", "this",
  "to", "was", "what", "when", "where", "which", "who", "will", "with", "would",
  "you", "your"
]);

export function tokenize(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => (word.length > 1 || /^\d$/.test(word)) && !STOP_WORDS.has(word));
}

function titleFromContent(content, filename) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || path.basename(filename, path.extname(filename)).replaceAll("-", " ");
}

export function chunkDocument(content, source, maxCharacters = 1400) {
  const paragraphs = content.replace(/\r/g, "").split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  const chunks = [];
  let buffer = "";

  for (const paragraph of paragraphs) {
    const isHeading = /^#{1,6}\s+/.test(paragraph);
    if (isHeading && buffer) {
      chunks.push(buffer);
      buffer = paragraph;
      continue;
    }

    if (buffer && buffer.length + paragraph.length + 2 > maxCharacters) {
      chunks.push(buffer);
      buffer = "";
    }

    if (paragraph.length > maxCharacters) {
      const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [paragraph];
      for (const sentence of sentences) {
        if (buffer && buffer.length + sentence.length + 1 > maxCharacters) {
          chunks.push(buffer);
          buffer = "";
        }
        buffer += `${buffer ? " " : ""}${sentence.trim()}`;
      }
    } else {
      buffer += `${buffer ? "\n\n" : ""}${paragraph}`;
    }
  }

  if (buffer) chunks.push(buffer);

  return chunks.map((text, index) => ({
    id: `${source.file}#${index + 1}`,
    text,
    source,
    terms: tokenize(text)
  }));
}

export async function loadKnowledgeBase(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile()
      && entry.name.toLowerCase() !== "readme.md"
      && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort();

  const chunks = [];
  for (const file of files) {
    const content = await readFile(path.join(directory, file), "utf8");
    const source = { file, title: titleFromContent(content, file) };
    chunks.push(...chunkDocument(content, source));
  }

  return { chunks, files };
}

export function retrieve(query, chunks, limit = 4) {
  const queryTerms = tokenize(query);
  const uniqueQueryTerms = [...new Set(queryTerms)];
  const queryPhrase = query.toLowerCase().trim();
  const adjacentPhrases = queryTerms.slice(0, -1).map((term, index) => `${term} ${queryTerms[index + 1]}`);

  return chunks
    .map((chunk) => {
      const frequencies = new Map();
      for (const term of chunk.terms) frequencies.set(term, (frequencies.get(term) || 0) + 1);

      let score = 0;
      let matchedTerms = 0;
      for (const term of uniqueQueryTerms) {
        const count = frequencies.get(term) || 0;
        if (count) {
          matchedTerms += 1;
          score += 1 + Math.log(count);
        }
        if (chunk.source.title.toLowerCase().includes(term)) score += 1.5;
      }
      let phraseMatches = 0;
      for (const phrase of adjacentPhrases) {
        if (chunk.text.toLowerCase().includes(phrase)) {
          phraseMatches += 1;
          score += 3;
        }
      }
      const exactMatch = queryPhrase.length > 3 && chunk.text.toLowerCase().includes(queryPhrase);
      if (exactMatch) score += 5;

      // For multi-term questions, a single generic overlap such as "app" is not
      // enough evidence to send the question to the model. A one-term search is
      // still useful for distinctive course vocabulary such as "closures".
      const relevant = exactMatch
        || phraseMatches > 0
        || matchedTerms >= 2
        || (uniqueQueryTerms.length === 1 && matchedTerms === 1);

      return { ...chunk, score: Number(score.toFixed(3)), relevant };
    })
    .filter((chunk) => chunk.relevant)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ relevant: _relevant, ...chunk }) => chunk);
}

export function formatContext(matches) {
  if (!matches.length) return "No relevant course passages were retrieved.";
  return matches
    .map((match, index) => `[Source ${index + 1}: ${match.source.title} (${match.source.file})]\n${match.text}`)
    .join("\n\n---\n\n");
}
