import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForNow",
  authDomain: "quiniela-2026.firebaseapp.com",
  projectId: "quiniela-2026",
  storageBucket: "quiniela-2026.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:dummy"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };