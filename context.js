/**
 * loud Object Storage PoC: コンテキスト
 * @module utils/context
 * @author Ippei SUZUKI
 */

'use strict';

// モジュールを読込む。
const
    cfenv = require('cfenv'),
    vcapServices = require('vcap_services'),
    cosCreds = vcapServices.getCredentials('cloud-object-storage');

// 環境変数を取得する。
const appEnv = cfenv.getAppEnv();

/**
 * コンテキスト
 * @type {{PORT: *, URL: *, APIKEY: *, RESOURCE_INSTANCE_ID: *}}
 */
module.exports = {
    PORT: appEnv.port,
    URL: appEnv.url,
    APIKEY: cosCreds.apikey,
    RESOURCE_INSTANCE_ID: cosCreds.resource_instance_id
};