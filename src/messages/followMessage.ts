// 友達登録時のメッセージ
import * as line from '@line/bot-sdk';

export default ():line.TextMessage=>{
 return {
 type: "text",
 text: "お友達追加追加ありがとうございます🙌 \n5374 .jp @LINE for Rittoは、https://ritto.5374.jp で提供しているデータをベースに、滋賀県栗東市のゴミの日情報🗓をLINEで通知するサービスです!🔔\n\nはじめにメニューの「通知の設定」から通知を設定しましょう💨 \n ※メニューはPC/Mac版LINEではご利用いただけません🙇‍♂️"
}}
