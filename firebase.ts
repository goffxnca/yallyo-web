// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-k-Twbrsc-zqUi6Y6J5PTqieAvIIrq78",
  authDomain: "testchat-dev-5d85b.firebaseapp.com",
  projectId: "testchat-dev-5d85b",
  storageBucket: "testchat-dev-5d85b.appspot.com",
  messagingSenderId: "539934637323",
  appId: "1:539934637323:web:d3b4ec3b2fbe32d2f1760e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
