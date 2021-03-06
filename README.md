# Cloud Object Storage PoC

## はじめに
* Cloud Foundry アプリから Cloud Object Storage (以下、COS) の利用を検証する。
* Node.js 推しなので、Node.js Client Library を使用する。
    - IBM Docs https://console.bluemix.net/docs/services/cloud-object-storage/libraries/node.html#using-node-js
    - NPM https://www.npmjs.com/package/ibm-cos-sdk

### ローカル環境のシステム要件
* Node.js
    - 8 以上
* bx (IBM Cloud Bluemix CLI)

## 環境構築手順
1. [package.json](./package.json) の `scripts` と [manifest.yml](./manifest.yml) を自身の環境に変更する。
    > package.json の scripts に bx コマンドを定義している。

1. ログインする。

    ```
    $ npm run login
    ```
    > Email, Password を入力する。

1. COS サービスインスタンスを作成する。

    ```
    $ npm run service_create
    ```
    > 削除コマンドも用意している。 `npm run service_delete`


1. COS サービスインスタンスのエイリアスを作成する。(Cloud Foundry アプリとバインドするため。)

    ```
    $ npm run alias_create
    ```
    > 削除コマンドも用意している。 `npm run alias_delete`


1. アプリをプッシュする。

    ```
    $ npm run push
    ```

1. ブラウザでアプリを起動する。

    ```
    $ npm run page
    ```

## アプリの機能
* Bucket の一覧表示
    - Bucket の作成
    - Bucket の削除
* Object の一覧表示
    - Object のアップロード (Multer で取得した MIME を ContentType にセット)
    - Object の削除
    - Object の表示 (ContentType をレスポンスにセット)

## まとめ
* `ibm-cos-sdk` により、COS の Bucket および Object を操作できた。
    - Bucket 名は IBM Cloud 内でユニークにする必要がある。
    - Bucket を削除した後、同名で再作成すると 409 エラー (BucketAlreadyExists) になる。完全に削除するのに 十数分を要する模様。
    - Object を作成 (putObject) する際、ContentType をセットしておけば、Object の取得 (getObject) 時にも利用できる。
* Cloud Foundry アプリからアクセスする場合は Public な Endpoint を指定する。(VCAP_SERVICES にはセットされていない値)
    - https://console.bluemix.net/docs/services/cloud-object-storage/basics/endpoints.html#select-regions-and-endpoints
    - エンドポイントにより選択できるストレージクラスが異なるので注意すること。
        - https://console.bluemix.net/docs/services/cloud-object-storage/basics/classes.html#use-storage-classes
*  COS は Cloud Foundry Services ではなく Resources のため注意すること。
    - IBM Cloud Dashboard では Services に分類される。
    - CLI でサービスインスタンスを作成する場合は、`bx resource service-instance-create` コマンドで作成する。
        - `bx service create` だと、指定した名前でエイリアス、ランダム文字列でサービスインスタンスが作成されるが、マニュアルに記載されていないので使用しない方が良いだろう。
* Cloud Foundry アプリと COS サービスインスタンスは直接バインドできないのでエイリアスを作成する必要がある。
    - VCAP_SERVICES を介さず、直接 COS サービスインスタンスにアクセスする場合は、サービスキーを作成する。

        ```
        $ npm run key_create
        ```
        > 削除コマンドも用意している。 `npm run key_delete`
