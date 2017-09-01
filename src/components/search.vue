<template>
    <div>
        <div id="Main-highlight">
            <router-link to="/" class="return">返回上一页</router-link>
            <search-result :item="highlight" v-if="highlight"></search-result>
        </div>
        <div id="Main-Contents">
            <div class="Contents">
                <div class="Relevant" v-if="(Relevant.length>0)">相关作品</div>
                <search-result v-for="item in Relevant" :item="item" :key="item.appid"></search-result>
                <!-- <router-link to="/" class="return" v-if="Relevant">返回上一页</router-link> -->
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
                Relevant:[],
                highlight:null,
                res:[],
                mescroll:null
            }
        },
        mounted(){
            this.search = this.$route.query.keywords
            if(this.search==='' || this.search.length<3){
                this.$router.push({path:'/'})
            }else{
                this.mescroll = new MeScroll("body",{
                    up:{
                        warpId:"Main-Contents",
                        callback: this.upCallback,
                        page:{
                            num:1,
                            size:3
                        },
                        isLock:true//锁定上拉加载
                    },
                    down:{
                        use:false
                    }
                })
                this.getSearch()//api
            }
        },
        beforeDestroy(){
            this.mescroll.destroy()//销毁scroll事件
        },
        methods: {
            getSearch: function () {
                this.highlight = null
                this.Relevant = []
                this.mescroll.lockUpScroll(true)
                this.$http.get("https://api.addones.net/api/search/app?keywords="+this.search).then((res) => {
                    if(res.data.data.length>0){
                        this.res = res.data.data.slice(1,res.data.data.length)
                        this.highlight = res.data.data[0]
                        this.Relevant = this.res.length>3?this.res.slice(0,3):this.res.slice(0,this.res.length)
                        //this.mescroll.triggerUpScroll() //主动调用上拉刷新
                        this.mescroll.lockUpScroll(false) //取消锁定上拉刷新
                        this.mescroll.resetUpScroll()
                    }else{
                        console.log('game.null')
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            upCallback: function(page){
                console.log(page.num+'===='+page.size)
                this.getListDataFromNet(page.num,page.size,(data)=>{
                    if(page.num ==1) this.Relevant = []
                    this.Relevant = this.Relevant.concat(data)
                    this.mescroll.endSuccess(data.length)
                },function(){

                })
            },
            getListDataFromNet: function(pageNum,pageSize,successCallback,errorCallback){
                setTimeout(()=>{
                    var listData=[]
                    for (let i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
	            		if(i==this.res.length) break
	            		listData.push(this.res[i])
                    }
                    successCallback&&successCallback(listData)
                },500)
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
<style>

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
        line-height:31px;
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
        line-height:31px;
        text-decoration: line-through;
        color: #6CC2F3;
    }

    .search-result .search-button-purchase-big .final{
        height:34px;
        line-height:31px;
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