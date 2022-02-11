import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Get a Firestore instance
const firebaseConfig = {
  apiKey: "AIzaSyBK5tCwQ2zHON4aNKzOQgIWtBxxl8CJs_8",
  authDomain: "textil-admin.firebaseapp.com",
  projectId: "textil-admin",
  storageBucket: "textil-admin.appspot.com",
  messagingSenderId: "358478691674",
  appId: "1:358478691674:web:7020e67d4c1e806edf0763",
  measurementId: "G-5FB8C1ZMC3",
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
