// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa522iX8-3OmhcF0csxkMAXPe-YcuPAFM",
  authDomain: "calai-40842.firebaseapp.com",
  projectId: "calai-40842",
  storageBucket: "calai-40842.appspot.com",
  messagingSenderId: "942346107166",
  appId: "1:942346107166:web:be2f5296f86bbab3f6b10f",
  measurementId: "G-NPRS6BRPB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth();
const firestore=getFirestore(app);
const createUserDocument =async (user,info)=>{
  if(!user) return ;
  const userRef=firestore.doc(`register_user/${user.uid}`);
  const snapshot =await userRef.get();

  if(!snapshot.exists){
    const {email}=user;
    const {username}=info;
    try{
      userRef.set({
        username,email,createdAt:new Date(),
      })
    }catch(err){
         console.log('Error in creating user',err);
    }
  }
}
export {app,auth,firestore,createUserDocument};

