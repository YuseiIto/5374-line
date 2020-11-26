import * as line from '@line/bot-sdk';
import followMessage from './messages/followMessage'

// 環境変数を .envファイルから読み込み
require('dotenv').config()
const config:line.ClientConfig = {
 channelSecret: process.env.LINE_CHANNEL_SECRET!, 
 channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!
}

const client:line.Client = new line.Client(config)

export default async (event:line.WebhookEvent)=> {

 let message:line.Message;

  if (event.type=="follow") {
   // 友達追加イベント
    message = followMessage();
  }else{
   return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, message)
}
