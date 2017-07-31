<template>
  <div class="player" v-show="playList.length > 0">
  <!--
  @enter='enter'
               @after-enter='afterEnter'
               @leave='leave'
               @sfter-leave='afterLeave'-->
   <transition name="normal">
    <div class="normal-player" v-show="fullScreen">
        <div class="background">
           <img width="100%" height="100%" :src="currentSong.images" />
        </div>
        <div class="top">
            <div class="back" @click="back">
              <i class="icon-back"></i>
            </div>
            <h1 class="title" v-html="currentSong.name"></h1>
            <h2 class="subtitle" v-html='currentSong.singer'></h2>
        </div>


        <div class="middle" 
          @touchstart.prevent='middleTouchStart'
          @touchmove.prevent='middleTouchMove'
          @touchend='middleTouchEnd'
          >
           <div class="middle-l">
             <div class="cd-wrapper" ref='cdwrapper'>
                <div class="cd" :class="cdCls">
                  <img class="images"  :src="currentSong.images"/>
                </div>
             </div>
            <div class="playing-lyric-wrapper">
              <!--<div class="playing-lyric">{{playingLyric}}</div>-->
            </div>
          </div>

        <!--
          <div class="middle-r" ref="lyricList">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                 <p ref="lyricLine" 
                 class="text"
                 :class="{'current':currentLimeNum === index}"
                  v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </div>
        -->



          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum ===index}"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
          
        </div>


        <div class="bottom"> 
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>


         <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
  

          <div class="operators">
             <div class="icon i-left" @click="changeMode">
               <i class="iconfont" :class="iconMode"></i>
             </div>
             <div class="icon i-left" :class="disableCls">
               <i class="iconfont icon-kuaitui" @click="prev"></i>
             </div>
             <div class="icon i-center" :class="disableCls">
               <i class="iconfont" :class="playIcon" @click="togglePlay"></i>
             </div>
             <div class="icon i-rigt" :class="disableCls">
               <i class="iconfont icon-kuaijin" @click="next"></i>
             </div>
             <div class="icon i-right">
               <i class="iconfont icon-mulu"></i>
             </div>
          </div>
        </div>
    </div>
  </transition>

  <transition name="mini" >
    <div class="mini-player" v-show="!fullScreen" @click="open">
       <div class="icon"><img width="40" height="40" :class="cdCls" :src="currentSong.images"/></div>
       <div class="text">
         <h2 class="name" v-html='currentSong.name'></h2>
         <p class="desc" v-html='currentSong.singer'></p>
       </div>
       <div class="control"></div>
       <div class="control">
         <i class="iconfont" :class="playIcon"></i>
       </div>

    </div>
 </transition>
 <!--
 <playlist></playlist>
 -->
 <!--当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。-->
 <audio ref="audio" :src='currentSong.url'
   @canplay='ready' 
   @error='error'
   @timeupdate='updateTime'
   ></audio>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import ProgressBar from 'base/progress-bar/progress-bar'  //进度条
