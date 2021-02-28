# AWS CDKによるインフラを利用する

5374.jp atでは、標準でAWS CDKによる[Infrastructure As a Code](https://ja.wikipedia.org/wiki/Infrastructure_as_Code)をサポートしています。

経済的に余裕がないシビックテッカーでも、AWSアカウントの無料利用枠の範囲を活用して5374.jp at LINEを運用することが可能です。

### AWS CDKとは何か
AWS CDKは、コードの記述によりAWSのインフラ設定を行うIaCフレームワークです。
これにより、異なるAWS環境にも同等のインフラを手軽にプロビジョンすることができます。



## AWS CDKによるデプロイ

### 0.前提
- Node.js(およびnpm)がインストールされている
- yarnがインストールされている
- AWS CLIがインストールされている
- gitがインストールされている

筆者は、以下の環境で動作を確認しています。(筆者は都合により以下のようにバージョンがやや古い環境になっていますが、例えばNode 14系などでも同等に動作するものと思われます。)

```zsh
% node --version
v10.19.0
% npm --version
6.13.4
% yarn --version
1.22.10
% aws --version
aws-cli/2.1.27 Python/3.9.2 Darwin/19.6.0 source/x86_64 prompt/off
```
### 1.AWSアカウントを作成する
AWS(Amazon Web Service)のアカウントを作成します。
このステップは、すでにAWSアカウントをお持ちの方は飛ばしていただいて構いません。
お持ちでない方は、[Amazonによるドキュメント](https://aws.amazon.com/jp/register-flow/)を参考に、アカウントを作成してください。

### 2.AWS CLIを設定する
このステップでは、AWSアカウント上にIAMユーザを作成し、credentialsをAWS CLIに登録します。[このページ](https://summit-online-japan-cdk.workshop.aws/15-prerequisites/200-account.html)が参考になります。


### 3.このリポジトリを手元に準備する
リポジトリをクローンして、yarn で依存関係をインストールしてください。


### 4.AWS CDKをインストールする

Local installで済ませたい気持ちもありますが、AWS CDKは現在も発展途上であり、どこでバグを踏むか怪しいところもありますので、以下のようにglobal installすることをおすすめします。

```
npm install -g aws-cdk
```


### 5.AWS CDKを設定する
AWS CDKを用いてインフラをプロビジョニングする準備として以下のコマンドを実行します。実行はアカウントごとに一回で構いません。

```
cdk boostrap
```

### 6. 5374.jp at LINEを設定する
5374.jp at LINE本体を、あなたが導入したい地域の設定に合わせてプロビジョニングします。詳細は [LOCALIZE.md](./LOCALIZE.md)を参照してください。
なお、データベースはdynamodbを選択されることをおすすめしています。

※DynamoDB以外を使う場合、そのためのドライバのコーディングや、CDKのスタック設定からの

### 7.AWS CDKでデプロイする

最後に、リポジトリ内で以下のコマンドを叩いてデプロイします。

```zsh
cdk deploy
```
