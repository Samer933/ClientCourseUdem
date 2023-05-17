import React from 'react';
import UploadToS3WithNativeSdk from "../../../utils/UploadToS3WithNativeSdk";

const AddLessonContent = ({LessonId}) => {


    return (
        <div>
            <div>
                <p>Upload the content of this lesson</p>
                <UploadToS3WithNativeSdk lessonId= {LessonId}/>
            </div>
        </div>
    );
};

export default AddLessonContent;
