import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("name").innerText = data.name || "-";
  document.getElementById("college").innerText = data.college || "-";
  document.getElementById("age").innerText = data.age || "-";

  renderTags("strengths", data.strengths);
  renderTags("hobbies", data.hobbies);
  renderTags("weaknesses", data.weaknesses);
});

function renderTags(id, items = []) {
  const box = document.getElementById(id);
  items.forEach(item => {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerText = item;
    box.appendChild(tag);
  });
}
