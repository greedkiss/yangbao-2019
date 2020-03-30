<template>
<!--关联检疫证-->
<div class="admin-form">
  <div class="card" >
    <p class="card-title" >认购管理列表</p>
    <div style="margin-top:20px">
        <el-table 
        :data="tableData"
        style="width: 100%">
            <el-table-column
            label="检疫合格证编号"
            width="120"
            prop="certificationId">
            </el-table-column>
            <el-table-column
            label="商标耳牌号"
            width="120"
            prop="tradeMarkEarTag">
            </el-table-column>
            <el-table-column
            label="视频"
            width="120">
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
                label="购买时间"
                width="160"
                prop="buyTime">
            </el-table-column>
            <el-table-column
                label="来源养殖场"
                width="250"
                prop="farm">
            </el-table-column>
            <el-table-column
                class="action"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <el-button @click="Delete(scope.row, scope.column)" type="text">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    <el-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="fetchData"
                :current-page.sync="page">
    </el-pagination>

    <el-dialog title="图片详情"    
        :visible.sync="dialogFormVisible" 
        width="800px">
        <div>
            <video :src="pic" style="width:100%" controls="controls" height="400" width="400"></video>
        </div>
    </el-dialog>
  </div>
  </div>
<!--待选屠宰羊-->

</div>  
</template>


<script>
import AdminTable from '@/components/admin/breed_table'
import {getCorrelationData, getUserById } from '@/util/getdata'
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
            dialogFormVisible:false,
            pic:"",
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
            let id=this.user.userFactory;
            let param={
                type:1,
                page:this.page-1,
                size:10
            }
            getCorrelationData(id, param).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data;
                    this.tableData = data.List
                    this.total = data.size
                }
                
            })
        },
        view(index){
            this.pic=this.tableData[index].pic;
            this.dialogFormVisible=true;
        },
    },

}
</script>


