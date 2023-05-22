import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "../../components/ui/Button";
import CreateEnrollment from "../../features/Enrollments/services/createEnrollment";
import useFetch from "../../hooks/useFetch";
import styled from "styled-components";

const ConfirmEnrollment = () => {
    const location = useLocation();
    const { course } = location.state;
    const {createEnrollment} = CreateEnrollment(course._id);
    const navigate = useNavigate();

    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const {data, error, isLoading} = useFetch(`https://mernstacktestserver.onrender.com/enrollments/${userId}/getEnrollmentStatus/${course._id}`)

    if (isLoading) return <p>Loading enrollment detail...</p>

    if (error) return <p>Error fetching enrollment</p>

    const enroll = (values) => {
        createEnrollment(values);
        navigate("/courses");
    }

    return (
        <CourseListContainer>
            <TitleDesign>{data ? `You are already enrolled for the course: ${course.title.charAt(0).toUpperCase() + course.title.slice(1)}` : `Confirm enrollment for ${course.title}`}</TitleDesign>
            {data ? (
                <Link to={`/courses/${course.title}/${course._id}`} style={{ textDecoration: "none" }}>
                    <div>
                        <div>Go to Lesson page of {course.title.charAt(0).toUpperCase() + course.title.slice(1)}</div>
                    </div>
                </Link>
            ) : (
                <Button type="button" onClick={() => enroll()}>
                    Confirm
                </Button>
            )}
        </CourseListContainer>
    );
}

export default ConfirmEnrollment;


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
`

const TitleDesign = styled.h2`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`
