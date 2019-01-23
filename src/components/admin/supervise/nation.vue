<template>
    <div class="admin-form mod_production">
        <p class="card-title">认证证书</p>
        <basic-info :items="items" :models="models" :radio-index="2"></basic-info>
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
import { getUserById, deleteDiagnose, getCertification} from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
export default {
    components: {
        BasicInfo
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
        let types = [
            {value: '营业执照'},
            {value: '土壤检测报告'},
            {value: '水质检测报告'},
            {value: 'ISO质量管理体系认证'},
            {value: '食品安全管理体系认证'},
            {value: '空气检测报告'},
            {value: '企业认证1'},
            {value: '企业认证2'},
            {value: '企业认证3'},
            {value: '企业认证4'},
            {value: '企业认证5'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }


        return {
            items: [{
                label: '图片类型',
                model: 'type',
                type: 'select',
                fetchSuggestions: getType,
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
            let form = new FormData()
            form.append('userId' ,this.$route.params.id)
            form.append('filetype' ,4)
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
        },
        deleteItem (item, index) {
            deleteDiagnose(item.id).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('删除成功')
                    this.$set(this.productionShow, index, true)
                    this.getProList()
                }
            })
        },
        getProList(){
            getCertification({
                pageNumb: this.pageNumb - 1,
                limit: this.limit,
                factory:this.user.userFactory,
                uploader:this.user.id,
                filetype: 4
            }).then(res =>{
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
