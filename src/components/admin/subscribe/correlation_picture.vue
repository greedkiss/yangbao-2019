<template>
	<div class="admin-form mod_production">
        <el-form :inline="true" >
        <el-form-item>
        <el-input v-model="qaId" size="small" placeholder="">
        <template slot="prepend">检疫合格证号:</template>
        </el-input>
        </el-form-item>
        <el-form-item>
        <el-input v-model="tradeMarkEarTag" size="small" placeholder="">
        <template slot="prepend">耳牌号:</template>
        </el-input>
        </el-form-item>
        <el-form-item>
        <el-button size="small" type="primary" @click="submit()">查询</el-button>
        </el-form-item>
        </el-form>
        <div>
            <div class="production-view">
                <div class="production-content" v-for="(item, i) in proList" :key="i">
                    <el-card>
                        <img @click="showPop(item.url,item.qaId,item.gmtCreate,item.earTag)" class="production-image" :src="item.url" :onerror="defaultImg">
                        <p class="production-info">检疫合格证号：{{ item.qaId }}</p>
                        <p class="production-info">耳牌号：{{ item.earTag }}</p>
                        <p class="production-info">时间：{{ item.gmtCreate }}</p>
                    </el-card>
                </div>
                
            </div>
            <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="size"
                    @current-change="fetchData"
                    :current-page.sync="pageNumb">
            </el-pagination>
        </div>
        
        <el-dialog
        :visible.sync="productionShow"
        width="50%"
        center>
        <!-- FIXME: video 标签兼容性处理 -->
        <div class="show-detail">
            <img class="production-image-detail" :src="bigPic.url" :onerror="defaultImg">
        </div>
        <div class="show-list">
            <ul>
                <li style="margin-top:10px;"><el-tag>检疫合格证号</el-tag> {{ bigPic.qaId }}</li>
                <li style="margin-top:10px;"><el-tag>耳牌号</el-tag> {{ bigPic.earTag }}</li>
                <li style="margin-top:10px;"><el-tag>上传日期</el-tag> {{ bigPic.gmtCreate }}</li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="warning" @click="deletePic(bigPic.qaId)">删除</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import { getUserById,getpicsOfFactory,getpicsByEarTagOrQaTag,deletePicByQaTag} from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data () {
        return {
            qaId:'',
            tradeMarkEarTag:'',
            productionShow: false,
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            // defaultImg: 'this.src="//otxtxlg3e.bkt.clouddn.com/FA4EA1F6F081AAC90EA490C18481189C.jpg"',
            proList: [],
            pageNumb: 1,
            total: 15,
            size:8,
            user:null,
            bigPic:{
                url:null,
                qaId:null,
                gmtCreate:null
            }
        }
    },
    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
          this.user = res.data.model
        }).then(this.fetchData)
    },
    methods:{
        //查询
        submit(){
            let data={
                factory:this.user.userFactory,
                page: this.pageNumb - 1,
                size: this.size,
                qaTag:this.qaId,
                earTag:this.tradeMarkEarTag,
            }
            getpicsOfFactory(data).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = [];
                            this.total = 0;
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = item.qaPic
                            item.qaId = item.qaTag
                        })
                        this.proList = res.data.List
                        this.total = res.data.number;
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
        },
        deletePic(qaTag) {
            let data = {
                factoryId: this.user.userFactory,
                qaTag:qaTag
            }
            deletePicByQaTag(data.factoryId,data.qaTag).then((res) => {
                if(isReqSuccessful(res)){
                    if(!res.meta.code){
                      this.$message.success('删除成功！');
                    }
                    this.productionShow=false;
                    this.fetchData()
                }
            })
        },
        showPop (url,qaId,gmtCreate,earTag) {
            this.bigPic.url = url;
            this.bigPic.qaId = qaId;
            this.bigPic.gmtCreate = gmtCreate;
            this.bigPic.earTag = earTag
            this.productionShow = true;

        },
        async fetchData(){ 
                let id=this.user.userFactory
                let data = {
                    factory:id,
                    page: this.pageNumb - 1,
                    size: this.size
                }
               getpicsOfFactory(data).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0;
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = item.qaPic
                            item.qaId = item.qaTag
                        })
                        this.proList = res.data.List
                        this.total = res.data.number
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            }   
    }
}
</script>
<style lang="stylus">
@import '../../../assets/css/view-list.styl'
</style>