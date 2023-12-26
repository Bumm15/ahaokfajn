import { initializeApp } from 'firebase/app';
//import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjVgb_FFXPu4i2HPpVm3r8yA9R1XVq7EQ",
    authDomain: "cm-kuraz-production.firebaseapp.com",
    databaseURL: "https://cm-kuraz-production-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cm-kuraz-production",
    storageBucket: "cm-kuraz-production.appspot.com",
    messagingSenderId: "121521606553",
    appId: "1:121521606553:web:1b632dee2d9e9f4f1b4d08",
    measurementId: "G-SDEKYES794"
  };

const app = initializeApp(firebaseConfig);
//export const db = getDatabase(app);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

//connectFirestoreEmulator(db, 'localhost', 8080);
