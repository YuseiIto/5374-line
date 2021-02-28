# 5374.jp for Ritto at LINE

[5374.jp for Ritto](https://ritto.5374.jp/)のLINE-Bot版。ごみの日情報の通知を配信します。


## 5374.jp for Ritto at LINEについて

### 5374.jp for Rittoとは

5374.jp for Rittoは、[Code for Kanazawa](http://www.codeforkanazawa.org/) の手で2013年9月に誕生したごみ出し情報アプリ[5374(ごみなし).jp](http://5374.jp/)の滋賀県栗東市版です。

5374.jpは石川県金沢市から展開を開始し、現在日本各地の有志により水平展開されています。

参考: [5374.jp - 各地への広がり](http://5374.jp/#map_canvas)


### 5374.jp for Ritto at LINE

5374.jp for Ritto at LINEは、5374.jp for RittoのLINE版です。
LINEでその日(または次の日)のごみの日情報を通知します。
5374.jp at LINEも、5374.jp 本体と同様に各地に水平展開ができるよう、5374.jp本体に使用するデータ `area_days.csv` の形式(参照: [5374をあなたの地域に導入するには - 仕様](https://github.com/codeforkanazawa-org/5374/blob/master/LOCALIZE.md#area_dayscsv))に対応し、すでに5374.jpが導入されている地域には特に簡単に導入できるよう実装されています。

ぜひあなたの地域の5374にもLINE版を合わせて実装しましょう。


## 起動の仕方

### 開発時

```zsh
yarn dev:watch
ngrok http 5000
```

- ngrokのURLをLINEのWebhook URLに設定してください

### 本番(Express単体)

1. `.env.template`　を `.env` にリネームして各環境変数を設定します
2. 以下のコマンドを叩きます

```zsh
yarn build
yarn start
```
- 0.0.0.0:5000 にExpressが立ち上がります。

### 本番(Express×Docker)

1. `.env.template`　を `.env` にリネームして各環境変数を設定します
1. `proxy.env.template`　を `proxy.env` にリネームして各環境変数を設定します
2. 以下のコマンドを叩きます


```zsh
docker network create --driver bridge shared
docker-compose -f proxy.docker-compose.yml up -d
docker-compose -f docker-compose up -d
```

3. 0.0.0.0:8888にExpressが立ち上がります。

