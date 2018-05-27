'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    fs = require('fs'),
    AWS = require('ibm-cos-sdk');

// アプリケーションを作成する。
const appEnv = cfenv.getAppEnv();

// サービス資格情報を取得する。
const creds = appEnv.getServiceCreds('cos-ippei');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
    apiKeyId: creds.apikey,
    ibmAuthEndpoint: 'https://iam.ng.bluemix.net/oidc/token',
    serviceInstanceId: creds.resource_instance_id
});

const uploadFile = fs.createReadStream(__dirname + '/data/bluemiku_1.jpg');

cos.putObject({
    Bucket: 'docs-ippei',
    Key: 'bluemiku_1.jpg',
    Body: uploadFile,
    ContentType: 'image/jpeg'
}, (error, data) => {
    if (error) {
        console.log('error', error);
    } else {
        console.log(data);
    }
});

