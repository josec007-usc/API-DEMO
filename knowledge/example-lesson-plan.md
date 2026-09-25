# Example Lesson Plan: Clients, Servers, and Secrets

> Replace this demonstration file with the real lesson plan before sharing the chatbot.

## Lesson goal

Students will trace a question from the browser to a protected server, then from the server to the Gemini API and back. They will identify which information is public and which information must remain secret.

## Activities

First, inspect the static GitHub Pages interface. Next, start the API server in a GitHub Codespace and make port 3000 public. Add a Gemini key as a Codespaces secret, connect the webpage to the public port URL, and ask a question grounded in the sample syllabus.

## Reflection prompt

Why would placing an API key in `config.js` expose it even if the GitHub repository were private?

