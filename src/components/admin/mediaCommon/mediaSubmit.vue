<template>
    <div class="admin-form">
        <p  v-if="!isSlaught&&!isConsume" class="card-title">生产可视截图</p>
        <p  v-if="isSlaught" class="card-title">屠宰厂视频</p>
        <p  v-if="isConsume" class="card-title">消费店视频</p>
        <div class="border-main">
            <div class="form-summary">
                <div v-if="!isSlaught&&!isConsume" class="time el-input-group select">
                    <span class="time-span ellipse"  v-text="'图片/视频类型：'"></span><el-autocomplete
                        size="small"
                        v-model="pictureStyle"
                        :fetch-suggestions="getPictureStyle"
                    >
                    </el-autocomplete>
                </div>
                <div style = "width: 500px"></div>

                <el-input v-if="!isSlaught&&!isConsume" v-for="(item, i) in captures" :key="i" class="select-file" style="width:610px" size="small" disabled @click.native="$refs.erpai[i].click()" :value="item.model">
                    <template slot="prepend">上传生产可视截图:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template> 
                </el-input>
                <el-input v-if="isSlaught" v-for="(item, i) in captures" :key="i" class="select-file" style="width:610px" size="small" disabled @click.native="$refs.erpai[i].click()" :value="item.model">
                    <template slot="prepend">上传屠宰厂视频:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template> 
                </el-input>
                <el-input v-if="isConsume" v-for="(item, i) in captures" :key="i" class="select-file" style="width:610px" size="small" disabled @click.native="$refs.erpai[i].click()" :value="item.model">
                    <template slot="prepend">上传消费店视频:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template> 
                </el-input>
                <el-button v-if="!isSlaught&&!isConsume" size="small" type="primary" @click="addCapture()">增设截图</el-button>
                <el-button v-if="deleteOne" size="small" type="primary" @click="deleteCapture()">删除截图</el-button>
            </div>
        </div>
        <div  v-if="!isSlaught&&!isConsume" class="card">
            <p class="card-title">图片/视频上传进度:</p>
            <el-progress v-for="(item, i) in captures" :text-inside="true" :stroke-width="18" :percentage="captures[i].per" style="margin-top: 10px" :key="i"></el-progress>
        </div>
        <div  v-if="isSlaught||isConsume" class="card">
            <p class="card-title">视频上传进度:</p>
            <el-progress v-for="(item, i) in captures" :text-inside="true" :stroke-width="18" :percentage="captures[i].per" style="margin-top: 10px" :key="i"></el-progress>
        </div>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="note"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>
<script>
const qiniu = require('qiniu-js')
import { getUserById } from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
export default {
    data () {
        return {
            user: null,
            pictureStyle: '',
            erpai: '',
            captures: [{model: null , per : 0}],
            note: '',
            deleteOne:false,
            slaughtVideo:null
        }
    },
    props:{
        isSlaught:{
            type:Boolean,
            default:false
        },
        isConsume:{
            type:Boolean,
            default:false
        }
    },
    mounted () {
       let id = this.$route.params.id
       getUserById(id).then(res => {
          this.user = res.data.model
       })
    },

    methods: {
        selectFile (item, idx) {
            let file = this.$refs.erpai[idx].files[0]
            item.model = file.name
            item.file = file
        },

        addCapture () {
            this.captures.push({model: null ,per: 0})
            this.deleteOne = true
        },
        deleteCapture(){
            this.captures.pop()
        },
        submit () {
            if(!this.isSlaught&&!this.isConsume){
                let form = new FormData()
                form.append('userId', this.$route.params.id)
                form.append('factoryId', this.user.userFactory)
                form.append('filetype', 5)
                this.captures.forEach((item, index) => {
                     form.append('file[]', this.$refs.erpai[index].files[0])
                })
                let headers = {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl + '/uploadFile/productPic', {
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if(body.data.token != null){
                        this.captures.forEach((item, index) => {
                            let file = this.$refs.erpai[index].files[0]
                            let key = body.data.names[index]
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
                                    self.captures[index].per = parseInt(res.total.percent)
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
                        })
                    }else{
                        this.captures.forEach((item ,index) => {
                            this.captures[index].per = 100
                            this.$message.success('上传成功')
                        })
                    }
                })
            }
            if(this.isSlaught){
                let form = new FormData()
                form.append('uploader', this.user.userRealname)
                form.append('factoryId', this.user.userFactory)
                form.append('fileType', 1)
                form.append('file', this.$refs.erpai[0].files[0])
                let headers = {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl + '/slaughterFactorySystem/upload/video', {
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if(body.data.results=='上传成功'){
                        this.captures[0].per = 100
                        this.$message.success('上传成功')
                        
                    }else{
                        this.$message.error('上传失败')
                    }
                })
            }
            if(this.isConsume){
                let form = new FormData()
                form.append('uploader', this.user.userRealname)
                form.append('factoryId', this.user.userFactory)
                form.append('fileType', 1)
                form.append('file', this.$refs.erpai[0].files[0])
                let headers = {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl + '/comsumerEntitySystem/upload/video', {
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if(body.data.results=='上传成功'){
                        this.captures[0].per = 100
                        this.$message.success('上传成功')
                        
                    }else{
                        this.$message.error('上传失败')
                    }
                })
            }

              
        },

        getPictureStyle (q, cb) {
            let typeName = [
                {value: '图片', index: '0'},
                {value: '视频', index: '1'},
            ]
            cb(typeName)
        }

    }
}
</script>
