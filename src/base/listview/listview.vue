<template>
 <Scroll class="listview" 
    :data="data"
    :listenScroll="listenScroll"
    :probeType = 'probeType'
    ref="listview"
    @scroll="scroll"
  
    >
 
    <ul>
      <li v-for="group in data" class="list-group" ref="listgroup">
         <h2 class="list-group-title">{{group.title}}</h2>
         <ul>
           <li @click="selectItem(item)"v-for="item in group.items" class="list-group-item">
             <img v-lazy="item.avatar" class="avatar"/>
             <span class="name">{{item.name}}</span>
           </li>
         </ul>
      </li>
    </ul>

    <div class="list-shortcat" @touchstart="onshortcat" @touchmove.stop.prevent="onshortmove">
      <ul>
        <li v-for="(item,index) in shortcutlist" 
         :data-index='index'
         :class="{'active':currIndex === index}"
         >{{item}}</li>
       
      </ul>
    </div>
    <!--
    <div class="list-fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>-->
 </Scroll>
</template>

<script>
import Scroll from "base/scroll/scroll"
import {getData} from "common/js/dom"
const ANCHOR_HEIGHT = 18;
export default {
   props:{
   	 data:{
   	 	type:Array,
   	 	defautll:[]
   	 }
   },
   data(){
      return{
        scrollY:-1,
        currIndex:0 //默认显示的a-z的第几个
      }
   },
   
   components:{
    Scroll
   },
   created(){
    this.touch = {};
    this.listenScroll = true
    this.listheight =[]
    this.probeType = 3;
   },
   methods:{
    //点击a-z的字母，左边对象上
    onshortcat(e){
      console.log(e);
        let curIndex = getData(e.target,'index') //获取到当前的索引
        let firstTouch = e.touches[0]; //一个手指
        this.touch.y1 = firstTouch.pageY; //手指触摸的值
        this.touch.curIndex = curIndex;
        this._scrollTo(curIndex);
    },
    //移动a-z的字母，左边对象上
    onshortmove(e){
       let firstTouch = e.touches[0];
       this.touch.y2 =  firstTouch.pageY; //手指移动的值
       //偏移多少个锚点
       let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0; 
       let curIndex =  parseInt(this.touch.curIndex) + delta;
       //console.log(curIndex);
       this._scrollTo(curIndex);
    },
    _scrollTo(index){
       if(!index && index!==0){
           return
       }
       if(index < 0){
          index = 0;
       }else if(index > this.listheight.length - 2){
          index = this.listheight.length - 2;
       }
       //滚动到某个元素
        this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0)
    },
    //获取子组件的
    scroll(pos){
        console.log(pos);
       this.scrollY = pos.y;
    },
    //计算高度
    _canculateHeight(){
       this.listheight =[]
       const list =this.$refs.listgroup;
       let height =0;
       this.listheight.push(height)
       for(let i=0;i<list.length;i++){
         let item = list[i]
         height +=item.clientHeight;
         this.listheight.push(height);
       }
       console.log(this.listheight);
    },
    selectItem(item){
    	console.log("子组件传过来的");
    	console.log(item);
       this.$emit("select",item)
    }
   },
   computed:{
     //获取右边的信息
     shortcutlist(){
       return this.data.map((item)=>{
          return item.title.substr(0,1);
       })
     },
     fixedTitle(){
       return this.data[this.curIndex] ?  this.data[this.curIndex].title:''
     }
   },
   watch:{
      data(){
        setTimeout(()=>{
          this._canculateHeight();
        },20)
      },
      scrollY(newY){
        const listheight = this.listheight;
        //滚动到顶部 newY>0 
        /*
        if(newY > 0){
          this.currIndex = 0;
          return
        }
        */
        //在中间部分滚动
        for(let i=0;i<listheight.length;i++){
          let height1 = listheight[i]
          let height2 = listheight[i+1]
          if(!height2 || (-newY > height1 && -newY < height2)){
              console.log(this.currIndex);
              this.currIndex = i;
              return 
          }
        }
        this.currIndex = 0
        //当滚动到底部，且-new大于最后一个于安苏的上限
        /*
        this.currIndex = listheight.length - 2;
        */
      }
   },
} 
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.listview{
  position:relative;
  width:100%;
  height:100%;
  overflow:hidden;
}
.list-group{
  padding-bottom:30px;
}
.list-group-title{
  height:30px;
  line-height: 30px;
  padding-left:20px;
  background:#efefef;
  text-align:left;
}
.list-group-item{
  display:flex;
  align-items:center;
  padding:20px 0 0 30px;
}
.avatar{
  width:50px;height:50px;border-radius: 50% 
}
.name{
  margin-left:20px;
  color:#000;
  font-size:16px;
}
.list-shortcat{
  position:absolute;
  z-index:30;
  right:0;
  top:50%;
  line-height:16px;
  transform: translateY(-50%);
  width:20px;
  padding:20px 0;
  border-radius: 10px;
  text-align:center;

}
.active{
  color:#31c27c;
}
.list-fixed{
  position:fixed;
  top:80px;
  left:0;
  width:100%;
  background:#efefef;
  height:50px;
}
</style>
