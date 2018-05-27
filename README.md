# Cloud Object Storage POC

## 準備


## 実験
ローカル,  IBM Cloud CF (au-syd)

* Public 全てOK
  - s3-api.us-geo.objectstorage.softlayer.net
  - s3-api.dal-us-geo.objectstorage.softlayer.net
  - s3-api.wdc-us-geo.objectstorage.softlayer.net
  - s3-api.sjc-us-geo.objectstorage.softlayer.net
* Private 全てNG IaaS からのみ接続可能なのだろう
  - s3-api.us-geo.objectstorage.service.networklayer.com
  - s3-api.dal-us-geo.objectstorage.service.networklayer.com
  - s3-api.wdc-us-geo.objectstorage.service.networklayer.com
  - s3-api.sjc-us-geo.objectstorage.service.networklayer.com

### サービスを作成する

* COS サービスインスタンス

    ```
    $ npm run service
    ```

    - cos-ippei インスタンスが作成される。

* Object Storage

    ```
    $ bx service create cloud-object-storage Premium cos-ippei
    ```

    - これだと、IBM Cloud Console 上 `cos-ippei` という名前にならない。UUID？ サポートに問合せ中
    - とりあえず Console から買うことにする。



## Cloud Object Storage を試す。
* bx コマンドのインスタンスとエイリアスの問題は問合せ中だが。。。
* とりあえず、mac にマウントしてみるか。
    - https://qiita.com/wokamoto/items/e62034d8bb1c81dcdd78
    - https://qiita.com/satorubz/items/eba9bf9909b158a5d73c
* COS の Console からサービス資格情報を作成する。
    - 作成時にオプションが必要。{"HMAC":true}
        - https://qiita.com/osonoi/items/81f52f57ded3e8aac82d

```
{
  "apikey": "FlMYX1Iv_WBWuaMEYy0c6vAF2-xWhwzQqJSauRCEZxZp",
  "cos_hmac_keys": {
    "access_key_id": "b9f922aa86d94535b8763dfe0338e0c0",
    "secret_access_key": "b8d2cc844ab56fab42085084b6766ad348f31e6764024b59"
  },
  "endpoints": "https://cos-service.bluemix.net/endpoints",
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:cloud-object-storage:global:a/48984e66e3b9b429a0cfe14d0637f075:acd65abd-9f08-4dfd-af91-7eec66dd28c3::",
  "iam_apikey_name": "auto-generated-apikey-b9f922aa-86d9-4535-b876-3dfe0338e0c0",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/48984e66e3b9b429a0cfe14d0637f075::serviceid:ServiceId-bd76bec5-9ae5-4f0d-83a3-f98e78965b29",
  "resource_instance_id": "crn:v1:bluemix:public:cloud-object-storage:global:a/48984e66e3b9b429a0cfe14d0637f075:acd65abd-9f08-4dfd-af91-7eec66dd28c3::"
}
```

```
$ brew install awscli
$ aws configure
AWS Access Key ID [None]: b9f922aa86d94535b8763dfe0338e0c0
AWS Secret Access Key [None]: b8d2cc844ab56fab42085084b6766ad348f31e6764024b59
Default region name [None]: us-geo
Default output format [None]: json
```

```
$ aws s3 ls --endpoint=https://s3-api.us-geo.objectstorage.softlayer.net
2018-05-10 11:34:55 docs-ippei
```

```
$ brew install goofys
```

* IBM Cloud Console で、bucket「docs-ippei」(us-geo, Standard)を作成して、適用なファイルを保管する。


goofys --endpoint=https://s3-api.us-geo.objectstorage.softlayer.net docs-ippei /docs-ippei

goofys --endpoint=https://s3-api.us-geo.objectstorage.service.networklayer.com my-bucket /ext/icos