import React from 'react';
import {Link, useParams} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import CreateLessonContent from "./CreateLessonContent";
import CourseLandingPage from "./CourseLandingPage";
import Button from "../../../components/ui/Button";
import styled from "styled-components";

const ManageCourse = () => {
    const {id} = useParams();

    const {data, error, isLoading} = useFetch(`/courses/${id}`)

    if (isLoading) return <p>Loading course detail...</p>

    if (error) return <p>Error fetching course detail</p>


    return (
        <CourseListContainer>
            <TitleDesign>Manage course: {data?.title.charAt(0).toUpperCase() + data?.title.slice(1)}</TitleDesign>
            <TitleDesignExtra>This is where you can choose between creating a curriculum and uploading thumbnail for your course</TitleDesignExtra>
            <div>
                <StyledLink to={`/instructor/course/${id}/manage/curriculum`}>
                    Curriculum
                </StyledLink>
            </div>
            <div>
                <StyledLink to={`/instructor/course/${id}/manage/basics`}>
                    Course landing page
                </StyledLink>
            </div>
        </CourseListContainer>
    );
};

const CourseListContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;
  height: 100vh;
  
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

const TitleDesignExtra = styled.h5`
  font-style: italic;
  font-weight: normal;
  margin: 20px 0 20px 0;
`


const TitleDesign = styled.h2`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`
const StyledLink  = styled(Link)`
  transition: all 0.3s ease;
  color: black;
  font-size: larger;
  background-color:  white;
  border-radius: 50px;
  padding: 8px 16px;
  text-decoration: none;


  &:hover {
    background-color:  #0f3a6a;
    color:  white;
    border: 2px solid #0f3a6a;
  }
`;


export default ManageCourse;
