import fetchCSV from './fetchCSV'
import CSVToObject from './CSVToObject'


/* 今日に該当するごみを調べる 
 * 原則、https://github.com/codeforkanazawa-org/5374/blob/master/LOCALIZE.md#area_dayscsv　にある area_days.csvの構造に準ずる
 * ただし、「金沢仕様の休止期間なら週をずらす処理」は無効なものとして計算します。
 * 「毎週X曜日」「毎月第NX曜日」「収集が不定期な場合」「毎月収集がないごみ」の4パターンに対応します
 */


 // year年month月 第n day曜日(dayは0~6) のdateオブジェクトを返却する 
export function getNthXDay(year:number,month:number,day:number,n:number):Date{

 const firstDayOfMonth=new Date(year+'/'+month+'/1').getDay()

 const res=new Date(`${year}/${month}/${1+((7-firstDayOfMonth+day)%7)+7*(n-1)}`)

 if(res.getFullYear()!==year||res.getMonth()!==res.getMonth()){
  throw new Error("Out of range")
 }
 return res
 
}

// Dateオブジェクトの年,月,日が同じであることを調べる
export function isSameDay(a:Date,b:Date):Boolean{
return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate() === b.getDate()
}

// Dateオブジェクトの年,月,日が同じであることを調べる
export function isDateMatchesToSingleExpression(expression:string,date:Date):Boolean{

 if(/^[日月火水木金土]$/.test(expression)){
  // 曜日だけ指定したパターン
 const dates=['日','月','火','水','木','金','土']
 if(dates[date.getDay()]===expression){
  return true;
 }else{
  return false;
 }

 }else if (/^[日月火水木金土][1-5]$/.test(expression)){

  const dates=['日','月','火','水','木','金','土']

  const day=dates.indexOf(expression.substring(0,1))
  const index=Number(expression.substring(1,2))
  
  try{
  return isSameDay(date,getNthXDay(date.getFullYear(),date.getMonth()+1,day,index))
  }catch(e){
   if(e.message==='Out of range'){
    return false
   }else{
    throw e;
   }
  }

 }else if(/^[0-9]{8}$/.test(expression)){
  // 収集が不定期な場合
  const d=new Date(`${expression.substring(0,4)}/${expression.substring(4,6)}/${expression.substring(6,8)}`)

  return isSameDay(d,date)
 }else{
  throw new Error("Invalid area_days Expression")
 }

}



export function isDateMatchesToExpression(longExpression:string,date:Date):Boolean{

 let expressionsStr=''

 if(longExpression.includes(':')){
   const [expr,monthsStr]=longExpression.split(':')
   const months=monthsStr.split(' ')

   if(months.indexOf(String(date.getMonth()+1))==-1){
    // 月が該当しない
    return false;
   }

    expressionsStr=expr;
 }else{
   expressionsStr=longExpression
 }
 

 const expressions=expressionsStr.split(' ')
 
 for(const expr of expressions){
  if(isDateMatchesToSingleExpression(expr,date)){
   return true;
  }
 }

 return false;
}

export default async function compute(date:Date,areaName:string):Array<string>{
 const sourceData:any=CSVToObject(await fetchCSV())

 if(!sourceData[areaName]){
  throw new Error("Such area doesn't exsist")
 }

 const rules=sourceData[areaName]
 delete rules['地名']
 delete rules['センター（center.csvを使わない場合は空白化）']

 const trashesToday=[];

 for(const trashType in rules){
  if(isDateMatchesToExpression(rules[trashType],date)){
   trashesToday.push(trashType)
  }
 }

 return trashesToday

}
