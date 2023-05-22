import {Link, useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/ui/Button";
import ReviewPage from "../Review/ReviewPage";
import GetCourseRating from "../../features/Reviews/services/GetCourseRating";
import {useEffect, useState} from "react";
import axios from "axios";
import getFilesFromS3 from "../../utils/getFilesFromS3";
import placeholderImage from "../../assets/placeholder.jpg"
import styled from "styled-components";
import face from "../../assets/Cirkel_i_cirkel.svg"

function CourseDetails() {

    const {getUrlStoreInS3} = getFilesFromS3();
    const {id} = useParams()
    const [image, setImage] = useState({});

    const {data, error, isLoading} = useFetch(`https://mernstacktestserver.onrender.com/courses/${id}`)

    useEffect(() => {
        getUrl();
    }, [])

    if (isLoading) return <p>Loading course detail...</p>

    if (error) return <p>Error fetching course detail</p>

    const getUrl = async () => {
        try {
            setImage(null);
            const response = await axios.get(`https://mernstacktestserver.onrender.com/courses/${id}`);
            if (response.data.courseThumbnail) {
                const imageUrl = await getUrlStoreInS3(response.data.courseThumbnail);
                setImage(imageUrl);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CourseListContainer>
            <CourseBorderContainer>
                <CourseContainer>
                    {data && <TitleDesign>{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</TitleDesign>}
                    {data && (data.courseThumbnail && data.courseThumbnail !== "placeholder"
                            ? <CourseThumbnail src={image} loading="lazy" alt="course thumbnail"/>
                            : <CourseThumbnail src={placeholderImage} loading="lazy" alt="placeholder"/>
                    )}
                    {data &&
                        <TitleDesignExtra>{data.description.charAt(0).toUpperCase() + data.description.slice(1)}</TitleDesignExtra>}
                    <GetCourseRating courseId={id}/>
                    {data &&
                        <p>Instructor: {data.teacher.username.charAt(0).toUpperCase() + data.teacher.username.slice(1)}</p>}
                    {data && <p>Course Students: {data.students.length}</p>}
                </CourseContainer>
            </CourseBorderContainer>

            <br/>
            <div style={{marginBottom: 50}}>
                <Link to="/confirmEnrollment" state={{course: data}}>
                    <Button>Enroll here</Button>
                </Link>
            </div>
            <ProfileImage src={face} alt="face gul"/>
            <InstructorDesignExtra>Hello welcome to my course, My name is {data &&
                <span>{data.teacher.username.charAt(0).toUpperCase() + data.teacher.username.slice(1)}.</span>}</InstructorDesignExtra>
                <InstructorDesignExtra>Please enjoy your time here.</InstructorDesignExtra>
            <div style={{marginTop:"110px"}}>
                <ReviewPage course={data}/>
            </div>
        </CourseListContainer>

    );
}

export default CourseDetails;

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

const CourseBorderContainer = styled.div`
  padding: 20px; 
  border-Style: double;
  width: 50%;
  box-Shadow: 5px 10px #888888;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`

const CourseThumbnail = styled.img`
  width: 300px;
  height: auto;
  border-style: solid;

  @media (max-width: 768px) {
    /* Styles for screens that are at least 768px wide */
    width: 300px
  }

  @media (max-width: 576px) {
    /* Styles for screens that are at least 768px wide */
    width: 300px
  }

  @media (max-width: 375px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 250px
  }

`

const TitleDesign = styled.h1`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`

const CourseContainer = styled.div`
  width: 250px;
  margin: 10px 0 10px 0;

  @media (max-width: 768px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 220px;
  }

  @media (max-width: 576px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 120px;
  }
  
`

const ProfileImage = styled.img`
  width: 370px;

  @media (max-width: 768px) {
    /* Styles for screens that are at least 768px wide */
    max-width: 220px;
  }
  

`

const TitleDesignExtra = styled.h5`
  font-style: italic;
  font-weight: normal;
  margin: 20px 0 20px 0;
`

const InstructorDesignExtra = styled.h5`
  font-weight: normal;
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

