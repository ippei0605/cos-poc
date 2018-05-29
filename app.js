/**
 * @file Cloud Object Storage POC
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    path = require('path'),
    AWS = require('ibm-cos-sdk');

// アプリケーションを作成する。
const
    app = express(),
    appEnv = cfenv.getAppEnv();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// サービス資格情報を取得する。
const creds = appEnv.getServiceCreds('cos-ippei');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: 's3-api.us-geo.objectstorage.softlayer.net',
    apiKeyId: creds.apikey
});

// ミドルウェアを設定する。
app.use(morgan('combined'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/:key', (req, res) => {
    const key = req.params.key;
    cos.getObject({
        Bucket: 'docs-ippei',
        Key: key
    }, (error, data) => {
        if (error) {
            console.log('error', error);
            res.sendStatus(500);
        } else {
            console.log(data.ContentType, req.params.key);
            res.set('Content-Type', data.ContentType);
            res.send(data.Body);
        }
    });
});

app.get('/', (req, res) => {
    cos.listObjects({
        Bucket: 'docs-ippei'
    }, (error, data) => {
        if (error) {
            console.log('error', error);
            res.sendStatus(500);
        } else {
            res.render('index', {
                data: data
            });
        }
    });
});

// リクエトを受付ける。
app.listen(appEnv.port, () => {
    console.log("server starting on " + appEnv.url);
});