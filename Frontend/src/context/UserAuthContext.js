import React, { createContext, useState, useEffect, useContext } from "react";
import { auth,firestore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut , // Rename imported signOut function
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

// Create a context for user authentication
const UserAuthContext = createContext();

// Custom provider component to manage user authentication state
export const UserAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Current authenticated user
   // Loading state while checking auth status

  // Sign up function
  const signUp =  (email, password,username) => {
    createUserWithEmailAndPassword(auth,email,password)
    .then(async (result)=>{
      console.log(result.user);
      await addDoc(collection(firestore,"register_user"),{username,email})
      .then((re)=>{
        alert("Account Created successfully");
      })
       .catch((e)=>{
        console.log(e.message);
       });
    })
  };
  // Sign in function
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out function
  const logOut = async () => {
      return signOut(auth);
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  // Provide the context value to the children components
  const contextValue = {
    currentUser,
    signUp,
    signIn,
    logOut,
  };

  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(UserAuthContext);
}
