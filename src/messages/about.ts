import * as line from '@line/bot-sdk'
export default():line.FlexMessage=>{
 return {
  type:'flex',
  altText:'開発者について',
  contents:{
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "開発者について",
          "weight": "bold",
          "size": "md",
          "color": "#FFFFFF",
          "align": "start",
          "contents": []
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": "https://avatars2.githubusercontent.com/u/23429049?v=4",
              "flex": 3
            },
            {
              "type": "box",
              "layout": "vertical",
              "flex": 8,
              "offsetStart": "xl",
              "contents": [
                {
                  "type": "text",
                  "text": "Yusei Ito",
                  "weight": "bold",
                  "size": "md",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "栗東市版コア開発者",
                  "color": "#555555",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "me@yuseiito.com",
                  "contents": []
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "プライバシーポリシー",
            "uri": "https://hackmd.io/@yusei/H1dmn3ksv"
          },
          "style": "link"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "GitHub",
            "uri": "https://github.com/YuseiIto/5374-line/"
          },
          "style": "link"
        }
      ]
    },
    "styles": {
      "header": {
        "backgroundColor": "#521C72"
      }
    }
  }}
}
