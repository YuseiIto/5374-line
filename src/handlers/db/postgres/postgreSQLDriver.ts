import * as pg from "pg";
import db from "./db"


export default class PostgreSQLDriver {
 
 public async insertUser(userID:string,time:string,area:string){

  if(!/U[0-9a-f]{32}/.test(userID)){
   // Invalid UserID
   throw new Error("Invalid userID");
  }

  if(!/[0-9]{2}\:[0-9]{2}/.test(time)){
   // Invalid UserID
   throw new Error("Invalid notification time");
  }

  // TODO: areaのvalidationも将来的に入れたい!
  
  await db.query(
   {text:"INSERT INTO users(user_id,time,area,modify_date) VALUES($1,$2,$3,current_timestamp)",values:[userID,time,area]
  }).catch(e=>{throw e}); 
 }

 public async getUsersToNotify(time:string):Promise<Array<{users:Array<string>}>>{
  if(!/[0-9]{2}\:[0-9]{2}/.test(time)){
   // Invalid UserID
   throw new Error("Invalid notification time");
  }
  
  const res=await db.query(
   {text:"SELECT * from users WHERE time=$1",values:[time]
  }).catch(e=>{throw e}); 

  const result:any={}

  for(const elm of res.rows){

   if(elm.area==='disabled'){
    continue
   }

   if(result[elm.area]===undefined){
    result[elm.area]={users:[]}
   }
   result[elm.area]['users'].push(elm.user_id)
  }

  return result
 }


 public async clearNotification(userId:string){
  await db.query(
   {text:"UPDATE users SET area='disabled' WHERE user_id=$1",values:[userId]
  }); 
 }
}
