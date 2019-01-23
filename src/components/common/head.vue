<template>
  <div class="app-header">
    <header class="contact-info container">
      <div class="logo">
          <router-link to="/">
              <img class="indexlogo" src="../../assets/imgs/login-logo.png" alt="“云羊宝”-中国努比亚有机山羊品牌官方网"/>
          </router-link>
      </div>
      <div class="header-right-info">
          <div class="info-item">
               <div class="icon-box">
                  <i class="iconfont icon-call"></i>
              </div>
              <div class="content">
                  <p><b>(0856)-6995166</b></p>
              </div>
              <div class="login-entry">
                <template v-if="!hasLoggedIn">
                    <router-link to="/login">登录</router-link>/<router-link to="/register">注册</router-link>
                </template>
                <router-link v-else :to="{name: 'userinfo', params: {id: uid}}">个人中心</router-link>
            </div>
          </div>
      </div>
          <div class="navigation">
                <ul class="nav-tabs">
                  <li><button type="submit"><i class="el-icon-search"></i></button></li>
                  <li><router-link to="/contact">联系我们</router-link></li>
                  <li><a href="http://vr.suliankj.cn/tour/e1a81ed75f880b06" target="_blank">AR全景</a></li>
                  <el-dropdown class="drop">
                  <li><router-link to="/appDonload">APP下载</router-link></li>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>iPad端</el-dropdown-item>
                      <el-dropdown-item>手机端</el-dropdown-item>
                  </el-dropdown-menu>
                  </el-dropdown>
                  <li><router-link to="/docDonload">资料下载</router-link></li>
                  <li><router-link to="/news">新闻动态</router-link></li>
                  <li><router-link to="/company">集团介绍</router-link></li>
                  <li><router-link to="/">首页</router-link></li>    
                </ul>
            </div>
      </header>

  </div>
</template>

<script>
  import { tokenStr } from '@/util/fetch'

export default {
    data () {
        return {
            uid: null,
            hasLoggedIn: false
        }
    },

    created () {
        this.hasLoggedIn = window.localStorage.getItem(tokenStr)
        if (this.hasLoggedIn) {
            this.uid = this.hasLoggedIn.substr(0, this.hasLoggedIn.indexOf(':'))
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.app-header
  overflow hidden
  width 100%
  .container
      height 10%
      background rgba(0,71,125,0.2)
      padding 0 10%
  .contact-info
      overflow hidden
      padding-top 10px
      padding-bottom 10px
      .logo
        a 
          display block
        .indexlogo
          float left
          width 20%
          margin-top 8px
  .header-right-info
        float right
        .info-item
            display inline-block
            vertical-align top
            margin-right 10px
            .icon-box
                display inline-block
                vertical-align middle
                i
                    font-size 16px
                    color #FFFFFF
    .content
        display inline-block
        font-size 13px
        color #FFFFFF
    .login-entry
        margin-left 20px
        font-size 13px
        float right
        line-height 43px
        color #fff
        a
            color #fff
            &:hover
                text-decoration underline
            &:first-of-type
                margin-right 5px
            &:last-of-type
                margin-left 5px
    .navigation
      .nav-tabs        
          margin-top 49px
          li
              float right
              line-height 43px
              button
                background-color: transparent;
                border: none;
                outline: none;
                font-size: 15px;
                color: #dad9d9;
              a
                  color #fff
                  display: block;
                  font-size: 14px;
                  font-weight: 600;
                  transition: color .3s ease;
                  margin 0 20px
                  border-bottom 1px solid rgba(255,255,255,0)
                  &:hover
                      border-bottom 1px solid #FFFFFF
    .el-dropdown
      float right
</style>
