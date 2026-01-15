import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export const firebaseConfig = {
    apiKey: "AIzaSyBcCyDsPdGuMJ1ARs32g8qnelJ1RmZaE-k",
    authDomain: "campus-connect1201.firebaseapp.com",
    projectId: "campus-connect1201",
    storageBucket: "campus-connect1201.firebasestorage.app",
    messagingSenderId: "252933891951",
    appId: "1:252933891951:web:d8c4f18cdd6bb1ca712a9a"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ THESE EXPORTS WERE MISSING OR WRONG
export const auth = getAuth(app);
export const db = getFirestore(app);