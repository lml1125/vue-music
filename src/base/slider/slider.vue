<template>
  <div class="slider" ref="slider">
     <div class="slider-group" ref="sliderGroup">
        <slot>
        1111111111111111111
        </slot>
     </div>

     <div class="dots">
       <span class="dota" v-for="(item,index) in dots"
        :class="{active:curpageindex === index}"></span>
     </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import {addClass} from "common/js/dom"
export default {
   data(){
    return{
      dots:[],
      curpageindex:0
    }
   },
   props:{
   	 loop:{
   	 	type:Boolean,
   	 	default:true
   	 },
   	 autoplay:{
   	 	type:Boolean,
   	 	default:true
   	 },
   	 interval:{
   	 	type:Number,
   	 	default:2000
   	 }
   },
   mounted() {
     setTimeout(()=>{
        this._setsliderwidth();
        this._initdots();//防止自动循环播放多出两个图片，所以放在_initslider的之前
        this._initslider();
        if(this.autoplay){
            this._paly();
        }
     },20)

     window.addEventListener('resize',()=>{
        if(!this.slider){
          return
        }
        this._setsliderwidth(true);
        this.slider.refresh();
     })
   },
   methods:{
    _setsliderwidth(isresize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0;
        let sliderwidth = this.$refs.slider.clientWidth;
        for(let i=0;i<this.children.length;i++){
           let child = this.children[i]
           addClass(child,'slider-item')
           child.style.width = sliderwidth + "px";
           width += sliderwidth;
        }

        if(this.loop && !isresize){
          width += 2 * sliderwidth;
        }
        this.$refs.sliderGroup.style.width = width +"px";
    },
    _initslider(){
       this.slider = new BScroll(this.$refs.slider,{
         scrollX:true, //横向滚动
         scrollY:false, //从向不滚动
         momentum:false, //当快速滑动时是否开启滑动惯性
         snap:true, //该属性是给 slider 组件使用的，普通的列表滚动不需要配置
         snapLoop:this.loop, //是否可以无缝循环轮播
         snapThreshold:0.3,//用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
         snapSpeed:400, //轮播图切换的动画时间
         click:false
       })
       this.slider.on('scrollEnd',()=>{
         let pageindex = this.slider.getCurrentPage().pageX
         if(this.loop){
             pageindex -=1
         }
         this.curpageindex =  pageindex
         //每次轮播前 要清除下
         if(this.autoplay){
           clearTimeout(this.timer)
           this._paly();
         }

       })
    },
    _initdots(){
        this.dots = new Array(this.children.length);
    },
    _paly(){
      let pageindex = this.curpageindex +1;
      if(this.loop){
         pageindex +=1
      }
      this.timer = setTimeout(()=>{
         this.slider.goToPage(pageindex,0,400)
      },this.interval)
    }
   },
   destroyed() {
     clearTimeout(this.timer)
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slider{
  min-height:1px;
}
 .slider-gruop{
  position:relative;
  overflow:hidden;
  white-space: nowrap;
 }
 .slider-item{
   float:left;
   box-sizing:border-box;
   overflow:hidden;
   text-align:center;
 }
 .slider-item a{
  display:block;
  width:100%;
  overflow:hidden;
  text-orientation: none
 }
 img{
  display:block;
  width:100%;
 }
 .dots{
  position:absolute;
  right:0;
  left:0;
  bottom:12px
 }
 .dota{
  background: #efefef;
  display:inline-block;
  width:10px;height:10px;
  border-radius:50%;
  margin:0 3px;
 }
 .active{
  background: #0090ff
 }
</style>
