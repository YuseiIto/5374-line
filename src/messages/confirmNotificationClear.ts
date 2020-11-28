
// 通知解除確認メッセージ
import * as line from '@line/bot-sdk';

export default ():line.TemplateMessage=>{
return {
 "type": "template",
 "altText": "本当に通知を解除しますか?",
 "template": {
   "type": "confirm",
   "actions": [
     {
       "type": "postback",
       "label": "はい",
       "text": "はい",
       "data": JSON.stringify({type:'confirmNotificationClear',confirm:true})
     },
     {
       "type": "postback",
       "label": "いいえ",
       "text": "いいえ",
       "data": JSON.stringify({type:'confirmNotificationClear',confirm:false})
     }
   ],
   "text": `再び設定するまでごみの日通知が届かなくなります。通知を解除しますか?`
 }
}}
