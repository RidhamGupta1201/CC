import { auth, db } from "./firebase.js";
import {
  doc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let strengths = [];
let hobbies = [];
let weaknesses = [];

// ADD CHIP
window.addTag = function (type) {
  let input, list, arr;

  if (type === "strength") {
    input = document.getElementById("strengthInput");
    list = document.getElementById("strengthList");
    arr = strengths;
  }

  if (type === "hobby") {
    input = document.getElementById("hobbyInput");
    list = document.getElementById("hobbyList");
    arr = hobbies;
  }

  if (type === "weakness") {
    input = document.getElementById("weaknessInput");
    list = document.getElementById("weaknessList");
    arr = weaknesses;
  }

  const value = input.value.trim();
  if (!value || arr.includes(value)) return;

  arr.push(value);

  const chip = document.createElement("div");
  chip.className = "tag";
  chip.innerText = value;

  chip.onclick = () => {
    arr.splice(arr.indexOf(value), 1);
    chip.remove();
  };

  list.appendChild(chip);
  input.value = "";
};

// SAVE PROFILE
document.getElementById("saveProfile").addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Not logged in");
    return;
  }

  try {
    await updateDoc(doc(db, "users", user.uid), {
      name: document.getElementById("nameInput").value,
      college: document.getElementById("collegeInput").value,
      age: Number(document.getElementById("ageInput").value),
      strengths,
      hobbies,
      weaknesses,
      profileCompleted: true,
      updatedAt: serverTimestamp()
    });

    window.location.href = "features.html";
  } catch (err) {
    alert("Error saving profile");
    console.error(err);
  }
});
