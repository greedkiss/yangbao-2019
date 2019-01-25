<template>
	<div class="login-main">
        <div class="head_title">
            <router-link to="/"><img src="../../assets/imgs/newlogo.png" alt="logo"></router-link>
        </div>
        <div class="outer-box">
            <div class="left-box">
                <div class="profession">
                <router-link to="/">
                    <img src="http://qiniu.yunyangbao.cn/professionalLesson.png" alt="profession" style="border: 0">
                </router-link>
                </div>
                <div class="title_box">
                    <div class="title_login"><span @click="testWithoutCode = true">云·羊宝（有机）山羊养殖生产管理平台</span></div>
                    <div class="link">
                        <router-link to="/register">新用户注册</router-link>
                        <span>|</span> 
                        <router-link to="/findpass">找回密码</router-link>
                    </div>
                </div>
            </div> 
            <div class="index-login">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-position="right">
                    <el-form-item label="用户名：" prop="username">
                    <el-input :autofocus="true" :minlength="4" :maxlength="20" type="text" v-model="ruleForm.username" auto-complete="off" placeholder="用户名/Login Name" class="login-input-username" style="width: 40%"></el-input>
                    </el-form-item>
                    <el-form-item @keypress.native.enter="submitForm('ruleForm')" prop="pass" class="login-input-password" label="密码：">
                    <el-input :minlength="6" :maxlength="20" type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="密码/Password" class="pass-input" style="width: 41%"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码：">
                    <el-input @keypress.native.enter="submitForm('ruleForm')" :minlength="4" :maxlength="4" style="width:18%;min-width:30px;" v-model="ruleForm.code" class="code-input"></el-input>
                    <div class="code" @click="refreshCode" title="点击更换验证码">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>
                </el-form>
                <div><img src="../../assets/imgs/login.png" class="login-pic" @click="submitForm('ruleForm')" alt="login"></div>
            </div>
        </div>
    </div>
</template>
<script>
import SIdentify from '@/components/login/identify'
import { Login } from '@/util/getdata'
import { userStr } from '@/util/fetch'
import { validateName, isReqSuccessful } from '@/util/jskit'
import { validatePassword } from '@/util/validate'
import md5 from 'md5'
export default{
    components: {
        SIdentify
    },

    data(){
        let validatePass = (rule, value, callback) => {
            let val = validatePassword(value)
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (val !== true) {
                callback(new Error(val))
            } else {
                callback()
            }
        }
        let validateCode = (rule, value, callback) => {
            if (this.testWithoutCode) {
                callback()
            } else {
                if (value === '') {
                    callback(new Error('请输入验证码'))
                } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    callback(new Error('验证码不正确'))
                } else {
                    callback()
                }
            }
        }
        return{
            ruleForm: {
                username: '',
                pass: '',
                code: ''
            },
            rules: {
                username: [
                    {validator: validateName, trigger: 'blur'}
                ],
                pass: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                code: [
                    {validator: validateCode, trigger: 'blur'}
                ]
            },
            testWithoutCode: false,
            identifyCodes: '1234567890',
            identifyCode: ''
        }
    },

    mounted () {
        this.makeCode(this.identifyCodes, 4)
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = {
                        username: this.ruleForm.username,
                        password: md5(this.ruleForm.pass)
                    }
                    this.loading = true
                    Login(data).then(res => {
                        if (isReqSuccessful(res)) {
                            this.$message.success('登录成功')
                            setTimeout(_ => {
                                this.$router.push('/admin/' + res.data.id)
                            }, 600)
                        }
                    })
                } else {
                    return false
                }
            })
        },

        randomNum (min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },

        refreshCode () {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },

        makeCode (o, l) {
            this.identifyCode = ''
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
            }
        }
    }
}
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
            width 310px
            height 110px
    .outer-box
        margin auto auto
        margin-top 40px
        width 711px
        height 290px
        .left-box
            width 87%
            height 290px
            .profession
                float left
                width 31%
                a
                    img
                        width 100%
                        height 292px                 
            .title_box
                border 2px solid #FFFFFF
                height 290px
                border-radius 4%
                background linear-gradient(#d1dfec 50%, #1773d9 50%)
                .title_login
                    text-align center
                    color #0b4281
                    font-weight 900
                    font-size 20px
                    font-family fantasy, SimSun, Helvetica, sans-serif
                    padding-top 20px
                    span
                        border-bottom 1px dotted black
                        padding-bottom 10px 
            .link
                width 100%
                margin-top 220px
                text-align center
                a
                    color #FFFFFF
                    font-family Serif
                    font-size 10px
                span
                    color #FFFFFF
                a:hover
                    text-decoration underline
        .index-login
            width 72%
            height 220px
            float right
            position relative
            left -16px
            z-index 100
            top -230px
            background url(http://qiniu.yunyangbao.cn/login_back6.png) no-repeat center
            background-size cover
            // background #FFFFFF
            .el-form-item
                margin-bottom 14px
                margin-left: 25px
            .login-pic
                width 130px
                height 130px
                float right
                position relative
                top -150px
                left -25px
                cursor pointer
            .el-input
                width 40%
            .el-form-item__label
                padding 0 12px
            .el-input__inner
                height 30px    
            .login-input-username
                padding-top -20px
            .code
                float right
                margin-right 44%
                cursor pointer
                height 40px
                padding-top 5px
            .el-form-item__error
                padding-top 2px
                padding-left 11px
                top 90%
                color #bab8c5
            .demo-ruleForm
                margin-top 25px
            .login-input-password
                padding-left 16px
            .pass-input
                width 41%
            .el-form-item__label
                color #FFFFFF
</style>
