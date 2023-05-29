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
            const response = await axios.post('https://mernstacktestserver.onrender.com/auths/changeNewPassword', { email, password }, { headers: { 'Content-Type': 'application/json' } });

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
        <Container>
            <RestPasswordContainer>
                <Form onSubmit={handleSubmit}>
                    <h4>Enter new password</h4>
                    <Input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button type="submit">Submit</Button>
                </Form>
            </RestPasswordContainer>
        </Container>
    );
};


const RestPasswordContainer = styled.div`
  background-color: lightblue;
  padding: 3rem;
  border-style: outset;
  color: #0f3a6a;
`
const Container = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  width: 40rem;
  padding: 4.8rem 2.4rem;
  margin-right: auto;
  margin-left: auto;
`
const Form = styled.form`

 
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