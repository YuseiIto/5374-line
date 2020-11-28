/* dev.ts
 * 開発時やサーバレスでないアーキテクチャでの動作のためのエントリポイント
 * ExpressでAPIを提供します
 */

import express from "express"
import * as line from '@line/bot-sdk';
import deliverNotification from './deliverNotification'

// 各メッセージのハンドラを読み込み
import messageRoute from "./messageRoute"

const PORT:Number = Number(process.env.PORT) || 5000

// 環境変数を .env　ファイルより読み込み
require('dotenv').config()

const config:line.MiddlewareConfig = {
  channelSecret: process.env.LINE_CHANNEL_SECRET!, 
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!
};

const app:express.Express = express()

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(messageRoute)).then((result) =>
    res.json(result)
  );
});

app.listen(PORT)
console.log(`Server running at ${PORT}`)

setInterval(deliverNotification,60*1000)
