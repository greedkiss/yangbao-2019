<template>
    <div>
        <el-form :inline="true" style="width:100%">
        <el-form-item>
        <el-input v-model="ordernum" size="small" placeholder="" style="width:232px">
        <template slot="prepend">订单号:</template>
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
            <el-button size="small" @click="submit">查询</el-button>
        </el-form-item>
        </el-form>
        <el-table :data="tableData">
            <el-table-column
            label="订单ID"
            width="120"
            prop="id">
            </el-table-column>
            <el-table-column
            label="订单状态"
            width="120"
            prop="state">
            </el-table-column>
            <el-table-column
            label="屠宰场"
            width="120"
            prop="slaughter">
            </el-table-column>
            <el-table-column
            label="客户单位"
            width="120"
            prop="destinationFactoryName">
            </el-table-column>
            <el-table-column
            label="订单生成时间"
            width="120"
            prop="saletime">
            </el-table-column>
            <el-table-column
            label="总金额"
            width="120"
            prop="price">
            </el-table-column>
            <el-table-column
            label="总重量"
            width="120"
            prop="weight">
            </el-table-column>
            <el-table-column
            label="部位编码"
            width="120"
            prop="positionnums">
            </el-table-column>
            <el-table-column
            label="联系人"
            width="120"
            prop="responsiblePerson">
            </el-table-column>
            <el-table-column
            label="联系方式"
            width="120"
            prop="responsiblePersonPhone">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr" >
                        <span @click="view(scope.$index)">查看</span>
                        <template>
                            <span @click="deleteItem(scope.row)">取消订单</span>
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
						<el-form-item label="订单ID" style="padding-top:30px" :label-width="formLabelWidth">
						     <el-input v-model="tableData[index].id"  :disabled="true" ></el-input>
						</el-form-item>
						</el-col>

						<el-col :span='12'>
						<el-form-item label="总重量" :label-width="formLabelWidth" >
							<el-input v-model="tableData[index].weight" :disabled="true" ></el-input>
						</el-form-item>
						</el-col>

						<el-col :span='12'>
						<el-form-item label="总金额" :label-width="formLabelWidth">
							<el-input v-model="tableData[index].price" :disabled="true" ></el-input>
						</el-form-item>
						</el-col>

						 
						<el-col :span='12'>
						<el-form-item label="屠宰场" :label-width="formLabelWidth">			
						<el-input v-model="tableData[index].slaughter" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="客户单位" :label-width="formLabelWidth">				
						<el-input v-model="tableData[index].destinationFactoryName" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="销售时间" :label-width="formLabelWidth">			
						<el-input v-model="tableData[index].saletime" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="客户" :label-width="formLabelWidth">			
						<el-input v-model="tableData[index].responsiblePerson" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

                        <el-col :span='24'>
						<el-form-item label="联系方式" :label-width="formLabelWidth">		
						<el-input style="width:45%" v-model="tableData[index].responsiblePersonPhone"  	:disabled="true"></el-input>
						</el-form-item>
                        </el-col>

						</el-form>
                    </div>   
                        <div>部位编码：
                        <el-input
                        type="textarea"
                        :rows="5"
                        :disabled="true"
                        v-model="tableData[index].positionnums">
                        </el-input>
                        </div>
                        
                    <div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="sure">确认订单</el-button>
					</div>	
				</el-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return{
            ordernum:'',
            gmtCreate:'',
            tableData:[{id:1233213,state:121,slaughter:21321,destinationFactoryName:313,saletime:412,price:23132,weight:141,responsiblePerson:251231,responsiblePersonPhone:110,positionnums:54654654165465465465465464654},
            {id:1233213,state:5,slaughter:554,destinationFactoryName:454,saletime:78,price:23678132,weight:141,responsiblePerson:251231,responsiblePersonPhone:111,positionnums:56444445}],
            dialogFormVisible:false,
            index:0,
            formLabelWidth: '70px',
            page:1,
            total: 10,
        }
    },

    methods:{ 
        submit(){
            let data={
                ordernum:this.ordernum,
                time:this.gmtCreate
            }
            console.log(data)
        },
        sure(){
            
        },
        view(index){
            this.index=index
            this.dialogFormVisible=true
        },
        deleteItem (index) {
            this.$confirm('将取消此订单, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[index].id
                // this.deleteData(id).then(res => {
                //     if (isReqSuccessful(res)) {
                //         this.fetchData()
                //         this.$message.success('删除成功!')
                //     }
                // })
            })
            // .catch(() => {
            //     return false
            // })
        },
        //加载表格信息
        async fetchData(){
        let id=this.user.userFactory;
        let param={
            page:this.page-1,
            size:15
        }
        // getCorrelationData(id, param).then(res => {
        //             if (isReqSuccessful(res)) {
        //                 let data = res.data;
        //                 this.tableData = data.List
        //                 this.total = data.size
        //             }
                    
        //         },)
      }

    }

}
</script>
