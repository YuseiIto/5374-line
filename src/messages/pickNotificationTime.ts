
// 時刻設定メッセージ
import * as line from '@line/bot-sdk';

export default (selectedAreaName:string):line.FlexMessage=>{
 
 return {
  type:'flex', 
  altText:'通知時刻を設定してください',
  contents:{
  "type": "bubble",
  "direction": "ltr",
  "header": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "通知時刻を設定",
        "weight": "bold",
        "size": "xl",
        "align": "start",
        "contents": []
      },
      {
        "type": "text",
        "text": "ごみの日情報の通知を受け取る時刻を設定します。",
        "wrap": true,
        "contents": []
      }
    ]
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "datetimepicker",
          "label": "時刻を設定",
          "data": JSON.stringify({type:'notificationTime',selectedAreaName}),
          "mode": "time",
          "initial": "07:55",
          "max": "23:59",
          "min": "00:00"
        },
        "style": "primary"
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "text",
        "text": "※通知は設定した時間から5分程度前後して配信される場合があります",
        "size": "sm",
        "margin": "sm",
        "wrap": true,
        "contents": []
      }
    ]
  }
 }
}
}

