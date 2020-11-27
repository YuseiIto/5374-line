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

}
