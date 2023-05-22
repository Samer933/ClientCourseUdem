import React, {useEffect, useState} from 'react';
import axios from "axios";

const EnrollmentProgress = ({courseId}) => {

    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const [courseProgress, setCourseProgress] = useState([]);
    const [totalLessons, setTotalLessons] = useState(0);

    useEffect(() => {
        const fetchCourseProgress = async () => {
            try {
                const response = await axios.get(`https://mernstacktestserver.onrender.com/progresses/course/${courseId}/${userId}`)

                if (response.data.length > 0) {
                    setCourseProgress(response.data.length)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchCourseProgress()

    }, [])

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://mernstacktestserver.onrender.com/lessons/getLessonsOfCourse/${courseId}`)
                setTotalLessons(response.data.length)

            } catch (error) {
                console.log(error)
            }
        }
        fetchCourse()

    }, [totalLessons])

    const percentage = totalLessons > 0 ? Math.round((courseProgress / totalLessons) * 100) : 0;

    return (
        <>
            <p>Progress {percentage}%</p>
        </>
    );
};

export default EnrollmentProgress;
