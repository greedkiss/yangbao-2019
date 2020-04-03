<template>
    <div>
        <el-form :inline="true" style="width:100%">
        <el-form-item>
            <el-input v-model="ordernum" size="small" placeholder="" style="width:232px">
                <template slot="prepend">货单号:</template>
            </el-input>
        </el-form-item>
        </el-form>
        
        <div style="width:20%; margin:50px auto">
            <el-button type="primary" @click = "sure">确认销售</el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column
            label="货单号"
            width="120"
            prop="id">
            </el-table-column>
            <el-table-column
            label="货单状态"
            width="120"
            prop="orderStatus">
            </el-table-column>
            <el-table-column
            label="客户单位"
            width="120"
            prop="customerName">
            </el-table-column>
            <el-table-column
            label="车辆"
            width="120"
            prop="">
            </el-table-column>
            <el-table-column
            label="取货编号"
            width="120"
            prop="">
            </el-table-column>
            <el-table-column
            label="总重量"
            width="120"
            prop="sumWeight">
            </el-table-column>
            <el-table-column
            label="单价"
            width="120"
            prop="">
            </el-table-column>
            <el-table-column
            label="总金额"
            width="120"
            prop="sumPrice">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr" >
                        <template>
                            <span @click="deleteItem(scope.$index)">删除</span>
                        </template>
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
        <el-dialog title="订单详情" 
                    
					:visible.sync="dialogFormVisible" 
					width="800px">
                    <div>
                    <el-form label-position="right">

                        <el-col :span='12'>
						<el-form-item label="订单ID" :label-width="formLabelWidth">
						     <el-input v-model="tableData[index].id"  :disabled="true" ></el-input>
						</el-form-item>
						</el-col>

						<el-col :span='12'>
						<el-form-item label="总重量" :label-width="formLabelWidth" >
							<el-input v-model="tableData[index].sumWeight" :disabled="true" ></el-input>
						</el-form-item>
						</el-col>

						<el-col :span='12'>
						<el-form-item label="总金额" :label-width="formLabelWidth">
							<el-input v-model="tableData[index].sumPrice" :disabled="true" ></el-input>
						</el-form-item>
						</el-col>

						 
						<el-col :span='12'>
						<el-form-item label="屠宰场" :label-width="formLabelWidth">			
						<el-input v-model="tableData[index].slaughterName" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="客户单位" :label-width="formLabelWidth">				
						<el-input v-model="tableData[index].customerName" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="销售时间" :label-width="formLabelWidth">			
						<el-input v-model="tableData[index].orderTime" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="客户" :label-width="formLabelWidth">			
						<el-input v-model="tableData[index].contactPerson" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

                        <el-col :span='12'>
						<el-form-item label="联系方式" :label-width="formLabelWidth">		
						<el-input v-model="tableData[index].contactPersonPhone"  	:disabled="true"></el-input>
						</el-form-item>
                        </el-col>

						</el-form>
                    </div>   
                        <div>部位编码：
                        <el-input
                        type="textarea"
                        :rows="5"
                        :disabled="true"
                        v-model="tableData[index].partNumber">
                        </el-input>
                        </div>
                        
                    <div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="sure(index)">确认订单</el-button>
					</div>	
				</el-dialog>

    </div>
</template>

<script>
import { isReqSuccessful } from '@/util/jskit'
import { getUserById,getOrderData,deleteOrderData,confirmOrderData} from '@/util/getdata'

export default {
    data(){
        return{
            ordernum:'',
            gmtCreate:'',
            tableData:[{id:"无数据"}],
            dialogFormVisible:false,
            index:0,
            formLabelWidth: '70px',
            page:1,
            total: 10,
            user:'',
        }
    },
    
    mounted(){
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
            }
        }).then(this.fetchData)
    },    
    watch: {
        ordernum(newval){
            this.ordernum()
        }
    },
    methods:{ 
        submit(){
            let factory=this.user.userFactory;
            let data={
                order:this.ordernum,
                factory,
                page:this.page-1,
                size:10,
                startTime:this.gmtCreate[0],
                endTime:this.gmtCreate[1]
            }
             getOrderData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        let data = res.data;
                        if(data.List==''){
                            this.tableData=[{id:"无数据"}]
                        }else{
                        this.tableData = data.List
                        this.total = data.number
                        }
                    }
                    
                },)
        },
        sure(index){
            //let id = this.tableData[index].id
            let id = this.ordernum;
                confirmOrderData(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.fetchData()
                        this.$message.success('确认成功!')
                    }
                    this.dialogFormVisible=false
            }).then(this.fetchData)
            
        },
        view(index){
            this.index=index
            this.dialogFormVisible=true
        },
        deleteItem (index) {
                let id = this.tableData[index].id
                deleteOrderData(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.fetchData()
                        this.$message.success('删除成功!')
                    }
            }).then(this.fetchData)
        },

        //加载表格信息
        fetchData(){
            let factory=this.user.userFactory;
            let param={
                factory,
                page:this.page-1,
                size:10,
                startTime:this.gmtCreate[0],
                endTime:this.gmtCreate[1]
            }
            getOrderData(param).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data;
                    this.tableData = data.List
                    this.total = data.number
                }
            })
        }

    }

}
</script>
