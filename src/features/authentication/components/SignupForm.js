import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import useForm from "../../../hooks/useForm";
import { useState } from "react";

const SignupForm = ({ onSubmit }) => {
    const { values, handleChange, handleSubmit, resetForm } = useForm({
        email: '',
        username: '',
        password: '',
    });

    const [isValid, setIsValid] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const validateForm = (event) => {
        event.preventDefault();

        const emailRegex = /^\S+@\S+\.\S+$/;
        const isValidEmail = emailRegex.test(values.email);
        const isValidUsername = values.username.length >= 3;
        const isValidPassword = values.password.length >= 5;

        if (isValidEmail && isValidUsername && isValidPassword) {
            setIsValid(true);
            setEmailErrorMessage('');
            setUsernameErrorMessage('');
            setPasswordErrorMessage('');
            handleSubmit(event, onSubmit);
        } else {
            setIsValid(false);
            if (!isValidEmail) {
                setEmailErrorMessage('Please input a valid email');
            } else {
                setEmailErrorMessage('');
            }
            if (!isValidUsername) {
                setUsernameErrorMessage('It should at least 3 characters');
            } else {
                setUsernameErrorMessage('');
            }
            if (!isValidPassword) {
                setPasswordErrorMessage('It should at least 5 characters');
            } else {
                setPasswordErrorMessage('');
            }
        }
    };
    return (
        <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
            <div>
                <FormInput
                    label="Email"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                />
                {emailErrorMessage && <p>{emailErrorMessage}</p>}
            </div>
            <div>
                <FormInput
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    required
                />
                {usernameErrorMessage && <p>{usernameErrorMessage}</p>}
            </div>
            <div>
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    required
                />
                {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
            </div>
            <br />
            <Button type="submit" onClick={validateForm} disabled={!isValid}>
                Register
            </Button>
            <Button type="button" onClick={resetForm}>
                Reset
            </Button>
        </form>
    );
};

export default SignupForm;
