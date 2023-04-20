import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMi1T8MjIISESSAWLB3cq3cKqhNTSFHMg",
  authDomain: "my-social-app-598bb.firebaseapp.com",
  projectId: "my-social-app-598bb",
  storageBucket: "my-social-app-598bb.appspot.com",
  messagingSenderId: "110046014890",
  appId: "1:110046014890:web:b808c321b2a48fa19e4fd3",
  measurementId: "G-6KWF82P3E3",
};

// const firebaseConfig = {
//   apiKey: "API_KEY",
//   authDomain: "DOMAIN",
//   databaseURL: "URL",
//   projectId: "PROJECT_ID",
//   storageBucket: "STORAGE",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID",
// };
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
