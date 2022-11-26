import { useState } from 'react';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('email not found');
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                default:
                    console.log('user sign in encountered an error', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <form onSubmit={handleSubmit}>
                <h2>Already have an account?</h2>
                <span>Sign in with your email and password</span>
                <FormInput label='Email' type='text' name='email' value={email} onChange={handleChange} required />
                <FormInput label='Password' type='text' name='password' value={password} onChange={handleChange} required />
                <ButtonsContainer>
                    <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.inverted}>
                        Sign In
                    </Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle}>
                        Google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
