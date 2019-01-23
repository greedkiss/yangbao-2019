<template>
	<div class="login-main">
        <div class="head_title">
            <router-link to="/"><img src="../../assets/imgs/login-logo.png" alt="logo"></router-link>
        </div>
        <div class="outer-box">
            <div class="left-box">
                <div class="profession">
                    <img src="http://qiniu.yunyangbao.cn/professional.png" alt="profession">
                </div>
                <div class="title_box">
                    <p>云·羊宝有机山羊养殖生产管理平台</p>
                </div>
            </div>
            <div class="right-box">
                
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style lang="stylus">
.login-main
    background url(http://qiniu.yunyangbao.cn/login.jpg) no-repeat center
    background-size cover
    width 100%
    height 100%
    .head_title
        padding-top 10%
        text-align center
        img
            width 350px
            height 130px
    .outer-box
        margin 0 auto
        margin-top 50px
        width 50%
        background black
        height 300px
        .left-box
            width 88%
            height 300px
            background white
            .profession
                img
                    float left
                    height 300px
                    width 39%
</style>
