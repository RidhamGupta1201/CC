import { rawListeners } from "node:cluster";
import { getRawAsset } from "node:sea";
import { getCACertificates } from "node:tls";

/* ---------- DOM ELEMENTS ---------- */
const matchesGrid = document.getElementById("matchesGrid");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

/* ---------- FETCH FROM BACKEND ---------- */
async function fetchPeerMatches(query = "") {
  try {
    const res = await fetch("http://localhost:5000/api/match-peers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    return await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch peer matches:", error);
    return [];
  }
}

/* ---------- RENDER MATCH CARDS ---------- */
function renderMatches(matches) {
  matchesGrid.innerHTML = "";

  if (!Array.isArray(matches) || matches.length === 0) {
    matchesGrid.innerHTML = `<p>No matching peers found.</p>`;
    return;
  }

  matches.forEach(user => {
    const card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.reason || "Good match based on skills and interests."}</p>
      <button class="connect-btn">Connect</button>
    `;

    matchesGrid.appendChild(card);
  });
}

/* ---------- INITIAL LOAD ---------- */
(async function initialLoad() {
  const response = await fetchPeerMatches();

  // Backend ALWAYS returns array for matches
  if (Array.isArray(response)) {
    renderMatches(response);
  }
})();

/* ---------- CHAT HANDLER ---------- */
sendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  // Show user message
  chatMessages.innerHTML += `
    <p><strong>You:</strong> ${message}</p>
  `;

  chatInput.value = "";

  const response = await fetchPeerMatches(message);

  // If backend returns matches
  if (Array.isArray(response)) {
    renderMatches(response);

    chatMessages.innerHTML += `
      <p><strong>Gemini:</strong>
        Here are some peers that match your request.
      </p>
    `;
  } else {
    // Safety fallback (should not normally happen)
    chatMessages.innerHTML += `
      <p><strong>Gemini:</strong>
        I couldn’t find suitable peers right now.
      </p>
    `;
  }

  // Auto-scroll chat
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
