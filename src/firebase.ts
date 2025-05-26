import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase Configuration (Replace with your actual keys)
const firebaseConfig = {
  apiKey: "AIzaSyAud2N4YoCuboR3fBZSlD-6aNB6ywuh5nc",
  authDomain: "research-dd29c.firebaseapp.com",
  projectId: "research-dd29c",
  storageBucket: "research-dd29c.firebasestorage.app",
  messagingSenderId: "187432095725",
  appId: "1:187432095725:web:c5ed550a5112ddd62ee1e4"
};

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Auth (No need for persistence in web apps)
const auth: Auth = getAuth(app);

// Initialize Firestore Database
const db: Firestore = getFirestore(app);

export { app, auth, db };