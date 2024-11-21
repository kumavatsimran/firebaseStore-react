// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABT5fOFlPrcavXPAv0Z_KQ9xT1JaIxkZE",
  authDomain: "fir-store-779da.firebaseapp.com",
  projectId: "fir-store-779da",
  storageBucket: "fir-store-779da.firebasestorage.app",
  messagingSenderId: "648354275118",
  appId: "1:648354275118:web:be4da1776411b5b704a4bf"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);