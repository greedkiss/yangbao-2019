<template>
	<div class="admin-form mod_production">
        <div class="production-search">
            <el-form :inline="true">
                <el-form-item>
                    <el-input v-model="tradeMarkEarTag"  placeholder="">
                    <template slot="prepend">耳牌号:</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="fetchData()">搜索</el-button>
                </el-form-item>
            </el-form> 
        </div>
        <div>
        <div class="production-view">
            <div class="production-content" v-for="(item, i) in proList" :key="i">
                <el-card>
                    <img @click="showPop(item.url, item.trademarkEarTag, item.time)" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info" >商标耳牌：{{ item.trademarkEarTag }}</p>
                    <p class="production-info">时间：{{ item.time }}</p>
                </el-card>
            </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="12"
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
                    <li><el-tag>耳牌号</el-tag> {{ bigPic.trademarkEarTag }}</li>
                    <li><el-tag>上传日期</el-tag> {{ bigPic.time }}</li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getUserById,getManageData} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful ,getThumbPicture} from '@/util/jskit' 


export default {

    data () {
        return {
            tradeMarkEarTag:'',
            productionShow: [],
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            proList: [],
            pageNumb: 1,
            total: 0,
            limit: 12,
            user:null,
            productionShow: false,
            bigPic:{
                url:"",
                time:"",
                earTag:""
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
        showPop (url, trademarkEarTag, time) {
            let imgsrc = url
            let img = new Image();
            let urlarr = imgsrc.split("yunyangbao.cn/");
            let timeMarkUrl = urlarr[0] + "yunyangbao.cn/timemark_" + urlarr[1]
            img.src = timeMarkUrl;
            img.onload = () => {
                this.bigPic.url = timeMarkUrl;
            }
            img.onerror = () => {
                this.bigPic.url = url;
            }
            this.productionShow = true;
            this.bigPic.time = time;
            this.bigPic.trademarkEarTag = trademarkEarTag;
        },
        //获取信息
        async fetchData(){ 
                let data = {
                    trademark:this.tradeMarkEarTag,
                    factory:this.user.userFactory,
                    page: this.pageNumb - 1,
                    size: this.limit,
                    type: 1,
                }
                getManageData(data).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.number) {
                            this.$message.warning('未查询到数据');
                            this.proList = [];
                            this.total = 0;
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            if(item.video!=null){
                                item.url = item.video;
                            }
                        })
                        this.total = res.data.number;
                        this.proList = res.data.List;
                        this.productionShow = new Array(arr.length).fill(false);
                    }
                },)
            }   
    }
}
</script>
<style lang="stylus">
@import '../../../assets/css/view-list.styl'
</style>