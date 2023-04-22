import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID,
// } from '@env';

const firebaseConfig = {
  // apiKey: API_KEY,
  // authDomain: AUTH_DOMAIN,
  // projectId: PROJECT_ID,
  // storageBucket: STORAGE_BUCKET,
  // messagingSenderId: MESSAGING_SENDER_ID,
  // appId: APP_ID,
  // measurementId: MEASUREMENT_ID,
  apiKey: 'AIzaSyAMi1T8MjIISESSAWLB3cq3cKqhNTSFHMg',
  authDomain: 'my-social-app-598bb.firebaseapp.com',
  projectId: 'my-social-app-598bb',
  storageBucket: 'my-social-app-598bb.appspot.com',
  messagingSenderId: '110046014890',
  appId: '1:110046014890:web:b808c321b2a48fa19e4fd3',
  measurementId: 'G-6KWF82P3E3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
