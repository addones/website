<template>
<div>
  <div id="Main-highlight">
    <ul class="banner">
      <li class="banner-left">
        <a href="#">
          <img src="https://steamcdn.static.addones.net/steam/apps/447040/header.jpg" alt="">
        </a>
      </li>
      <li class="banner-main">
        <a href="#">
          <img src="https://steamcdn.static.addones.net/steam/apps/349220/header.jpg" alt="">
        </a>
      </li>
      <li class="banner-right">
        <a href="#">
          <img src="https://steamcdn.static.addones.net/steam/apps/433850/header.jpg" alt="">
        </a>
      </li>
    </ul>
  </div>

  <div id="Main-Contents">
    <div class="Contents">
      <div class="thumbnail" v-for="(item,index) in index">
        <div class="thumbnail-title"><span @click="change(index)">{{item.name}}</span></div>
        <div class="thumbnail-list">
          <ul class="list-item">
            <li v-for="item in item.data">
              <a href="#">
                <img :src="'https://icdn.static.dawoea.net/steam/apps/'+item.appid+'/header.jpg'" alt="" width="368" height="172">
                <div class="thumbnail-info">
                    <div class="thumbnail-info-name"><span class="name">{{item.name}}</span><span class="thumbnail-info-time">{{item.released}}</span></div>
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
      index:[
        {
          name : '近期作品',
          index:2,
          data : []
        },
        {
          name : '人气作品',
          index:2,
          data : []
        }
      ],
      result:[]
    }
  },
  created(){
    this.getIndex()
  },
  methods:{
    getIndex: function () {
      this.$http.get("https://api.dawoea.net/api/entrance").then((res) => {
        for(let object in res.data.data){
          this.result.push(res.data.data[object])
        }
        for(let i=0;i<this.result.length;i++){
          this.index[i].data = this.result[i].slice(0,3)
          this.index[i].index = 3
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    change:function(key){
      if(this.index[key].index==parseInt(this.result[key].length/3)*3){
        this.index[key].data = this.result[key].slice(this.result[key].length-3,this.result[key].length)
        this.index[key].index = 0
      }else{
        this.index[key].data = this.result[key].slice(this.index[key].index,this.index[key].index+3)
        this.index[key].index = this.index[key].index+3
      }
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
    top:63px;
  }

  #Main-highlight ul.banner li{
    width:368px;
    height: 172px;
    position:absolute;
    border-radius:5px;
    overflow:hidden;
    bottom:0;
    box-shadow:0 0 25px rgba(0,0,0,0.8);
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
    width: 1176px;
    height: 250px;
    margin:0 auto;
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
    font-size:16px;
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