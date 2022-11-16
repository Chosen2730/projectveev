import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBnyzuYDWrCImvRuFbqnRkQhACFDznLHGU",
  authDomain: "projectveev.firebaseapp.com",
  projectId: "projectveev",
  storageBucket: "projectveev.appspot.com",
  messagingSenderId: "104976723155",
  appId: "1:104976723155:web:cb3c35dd2b8ba0f2ea3826",
  measurementId: "G-9EW3N3E91S",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
