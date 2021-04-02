import firebaseClient from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebaseClient.apps.length && typeof window !== "undefined") {
  firebaseClient.initializeApp({
    apiKey: "AIzaSyBuOY1o6DQHTjyNZlgaWofPeOdHDo9GN-4",
    authDomain: "coding-test-27801.firebaseapp.com",
    projectId: "coding-test-27801",
    storageBucket: "coding-test-27801.appspot.com",
    messagingSenderId: "513364393681",
    appId: "1:513364393681:web:25ce3cbd41e1e866d68ff0",
    measurementId: "G-NT04J5D5M6",
  });
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export default firebaseClient;
