import React from 'react';
import {useParams} from "react-router-dom";
import UploadToS3Course from "../../../utils/UploadToS3Course";
import styled from "styled-components";

const CourseLandingPage = () => {
    const courseId = useParams()

    return (
        <CourseListContainer>
            <TitleDesign>Course landing page</TitleDesign>
            <UploadToS3Course courseId= {courseId}/>
        </CourseListContainer>
    );
};

export default CourseLandingPage;



const CourseListContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;
  
  div {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  @media (min-width: 576px) {
    /* Styles for screens that are at least 576px wide */
    max-width: 540px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 720px;
  }

  @media (min-width: 992px) {
    /* Styles for screens that are at least 992px wide */
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    /* Styles for screens that are at least 1200px wide */
    max-width: 1140px;
  }
  
`;


const TitleDesign = styled.h2`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`