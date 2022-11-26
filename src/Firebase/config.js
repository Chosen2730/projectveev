import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyBnyzuYDWrCImvRuFbqnRkQhACFDznLHGU",
//   authDomain: "projectveev.firebaseapp.com",
//   projectId: "projectveev",
//   storageBucket: "projectveev.appspot.com",
//   messagingSenderId: "104976723155",
//   appId: "1:104976723155:web:cb3c35dd2b8ba0f2ea3826",
//   measurementId: "G-9EW3N3E91S",
// };

// cent
const firebaseConfig = {
  apiKey: "AIzaSyCE81Yx-Fo_TVDZCLZdm2K4JVXkvSTXUNQ",
  authDomain: "veev-clothiers.firebaseapp.com",
  projectId: "veev-clothiers",
  storageBucket: "veev-clothiers.appspot.com",
  messagingSenderId: "969420240988",
  appId: "1:969420240988:web:a517266af136c9dad78e99",
  measurementId: "G-F65R1371SN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { app, auth, db };
