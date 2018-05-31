/**
 * Cloud Object Storage PoC: ルーティング
 * @module routes/index
 * @author Ippei SUZUKI
 * @see {@link https://www.npmjs.com/package/ibm-cos-sdk}
 */

'use strict';

/**
 * エンドポイントを設定する。
 * @type {string}
 * @see {@link https://console.bluemix.net/docs/services/cloud-object-storage/basics/endpoints.html#select-regions-and-endpoints}
 */
const ENDPOINT = 's3-api.us-geo.objectstorage.softlayer.net';

/**
 * ストレージクラスを設定する。(エンドポイントにより選択できるストレージクラスが異なる。)
 * @type {string}
 * @see {@link https://console.bluemix.net/docs/services/cloud-object-storage/basics/classes.html#use-storage-classes}
 */
const STORAGE_CLASS = 'us-standard';

// モジュールを読込む。
const
    express = require('express'),
    fs = require('fs'),
    multer = require('multer'),
    AWS = require('ibm-cos-sdk'),
    context = require('../context');

// ルーターを作成する。
const router = express.Router();
module.exports = router;

// ファイルアップロードを設定する。
const upload = multer({
    "dest": "upload/"
});

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: ENDPOINT,
    apiKeyId: context.APIKEY,
    serviceInstanceId: context.RESOURCE_INSTANCE_ID
});

// Bucket の一覧を表示する。
router.get('/', (req, res) => {
    cos.listBuckets({}, (error, data) => {
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

// Bucket を作成する。
router.post('/', (req, res) => {
    cos.createBucket({
        Bucket: req.body.bucket,
        CreateBucketConfiguration: {
            LocationConstraint: STORAGE_CLASS
        }
    }, (error, data) => {
        const result = {
            backUrl: '/'
        };
        if (error) {
            console.log('error', error);
            Object.assign(result, error);
        } else {
            console.log(data);
            Object.assign(result, data);
        }
        res.render('result', {
            result: result
        });
    });
});

// Bucket を削除する。
router.get('/:bucket/delete', (req, res) => {
    cos.deleteBucket({
        Bucket: req.params.bucket
    }, (error, data) => {
        const result = {
            backUrl: '/'
        };
        if (error) {
            console.log('error', error);
            Object.assign(result, error);
        } else {
            console.log(data);
            Object.assign(result, data);
        }
        res.render('result', {
            result: result
        });
    });
});

// Object の一覧を表示する。
router.get('/:bucket', (req, res) => {
    cos.listObjects({
        Bucket: req.params.bucket
    }, (error, data) => {
        if (error) {
            console.log('error', error);
            res.sendStatus(500);
        } else {
            res.render('bucket', {
                data: data
            });
        }
    });
});

// Object をアップロードする。
router.post('/:bucket', upload.single('upload-file'), (req, res) => {
    const result = {
        backUrl: `/${req.params.bucket}`
    };
    const uploadFile = fs.createReadStream(req.file.path);
    cos.putObject({
        Bucket: req.params.bucket,
        Key: req.file.originalname,
        Body: uploadFile,
        ContentType: req.file.mimetype
    }, (error, data) => {
        if (error) {
            console.log('error', error);
            Object.assign(result, error);
        } else {
            console.log(data);
            Object.assign(result, data);
        }
        res.render('result', {
            result: result
        });
    });
});

// Object を表示する。
router.get('/:bucket/:key', (req, res) => {
    const
        bucket = req.params.bucket,
        key = req.params.key;
    cos.getObject({
        Bucket: bucket,
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

// Object を削除する。
router.get('/:bucket/:key/delete', (req, res) => {
    const
        bucket = req.params.bucket,
        key = req.params.key,
        result = {
            backUrl: `/${req.params.bucket}`
        };
    cos.deleteObject({
        Bucket: bucket,
        Key: key,
    }, (error, data) => {
        if (error) {
            console.log('error', error);
            Object.assign(result, error);
        } else {
            console.log(data);
            Object.assign(result, data);
        }
        res.render('result', {
            result: result
        });
    });
});