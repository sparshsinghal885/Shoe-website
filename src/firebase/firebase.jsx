
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCEpfWxkQdikO1amTTOGpqhAAyGphujpyI",
  authDomain: "shoe-website-594c0.firebaseapp.com",
  projectId: "shoe-website-594c0",
  storageBucket: "shoe-website-594c0.appspot.com",
  messagingSenderId: "2496154307",
  appId: "1:2496154307:web:37a25ac467f464e31c7076"
};


export const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage}