import useGetReviews from "../hooks/useGetReviews";
import styled from "styled-components";
import reviewStar from "../../../assets/review-star.svg"

const GetReviews = ({courseId}) => {

    const {data, error, isLoading} = useGetReviews(courseId)

    if (isLoading) return <p>Loading reviews...</p>;

    if (error) return <p>No reviews</p>;

    if (!data) return <p>No reviews</p>

    return (
        <div>
            <ReviewStyle>
                {data && data.map((review) => (
                    <div key={review._id}>
                        <li>
                            <h4 className="rating">{review.rating}  <img src={reviewStar} style={{width: "20px"}}  alt="star icon" /></h4>
                            <h4 className="comment">Review: {review.comment}</h4>
                        </li>
                    </div>
                ))}
            </ReviewStyle>
        </div>
    )
}

export default GetReviews;

const ReviewStyle = styled.ul`
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

  li {
    padding: 10px;
    flex-basis: calc(50% - 20px);
    display: flex;
    flex-direction: column;
  }

  li:last-child {
    margin-bottom: 0;
  }

  .rating {
    font-weight: bold;
    font-size: 17px;
  }

  .comment {
    margin-top: 10px;
    font-size: 16px;
  }

`
