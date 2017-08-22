<template>
    <div>
        <div id="Main-highlight">
            <router-link to="/" class="return">返回上一页</router-link>
            <div class="search-result" v-if="highlight">
                <div class="search-sidebar-platform left">
                    <div class="icon iconfont aone-windows support"></div>
                    <div class="icon iconfont aone-apple"></div>
                    <div class="icon iconfont aone-steam"></div>
                </div>
                <div class="search-image left">
                    <img :src="highlight.images.header" alt="" width="276" height="129">
                </div>
                <div class="search-content left">
                    <h2>{{highlight.name}}</h2>
                    <div class="search-content-bottom">
                        <div class="info-basic">
                            <span class="company">暴雪娱乐</span>
                            <ul>
                                <li>RPG</li>
                                <li>18+</li>
                            </ul>
                            <span class="issue-date">2017年1月1日发售</span>
                        </div>
                        <div class="info-index">
                            <div class="num-tag highlight">+1推荐指数：8.5/10</div>
                            <div class="num-tag">在线人数：30000</div>
                            <div class="num-tag">点评总数：<a href="#">30000</a></div>
                        </div>
                    </div>
                </div>
                <a href="" class="search-button-purchase-big left">
                    <div class="orig">￥249</div>
                    <div class="final"><span class="pct">-30%</span>￥174</div>
                    <div class="title">到STEAM商店购买</div>
                </a>
            </div>
        </div>
        <div id="Main-Contents">
            <div class="Contents">
                <div class="Relevant" v-if="Relevant">相关作品</div>

                <div class="search-result" v-for="item in Relevant">
                    <div class="search-sidebar-platform left">
                        <div class="icon iconfont aone-windows support"></div>
                        <div class="icon iconfont aone-apple"></div>
                        <div class="icon iconfont aone-steam"></div>
                    </div>
                    <div class="search-image left">
                        <img :src="item.images.header" :alt="item.name" width="276" height="129">
                    </div>
                    <div class="search-content left">
                        <h2>{{item.name}}</h2>
                        <div class="search-content-bottom">
                            <div class="info-basic">
                                <span class="company">暴雪娱乐</span>
                                <ul>
                                    <li>RPG</li>
                                    <li>18+</li>
                                </ul>
                                <span class="issue-date">2017年1月1日发售</span>
                            </div>
                            <div class="info-index">
                                <div class="num-tag highlight">+1推荐指数：8.5/10</div>
                                <div class="num-tag">在线人数：30000</div>
                                <div class="num-tag">点评总数：<a href="#">30000</a></div>
                            </div>
                        </div>
                    </div>
                    <a href="" class="search-button-purchase-big left">
                        <div class="orig">￥249</div>
                        <div class="final"><span class="pct">-30%</span>￥174</div>
                        <div class="title">到STEAM商店购买</div>
                    </a>
                </div>

                <router-link to="/" class="return" v-if="Relevant">返回上一页</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                search:'',
                Relevant:null,
                highlight:null
            }
        },
        created() {
            this.search = this.$route.query.keywords
            if(this.search===undefined || this.search===''){
                this.$router.push({path:'/'})
            }else if(this.search.length<3){
                this.$router.push({path:'/'})
            }
            this.getSearch()
        },
        methods: {
            getSearch: function () {
                this.$http.get("https://api.addones.net/api/search/app?keywords="+this.search).then((res) => {
                    if(res.data.data.length!=0){
                        this.highlight = res.data.data[0]
                        this.Relevant = res.data.data.length>3?res.data.data.slice(1,4):res.data.data.slice(1,res.data.data.length)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        watch:{
            '$route' (to, from) {
                this.search = to.query.keywords
                this.getSearch()
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #Main-highlight{
        padding-top:23px;
        height:257px;
    }

    .Relevant {
        width: 1280px;
        height: 46px;
        line-height: 46px;
        margin: 0 auto;
        text-align: center;
        font-size: 12px;
        letter-spacing: 8px;
        color: #fff;
    }

    .left {
        float: left;
    }

    #Main-highlight .return{
        margin-bottom:43px;
    }

    .return{
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
    }

    .search-result {
        width: 978px;
        height: 129px;
        margin: 0 auto 45px;
        background: -webkit-linear-gradient(30deg, #377096, #173D59);
        border-radius: 5px;
        overflow: hidden;
    }

    .search-result .search-sidebar-platform {
        width: 40px;
        height: 119px;
        background: #2A5B7C;
        padding-top:10px;
        line-height:0;
        color:#fff;
    }

    .search-result .search-sidebar-platform .icon{
        width:40px;
        height:37px;
        line-height:37px;
        text-align:center;
        opacity:0.35;
        font-size:18px;
    }

    .search-result .search-sidebar-platform .support{
        opacity:1;
    }

    .search-result .search-image {
        width: 276px;
        height: 129px;
        background-color: #65B7E6;
    }

    .search-result .search-content {
        width: 426px;
        height: 113px;
        padding: 8px 20px 8px 16px;
        color: #fff;
    }

    .search-result .search-content h2 {
        height: 33px;
        font-size: 24px;
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .search-result .search-content .search-content-bottom {
        line-height: 0;
        height: 72px;
    }

    .search-result .search-content .info-basic {
        float: left;
    }

    .search-result .search-content .info-basic span {
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
    }

    .search-result .search-content .info-basic span.company {
        height: 32px;
        display: inline-block;
    }

    .search-result .search-content .info-basic ul {
        height: 26px;
        font-size: 0;
    }

    .search-result .search-content .info-basic ul li {
        width: 32px;
        height: 16px;
        line-height: 16px;
        display: inline-block;
        border: 2px solid #5794BC;
        border-radius: 4px;
        padding: 0px 2px;
        font-size: 13px;
        text-align: center;
        margin-right: 10px;
    }

    .search-result .search-content .info-index {
        padding-top: 15px;
        float: right;
        text-align: right;
    }

    .search-result .search-content .info-index .num-tag {
        height: 22px;
        font-size: 14px;
        line-height: 14px;
    }

    .search-result .search-content .info-index .num-tag a {
        display: inline-block;
        line-height: 12px;
        color: #6CC2F3;
        border-bottom: 2px solid #6CC2F3;
    }

    .search-result .search-content .info-index .highlight {
        color: #FFCE69;
    }

    .search-result .search-button-purchase-big {
        width: 166px;
        height: 109px;
        font-size: 24px;
        position: relative;
        padding: 8px 15px;
        border: 2px solid #6CC2F3;
        border-radius: 6px;
        text-align: right;
        overflow: hidden;
        background: url('../assets/steam-big.svg') no-repeat 16px 18px, -webkit-linear-gradient(#377096, #2C5E80);
    }

    .search-result .search-button-purchase-big .orig {
        height: 34px;
        text-decoration: line-through;
        color: #6CC2F3;
    }

    .search-result .search-button-purchase-big span.pct {
        height: 34px;
        color: #4CC81D;
    }

    .search-result .search-button-purchase-big .title {
        font-size: 14px;
        line-height: 14px;
        position: absolute;
        bottom: 14px;
        right: 15px;
    }
</style>