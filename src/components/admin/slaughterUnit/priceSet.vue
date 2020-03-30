	<template>
		<div>
			<div style="margin-top:10px">
					<div class="inputWrapper">
						<span class="inputSpan ellipse" size='small'>部件名称</span>
						<el-select v-model="partName" style="width:65% !important" size='small' placeholder="请选择部件">
							<el-option
							v-for="item in options"
							:key="item.index"
							:label="item"
							:value="item">
							</el-option>
						</el-select>
					</div>
                    <div class="inputWrapper">
						<span class="inputSpan ellipse" style="width:45% !important">价格(元/斤)</span>
						<el-input  size="small"  style="width:55% !important" v-model="partPrice"></el-input>
					</div>
			</div>
			
			<div class="submitOrder">
				<div class="submitBtn"><el-button type="primary"   @click="submit" size='small'>提交</el-button></div>
			</div>
			<div class="admin-form" >
			<el-table 
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%; margin-top:10px;" >
				<el-table-column
					label="部位名称"
					width="200"
					prop="type"
				>
				</el-table-column>
				<el-table-column
					label="价格(元/斤)"
					width="200"
					prop="price"
				>
				</el-table-column>
				<el-table-column
                class="action"
                label="操作"
                align='center'
                width="200">
                <template slot-scope="scope">
                    <div class="opr">
                        <el-button @click="Edit(scope.$index)" type="text">编辑</el-button>
                        <el-button @click="Delete(scope.$index)" type="text">删除</el-button>
                    </div>
                </template>
      			</el-table-column>
			</el-table>
			</div>
			<el-dialog
			:visible.sync="showEditDialog"
			width="50%"
			center>
				<div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse" size='small'>部件名称</span>
						<el-input  size="small"  style="width:55% !important" v-model="editPartName" disabled="true"></el-input>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse" style="width:45% !important">价格(元/斤)</span>
						<el-input  size="small"  style="width:55% !important" v-model="editPartPrice"></el-input>
					</div>
					<div class="submitOrder">
						<div class="submitBtn">
							<el-button type="primary"   @click="eidtSubmit" size='small'>提交修改</el-button>
						</div>
					</div>
				</div>
            </el-dialog>
		</div>
	</template>

	<script>
	import { isReqSuccessful } from '@/util/jskit'
	import { getUserById, postPrice, getPrice, updatePrice, deletePrice} from '@/util/getdata'

	export default {
		data(){
			return{
                partName:'',
                partPrice:0,
				options:["附属物","胴体","二分体","羊腹肉","黄瓜条","羊肩胛","羊肋排","羊前","羊腰脊","羊后腿","羊大腿","羊前腿","羊外肌","羊里脊"],
                tableData:[],
                user:null,
				showEditDialog:false,
				editPartName: '',
				editPartPrice: 0,
				editTypeCode:'',
				eidtId: -1,
            }
		},

		methods:{ 
		//生成订单
			submit(){
				let data = {
					factory: this.user.userFactory,
					type: this.partName,
					price: this.partPrice
				}
				postPrice(data).then(res=>{
					if(isReqSuccessful(res)){
						this.$message.success("添加成功");
						this.fetchData();
					}else{
						this.$message.error("添加失败");
					}
				})
			},
			fetchData(){
				this.tableData = [];
				let factory =  this.user.userFactory
				getPrice(factory).then(res=>{
					this.tableData = res.data.data;
				})
			},
			Delete(index){
				let deleteId = this.tableData[index].id;
				deletePrice(deleteId).then(res=>{
					if(isReqSuccessful(res)){
						this.$message.success("删除成功!");
					}else{
						this.$message.error("删除失败");
					}
					this.fetchData()
				});
			},
			eidtSubmit(){
				let data = {
					id: this.editId,
					factory: this.user.userFactory,
					type: this.editPartName,
					typeCode: this.editTypeCode,
					price: this.editPartPrice
				}
				updatePrice(data).then(res=>{
					if(isReqSuccessful(res)){
						this.$message.success("修改成功!");
						this.showEditDialog = false;
						this.fetchData()
					}else{
						this.$message.error("修改失败");
					}
				});
			},
            Edit(index){
				let item = this.tableData[index];
				this.editId = item.id;
				this.editTypeCode = item.typeCode;
				this.editPartName = item.type;
				this.editPartPrice = item.price;
				this.showEditDialog = true;
            }
		},

		mounted(){
			let id = this.$route.params.id
			getUserById(id).then(res => {
				if (isReqSuccessful(res)) {
					this.user = res.data.model;
				}
			}).then(this.fetchData);
		}
		
	}

	</script>
<style scoped lang="stylus">
	.inputWrapper
		display inline-block
		font-size 0
		width 35% 
		.inputSpan
			box-sizing border-box
			display inline-block
			height 32px
			width 35%
			line-height 32px  
			text-align center    
			vertical-align top
			font-size 14px
			color #2891d1
			&+.el-input
				width calc(100% - 80px)!important
			&+.el-select
				width calc(100% - 80px)!important
	.submitOrder
		display flex
		height 150px
		align-items center
		justify-content center
	.stockManage-form
		.el-table
			display table-caption
		.el-table th 	
			border-left 2px solid rgb(230, 230, 230) !important
			background-color rgb(238, 241, 246) !important
</style>


