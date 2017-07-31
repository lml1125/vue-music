<template>
  <!--<div class="spinner">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>-->
  <div class="loader">
         <div class="loader3">
             <i></i>
             <i></i>
             <i></i>
             <i></i>
             <i></i>
             <i></i>
             <i></i>
             <i></i>
           </div>
       </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .spinner,.loader {
    margin: 20% auto 0 auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }
   
  .spinner > div {
    background-color: #df2d2d;
    height: 100%;
    width: 6px;
    border-radius:4px;
    display: inline-block;
     
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
   
  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
   
  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
   
  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
   
  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
   
  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
    20% { -webkit-transform: scaleY(1.0) }
  }
   
  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

  .loader3{
	 position: relative;
}

@keyframes loader3{
	50%{
		transform: scale(0.4);
		opacity: 0.3;
	}
	
	100%{
		transform: scale(1);
		opacity: 1;
	}
}



 .loader3 i{
 	 display:block;
 	 width: 20px;
 	 height: 20px;
 	 background: #666;
 	 border-radius: 50%;
 	 position: absolute;
 	 display: none;
 	
   }
  .loader3 i:nth-child(1){
  	display: block;
  	 top: -30px;
  	 left: 0;
  	 animation: loader3 .6s linear 0.06s infinite
  }	
  .loader3 i:nth-child(2){
  	display: block;
  	 top: -22px;
  	 left: 22px;
  	  animation: loader3 .6s linear 0.12s infinite
  }
  .loader3 i:nth-child(3){
  	 display: block;
  	 top: 0px;
  	 left:30px;
  	  animation: loader3 .6s linear 0.18s infinite
  }
  .loader3 i:nth-child(4){
  	display: block;
  	 top:22px;
  	 left:22px;
  	  animation: loader3 .6s linear 0.24s infinite
  }
  .loader3 i:nth-child(5){
  	 display: block;
  	 top: 30px;
  	 left: 0;
  	  animation: loader3 .6s linear 0.30s infinite
  }	
  .loader3 i:nth-child(6){
  	display: block;
  	 top: 22px;
  	 left: -22px;
  	  animation: loader3 1s linear 0.36s infinite
  }
  .loader3 i:nth-child(7){
  	display: block;
  	 top:0px;
  	 left:-30px;
  	  animation: loader3 .6s linear 0.42s infinite
  }
  .loader3 i:nth-child(8){
  	display: block;
  	 top: -22px;
  	 left:-22px;
  	  animation: loader3 .6s linear 0.48s infinite
  }
</style>
