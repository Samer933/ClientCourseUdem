import LoginForm from "../components/LoginForm";
import useLogin from "../hooks/useLogin";
import {Link, Navigate, Route} from "react-router-dom";
import styled from "styled-components";
import FooterlogSign from "../../../layouts/FooterlogSign";


const Login = () => {
    const {data, login, error, isLoading} = useLogin();

    if (isLoading) return <p>Loading login</p>

    if (error) return <p>Error login account</p>

    if (data) {
        return <Navigate to={"/courses"}/>
    }

    return (

        <>
            <LoginContainer>
                <h4>Login</h4>
                <LoginForm onSubmit={login}/>
                <br/>
                <span style={{color: "black"}}>or </span>

                <StyledLink to="/forgot-password"><b>Forget password</b></StyledLink>
                <br/>
                <br/>
                <span style={{color: "black"}}>Dont have an account? </span>
                <StyledLink to={"/register"}><b>Sign up</b></StyledLink>

            </LoginContainer>
            <FooterlogSign></FooterlogSign>
        </>

    )
}

const LoginContainer = styled.div`
  background-color: lightblue;
  padding: 3rem;
  border-style: outset;
  color: #0f3a6a;
`

const StyledLink = styled(Link)`
  transition: all 0.3s ease;
  color: #0f3a6a;
  text-decoration: none;


  &:hover {
    color: white;
  }
`;


export default Login;