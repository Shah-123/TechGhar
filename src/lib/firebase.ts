import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-irMF0lX7e_b8NF-95pccyXsMJ-AZA2Y",
  authDomain: "techghar-f24f8.firebaseapp.com",
  projectId: "techghar-f24f8",
  storageBucket: "techghar-f24f8.firebasestorage.app",
  messagingSenderId: "830017520525",
  appId: "1:830017520525:web:b20c8c8aeaa3910b2973c4",
  measurementId: "G-59H8C6RQH1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Google Provider with custom parameters
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});