import computeTrashToday from './computeTrashToday'
import PostgreSQLDriver from '../handlers/db/postgres/postgreSQLDriver'
import * as line from '@line/bot-sdk'

export async function generateMessageTextOfArea(areaName:string,date?:Date):Promise<string>{ 
 
 let targetDate=date||new Date();
 let text=''

 if(targetDate.getHours()<8){
  text="今日は"
 }else{
  text="明日は"
  targetDate.setDate(targetDate.getDate()+1)
  targetDate.setHours(0)
 }

 const trashesArray= await computeTrashToday(targetDate,areaName)

 if(trashesArray.length>0){
 for(const trash of trashesArray){
  text+=`、${trash}`
 }

  text+="の日です! \n ごみの出し忘れにご注意ください!"
 }else{
  text+="ごみの収集はありません!"
 }

 return text
}


require('dotenv').config()
const config:line.ClientConfig = {
 channelSecret: process.env.LINE_CHANNEL_SECRET!, 
 channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!
}

const client:line.Client = new line.Client(config)


export default async (date?:Date)=>{
 
 const now=date||new Date()
 const db=new PostgreSQLDriver()
 const areaUsers=await db.getUsersToNotify(`${('00'+now.getUTCHours()).slice(-2)}:${('00'+now.getUTCMinutes()).slice(-2)}:00`)
 
 for(const area in  areaUsers){
  const {users}=areaUsers[area]
  
  const text=await generateMessageTextOfArea(area,now)

  for(const user of users){
   await client.pushMessage(user,{type:'text',text})
  }
 }
}
