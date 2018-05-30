'use strict';

const
    ENDPOINT = 's3.us-south.objectstorage.softlayer.net',
    BUCKET = 'docs-ippei2',
    API_KEY = 'lIxD6Hd77k8D9vdu8lVWdKGXPwaNTYnVZcgVxUOGMrMl';

// モジュールを読込む。
const
    axios = require('axios'),
    cfenv = require('cfenv'),
    AWS = require('ibm-cos-sdk');

// COS オブジェクトを作成する。
const cos = new AWS.S3({
    endpoint: ENDPOINT,
    apiKeyId: API_KEY,
});


const listParams = {
    method: 'get',
    url: 'https://s3.us-south.objectstorage.softlayer.net/docs-ippei2',
    headers: {
        "Authorization": "Bearer eyJraWQiOiIyMDE3MTAzMC0wMDowMDowMCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJJQk1pZC0zMTAwMDE0M1RLIiwiaWQiOiJJQk1pZC0zMTAwMDE0M1RLIiwicmVhbG1pZCI6IklCTWlkIiwiaWRlbnRpZmllciI6IjMxMDAwMTQzVEsiLCJnaXZlbl9uYW1lIjoiSXBwZWkiLCJmYW1pbHlfbmFtZSI6IlNVWlVLSSIsIm5hbWUiOiJJcHBlaSBTVVpVS0kiLCJlbWFpbCI6ImlwcGVpMDYwNUBnbWFpbC5jb20iLCJzdWIiOiJpcHBlaTA2MDVAZ21haWwuY29tIiwiYWNjb3VudCI6eyJic3MiOiI0ODk4NGU2NmUzYjliNDI5YTBjZmUxNGQwNjM3ZjA3NSIsImltcyI6IjE0OTE4MDEifSwiaWF0IjoxNTI3NjUyMDIzLCJleHAiOjE1Mjc2NTU2MjMsImlzcyI6Imh0dHBzOi8vaWFtLmJsdWVtaXgubmV0L2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiYngiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.MP4IAqht47aGXHFCQpcBztjjAh3v8iDN85g1rgBohGJQotCciJQW42ZFfbKCQUVZxViOnqI3d9QMCv9zG_sHB1Pv__B5O5vJFRaQDgXRAwStb1c6SdS4AyEQ8D9wUHEv1hCIN-Epx0GQ_345t4MLhrZuGixX5lA9_KixRm_QvRBk68kU-D3YmqKVu-NEPj8K6BYU5R4cr-Nlb22W3_SgoEC9Xs7rNCAkD6FFj98CEx-VyY_dmMNBUHOS1izgIxrlsEHxBBvgDaNfUSN6Yd-C7U3y6K0ZX_-FyiHxEs-32GaZmM-f0pzgxeWTnqfpKMg2XwW01RhDQ-6VF1l9YWOHxg"
    },
    responseType: 'json'

};

axios(listParams)
    .then(response => {
        console.log(JSON.stringify(response.data, undefined, 2));
    })
    .catch(error => {
        console.log('error:', error);
    });
/*
cos.listObjects({
    Bucket: BUCKET
}, (error, data) => {
    if (error) {
        console.log('error', error);
        process.exit(1);
    } else {
        console.log(data);
        process.exit(0);
    }
});
*/