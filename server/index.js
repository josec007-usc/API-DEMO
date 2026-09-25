import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { GoogleGenAI } from "@google/genai";
import { formatContext, loadKnowledgeBase, retrieve } from "./rag.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDirectory = path.join(projectRoot, "public");
const knowledgeDirectory = path.join(projectRoot, "knowledge");
const port = Number(process.env.PORT) || 3000;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://127.0.0.1:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const app = express();
const knowledge = await loadKnowledgeBase(knowledgeDirectory);
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json({ limit: "32kb" }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) return callback(null, true);
    return callback(new Error("This website origin is not allowed by the API server."));
  }
}));

const requests = new Map();
app.use("/api/chat", (req, res, next) => {
  const now = Date.now();
  const key = req.ip;
  const recent = (requests.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 12) return res.status(429).json({ error: "Please wait a moment before sending more messages." });
  recent.push(now);
  requests.set(key, recent);
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    configured: Boolean(ai),
    model,
    knowledgeFiles: knowledge.files,
    chunks: knowledge.chunks.length
  });
});

app.post("/api/chat", async (req, res) => {
  if (!ai) return res.status(503).json({ error: "The server is missing its GEMINI_API_KEY secret." });

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-8) : [];
  if (!message || message.length > 2000) {
    return res.status(400).json({ error: "Message must be between 1 and 2,000 characters." });
  }

  const safeHistory = history
    .filter((item) => ["user", "model"].includes(item?.role) && typeof item?.text === "string")
    .map((item) => ({ role: item.role, parts: [{ text: item.text.slice(0, 4000) }] }));
  const matches = retrieve(message, knowledge.chunks);
  const context = formatContext(matches);

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...safeHistory,
        {
          role: "user",
          parts: [{ text: `COURSE SOURCES:\n${context}\n\nSTUDENT QUESTION:\n${message}` }]
        }
      ],
      config: {
        systemInstruction: [
          "You are Course Companion, a helpful teaching assistant.",
          "Answer using the supplied course sources when they are relevant.",
          "Do not invent course policies, dates, assignments, or requirements.",
          "If the sources do not contain the answer, say so plainly and suggest asking the instructor.",
          "Cite supporting passages inline as [Source 1], [Source 2], and so on.",
          "Keep answers clear, supportive, and concise."
        ].join(" "),
        temperature: 0.25,
        maxOutputTokens: 900
      }
    });

    res.json({
      answer: response.text || "I could not generate an answer.",
      sources: matches.map((match, index) => ({
        number: index + 1,
        title: match.source.title,
        file: match.source.file,
        excerpt: match.text.slice(0, 240)
      }))
    });
  } catch (error) {
    console.error("Gemini request failed:", error);
    res.status(502).json({ error: "Gemini could not answer right now. Check the server log and API key." });
  }
});

app.use(express.static(publicDirectory));
app.use((error, _req, res, _next) => {
  if (error.message?.includes("origin")) return res.status(403).json({ error: error.message });
  console.error(error);
  res.status(500).json({ error: "Unexpected server error." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Course Companion API listening on http://localhost:${port}`);
  console.log(`Loaded ${knowledge.chunks.length} chunks from: ${knowledge.files.join(", ") || "no files"}`);
  if (!ai) console.warn("GEMINI_API_KEY is not set; /api/chat will be unavailable.");
});

