	<template>
		<div>
			<div  class="area_management">
					<div class="inputWrapper">
						<span class="inputSpan ellipse">省</span>
						<el-select v-model="value.province" style="width:65% !important" placeholder="省" size='small' @change="provinceChoose">
							<el-option
							v-for="item in area.province" 
							:key="item.value"
							:label="item.label"
							:value="item"
							>
							</el-option>
						</el-select>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse">市</span>
						<el-select v-model="value.city" style="width:65% !important" placeholder="市" size='small' @change="cityChoose">
							<el-option
							v-for="item in area.city"
							:key="item.value"
							:label="item.label"
							:value="item">
							</el-option>
						</el-select>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse">县</span>
						<el-select v-model="value.country" style="width:65% !important" size='small' placeholder="县">
							<el-option
							v-for="item in area.country"
							:key="item.value"
							:label="item.label"
							:value="item">
							</el-option>
						</el-select>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse" size='small'>终端店</span>
						<el-select v-model="values1" style="width:65% !important" size='small' placeholder="请选择终端店">
							<el-option
							placeholder="选择终端店"
							v-for="item in options"
							:key="item.id"
							:label="item.name"
							:value="item.id">
							</el-option>
						</el-select>
					</div>
			</div>
			<div style="margin-top:10px">
					<div class="inputWrapper">
						<span class="inputSpan ellipse">取货</span>
						<el-input  size="small"  style="width:65% !important" v-model="productNumber" placeholder="请输入/扫描取货单号"></el-input>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse">总金额</span>
						<el-input  size="small"  style="width:65% !important" v-model="allPrice"></el-input>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse">总重量</span>
						<el-input  size="small"  style="width:65% !important" v-model="allWeight"></el-input>
					</div>
					<div class="inputWrapper">
						<span class="inputSpan ellipse" size='small'>车辆</span>
						<el-select v-model="values2" style="width:65% !important" size='small' placeholder="请选择司机">
							<el-option
							placeholder="选择车辆"
							v-for="item in options1"
							:key="item.id"
							:label="item.driverName"
							:value="item.id">
							</el-option>
						</el-select>
					</div>
			</div>
			
			<div class="submitOrder">
				<el-table
				class="submitOrdertable"
				:data="allEarTag"
				stripe
				max-height="200">
					<el-table-column
						type="index"
						width="50">
					</el-table-column>
					<el-table-column
					label="已选货物"
					width="120"
					prop="number">
					</el-table-column>
					<el-table-column
						class="action"
						label="操作"
						align='center'
						width="80">
						<template slot-scope="scope">
							<div class="opr">
								<el-button @click="deleteAllEarTag(scope.$index)" type="text">删除</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="submitBtn"></div>
				<div class="submitBtn"><el-button type="primary"   @click="submit" size='small'>提交打印</el-button></div>
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
					label="照片"
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
					prop="weight"
				>
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
			</div>
			<el-dialog title="图片详情"    
				:visible.sync="dialogFormVisible" 
				width="800px">
					<div>
					<el-card :body-style="{ padding: '0px' }">
						<img :src="videoSrc" class="image" :onerror="defaultImg">
					</el-card>
					</div>
			</el-dialog>

		</div>
	</template>

	<script>
	import { isReqSuccessful,getThumbPicture } from '@/util/jskit'
	import { getUserById,getFac,getPlace , getstockData ,gettotalData ,getCarData,orderCreate} from '@/util/getdata'

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
			},
			productNumber (newval) {
				let reg = /[MSG]\d+[A-Z]/g;
				let canPush = /[MSG]\d{6,}[A-Z]/g;
				let res = this.productNumber.match(reg);
				let canPushRes = this.productNumber.match(canPush);
				if(res){
					this.productNumber = res.join(",");
				}else{
					if(newval.length > 1){  
					this.$message.warning("请输入合法耳牌");
					}
				}
				if(canPushRes){
					this.allEarTag = [];
					canPushRes.forEach(v => {
						this.allEarTag.push({
							number:v
						})
					})
				}
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
				searchCode:null,
				productNumber:'',
				allPrice:'',
				allWeight:'',
				allEarTag:[],
				videoSrc:''
			}
		},

		methods:{ 
		//生成订单
			submit(){
				let array = this.multipleSelection;
				let id=this.user.userFactory;
				let len=array.length;
				let sheep='';
				let sumWeight=0;
				let sumPrice=0;
				let divisions=[];
				for(let i = 0; i < len-1; i++){
					let weight=array[i].weight;
					let price=array[i].price;
					let erNumber=array[i].partNumber+',';
					divisions[i]=array[i].id;
					sheep=sheep+erNumber;
					sumWeight=sumWeight+weight;
					sumPrice=sumPrice+price;
				}
				let weight = 0;
				let price = 0;
				let erNumber = '';
				if(len > 0){
					erNumber = array[len-1].partNumber;
					divisions[len-1] = array[len-1].id;
					sumWeight += weight;
					sumPrice += price;
				}
				sheep += erNumber;
				if(this.productNumber != ''){
					if(array.length > 0 ){
						sheep +=  "," + this.productNumber
					}else{
						sheep += this.productNumber
					}
				}
				console.log(sheep);
				return;
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
			deleteAllEarTag(index){
				this.allEarTag.splice(index, 1);
				let str = '';
				this.allEarTag.forEach(item => {
					str += item.number;
				})
				this.productNumber = str;
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
			},
			Delete(){

			},
			view(index){
				this.videoSrc=this.tableData[index].video;
				this.dialogFormVisible=true;
			},
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
			}).then(this.fetchData)
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
<style scoped lang="stylus">
	.inputWrapper
		display inline-block
		font-size 0
		width 20% 
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
		height 220px
		align-items center
		justify-content right
		.submitOrdertable
			flex 0 1 30% 
		.submitBtn
			flex 0 1 10%
	.stockManage-form
		.el-table
			display table-caption
		.el-table th 	
			border-left 2px solid rgb(230, 230, 230) !important
			background-color rgb(238, 241, 246) !important
</style>


