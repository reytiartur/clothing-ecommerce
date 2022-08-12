import { signInWithGooglePopup } from '../../firebase/firebase'

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();

    }

    return (
        <div>
            <h1>Sign-In Page</h1>
            <button onClick={ logGoogleUser }>Sign In with Google</button>
        </div>
    )
}

export default SignIn;