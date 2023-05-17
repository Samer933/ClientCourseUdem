import React, {useEffect, useState} from 'react';
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(url);
                setData(response.data);
            }catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [url]);

    return {data, error, isLoading};
}
export default useFetch;

