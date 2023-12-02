import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  // retrive documents form inside our firestore database
  getDoc,
  setDoc,
  updateDoc,
  // allows us to get and set documnets data
} from "firebase/firestore";
// allows us to get firestore database into our web app
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
//auth keeps track of all authentication states of all methods
export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

//the entire code snippet below stores our user info to the db
//now setting up our database by creating its instance
export const db = getFirestore();
//now passing data from userAuth to our db
export const createUserDocumentFromUserAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const createUserRef = doc(db, "users", userAuth.uid);
  //passing db,name of collection and an unique id to our doc function

  const userSnapshot = await getDoc(createUserRef);

  //setting user info to db

  //condition 1 if user data not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(createUserRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error.message, "error while creating new user");
    }
  }

  //if user data exists
  return createUserRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const getData = async (uid) => {
  const db = getFirestore(app);
  const docRef = doc(db, "users", uid);
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return data;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

export const createNewPassword = (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword)
    .then(() => {
      alert("password updated");
    })
    .catch((error) => {
      console.log(error.code, "error");
    });
};

export const handleUID = () => {
  const author = getAuth();
  try {
    localStorage.setItem("uid", author.currentUser.uid);
  } catch (error) {
    console.log(error, "error");
  }
};

export const createFirbaseNote = async (note) => {
  const userUID = localStorage.getItem("uid");

  const docRef = doc(db, "users", userUID);

  // // Fetch existing data
  // const docSnapshot = await getDoc(docRef);
  // if (docSnapshot.exists()) {
  //   const existingData = docSnapshot.data();

  //   // Update the 'note' field
  //   if ("note" in existingData) {
  //     const updatedData = {
  //       ...existingData,
  //       note: [...existingData.note, ...note], // Append new notes to the existing ones
  //     };
  //     updateDoc(docRef, updatedData)
  //       .then((docRef) => {
  //         console.log(
  //           "A New Document Field has been added to an existing document"
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     console.log("the note array is not formed");
  //     const userNote = {
  //       note,
  //     };
  //     updateDoc(docRef, userNote)
  //       .then((docRef) => {
  //         console.log(
  //           "A New Document Field has been added to an existing document"
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
  const userNote = {
    note,
  };
  updateDoc(docRef, userNote)
    .then((docRef) => {
      console.log(
        "A New Document Field has been added to an existing document"
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchFirebaseNote = async () => {
  const userUID = localStorage.getItem("uid");
  const db = getFirestore(app);
  const docRef = doc(db, "users", userUID);
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      // console.log(data, "data from a func");
      return data;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};
