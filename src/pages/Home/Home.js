import React from 'react';
import styled from "styled-components";
import Slider from "../../layouts/Slider";
import FooterEnrolReviewCourseInstructor from "../../layouts/FooterEnrolReviewCourseInstructorHome";
import AdImage1 from "../../assets/JohnDoe.png";
import AdImage2 from "../../assets/JaneDoe.png";
import Search from "../../layouts/Search";

function Home() {
    return (
        <div>
            <Search />
            <Slider/>
            <CourseListContainer>
                <img src={AdImage1} alt="advertisment" style={{maxWidth:"100%", marginBottom:"30px"}}/>
                <img src={AdImage2} alt="advertisment" style={{maxWidth:"100%"}} />
            </CourseListContainer>
            <FooterEnrolReviewCourseInstructor/>
        </div>
    );
}


const CourseListContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;

  @media (min-width: 576px) {
    /* Styles for screens that are at least 576px wide */
    max-width: 540px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 100%;
  }

  @media (min-width: 992px) {
    /* Styles for screens that are at least 992px wide */
    max-width: 100%;
  }

  @media (min-width: 1200px) {
    /* Styles for screens that are at least 1200px wide */
    max-width: 100%;
  }
`;

export default Home ;