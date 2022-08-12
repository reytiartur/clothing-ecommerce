import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../firebase/firebase'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign-In Page</h1>
            <button onClick={ logGoogleUser }>Sign In with Google</button>
        </div>
    )
}

export default SignIn;