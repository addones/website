<template>
<div>
  <div id="header">

    <!-- 头部 -->
    <div class="head">
      <div class="logo">
        <h2>待定</h2>
      </div>
      <!-- 搜索 -->
      <div class="Search">
        <form action="#">
          <div class="type">

            <a href="#">
              <svg width="14px" height="13px" viewBox="0 0 14 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 46 (44423) - http://www.bohemiancoding.com/sketch -->
                <title>Triangle</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="搜索结果页-效果图" transform="translate(-768.000000, -35.000000)" fill="#FFFFFF">
                    <path d="M773.124355,37.3445557 C774.160245,36.0496933 775.84102,36.0512747 776.875645,37.3445557 L780.501657,41.8770714 C781.881454,43.6018172 781.21117,45 779.003797,45 L770.996203,45 C768.789161,45 768.120789,43.5990134 769.498343,41.8770714 L773.124355,37.3445557 Z"
                      id="Triangle" transform="translate(775.000000, 40.000000) scale(1, -1) translate(-775.000000, -40.000000) "></path>
                  </g>
                </g>
              </svg>
              RPG
            </a>
          </div>
          <div class="input">
            <input type="text" placeholder="搜索推荐内容，如新作或新活动">
          </div>
          <button type="submit">
            <svg width="21px" height="21px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 46 (44423) - http://www.bohemiancoding.com/sketch -->
              <title>search</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="搜索结果页-效果图" transform="translate(-1119.000000, -30.000000)" stroke="#FFFFFF" stroke-width="2">
                      <g id="Group-2" transform="translate(761.000000, 20.000000)">
                          <g id="search" transform="translate(359.000000, 11.000000)">
                            <circle id="Oval" cx="12" cy="7" r="7"></circle>
                            <path d="M6.5,12.5 L0.479202711,18.5207973" id="Line" stroke-linecap="square"></path>
                          </g>
                      </g>
                  </g>
              </g>
            </svg>
          </button>
        </form>
      </div>
      <!-- 搜索 end -->

      <!-- 用户信息 -->
      <div class="user">
        <a href="#">MaoLin</a>
      </div>
      <!-- 用户信息 end -->

    </div>
    <!-- 头部 end -->

    <div class="banner">
      <ul>
        <li class="banner-left">
          <a href="#">
            <img :src="index[0][0].images.header" alt="">
          </a>
        </li>
        <li class="banner-main">
          <a href="#">
            <img :src="index[1][0].images.header" alt="">
          </a>
        </li>
        <li class="banner-right">
          <a href="#">
            <img :src="index[2][0].images.header" alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div id="Main">
    <div class="content">
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
          }else if(i===8){
            this.index.push(tem_arr)
            this.index[2].name = "高分神作"
            tem_arr=[]
          }
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
  * {
    margin: 0;
    padding: 0;
    font-family: Microsoft Yahei;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  ul {
    list-style-type: none;
  }

  img{
    border:none;
  }

  form {
    display: block
  }

  #header {
    min-width: 1280px;
    height: 360px;
    background: #367096;
    text-align: center;
  }

  #header .head {
    width: 1280px;
    height: 60px;
    padding-top: 20px;
    margin: 0 auto;
  }

  #header .logo {
    float: left;
    color: #fff;
  }

  #header .user {
    float: right;
    position: relative;
    top: 13px;
    right: 68px;
  }

  #header .user a {
    font-size: 12px;
    color: #fff;
  }

  #header .Search {
    width: 400px;
    height: 40px;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    font-size: 0;
  }

  #header .head .Search .type {
    width: 60px;
    height: 40px;
    float: left;
    background: #6CC2F3;
  }

  #header .head .Search .type a {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
  }

  #header .head .Search .input {
    float: left
  }

  #header .head .Search .input input {
    width: 250px;
    height: 40px;
    display: block;
    font-size: 14px;
    border: none;
    outline: none;
    padding: 0 15px;
  }

  #header .head .Search .input input::-webkit-input-placeholder {
    font-size: 14px;
    text-align: center;
    color: #cecece;
  }

  #header .head .Search button {
    width: 60px;
    height: 40px;
    float: left;
    background: #4CC81C;
    border: 0;
    outline: none;
  }

  #header .banner{
    width:1194px;
    height:215px;
    margin:0 auto;
    padding:65px 42px 0;
  }

  #header .banner ul{
    width:100%;
    height:215px;
    position:relative;    
  }

  #header .banner li{
    width:368px;
    height: 172px;
    position:absolute;
    border-radius:5px;
    overflow:hidden;
    bottom:2px;
    box-shadow:0 0 35px #000;
  }

  #header .banner li img{
    width:368px;
    height:172px;
  }

  #header .banner li.banner-left{
    left:0;
  }

  #header .banner li.banner-main{
    width:460px;
    height:215px;
    left:368px;
    z-index:2;
  }

  #header .banner li.banner-main img{
    width:460px;
    height:215px;
  }
  
  #header .banner li.banner-right{
    right:0;
  }

  #Main {
    min-width: 1280px;
    background: #183D58;
  }


  #Main .content {
    width: 1176px;
    height: 800px;
    margin: 0 auto;
    color: #fff;
    padding: 0 52px;
  }

  .thumbnail {
    width: 100%;
    height: 250px;
  }

  .thumbnail .thumbnail-title {
    width: 100%;
    height: 18px;
    font-size: 12px;
    padding: 52px 0 10px 0;
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