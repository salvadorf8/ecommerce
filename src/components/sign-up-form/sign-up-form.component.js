import { useState, useContext } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button from '../button/button.component';
import { UserContext } from '../../context/user.context';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });

            setCurrentUser(user);
            resetFormFields();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('email exist already');
            } else {
                console.log('user creation encountered an error', e);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' name='displayName' value={displayName} onChange={handleChange} />
                <FormInput label='Email' type='email' name='email' value={email} onChange={handleChange} required />
                <FormInput label='Password' type='password' name='password' value={password} onChange={handleChange} required />
                <FormInput label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} onChange={handleChange} required />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
