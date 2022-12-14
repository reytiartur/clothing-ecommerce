import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../firebase/firebase';
import SignUpForm from '../../components/sign-up/sign-up.component'

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign-In Page</h1>
            <button onClick={ logGoogleUser }>Sign In with Google</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;