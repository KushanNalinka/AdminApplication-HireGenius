import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCB1JyEsT3-AX_lX_tRB5-C33KHshxF1Og",
  authDomain: "stage-01-e8960.firebaseapp.com",
  projectId: "stage-01-e8960",
  storageBucket: "stage-01-e8960.firebasestorage.app",
  messagingSenderId: "936150487475",
  appId: "1:936150487475:web:9b069ba09f2d86e0073bc6",
  measurementId: "G-SX2R1NFQY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };