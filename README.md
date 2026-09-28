# Course Companion: Gemini RAG demo

A classroom-ready starter that demonstrates how a public webpage can use an AI API without exposing its secret key.

The project has two pieces:

- `public/` is a static chatbot interface deployed by GitHub Pages.
- `server/` runs as a Render web service, retrieves relevant passages from `knowledge/`, and calls Gemini with the secret API key.

The browser sends a question to Render. The server finds relevant course passages, sends only those passages and recent chat history to Gemini, then returns the answer and source labels.

The tutor is configured as a closed-book assistant. It must ground technical and course claims in the retrieved materials, cite those materials, coach rather than complete graded work, and clearly escalate unsupported or overly complex questions to the professor. Questions with no retrieved course support are stopped by the server before they reach Gemini. The server also rejects generated answers that omit citations or cite source numbers that were not retrieved.

## Instructor setup

1. Add the real syllabus and lesson plans to `knowledge/` as Markdown (`.md`) or plain text (`.txt`). Delete the two example files when they are no longer useful.
2. Push the repository to GitHub and create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey).
3. In Render, choose **New → Blueprint**, connect this GitHub repository, and deploy the `render.yaml` blueprint.
4. When prompted for `GEMINI_API_KEY`, paste the key into Render. It is stored as a secret and is not committed to GitHub.
5. Wait for the service health check to pass, then copy its permanent `https://...onrender.com` address.
6. Put that address into `public/config.js`, commit it, and push.
7. In repository **Settings → Pages**, select **GitHub Actions** as the source. Push to `main` or manually run the Pages workflow.

The Render URL in `public/config.js` is public by design; the Gemini key is not. Render's free service can sleep after inactivity, so the webpage displays **Server waking up…** and retries while it starts. The Render URL remains stable across restarts and deployments.

## Student template workflow

Students use the instructor-hosted webpage and server without entering an API key or server URL. The instructor's Render secret powers the class demo.

The repository can separately serve as a downloadable teaching template. Students can click **Use this template** on GitHub to copy the code into a repository they own. GitHub does not copy the instructor's Codespaces secrets into repositories created from the template. Students only need to add their own key if an assignment asks them to deploy an independent copy. Before distributing the repository, enable **Template repository** under the instructor repository’s General settings.

Never place a key in `public/config.js`, HTML, client-side JavaScript, a Git commit, or a chat message. Anything sent to GitHub Pages is readable by visitors.

## Run locally

Requirements: Node.js 20 or newer.

```powershell
Copy-Item .env.example .env
# Edit .env and add your key, then:
npm install
npm run dev
```

Open `http://localhost:3000`. The Express server serves both the webpage and API locally, so the connection URL can remain blank only when using the same origin. For the deployed GitHub Pages version, use the connection dialog.

## API endpoints

- `GET /api/health` reports server, key, model, and knowledge-base status without revealing the key.
- `POST /api/chat` accepts `{ "message": "...", "history": [...] }` and returns an answer with retrieved source metadata.

The starter uses transparent keyword retrieval so students can read the whole RAG pipeline. It is appropriate for a small syllabus and lesson collection. A future lesson can replace `retrieve()` in `server/rag.js` with Gemini embeddings and a vector database without changing the browser interface.

## Safety and operating notes

- CORS limits browser access to origins listed in `ALLOWED_ORIGINS`.
- Requests are limited to 12 per minute per client and 2,000 characters per question.
- The key stays in the server environment and is never returned by an endpoint.
- Render's free tier is appropriate for a classroom demo but can sleep, restart, or reach free usage limits. A larger or permanent class tool should use authentication, durable rate limiting, and a paid service if uptime is important.
- Review course documents for student records, accommodations, grades, or other private information before committing them.

## Project map

```text
public/                 GitHub Pages interface
server/index.js         Express API and Gemini call
server/rag.js           Loading, chunking, and retrieval
knowledge/              Course source documents
test/                   Retrieval tests
.devcontainer/          One-click Codespaces environment
.github/workflows/      GitHub Pages deployment
render.yaml             Render web-service deployment
```
