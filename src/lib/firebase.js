import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnGaOt0EJ5Kkqetoik6G3XnFAKkbXZ650",
  authDomain: "logit-ojt.firebaseapp.com",
  projectId: "logit-ojt",
  storageBucket: "logit-ojt.firebasestorage.app",
  messagingSenderId: "438303389511",
  appId: "1:438303389511:web:91b6ce53f33d85a1bebe62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
