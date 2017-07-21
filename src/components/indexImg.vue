<template>
  <div class="indexImg">
    <ul class="item">
        <li v-for="(item,index) in img"><a href="#"><img :src="'https://steamcdn.static.addones.net/steam/apps/'+item.appid+'/header.jpg'+img_version" :alt="item.name"></a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'indexImg',
  data () {
    return {
      
    }
  },
  created(){
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    /* width:1317px; 
  margin:70px auto 0; */
    font-size: 0;
    text-align: center;
  }

  .item li {
    display: inline-block;
    margin: 2px;
  }

  .item li a {
    display: inline-block;
    /* width:435px; */
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    user-select:none;
  }

  .item li a:hover {
    opacity: 0.7
  }

  .item li a img {
    width: inherit;
    height: inherit;
  }

</style>
