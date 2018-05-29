'use strict';

// ファイル名
const FILENAME = 'neko.pdf';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    fs = require('fs'),
    fileType = require('file-type'),
    AWS = require('ibm-cos-sdk');

// アプリケーションを作成する。
const appEnv = cfenv.getAppEnv();

// サービス資格情報を取得する。
const creds = appEnv.getServiceCreds('cos-ippei');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
    apiKeyId: creds.apikey,
});

// const uploadFile = fs.createReadStream(__dirname + '/data/bluemiku_1.jpg');

fs.readFile(__dirname + `/data/${FILENAME}`, (error, uploadFile) => {
    const
        fileInfo = fileType(uploadFile),
        contentType = fileInfo && fileInfo.mime ? fileInfo.mime : '';

    cos.putObject({
        Bucket: 'docs-ippei',
        Key: FILENAME,
        Body: uploadFile,
        ContentType: contentType
    }, (error, data) => {
        if (error) {
            console.log('error', error);
            process.exit(1);
        } else {
            console.log(data);
            process.exit(0);
        }
    });
});
