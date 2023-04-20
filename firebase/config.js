import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAMi1T8MjIISESSAWLB3cq3cKqhNTSFHMg",
  authDomain: "my-social-app-598bb.firebaseapp.com",
  projectId: "my-social-app-598bb",
  storageBucket: "my-social-app-598bb.appspot.com",
  messagingSenderId: "110046014890",
  appId: "1:110046014890:web:b808c321b2a48fa19e4fd3",
  measurementId: "G-6KWF82P3E3",
};

// };
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
