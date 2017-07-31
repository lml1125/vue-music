import originJSONP from 'jsonp' //进入jsonp
                         //url地址 参数 option
export default function jsonp(url,data,option){
  url += (url.indexOf("?") < 0 ? "?" : "&") + param(data);	
  
  return new Promise((reslove,reject)=>{
   originJSONP(url,option,(err,data) =>{
     	 if(!err){//成功时
            reslove(data)
     	 }else{//失败时
     	 	reject(err)
     	 }
     })
  })
}

function param(data){
	let url=''
	for(var k in data){
        let value = data[k] !==undefined ? data[k] : ''
        url +=`&${k}=${encodeURIComponent(value)}`
	}
	return url ? url.substring(1) : ''
}