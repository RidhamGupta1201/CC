/* ===============================
   IMPORTS (BROWSER SAFE)
================================ */
import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ===============================
   DOM ELEMENTS
================================ */
const matchesGrid = document.getElementById("matchesGrid");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

/* ===============================
   STATE
================================ */
let currentUserProfile = null;
let otherUsers = [];

console.log("✅ peers.js loaded");

/* ===============================
   FIRESTORE HELPERS
================================ */
async function getCurrentUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

async function getOtherUsers(currentUid) {
  const snapshot = await getDocs(collection(db, "users"));
  const users = [];

  snapshot.forEach(docSnap => {
    if (docSnap.id !== currentUid) {
      const data = docSnap.data();
      users.push({
        uid: docSnap.id,
        name: data.name || "Unnamed",
        hobbies: data.hobbies || [],
        strengths: data.strengths || [],
        weaknesses: data.weaknesses || []
      });
    }
  });

  return users;
}

/* ===============================
   BACKEND (GEMINI) CALL
================================ */
async function fetchPeerMatches(userQuery = "") {
  try {
    const res = await fetch("http://localhost:5000/api/match-peers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentUser: currentUserProfile,
        otherUsers,
        userQuery
      })
    });

    return await res.json();
  } catch (err) {
    console.error("❌ Backend error:", err);
    return { message: "Backend not reachable" };
  }
}

/* ===============================
   UI RENDERING
================================ */
function renderMatches(matches) {
  matchesGrid.innerHTML = "";

  if (!Array.isArray(matches) || matches.length === 0) {
    matchesGrid.innerHTML = `<p>No matching peers found.</p>`;
    return;
  }

  matches.forEach(user => {
    matchesGrid.innerHTML += `
      <div class="match-card">
        <h3>${user.name}</h3>
        <p>${user.reason || "Good match based on skills and interests."}</p>
        <button class="connect-btn">Connect</button>
      </div>
    `;
  });
}

/* ===============================
   AUTH GUARD + INITIAL LOAD
================================ */
onAuthStateChanged(auth, async user => {
  console.log("🔥 AUTH STATE:", user);

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  console.log("✅ Logged in as:", user.uid);

  currentUserProfile = await getCurrentUserProfile(user.uid);
  console.log("📄 Current user profile:", currentUserProfile);

  otherUsers = await getOtherUsers(user.uid);
  console.log("👥 Other users:", otherUsers);

  const initialResponse = await fetchPeerMatches();

  if (Array.isArray(initialResponse)) {
    renderMatches(initialResponse);
  }
});

/* ===============================
   CHAT HANDLER (FINAL)
================================ */
sendBtn.addEventListener("click", async () => {
  const message = chatInput.value.trim();
  if (!message) return;

  chatMessages.innerHTML += `<p><b>You:</b> ${message}</p>`;
  chatInput.value = "";

  const response = await fetchPeerMatches(message);
  console.log("🤖 Gemini response:", response);

  /* TEXT RESPONSE (e.g. "Hi") */
  if (response.message) {
    matchesGrid.innerHTML = "";
    chatMessages.innerHTML += `<p><b>Gemini:</b> ${response.message}</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return;
  }

  /* PEER MATCHES */
  if (Array.isArray(response) && response.length > 0) {
    renderMatches(response);
    chatMessages.innerHTML +=
      `<p><b>Gemini:</b> Here are some peers you might like.</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return;
  }

  /* NO MATCHES */
  matchesGrid.innerHTML = `<p>No matching peers found.</p>`;
  chatMessages.innerHTML +=
    `<p><b>Gemini:</b> I couldn’t find a suitable peer.</p>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
