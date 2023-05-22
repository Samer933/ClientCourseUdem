import React, {useEffect, useState} from 'react';
import axios from "axios";

const GetComments = ({lessonId}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (lessonId) {
            console.log(lessonId)
            const fetchComments = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`https://mernstacktestserver.onrender.com/comments/getComments/${lessonId}`);
                    setData(response.data);
                } catch (error) {
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchComments();
        }
    }, [lessonId]);

    if (isLoading) return <p>Loading comments...</p>;

    if (error) return <p>No comments</p>;

    if (!data) return <p>No comments</p>


    return (
        <div>
            <h4>Comments of this Lesson</h4>
            <ul>
                {data && data.map((comment) => (
                    <div key={comment._id}>
                        <li>
                            <div>{comment.author.username} commented: {comment.text}</div>
                            <ul>
                                {comment.replies && comment.replies.sort().map((reply) => (
                                    <li key={reply._id}>
                                        <div>{reply.author.username} replied: {reply.text}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default GetComments;
