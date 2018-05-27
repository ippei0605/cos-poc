'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    AWS = require('ibm-cos-sdk');

// アプリケーションを作成する。
const
    appEnv = cfenv.getAppEnv(),
    creds = appEnv.getServiceCreds('cos-ippei');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
    apiKeyId: creds.apikey
});

function listObjects () {
    return cos.listObjects({
        Bucket: 'docs-ippei'
    }).promise();
}

listObjects()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('error', error);
    });
