<template>
  <transition name="list-fade">
     <div class="playlist">
      <div class="list-wrapper">
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>
       <!-- <scroll ref="listContent" class="list-content">
          <transition-group ref="list" name="list" tag="ul">
            <li  class="item">
              <i class="current"></i>
              <span class="text"></span>
              <span class="like">
                <i></i>
              </span>
              <span  class="delete">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        -->
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <!--
      <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
      -->
    </div>
  </transition>
</template>

<script>

</script>

<style scoped>
.playlist {
	position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 505;
    background-color:#666;
}

.list-fade-enter-active, .list-fade-leave-active {
	transition: opacity 0.3s;
}

.list-wrapper {
	transition: all 0.3s;
}

.list-fade-enter, .list-fade-leave-to {
	opacity: 0;
}

.list-wrapper {
	transform: translate3d(0, 100%, 0);
}

.list-fade-enter
    .list-wrapper {
	position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color:#d00;
}

.list-header {
	position: relative;
        padding: 20px 30px 10px 20px;
}

.title {
	display: flex;
          align-items: center;
}

.icon {
	margin-right: 10px;
            font-size: 30px;
            color:blue;
}

.text {
	flex: 1;
     font-size:20px;
            color: #d00;
}



.icon-clear {
 font-size:20px;
            color: #d00;
}

.list-content {
	max-height: 240px;
        overflow: hidden;
}

.item {
	display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
}

.list-enter-active, .list-leave-active {
	transition: all 0.1s;
}

.list-enter, .list-leave-to {
	height: 0;
}

.current {
	flex: 0 0 20px;
            width: 20px;
            font-size:20px;
            color: #d00;
}

.text {
	flex: 1;

            font-size:20px;
            color: #d00;
}

.like {
            margin-right: 15px;
            font-size:20px;
            color: #d00;
}

.icon-favorite{
              color:#d00;
}

.delete {
            font-size: 15px;
            color:#d00;
}

.list-operate {
width: 140px;
        margin: 20px auto 30px auto;
}

.add {
display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid #d00;
          border-radius: 100px;
          color:blue;
}

.icon-add {
margin-right: 5px;
            font-size:15px;
}

.text {
font-size:15px;
}

.list-close {
text-align: center;
        line-height: 50px;
        background:blue;
        font-size:15px;
        color:#d00;
}
</style>