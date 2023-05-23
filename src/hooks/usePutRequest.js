import {useState} from "react";
import axios from "axios";

const usePutRequest = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePut = async(postData) => {
        setIsLoading(true);
        try {
            const response = await axios.put(url, postData);
            setData(response.data);
            return response;
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false)
        }
    };

    return {data, error, isLoading, handlePut}
}

export default usePutRequest;