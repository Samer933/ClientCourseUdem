import {Link} from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";
import React from "react";
import styled from "styled-components";
import logo from "../assets/logo2.gif"



const CollapsibleNavbar = () => {

    const {isAuthenticated, logout} = useAuthContext();
    const session = sessionStorage.getItem('session');

    const handleLogout = () => {
        logout();
    };
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand style={{fontFamily:"sans-serif"}}>
                        <img src={logo} width="100" height="auto" alt="logo" style={{borderRadius:"50%", border: "2px solid"}}/>
                    </Navbar.Brand>

                    <HomeCom>
                        <Link  to="/">Home</Link>
                        <Link to="/courses">Courses</Link>

                    </HomeCom>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>

                            <Home to="/">Home</Home>
                            <Courses to="/courses">Courses</Courses>
                            {session ? (    <Second>
                                        <Link to="/instructor">Instructor</Link>
                                        <Link to="/my-courses/learning/">My learning</Link>


                                    </Second>


                                )

                                :(<>

                                </>)}

                            {session ? (<>
                                <Instructor  to="/instructor">Instructor</Instructor>
                                <MyLearning to="/my-courses/learning/">My learning</MyLearning>


                                <Link to="/">
                                    <Buttons  onClick={handleLogout}>
                                        Logout
                                    </Buttons>
                                </Link>
                            </>) : (<>
                                <LoginStyle to="/login">Log in</LoginStyle>
                                <RegisterStyle to="/register">Sign up</RegisterStyle>
                            </>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
                {session ? (


                    <Link to="/">
                        <But  onClick={handleLogout}>
                            Logout
                        </But>
                    </Link> ) :(
                    <NavbarContainer >

                        <Link to="/login" >Login</Link>
                        <Link to="/register">Signup</Link>

                    </NavbarContainer>
                )}
            </Navbar>
        </header>
    );
}



const Instructor = styled(Link) `
  @media screen and (min-width: 992px){
    display: none;
  }

`
const MyLearning = styled(Link) `
  @media screen and (min-width: 992px){
    display: none;
  }

`
const Buttons = styled.button `
  background-color: #f8f9fa;
  color: #333333;
  font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  border: none;
  font-size: 16px;
  padding: 0;
  
  &:hover {
    color: #6161e5;
  }

  @media screen and (min-width: 992px) {
    display: none;
  }

`

const Second = styled.div `
  a{
    margin-left: 10px;
    font-size: 1.0rem;
    font-weight: 300;
    margin-right: 15px;
  }
  @media screen and (max-width: 992px){
    display: none;
  }
`

const But = styled.button`
  background-color: #f8f9fa;
  margin-left: 10px;
  font-size: 1.0rem;
  font-weight: 300;
  border: none;
  margin-right: 10px;
  
  &:hover {
    color: #6161e5; 
  }
  @media screen and (max-width: 992px) {
    display: none ;
  }
`


const Home = styled(Link)`
  @media screen and (min-width: 992px){
    display: none ;
  }
`;

const Courses = styled(Link)`
  @media screen and (min-width: 992px){
    display: none ;
  }
`;


const HomeCom= styled.div`
  a{
    margin-left: 10px;
    font-size: 1.0rem;
    font-weight: 300;
    margin-right: 15px;
  }
@media screen and (max-width: 992px){
  display: none;
}
`


const NavbarContainer = styled.div`
  a{
    margin-left: 10px;
    font-size: 1.0rem;
    font-weight: 300;
    margin-right: 15px;
  }
@media screen and (max-width: 992px){
  display: none;
}
`;



const LoginStyle = styled(Link)`
  @media screen and (min-width: 992px){
    display: none ;
  }
`;

const RegisterStyle = styled(Link)`
  @media screen and (min-width: 992px){
display: none;
  }
  
`;


export default CollapsibleNavbar;