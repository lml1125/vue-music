import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song{
   constructor({id,mid,singer,name,album,duration,images,url}){
      this.id = id
      this.mid = mid
      this.singer = singer
      this.name = name
      this.album = album
      this.duration = duration
      this.images = images
      this.url = url
   }
   getLyric() {
   	if(this.lyric){ //如果已经有歌词了 直接返回就行了
       return Promise.resolve(this.lyric)
   	}
   	return new Promise((resovle,reject)=>{
   		getLyric(this.mid).then((res)=>{
	    	if(res.retcode === ERR_OK){
	    		this.lyric = Base64.decode(res.lyric)
	    		console.log(this.lyric);
	            resovle(this.lyric);
	    	}else{
	    		reject('no lyric');
	    	}
      })
   	})
    

    
  }
}

export function createSong(musicData){
   return new Song({
   	   id:musicData.songid,
   	   mid:musicData.songmid,
   	   singer:filterSinger(musicData.singer),
   	   name:musicData.songname,
   	   album:musicData.albumname,
   	   duration:musicData.interval,
   	   images:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
       url:`https://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
   })
}

function filterSinger(singer){
  let ret =[]
  if(!singer){
    return ''
  }
  singer.forEach((s)=>{
    ret.push(s.name);
  })

  return ret.join('/')
}
