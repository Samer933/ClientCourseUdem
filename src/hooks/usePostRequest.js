import {useState} from "react";
import axios from "axios";


const usePostRequest = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePost = async (postData) => {
        setIsLoading(true);
        try {
            console.log(postData)
            console.log(url)
            const response = await axios.post(url, postData);
            setData(response.data);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }

    };


    return {data, error, isLoading, handlePost}
}

export default usePostRequest;