<template>
        <div class="index-home" v-cloak>
            <div class="headindex">
                <app-head></app-head>
            </div>
            <div class="contactbody">
            <contactBody></contactBody>
            </div>
            <div class="footindex">
            <app-foot></app-foot>
            </div>

        </div>

 
</template>

<script>
// import Search from '@/components/search'
import contactBody from '@/components/contactbody'
import AppHead from '@/components/common/head'
import AppFoot from '@/components/common/foot'
export default {
    components: {
        AppHead,
        AppFoot,
        contactBody,
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
    .contactbody
        height 59%
    .footindex
        height 10%

</style>
