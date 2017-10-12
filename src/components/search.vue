<template>
    <div>
        <div id="Main-highlight">
            <div class="return"><router-link to="/" class="return-button"><em class="iconfont aone-back"></em> 返回上一页</router-link></div>
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
                this.$http.get("https://api.addones.net/search/app?keywords="+this.search).then((res) => {
                    if(res.data.data.length>0){
                        this.res = res.data.data.slice(1,res.data.data.length)
                        this.highlight = res.data.data[0]
                        this.Relevant = this.res.length>3?this.res.slice(0,5):this.res.slice(0,this.res.length)
                        //this.mescroll.triggerUpScroll() //主动调用上拉刷新
                        this.mescroll.lockUpScroll(false) //取消锁定上拉刷新
                        //this.mescroll.resetUpScroll()
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
<style scoped>

    #Main-highlight .search-result{
        position:relative;
        top:62px;
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

    .return{
        padding:23px;
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

</style>
