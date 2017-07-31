<template>
  <transition name="slide">
     <musicList :songs='songs' :title='title' :bgImages="bgImages"></musicList>
  </transition>
</template>

<script type="text/ecmascript-6">
  import musicList from 'components/music-list/music-list'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'

  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImages() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
      	console.log(111);
      	console.log(this.disc);
      
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }

        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
          	console.log(222);
          	console.log(res.code);
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
        
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
      
    },
    components: {
      musicList
    }
  }
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
}
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
    }
</style>