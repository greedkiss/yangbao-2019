	<template>
		<div>
			<div  class="area_management">
					<span class="area_name" size='small'>省</span>
					<el-select v-model="value.province" placeholder="省" size='small' @change="provinceChoose">
					<el-option
					v-for="item in area.province" 
					:key="item.value"
					:label="item.label"
					:value="item"
					>
					</el-option>
					</el-select>
						<span class="area_name" size='small' style="margin-left:20px">市</span>				
					<el-select v-model="value.city" placeholder="市" size='small' @change="cityChoose">
					<el-option
					v-for="item in area.city"
					:key="item.value"
					:label="item.label"
					:value="item">
					</el-option>
					</el-select>
					<span class="area_name" size='small' style="margin-left:20px">县</span>		
					<el-select v-model="value.country" size='small' placeholder="县">
					<el-option
					v-for="item in area.country"
					:key="item.value"
					:label="item.label"
					:value="item">
					</el-option>
				</el-select>
			</div>

			<div style="margin-top:10px">
				<el-form :inline="true" style="width:100%">
					<el-form-item>
					<span class="car_name" size='small'>终端店</span>
						<el-select v-model="values1"  size='small' placeholder="请选择终端店">
						<el-option
						placeholder="选择终端店"
						v-for="item in options"
						:key="item.id"
						:label="item.name"
						:value="item.id">
						</el-option>
					</el-select>
					</el-form-item>
					<el-form-item>
						<span class="car_name" size='small'>车辆</span>
						<el-select v-model="values2"  size='small' placeholder="请选择司机">
						<el-option
						placeholder="选择车辆"
						v-for="item in options1"
						:key="item.id"
						:label="item.driverName"
						:value="item.id">
						</el-option>
					</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit" size='small'>生成订单</el-button>
					</el-form-item>
				</el-form>
			</div>
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

			
			<div class="admin-form" style="margin-top:20px;">
				<span style="margin-bottom:10px;">选择售卖</span>
				<div class="time" >
                        <span class="time-span ellipse">耳牌号</span>
                        <el-input  size="small" v-model="searchCode"></el-input>
                    </div>
                <el-button @click="fetchData()" size="mini" type="primary">查询</el-button>
			<el-table 
			ref="multipleTable"
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100%; margin-top:10px;" 
			@selection-change="handleSelectionChange">
				<el-table-column
				label="勾选"
				type="selection"
				width="55">
				</el-table-column>
				<el-table-column                            
					label="部位编码"
					width="120"
					prop="partNumber"
				>
				</el-table-column>
				<el-table-column
					label="部位名称"
					width="120"
					prop="partName"
				>
				</el-table-column>
				<el-table-column
					label="重量"
					width="120"
					prop="weight"
				>
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
					label="价格"
					width="120"
					prop="price">
				</el-table-column>
				<el-table-column
					label="养殖场"
					width="120"
					prop="breedName">
				</el-table-column>
				<el-table-column
					label="货主"
					width="120"
					prop="responsiblePersonName">
				</el-table-column>
				<el-table-column
					label="联系电话"
					width="120"
					prop="responsiblePersonPhone">
				</el-table-column>
			</el-table>
			<el-pagination
				layout="prev, pager, next"
				:total="total"
				@current-change="fetchData"
				:current-page.sync="page">
			</el-pagination>
			</div>
			<el-dialog title="视频详情"    
						:visible.sync="dialogFormVisible" 
						width="50%">
			<div>
			<el-card :body-style="{ padding: '0px' }">
			<video :src="tableData.video" class="production-video" controls="controls"  width="100%"></video>
			</el-card>
			</div>
			</el-dialog>

		</div>
	</template>

	<script>
	import { isReqSuccessful,getThumbPicture } from '@/util/jskit'
	import { getUserById,getFac,getPlace , getstockData ,gettotalData ,getCarData,orderCreate,getStockManageNum} from '@/util/getdata'

	export default {
		watch: {
			searchCode(newVal){
				let reg = /[MSG]\d+/;
            	this.searchCode = this.searchCode.match(reg)[0];
				this.fetchData();
			},
			newProvince(provice){
				let simpleaddress={
				province:this.value.province.label,
				city:this.value.city.label,
				country:this.value.country.label
				}
			getFac(simpleaddress).then(res =>{
						if (isReqSuccessful(res)) {
									this.options = res.data.List
							}
					})

			},
			newCity(city){
				let simpleaddress={
				province:this.value.province.label,
				city:this.value.city.label,
				country:this.value.country.label
				}
			getFac(simpleaddress).then(res =>{
						if (isReqSuccessful(res)) {
							this.options = res.data.List
							}
					})

			},
			newCountry(country){
				let simpleaddress={
				province:this.value.province.label,
				city:this.value.city.label,
				country:this.value.country.label
				}
			getFac(simpleaddress).then(res =>{
						if (isReqSuccessful(res)) {
							this.options = res.data.List
							}
					})


			}
		
		},
		computed:{
			newProvince(){
				return this.value.province
			},
			newCity(){
				return this.value.city
			},
			newCountry(){
				return this.value.country
			},
		},
		data(){
			return{
				numtableData:[],
				values1:'',
				values2:'',
				options:[],
				options1:[],
				area: {
					province: [],
					city: [],
					country: [],
					town: []
				},
				value: {
					province: '',
					city: '',
					country: ''
				},
				options:'',
				multipleSelection:[],
				state1:'',
				state2:'',
				tableData:[],
				user:'',
				page:1,
				total:0,
				defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
				dialogFormVisible:false,
				searchCode:null
			}
		},

		methods:{ 
		//生成订单
			submit(){
				let array = this.multipleSelection
				let id=this.user.userFactory
				let len=array.length-1
				let sheep=''
				let sumWeight=0
				let sumPrice=0
				let divisions=[]
				for(let i = 0;i<len;i++){
				let weight=array[i].weight
				let price=array[i].price
				let erNumber=array[i].partNumber+','
				divisions[i]=array[i].id
				sheep=sheep+erNumber
				sumWeight=sumWeight+weight
				sumPrice=sumPrice+price
				}
				let weight=array[len].weight
				let price=array[len].price
				let erNumber=array[len].partNumber
				divisions[len]=array[len].id
				sheep=sheep+erNumber
				sumWeight=sumWeight+weight
				sumPrice=sumPrice+price
				let data={
					slaughterId:id,
					customerId:this.values1,
					carId:this.values2,
					sumPrice,
					sumWeight,
					divisions,
					sheep
				} 
				if(data.customerId==""||data.carId==""){
					this.$message.warning('请完善信息')
				}else{
					orderCreate(data).then(res => {
						if (isReqSuccessful(res)) {
							this.$message.success('生成订单成功')
						}
						
					},).then(this.fetchData)
					console.log(id,data)
					
				}
				
			},
			provinceChoose(item){
				let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?id='+item.value+'&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
				let obj = {url}
				console.log(url)
				this.value.city = ''
				this.value.country = ''
				this.value.town = ''
				if(item.label.indexOf('市') == -1){
					getPlace(obj).then(res => {
						this.area.city = []
						res.result.forEach((item) =>{
							item.forEach((ipv)=>{
								this.area.city.push({
									label: ipv.fullname,
									value: ipv.id
								})
							})
						})
					})
				}else{
						this.value.city = '市辖区'
						getPlace(obj).then(res => {
						this.area.country = []
						res.result.forEach((item) => {
							item.forEach((ipv)=>{
								this.area.country.push({
									label: ipv.fullname,
									value: ipv.id
								})
							})
						})
					})
				}
			},
			cityChoose(item){
				let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?id='+item.value+'&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
				let obj = {url}
				this.value.country = ''
				this.value.town = ''
				getPlace(obj).then(res => {
					this.area.country = []
					res.result.forEach((item) =>{
						item.forEach((ipv)=>{
							this.area.country.push({
								label: ipv.fullname,
								value: ipv.id
							})
						})
					})
				})
			},
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
			//复选框
			toggleSelection(rows) {
			if (rows) {
			rows.forEach(row => {
				this.$refs.multipleTable.toggleRowSelection(row);
			});
			} else {
			this.$refs.multipleTable.clearSelection();
			}
			},
			handleSelectionChange(val) {
			this.multipleSelection = val;
			},
			view(index){
				this.pictureOfCar=this.tableData[index].pictureOfCar
				this.dialogFormVisible=true
				console.log(this.tableData[index].pictureOfCar)
			},
			fetchData(){
				let id=this.user.userFactory;
				let param={
					page:this.page-1,
					size:10
				}
				if(this.searchCode){
					param.trademark = this.searchCode;
				}
				getstockData(id, param).then(res => {
							if (isReqSuccessful(res)) {
								let data = res.data;
								this.tableData = data.List;
								this.total = data.number;
							}
						},)
				getCarData(id, param).then(res => {
							if (isReqSuccessful(res)) {
								let data = res.data;
								this.options1 = data.List
							}
							
						},)
			}
		},

		mounted(){
			let id = this.$route.params.id
			getUserById(id).then(res => {
				if (isReqSuccessful(res)) {
					this.user = res.data.model
					console.log(this.user);
					
					let id ={id:this.user.id}
					getFac(id).then(res =>{
						if (isReqSuccessful(res)) {
							this.options = res.data.List
						}
					})
				}
			}).then(this.fetchData).then(this.getNum)
			let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
			let obj = {url}
				getPlace(obj).then(res => {
					res.result.forEach((item) =>{
						item.forEach((ipv)=>{
							this.area.province.push({
								label: ipv.fullname,
								value: ipv.id
							})
						})
					})
				})
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


