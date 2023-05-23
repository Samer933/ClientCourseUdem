import GetReviews from "../../features/Reviews/services/GetReviews";
import CreateReview from "../../features/Reviews/services/CreateReview";
import useAuthContext from "../../hooks/useAuthContext";
import styled from "styled-components";
import FooterEnrollmentPage from "../../layouts/FooterEnrolReviewCourseInstructorHome";

const ReviewPage = ({course}) => {

    const session = sessionStorage.getItem('session');


    if (!session){
        return (
            <div>
                <TitleDesign>Review of {course && course.title.charAt(0).toUpperCase() + course.title.slice(1)}</TitleDesign>
                <div>
                    <GetReviews courseId={course && course._id}/>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <TitleDesign>Review of {course && course.title.charAt(0).toUpperCase() + course.title.slice(1)}</TitleDesign>
                <div>
                    <GetReviews courseId={course && course._id}/>
                </div>
                <div>
                    <CreateReview courseId ={course && course._id}/>
                </div>

                <FooterEnrollmentPage/>
            </div>

        )
    }
}

export default ReviewPage;

const TitleDesign = styled.h2`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`