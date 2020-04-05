<template>
    <div>
        <div>
            <el-form :inline="true" class="demo-form-inline" style="width:100%">
            <el-form-item label="">
                <el-input v-model="qaId" size="small" placeholder="" style="width:210px">
                <template slot="prepend">免疫合格证号:</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="tradeMarkEarTag" size="small" placeholder="" style="width:210px">
                <template slot="prepend">耳牌号:</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                    <span class="demonstration">日期区间</span>
                    <el-date-picker
                    size="small"
                    v-model="gmtCreate"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    align="right">
                    </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="fetchData">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
        <el-table 
        :data="tableData"
        style="width: 100%">
            <!--
                <el-table-column
                    label="免疫合格证号码"
                    width="150"
                    prop="immuneCertified">
                </el-table-column>
                
                <el-table-column
                    label="免疫耳牌号"
                    width="120"
                    prop="immuneEarTag">
                </el-table-column>
                <el-table-column
                    label="栋号"
                    width="120"
                    prop="d">
                </el-table-column>
                <el-table-column
                    label="栏号"
                    width="120"
                    prop="l">
                </el-table-column>
                <el-table-column
                    label="养殖场"
                    width="120"
                    prop="breedFactory">
                </el-table-column>
                <el-table-column
                    label="货主"
                    width="120"
                    prop="goodman">
                </el-table-column>
                <el-table-column
                    label="羊只品类"
                    width="120"
                    prop="sheepType">
                </el-table-column>
            -->
                
                <el-table-column
                    label="商标耳牌号"
                    width="120"
                    prop="trademarkEarTag">
                </el-table-column>
                
                <el-table-column
                    label="照片"
                    width="120"
                >
                    <template slot-scope="scope">
                        <div class="opr" >
                            <span @click="view(scope.$index)">查看</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="重量"
                    width="120"
                    prop="weight">
                </el-table-column>
                <el-table-column
                    label="时间"
                    width="160"
                    prop="time">
                </el-table-column>
                <el-table-column
                    label="来源养殖场"
                    width="250"
                    prop="breedFactory">
                </el-table-column>
                <!--
                <el-table-column width="120" label="操作">
                    <template slot-scope="scope">
                        <span size="small" style="cursor:pointer" @click="Delete(scope.$index)" >删除</span>
                    </template>
                </el-table-column>
                -->
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
            @current-change="fetchData"
            :current-page.sync="page">
        </el-pagination>

        <el-dialog title="图片详情"    
        :visible.sync="dialogFormVisible" 
        width="650px">
            <div>
            <el-card :body-style="{ padding: '0px' }">
                <img :src="pic" class="image" :onerror="defaultImg" width="600px" style="display:block; margin: 0 auto">
            </el-card>
            </div>
        </el-dialog>

    </div>
    
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import {getManageData, getUserById } from '@/util/getdata'
import { isReqSuccessful} from '@/util/jskit'
export default {
    data () {
        return {
            user:null,
            tableData:[],
            total:0,
            page:1,
            qaId: '',
            tradeMarkEarTag: '',
            gmtCreate:'',
            pic:"",
            dialogFormVisible:false,
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
        }
    },
    mounted() {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model    
            }
        }).then(this.fetchData)
    },
    methods: {
        async fetchData(){
            let data = {
                certificate:this.qaId,
                trademark:this.tradeMarkEarTag,
                startTime:(this.gmtCreate == null) ? "" : this.gmtCreate[0],
                endTime:(this.gmtCreate == null) ? "" : this.gmtCreate[1],
                page:this.page-1,
                size:10,
                factory:this.user.userFactory,
                type:1
            }
            getManageData(data).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data;
                    this.tableData = data.List;
                    this.total = data.number
                }
            })
        },
        view(index){
            // this.pic=this.tableData[index].video;
            // this.dialogFormVisible=true;
            let reg = /^http.+qiniu\.yunyangbao\.cn.+(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|blob)$/i;
            let imgsrc = this.tableData[index].video;
            if(reg.test(imgsrc)){
                console.log(111)
                let img = new Image();
                let urlarr = imgsrc.split("yunyangbao.cn/");
                let timeMarkUrl = urlarr[0] + "yunyangbao.cn/timemark_" + urlarr[1]
                img.src = timeMarkUrl;
                img.onload = () => {
                    this.pic = timeMarkUrl;
                    this.dialogFormVisible = true;
                }
                img.onerror = ()=>{
                    this.pic = imgsrc;
                    this.dialogFormVisible = true;
                }
                this.isImg = true;
            }else{
                this.isImg = false;
                this.pic = imgsrc
                this.dialogFormVisible = true
            }
        },
        Delete(index){
            let id = this.tableData[index].id;
            this.$confirm('你将删除这条记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            console.log(id)
            deleteCorrelationById(id).then(res=>{
                if(isReqSuccessful(res)){
                this.$message.success("删除成功");
                this.fetchData();
                }
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '删除失败'
            });          
            });
        },
    },
}
</script>


