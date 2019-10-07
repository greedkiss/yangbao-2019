<template>
    <div class="admin-form mod_production">
        <p class="card-title">认证证书</p>
        <basic-info :items="items" :models="models" :radio-index="2" :is-produce="isProduce" :needBuildingInfo="needBuildingInfo"></basic-info>
        <div class="admin-send">
            <el-button type="primary" @click="submit()" style="margin-bottom: 20px">提交/更新</el-button>
        </div>
        <div class="production-view">
            <div class="production-content" v-for="(item, i) in proList" :key="i">
                <el-card>
                    <img @click="showPop(i)" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info">图片类型：{{item.certification}}</p>
                    <el-dialog
                      :visible.sync="productionShow[i]"
                      width="50%"
                      center
                    >
                        <div class="show-detail">
                            <img class="production-image-detail" :src="item.url" :onerror="defaultImg">
                        </div>
                        <div class="show-list">
                            <ul>
                                <li><el-tag>图片类型</el-tag>{{ item.certification}}</li>
                                <li><el-tag>上传时间</el-tag>{{ item.udate}}</li>
                            </ul>
                        </div>
                        <div slot="footer">
                            <el-button size="small" type="primary" @click="deleteItem(item, i)">删除</el-button>
                        </div>
                    </el-dialog> 
                </el-card>
            </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="8"
          :current-page.sync="pageNumb"
          @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
