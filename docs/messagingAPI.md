# LINE Messaging APIについて

5374.jp for Ritto at LINEは [LINE Messaging API](https://developers.line.biz/ja/docs/messaging-api/)を利用したチャットボットです。

そのため、[LINE Developers Console](https://developers.line.biz/console/) 上に Messaging APIに対応したチャネルを作成し、**チャネルアクセストークン** と **チャネルシークレット** をそれぞれ`.env`ファイルに環境変数として記述して利用しています。

## チャネルの作成
1. [LINE Developers Console](https://developers.line.biz/console/) 新しくProviderを作ります。 "Recently visited channels"の下に、"Providers" という見出しがあるので、 `Create` ボタンをクリックします
2. Provider nameは任意のもので結構です。このBotのサービス提供主体を表す名前がいいでしょう。(*e.g.* "Code for XX" , "5374.jp for 〇〇 運営チーム")
3. Providerができたら、`Create a Messaging API channel` をクリックします
4. チャネルの設定です。 以下のように設定します。

|Field|value|note|
|---|---|---|
| Channel icon | `assets/icon.png` | `assets/icon.png`を提供していますが、任意の画像で構いません。|
| Channel name | 5374.jp for [地域名] | 雑に言うと「アカウント名」にあたるものです| 
| Channel description | `package.json` の`description`フィールドをコピペ|Botの説明です。栗東市版で用いている文章を`package.json` の`description`フィールドに入れていますのでよければご利用ください|
|Category| `生活関連サービス` |　正直 @yuseiito はよくわかっていません|
|Subcategory| `その他生活関連サービス` | 正直 @yuseiito はよくわかっていません|
|Email address|任意のメールアドレス|LINEさんからの開発者向けなお知らせが届きます|


5. *I have read and agree to the LINE Official Account Terms of Use*  と *I have read and agree to the LINE Official Account API Terms of Use* をそれぞれ読んで同意します。同意できない方は...残念ですがLINE Botは作れません
6. `Create`をクリックします

## チャネルアクセストークンとチャネルシークレット

### チャネルアクセストークン

チャネルのページの`Messaging API` タブから取れます。
`.env` ファイルに`LINE_CHANNEL_ACCESS_TOKEN=ながーいトークン`の形で指定してください。


### チャネルシークレット

チャネルのページの`Basic Settings` タブから取れます
`.env` ファイルに`LINE_CHANNEL_SECRET=チャネルシークレット`の形で指定してください。
