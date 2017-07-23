<template>
  <div id="app">
    <Spin fix v-show="spinShow">
      <Icon type="load-c" size=25 class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div id="header">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <Menu-item name="1">
            <Icon type="ios-home"></Icon>
            Home
          </Menu-item>
          <div class="search">
            <Tooltip content="最少输入三个字符" :disabled="disabled" class="Fr">
              <i-Input v-model="search" placeholder="输入应用名称" @on-blur="searchBlur" @on-focus="searchFocus" @on-enter="searchEnter" style="width:192px;font-size:14px;"></Icon>></i-Input>
            </Tooltip>
            <Dropdown trigger="custom" :visible="visible" style="display:block;" placement="bottom-start">
              <Dropdown-menu slot="list">
                <Dropdown-item v-for="item in retSearch" :key="item.appid">{{item.name}}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
        </div>
      </Menu>
    </div>

    <div class="content">
      <ul class="item">
        <li v-for="(item,index) in img"><a href="#"><img :src="item.images.header+'!jpg'" :alt="item.name"></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        search: '',//搜索框 value
        index: {},
        spinShow: true,//loading 显示状态
        visible: false,//列表框显示状态
        retSearch: [],//搜索结果
        disabled: false,//三字符提示状态
        appInfo: [],//app 详细信息
        img: {}//图片列
      }
    },
    watch: {
      search: function () {
        clearTimeout(this.timeId)
        if (this.search.length > 2) {
          this.disabled = true//关闭文字提示
          //防止频繁调用 500毫秒
          this.timeId = setTimeout(() => {
            this.getSearch()
          }, 400)
        } else {
          this.visible = false//隐藏列表框
          this.retSearch = []//清空搜索结果数组
          this.disabled = false//打开文字提示
          this.img = this.index //恢复初始九张图片
        }
      }
    },
    created() {
      this.getIndex()
    },
    methods: {
      getIndex: function () {
        this.$http.get("https://api.dawoea.net/api/entrance").then(res => {
          this.index = res.data.data
          this.img = res.data.data
          this.setBackground(this.index[0].images.background)
          setTimeout(setBackground => {//延迟半秒调用
            this.spinShow = false //隐藏 longding
          }, 400)
        })
          .catch(err => {
            console.log(err)
            this.$Notice.error({
              title: '请求失败',
              desc: '您可以尝试刷新网页或联系开发人员',
              duration: 0
            })
          })
      },
      setBackground(url) {//设置背景
        document.getElementsByTagName("body")[0].setAttribute("style", "background:#1b2838 url(" + url + ") no-repeat;background-size:cover;")
      },
      getSearch: function () {
        var url = "https://api.dawoea.net/api/search/app?keywords=" + this.search
        this.appInfo = []
        this.$http.get(url).then(res => {
          if (res.data.data.length != 0) {//找到
            this.retSearch = res.data.data.length > 9 ? res.data.data.slice(1, 10) : res.data.data //判断是否大于9个结果并赋值
            this.visible = res.data.data.length > 0 ? true : false //显示列表
          } else if (res.data.data.length === 0) {//未找到
            this.$Message.error('未找到此款游戏')
          }
        }).catch(err => {
          console.log(err)
          this.$Notice.error({
            title: '请求失败',
            desc: '您可以尝试重新搜索',
            duration: 4
          })
        })
      },
      searchBlur: function () { //search 搜索框失去焦点
        this.visible = false //隐藏列表框
      },
      searchFocus: function () { //search 搜索框获得焦点
        if (this.retSearch.length != 0) {//判断搜索结果是否大于0
          this.visible = true //0 并且显示
        }
      },
      searchEnter: function () {
        if (this.visible === true) {
          this.img = this.retSearch
          this.visible = false //隐藏列表框
        }
      },
      getAppInfo: function (appid) {
        var url = "https://api.dawoea.net/v2/getAppInfo/" + appid + "?overview=images,tags"
        this.$http.get(url).then(res => {
          this.appInfo.push(res.data.data)
        }).catch(err => {
          //console.log(err)
        })
      }

    }
  }

</script>

<style>
  .spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .ivu-spin-main {
    background: #1b2838;
    color: #fff;
  }


  #app {
    width: 100%;
    height: 100%;
  }

  #header {
    width: 100%;
    height: 42px;
  }

  body {
    background-size: cover;
    background: #1b2838;
  }

  .Fr {
    height: 42px;
  }

  .search {
    font-size: 0;
    position: relative;
    float:left;
  }

  .content {
    padding-top: 12px;
  }

  .item {
    /* width:1317px; 
  margin:70px auto 0; */
    font-size: 0;
    text-align: center;
    margin: 0 auto;
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
    user-select: none;
  }

  .item li a:hover {
    opacity: 0.7
  }

  .item li a img {
    width: inherit;
    height: inherit;
  }

  .layout-nav input {
    font-size: 14px;
    background: rgba(27, 28, 29, 0.25);
    border: 1px solid rgba(27, 28, 29, 0.25);
    color: #fff;
  }

  .layout-nav {
    margin: 0 auto;
  }

  ul.ivu-menu-horizontal {
    width: 100%;
    height: 42px;
    line-height: 42px;
    position: fixed;
    z-index: 99;
  }

  ul.ivu-menu-dark {
    background: rgba(27, 28, 29, 0.25);
  }
  /* 小屏幕（平板，大于等于 768px） */

  @media screen and (max-width: 400px) {
    .layout-nav {
      width: 100%;
      padding-right: 15px;
    }

    .item li {
      width: 98%;
    }

    ul.ivu-menu-dark {
      background: rgba(27, 28, 29, 0.6);
    }
  }
  /* 中等屏幕（桌面显示器，大于768  小于992） */

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .layout-nav {
      width: 100%;
      padding-right: 20px;
    }

    .item li {
      width: 48%;
    }

  }
  /* 大屏幕（大桌面显示器，大于等于 1200px） */

  @media screen and (min-width: 1200px) {
    .layout-nav {
      width: 1127px
    }

    .item {
      width: 1137px;
    }

    .item li {
      width: 32%;
    }

    .content {
      padding-top: 85px;
    }

    .search {
      float: right
    }
  }
</style>