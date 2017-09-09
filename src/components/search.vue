<template>
    <div>
        <div id="Main-highlight">
            <router-link to="/" class="return"><em class="iconfont aone-back"></em> 返回上一页</router-link>
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
                            size:5
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
                        this.Relevant = this.res.length>3?this.res.slice(0,5):this.res.slice(0,this.res.length)
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

    #Main-highlight .search-result{
        position:relative;
        top:42px;
    }

    #Main-highlight .search-result .search-button-purchase-big{
        border-color:#E8BF67;
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

    .right{
        float:right
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
        position:relative;
        text-indent:12px;
    }

    .return .iconfont{
        position:absolute;
        font-weight:bold;
        left: 9px;
        text-indent:0;

    }

    .search-result {
        width: 938px;
        height: 86px;
        margin: 0 auto 15px;
        background: -webkit-linear-gradient(30deg, #377096, #173D59);
        border-radius: 5px;
        overflow: hidden;
    }

    .search-result .search-sidebar-platform .support{
        opacity:1 !important;
    }

    .search-result .search-image {
        width: 184px;
        height: 86px;
        background-color: #65B7E6;
    }

    .search-result .search-content {
        width: 550px;
        height: 70px;
        padding: 8px 16px 8px 16px;
        color: #fff;
        font-size:14px;
    }

    .search-result .search-content .search-content-left{
        width:425px;
        height:70px;
    }

    .search-result .search-content .search-content-left .company{
        width:200px;
        height: 16px;
        overflow: hidden;
        white-space:nowrap;
    }

    .search-result .search-content .search-content-right{
        height:70px;
    }

    .search-result .search-content .search-content-left .company span{
        display:inline-block;
        line-height:16px;
    }
    .search-result .search-content .search-content-left .company span:not(:last-child):after{
        content:'/';
        margin:0 5px;
    }

    .search-result .search-content .search-content-left h2 {
        height: 43px;
        line-height:31px;
        font-size: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .search-result .search-content .search-content-right span.issue-date{
        display:inline-block;
    }
    

    .search-result .search-content .search-content-right .search-sidebar-platform{
        position:relative;
        /* left:55px; */
        padding-top:8px;
        height: 39px;
        text-align:right;
    }

    .search-result .search-content .search-content-right .search-sidebar-platform .icon{
        display:inline-block;
        font-size:18px;
        line-height:18px;
        margin-left:12px;
        opacity:0.3;
    }

    .search-result .search-button-purchase-big {
        width: 148px;
        height: 68px;
        font-size: 14px;
        line-height:14px;
        padding:14px 20px 0 0;
        position: relative;
        border: 2px solid #6CC2F3;
        border-radius: 6px;
        text-align: right;
        overflow: hidden;
        background:-webkit-linear-gradient(#377096, #2C5E80);
    }

    .search-result .search-button-purchase-big .particulars{
        padding-bottom:14px;
    }

    .search-result .search-button-purchase-big .aone-steam{
        position:absolute;
        left: 8px;
        top:9px;
        color:rgba(0,0,0,0.2);
        font-size:65px;
        line-height:65px;
    }

    #Main-highlight .search-result .search-button-purchase-big .aone-enter{
        color:#E8BF67
    }

    #Main-highlight .search-result .search-button-purchase-big .particulars{
        color:#E8BF67
    }

    .search-result .search-button-purchase-big .aone-enter{
        line-height:36px;
        font-size:36px;
        color:#6BC2F3
    }

</style>