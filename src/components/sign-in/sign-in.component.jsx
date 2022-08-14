import { useContext, useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../firebase/firebase";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import './sign-in.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    alert("Ops! Wrong password")
                    break;
                case 'auth/user-not-found':
                    alert('Email not matched')
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return (
        <div className="sign-in-container">
            <h2>I Already Have an Account</h2>
            <span>Sign In with your email</span>
            <form onSubmit={ handleSubmit }>

                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={ email } />

                <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={ password } />

            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={ signInWithGoogle }>Google Sign In</Button>
            </div>
            </form>
        </div>
    )
}

export default SignInForm;