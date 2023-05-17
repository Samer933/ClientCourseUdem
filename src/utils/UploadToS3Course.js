import React, {useState} from 'react';
import AWS from 'aws-sdk'
import ProgressBar from 'react-bootstrap/ProgressBar';
import usePutRequest from "../hooks/usePutRequest";
import {Upload} from "@aws-sdk/lib-storage";
import {S3Client} from "@aws-sdk/client-s3";
import ReactLoading from 'react-loading';
import {v4 as uuid } from "uuid";
import styled from "styled-components";


const S3_BUCKET ="aws-s3-nodetuto";
const REGION ="eu-north-1";


AWS.config.update({
    accessKeyId: "AKIASELYRUCQXGQFI67C",
    secretAccessKey: "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"
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadToS3Course = ({courseId}) => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const {handlePut} = usePutRequest(`/courses/uploadCourseThumbnail/${courseId.id}`);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    // your frontend requests a S3 presigned URL from your endpoint (add the userid to the file key)
    // client uses this url to execute the multipart upload
    // lambda listens to your s3 bucket for put requests, pulls the userid from the file name key, and updates users record in the db
    // another lambda listens for aborts and removes aborted uploads.
    // add a S3 policy to also delete incomplete uploads after a set amount of time.

    // multipart file upload
    const uploadMultipartFile =  async (file) => {

        const isImage = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isImage) {
            window.alert('Invalid file type. Only JPEG and PNG images are allowed.');
            return;
        }

        const target = {Bucket: S3_BUCKET, Key: `courseThumbnail/${Date.now().toString()}${uuid()}-${file.name}`, Body: file}
        const creds = {accessKeyId: "AKIASELYRUCQXGQFI67C", secretAccessKey: "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"}
        try {
            const parallelUploads3 = new Upload({
                client: new S3Client({region: REGION, credentials: creds}),
                params: target,
                partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5 MB
            });

            setIsUploading(true);

            parallelUploads3.on("httpUploadProgress", (progress) => {
                setProgress(Math.round((progress.loaded / progress.total) * 100))
                console.log(progress)
            });

            await parallelUploads3.done()
                .then(() => {
                    handlePut({key: target.Key, type: file.type});
                    window.alert('Upload complete!')
                    setProgress(0);
                    setIsUploading(false);
                })

        } catch (e) {
            console.log(e);
        }

    }


    // Not multipart but work for smaller files
    // const uploadImage = (file) => {
    //
    //     const keyType = function (file) {
    //         if (file.type === 'video/mp4') {
    //             return "video"
    //         } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
    //             return "thumbnail"
    //         } else {
    //             return "others"
    //         }
    //     }
    //
    //     const params = {
    //         Body: file,
    //         Bucket: S3_BUCKET,
    //         Key: `${keyType(file)}/${Date.now().toString()}-${file.name}`
    //     };
    //
    //     myBucket.putObject(params)
    //         .on('httpUploadProgress', (evt) => {
    //             setProgress(Math.round((evt.loaded / evt.total) * 100))
    //         })
    //         .send(async (err) => {
    //             if (err) console.log(err)
    //             else {
    //                 console.log("this is the key, ", params.Key)
    //                 handlePut({key: params.Key, type: file.type});
    //                 window.alert('Upload complete!')
    //                 setProgress(0);
    //             }
    //         })
    // }

    const Icon = ({ type, color }) => (
        <ReactLoading type={type} color={color} height={30} width={30} />
    );

    return <div>
        <ProgressBar animated now={progress} label={`${progress}%`}></ProgressBar >
        {isUploading && <Icon type="spin" color="blue" />}
        <input type="file" onChange={handleFileInput}/>
        <ButtonStyled onClick={() => uploadMultipartFile(selectedFile)}> Upload Course Thumbnail</ButtonStyled>
    </div>
}

export default UploadToS3Course;


const ButtonStyled = styled.button`
  margin-right: 0.5rem;
  margin-bottom: 20px;
  color: white;
  background-color: #0f3a6a;

  transition: all 0.3s ease;

  &:hover {
    border-color: #b0b0b0;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);

`

const InputStyle = styled.input`
  margin-right: 0.5rem;
  margin-bottom: 20px;
  color: white;
  background-color: #0f3a6a;

  transition: all 0.3s ease;

  &:hover {
    border-color: #b0b0b0;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
`
