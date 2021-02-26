/* dev.ts
 * 開発時やサーバレスでないアーキテクチャでの動作のためのエントリポイント
 * ExpressでAPIを提供します
 */

import express from 'express';
import * as line from '@line/bot-sdk';
import deliverNotification from './deliverNotification';

// 各メッセージのハンドラを読み込み
import messageRoute from './messageRoute';

const PORT: number = Number(process.env.PORT) || 5000;

// 環境変数を .env ファイルより読み込み
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.LINE_CHANNEL_SECRET) {
  throw new Error(
    'Environment variable LINE_CHANNEL_SECRET is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

if (!process.env.LINE_CHANNEL_ACCESS_TOKEN) {
  throw new Error(
    'Environment variable LINE_CHANNEL_ACCESS_TOKEN is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

const config: line.MiddlewareConfig = {
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const app: express.Express = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(messageRoute)).then((result) =>
    res.json(result)
  );
});

app.get('/', (req, res) => {
  res.send('Hello! 5374.jp for Ritto at LINE is now working!');
});

app.listen(PORT);
console.log(`Server running at ${PORT}`);

setInterval(deliverNotification, 60 * 1000);
