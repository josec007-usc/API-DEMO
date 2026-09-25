# Course Companion: Gemini RAG demo

A classroom-ready starter that demonstrates how a public webpage can use an AI API without exposing its secret key.

The project has two pieces:

- `public/` is a static chatbot interface deployed by GitHub Pages.
- `server/` runs in GitHub Codespaces, retrieves relevant passages from `knowledge/`, and calls Gemini with the secret API key.

The browser sends a question to the Codespace. The server finds relevant course passages, sends only those passages and recent chat history to Gemini, then returns the answer and source labels.

## Instructor setup

1. Add the real syllabus and lesson plans to `knowledge/` as Markdown (`.md`) or plain text (`.txt`). Delete the two example files when they are no longer useful.
2. Push the repository to GitHub and create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey).
3. In the GitHub repository, open **Settings → Secrets and variables → Codespaces → New repository secret**. Name it `GEMINI_API_KEY` and paste the key there.
4. Create a Codespace for the repository. The container installs packages and starts the server automatically. Its output is saved at `/tmp/course-companion-api.log`; run `tail -f /tmp/course-companion-api.log` in the Codespace terminal when you want to inspect it.
5. Open the Codespace **Ports** panel. Confirm port `3000` is **Public**, then copy its forwarded address, such as `https://...-3000.app.github.dev`.
6. Set `ALLOWED_ORIGINS` as a Codespaces secret containing the GitHub Pages origin, such as `https://YOUR-USERNAME.github.io`. Rebuild or restart the Codespace after adding it. To allow local testing too, use a comma-separated list.
7. In repository **Settings → Pages**, select **GitHub Actions** as the source. Push to `main` or manually run the Pages workflow.
8. Open the deployed page, choose **Connect server**, paste the public port URL, and test the connection.

For a fixed class demo, put the Codespace URL in `public/config.js`. That URL is public by design; the Gemini key is not. A Codespace stops after inactivity, so start it before a demonstration. The page’s connection dialog makes it easy to update a changed Codespace URL without rebuilding the site.

## Student template workflow

Students can click **Use this template** on GitHub, create a repository, and repeat the setup above with their own Gemini key. Before distributing the repository, enable **Template repository** under the instructor repository’s General settings.

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
- Public Codespace ports are suitable for a supervised demo, not a permanent production service. For an always-on class tool, deploy the same server to a managed host with authentication and usage controls.
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
```
