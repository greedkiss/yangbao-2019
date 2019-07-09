<template>
	<div class="livestock-list">
		
			<div class="area_management">
				<span class="area_name">省</span>
				<el-select v-model="value.province" placeholder="省" @change="provinceChoose">
			    <el-option
			      v-for="item in area.province" 
			      :key="item.value"
			      :label="item.label"
			      :value="item"
			      >
			    </el-option>
				</el-select>
					<span class="area_name">市</span>				
				<el-select v-model="value.city" placeholder="市" @change="cityChoose">
			    <el-option
			      v-for="item in area.city"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
				</el-select>
				<span class="area_name">县</span>		
				<el-select v-model="value.country" placeholder="县">
			    <el-option
			      v-for="item in area.country"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
			  </el-select>
			</div>
			<div class="header">
			<el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="state1"
				  :fetch-suggestions="querySearch1"
				  placeholder="选择屠宰场或终端店"
				  @select="handleSelect1">
				  <i
				    class="el-icon-edit el-input__icon"
				    slot="suffix"
				   >
				  </i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item.breedName }}</div>
				  </template>
				</el-autocomplete>

			<el-button type="primary" @click="dialogFormVisible = true" style="margin-left: 20px">生成订单</el-button>
			
					<el-dialog title="订单详情" 
					:visible.sync="dialogFormVisible" 
					width="800px"
					@open="getSaleData">
					<el-form :model="orderform" label-position="right">

						<el-col :span='12'>
						<el-form-item label="重量" :label-width="formLabelWidth" >
							<el-input v-model="orderform.sumweight" ></el-input>
						</el-form-item>
						</el-col>

						<el-col :span='12'>
						<el-form-item label="总金额" :label-width="formLabelWidth">
							<el-input v-model="orderform.allprice"></el-input>
						</el-form-item>
						</el-col>

						<el-alert
    					title="其他信息"
    					type="info"
							:closable="false"
							center
							style="height:25px">
 						</el-alert>

						 <!-- <el-col :span='12'>
						<el-form-item label="订单ID" style="padding-top:30px" :label-width="formLabelWidth">
						<el-input v-model="orderform.saleID"  :disabled="true" ></el-input>
						</el-form-item>
						</el-col> -->

						<el-col :span='12'>
						<el-form-item label="养殖场" style="padding-top:30px" :label-width="formLabelWidth">			
						<el-input v-model="orderform.farm" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="客户单位" style="padding-top:30px" :label-width="formLabelWidth">				
						<el-input v-model="orderform.factory" 		:disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="数量" :label-width="formLabelWidth">			
						<el-input v-model="orderform.sums" 		:disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col :span='12'>
						<el-form-item label="销售时间" :label-width="formLabelWidth">			
						<el-input v-model="orderform.saleTime" 		:disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						

						<el-col :span='12'>
						<el-form-item label="负责人" :label-width="formLabelWidth">			
						<el-input v-model="orderform.manger"  	:disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-form-item label="联系方式" :label-width="formLabelWidth">		
						<el-input v-model="orderform.tele"  	:disabled="true"></el-input>
						</el-form-item>

						</el-form>

					<div slot="footer" class="dialog-footer">
						<el-button @click="goSave()">保 存</el-button>
						<el-button type="primary" @click="sureSale()">确认销售</el-button>
					</div>
				</el-dialog>


			<el-button type="primary" @click.native.prevent="watchAllSheep()">显示总存栏</el-button>
			<!-- <el-button type="primary" @click.native.prevent="alrtmoveSheepAll">整栏移栏</el-button>
			<el-button type="primary" @click.native.prevent="saleable">可出售</el-button> -->
			<el-input
			    placeholder="请输入耳牌号查询"
			    v-model="searchEartag"
			    style="width: 180px">
			<i slot="suffix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</div>
		<!-- <p style="margin-left: 46px">
				(单击左侧的勾选框选择要出售羊只、移栏羊只、可出售羊只)
		</p> -->
		<el-table :data="tableData" :border="true" @selection-change="changeFun" @cell-click="handleCell">
			<el-table-column label="出售" type="selection" width="55" ></el-table-column>
			
			<el-table-column
				label="商标耳牌号"
				width="120"
				prop="tradeMarkEartag"
			>
			</el-table-column>
			<el-table-column
				label="免疫耳牌号"
				width="120"
				prop="immuneEartag"
			>
			</el-table-column>
			<el-table-column
				label="栋号"
				width="120"
				prop="d"
			>
			</el-table-column>
			<el-table-column
				label="栏号"
				width="120"
				prop="l"
			>
			</el-table-column>
			<el-table-column
				label="羊只品类"
				width="120"
				prop="style"
			>
			</el-table-column>
			<el-table-column
				label="生产阶段"
				width="120"
				prop="Stage"
			>
			</el-table-column>
			<el-table-column
				label="是否可出售"
				width="120"
				prop="issale"
			>
			</el-table-column>
			
			<el-table-column
				label="视频/图片"
				width="120"
				prop="video_img"
			>
			<el-button type="text" >查看</el-button>
			</el-table-column>
			
			<el-table-column
				label="重量"
				width="120"
				prop="sheep_weight"
			>
			</el-table-column>

			<el-table-column
				label="年龄"
				width="120"
				prop="sheepAge"
			>
			</el-table-column>

			<el-table-column
				label="sheepid"
				width="120"
				prop="id"
				v-if="false"
			>
			</el-table-column>

			<el-table-column
				label="操作"
				width="250"
			>
				<template slot-scope="scope">
					<span
						size="small"
						style="cursor:pointer"
						@click="addPicture(scope.row)">添加图片
					</span>
					<span
						style="cursor:pointer"
						size="small"
						type="primary"
						@click="handleUpdate(scope.row)">羊只信息编辑
					</span>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :visible.sync="dialogMoveVisible" class="move">
			<el-form :model="form">
				<span>商标耳牌号: {{this.currentRow.tradeMarkEartag}}</span>
				<span>从栋号: {{this.currentRow.d}}</span>
				<span>栏号: {{this.currentRow.l}}</span>
				<span>移至</span><br/><br/>
				<span>(先填写栋号再填写栏号)</span><br/><br/>
				<span>栋号：</span>
			   <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="state3"
				  :fetch-suggestions="querySearch"
				  @select="handleSelect">
				  <i
				    class="el-icon-edit el-input__icon"
				    slot="suffix">
				  </i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete>
				<span>栏号：</span>
				 <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="state2"
				  :fetch-suggestions="querySearch2"
				  @select="handleSelect2">
				  <i
				    class="el-icon-edit el-input__icon"
				    slot="suffix"
				   >
				  </i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogMoveVisible  = false" size="small">取 消</el-button>
				<el-button type="primary" @click="moveSheepFun" size="small">添 加</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="dialogDeadVisible" class="dead">
			<el-form :model="form">
				<span>商标耳牌号: {{this.currentRow.tradeMarkEartag}}</span><br/>
				<span>死亡原因：</span>
				<el-autocomplete
                     size="small"
                     v-model="form.reason"
                    :fetch-suggestions="fetchReason">
                </el-autocomplete>
				<span>处理方法：</span>
				<el-input v-model="form.method" size="small"></el-input>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogDeadVisible  = false" size="small">取 消</el-button>
				<el-button type="primary" @click="submitSheep" size="small">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 信息编辑 -->
		<el-dialog :visible.sync="dialogUpdateVisible" class="dead">
			<el-form :model="form">
				<span>原商标耳牌号: {{this.updateData.earTag}}</span><br/>
				<span>原免疫耳牌号: {{this.updateData.immu}}</span><br/>
				<span>原羊只品类: {{this.updateData.style}}</span><br/>
				<span>原生产阶段: {{this.updateData.period}}</span><br/>
				<span>商标耳牌号:</span>
				<el-input v-model="upda.earTag" size="small"></el-input><br/>
				<span>免疫耳牌号:</span>
				<el-input v-model="upda.immuTag" size="small"></el-input>
				<span>羊&nbsp只&nbsp品&nbsp类&nbsp:</span>
				<el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="upda.style"
				  :fetch-suggestions="querySearchStyle"
				  @select="handleSelectStyle">
				  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete><br/>
				<span>生&nbsp产&nbsp阶&nbsp段&nbsp:</span>
				<el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="upda.stage"
				  :fetch-suggestions="querySearchStage"
				  @select="handleSelectStage">
				  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete>
				<span>羊&nbsp只&nbsp体&nbsp重&nbsp:</span>
				<el-input v-model="upda.weight" size="small"></el-input><br/>
				<span>羊&nbsp只&nbsp年&nbsp龄&nbsp:</span>
				<el-input v-model="upda.year" size="small"></el-input><br/>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogUpdateVisible  = false" size="small">取 消</el-button>
				<el-button type="primary" @click="updateSheep" size="small">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 部分移动 -->
		<el-dialog :visible.sync="showMoveSheepOnly" class="dead">
			<el-form :model="form">
				<span>羊只所在栏栋: {{this.sheepMessage.location}}</span><br/>
				<span>羊只耳牌号:</span>
				<el-input v-model="sheepMessage.earTag" size="small"></el-input><br/>
				<span>栋&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号：</span>
			   <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="onlySheep.building"
				  :fetch-suggestions="querySearchBuilOnly"
				  @select="handleSelectBuilOnly">
				  <i class="el-icon-edit el-input__icon" slot="suffix"></i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete>
				<br/>
				<span>栏&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号：</span>
				 <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="onlySheep.col"
				  :fetch-suggestions="querySearchColOnly"
				  @select="handleSelectColOnly">
				  <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showMoveSheepOnly  = false" size="small">取 消</el-button>
				<el-button type="primary" @click="submitUp" size="small">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 全栏移动 -->
		<el-dialog :visible.sync="showMoveSheepAll">
			<div style="margin-left: 15%">
		      <el-form >
		      <span>原栋号：</span>
		         <el-autocomplete
		          popper-class="my-autocomplete"
		          v-model="allSheep.oldBuilding"
		          :fetch-suggestions="querySearchBuilAll"
		          @select="handleSelectBuilAll">
		          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
		          <template slot-scope="{ item }">
		            <div class="name">{{ item }}</div>
		          </template>
		        </el-autocomplete>
		        <br/><br/>

		        <span>原栏号：</span>
		         <el-autocomplete
		          popper-class="my-autocomplete"
		          v-model="allSheep.oldCol"
		          :fetch-suggestions="querySearchColAll"
		          @select="handleSelectColAll">
		          <i class="el-icon-edit el-input__icon" slot="suffix">
		          </i>
		          <template slot-scope="{ item }">
		            <div class="name">{{ item }}</div>
		          </template>
		        </el-autocomplete>
		        <br/><br/>
		        <span>移至</span><br/><br/>
		        <span>新栋号：</span>
		         <el-autocomplete
		          popper-class="my-autocomplete"
		          v-model="allSheep.newBuilding"
		          :fetch-suggestions="querySearchBuilAll"
		          @select="handleSelectBuilAllNew">
		          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
		          <template slot-scope="{ item }">
		            <div class="name">{{ item }}</div>
		          </template>
		        </el-autocomplete>
		        <br/><br/>

		        <span>新栏号：</span>
		         <el-autocomplete
		          popper-class="my-autocomplete"
		          v-model="allSheep.newCol"
		          :fetch-suggestions="querySearchColAllNew"
		          @select="handleSelectColAllNew">
		          <i class="el-icon-edit el-input__icon" slot="suffix">
		          </i>
		          <template slot-scope="{ item }">
		            <div class="name">{{ item }}</div>
		          </template>
		        </el-autocomplete>
		      </el-form>
		      <div style="margin-left: 70px ; margin-top:20px ">
		        <el-button @click="dialogFormVisible  = false" size="small">取 消</el-button>
		        <el-button type="primary" @click="moveSheepAllFun" size="small">移 动</el-button>
		      </div>
		    </div>
		</el-dialog>
		<div class="block" style="margin-left: 46px">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="current_change">
        </el-pagination>
        </div>
	</div>
