import useFetch from "../../../hooks/useFetch";
import Button from "../../../components/ui/Button";
import DeleteCourse from "./deleteCourse";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";


const GetCourseList = () => {

    const userId = sessionStorage.getItem('userId');
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://mernstacktestserver.onrender.com/courses/getAll/${userId}`);
                setCourses(response.data)

            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }
        fetchData();

    }, [])

    const handleDeleteActivity = (id) => {
        setCourses([...courses.filter(x => x._id !== id)])
    }


    if (isLoading) return <p>Loading courses...</p>

    if (error) return <p>Error fetching courses</p>

    return (
        <div>
            <CourseListWrapper>
                {courses && courses.map((course) => (
                        <CourseBox key={course._id}>
                            <li>
                                <TitleDesign>{course.title.charAt(0).toUpperCase() + course.title.slice(1)}</TitleDesign>
                                <DeleteCourse courseId={course._id} deleteActivity={handleDeleteActivity}/>
                                <div>
                                    <Link to={`/update/course/${course._id}`}>
                                        <Button type="button" children={course._id}>Update Course</Button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/manage/course/${course._id}`}>
                                        <Button type="button" children={course._id}>Manage course</Button>
                                    </Link>
                                </div>
                            </li>
                        </CourseBox>
                ))}
            </CourseListWrapper>
        </div>
    );
}

export default GetCourseList;

const CourseListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 50px;
  list-style: none;
  padding: 0;
  justify-content: center;

  @media (max-width: 576px) {
    /* Styles for screens that are at least 576px wide */
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
  }
`;

const TitleDesign = styled.h3`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`


const CourseBox = styled.div`
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

  @media (min-width: 992px) {
    /* Styles for screens that are at least 1200px wide */
    max-width: 240px;
  }


  @media (min-width: 1200px) {
    /* Styles for screens that are at least 1200px wide */
    max-width: 240px;
  }

`;
