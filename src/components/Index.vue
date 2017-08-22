<template>
<div>
  <div id="Main-highlight">
    <ul class="banner">
      <li class="banner-left">
        <a href="#">
          <img src="https://icdn.static.dawoea.net/steam/apps/585840/header.jpg" alt="">
        </a>
      </li>
      <li class="banner-main">
        <a href="#">
          <img src="https://icdn.static.dawoea.net/steam/apps/41070/header.jpg" alt="">
        </a>
      </li>
      <li class="banner-right">
        <a href="#">
          <img src="https://icdn.static.dawoea.net/steam/apps/302270/header.jpg" alt="">
        </a>
      </li>
    </ul>
  </div>

  <div id="Main-Contents">
    <div class="Contents">
      <div class="thumbnail" v-for="item in index">
        <div class="thumbnail-title"><span>{{item.name}}</span></div>
        <div class="thumbnail-list">
          <ul class="list-item">
            <li v-for="item in item">
              <a href="#">
                <img :src="item.images.header" alt="" width="368" height="172">
                <div class="thumbnail-info">
                    <div class="thumbnail-info-name"><span class="name">{{item.name}}</span><span class="thumbnail-info-time">2017/01/01发售</span></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      index:[]
    }
  },
  created(){
    this.getIndex()
  },
  methods:{
    getIndex: function () {
      this.$http.get("https://api.dawoea.net/api/entrance").then((res) => {
        let tem_arr = []
        for(let i=0;i<res.data.data.length;i++){
          tem_arr.push(res.data.data[i])
          if(i===2){
            this.index.push(tem_arr)
            this.index[0].name = "近期新作"
            tem_arr=[]
          }else if(i===5){
            this.index.push(tem_arr)
            this.index[1].name = "人气作品"
            tem_arr=[]
          }
          // else if(i===8){
          //   this.index.push(tem_arr)
          //   this.index[2].name = "高分神作"
          //   tem_arr=[]
          // }
        }
        console.log(this.index)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #Main-highlight ul.banner{
    width:1194px;
    height:215px;
    margin:0 auto;
    position:relative;    
  }

  #Main-highlight ul.banner li{
    width:368px;
    height: 172px;
    position:absolute;
    border-radius:5px;
    overflow:hidden;
    bottom:2px;
    box-shadow:0 0 35px #000;
  }

  #Main-highlight ul.banner li img{
    width:368px;
    height:172px;
  }

  #Main-highlight ul.banner li.banner-left{
    left:0;
  }

  #Main-highlight ul.banner li.banner-main{
    width:460px;
    height:215px;
    left:368px;
    z-index:2;
  }

  #Main-highlight ul.banner li.banner-main img{
    width:460px;
    height:215px;
  }
  
  #Main-highlight ul.banner li.banner-right{
    right:0;
  }

  .thumbnail {
    width: 100%;
    height: 250px;
  }

  .thumbnail .thumbnail-title {
    width: 100%;
    height: 18px;
    font-size: 12px;
    line-height:12px;
    padding: 52px 0 6px 0;
    text-align: center;
  }

  .thumbnail .thumbnail-title span {
    display: inline-block;
    height: 18px;
    letter-spacing: 7.5px
  }


  .thumbnail .thumbnail-list .list-item li {
    float: left;
    margin: 0 12px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow:0 5px 35px #000;
  }

  .thumbnail .thumbnail-list .list-item li a {
    width:368px;
    height:172px;
    display: block;
    position: relative;
    
  }

  .thumbnail .thumbnail-list .list-item li a img {
    transition:all 0.5s;
  }

  .thumbnail .thumbnail-list .list-item li a:hover img{
    transform:scale(1.1);
  }

  .thumbnail .thumbnail-list .list-item li a:hover span{
    width:100% !important;
  }

  .thumbnail .thumbnail-list .list-item li a:hover span.thumbnail-info-time{
    display:none;
  }

  .thumbnail .thumbnail-list .list-item li a .thumbnail-info {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .thumbnail .thumbnail-list .list-item li a .thumbnail-info-name {
    height: 32px;
    line-height: 32px;
    padding: 0 24px;
  }

  .thumbnail .thumbnail-list .list-item li a .thumbnail-info-name span {
    width:190px;
    height:32px;
    float:left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .thumbnail .thumbnail-list .list-item li a span.thumbnail-info-time {
    float: right;
    width:121px;
  }
</style>