<template>
  <div id="app">
    <Spin fix v-show="spinShow">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
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
              <i-Input v-model="search" placeholder="输入应用名称" @on-blur="listBlur" @on-focus="listFocus" style="width:192px;font-size:14px;"></Icon>></i-Input>
            </Tooltip>
            <Dropdown trigger="custom" :visible="visible" style="display:block;" placement="bottom-start">
              <Dropdown-menu slot="list">
                <Dropdown-item v-for="item in retSearch">{{item.name}}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
        </div>
      </Menu>
    </div>

    <div class="content">
      <ul class="item">
        <li v-for="(item,index) in json.hot"><a href="#"><img :src="'https://icdn.static.dawoea.net/steam/apps/'+item.appid+'/header.jpg'" alt=""></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data: function () {
      return {
        search: '',
        json: {},
        apiUrl: 'https://api.addones.net/v2/index',
        spinShow: true,
        visible: false,
        retSearch: [],
        disabled: false
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
        }
      }
    },
    created() {
      this.get()
    },
    methods: {
      get: function (URL) {
        this.$http.get(this.apiUrl).then(res => {
          this.json = res.data.data
          this.setBackground(this.json.background)
          setTimeout(setBackground => {//延迟半秒调用
            this.spinShow = false
          }, 400)
        })
          .catch(err => {
            console.log(err)
            this.$Notice.error({
              title: '请求失败',
              desc: '您可以尝试刷新网页，或者联系开发人员',
              duration: 0
            })
          })
      },
      setBackground(url) {//设置背景
        document.getElementsByTagName("body")[0].setAttribute("style", "background:#1b2838 url(" + url + ") no-repeat;background-size:cover;")
      },
      getSearch: function () {
        var url = "https://api.addones.net/v2/search/apps?keywords=" + this.search + "&method=game"
        this.$http.get(url).then(res => {
          this.retSearch = res.data.count > 9 ? res.data.data.slice(1, 10) : this.retSearch = res.data.data //判断是否大于9个结果并赋值
          this.visible = res.data.code == 200 ? true : false //显示列表
          if (res.data.code == 404 & res.data.msg == "not found") {
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
      listBlur: function () { //search 搜索框失去焦点
        this.visible = false //隐藏列表框
      },
      listFocus: function () { //search 搜索框获得焦点
        if (this.retSearch.length != 0) {//判断搜索结果是否大于0
          this.visible = true //0 并且显示
        }
      }
    }
  }

</script>

<style>
  /* 小屏幕（平板，大于等于 768px） */

  @media screen and (max-width: 400px) {
    .layout-nav {
      width: 100%;
      padding-right: 15px;
    }
    .item {
      width: 98%;
      margin: 15px auto 0;
    }

    .item li {
      width: 98%;
    }

    .search {
      float: left
    }

    .ivu-menu-dark {
      background: rgba(27, 28, 29, 0.6);
    }
  }
  /* 中等屏幕（桌面显示器，大于768  小于992） */

  @media screen and (min-width: 768px) and (max-width: 992px) {
    .layout-nav {
      width: 100%;
      padding-right: 20px;
    }
    .item {
      width: 100%;
      margin: 15px auto 0;
    }

    .item li {
      width: 48%;
    }

    .search {
      float: left
    }
  }
  /* 大屏幕（大桌面显示器，大于等于 1200px） */

  @media screen and (min-width: 1200px) {
    .layout-nav {
      width: 1127px
    }

    .item {
      width: 1137px;
      margin: 75px auto 0;
    }

    .item li {
      width: 32%;
    }

    .search {
      float: right;
    }
  }

  .demo-spin-icon-load {
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
  }

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
    border-radius:4px;
    overflow:hidden;
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

  .ivu-menu-horizontal {
    position:fixed;
    width:100%;
  }
</style>