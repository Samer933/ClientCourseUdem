import usePostRequest from "../../../hooks/usePostRequest";
import {useNavigate} from "react-router-dom";
const useCreateCourse = () => {
    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;
    const navigate  = useNavigate();

    const {error, isLoading, handlePost} = usePostRequest(`https://mernstacktestserver.onrender.com/courses/create/${userId}`);

    const createCourse = async (values) => {
        // handle course creation
        await handlePost(values);
        navigate("/courses");
    }
    return {createCourse, error, isLoading};
}

export default useCreateCourse;