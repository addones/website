<template>
  <div class="content">
    <Spin fix v-show="spinShow">
      <Icon type="load-c" size="20" class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <Row class-name="item">
      <Col class-name="list" :xs="24" :sm="12" :lg="8" v-for="(item,index) in index" :key="item.appid"><div class="thumbnail"><a href="#"><img :src="item.images.header+'!jpg'" :alt="item.name"></a></div></Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      index:{},
      spinShow: true,//loading 显示状态
    }
  },
  created(){
    this.getIndex()
  },
  methods:{
    getIndex: function () {
      this.$http.get("https://api.dawoea.net/api/entrance").then((res) => {
        this.index = res.data.data
        console.log(this.index)
        this.setBackground(this.index[0].images.background)
        setTimeout(setBackground => {//延迟半秒调用
          this.spinShow = false //隐藏 longding
        }, 400)
      })
      .catch((err) => {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .content{
    padding-top:42px;
  }

  .content .item {
    font-size: 0;
    margin: 0 auto;
    padding:10px 2px 0;
  }

  .item .list {
    padding: 2px;
  }
  
  .item .list .thumbnail{
    max-width:370px;
    margin:0 auto;
  }

  .item a {
    display: inline-block;
    /* width:435px; */
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    user-select: none;
  }

  .item a:hover {
    opacity: 0.7
  }

  .item a img {
    width: inherit;
  }

  /* 小屏幕（手机，大于等于400px） */
  @media (min-width: 768px) {

    .item{
      width:750px;
    }

  }

  /* 大屏幕（大桌面显示器，大于等于 1200px） */

  @media (min-width: 1200px) {
    .content .item{
      width:1127px;
      padding-top: 85px;
    }
  }
</style>
