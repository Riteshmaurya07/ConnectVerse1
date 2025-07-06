// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVhkaqU5GNQnvL16wy0tdu6tVl_YoXsD0",
  authDomain: "connectverse-d7e89.firebaseapp.com",
  projectId: "connectverse-d7e89",
  storageBucket: "connectverse-d7e89.firebasestorage.app",
  messagingSenderId: "558918735773",
  appId: "1:558918735773:web:4b145852309580cf964174",
  measurementId: "G-BJM55B0X92"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);