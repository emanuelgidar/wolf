import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBKJwX4Cj1bJTbk0RzPOurjIEXqxJOziS8",
    authDomain: "wolf-e97d9.firebaseapp.com",
    databaseURL: "https://wolf-e97d9.firebaseio.com",
    projectId: "wolf-e97d9",
    storageBucket: "wolf-e97d9.appspot.com",
    messagingSenderId: "347460031946",
    appId: "1:347460031946:web:20a3457659111696742b33"
  };

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
  