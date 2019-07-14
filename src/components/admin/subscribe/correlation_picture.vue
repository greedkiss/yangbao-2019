<template>
	<div>
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
                    <i v-if="item.filetype === 1" class="el-icon-caret-right video-icon "></i>
                    <img @click="showPop(i)" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info" v-if="!isDiagnose">商标耳牌：{{ item.brand }}</p>
                    <p class="production-info">时间：{{ item.time }}</p>
                    <el-dialog
                      :visible.sync="productionShow[i]"
                      width="50%"
                      center>
                        <!-- FIXME: video 标签兼容性处理 -->
                        <div class="show-detail">
                            <img class="production-image-detail" :src="item.url" :onerror="defaultImg">
                        </div>
                        <div class="show-list">
                            <ul>
                                <li><el-tag>商标耳牌</el-tag> {{ item.brand }}</li>
                                <li><el-tag>上传日期</el-tag> {{ item.udate }}</li>
                            </ul>
                        </div>
                    </el-dialog>
                </el-card>
            </div>
        </div>
        </div>
        
    </div>
</template>
<script>
import { getUserById} from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'

export default {
    data () {
        return {
            qaId:'',
            tradeMarkEarTag:'',
            productionShow: [],
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            // defaultImg: 'this.src="//otxtxlg3e.bkt.clouddn.com/FA4EA1F6F081AAC90EA490C18481189C.jpg"',
            time: [],
            proList: [],
            pageNumb: 1,
            total: 0,
            limit: 12,
            user:null,
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
            let id=this.user.userFactory
            let data={
                qaId:this.qaId,
                tradeMarkEarTag:this.tradeMarkEarTag,
            }
            console.log(id,data)
        },

        showPop (i) {
            this.$set(this.productionShow, i, true);
        },
        // async fetchData(){ // 查询所有数据
        //         let id=factory: this.user.userFactory,
        //         let data = {
        //             pageNumb: this.pageNumb - 1,
        //             limit: this.limit,
        //             // brand: this.model.earTag,
        //             // uploader: this.user.id,
        //         }
        //         diaSearchAll(data).then(res => {
        //             if(isReqSuccessful(res)) {
        //                 if(!res.data.List.length) {
        //                     this.$message.warning('未查询到数据')
        //                     this.proList = []
        //                     this.total = 0
        //                     return
        //                 }
        //                 let arr = []
        //                 res.data.List.forEach((item) => {
        //                     item.url = item.address
        //                     item.time = item.udate
        //                 })
        //                 this.proList = res.data.List
        //                 this.total = res.data.size
        //                 this.productionShow = new Array(arr.length).fill(false);
        //             }
        //         }).catch(_ => {
        //             this.$message.error('查询失败')
        //         })
        //     }   
    }
}
</script>