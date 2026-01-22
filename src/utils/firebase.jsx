// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjw4kCkcoEMSeh3aSloTZWE3UUPEW6oPQ",
  authDomain: "netflixgpt7863.firebaseapp.com",
  projectId: "netflixgpt7863",
  storageBucket: "netflixgpt7863.firebasestorage.app",
  messagingSenderId: "742949460560",
  appId: "1:742949460560:web:e7f82731416aadb9ff4f55",
  measurementId: "G-ZWBB6H23E9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
