<template>
  <div class="progress-bar" ref="progressBar"  @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn" 
        @touchstart.prevent = "touchstartfn"
        @touchmove.prevent = 'touchmovefn'
        @touchend.prevent = 'touchendfn'
        ></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const progressBtnWidth = 14
  export default {
    props: {
      percent: { //播放的时间 / 总的时间
        type: Number,
        default: 0
      }
    },
    created(){
    	this.touch = {}
    },
    methods:{
       progressClick(e){
       	const rect = this.$refs.progressBar.getBoundingClientRect()
        const left = e.pageX - rect.left;
         this._offset(left)
         this._triggerPercent();
       },
       _triggerPercent() { //传给父级，重新计算位置
       	                 //背景颜色宽度 - 小球的宽度（16px）
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                         //比例  = 总位置 /   背景颜色宽度 - 小球的宽度（16px） (位置)
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },
      _offset(offsetWidth){
          this.$refs.progress.style.width = `${offsetWidth}px` //背景颜色走的宽度
          this.$refs.progressBtn.style.left = `${offsetWidth - progressBtnWidth}px` //小球走的left值
      },
      touchstartfn(e){
          let firstTouch = e.touches[0]; //一个手指
          this.touch.x1 = firstTouch.pageX; //手指触摸的值
          this.touch.flag = true; //判断小球走不走
          this.touch.left = this.$refs.progress.clientWidth
      },
      touchmovefn(e){
      	   let firstTouch = e.touches[0]; //一个手指
          this.touch.x2 = firstTouch.pageX; //手指触摸的值
          //console.log(this.touch.x2,this.touch.x1);
          const chaX = this.touch.x2 - this.touch.x1
          const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + chaX))
          this._offset(offsetWidth)
      },
      touchendfn(e){
      	this.touch.flag = false
        this._triggerPercent();
      }
    },
    watch: {
      percent(newPercent) {
      	//console.log(newPercent); //newPercent  播放比例
        if (newPercent >= 0 && !this.touch.flag) {
        	               //背景颜色宽度 - 小球的宽度（16px）
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth  // 播放比例 * 宽度 = 偏移宽度（偏移位置）
          this._offset(offsetWidth)
        }
      }
    }
  }

</script>

<style scoped>
.progress-bar{
	height: 30px
}
.bar-inner{
	 position: relative;
	 top: 13px;
	 width:100%;
	 height: 4px;
	 background: rgba(0, 0, 0, 0.4);
}
.progress{
     position: absolute;
     height: 100%;
     background:#fff;
}
.progress-btn-wrapper{
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
}
        .progress-btn{
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background:#fff
      }
</style>