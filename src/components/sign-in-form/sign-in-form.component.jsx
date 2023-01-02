import { useState } from "react";
import {    signInAuthUserWithEmailAndPassword, 
            createUserDocumentFromAuth, 
            signInWithGooglePopup, 
        } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();

        } catch (error) {
            switch(error.code){
                case "auth/wrong-password":
                    alert("Wrong password used!");
                    break;
                case "auth/user-not-found":
                    alert("User not found, please sign up!");
                    break;
                default:
                    alert(error.code);
                    console.log("user sign in encountered an error", error);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const signInWithGoogle = async() => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth( user );
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign In with Email/ Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required  onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;