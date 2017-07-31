<template>
  <div class="singer">
    <listview @select="selectSinger" :data="singerData"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import listview from 'base/listview/listview'
import {mapMutations} from 'vuex'

const HOT_NAME = "热门"
const HOT_SINGER_LEN = 10
export default {
	data(){
		return{
        singerData:[]
		}
	},
   created(){
	   this._getSingerList();
   },
   methods:{
   	selectSinger(item){
       this.$router.push({
       	path:`/singer/${item.id}`
       })

       this.setSinger(item); //通过vuex 存
   	},
   	_getSingerList(){
   		getSingerList().then((res)=>{
           if(res.code === ERR_OK){
               this.singerData = this._normalizesinger(res.data.list);
               console.log(this._normalizesinger(res.data.list));
           }
   		})
   	},
    _normalizesinger(list){
       let map = {
          hot:{
              title:HOT_NAME,
              items:[]
          }
       }
       list.forEach((item,index)=>{
          if(index < HOT_SINGER_LEN){  //前10位属于热门的
            map.hot.items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
            }))
          }

          const key = item.Findex; //名字的首字母
          if(!map[key]){
            map[key] = {
              title:key,
              items:[]
            }
          }
          map[key].items.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name
          }));
       })
       //为了得到有序列表，我们需要处理map

       let hot = []; //热门的数组
       let ret = []; //a-z首字母个数的存放数组
       for(let key in map){
           let val = map[key]
           if(val.title.match(/[a-zA-Z]/)){
               ret.push(val);
           }else if(val.title === HOT_NAME){
               hot.push(val);
           }
       }
       ret.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
       })

       return hot.concat(ret)

    },
     ...mapMutations({
           setSinger:'SET_SINGER'
	   })
   },
   components:{
    listview
   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.singer{
  position:fixed;
  top:80px;
  bottom:0;
  width:100%;
  z-index:501;
}
</style>
