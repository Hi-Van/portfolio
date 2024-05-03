// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8mOLdj9XQlWBy-AHeuj1tHVbsKwj0LV0",
  authDomain: "personal-portfolio-van.firebaseapp.com",
  projectId: "personal-portfolio-van",
  storageBucket: "personal-portfolio-van.appspot.com",
  messagingSenderId: "622629624807",
  appId: "1:622629624807:web:8cc4cbb7fd8b684807fb42",
  measurementId: "G-Y39TPGJJQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);