const qiniu = require('qiniu-js')
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { getUserById, deleteDiagnose, getCertification, findSlaughterMedia, deleteSlaughterMedia, findCustomerMedia, deleteConsumerMedia} from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
export default {
    components: {
        BasicInfo
    },

    props: {
        isProduce: {
            type: Boolean,
            default: true
        },
        isBreed: {
            type: Boolean,
            default: false
        },
        isSlaughter: {
            type: Boolean,
            default: false
        },
        isCustomer: {
            type: Boolean,
            default: false
        },
        getType: {
            type: Function
        },
        needBuildingInfo:{
            type:Boolean,
            default:false
        }
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if(isReqSuccessful(res)) {
                this.user = res.data.model
            }
        }).then(this.getProList)
    },

    data () {
        return {
            items: [{
                label: '图片类型',
                model: 'type',
                type: 'select',
                fetchSuggestions: this.getType,
            }, {
                label: '上传图片：',
                model: 'file',
                type: 'file',
            }],
            models: {
                type: null,
                file: null
            },
            user: null,
            proList: [],
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            productionShow: [],
            pageNumb: 1,
            total: 0,
            limit: 8
        }
    },

    methods: {
        submit () {
            this.models.type
            let form = new FormData()
            form.append('userId' ,this.$route.params.id)
            if(this.isBreed){
                form.append('factoryType', 0)
                form.append('filetype', 4)
            }
            if(this.isSlaughter){
                form.append('uploader', this.user.userRealname)
                form.append('factoryId', this.user.userFactory)
                form.append('fileType', 0)
                form.append('certification' ,this.models.type)
                form.append('file' ,this.models.file)
                let headers= {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl+ '/slaughterFactorySystem/upload/pic' ,{
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res=>{
                    let body = await res.json()
                    if(body.data.results=='上传成功'){
                        this.$message.success('上传成功')
                    }else{
                        this.$message.error('上传失败')
                    }
                }).then(this.getProList)
            }
            if(this.isCustomer){
                form.append('uploader', this.user.userRealname)
                form.append('factoryId', this.user.userFactory)
                form.append('fileType', 0)
                form.append('certification' ,this.models.type)
                form.append('file' ,this.models.file)
                let headers= {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl+ '/comsumerEntitySystem/upload/pic' ,{
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res=>{
                    let body = await res.json()
                    if(body.data.results=='上传成功'){
                        this.$message.success('上传成功')
                    }else{
                        this.$message.error('上传失败')
                    }
                }).then(this.getProList)
            }
            if(!this.isSlaughter&&!this.isCustomer){
                form.append('factoryId' ,this.user.userFactory)
                form.append('certification' ,this.models.type)
                form.append('file[]' ,this.models.file)
                let headers= {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl+ '/uploadFile/productPic' ,{
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res=>{
                    this.$message.success('上传成功')
                }).then(this.getProList)
            }
        },
        deleteItem (item, index) {
            if(this.isSlaughter){
                    deleteSlaughterMedia(item.id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('删除成功')
                        this.$set(this.productionShow, index, true)
                        this.getProList()
                    }else{
                        this.$message.error('操作失败')
                    }
                })
                return
            }
            if(this.isCustomer){
                deleteConsumerMedia(item.id).then(res => {
                if (isReqSuccessful(res)) {
                        this.$message.success('删除成功')
                        this.$set(this.productionShow, index, true)
                        this.getProList()
                    }else{
                        this.$message.error('操作失败')
                    }
                })
                return
            }
            deleteDiagnose(item.id).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('删除成功')
                    this.$set(this.productionShow, index, true)
                    this.getProList()
                }
            })
        },
        getProList(){
            if(this.isSlaughter){
                let data={
                    factoryId:this.user.userFactory,
                    page:(this.pageNumb-1)*10,
                    size:10,
                }
                findSlaughterMedia(data).then(res => {
                    if(res.meta.code==0) {
                        if(res.data.result==[]) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        this.proList=[];
                        let arr = [];
                        let i=0;
                        res.data.results.forEach((item) => {
                            i++;
                            let v={
                                url:item.pic_address,
                                udate:item.upload_date,
                                filetype:item.file_type,
                                certification:item.certification,
                                id:item.id
                            }
                            if(item.file_type != 1){
                                this.proList.push(v)
                            }
                        })
                        this.total = i
                        this.productionShow = new Array(arr.length).fill(false);
                        return
                    }else{
                    this.$message.error('查询失败')
                    }
                })
                return
            }
            if(this.isCustomer){
                let data={
                    factoryId:this.user.userFactory,
                    page:(this.pageNumb-1)*10,
                    size:10,
                }
                findCustomerMedia(data).then(res => {
                    if(res.meta.code==0) {
                        if(res.data.result==[]) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        this.proList=[];
                        let arr = [];
                        let i=0;
                        res.data.results.forEach((item) => {
                            i++;
                            let v={
                                url:item.pic_address,
                                udate:item.upload_date,
                                filetype:item.file_type,
                                certification:item.certification,
                                id:item.id
                            }
                            if(item.file_type != 1){
                                this.proList.push(v)
                            }
                        })
                        this.total = i
                        this.productionShow = new Array(arr.length).fill(false);
                        return
                    }else{
                    this.$message.error('查询失败')
                    }
                })
                return                
            }

            let data = {
                pageNumb: this.pageNumb - 1,
                limit: this.limit,
                factory:this.user.userFactory,
                uploader:this.user.id,
            }
            if(this.isBreed){
                let obj = {'filetype': 4, 'factoryType': 0}
                data = Object.assign(data, obj)
            }
            if(this.isSlaughter){
                let obj = {'filetype': 7, 'factoryType': 1}
                data = Object.assign(data, obj)
            }
            if(this.isCustomer){
                let obj = {'filetype': 7, 'factoryType': 2}
                data = Object.assign(data, obj)
            }
            getCertification(data).then(res =>{
                if(isReqSuccessful(res)) {
                    if(!res.data.List.length) {
                        this.$message.warning('未查询到数据')
                        this.proList = []
                        this.total = 0
                        return
                    }
                    let arr = []
                    res.data.List.forEach((item) => {
                        item.url = item.address
                        item.time = item.udate
                        item.urlSpecific= item.address
                    })
                    this.proList = res.data.List
                    this.total = res.data.size
                    this.productionShow = new Array(arr.length).fill(false);
                }
            }).catch(_ => {
                    this.$message.error('查询失败')
            })
        },
        showPop (i) {
            this.$set(this.productionShow, i, true)
        },
        changePage(){
            this.getProList()
        },

    }
}
</script>

<style lang="stylus">
@import '../../../assets/css/view-list.styl'
</style>
