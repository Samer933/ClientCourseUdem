import ReviewForm from "../components/ReviewForm";
import useCreateReview from "../hooks/useCreateReview";
import styled from "styled-components";

const CreateReview = (courseId) => {
    const {createReview, error, isLoading} = useCreateReview(courseId);

    if (isLoading) return <p>Loading review creation</p>

    if (error) return <p>Error review creation</p>

    return (
        <div>
            <TitleDesign>Review this course</TitleDesign>
            <ReviewForm onSubmit={createReview}/>
        </div>
    )
}

export default CreateReview;



const TitleDesign = styled.h2`
  margin: 20px 0 20px 0;
  background: #0f3a6a;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

`