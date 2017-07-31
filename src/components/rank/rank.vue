<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="item in topList">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loader></loader>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  import loader from 'base/loader/loader'
  import {ERR_OK} from 'api/config'
  import {getTopList} from 'api/rank'
  import {mapMutations} from 'vuex'

  export default {
    created() {
      this._getTopList()
    },
    data() {
      return {
        topList: []
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    watch: {
    },
    components: {
      scroll,
      loader
    }
  }
</script>

<style scoped>
.rank {
	position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    z-index:505;
}

.toplist {
	height: 100%;
      overflow: hidden;
}

.item {
	display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
}

.item:last-child {
	padding-bottom: 20px;
}

.icon {
	flex: 0 0 100px;
          width: 100px;
          height: 100px;
}

.songlist {
	flex: 1;
          display: flex;
          flex-direction: column;
          justify-content:center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background:#fff;
          color:#333;
          font-size: 16px;
}

.song {
	line-height: 26px;
	text-align:left;
}

.loading-container {
	position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
}
</style>