# あなたの街に5374.jp at LINE を移植する

## 移植の手順
### 0.5374.jpを用意する
LINE版をあなたの街に移植するには、Code for Kanazawaのウェブアプリ5374.jpが移植されていることが必要です。
5374.jp at LINEは、5374のデータ(主に`area_daya.csv`)を参照する機構になっています。

### 1. LINE Developersのchannelを用意する
 LINE Messaging API関連の情報は こちらの[ドキュメント](./RichMenu.md)に一部記載しています。
 Messaging APIチャンネルを作成して、channel secret や access tokenを入手します。

### 1.このリポジトリをforkする
このリポジトリをforkしてください。

### 2.メッセージを用意する
エリア選択などのメッセージを記述します。
`src/messages/` の中にメッセージ情報があります。

これが記述できれば、作業はほぼ終わったようなものです。

### 3. 構成を決めてデプロイ!

### 3.1　データベースを選択する
[db/db.ts](../src/handlers/db/)で使いたいデータベースのドライバを選択してください。

インフラの構成によってここからの作業が変わります

#### 3.2b b0.AWSで使う
[AWS CDKで使うドキュメント](./aws-cdk.md)を参考に操作してください。

### 3.2a Dockerで任意のサーバに立ち上げる
[README](../README.md)に使い方が書いてあります。また、PostgreSQLの設定は[database.md](database.md)を参考にしていただけます。



## ご注意
- 5374 at LINEは、`center.csv` には対応していません。そのため、センター休止期間と設定された期間であっても通知が飛んでしまう場合があります。
