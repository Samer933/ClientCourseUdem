import usePostRequest from "../../../hooks/usePostRequest";
import {useNavigate} from "react-router-dom";

const useSignup = () => {
    const { error, isLoading, handlePost } = usePostRequest('https://mernstacktestserver.onrender.com/auths/register');
    const navigate = useNavigate();
    const signup = async (values) => {
        await handlePost(values);
        navigate("/login");
    };

    return { signup, error, isLoading };
}

export default useSignup;