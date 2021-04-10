<template>

  <div class="swiper-container Detailswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
 </div>

</template>

<script>
  import Swiper from 'swiper/swiper-bundle.js'
  import 'swiper/swiper-bundle.css'

export default{
  mounted(){
  	new Swiper ('.Detailswiper',{
      freeMode: true,
      slidesPerView: 4,
      spaceBetween: 10,

  	})
  },
}


</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
</style>
