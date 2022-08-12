import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

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