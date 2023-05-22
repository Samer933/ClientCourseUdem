import UpdateCourseForm from "../components/updateCourseForm";
import useUpdateCourse from "../hooks/useUpdateCourse";
import styled from "styled-components";
import FooterEnrolReviewCourseInstructorHome from "../../../layouts/FooterEnrolReviewCourseInstructorHome";


const UpdateCourse = () => {

    const { updateCourse, isLoading, error } = useUpdateCourse();

    if (isLoading) return <p>Loading course update</p>

    if (error) return <p>Error course update</p>

    return (
        <CourseListContainer>
            <TitleDesign>Update your course</TitleDesign>
            <UpdateCourseForm onSubmit={updateCourse}/>
            <FooterEnrolReviewCourseInstructorHome/>
        </CourseListContainer>
    )
}

export default UpdateCourse;

const CourseListContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;
  height: 100vh;
  

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