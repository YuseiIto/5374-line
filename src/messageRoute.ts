import * as line from '@line/bot-sdk';
import followMessage from './messages/followMessage'
import selectArea from './messages/selectArea';
import selectTime from './messages/pickNotificationTime'
import confirmNotificationSettings from './messages/confirmNotificationSettings';

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
  }else if (event.type=="message" && event.message.type == "text") {
    // テキストメッセージ

    if(event.message.text=='通知の設定'){
      message=selectArea()
    }else{
      return Promise.resolve(null)
    }
  }else if(event.type=="postback" && event.postback.data){
    const postback=JSON.parse(event.postback.data)
    switch(postback.type){
      case 'selectArea':
        message=selectTime(postback.selectedAreaName)
        break;
      case 'notificationTime':
        message=confirmNotificationSettings(postback.selectedAreaName,event.postback.params!.time!)
        break;
      default:
        message={type:'text',text:'Error: Unknown postback action'}
    }
  }else{
   return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, message)
}
