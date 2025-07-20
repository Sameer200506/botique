import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Replace with your actual config
 const firebaseConfig = {
    apiKey: "AIzaSyArzXD7hnmKfD5Gk-5cxwMPZzFm0ACVGSc",
    authDomain: "botique-784b6.firebaseapp.com",
    projectId: "botique-784b6",
    storageBucket: "botique-784b6.firebasestorage.app",
    messagingSenderId: "974755384730",
    appId: "1:974755384730:web:f1c5768383a22135367e23",
    measurementId: "G-CHLGQRW51Q"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;