<template>
    <div>
        <div id="Main-highlight">
            <!-- 返回按钮 -->
            <div class="return"><router-link to="/" class="return-button"><em class="iconfont aone-back"></em> 返回上一页</router-link></div>
            <!-- 返回按钮 end -->
            <div class="head-info">
                <div class="head-image">
                    <img :src="app.common.images.header" width="276" height="129" alt="">
                </div>
                <div class="head-steam">
                    <a href="#" class="button"><em class="iconfont aone-steam"></em>去STEAM看看</a>
                    <div class="box">
                        <a href="#" class="Collection"><em class="icon iconfont aone-share"></em><span>收藏</span><em class="icon iconfont aone-share"></em></a>
                        <a href="#"><em class="icon iconfont aone-dlc"></em><span>查看DLC</span></a>
                    </div>
                </div>
                <div class="head-content">
                    <h2 class="title">{{app.common.name}}</h2>
                    <span class="Online-population">当前有{{app.common.online}}位玩家在线</span>
                    <div class="lables">
                        <span v-for="item in app.common.tags.slice(0,6)" :key="item">{{item}}</span>
                    </div>
                    <div class="platform">
                        <div class="icon iconfont aone-windows" :class="{support:app.common.platforms.windows}"></div>
                        <div class="icon iconfont aone-apple" :class="{support:app.common.platforms.mac}"></div>
                        <div class="icon iconfont aone-steam" :class="{support:app.common.platforms.linux}"></div>
                    </div>
                </div>
                
            </div>
        </div>
        <div id="Main-Contents">
            <div class="Contents">
                <div class="info-basic-producer screenshots">
                    <h2 class="title">游戏截图</h2>
                    <div class="info">
                        <ul class="screenshots-images">
                            <li><img src="" alt=""></li>
                            <li><img src="" alt=""></li>
                            <li><img src="" alt=""></li>
                            <li><img src="" alt=""></li>
                        </ul>
                    </div>
                    
                </div>

                <div class="info-basic-producer basic-info">
                    <h2 class="title">基础信息</h2>
                    <div class="info">
                        <div class="index-label">
                            <div class="addone">
                                <div class="addone-bg addone-top">+1指数</div>
                                <div class="addone-bg addone-bottom">Addone</div>
                            </div>
                            <div class="addone-data">{{app.score.addones!=null?app.score.addones:'暂无'}}</div>
                            <span v-if="app.score.addones">良好</span>
                        </div>
                        <div class="text">
                            <ul>
                                <li>
                                    <div class="text-title">制作团队：</div>
                                    <div class="text-content">
                                        <span v-for="item in app.common.developers" :key="item">{{item}}</span>
                                    </div>
                                </li>
                                <li>
                                    <div class="text-title">发行公司：</div>
                                    <div class="text-content">
                                        <span v-for="item in app.common.publishers" :key="item">{{item}}</span>
                                    </div>
                                </li>
                                <li><div class="text-title">发行日期：</div>{{app.common.release_date.format}}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="info-basic-producer index">
                    <h2 class="title">指数一览</h2>
                    <div class="info">
                        <ul class="index-item">
                            <li>{{app.parameter.average_forever!=null?app.parameter.average_forever:'暂无'}}<span>玩家平均总游戏时长</span></li>
                            <li>{{app.parameter.median_forever!=null?app.parameter.median_forever:'暂无'}}<span>玩家中位总游戏时长</span></li>
                            <li>{{app.parameter.owners_2weeks!=null?app.parameter.owners_2weeks:'暂无'}}<span>近两周销量</span></li>
                            <li>{{app.parameter.owners!=null?app.parameter.owners:'暂无'}}<span>总销量</span></li>
                            <li>{{app.common.release_date.humans!=null?app.common.release_date.humans:'暂无'}}<span>发售天数</span></li>
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
                //默认数据结构和数据
                app:{//初始值
                    common:{
                        name:'',//游戏名
                        is_presell:null,//预售
                        images:{//图片
                            header:''
                        },
                        tags:[],
                        online:0,//在线人数
                        platforms:{//平台
                            windows:0,
                            mac:0,
                            linux:0
                        },
                        developers:[],//制作公司
                        publishers:[],//发行公司
                        release_date:{
                            humans:'',//发售天数
                            format:undefined//发行日期
                        }
                    },
                    parameter:{//num
                        owners: '',//总销量
                        owners_2weeks: '',//近两周销量
                        average_forever: '',//玩家平均总游戏时长
                        median_forever: ''//玩家中位总游戏时长
                    },
                    score:{
                        addones:'' //+1指数
                    }
                },
                appDefault:{//数据为空时，返回结果
                    common:{
                        name:undefined,//游戏名
                        is_presell:false,//预售
                        images:{//图片
                            header:null
                        },
                        tags:[],
                        online:0,//在线人数
                        platforms:{//平台
                            windows:0,
                            mac:0,
                            linux:0
                        },
                        developers:[],//制作公司
                        publishers:[],//发行公司
                        release_date:{
                            humans:null,//发售天数
                            format:undefined//发行日期
                        }
                    },
                    parameter:{//num
                        owners: null,//总销量
                        owners_2weeks: null,//近两周销量
                        average_forever: null,//玩家平均总游戏时长
                        median_forever: null//玩家中位总游戏时长
                    },
                    score:{
                        addones:null //+1指数
                    }
                }
            }
        },
        mounted(){
           console.log(this.$route.params.appid)
           this.getAppInfo(this.$route.params.appid)
        },
        methods:{
            getAppInfo:function(appid){
                this.$http.get('https://api.dawoea.net/api/app/'+appid).then((res) => {
                    this.app = this.extend(res.data.data,this.appDefault)
                }).catch(err => {
                    //console.log(err)
                })
            },
            extend: function (userOption, defaultOption) {
                if (!userOption) return defaultOption;
                for (let key in defaultOption) {
                    if (userOption[key] == null) {
                        userOption[key] = defaultOption[key];
                    } else if (typeof userOption[key] == "object") {
                        this.extend(userOption[key], defaultOption[key]); //深度匹配
                    }
                }
                return userOption;
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
        width:470px;
        height: 129px;
        float:left;
        padding:0 15px 0 17px;
    }

    .head-info .head-content h2.title{
        height:42px;
        font-size:24px;
        line-height:30px;
        color:#fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
        width:28px;
        height:16px;
        border:2px solid #5794bc;
        font-size:14px;
        line-height:16px;
        margin-right:10px;
        padding:0 4px;
        border-radius:4px;
        color:#fff;
        overflow: hidden;
    }

    .head-info .head-steam{
        width:160px;
        height:129px;
        float:right;
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

    .head-info .head-steam .box a.Collection span{
        padding:0 24px 0 7px;
    }
    .head-info .head-steam .box a span{
        padding-left:7px
    }

    .head-info .head-steam .box a.Collection{
        height:30px;
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
        height:160px;
    }

    .info-basic-producer{
        position:relative;
    }

    .info-basic-producer::after{
        content:'';
        width:100%;
        height:2px;
        display:block;
        position:absolute;
        bottom:0;
        background:-webkit-linear-gradient(30deg, #173D59, #377096,#173D59);
    }

    .Contents h2.title{
        padding:63px 0 0 5px;
        font-size:24px;
        line-height:32px;
        float:left;
        font-weight:500;
    }

    .Contents .info{
        padding-left:154px !important;
    }

    .screenshots .screenshots-images{
        width:784px;
        overflow: hidden;
        padding-top:36px;
    }

    .screenshots .screenshots-images li{
        width:184px;
        height:86px;
        float:left;
        background-color:#65B7E6;
        border-radius:6px;
        overflow: hidden;
        cursor: pointer;
    }

    .screenshots .screenshots-images li:not(:last-child){
        margin-right:16px;
    }

    .screenshots .screenshots-images li a img{
        width:inherit;
        height: inherit;
    }

    .basic-info .info{
        padding:28px 0 12px 0;
    }

    .basic-info .text{
        padding-right:428px;
    }

    .basic-info .text .text-title{
        width:70px;
        float:left;
    }

    .basic-info .text .text-content{
        padding-left:70px;
    }

    .basic-info .text .text-content span{
        display:inline-block;
    }

    .basic-info .text ul li{
        height:40px;
        font-size:14px;
        line-height: 20px;
        overflow: hidden;
    }

    .basic-info .text ul li span:not(:last-child)::after{
        content:'/';
        margin:0 5px;
    }

    .basic-info .index-label{
        width:356px;
        height:86px;
        line-height:86px;
        float:right;
        background:-webkit-linear-gradient(30deg, #377096, #173D59);
        border-radius:6px;
        font-size:48px;
        text-align: right;
        position: relative;
        margin-top:8px;
        overflow: hidden;
    }

    .basic-info .index-label .addone-data{
        position:absolute;
        right:55px;
        z-index:99;
    }

    .basic-info .index-label .addone{
        position:absolute;
        top:-8px;
        left:-13px;
        width:256px;
        height: 100px;
        transform:rotate(-30deg)
    }

    .basic-info .index-label .addone .addone-bg{
        display:block;
        font-size:46px;
        line-height:47px;
        text-align:left;
    }

    .basic-info .index-label .addone .addone-top{
        color:#6BC2F3;
    }

    .basic-info .index-label .addone .addone-bottom{
        padding-left:75px;
        color:#377096;
    }

    .basic-info .index-label .text{
        padding-right:370px;
        overflow: hidden;
    }

    .basic-info .index-label span{
        font-size:14px;
        position:absolute;
        right:18px;
    }

    .index{
        width:938px;
    }

    .index .index-item{
        width:862px;
        padding:36px 0 11px 0;
        overflow: hidden
    }
    
    .index .index-item li{
        width:340px;
        height:111px;
        line-height:48px;
        float:left;
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