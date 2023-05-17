import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";
import getFilesFromS3 from "../../utils/getFilesFromS3";
import EnrollmentProgress from "../../features/Enrollments/services/EnrollmentProgress";
import placeholderImage from "../../assets/placeholder.jpg"
import FooterEnrollmentPage from "../../layouts/FooterEnrolReviewCourseInstructorHome";

const EnrollmentPage = () => {
    const {getUrlStoreInS3} = getFilesFromS3();
    // user Id
    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const {data, error, isLoading} = useFetch(`/enrollments/getEnrollment/${userId}`)

    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchImageUrls = async () => {
            const urls = {};
            for (const course of data) {
                urls[course._id] = await getUrl(course.courseThumbnail);
            }
            setImageUrls(urls);
        }
        if (data) {
            fetchImageUrls();
        }
    }, [data]);

    if (isLoading) return <p>Loading courses...</p>;

    if (error) return <p>Error fetching courses</p>;

    const getUrl = async (thumbnail) => {
        try {
            if (thumbnail) {
                return await getUrlStoreInS3(thumbnail);
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (

        <Container>
            <TextContainer>
                <TitleDesign>My Learning</TitleDesign>
                <TitleDesignExtra>My Courses</TitleDesignExtra>
            </TextContainer>
            <EnrollContainer>
                    {data && data.map((course) => (
                            <EnrollItems key={course._id}>
                                <Link to={`/courses/${course.title}/${course._id}`} style={{textDecoration: "none"}}>
                                    <ImageWrapper>
                                        {imageUrls && imageUrls[course._id] ? (
                                            <CourseThumbnail loading="lazy" src={imageUrls[course._id]} alt="Course Thumbnail"/>
                                        ) : (
                                            <CourseThumbnail loading="lazy" src={placeholderImage} alt="placeholder" />
                                        )}
                                    </ImageWrapper>
                                    <div>
                                        <div>{course.title}</div>
                                        <div>{course.description}</div>
                                    </div>
                                </Link>
                                <EnrollmentProgress courseId={course._id}/>
                            </EnrollItems>
                    ))}
            </EnrollContainer>
            <FooterEnrollmentPage></FooterEnrollmentPage>
        </Container>



    )

}

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem 0; 
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 25px;
  border: 2px;
  height: 100vh;
  margin-bottom: 100px;
`

const TextContainer = styled.div`
  gap: 2.4rem 0;
`

const EnrollContainer = styled.div`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  gap: 2.4rem 2.4rem;
  justify-content: center;
  
 
`
const EnrollItems = styled.div`
  cursor: pointer;
  max-width: 37.5rem;
  min-width: 17.3rem;

  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: #b0b0b0;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`

const CourseThumbnail = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 100%;
  vertical-align: middle;
`
const ImageWrapper = styled.div`
  border: 1px solid #d1d7dc;
  overflow: hidden;
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
`

export default EnrollmentPage;