import React, {useEffect, useState} from 'react';
import axios from "axios";

const Progress = ({lessonId, courseId:id}) => {

    const userString = localStorage.getItem("authToken2")
    const user = JSON.parse(userString);
    const userId = user.passport.user;

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);



    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get(`/progresses/api/${lessonId}/${userId}`)

                if (response.data.length > 0) {
                    const { completed, _id } = response.data[0];

                    setIsButtonDisabled(completed);
                    setIsChecked(completed);
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchProgress()

    }, [])

    const addProgress = async (lessonId) => {
        try {
            await axios.post(`/progresses/${userId}/createProgress/${id}/${lessonId}`)
            setIsButtonDisabled(true);
            setIsChecked(true);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <input
                checked={isChecked}
                type="checkbox"
                style={{marginLeft: "20px"}}
                onChange={() => addProgress(lessonId)}
                disabled={isButtonDisabled}
            />
        </>
    );
};

export default Progress;
