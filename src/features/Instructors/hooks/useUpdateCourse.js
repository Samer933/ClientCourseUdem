import usePutRequest from "../../../hooks/usePutRequest";
import {useNavigate, useParams} from "react-router-dom";



const useUpdateCourse = () => {
    const {id} = useParams();
    const {error, isLoading, handlePut} = usePutRequest(`https://mernstacktestserver.onrender.com/courses/update/${id}`);
    const navigate = useNavigate();

    const updateCourse = async (values) => {
        console.log("submit", values);
        await handlePut(values);
        navigate("/instructor");
    }
    return {updateCourse, error, isLoading};
}

export default useUpdateCourse;