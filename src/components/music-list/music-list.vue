<template>
  <div class="music-list">
     <div class="back" @click="back">
       <i class="icon-back"></i>
     </div>

     <h1 class="title" v-html="title"></h1>

     <div class="bg-image" :style="bgStyle" ref="bgimg">
        <div>
        </div class="filter">
     </div>
     <div class="bg-layer" ref="layer"></div>
    <Scroll :probeType='probeType' 
      :listenScroll='listenScroll'
      :data="songs" 
      @scroll = 'scroll'
      class="list" 
      ref="list"> 
       <div class="song-list-wrapper">
         <Songlist @select="select" :songs='songs'></Songlist>
       </div>
    </Scroll>

  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Songlist from 'base/song-list/song-list'
import {mapActions} from 'vuex'
const RESERVED_HEIGHT = 40
export default {
	data(){
		return{
			scrollY :0
		}
	},
  props:{
     bgImages:{
     	 type: String,
     	 default:''
     },
     songs:{
     	 type: Array,
     	 default:[]
     },
     title:{
     	type: String,
     	 default:''
     }
  },
  watch:{
  	scrollY(newY){
  		let tranlateY = Math.max(this.minTranslateY,newY)
  		 let zIndex = 0;
  		
  		this.$refs.layer.style['transform'] = `translate3d(0,${tranlateY}px,0)`
  		this.$refs.layer.style['webkitTransform'] = `translate3d(0,${tranlateY}px,0)`

        if(newY < this.minTranslateY){//滚动到顶部
            zIndex = 10;
            this.$refs.bgimg.style.paddingTop = 0;
            this.$refs.bgimg.style.height = `${RESERVED_HEIGHT}px`
        }else{
        	this.$refs.bgimg.style.paddingTop = '70%';
            this.$refs.bgimg.style.height = 0
        }
       

       //往下啦图片变大 往上高斯模糊
  		let scale = 1;
  		let scaleall = Math.abs(newY / this.imagesHeight)
        if(newY > 0){
           scale = 1 + scaleall
           zIndex = 10;
        }else{
        	
        }
         this.$refs.bgimg.style.zIndex = zIndex
        this.$refs.bgimg.style['transform'] = `scale(${scale})`
  		this.$refs.bgimg.style['webkitTransform'] = `scale(${scale})`

  		//
 

  	}
  },
  components:{
  	Songlist,
  	Scroll
  },
  computed:{
  	 bgStyle(){
  	 	return `background-image:url(${this.bgImages})`
  	 }
  },
  mounted(){
  	this.imagesHeight = this.$refs.bgimg.clientHeight;
  	this.minTranslateY = -this.imagesHeight + RESERVED_HEIGHT
  	this.$refs.list.$el.style.top = `${this.imagesHeight}px`	
  },
  created(){
  	this.probeType = 3;
  	this.listenScroll = true
  },
  methods:{
    scroll(pos){
    	//console.log("子组件传过来的");
    	//console.log(pos);
        this.scrollY = pos.y
    },
    back(){
      this.$router.back();
    },
    select(item,index){
       console.log("item",item);
       this.selectPlay({
         list:this.songs,
         index
       })
    },
    ...mapActions([
        'selectPlay'
    ])
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.music-list{
	position:fixed;
	z-index:505;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background:#31c27c;
}

.back{
  position:absolute;
  top:15px;
  left:15px;
  z-index:50;
}
.icon-back{
  display:block;
  width:15px;
  height:15px;
  border-left:1px solid #fff;
  border-bottom:1px solid #fff;
 transform:rotate(45deg);
}

.title{
	 position: absolute;
      top: 10px;
      left: 10%;
      z-index: 40;
      width: 80%;
	z-index:11;
	color:#fff;
}
.bg-image{
	position:relative;
	width:100%;
	height:0;
	padding-top:70%;
	transition-origin:top;
	background-size:cover;
}
.play-wrapper{
	position:absolute;
	bottom:20px;
	z-index:50;
	width:100%;
}
.play{
	box-sizing:border-box;
	width:135px;
	padding:7px 0;
	margin:0 auto;
	text-align:center;
	border:1px solid #d00;
	color:#d00;
	border-radius:100px;
	font-size:0;
}
.icon-play{

}
.list{
	z-index:6;
	position:fixed;
	top:0;
	bottom:0;
	width:100%;
}
.song-list-wrapper{
	padding:20px 30px;
}

.bg-layer{
	position:relative;
	height:100%;
	background:#31c27c;
	z-index:5;
}

</style>
