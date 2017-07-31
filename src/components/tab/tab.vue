<template>
  <div class="tab">
    <router-link to="/recommend">
    	<span>推荐</span>
    </router-link>
    <router-link to="/singer">
    	<span>歌手</span>
    </router-link>
    <router-link to="/rank">
    	<span>排行</span>
    </router-link>
    <router-link to="/serach">
    	<span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tab{
    background:rgba(7,140,123,.8);
    height:40px;
    line-height:40px;
    display:flex;
    justify-content:space-around;
    align-items:center;
    z-index:500;
    position:fixed;
    top:40px;
    width:100%;
}
.tab a{
	color:#cce9ff;
    font-size:14px;
    display:block;
    flex:1;
}

.tab a.router-link-active{
    color:#ffffff;
    border-bottom:2px solid #fff;
}

</style>
