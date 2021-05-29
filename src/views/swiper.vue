<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
   <div class="swiper-pagination"></div>
 </div>
</template>

<script>
  import Swiper from 'swiper/swiper-bundle.js'
  import 'swiper/swiper-bundle.css'

export default{
  mounted(){
  	new Swiper ('.filmswiper',{
  		loop:true,
      autoplay:{
        delay:2000
      },

  		pagination:{
  			el:'.swiper-pagination',
        clickable:true,

  		}
  	})
  },
}


</script>

<style scoped>
  .swiper-wrapper{
    width: 100%;
    height: 100px;
    text-align: center;
  }
  .swiper-pagination{
    text-align: right;
  }
  *{
    margin: 0;
    padding: 0;
  }
</style>
