import React from 'react';
import AWS from "aws-sdk";

const getFilesFromS3 = () => {

    const S3_BUCKET ="aws-s3-nodetuto";
    const REGION ="eu-north-1";

    const getUrlStoreInS3 = async (key) => {
        const creds = {accessKeyId: "AKIASELYRUCQXGQFI67C", secretAccessKey: "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"}
        const s3 = new AWS.S3({region: REGION, credentials: creds})
        const params = { Bucket: S3_BUCKET, Key: key};

        try {
            return await s3.getSignedUrlPromise("getObject", params);
        } catch (err) {
            console.error(err);
        }

    }

    return {getUrlStoreInS3}

};

export default getFilesFromS3;
