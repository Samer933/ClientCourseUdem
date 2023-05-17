import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import styled from "styled-components";

const Footer = () => {
    return (
        <FooterContainer>
            <Course>
                <p className="mb-md-0">© 2023 CourseUdem</p>
            </Course>
            <Ico>
                <a href="https://www.facebook.com" >
                    <FaFacebookF />
                </a>
                <a href="https://www.instagram.com" >
                    <FaInstagram />
                </a>
                <a href="https://www.twitter.com">
                    <FaTwitter />
                </a>
            </Ico>
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: #f8f9fa;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
 top: 100%;
  
  
  
`;

const Ico = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-right: 50%; 
  margin-left: 30px;
`;

const Course = styled.div`
    
  
`;
