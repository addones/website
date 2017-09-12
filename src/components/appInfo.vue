<template>
    <div>
        <div id="Main-highlight">
            <div class="return"><router-link to="/" class="return-button"><em class="iconfont aone-back"></em> 返回上一页</router-link></div>
            <div class="head-info">
                <div class="head-image">
                    <img src="https://steamcdn.static.addones.net/steam/apps/447040/header.jpg" width="276" height="129" alt="">
                </div>
                <div class="head-content">
                    <h2 class="title">Watch_Dogs 2</h2>
                    <span class="Online-population">当前有800000玩家在线</span>
                    <div class="lables">
                        <span>PPG</span>
                        <span>中文</span>
                        <span>多人</span>
                        <span>防挂</span>
                        <span>VR</span>
                        <span>18+</span>
                    </div>
                    <div class="platform">
                        <div class="icon iconfont aone-windows support"></div>
                        <div class="icon iconfont aone-apple support"></div>
                        <div class="icon iconfont aone-steam"></div>
                    </div>
                </div>
                <div class="head-steam">
                    <a href="#" class="button"><em class="iconfont aone-steam"></em>去STEAM看看</a>
                    <div class="box">
                        <a href="#" class="Collection"><em class="icon iconfont aone-share"></em><span>收藏</span></a>
                        <a href="#"><em class="icon iconfont aone-dlc"></em>查看DLC</a>
                    </div>
                    
                </div>
            </div>
        </div>
        <div id="Main-Contents">
            <div class="Contents">
                <div class="screenshots">
                    <h2 class="title">游戏截图</h2>
                    <div class="info">
                        <ul class="screenshots-images">
                            <li><a href="#"><img src="" alt=""></a></li>
                            <li><a href="#"><img src="" alt=""></a></li>
                            <li><a href="#"><img src="" alt=""></a></li>
                            <li><a href="#"><img src="" alt=""></a></li>
                        </ul>
                    </div>
                    
                </div>

                <div class="basic-info">
                    <h2 class="title">基础信息</h2>
                    <div class="info">
                        <div class="index-label">
                            75<span>良好</span>
                        </div>
                        <div class="text">
                            <ul>
                                <li>制作团队: <span>Criteria</span><span>Aspyr(Win/Mac)</span></li>
                                <li>发行公司: <span>EA Games</span><span>Aspyr(Win/Mac)</span></li>
                                <li>发行日期: 2017/01/01</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="index">
                    <h2 class="title">指数一览</h2>
                    <div class="info">
                        <ul class="index-item">
                            <li>24<span>玩家平均总游戏时长</span></li>
                            <li>23<span>玩家中位总游戏时长</span></li>
                            <li>23000<span>近两周销量</span></li>
                            <li>1000000<span>总销量</span></li>
                            <li>365<span>发售天数</span></li>
                        </ul>
                    </div>
                </div>

                <div class="return"><router-link to="/" class="return-button"><em class="iconfont aone-back"></em> 返回上一页</router-link></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                appInfo:{}
            }
        },
        create(){
           console.log('safdasdf')
           console.log(this.$route.params)
        },
        methods:{
            getAppInfo:function(){
                this.$http.get('https://api.dawoea.net/api/app/').then((res) => {
                    if(res.data.code === 200){
                        
                    }else if(res.data.code === 401){
                        window.location.href = "https://account.addones.net/home"
                    }
                    console.log(res.data.code)
                }).catch(err => {
                    //console.log(err)
                })
            }
        }
    }
