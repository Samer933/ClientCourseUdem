import Button from "../../../components/ui/Button";
import useDeleteRequest from "../../../hooks/useDeleteRequest";
import {useEffect, useState} from "react";
import axios from "axios";

const DeleteCourse = ({courseId, deleteActivity}) => {

    const {handleDelete} = useDeleteRequest(`https://mernstacktestserver.onrender.com/courses/delete/${courseId}`);
    const handleDeleteClick = async () => {
        await handleDelete();
        deleteActivity(courseId); // Execute the callback after deleting the course
    };

    return (
        <Button type="button" onClick={handleDeleteClick}>Delete course</Button>
    )

}

export default DeleteCourse;