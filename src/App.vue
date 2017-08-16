<template>
  <div id="app">
    <div id="layout">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <Menu-item name="home">
            <Icon type="ios-home"></Icon>
            <router-link :to="{path:'/Home'}">Home</router-link>
          </Menu-item>
          <div class="login">
            <a href="https://account.addones.net/login">Login</a>
            <a href="https://account.addones.net/register">Register</a>
          </div>
          <div class="search">
            <Tooltip content="最少输入三个字符" :disabled="disabled" class="Fr">
              <Input v-model="search" placeholder="输入应用名称" @on-blur="searchBlur" @on-focus="searchFocus" @on-enter="searchEnter" style="width:192px;font-size:14px;"></Icon>></Input>
            </Tooltip>
            <Dropdown trigger="custom" :visible="visible" style="display:block;" @on-click="getAppInfo" placement="bottom-start">
              <Dropdown-menu slot="list">
                <Dropdown-item v-for="item in retSearch" :key="item.appid" :name="item.appid">{{item.name}}</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
        </div>
      </Menu>

      <router-view></router-view>
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
        visible: false,//列表框显示状态
        retSearch: [],//搜索结果
        disabled: false,//三字符提示状态
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
      this.$Loading.config({color:'#1adeb5',height:3})
    },
    methods: {
      getSearch: function () {
        var url = "https://api.dawoea.net/api/search/app?keywords=" + this.search
        this.appInfo = []
        this.$Loading.start()
        this.$http.get(url).then((res) => {
          if (res.data.data.length != 0) {//找到
            this.$Loading.finish()
            this.retSearch = res.data.data.length > 9 ? res.data.data.slice(0, 9) : res.data.data //判断是否大于9个结果并赋值
            this.visible = res.data.data.length > 0 ? true : false //显示列表
          } else if (res.data.data.length === 0) {//未找到
            this.$Message.error('未找到此款游戏')
            this.retSearch=[]
            this.$Loading.error()
          }
        }).catch((err) => {
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
          console.log(res.data.data)
        }).catch(err => {
          //console.log(err)
        })
      }

    }
  }

</script>

<style>

  #app {
    width: 100%;
    height: 100%;
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

  .layout-nav input {
    font-size: 14px;
    background: rgba(27, 28, 29, 0.25);
    border: 1px solid rgba(27, 28, 29, 0.25);
    color: #fff;
  }

  .layout-nav {
    width: 100%;
    margin: 0 auto;
  }

  ul.ivu-menu-horizontal {
    width: 100%;
    height: 42px;
    line-height: 42px;
    position: fixed;
    z-index: 99;
  }

  .layout-breadcrumb{
    padding: 10px 15px 0;
  }

  ul.ivu-menu-dark {
    background: rgba(27, 28, 29, 0.25);
  }

  .login{
    float:right;
    margin-left:15px
  }

  .login a{
    display:inline-block;
    padding:0 8px;
    color:#fff;
  }

  /* 大屏幕（大桌面显示器，大于等于 1200px） */

  @media (min-width: 1200px) {
    .layout-nav {
      width: 1127px
    }

    .search {
      float: right
    }
  }
</style>