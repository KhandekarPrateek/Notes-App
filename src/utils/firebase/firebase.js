import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB18qlucI4IBVsjPVDcHsCZ1nwLh6ORmMg",
  authDomain: "todo-d6bf0.firebaseapp.com",
  projectId: "todo-d6bf0",
  storageBucket: "todo-d6bf0.appspot.com",
  messagingSenderId: "180661067573",
  appId: "1:180661067573:web:eb74aca2fac5030e7d367c",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);
