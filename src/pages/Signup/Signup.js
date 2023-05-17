import Signup from "../../features/authentication/services/signup";
import styled from "styled-components";
import FooterlogSign from "../../layouts/FooterlogSign";

const SignupPage = () => {
    return (
        <Container>
            <Signup />
            <FooterlogSign></FooterlogSign>
        </Container>
    );
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

export default SignupPage;