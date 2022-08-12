import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCgigu5XbW0Z1pbpzUorjvubrG3MGOrd9g",
    authDomain: "clothing-ecommerce-6bdfc.firebaseapp.com",
    projectId: "clothing-ecommerce-6bdfc",
    storageBucket: "clothing-ecommerce-6bdfc.appspot.com",
    messagingSenderId: "969668590587",
    appId: "1:969668590587:web:fa645cf37766e43c85295e"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const database = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(database, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
    } catch (error) {
      console.log("Error creating user:", error)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}