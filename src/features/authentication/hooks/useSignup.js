import usePostRequest from "../../../hooks/usePostRequest";

const useSignup = () => {
    const { error, isLoading, handlePost } = usePostRequest('https://mernstacktestserver.onrender.com/auths/register');

    const signup = async (values) => {
        // handle registration logic
        console.log('submit', values);
        await handlePost(values);
    };

    return { signup, error, isLoading };
}

export default useSignup;