import useFetch from "../../../hooks/useFetch";
import {useEffect, useState} from "react";
import axios from "axios";

const useFetchReviews = (courseId) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (courseId) {
            const fetchReviews = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://mernstacktestserver.onrender.com/reviews/${courseId}`);
                    setData(response.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchReviews();
        }
    }, [courseId]);

    return { isLoading, error, data };

}

export default useFetchReviews;