</template>

<script>
import pcaa from 'area-data/pcaa'
import { isReqSuccessful } from '@/util/jskit'
import { getUserById , getAllSaleSheep ,findAllSheep, makeDeadSheep, getSheepBuilding ,getSheepCol ,moveSheep ,getSaleFac ,makeSaleFac ,updateSheepTog ,moveSheepAll ,moveSheepPart ,querySheepStage ,updateSheepAllMe, changeSaleable, getPlace} from '@/util/getdata'
export default {
	watch: {
		searchEartag(n){
			this.fetchData()
		}
	
	},
	mounted(){
		
		let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
								this.user = res.data.model
								console.log(this.user);
                let {userFactory} = this.user
         		getSaleFac(userFactory).then(res =>{
	         		if (isReqSuccessful(res)) {
	         	 		this.restaurants3 = res.data.data
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

	},
	

	data() {
		return {
			i:0,
			 master_user: {
                    sel: null,//选中行   
                    columns: [
                        { field: "type", title: "远程类型", width: 120 },
                        { field: "addport", title: "连接地址", width: 150 },
                        { field: "user", title: "登录用户", width: 120 },
                        { field: "pwd", title: "登录密码", width: 220 },
                        { field: "info", title: "其他信息" }
                    ],
                    data: [],
                },

			searchEartag: '',//查询羊只
			onlySheep:{
				building:'',
				col:'',
				colInt:''
			},
			orderform:{
				farmId:null,
				factoryId:null,

				sumweight:0,
				allprice:0,
				// saleID:null,
				farm:null,
				factory:"请选择客户单位",
				sums:0,
				saleTime:null,
				manger:null,
				tele:null
				},
			dialogTableVisible: false,
			dialogFormVisible: false,
			formLabelWidth: '70px',	
			area: {
				province: [],
				city: [],
				country: [],
				town: []
			},
			value: {
				province: '',
				city: '',
				country: '',
				town: ''
			},
			onlyColList:[],
			allSheep:{
	          oldBuilding:'',
	          oldCol:'',
	          oldColInt:'',
	          newBuilding:'',
	          newCol:'',
	          newColInt:''
	        },
			user:{},
			restaurants:[],
			restaurants1:[],
			restaurants3:[],
       		state3:'',
       		state2:'',
       		state1:'',
       		salesheepid:0,
			checkBuilding:[],
			total:0,
			page:1,
			allSheepFlag:0,
			multipleSelection:[],
			tableData:[],
			tableWeight:[],
			checked: 1,
			id: 1,
			sheepid:0,
			dialogMoveVisible: false,
			dialogDeadVisible: false,
			dialogUpdateVisible:false,
			form: {
				reason:'',
				method:'',
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			upda:{
				earTag:'',
				immuTag:'',
				style:'',
				stage:'',
				weight:'',
				year:''
			},
			currentRow: {},
			updateData:{
				immu:null,
				earTag:null,
				style:null,
				period:null
			},
			showMoveSheepOnly:false,
			showMoveSheepAll:false,
			sheepMessage:{
				earTag:'',
				location:''
			},
			builList:[],
			stageList :new Array(
				'其它阶段',
				'引种期应激期',
				'体况调理期',
				'妊娠前三月',
				'妊娠第四月',
				'妊娠第五月',
				'产羔0-5日',
				'产羔6-10日',
				'产羔11-20日',
				'产羔21-30日',
				'产羔31-40日',
				'产羔41-50日',
				'产羔51-60日',
				'生长期',
				'育种阶段一',
				'育种阶段二',
				'育肥前期',
				'直线育肥期',
				'育种等待期'
			),
			hasWeight:false,

			propName:new Map([[0,"初始状态"],
							  [1,"引种应激期"],
                              [2,"体况调理期"],
                              [3,"妊娠前三月"],
                              [4,"妊娠第四月"],
                              [5,"妊娠第五月"],
                              [6,"产羔0-5日"],
                              [7,"产羔6-10日"],
                              [8,"产羔11-20日"],
                              [9,"产羔21-30日"],
                              [10,"产羔31-40日"],
                              [11,"产羔41-50日"],
                              [12,"产羔51-60日"],
                              [13,"生长阶段"],
                              [14,"育种一期"],
                              [15,"育种二期"],
                              [16,"育肥前期"],
                              [17,"直线育肥期"],
                              [18,"其它"]
                            ])
		}
	},

	methods: {
		//确认销售按钮
		sureSale(){
			this.dialogFormVisible = false;
			
		},
		// getSaleData(){
		// 			console.log(this.multipleSelection)
		// 			if(this.multipleSelection.length == 0){
		// 		this.$alert('请选择要交易的养只', '警告', {
		//           confirmButtonText: '确定',
		//         })
		// 	}else{
		// 		this.orderform.sums=this.multipleSelection.length
		// 		console.log(this.multipleSelection.sheep_weight)	
		// 			var myDate=new Date();
		// 			var myMonth=myDate.getMonth()+1;
		// 		  this.orderform.saleTime=myDate.getFullYear()+"-"+myMonth+"-"+myDate.getDate()+"-"+myDate.getHours()+"-"+myDate.getMinutes();
		// 			this.orderform.sumweight=0;
		// 			this.multipleSelection.forEach((item) => {
		// 			this.orderform.sumweight+=item.sheep_weight;
		// 			this.orderform.farm=this.user.factoryName;
		// 			this.orderform.factory=this.state1;
		// 			this.orderform.tele=this.user.userTelephone;
		// 			this.orderform.manger=this.user.userRealname;
		// 			})
		// 	}
		// 		},
		//保存按钮
    goSave(){
			let theSaleSheep=[];
		  let	userFactory = this.user.userFactory;
			this.multipleSelection.forEach((item)=>{
				theSaleSheep.push(item.tradeMarkEartag)
			});
			let saleTime = Date.parse(new Date())
			let param = {		
											 saleSheep:theSaleSheep,
                			 totalWeight: this.orderform.sumweight,
											 price: this.orderform.allprice,
											 sourceFactoryId:this.orderform.farmId,
											 destinationFactoryId:this.orderform.factoryId,
											 count:this.orderform.sums,
											 saleTime:saleTime,
											 manger:this.orderform.manger,
											 tele:this.orderform.tele
           				} 
			
			if (param.destinationFactoryId==0||param.allWeight==0||param.price==null||param.coun==0) {
								this.$message.warning('请完善订单信息！')
								return
					}else{
						// updateData(userFactory, param).then(res => {
            //         if (isReqSuccessful(res)) {
						// 					this.dialogFormVisible = false;
						// 					this.$message.success('保存成功')
						// 					let pathid = this.$route.params.id
     				// 					let path = `/admin/${pathid}/sheepSaleManage/sheepSaleOrder`
		 				// 					this.$router.push(path)
            //         }
            //     }, _ => {
            //         this.$message.error('保存失败')
            //     })
						
					 }
			console.log(param);
			this.dialogFormVisible = false;

		},				
		handleCell(row,column,event,cell){
    console.log(row)
    console.log(column)
    console.log(event)
		console.log(cell)
		console.log(row.tradeMarkEartag)
		console.log(column.label)
		console.log(this.tableData)

		if(column.label=="视频/图片"){
		 let pathid = this.$route.params.id
     let path = `/admin/${pathid}/visual/productionSee`+'?'+'ramSheepTrademark='+row.tradeMarkEartag
		 this.$router.push(path)
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
		fetchReason(qu ,cb){
			let diease =[
		        {value : '布病'},
		        {value : '小反刍'},
		        {value : '口蹄疫'},
		        {value : '三联四防'},
		        {value : '传胸'},
		        {value : '山羊痘'},
   		 	]
    		cb(diease)
		},
		async fetchData(){
			let {userFactory } = this.user
			let param = {
                			start: (this.page - 1)*10,
               				size: 10,
               				prefix: this.searchEartag
           				} 
						 this.tableData = []
						 this.tableWeight=[]
			getAllSaleSheep(userFactory , param).then(res => {
                if (isReqSuccessful(res)) {
               		 this.total = Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.all
               		 data.forEach((v) => {
               		   	 let {building , col , immuneEarTag , trademarkEarTag ,id , type, stage, canSale, weight} = v
               		   	 let d = building
               		   	 let l = col
               		   	 let tradeMarkEartag=trademarkEarTag
               		   	 let immuneEartag = immuneEarTag
               		   	 let style = type
               		   	 let Stage = this.propName.get(stage)
               		   	 let issale = '否'
               		   	 if(canSale){
               		   	 	issale = '是'
												 }
											 let sheep_weight=weight
               		   	 let obj = {tradeMarkEartag , immuneEartag,  d , l , id, style, Stage, issale, sheep_weight}
											this.tableData.push(obj)
											this.tableWeight.push(sheep_weight)	 
               		 })
                }
            })
		},
		changeFun(val){
			this.multipleSelection = val;
		},
		addPicture(row){
		let pathid = this.$route.params.id
     let path = `/admin/${pathid}/supervise/capture`+'?'+'ramSheepTrademark='+row.tradeMarkEartag+'&'+'lan='+row.l+'&'+'dong='+row.d
		 this.$router.push(path)
		},

		handleUpdate(row){		
			this.upda.earTag = row.tradeMarkEartag
			this.upda.immuTag = row.immuneEartag
			this.dialogUpdateVisible = true
			this.updateData.immu = row.immuneEartag
			this.updateData.earTag = row.tradeMarkEartag
			this.updateData.style = row.style
			this.updateData.period = row.Stage
			this.currentRow = row
			this.sheepid=row.id
		},

		updateSheep(){
			this.dialogUpdateVisible = false
			let factory = this.user.userFactory
			let sheepid = this.sheepid
			let tradeMarkEartag = this.upda.earTag
			let breedingSheepBase = this.upda.immuTag
			let type = this.upda.style
			let stage = 0
			let weight=this.upda.weight;
			console.log(weight);
			for(let i =0;i<this.stageList.length ; i++){
				if(this.upda.stage ==this.stageList[i])
					stage = i
			}
			let param = {
				factory,
				sheepid,
				tradeMarkEartag,
				breedingSheepBase,
				type,
				stage,
				weight
			}
			updateSheepAllMe(param).then(res=>{
				this.fetchData()
			})
		},


		querySearchStyle(queryString, cb){
			let style = [
			        '种公羊', 
			        '种母羊', 
			        '后备种母羊', 
			        '羔羊', 
			        '商品羊', 
			        '后备种公羊',
			        '可售羊只'
			    ]
    			cb(style)
		},
		handleSelectStyle(item){
			this.upda.style = item
		},
		querySearchStage(queryString, cb){
			let stage = this.stageList
			cb(stage)
		},
		handleSelectStage(item){
			this.upda.stage = item
		},

		current_change(currentPage){
						if(!this.allSheepFlag){
							this.page=currentPage;
            	let id = this.$route.params.id;
							this.fetchData()
						}else{
							this.page=currentPage;
							let id = this.$route.params.id;
							this.watchAllSheep();
						}
        },
        submitSheep(){
        	this.dialogDeadVisible = false
        	let param = {
				id: this.sheepid,
				reason: this.form.reason,
				method: this.form.method
			}
			makeDeadSheep(param).then(res=>{
				if (isReqSuccessful(res)) {
					this.fetchData()
				}
			})
        },
        
        saleable(){
        	let array = this.multipleSelection
        	let sheep = []
        	for(let i = 0;i<array.length;i++){
        		sheep.push(array[i].id)
        	}
        	let data = {sheep, value: 1}
        	changeSaleable(data).then(res=>{
        		if(isReqSuccessful(res)){
        			this.fetchData()
        		}
        	})
        },
        querySearch(queryString, cb) {
	        let restaurants = this.restaurants
	        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
	        cb(results)
      	},
     	createFilter(queryString) {
	        return (restaurant) => {
	          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
	        }
		},
		querySearch1(queryString, cb) {
	        let restaurants = this.restaurants3
	        let results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants
	        cb(results)
      	},
     	createFilter1(queryString) {
	        return (restaurant) => {
	          return (restaurant.value.toLowerCase().indexOf(queryString) === 0)
	        }
		},
		querySearch2(queryString, cb) {
	        let restaurants = this.restaurants1
	        let results = queryString ? restaurants.filter(this.createFilter2(queryString)) : restaurants
	        cb(results)
      	},
     	createFilter2(queryString) {
	        return (restaurant) => {
	          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
	        }
		},
		handleSelect(item){
			this.state3=item.toString()
			let {userFactory} = this.user
			getSheepCol(userFactory,item).then(res =>{
			if (isReqSuccessful(res)) {
               		this.restaurants1 = res.data.data
            	}
			})
		},
		handleSelect2(item){
			this.state2=item.toString()
		},
		handleSelect1(item){
			this.state1 = item.breedName.toString()
			this.salesheepid = item.id
		},
		moveSheepFun(){
			this.dialogMoveVisible  = false
			let {userFactory}= this.user
			let building = this.state3
			let colNum =Number(this.state2)
			let factory = userFactory
			let param = {
				factory,
				building,
				colNum
			}
			moveSheep(this.sheepid, param).then(res =>{
				if (isReqSuccessful(res)) {  
					this.fetchData()   
            	}
			})
		},
		submitUp(){
			this.showMoveSheepOnly = false
			let factory = this.user.userFactory
			let building = this.onlySheep.building
			let colNum = this.onlySheep.colInt
			let ids = []
			this.multipleSelection.forEach((item) => {
				ids.push(item.id)
			})
			let data ={
				ids,
				colNum,
				building,
				factory
			}
			moveSheepPart(data).then(res=>{
				this.fetchData() 
			})
		},

		querySearchBuilOnly(queryString, cb){
			cb(this.builList)
		},
		handleSelectBuilOnly(item){
	          this.onlySheep.building = item
	           getSheepCol(this.user.userFactory, item).then(res =>{
	               this.onlyColList = res.data.data
	        })
	    },
	    querySearchColOnly(queryString, cb){
	    	cb(this.onlyColList)
	    },
	    handleSelectColOnly(item){
	    	this.onlySheep.col = item.toString() 
	        this.onlySheep.colInt = item
	    },

		// moveSheepOnly(){
		// 	console.log(this.multipleSelection)
		// 	if(this.multipleSelection.length == 0){
		// 		this.$alert('请选择要移栏羊只', '警告', {
		//           confirmButtonText: '确定',
		//         })
		// 	}else{
		// 		this.showMoveSheepOnly = true
		// 		this.sheepMessage = {
		// 			earTag:'',
		// 			location:''
		// 		}
		// 			this.multipleSelection.forEach((item) => {
		// 			  this.sheepMessage.earTag += item.tradeMarkEartag + ";"
		// 			  this.sheepMessage.location = item.l + "栏/" + item.d + "栋" 
		// 			})
		// 		getSheepBuilding(this.user.userFactory).then(res=>{
		//             this.builList = res.data.data
		//         })
		// 	}
		// },

//显示总存栏

		async	watchAllSheep(){
				this.allSheepFlag=1;
				let id
				let userFactory = this.user.userFactory
			let param = {
                			start: (this.page - 1)*10,
               				size: 10,
               				prefix: this.searchEartag
           				} 
						 this.tableData = []
						 this.tableWeight=[]
						 findAllSheep(userFactory , param).then(res => {
                if (isReqSuccessful(res)) {
               		 this.total = Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.all
               		 data.forEach((v) => {
               		   	 let {building , col , immuneEarTag , trademarkEarTag ,id , type, stage, canSale, weight} = v
               		   	 let d = building
               		   	 let l = col
               		   	 let tradeMarkEartag=trademarkEarTag
               		   	 let immuneEartag = immuneEarTag
               		   	 let style = type
               		   	 let Stage = this.propName.get(stage)
               		   	 let issale = '否'
               		   	 if(canSale){
               		   	 	issale = '是'
												 }
											 let sheep_weight=weight
               		   	 let obj = {tradeMarkEartag , immuneEartag,  d , l , id, style, Stage, issale, sheep_weight}
											this.tableData.push(obj)
											this.tableWeight.push(sheep_weight)	 
               		 })
                }
						});
						},
			
//生成订单按钮
		getSaleData(){
					console.log(this.multipleSelection)
					if(this.multipleSelection.length == 0){
				this.orderform.sums=0;
				this.orderform.sumweight=null;
				this.orderform.allprice=null;
				this.$alert('请选择要交易的养只', '警告', {
		          confirmButtonText: '确定',
		        })
			}else{
				this.orderform.sums=this.multipleSelection.length
					var myDate=new Date();
					var myMonth=myDate.getMonth()+1;
				  this.orderform.saleTime=myDate.getFullYear()+"-"+myMonth+"-"+myDate.getDate()+"-"+myDate.getHours()+"-"+myDate.getMinutes();
					this.orderform.sumweight=null;
					this.orderform.allprice=null;
					this.multipleSelection.forEach((item) => {
					this.orderform.sumweight+=item.sheep_weight;
					this.orderform.farm=this.user.factoryName;

					this.orderform.farmId=this.user.userFactory;
					this.orderform.factory=this.state1;
					this.orderform.factoryId=this.salesheepid;

					this.orderform.tele=this.user.userTelephone;
					this.orderform.manger=this.user.userRealname;
					})
			}
				},


		alrtmoveSheepAll(){
        	this.showMoveSheepAll = true
        	getSheepBuilding(this.user.userFactory).then(res=>{
	            this.builList = res.data.data
	        })
        },
        querySearchBuilAll(queryString, cb){
          cb(this.builList)
      	},
	      handleSelectBuilAll(item){
	          this.allSheep.oldBuilding = item
	           getSheepCol(this.user.userFactory, item).then(res =>{
	               this.colListOld = res.data.data
	        })
	      },
	      querySearchColAll(queryString, cb){
	          cb(this.colListOld)
	      },
	      handleSelectColAll(item){
	          this.allSheep.oldCol = item.toString() 
	          this.allSheep.oldColInt = item
	      },
	      //新栏栋
	      querySearchBuilAll(queryString, cb){
          cb(this.builList)
	      },
	      handleSelectBuilAllNew(item){
	          this.allSheep.newBuilding = item
	           getSheepCol(this.user.userFactory, item).then(res =>{
	               this.colListNew = res.data.data
	        })
	      },
	      querySearchColAllNew(queryString, cb){
	          cb(this.colListNew)
	      },
	      handleSelectColAllNew(item){
	          this.allSheep.newCol = item.toString() 
	          this.allSheep.newColInt = item
	      },
	      moveSheepAllFun(){
	      	this.showMoveSheepAll = false
	        let factory = this.user.userFactory
	        let oldBuilding = this.allSheep.oldBuilding
	        let oldCol = this.allSheep.oldColInt
	        let nowBuilding = this.allSheep.newBuilding
	        let nowCol = this.allSheep.newColInt
	        let param ={
	          factory,
	          oldBuilding,
	          oldCol,
	          nowCol,
	          nowBuilding
	        }
	        moveSheepAll(param).then(res=>{
	          	this.fetchData()
	        })
      	}
	}
}
</script>

<style lang="stylus">
.livestock-list
	.header
	    display flex
		justify-content space-evenly
		width 100%
		margin 10px 0px 30px 0px
		.el-input
			margin-left 50px
			width 250px
	.el-table
		display table-caption
		margin-left 51px
	.el-dialog
		width 400px		
	.move 
		.el-input
			width 100px
	.dead
		.el-input
			width 277px		
			padding: 5px 0 5px 0
	.area_management
				display flex
				width 100%
				margin 10px 0px 10px 30px
				font-size 15px
				.area_name				
					margin-top 10px
					margin-left 20px;
				.el-select
					width 16%	
					margin-left 5px
				span
					vertical-align middle
				.area_select
					display inline-block
					
</style>



