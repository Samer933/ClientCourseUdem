import {Link} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FilterCourses from "../../features/Searches/FilterCourses";
import {useEffect, useState} from "react";
import styled from "styled-components";
import getFilesFromS3 from "../../utils/getFilesFromS3";
import placeholderImage from "../../assets/placeholder.jpg";
import FooterEnrollmentPage from "../../layouts/FooterEnrolReviewCourseInstructorHome";

const CourseList = () => {
    const {data, error, isLoading} = useFetch("https://mernstacktestserver.onrender.com/courses");
    const [reviews, setReviews] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const {getUrlStoreInS3} = getFilesFromS3();
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch('https://mernstacktestserver.onrender.com/reviews/reviews/courses');
            const data = await res.json();
            setReviews(data);

        };
        fetchReviews();
    }, []);

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

    const courseMap = reviews.reduce((map, review) => {
        const courseId = review.course?._id;
        const courseTitle = review.course?.title;
        const courseDescription = review.course?.description;
        const courseSubject = review.course?.subject;

        if (!courseId) return map;

        if (!map.has(courseId)) {
            map.set(courseId, {
                title: courseTitle,
                description: courseDescription,
                sum: review.rating,
                subject: courseSubject,
                count: 1
            });
        } else {
            const {title, description, subject, sum, count} = map.get(courseId);
            map.set(courseId, {
                title,
                description,
                subject,
                sum: sum + review.rating,
                count: count + 1
            });
        }
        return map;
    }, new Map());


    const averages = Array.from(courseMap).map(([id, {title, description, subject, sum, count}]) => {
        return {id, title, description, subject, averageRating: sum / count};
    });

    if (isLoading) return <p>Loading courses...</p>;

    if (error) return <p>Error fetching courses</p>;

    const handleFilter = (subject, rating) => {
        let filtered = averages;
        if (subject === "Choose a subject") {
            setFiltered(null);
        } else {
            filtered = filtered.filter((item) => item.subject === subject);
            setFiltered(filtered);
        }

        if (rating === "Choose a rating") {
            setFiltered(null);
        } else if (rating !== "") {
            filtered = filtered.filter((item) => {
                const itemRating = parseFloat(item.averageRating);
                return itemRating >= parseFloat(rating) && itemRating < (parseFloat(rating) + 1);
            });
            setFiltered(filtered);
        }
    };

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
<>
        <CourseListContainer>
            <div>
                <TitleDesign>Courses</TitleDesign>
                <TitleDesignExtra>Choose a course</TitleDesignExtra>
            </div>
            <CourseListWrapper>
                {data && data.map((course) => (
                        <CourseBox key={course._id}>
                            <ImageWrapper>
                                {imageUrls && imageUrls[course._id] ? (
                                    <CourseThumbnail loading="lazy" src={imageUrls[course._id]} alt="Course Thumbnail"/>
                                ) : (
                                    <CourseThumbnail loading="lazy" src={placeholderImage} alt="placeholder" />
                                )}
                            </ImageWrapper>
                            <Link to={`/courses/${course._id}`}
                                  style={{textDecoration: "none"}}>{course.title.charAt(0).toUpperCase() + course.title.slice(1)}</Link>
                            <div>
                                Description: {course.description}
                            </div>
                            <div>
                                Subject: {course.subject}
                            </div>
                            <div>
                                Instructor: {course.teacher.username.charAt(0).toUpperCase() + course.teacher.username.slice(1)}
                            </div>
                        </CourseBox>
                ))}
            </CourseListWrapper>
            <div>
                <FilterCourses handleFilter={handleFilter} options={options} setFiltered={setFiltered}
                               averages={averages}/>
                <CourseListWrapper>
                    {filtered && filtered.map(({id, title, subject, description, averageRating}) => (
                        <CourseBox key={id}>
                                <br/>
                                <Link to={`/courses/${id}`}
                                      style={{textDecoration: "none"}}>{title.charAt(0).toUpperCase() + title.slice(1)}</Link>
                                <div>
                                    Description: {description}
                                </div>
                                <div>
                                    Rating: {averageRating.toFixed(1)}
                                </div>
                                <div>
                                    Subject: {subject}
                                </div>
                                <br/>
                        </CourseBox>
                    ))}
                </CourseListWrapper>
            </div>

        </CourseListContainer>

<br/>

    <FooterEnrollmentPage></FooterEnrollmentPage>

</>

    );


};

// change this after
const options = {
    subject: ["Development", "Art", "Business", "Design", "Marketing", "Music", "Teaching", "Lifestyle"],
};

export default CourseList;

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

