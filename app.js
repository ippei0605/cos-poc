/**
 * @file Cloud Object Storage POC
 * @author Ippei SUZUKI
 */

'use strict';

const
    ENDPOINT = 's3.us-south.objectstorage.softlayer.net',
    BUCKET = 'docs-ippei2',
    API_KEY = 'lIxD6Hd77k8D9vdu8lVWdKGXPwaNTYnVZcgVxUOGMrMl';


// モジュールを読込む。
const
    cfenv = require('cfenv'),
    express = require('express'),
    favicon = require('serve-favicon'),
    fs = require('fs'),
    morgan = require('morgan'),
    multer = require('multer'),
    path = require('path'),
    AWS = require('ibm-cos-sdk');

// アプリケーションを作成する。
const
    app = express(),
    appEnv = cfenv.getAppEnv();

// サービス資格情報を取得する。
const creds = appEnv.getServiceCreds('cos-ippei');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: ENDPOINT,
    apiKeyId: 'ss4-31Ra7hNaxW7QNpBFtarJ9oAWrvqtOJjEgKj6utmz'
});

// ファイルアップロードを設定する。
const upload = multer({dest: path.join(__dirname, 'uploads')});

// ミドルウェアを設定する。
app.use(morgan('combined'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/', upload.single('upload-file'), (req, res) => {
    const uploadFile = fs.createReadStream(req.file.path);

    cos.putObject({
        Bucket: BUCKET,
        Key: req.file.originalname,
        Body: uploadFile,
        ContentType: req.file.mimetype
    }, (error, data) => {
        if (error) {
            console.log('error', error);
        } else {
            console.log(data);
        }
        res.redirect('/');
    });
});


app.get('/:key', (req, res) => {
    const key = req.params.key;
    cos.getObject({
        Bucket: BUCKET,
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
        Bucket: BUCKET
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