const elements = {
  form: document.querySelector("#chatForm"),
  input: document.querySelector("#messageInput"),
  send: document.querySelector("#sendButton"),
  messages: document.querySelector("#messages"),
  suggestions: document.querySelector("#suggestions"),
  statusDot: document.querySelector("#statusDot"),
  statusLabel: document.querySelector("#statusLabel")
};

const history = [];
const localApiUrl = ["localhost", "127.0.0.1"].includes(window.location.hostname) ? window.location.origin : "";
const apiBaseUrl = cleanUrl(window.APP_CONFIG?.apiBaseUrl || localApiUrl);
const connectionRetryDelays = [0, 8_000, 15_000, 20_000, 25_000];

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

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function checkConnection() {
  if (!apiBaseUrl) {
    setConnectionStatus(false, "Server not configured");
    return false;
  }

  for (let attempt = 0; attempt < connectionRetryDelays.length; attempt += 1) {
    if (connectionRetryDelays[attempt]) await wait(connectionRetryDelays[attempt]);
    try {
      const response = await fetch(`${apiBaseUrl}/api/health`, { signal: AbortSignal.timeout(10_000) });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || "Server unavailable");
      setConnectionStatus(data.configured, data.configured ? "Server connected" : "Key missing");
      return data.configured;
    } catch (error) {
      const hasMoreAttempts = attempt < connectionRetryDelays.length - 1;
      setConnectionStatus(false, hasMoreAttempts ? "Server waking up…" : "Server offline");
    }
  }

  return false;
}

async function sendMessage(message) {
  if (!apiBaseUrl) {
    addMessage("model", "This copy of Course Companion has not been connected to an instructor server yet.");
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

checkConnection();
