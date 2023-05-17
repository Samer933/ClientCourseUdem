import GetCourseList from "../../features/Instructors/services/getCourseList";
import Button from "../../components/ui/Button";
import {Link} from "react-router-dom";
import styled from "styled-components";
import FooterlogSign from "../../layouts/FooterlogSign";
import FooterEnrollmentPage from "../../layouts/FooterEnrolReviewCourseInstructorHome";


const InstructorPage = () => {
    return (
        <InstructorContainer>
            <TitleDesign>Instructor page</TitleDesign>
            <TitleDesignExtra>Manage my courses</TitleDesignExtra>
            <div>
                <Link to="/create">
                    <Button>Create a course</Button>
                </Link>
            </div>
            <div>
                <GetCourseList/>
            </div>
<FooterEnrollmentPage></FooterEnrollmentPage>
        </InstructorContainer>
    )
}

export default InstructorPage

const InstructorContainer = styled.div`
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

const TitleDesignExtra = styled.h5`
  font-style: italic;
  font-weight: normal;
  margin: 20px 0 20px 0;
`