import scroll from 'base/scroll/scroll'
import playlist from 'components/player/playlist' //列表
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import Lyric from 'lyric-parser' //歌词解析
//import {prefixStyle} from 'common/js/dom'
export default {
  data(){
    return {
      songReady:false,
      currentTime:0,
      currentLyric:null,
      currentLineNum:0,
      currentShow:'cd'

    }
  },
  components:{
  	ProgressBar,
  	playlist,
    scroll
  },
  created(){
    this.touch={};
  },
  computed:{
    cdCls(){
      return this.playing ? 'play':'paused'
    },
    iconMode(){
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ?'icon-loop' :'icon-random-answer'  
    },
    playIcon(){
      return this.playing ? 'icon-zanting':'icon-bofang'
    },
    disableCls(){
       return this.songReady ? '':'disable'
    },
    percent() {
    	      // 播放比例  =  播放的时间 / 总的时间
        return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
     'fullScreen',
     'playList',
     'currentSong',
     'playing',
     'currentIndex',//播放索引  第几首歌曲
     'mode',//播放模式
     'sequenceList' //播放模式列表
    ])
  },
  watch:{
     currentSong(newSong,oldSong){
      if(newSong.id == oldSong.id){ //播放模式改变了，如果id没变 什么都不做
         return
      }
       this.$nextTick(()=>{
          this.$refs.audio.play();
          this.getLyric();
       })
     },
    
     playing(newPlaying){
        const audio = this.$refs.audio;
        this.$nextTick(()=>{
          newPlaying ? audio.play() : audio.pause()
        })
     }
  
   
  },
  methods:{
     back(){
      this.setFullScreen(false)
     },
     open(){
      this.setFullScreen(true)
     },
     /*
     enter(el,done){ //done调到afterEnter
       const {x,y,scale} = this._getPosAndScale();
       let animation = {
         0:{
           transform :`translate3d(${x}px,${y}px,0) scale(${scale})`
         },
         60:{
           transform :`translate3d(0,0,0) scale(1,1)`
         },
         100:{
           transform :`translate3d(0,0,0) scale(1)`
         }
       }
       animations.registerAnimation({
          name:'move',
          animation,
          presets: { 
    　　　　duration: 400, // 持续时间
    　　　　easing: 'linear' // 动画的效果 default easing
　     　}
       })

       animations.runAnimation(this.$refs.cdwrapper,'move',done)
     },
     afterEnter(){
      animations.unregisterAnimation('move')
      this.$refs.cdwrapper.style.animation = ''
     },
     leave(el,done){//done调到afterLeave
       this.$refs.cdwrapper.style.transition = 'all 0.4s'
       const {x,y,scale} = this._getPosAndScale();
       this.$ref.cdwrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
       this.$ref.cdwrapper.addEventListener('transitionend',done)
     },
     afterLeave(){
       this.$refs.cdwrapper.style.transition = ''
       this.$ref.cdwrapper.style.transform = ''
     },
     */
     _getPosAndScale(){
       const targetWidth =40
       const paddingLeft = 40
       const paddingBottom =30
       const paddingTop  = 80
       const width = window.innerWidth * 0.8
       const scale = targetWidth / width;
       const x = -(window.innerWidth / 2 -paddingLeft)
       const y = window.innerHeight - paddingTop - width / 2 - paddingTop
       return {
        x,
        y,
        scale
       }

     },
      togglePlay(){
       this.setPlayingState(!this.playing)
     },
     next(){
        if(!this.songReady){
          return
        }
        let index = this.currentIndex +1;
        if(index === this.playList.length){
            index = 0;
        }
        this.setCurrentIndex(index)
        if(!this.playing){
            this.togglePlay();
        }
        this.songReady = false;
     },
     prev(){
        if(!this.songReady){
          return
        }
        let index = this.currentIndex - 1;
        if(index === -1){
            index = this.playList.length -1;
        }
        this.setCurrentIndex(index)
         this.songReady = false; 
         if(!this.playing){
            this.togglePlay();
        }
     },
     ready(){
        this.songReady = true;
     },
     error(){
        this.songReady = true;
     },
     updateTime(e){
       //当前播放的位置
        this.currentTime = e.target.currentTime;

     },
     format(interval){
        interval = interval | 0;
        const minute = interval / 60 |0
        const second = this._pad(interval % 60)

       //如果当前播放完了，自动切换下一首
       	  if(parseInt(this.currentTime)  == this.currentSong.duration){
            this.prev();
          } 
        return `${minute}:${second}`
     },
     _pad(num,n=2){
        let len = num.toString().length;
        while(len < n){
          num = '0' + num;
          len++;
        }
       // console.log(7777,num);
       return num;
     },
     onProgressBarChange(percent) {
     	                    // 播放比例  =  播放的时间 / 总的时间
     	                    //歌曲总时长 * 播放的总比例 = 当前的播放位置
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      //播放模式
      changeMode(){
         const mode = (this.mode + 1) % 3;
         this.setPlayMode(mode)
         let  list  = null;
         if(mode == playMode.random){ //如果是随机播放
             list = shuffle(this.sequenceList)
         }else{
             list = this.sequenceList
         }
         this.resetCurrentIndex(list);
         this.setPlayList(list);
      },
      resetCurrentIndex(list){
        let index = list.findIndex((item)=>{
           return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index);
      },
      //歌词
      getLyric(){
        this.currentSong.getLyric().then((lyric)=>{
           this.currentLyric = new Lyric(lyric,this.handleLyric)
           
           if(this.playing){
             this.currentLyric.play();
           }
           console.log(this.currentLyric);
        })
      },
      handleLyric({lineNum, txt}){ //lineNum 歌词的第几行
        this.currentLineNum = lineNum

        if(lineNum>5){
           let lineel = this.$refs.lyricLine[lineNum-5];
           this.$refs.lyricList.scrollToElement(lineel,1000);
        }else{
           this.$refs.lyricList.scrollTo(0,0,1000)
        }

      },
      middleTouchStart(e){
         this.touch.initiated = true;
         const touch = e.touches[0];
         this.touch.startX = touch.pageX;
         this.touch.startY = touch.pageY;
      },
      middleTouchMove(e){
         if(!this.touch.initiated){
           return;
         }
         const touch = e.touches[0];
         const deltaX = touch.pageX - this.touch.startX;
         const deltaY = touch.pageY - this.touch.startY;
         //如果丛向大于横向不偏移
         if(Math.abs(deltaY) > Math.abs(deltaX)){
           return
         }

         const left = this.currentShow === 'cd' ? 0
      },
      middleTouchEnd(e){

      },
     ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex:'SET_CURRENT_INDEX',
        setPlayMode:'SET_PLAY_MODE',
        setPlayList:'SET_PLAYLIST'
     })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.normal-player{
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:505;
  background:#0090ff
}
.background{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:-1;
  opacity:0.6;
  filter:blur(20px);


}
.top{
  position:relative;
  margin-bottom:25px;
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
   width:70%;
   margin:0 auto;
   line-height:40px;
   text-align:center;
   font-size:18px;
   color:#fff;
}
.subtitle{
  line-height:20px;
  text-align: center;
  font-size:14px;
   color:#fff; 
}
.images{
  width:80%;
  border-radius:50%;
  border:5px solid #ddd;
  height:80%;
}
.mini-player{
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  height:50px;
  padding:5px 10px;
  box-sizing: border-box;
  background: #333;
  z-index:505;
}
.mini-enter-active, .mini-leave-active{
        transition: all 0.4s
    }
.mini-enter, .mini-leave-to{
        opacity: 0}



.mini-player div{
  float:left;
  color:#fff;
  line-height:20px;
}
.name{
  padding-left:10px;
}
.desc{
  font-size:12px;
  color:#ddd;
  text-align:left;
  padding-left:10px;
}
.control{
  float:right
}
.icon-playlist{
  display:block;
  width:20px;
  height:20px;
  border: 2px solid #d00;
  border-radius:50%;
  background: #d00
}
.normal-enter-active,.normal-leave-active{
  transition: all .4s cubic-bezier(0.86,0.18,0.82,1.32)
}
.normal-enter-active .top,
.normal-leave-active .top,
.normal-enter-active .bottom,
.normal-leave-active .bottom{
  transition: all .4s
}





.normal-enter .top,
.normal-leave-to .top,
.normal-enter .bottom,
.normal-leave-to .bottom{
  opacity: 0
}

.normal-enter .top,
.normal-leave-to .top{
 transform:translate3d(0,-100px,0);
}
.normal-enter .bottom,
.normal-leave-to .bottom{
  transform:translate3d(0,100px,0);
}
.bottom{
  position:fixed;
  bottom:10px;
  left:5%;
  width:90%;
}

.dot-wrapper{
          text-align: center;
          font-size: 0}
.dot{
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background:blue;}

.active{
              width: 20px;
              border-radius: 5px;
              background:#d00}








.bottom div.operators{
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:#fff;
  font-size:20px;
}
.bottom div.operators{
  margin:0 auto;
  text-align:center;
}
.bottom div.operators i{
  font-size:30px;
}
.cd{
  width:100%;
  height:100%;
  box-sizing:border-box;
  
}
.play{
  animation:rotate 20s linear infinite;
}
.pause{
  animation-play-state:paused;
}
.image{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  border-radius:50%;
}
.playing-lyric-wrapper{
  width:100%;
  margin:30px auto 0 auto;
  overflow:hidden;
  text-align:center;
}
@keyframes rotate{
   0%{
      transform:rotate(0);
   }
   100%{
    transform:rotate(360deg);
   }
}

.disable{
  text-shadow:0 0 10px #fff;
}
.icon img{
	border-radius:50%;
}

.progress-wrapper{
          display: flex;
          align-items: center;
          width: 100%;
          margin: 0px auto;
          padding: 10px 0;
    }
.progress-wrapper .time{
            color: #fff;
            font-size: 20px;
            flex: 0 0 30px;
            line-height: 30px;
            width: 30px;
          }
.progress-wrapper .time-l{
              text-align: left;
              }
.progress-wrapper .time-r{
              text-align: right;
              }
.progress-wrapper .progress-bar-wrapper{
            flex: 1;padding:0 10px 0 20px;}
.middle{
  position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
}
.middle-l{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
}
.middle-r{
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
.lyric-wrapper{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;}
 .text{line-height: 32px;
              color:#c8c6c6;
              font-size:16px;}
.current{
  color:#fff;
}


</style>
