<template>
  <div ref="wrapper">
    <slot>
     1111111111111111111
    </slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
   data(){
    return{
    }
   },
   props:{
   	 probeType:{
   	 	type:Number,
   	 	default:1
   	 },
   	 click:{
   	 	type:Boolean,
   	 	default:true
   	 },
     data:{
       type:Array,
       default:null
     },
     //监听滚动事件
     listenScroll:{
      type:Boolean,
      default:false
     }
   },
   mounted() {
     setTimeout(()=>{
        this._initScroll();
     },20)
   },
   methods:{
    _initScroll(){
       if(!this.$refs.wrapper){ //如果初始化的时候，没有值的时候，就返回
        return
       }
       this.scroll = new BScroll(this.$refs.wrapper,{
         probeType:this.probeType, //滚动结束的时候派发一个 scroll 事件
         click:this.click
       })
      
       //监听滚动事件
       if(this.listenScroll){
          let _this = this
          this.scroll.on('scroll',(pos)=>{ //pos 位置
             _this.$emit("scroll",pos)
          })
       }

    },
    //启用 better-scroll，默认开启
    enable(){
       this.scroll && this.scroll.enable();
    },
    //禁用 better-scroll
    disable(){
       this.scroll && this.scroll.disable();
    },
    //刷新，重新计算高度
    refresh(){
       this.scroll && this.scroll.refresh();  
    },
    //滚动到某个位置
    scrollTo(){
       this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);  
    },
    //滚动到某个元素
    scrollToElement(){
       this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);  
    }
    
   },
   watch:{
      data(){
         setTimeout(()=>{
            this.refresh();
         },20)
      }
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

</style>
