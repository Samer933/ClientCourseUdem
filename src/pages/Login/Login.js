
import Login from "../../features/authentication/services/login";
import styled from "styled-components";

const LoginPage = () => {
    return (
        <Container>
            <Login/>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  width: 40rem;
  padding: 4.8rem 2.4rem;
  margin-right: auto;
  margin-left: auto;
`


export default LoginPage;
