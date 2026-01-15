import { auth, db } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const provider = new GoogleAuthProvider();
  const googleBtn = document.getElementById("googleLogin");

  if (!googleBtn) return;

  googleBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Google Sign‑In
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2️⃣ Firestore reference
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // 3️⃣ First‑time user
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          photoURL: user.photoURL || "",
          college: "",
          age: null,
          strengths: [],
          weaknesses: [],
          hobbies: [],
          profileCompleted: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        window.location.href = "dashboard.html";
        return;
      }

      // 4️⃣ Existing user
      const data = userSnap.data();

      if (data.profileCompleted) {
        window.location.href = "features.html";
      } else {
        window.location.href = "dashboard.html";
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("Google login failed. Please try again.");
    }
  });
});
