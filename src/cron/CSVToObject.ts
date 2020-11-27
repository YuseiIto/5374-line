export default(CSVString:string):Object=>{

 const lines:Array<string>=CSVString.split(/[\r\n]+/);

 if(lines[0]===''){
  throw new Error("Empty first line")
 }

 const fields=lines[0].split(',')

 if(!fields.includes('地名')){
  throw new Error("No 地名 column is included")
 }

 // ヘッダ行を消す
 lines.shift()

 const result=[];

 for(const line of lines){
   if(line!==''){
   const columns=line.split(',')

   if(columns.length!==fields.length){

    throw new Error("Length error")
   }

   const rowObj:any={}

   for(let i:number=0;i<fields.length;i++){
    rowObj[fields[i]]=columns[i]
   }

   result[rowObj['地名']]=rowObj
  }
 }

 return result

}
