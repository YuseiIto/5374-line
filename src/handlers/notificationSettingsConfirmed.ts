// 設定確認後
import * as line from '@line/bot-sdk';
import PostgreSQLDriver from './db/postgres/postgreSQLDriver'

export default async function (userID:string,area:string,notificationTime:string):Promise<line.TextMessage> {
 const db:PostgreSQLDriver = new PostgreSQLDriver();
 await db.configureUser(userID,notificationTime,area).catch(e=>{throw e})
 return {type:'text',text:`通知が設定されました! これから毎日${notificationTime}に通知をお届けします!`}
}
