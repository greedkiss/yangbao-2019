<template>
    <div class="admin-form">
        <p class="card-title">诊断可视</p>

        <basic-info :items="items" :models="models"></basic-info>
        <div class="card">
            <p class="card-title">图片/视频上传进度:</p>
            <el-progress v-for="(item, i) in captures" :text-inside="true" :stroke-width="18" :percentage="captures[i].per" style="margin-top: 10px" :key="i"></el-progress>
        </div>
        <div class="card">

            <p class="card-title">症状描述:</p>
            <el-input type="textarea" v-model="models.symptom"></el-input>
        </div>
        <div class="card">
            <p class="card-title">解决方法:</p>
            <el-input type="textarea" v-model="models.solution"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>

    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { diagnoseUp, getUserById ,getImmuneEarTag } from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit'
import {config} from '@/util/config'
const qiniu = require('qiniu-js')

export default {
    components: {
        BasicInfo
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if(isReqSuccessful(res)) {
                this.user = res.data.model
                this.models.expert = this.user.userRealname;      
                this.models.uploader = this.user.pkUserid
            }
        })
    },

    data () {
        let sexs = [
            {value: '母'},
            {value: '公'}
        ]
        let getSex = (q, cb) => {
            cb(sexs)
        }

        let experts = [
            //this.user
        ]
        let getExpert = (q, cb) => {
            cb(experts)
        }
        return {
            captures: [{model: null , per : 0}],
            items: [ {
                label: '性别',
                model: 'sex',
                type: 'select',
                fetchSuggestions: getSex,
            }, {
                label: '商标耳牌',
                model: 'brand',
                type : 'selcetThreeTag',
            }, {
                label: '检疫耳牌',
                model: 'vaccine',
                mr: 1
            }, {
                label: '就诊专家',
                model: 'expert',
                type: 'select',
                //fetchSuggestions: getExpert
            }, {
                label: '上传图片或视频:',
                model: 'file',
                type: 'file',
                fetchSuggestions: getSex
            }],
            models: {
                file: null,
                sex: null,
                brand: null,
                vaccine: null,
                expert: null,
                uploader: null
            }
        }
    },

    watch: {
        // 'models.sex' ( val ) {
        //    // val === "公"? this.models.brand = 'G' : this.models.brand = 'M'
        // }
        'models.brand':function(val, oldval){
            this.selectVaccine(val)
        }
    },
    methods: {
        selectVaccine(val){
            if(val.length > 4){
                let data ={'brand': val}
                getImmuneEarTag(data).then(res=>{
                    this.models.vaccine = res.data.list[0]
                })
            }
        },
        submit () {
            if ( !this.beforeUpload ( this.models.file ) ) {
                return false
            }
            let form = new FormData()
            form.append('userId', this.$route.params.id)
            form.append('vaccine', this.models.vaccine)
            form.append('brand', this.models.brand)
            form.append('sex', this.models.sex)
            form.append('expert', this.models.expert)
            form.append('file[]', this.models.file)
            form.append('fileType', 0)
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/uploadFile/productPic', {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                let body = await res.json()
                if(body.data.token != null){
                        let file = this.models.file
                        let key = body.data.names[0]
                        let token = body.data.token
                        let putExtra = {
                                fname: "",
                                params: {},
                                mimeType: null
                            }
                        let config = {
                                useCdnDomain: true,
                                disableStatisticsReport: false,
                                retryCount: 6,
                            }
                        let self = this
                        let observer = {
                            next(res){
                                self.captures[0].per = parseInt(res.total.percent)
                            },
                            error(res){
                                self.$message.error()('上传失败')
                            },
                            complete(res){
                                    self.$message.success('上传成功')
                                    let obj = new FormData()
                                    obj.append('name' , key)
                                    let headers = {}
                                    headers[authStr] = window.localStorage.getItem(tokenStr)
                                    window.fetch(baseUrl + '/createThumb', {
                                        method: 'POST',
                                        headers,
                                        body: obj
                                    }).then(async res => {
                                        let body = await res.json()
                                    })
                                }
                            }
                          let observable = qiniu.upload(file, key, token, putExtra, config)
                          observable.subscribe(observer)
                }else{
                    this.captures[0].per = 100
                    this.$message.success('上传成功')
                }
            })
        },

        beforeUpload ( file ) {
            // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            // const isLt2M = file.size / 1024 / 1024 < config.imageSize;
            // if (isJPG) {
            //     this.$message.error(`上传图片大小不能超过 ${config.imageSize} MB!`);
            //     return false;
            // } else {
            //     return true;
            // }
            return true
        }
    }
}
</script>

<style lang="stylus">
.diagnose-upload
    display relative
    p
    display inline-block
    #diagnose-upcont
        width 400px
    #diagnose-up
        position absulote
        opacity 0
        left 0px
        top 0px

form
    width 80%
    margin 0 auto
    .diagonse-form
        width 60%
        margin 20px auto
    .el-input,.el-textarea
        width 60%
</style>
