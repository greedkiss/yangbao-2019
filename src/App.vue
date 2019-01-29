<template>
    <div id="app" style="height:100%">
        <router-view v-if='reloadFlag' @searchTo='reload' @closeHnF="closeHnF"/>
    </div>
</template>

<script>

export default {
    name: 'app',

    methods: {
      closeHnF () {
        this.isAdmin = !this.isAdmin
      },
      reload () {
          console.log("12212");
          this.reloadFlag = false;
          this.$nextTick(() => {
              this.reloadFlag = true;
          })
      }
    },
    watch: {
        '$route' (to) {
            document.documentElement.scrollTop = 0
            document.body.scrollTop = 0
            this.isNotLogin = !['login', 'register', 'findpass', 'chat', 'prochat', 'notfound'].includes(to.name)
            this.isAdmin = window.location.hash.includes('admin')
        }
    },

    data () {
        return {
            searchFlag: true,
            isNotLogin: false,
            isAdmin: false,
            reloadFlag: true,
        }
    },

    mounted () {
        this.isNotLogin = !['login', 'register', 'findpass', 'chat', 'prochat'].includes(this.$route.name)
        this.isAdmin = window.location.hash.includes('admin')

        document.addEventListener('click', e => {
            let target = e.target
            let parent = target.parentNode || target.parentElement
            // console.log(target.classList.contains('el-button'))
            if (target.classList && target.classList.contains('el-button')) {
                target.disabled = true
                setTimeout(() => {
                    target.disabled = false
                }, 200)
            } else if (parent.classList && parent.classList.contains('el-button')) {
                parent.disabled = true
                setTimeout(() => {
                    parent.disabled = false
                }, 400)
            }
        })
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'

// simply reset some styles
body, html
    min-width 1200px
    margin 0
    padding 0
    height 100%
ul
    list-style none
    padding 0
    margin 0
a
    display inline-block
    text-decoration none
    color color-main
    &:hover
        color color-main
img
    max-width 100%
#app
    font-family 'Poppins', sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50

.cursor-p
    cursor pointer

.el-table th
    border-left 2px solid #98c9e6
    color #fff
    background-color color-main
</style>
