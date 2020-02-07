<template>
        <div class="index-home" v-cloak>
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
import AppFoot from '@/components/common/foot'
export default {
    components: {
        AppFoot,
        Course
    },

}
</script>

<style lang="stylus">
@import '../assets/css/color'
.index-home
    height 100%
    background url(https://qiniu.yunyangbao.cn/homepage.png) no-repeat center
    background-size cover
    .course
        height 90%
    .footindex
        height 10%

</style>
