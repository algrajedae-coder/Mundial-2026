import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNKBf_-dcgiqMYHxfRqKDo4mX-Q6PcWDo",
  authDomain: "quiniela2026-51e1e.firebaseapp.com",
  projectId: "quiniela2026-51e1e",
  storageBucket: "quiniela2026-51e1e.firebasestorage.app",
  messagingSenderId: "99987296667",
  appId: "1:99987296667:web:8c52d6b41c1546236c513e"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
