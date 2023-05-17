import SignupForm from "../components/SignupForm";
import useSignup from "../hooks/useSignup";
import styled from "styled-components";
import {Link} from "react-router-dom";


const Signup = () => {
    const { signup, error, isLoading } = useSignup();

    if (isLoading) return <p>Loading register...</p>;

    if (error) return <p>Error register account</p>;

    return (
        <SignupContainer>
            <h4>Sign up to start learning</h4>
            <br/>
            <SignupForm onSubmit={signup} />
            <br/>
            <span style={{color:"black"}}>Already have an account? </span>
            <StyledLink to={"/login"}><b>Log in</b></StyledLink>
        </SignupContainer>
    );
}


const SignupContainer = styled.div`
  background-color: lightblue;
  padding: 3rem;
  border-style: outset;
  color: #0f3a6a;
`

const StyledLink  = styled(Link)`
  transition: all 0.3s ease;
  color: #0f3a6a;
  text-decoration: none;


  &:hover {
    color:  white;
  }
`;



export default Signup;