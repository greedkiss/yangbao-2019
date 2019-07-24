<template>
    <div class="admin-form">
        <p class="card-title">出库管理</p>
            <div class="card">
                <p class="card-title">羊肉库存列表</p>
                <div class="border-main">
            <el-table
            :data="tableData"
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :border="true"
            @cell-click="changeCopies"
            >
                <el-table-column
                    type="index">
                </el-table-column>

                <el-table-column
                    label="产品编号"
                    width="120"
                    prop="productNumber">
                </el-table-column>

                <el-table-column
                    label="产品名称"
                    width="120"
                    prop="productName">
                </el-table-column>

                <el-table-column
                    label="产品重量"
                    width="120"
                    prop="productWeight">
                </el-table-column>
                
                <el-table-column
                    label="产品视频"
                    width="120"
                    prop="productVideo">
                </el-table-column>

                <el-table-column
                    label="产品价格"
                    width="120"
                    prop="productPrice">
                </el-table-column>

                 <el-table-column
                    label="养殖场"
                    width="120"
                    prop="farm">
                </el-table-column>

                 <el-table-column
                    label="货主"
                    width="120"
                    prop="master">
                </el-table-column>

                <el-table-column
                    label="产品份数"
                    width="120"
                    prop="productCopies">
                </el-table-column>

            </el-table>
                    <div class="block" style="margin-left: 46px">
                            <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="fetchData" :current-page.sync="page">
                            </el-pagination>
                    </div>
                </div>
            </div>

            		<el-dialog title="分割份数" 
                        :visible.sync="dialogFormVisible" 
                        width="300px"
                        >
					<el-form :model="dialogMessage" label-position="right">
                        
						<el-col>
						<el-form-item label="产品编号" :label-width="formLabelWidth">				
						<el-input v-model="dialogMessage.number" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col>
						<el-form-item label="产品名称" :label-width="formLabelWidth">			
						<el-input v-model="dialogMessage.name" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col>
						<el-form-item label="产品份数" :label-width="formLabelWidth" >
							<el-input v-model="dialogMessage.copies" ></el-input>
						</el-form-item>
						</el-col>

					</el-form>

					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="sureCopies()">确认</el-button>
					</div>
				</el-dialog>

            <div class="card">
                <p class="card-title">成品</p>
                <div class="border-main">
                    
            <el-table
            :data="tableData2"
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :border="true"
            >
                <el-table-column
                    type="index">
                </el-table-column>

                <el-table-column
                    label="成品编号"
                    width="180"
                    prop="madeupNumber">
                </el-table-column>

                <el-table-column
                    label="时间"
                    width="180"
                    prop="madeupTime">
                </el-table-column>
                
                <el-table-column
                    label="产品视频"
                    width="120"
                    prop="madeupVideo"
                    center>
                    <el-button type="text">查看</el-button>
                </el-table-column>

                <el-table-column
                class="action"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <el-button @click="cellClick(scope.row, scope.column)" type="text">添加视频</el-button>
                        <el-button @click="cellClick(scope.row, scope.column)" type="text">打印</el-button>
                    </div>
                </template>
            </el-table-column>

            </el-table>
      
            
                </div>
            </div>

    </div>
</template>

<script>
import { isReqSuccessful} from '@/util/jskit'
import { getUserById } from '@/util/getdata'

export default {
   mounted(){
       let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
								this.user = res.data.model
								console.log(this.user);
                let {userFactory} = this.user
            }
			}).then(this.fetchData)
   },
    data () {
        return {
            tableData:[{productNumber:'G123456'},{productNumber:'G123457'}],
            tableData2:[{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''}],
            total:0,
            page:1,
            dialogMessage:{
                number:null,
                name:null,
                copies:null,
            },
            dialogFormVisible:false,
            formLabelWidth:'80px',
            user:{},
        }
    },
    methods: {
        //份数
        changeCopies(row,column,cell){
            if(column.label=='产品份数'){
                this.dialogMessage.number=row.productNumber
                this.dialogMessage.name=row.productName
                this.dialogMessage.copies=row.productCopies
                this.dialogFormVisible=true
            }
            
        },
        //份数确认
        sureCopies(){
            this.dialogFormVisible = false
            let number=this.dialogMessage.number
            let copies=this.dialogMessage.copies
            this.tableData.some(function(item,index){
                if(item.productNumber==number){
                    item.productCopies=copies
                    return
                }
            })
            let i=0
            let now=new Date();
            let time=now.toLocaleDateString()+' '+now.toTimeString().slice(0,8)
            //console.log(this.tableData2[0].madeupNumber)
            for(i=0;i<copies;i++){
                this.tableData2[i].madeupNumber=String(number)+i
                this.tableData2[i].madeupTime=time.substr()
            }
            
        },
        cellClick(){

        },
        fetchData(){

        }
    }
}
</script>

