<template>
    <div class="Home">
        Home
    </div>
</template>

<script>
    export default {
        name: 'Home',
        created() {
            this.isLogin()
        },
        data() {
            return {
                index: {},
                spinShow: true,//loading 显示状态
            }
        },
        methods: {
            isLogin: function () {
                var url = "https://api.dawoea.net/user/me"
                this.$http.get(url).then((res) => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .Home {
        padding-top: 42px;
        color: #fff;
    }
</style>