import { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../firebase/firebase";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);
    

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert("Cannot create user. Email already in use!")
            } else {
                console.error(error)
            }
        }

    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return (
        <div className="sign-up-container">
            <h2>Don't Have an Account?</h2>
            <span>Sign Up with your email</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label="Display Name" type="text" required name="displayName" onChange={ handleChange } value={ displayName } />

                <FormInput label="Email" type="email" required name="email" onChange={ handleChange } value={ email } />

                <FormInput label="Password" type="password" required name="password" onChange={ handleChange } value={ password } />

                <FormInput label="Confirm Password" type="password" required name="confirmPassword" onChange={ handleChange } value={ confirmPassword } />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;