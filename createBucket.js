/**
 * @file createBucket
 * @see {@link https://ibm.github.io/ibm-cos-sdk-js/}
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    AWS = require('ibm-cos-sdk');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: 's3.us-south.objectstorage.softlayer.net',
    apiKeyId: 'ss4-31Ra7hNaxW7QNpBFtarJ9oAWrvqtOJjEgKj6utmz',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/48984e66e3b9b429a0cfe14d0637f075:a2f41fbe-590a-4c7f-8c00-dfb54bc046c8::'
});

cos.createBucket({
    Bucket: 'docs-ippei999',
    CreateBucketConfiguration: {
        LocationConstraint: 'us-standard'
    }
}, (error, data) => {
    if (error) {
        console.log('error', error);
        process.exit(1);
    } else {
        console.log(data);
        process.exit(0);
    }
});