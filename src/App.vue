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
                <Tooltip content="最少输入三个字符" class="Fr">
                  <i-Input v-model="search" placeholder="输入应用名称" style="width:192px;font-size:14px;"></Icon>></i-Input>
                </Tooltip>
                <Dropdown trigger="custom" :visible="visible" style="display:block;">
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
          <li v-for="(item,index) in json.hot"><a href="#"><img :src="'https://icdn.static.dawoea.net/steam/apps/'+item+'/header.jpg'" alt="" width="430" height="190"></a></li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data : function (){
    return{
      search: '',
      json : {},
      apiUrl : 'http://rp.dawoea.info/v2/index',
      spinShow:true,
      visible:false,
      retSearch:[]
    }
  },
  watch:{
    search:function(){
      this.getSearch()
    }
  },
  methods:{
    get: function(URL){
      this.$http.get(this.apiUrl).then(res =>{
        this.json = res.data.data
        console.log(this.json.hot)
        this.setBackground(this.json.background)
        setTimeout(setBackground=> {//延迟半秒调用
          this.spinShow=false
        }, 500)
      })
      .catch(function(err){
        console.log(err)
        alert("请求失败")
      })
    },
    setBackground(url){//设置背景
      document.getElementsByTagName("body")[0].setAttribute("style","background:#1b2838 url("+url+") no-repeat;background-size:cover;")
    },
    getSearch:function(){
      var url = "https://api.addones.net/v2/search/apps?keywords="+this.search+"&method=game"
      this.$http.get(url).then(res =>{
        this.retSearch = res.data.data //结果赋值到 retSearch
        this.search!=''?this.visible=true:this.visible=false //显示列表框
        console.log(this.json.hot)
      }).catch(function(){
        console.log(err)
        alert("请求失败")
      })
    }
  },
  created(){
    this.get()
  }
}
</script>

<style>

.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.ivu-spin-main{
  background:#1b2838;
  color:#fff;
}


#app{
  width:100%;
  height:100%;
}

#header{
  width:100%;
  height:42px;
}

body{
  background-size:cover;
  background:#1b2838;
}

.Fr{
  height:42px;
}

.search{
  font-size:0;
  float:right;
}

.item{
  width:1302px;
  margin:70px auto 0;
  font-size:0;
}
.item li{
  display:inline-block;
  margin:2px;
}

.item li a{
  display:inline-block;
}

.item li a:hover{
  opacity:0.7
}

.layout-nav input{
  font-size:14px;
  background:rgba(27, 28, 29, 0.25);
  border:1px solid rgba(27, 28, 29, 0.25);
  color:#fff;
}

.layout-nav{
  width: 1127px;
  margin: 0 auto;
}

.ivu-menu-horizontal{
  height:42px;
  line-height: 42px;
}

.ivu-menu-dark{
  background:rgba(27, 28, 29, 0.25);
}
</style>
