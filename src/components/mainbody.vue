<template>
	<div class="mainPage">
    <div class="mainTitle">云·羊宝（有机）山羊养殖生产管理追溯平台</div>
        <div class="mainNav">
        <router-link to="/findOrganic" class="organic" target="_blank">
            <div class="box_second">
                <img src="../assets/imgs/findOrganic.png">
                <div class="C_name">寻找有机</div>
                <div class="E_name">SEARCH FOR ORGANIC</div>
            </div>
        </router-link>
        <router-link to="/search" class="retrospect" target="_blank">
            <div class="box_first">
                <img src="../assets/imgs/retrospect.png">
                <div class="C_name">溯源平台</div>
                <div class="E_name">SUYUAN PLATFORM</div>
            </div>
        </router-link>
        <router-link to="/login" class="produce" target="_blank">
            <div class="box_three">
                <img src="../assets/imgs/produceManager.png">
                <div class="C_name">生产管理</div>
                <div class="E_name" style="width:80px">PRODUCTION MANAGEMENT</div>
            </div>
        </router-link>
        <a href="http://mall.yunyangbao.cn/" class="goods" target="_blank">
            <div class="box_four">
                <img src="../assets/imgs/produceGoods.png">
                <div class="C_name">生产物资</div>
                <div class="E_name">PRODUCTION MATERIALS</div>
            </div>
        </a>
        </div>
  </div>
</template>
<script>
</script>
<style lang="stylus">
@import '../assets/css/color'

.mainPage
    height 75%
    text-align center
    padding-top 6%
    .mainTitle
        text-align center
        color #FFFFFF
        font-size 38px
        font-family: Arial,'Raleway', sans-serif
        font-weight bold
        margin-bottom 8%
    .mainNav
        .retrospect, .organic, .produce, .goods
            color #FFFFFF
            width 10%
            .box_first, .box_second, .box_three, .box_four
                background rgba(255,255,255,0)
                border 1px solid white
                border-radius 10%
                width 100%
                img
                    width 80px
                    heigth 80px
                    padding-top 20px
                .C_name
                    font-size 18px
                    padding-top calc(4vh)
                    padding-bottom 5px
                .E_name
                    align center
                    -webkit-text-size-adjust none
                    font-size:9px 
                    -webkit-transform:scale(0.65)
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
        .retrospect, .produce, .goods
            margin-left 6%
</style>
