<template>
<div>
	<div class="mainPage">
		<div class="mainTitle">“云·羊宝”（有机）山羊养殖生产管理追溯平台</div>
        <div class="mainNav">
        <router-link to="/search" class="retrospect">
            <div class="box_first">
                <img src="../assets/imgs/retrospect.png">
                <div class="C_name">溯源平台</div>
                <div class="E_name">SUYUAN PLATFORM</div>
            </div>
        </router-link>
        <router-link to="/login" class="organic">
            <div class="box_second">
                <img src="../assets/imgs/findOrganic.png">
                <div class="C_name">寻找有机</div>
                <div class="E_name">SEARCH FOR ORGANIC</div>
            </div>
        </router-link>
        <router-link to="/login" class="produce">
            <div class="box_three">
                <img src="../assets/imgs/produceManager.png">
                <div class="C_name">生产管理</div>
                <div class="E_name">PRODUCTION MANAGEMENT</div>
            </div>
        </router-link>
        <router-link to="/login" class="goods">
            <div class="box_four">
                <img src="../assets/imgs/produceGoods.png">
                <div class="C_name">生产物资</div>
                <div class="E_name">PRODUCTION MATERIALS</div>
            </div>
        </router-link>
        </div>
	</div>
</div>
</template>
<script>
</script>
<style lang="stylus">
@import '../assets/css/color'

.mainPage
    text-align center
    heigth 70%
    padding-top 80px
    padding-bottom 80px
    .mainTitle
        text-align center
        color #FFFFFF
        font-size 28px
        font-family: Arial,'Raleway', sans-serif
        font-weight bold
        margin-bottom 60px
    .mainNav
        .retrospect, .organic, .produce, .goods
            color #FFFFFF
            width 13%
            .box_first, .box_second, .box_three, .box_four
                background rgba(255,255,255,0)
                border 1px solid white
                border-radius 10%
                img
                    width 80px
                    heigth 80px
                    padding-top 40px
                .C_name
                    font-size 18px
                    padding-top 50px
                    padding-bottom 5px
                .E_name
                    -webkit-text-size-adjust none
                    font-size:9px 
                    -webkit-transform:scale(0.75)
                    padding-bottom 20px
                    white-space nowrap
            .box_first:hover, .box_second:hover, .box_three:hover, .box_four:hover
                background rgba(255,255,255,0.3)
                box-shadow 0 3px 3px rgba(255,255,255,0.1),
                0 3px 0 #bbb, 0 4px 0 #aaa,0 5px 5px #444
                transition 0.6s
                -moz-transition 1s /* Firefox 4 */
                -webkit-transition 1s /* Safari 和 Chrome */
                -o-transition 1s /* Opera */
        .organic, .produce, .goods
            width 13%
            margin-left 6%
</style>
