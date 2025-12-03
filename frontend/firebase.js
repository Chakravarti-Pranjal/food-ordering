// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lovingo-92279.firebaseapp.com",
  projectId: "lovingo-92279",
  storageBucket: "lovingo-92279.firebasestorage.app",
  messagingSenderId: "487955223124",
  appId: "1:487955223124:web:a934f6c3c6ec0545c553c1",
  measurementId: "G-9QEF0RWZNV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
