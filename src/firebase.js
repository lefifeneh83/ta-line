// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTR1psf3Gtrrn9-PdWIUI--xgCL2Nwa6I",
  authDomain: "ta-line.firebaseapp.com",
  projectId: "ta-line",
  storageBucket: "ta-line.firebasestorage.app",
  messagingSenderId: "853675904478",
  appId: "1:853675904478:web:cec17cb3f903b3db4a214f",
  measurementId: "G-B067XD6M0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
