<template>
  <div class="app-header">
    <header class="contact-info container_top">
      <div class="logo">
          <router-link to="/">
              <img class="indexlogo" src="../../assets/imgs/newlogo.png" alt="云·羊宝（有机）山羊养殖生产管理追溯平台"/>
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
                    <!-- <li><div id="qrcode" class="qrcode" ref="qrcode"></div></li> -->
                    <li><button type="submit"><i class="el-icon-search"></i></button></li>
                    <li><router-link to="/contact">联系我们</router-link></li>
                    <li><a href="http://vr.suliankj.cn/tour/e1a81ed75f880b06" target="_blank">AR全景</a></li>
                    <el-dropdown class="drop">
                    <li><router-link to="/appDonload">APP下载</router-link></li>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>Pad端</el-dropdown-item>
                        <el-dropdown-item>安卓版</el-dropdown-item>
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
import QRCode from 'qrcodejs2'
export default {
    data () {
        return {
            uid: null,
            hasLoggedIn: true
        }
    },

    created () {
        this.hasLoggedIn = window.localStorage.getItem(tokenStr)
        if (this.hasLoggedIn) {
            this.uid = this.hasLoggedIn.substr(0, this.hasLoggedIn.indexOf(':'))
        }
        // this.qrcode()
    },
    methods: {
        // qrcode () {
        //     let qrcode = new QRCode(this.$refs.qrcode, {
        //         width: 70,
        //         height: 70,
        //         text: `http://${window.location.host}/#/mS?eT=${this.code}`
        //     })
        // },
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.app-header
  overflow hidden
  width 100%
  position fixed
  top 0px
  .container_top
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
