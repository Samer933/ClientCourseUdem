import React from 'react';
import useGetReviews from "../hooks/useGetReviews";
import reviewStar from "../../../assets/review-star.svg"

const GetCourseRating = ({courseId}) => {

    const {data, error, isLoading} = useGetReviews(courseId);

    if (isLoading) return <p>Loading reviews...</p>;

    if (error) return <p>No reviews</p>;

    if (!data) return <p>No reviews</p>

    const totalRating = data.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / data.length;


    return (
        <div>
            {averageRating && <p>Course review: {averageRating.toFixed(1)} <img src={reviewStar} style={{width: "20px"}}  alt="star icon" /></p>}
        </div>
    );
};

export default GetCourseRating;
