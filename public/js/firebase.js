import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
export const firebaseConfig = {
  apiKey: "AIzaSyA4SNifUSs8OERXrzhTmHkWz1dYr1GOTso",
  authDomain: "campusconnect-18208.firebaseapp.com",
  projectId: "campusconnect-18208",
  storageBucket: "campusconnect-18208.firebasestorage.app",
  messagingSenderId: "385519155292",
  appId: "1:385519155292:web:ee3c9af74ea6a9bd7d0e99",
  measurementId: "G-70RHB58WLJ"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ THESE EXPORTS WERE MISSING OR WRONG
export const auth = getAuth(app);
export const db = getFirestore(app);