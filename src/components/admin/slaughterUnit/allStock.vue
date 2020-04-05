	<template>
		<div>
			<div class="stockManage-form">
				<span>各部分库存数量（个）</span>

				<el-table :data="numtableData" :border="true" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column
					label="部位名称"
					width="80"
					>
					<template>
						<div>
							<span>数量</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="胴体"
					width="78"
					prop="Dnum">
				</el-table-column>
				<el-table-column
					label="二分体"
					width="78"
					prop="DEnum">
				</el-table-column>
				<el-table-column
					label="羊腹肉"
					width="78"
					prop="DFnum">
				</el-table-column>
				<el-table-column
					label="黄瓜条"
					width="78"
					prop="DHnum">
				</el-table-column>
				<el-table-column
					label="羊肩胛"
					width="78"
					prop="DJnum">
				</el-table-column>
				<el-table-column
					label="羊肋排"
					width="78"
					prop="DLnum">
				</el-table-column>
				<el-table-column
					label="羊前"
					width="78"
					prop="DMnum">
				</el-table-column>
			</el-table>

			<el-table :data="numtableData" :border="true" :header-cell-style="{background:'#eef1f6',color:'#606266'}" >
				<el-table-column
					label="部位名称"
					width="80"
					>
					<template>
						<div>
							<span>数量</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="羊腰脊"
					width="78"
					prop="DYnum">
				</el-table-column>
				<el-table-column
					label="羊后腿"
					width="78"
					prop="DRnum">
				</el-table-column>
				<el-table-column
					label="羊大腿"
					width="78"
					prop="DDnum">
				</el-table-column>
				<el-table-column
					label="羊前腿"
					width="78"
					prop="DQnum">
				</el-table-column>
				<el-table-column
					label="羊外肌"
					width="78"
					prop="DWnum">
				</el-table-column>
				<el-table-column
					label="羊里脊"
					width="78"
					prop="DInum">
				</el-table-column>
				<el-table-column
					label=""
					width="78"
					prop="">
				</el-table-column>
			</el-table>
			</div>

		</div>
	</template>

	<script>
	import { isReqSuccessful } from '@/util/jskit'
	import { getUserById,getStockManageNum} from '@/util/getdata'

	export default {
		data(){
			return{
				numtableData:[],
				user:'',
			}
		},

		methods:{ 
			//获取数量
		    getNum(){
                let id=this.user.userFactory
                this.numtableData=[]
                getStockManageNum(id).then(res => {
                    if (isReqSuccessful(res)) {
                        let body = res.data.body
                        let partData = res.data.part
                        let v={Dnum:null,DEnum:null,DFnum:null,DHnum:null,DJnum:null,DLnum:null,DMnum:null,DYnum:null,DRnum:null,DDnum:null,DQnum:null,DWnum:null,DInum:null}
                        v.Dnum=body
                        partData.forEach(function(item,index){
                            switch (item.part) {
                        case 'F':
                            v.DFnum=Number(item.number)
                            break;
                        case 'H':
                            v.DHnum=Number(item.number)
                            break;
                        case 'Y':
                            v.DYnum=Number(item.number)
                            break;
                        case 'R':
                            v.DRnum=Number(item.number)
                            break;
                        case 'D':
                            v.DDnum=Number(item.number)
                            break;
                        case 'J':
                            v.DJnum=Number(item.number)
                            break;
                        case 'M':
                            v.DMnum=Number(item.number)
                            break;
                        case 'E':
                            v.DEnum=Number(item.number)
                            break;
                        case 'Q':
                            v.DQnum=Number(item.number)
                            break;
                        case 'L':
                            v.DLnum=Number(item.number)
                            break;
                        case 'I':
                            v.DInum=Number(item.number)
                            break;
                        case 'W':
                            v.DWnum=Number(item.number)
                            break;
                    
                        default:
                            break;
                    }
                        })
                        this.numtableData.push(v);
                        }
                        else{
                            this.$message.error('获取数据失败')
                        }
                    })
                },
		},

		mounted(){
			let id = this.$route.params.id
			getUserById(id).then(res => {
				if (isReqSuccessful(res)) {
					this.user = res.data.model
					console.log(this.user);
					let id ={id:this.user.id}
				}
			}).then(this.getNum)
		}
		
	}

	</script>
<style lang="stylus">
	.area_management
		margin-left 25px
	.stockManage-form
		.el-table
			display table-caption
		.el-table th 	
			border-left 2px solid rgb(230, 230, 230) !important
			background-color rgb(238, 241, 246) !important
</style>


