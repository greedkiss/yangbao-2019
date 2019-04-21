<template>
        <div class="index-home" v-cloak>
            <div class="headindex">
                <app-head></app-head>
            </div>
            <div class="course">
            <Course></Course>
            </div>
            <div class="footindex">
            <app-foot></app-foot>
            </div>

        </div>

 
</template>

<script>
// import Search from '@/components/search'
import Course from '@/components/course'
import AppHead from '@/components/common/head'
import AppFoot from '@/components/common/foot'
export default {
    components: {
        AppHead,
        AppFoot,
        Course
    },

}
</script>

<style lang="stylus">
@import '../assets/css/color'
.index-home
    height 100%
    background url(http://qiniu.yunyangbao.cn/homepage.png) no-repeat center
    background-size cover
    .headindex
        height 15%
    .course
        height 20%
    .footindex
        height 10%

</style>