</script>
<style scoped>
    #Main-Contents .Contents{
        width:938px;
    }

    .head-info{
        width:938px;
        height: 129px;
        margin:65px auto 0;
    }

    .head-info .head-image{
        width:276px;
        height: 129px;
        background:#65B7E6;
        border-radius:6px;
        overflow: hidden;
        float:left;
    }

    .head-info .head-content{
        width:485px;
        height: 129px;
        float:left;
        padding-left:17px;
    }

    .head-info .head-content h2.title{
        height:42px;
        font-size:24px;
        line-height:30px;
        color:#fff;
    }
    
    .head-info .head-content span.Online-population{
        display:inline-block;
        height:27px;
        font-size:14px;
        line-height:14px;
        color:#fff;
    }

    .head-info .head-content .lables{
        height:32px;
    }

    .head-info .head-content .lables span{
        display:inline-block;
        width:36px;
        height:16px;
        border:2px solid #5794bc;
        font-size:14px;
        text-align:center;
        line-height:16px;
        margin-right:10px;
        border-radius:4px;
        color:#fff;
    }

    .head-info .head-steam{
        width:160px;
        height:129px;
        float:left;
        font-size:14px;
    }

    .head-info .head-steam a.button{
        display:inline-block;
        width:147px;
        height:56px;
        font-size:14px;
        line-height:56px;
        text-align:right;
        padding-right:9px;
        border:2px solid #6CC2F3;
        border-radius:6px;
        position:relative;
        background:-webkit-linear-gradient(#377096, #2C5E80);
    }

    .head-info .head-steam .box{
        padding:7px 0 0 18px;
    }

    .head-info .head-steam .box a{
        display:block;
    }

    .head-info .head-steam .box .icon{
        color:#68BDEE
    }

    .head-info .head-steam .box .aone-dlc,.head-info .head-steam .box .aone-share{
        margin-right:7px;
    }

    .head-info .head-steam .box a.Collection{
        line-height:20px;
    }

    .return{
        padding:23px 0;
    }

    .return:last-child{
        padding:45px 0;
    }

    .return .return-button{
        display:block;
        width:120px;
        height:40px;
        margin:0 auto;
        font-size:12px;
        line-height:40px;
        text-align:center;
        border-radius:6px;
        background:-webkit-linear-gradient( #437CA2, #31688C);
        box-shadow:0 4px 5px rgba(0,0,0,0.3),0px 1px 1px rgba(75,153,206,1) inset;
        position:relative;
        text-indent:12px;
    }

    .return .iconfont{
        position:absolute;
        font-weight:bold;
        left: 9px;
        text-indent:0;
    }

    .head-info .head-content .platform .icon {
        display: inline-block;
        font-size: 18px;
        line-height: 18px;
        margin-right: 12px;
        opacity: 0.3;
        color:#fff;
    }

    .head-info .head-content .platform .support {
        opacity: 1 !important;
    }

    .head-steam .aone-steam{
        font-size:42px;
        color:rgba(0, 0, 0, 0.3);
        line-height:56px;
        position:absolute;
        left:9px;
    }

    .screenshots{
        height:158px;
        border-bottom:2px solid #377096;
    }

    .Contents h2.title{
        padding-left:5px;
        line-height:158px;
        float:left;
    }

    .Contents .info{
        width:784px;
        padding:36px 0 0 154px;
    }

    .screenshots .screenshots-images{
        width:784px;
        font-size:0;
    }

    .screenshots .screenshots-images li{
        width:184px;
        height:86px;
        background-color:#65B7E6;
        border-radius:6px;
        display:inline-block;
    }

    .screenshots .screenshots-images li:not(:last-child){
        margin-right:16px;
    }

    .basic-info{
        padding-bottom:20px;
        border-bottom:2px solid #377096;
    }

    .basic-info .text ul li{
        height:34px;
        font-size:14px;
        line-height: 14px;
    }

    .basic-info .text ul li span:not(:last-child)::after{
        content:'/';
        margin:0 5px;
    }

    .basic-info .index-label{
        width:301px;
        height:86px;
        line-height:86px;
        float:right;
        background:-webkit-linear-gradient(30deg, #377096, #173D59);
        border-radius:6px;
        font-size:48px;
        text-align: right;
        position: relative;
        padding-right:55px;
    }

    .basic-info .index-label span{
        font-size:14px;
        position:absolute;
        right:18px;
    }

    .index{
        width:938px;
        height:540px;
        border-bottom:2px solid #377096;
    }

    .index .index-item{
        width:862px;
    }
    
    .index .index-item li{
        width:340px;
        height:111px;
        line-height:48px;
        display:inline-block;
        background:-webkit-linear-gradient(30deg, #377096, #173D59);
        margin:0 73px 36px 0;
        padding:18px 0 0 16px;
        border-radius:6px;
        font-size:48px;
        position:relative;
    }

    .index .index-item li span{
        font-size:14px;
        line-height:14px;
        position:absolute;
        left:24px;
        bottom:18px;
    }
</style>