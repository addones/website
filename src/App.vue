<template>
  <div id="app">
    <div id="header">

      <!-- 头部 -->
      <div class="Main-Navi">
        <div class="logo">
          <h2>Addones</h2>
        </div>
        <!-- 搜索 -->
        <div class="Search">
          <form @submit.prevent="submit">
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
              <input type="text" placeholder="搜索推荐内容，如新作或新活动" v-model="search" name="keywords">
            </div>
            <router-link :to="{name:'Search',query:{keywords:search}}"  class="iconfont aone-search"></router-link>
          </form>
        </div>
        <!-- 搜索 end -->

        <!-- 用户信息 -->
        <div class="user">
          <a>登录&ensp;|&ensp;注册</a>
        </div>
        <!-- 用户信息 end -->

      </div>
      <!-- 头部 end -->

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        search:''
      }
    },
    created() {

    },
    methods: {
      submit:function(){
        if(this.search.length>=3){
          this.$router.push({path:"/search",query:{keywords:this.search}})
        }
      }
    }
  }

</script>

<style>
  #header {
    min-width: 1280px;
    height: 80px;
    background: #367096;
  }

  #header .Main-Navi {
    width: 1280px;
    height: 60px;
    padding-top: 20px;
    margin: 0 auto;
    position:relative;
  }

  .Main-Navi .logo {
    float: left;
    color: #fff;
    font-size:23px;
    padding-left:15px;
  }

  .Main-Navi .logo h2{
    font-size:24px;
  }

  .Main-Navi .user {
    float: right;
    position: relative;
    top: 13px;
    right: 68px;
  }

  .Main-Navi .user a {
    font-size: 12px;
    color: #fff;
  }

  .Main-Navi .Search {
    width: 400px;
    height: 40px;
    position:absolute;
    left:50%;
    margin-left:-200px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow:0 0 15px rgba(0,0,0,0.3);
    font-size: 0;
    text-align:center;
  }


  #header .Main-Navi .Search .type {
    width: 60px;
    height: 40px;
    float: left;
    background: #6CC2F3;
  }

  #header .Main-Navi .Search .type a {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
  }

  #header .Main-Navi .Search .input {
    float: left
  }

  #header .Main-Navi .Search .input input {
    width: 250px;
    height: 40px;
    display: block;
    font-size: 14px;
    border: none;
    outline: none;
    padding: 0 15px;
  }

  #header .Main-Navi .Search .input input::-webkit-input-placeholder {
    font-size: 14px;
    text-align: center;
    color: #cecece;
  }

  #header .Main-Navi .Search .aone-search {
    width: 60px;
    height: 40px;
    line-height:40px;
    font-size:25px;
    float: left;
    background: #4CC81C;
    border: 0;
    outline: none;
  }

  #Main-highlight{
    min-width:1280px;
    height:280px;
    background:#367096;
  }

  #Main-Contents {
    min-width: 1280px;
    min-height: 660px;
    background: #183D58;
  }


  #Main-Contents .Contents {
    width: 1280px;
    margin: 0 auto;
    color: #fff;
  }

</style>
