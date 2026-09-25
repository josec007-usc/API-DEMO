const elements = {
  form: document.querySelector("#chatForm"),
  input: document.querySelector("#messageInput"),
  send: document.querySelector("#sendButton"),
  messages: document.querySelector("#messages"),
  suggestions: document.querySelector("#suggestions"),
  settingsButton: document.querySelector("#settingsButton"),
  dialog: document.querySelector("#settingsDialog"),
  settingsForm: document.querySelector("#settingsForm"),
  apiUrl: document.querySelector("#apiUrl"),
  testButton: document.querySelector("#testButton"),
  result: document.querySelector("#connectionResult"),
  statusDot: document.querySelector("#statusDot"),
  statusLabel: document.querySelector("#statusLabel")
};

const history = [];
const localApiUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname) ? window.location.origin : "";
let apiBaseUrl = cleanUrl(localStorage.getItem("course-companion-api") || window.APP_CONFIG?.apiBaseUrl || localApiUrl);

function cleanUrl(value) {
  return String(value).trim().replace(/\/$/, "");
}

function setConnectionStatus(connected, label = connected ? "Server connected" : "Connect server") {
  elements.statusDot.classList.toggle("connected", connected);
  elements.statusLabel.textContent = label;
}

function addMessage(role, text, sources = []) {
  const article = document.createElement("article");
  article.className = `message ${role === "user" ? "user-message" : "assistant-message"}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = role === "user" ? "Y" : "C";

  const body = document.createElement("div");
  const label = document.createElement("p");
  label.className = "message-label";
  label.textContent = role === "user" ? "You" : "Course Companion";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  body.append(label, bubble);

  if (sources.length) {
    const sourceList = document.createElement("div");
    sourceList.className = "source-list";
    for (const source of sources) {
      const chip = document.createElement("span");
      chip.className = "source-chip";
      chip.textContent = `[${source.number}] ${source.title}`;
      chip.title = source.excerpt;
      sourceList.append(chip);
    }
    body.append(sourceList);
  }

  article.append(avatar, body);
  elements.messages.append(article);
  elements.messages.scrollTop = elements.messages.scrollHeight;
  return article;
}

function addTypingIndicator() {
  const node = addMessage("model", "");
  node.classList.add("typing");
  node.querySelector(".bubble").setAttribute("aria-label", "Course Companion is thinking");
  return node;
}

async function checkConnection(url = apiBaseUrl) {
  const target = cleanUrl(url);
  if (!target) {
    setConnectionStatus(false);
    return false;
  }
  try {
    const response = await fetch(`${target}/api/health`, { signal: AbortSignal.timeout(8000) });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.error || "Server unavailable");
    const message = data.configured
      ? `Connected · ${data.knowledgeFiles.length} source file(s)`
      : "Connected, but GEMINI_API_KEY is missing";
    setConnectionStatus(data.configured, data.configured ? "Server connected" : "Key missing");
    elements.result.textContent = message;
    return data.configured;
  } catch (error) {
    setConnectionStatus(false, "Server offline");
    elements.result.textContent = `Could not connect: ${error.message}`;
    return false;
  }
}

async function sendMessage(message) {
  if (!apiBaseUrl) {
    elements.apiUrl.value = "";
    elements.dialog.showModal();
    elements.result.textContent = "Connect your Codespace server before chatting.";
    return;
  }

  addMessage("user", message);
  elements.suggestions.hidden = true;
  elements.input.value = "";
  elements.input.style.height = "auto";
  elements.send.disabled = true;
  const typing = addTypingIndicator();

  try {
    const response = await fetch(`${apiBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "The request failed.");
    typing.remove();
    addMessage("model", data.answer, data.sources);
    history.push({ role: "user", text: message }, { role: "model", text: data.answer });
    if (history.length > 16) history.splice(0, history.length - 16);
  } catch (error) {
    typing.remove();
    addMessage("model", `I couldn’t reach the course server. ${error.message}`);
    setConnectionStatus(false, "Check server");
  } finally {
    elements.send.disabled = false;
    elements.input.focus();
  }
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = elements.input.value.trim();
  if (message) sendMessage(message);
});

elements.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    elements.form.requestSubmit();
  }
});

elements.input.addEventListener("input", () => {
  elements.input.style.height = "auto";
  elements.input.style.height = `${Math.min(elements.input.scrollHeight, 140)}px`;
});

elements.suggestions.addEventListener("click", (event) => {
  if (event.target.matches("button")) sendMessage(event.target.textContent);
});

elements.settingsButton.addEventListener("click", () => {
  elements.apiUrl.value = apiBaseUrl;
  elements.result.textContent = "";
  elements.dialog.showModal();
});

elements.testButton.addEventListener("click", () => checkConnection(elements.apiUrl.value));

elements.settingsForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  apiBaseUrl = cleanUrl(elements.apiUrl.value);
  localStorage.setItem("course-companion-api", apiBaseUrl);
  checkConnection();
  elements.dialog.close();
});

checkConnection();
