import { initializeApp } from 'firebase/app';
import {    getAuth, 
            signInWithRedirect,
            signInWithPopup,
            GoogleAuthProvider, 
            createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
        } from 'firebase/auth';
import { 
   getFirestore,
   doc,
   getDoc,
   setDoc, 
 } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCa32JZP5efwkZADOLs1TbV_4zMeI3whiE",
    authDomain: "crwn-clothing-db-blopez.firebaseapp.com",
    projectId: "crwn-clothing-db-blopez",
    storageBucket: "crwn-clothing-db-blopez.appspot.com",
    messagingSenderId: "637247333329",
    appId: "1:637247333329:web:7f5d87c9f4bf89396ff6f0"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, googleProvider );
export const signInWithGoogleRedirect = () => signInWithRedirect( auth, googleProvider );
  
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    const userDocRef = doc( db, 'users', userAuth.uid );

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt, 
                ...additionalInformation, 
            });
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async(email, password ) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword( auth, email, password );
};

export const signInAuthUserWithEmailAndPassword = async(email, password ) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword( auth, email, password );
};
