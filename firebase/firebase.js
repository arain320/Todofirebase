import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA27GlWYC2W47xLxm4jG-nlRJLYpqugLVA",
  authDomain: "todoproject-d5067.firebaseapp.com",
  projectId: "todoproject-d5067",
  storageBucket: "todoproject-d5067.appspot.com",
  messagingSenderId: "968486775570",
  appId: "1:968486775570:web:6cec6ceb9c4c669c5461cb",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
