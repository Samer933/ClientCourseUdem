import usePostRequest from "../../../hooks/usePostRequest";


const CreateEnrollment = (courseId) => {
    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const {error, isLoading, handlePost} = usePostRequest(`https://mernstacktestserver.onrender.com/enrollments/${userId}/create/${courseId}`);

    const createEnrollment = async (values) => {
        await handlePost(values);
    }
    return {createEnrollment, error, isLoading};
}

export default CreateEnrollment;