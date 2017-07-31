<template>
<transition name="slide">
  <musicList :songs='songs' :title='title' :bgImages="bgImages"></musicList>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/Song'
import musicList from 'components/music-list/music-list'
export default {
	data(){
		return{
			songs:[]
		}
	},
	components:{
		musicList
	},
    computed:{
    	title(){
           return this.singer.name
    	},
    	bgImages(){
    		return this.singer.avatar
    	},
      ...mapGetters([
          'singer'
      	])
    },
    created(){
    	this._getDetail()
    	console.log(this.singer);
    },
	methods:{
	   _getDetail(){
	   	if(!this.singer.id){ //如果没有这个数据  就返回列表页
	   		this.$router.push('/singer')
	   		return
	   	}
	   	getSingerDetail(this.singer.id).then((res)=>{
	   		 if(res.code === ERR_OK){
               this.songs = this._normalizeSongs(res.data.list)
               console.log(this.songs);
	   		 } 
	   	})
	   },
	   _normalizeSongs(list){
	   	 let ret = [];
	   	 list.forEach((item)=>{
            let {musicData} = item;
            if(musicData.songid && musicData.albummid){
                ret.push(createSong(musicData));
            }
	   	 }) 
	   	 return ret
	   }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.slide-enter-active,.slide-leave-active{
	transition:all .6s;
}
.slide-enter,.slide-leave-to{
  transform:translate3d(100%,0,0);
}

</style>
