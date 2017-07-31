<template>
<div class="recommend">
<scroll ref="scroll" class="scroll_box" :data='recommendList'>
 <div>
    <div v-if="recommend.length" class="slider-wrap">
      <slider>
        <div v-for="item in recommend">
          <a :href="item.linkUrl">
            <img @load="loadImage" :src="item.picUrl" />
          </a>
        </div>
      </slider>
    </div>

      <div class="recommend-list">
   			<h1 class="list-title">热门歌单推荐</h1>
   			<ul class="hot">
   				<li v-for="item in recommendList" class="item" @click="selectItem(item)">
   					<div class="icon">
   						<img width="60" height="60" v-lazy="item.imgurl" />
   					</div>
   					<div class="text">
   						<h2 class="name" v-html="item.creator.name"></h2>
   						<p class="desc" v-html="item.dissname"></p>
   					</div>
   				</li>
   			</ul>
   		</div>
  </div>
  <loader v-show="!recommend.length"></loader>
 </scroll> 
 <router-view></router-view>
 </div>
</template>

<script>
 import slider from 'base/slider/slider'
 import loader from 'base/loader/loader'
 import scroll from 'base/scroll/scroll'
 import {getRecommend,getMusicList} from 'api/recommend'
 import {mapMutations} from 'vuex'

 import {ERR_OK} from 'api/config'
export default {
   data(){
      return {
         recommend:[],
         recommendList:[]
      }
   },
   created(){
        this._getRecommend();
       this._getMusicList();
   },
   components:{
     slider,
     loader,
     scroll
   },
   methods:{
   	_getRecommend(){
   		getRecommend().then((res)=>{
           if(res.code === ERR_OK){
               this.recommend = res.data.slider;
           }
   		})
   	},
    _getMusicList(){
       getMusicList().then((res)=>{
           if(res.code === ERR_OK){
               this.recommendList = res.data.list;
           }
       })
    },
    loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
     selectItem(item) {
     	console.log(item);
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
       ...mapMutations({
        setDisc: 'SET_DISC'
      })

   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recommend{
	position:fixed;
	top:80px;
	bottom:0;
	width:100%;
	z-index:501;
 
}
.scroll_box{
   height: 100%;
   overflow: hidden
}

.slider-wrap{
  position: relative;
  width: 100%;
  overflow: hidden
}
.recommend-list{
	background:#fff;
}
.recommend-list .list-title{
	height:65px;
	line-height:65px;
	text-align: center;
	font-size: 16px;
	color: #31c27c;
}
.recommend-list .item{
	display: flex;
	box-sizing: border-box;
	align-items: center;
	padding:0 20px 20px 20px;
	
}
.recommend-list .icon{
	flex:  0 0 60px;
	width: 60px;
	padding-right: 20px;
}
.recommend-list .text{
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	line-height: 20px;
	overflow: hidden;
	font-size: 16px;
}
.recommend-list .name{
	margin-bottom: 10px;
	color: #000;
}
.loading-container{
	position: absolute;
	width: 100%;
	top:50%;
	transform:translateY(-50%)
}

.item{
	display: flex;
	box-sizing: border-box;
	align-items: center;
	padding:0 20px 20px 20px
}
.icon{
	flex: 0 0 60px;
	width: 60px;
	padding-right: 20px;
}
.text{
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
	line-height: 20px;
	overflow: hidden;
	font-size:16px;
	text-align:left;
}
.name{
	margin-bottom: 10px;
	color:#fff ;
}
.desc{
	color: rgba(0,0,0,.5);
}
.load-container{
	position: absolute;
	width: 100%;
	top:50%;
	transform: translateY(-50%);
}

</style>
