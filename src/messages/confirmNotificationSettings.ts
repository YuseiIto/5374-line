
// 設定確認メッセージ
import * as line from '@line/bot-sdk';

export default (selectedAreaName:string,notificationTime:string):line.TemplateMessage=>{
return {
 "type": "template",
 "altText": "設定内容を確認してください",
 "template": {
   "type": "confirm",
   "actions": [
     {
       "type": "postback",
       "label": "はい",
       "text": "はい",
       "data": JSON.stringify({type:'confirmNotificationSettings',confirm:true,selectedAreaName,notificationTime})
     },
     {
       "type": "postback",
       "label": "いいえ",
       "text": "いいえ",
       "data": JSON.stringify({type:'confirmNotificationSettings',confirm:false})
     }
   ],
   "text": `${selectedAreaName}のごみ収集情報を毎日${notificationTime}にお知らせします。よろしいですか?`
 }
}}
