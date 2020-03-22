<template>
        <div class="index-home" v-cloak>
            <div class="headindex">
                <app-head></app-head>
            </div>
            <div class="bodyindex">
            <mainBody></mainBody>
            </div>
            <div class="footindex">
            <app-foot></app-foot>
            </div>
        </div>

</template>

<script>
import mainBody from '@/components/mainbody'
import AppHead from '@/components/common/head'
import AppFoot from '@/components/common/foot'
export default {
    components: {
        AppHead,
        AppFoot,
        mainBody
    },

}
</script>

<style lang="stylus">
@import '../assets/css/color'
.index-home
    height 100%
    background url(https://qiniu.yunyangbao.cn/homepage.png) no-repeat center
    background-size cover
    .headindex
        height 15%
    .bodyindex
        height 75%
    .footindex
        height 10%
</style>
