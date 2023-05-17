import React, {useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";



const RestPassword = () => {

    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 5) {
            setError('Password must be at least 5 characters long');
            return;
        }

        try {
            const response = await axios.post('/auths/changeNewPassword', { email, password }, { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                console.log('Password reset successfully');
                window.location.href = '/login';

            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);

    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Submit</Button>
        </Form>
    );
};



const Form = styled.form`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  
  border-radius: 5px;
  font-size: 1rem;
  border-color: #333333;

  @media screen and (min-width: 768px) {
    width: 80%;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #fff;
  background-color: #0077cc;
  cursor: pointer;

  &:hover {
    background-color: #005ea8;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 10px;
`;

export default RestPassword;