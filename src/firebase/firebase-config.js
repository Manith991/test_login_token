// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvn_2uo-h_ClkON8_m5TKn1tlkp4rzM1s",
  authDomain: "my-project-782b7.firebaseapp.com",
  projectId: "my-project-782b7",
  storageBucket: "my-project-782b7.firebasestorage.app",
  messagingSenderId: "232061792369",
  appId: "1:232061792369:web:002e6be5382e4012896bd0",
  measurementId: "G-S92YJEW798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services you need
export const auth = getAuth(app);
