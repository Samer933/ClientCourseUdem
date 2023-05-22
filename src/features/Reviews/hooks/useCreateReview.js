import usePostRequest from "../../../hooks/usePostRequest";
import {useNavigate} from "react-router-dom";

const useCreateReview = ({courseId}) => {
    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;
    const navigate = useNavigate()

    const {error, isLoading, handlePost} = usePostRequest(`https://mernstacktestserver.onrender.com/reviews/${userId}/create/${courseId}`);

    const createReview = async (values) => {
        //handle review creation
        console.log("submit ", values);
        await handlePost(values);
        navigate("/courses");
    }
    return {createReview, error, isLoading};
}

export default useCreateReview;