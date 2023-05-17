import usePostRequest from "../../../hooks/usePostRequest";

const useCreateCourse = () => {
    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const {error, isLoading, handlePost} = usePostRequest(`/courses/create/${userId}`);

    const createCourse = async (values) => {
        // handle course creation
        console.log("submit", values);
        await handlePost(values);
    }
    return {createCourse, error, isLoading};
}

export default useCreateCourse;