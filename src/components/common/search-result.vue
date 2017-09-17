<template>
    <div class="search-result" :key="item.appid">
        <div class="search-image left">
            <img :src="item.header" alt="" width="184" height="86">
        </div>
        <div class="search-content left">
            <div class="search-content-right right">
                <div class="search-sidebar-platform">
                    <div class="icon iconfont aone-windows" :class="{support:item.platforms.windows}"></div>
                    <div class="icon iconfont aone-apple" :class="{support:item.platforms.mac}"></div>
                    <div class="icon iconfont aone-steam" :class="{support:item.platforms.linux}"></div>
                </div>
                <span class="issue-date">{{item.release}}发售</span>
            </div>
            <div class="search-content-left">
                <h2 class="search-content-name">{{item.name}}</h2>
                <div class="company">
                    <span class="Max"><span v-for="item in item.publishers">{{item}}</span></span>
                </div>
            </div>
        </div>
    
        <router-link :to="{name:'app',params:{appid:item.appid}}" class="search-button-purchase-big right">
            <em class="iconfont aone-steam"></em>
            <div class="particulars">详情</div>
            <em class="iconfont aone-enter"></em>
        </router-link>
    </div>
</template>
<script>
    export default {
        name:'search-result',
        props:['item']
    }
</script>

<style scoped>
    .left {
        float: left;
    }

    .right{
        float:right
    }

    .search-result {
        width: 938px;
        height: 86px;
        margin: 0 auto 15px;
        background: -webkit-linear-gradient(30deg, #377096, #173D59);
        border-radius: 5px;
        overflow: hidden;
    }

    .search-result .search-sidebar-platform .support {
        opacity: 1 !important;
    }

    .search-result .search-image {
        width: 184px;
        height: 86px;
        background-color: #65B7E6;
    }

    .search-result .search-content {
        width: 550px;
        height: 72px;
        padding: 8px 16px 6px 16px;
        color: #fff;
        font-size: 14px;
    }

    .search-result .search-content .search-content-left {
        width: 425px;
        height: 72px;
    }

    .search-result .search-content .search-content-left .company {
        width:200px;
        position:relative;
    }

    .search-result .search-content .search-content-left .company span.Max{
        width: 172px;
        display:inline-block;
        overflow: hidden;
        white-space: nowrap;
    }

    .search-result .search-content .search-content-right {
        height: 70px;
    }

    .search-result .search-content .search-content-left .company span {
        display: inline-block;
        line-height: 16px;
    }

    .search-result .search-content .search-content-left .company span:not(:last-child):after {
        content: '/';
        margin: 0 5px;
    }

    .search-result .search-content .search-content-left h2 {
        height: 43px;
        line-height: 31px;
        font-size: 24px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .search-result .search-content .search-content-right span.issue-date {
        display: inline-block;
    }


    .search-result .search-content .search-content-right .search-sidebar-platform {
        position: relative;
        /* left:55px; */
        padding-top: 8px;
        height: 39px;
        text-align: right;
    }

    .search-result .search-content .search-content-right .search-sidebar-platform .icon {
        display: inline-block;
        font-size: 18px;
        line-height: 18px;
        margin-left: 12px;
        opacity: 0.3;
    }

    .search-result .search-button-purchase-big {
        width: 148px;
        height: 68px;
        font-size: 14px;
        line-height: 14px;
        padding: 14px 20px 0 0;
        position: relative;
        border: 2px solid #6CC2F3;
        border-radius: 6px;
        text-align: right;
        overflow: hidden;
        background: -webkit-linear-gradient(#377096, #2C5E80);
    }

    .search-result .search-button-purchase-big .particulars {
        padding-bottom: 14px;
    }

    .search-result .search-button-purchase-big .aone-steam {
        position: absolute;
        left: 8px;
        top: 9px;
        color: rgba(0, 0, 0, 0.2);
        font-size: 65px;
        line-height: 65px;
    }

    #Main-highlight .search-result .search-button-purchase-big .aone-enter {
        color: #E8BF67
    }

    #Main-highlight .search-result .search-button-purchase-big .particulars {
        color: #E8BF67
    }

    .search-result .search-button-purchase-big .aone-enter {
        line-height: 36px;
        font-size: 36px;
        color: #6BC2F3
    }
</style>