import {useEffect, useState} from "react";
import axios from "axios";


const useDeleteRequest = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        console.log(url)
        setIsLoading(true);
        try {
            const response = await axios.delete(url);

            setData(response.data);
            return response
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {data, error, isLoading, handleDelete}

}

export default useDeleteRequest;