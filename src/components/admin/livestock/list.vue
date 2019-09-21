<template>
	<div class="livestock-list">
		<div class="header">
			<el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="state1"
				  :fetch-suggestions="querySearch1"
				  placeholder="出售给厂名称"
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
			<el-button type="primary" @click.native.prevent="saleSheep" style="margin-left: 20px">确定销售</el-button>
			<el-button type="primary" @click.native.prevent="moveSheepOnly">部分移栏</el-button>
			<el-button type="primary" @click.native.prevent="alrtmoveSheepAll">整栏移栏</el-button>
			<el-button type="primary" @click.native.prevent="saleable">可出售</el-button>
			<el-input
			    placeholder="请输入耳牌号查询"
			    v-model="searchEartag"
			    style="width: 180px">
			<i slot="suffix" class="el-input__icon el-icon-search"></i>
			</el-input>
		</div>
		<p style="margin-left: 46px">
				(单击左侧的勾选框选择要出售羊只、移栏羊只、可出售羊只)
		</p>
		<el-table :data="tableData" :border="true" @selection-change="changeFun">
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
			<!-- <el-table-column
				label="体重"
				width="120"
				prop="Weight"
			>
			</el-table-column>
			<el-table-column
				label="年龄"
				width="120"
				prop="Age"
			>
			</el-table-column> -->
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
						@click="handleMove(scope.row)">移动
					</span>
					<span
						style="cursor:pointer"
						@click.native.prevent="deleteRow(scope.$index, tableData)"
						size="small"
						type="danger"
						@click="handleDead(scope.row)">死亡
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
import { isReqSuccessful } from '@/util/jskit'
import { getUserById , getAllSheep , makeDeadSheep, getSheepBuilding ,getSheepCol ,moveSheep ,getFarmCus ,makeSaleFac ,updateSheepTog ,moveSheepAll ,moveSheepPart ,querySheepStage ,updateSheepAllMe, changeSaleable} from '@/util/getdata'
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
                let {userFactory} = this.user
            }
         }).then(this.fetchData).then(getFarmCus().then(res=>{
					 if (isReqSuccessful(res)) {
					 			this.restaurants3 = res.data.saleable
            	}
						 })
				 )
	},

	data() {
		return {
			searchEartag: '',//查询羊只
			onlySheep:{
				building:'',
				col:'',
				colInt:''
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
			multipleSelection:[],
			tableData:[],
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
				period:null,
				age:null,
				weight:null
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
			getAllSheep(userFactory , param).then(res => {
                if (isReqSuccessful(res)) {
               		 this.total = Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.all
               		 data.forEach((v) => {
               		   	 let {building , col , immuneEarTag , trademarkEarTag ,id , type, stage, isSale , age , weight} = v
               		   	 let d = building
               		   	 let l = col
               		   	 let tradeMarkEartag=trademarkEarTag
               		   	 let immuneEartag = immuneEarTag
               		   	 let style = type
               		   	 let Stage = this.propName.get(stage)
											 let issale = '否'
											 let Age = age
											 let Weight = weight	 
               		   	 if(isSale){
               		   	 	issale = '是'
               		   	 }
               		   	 let obj = {tradeMarkEartag , immuneEartag,  d , l , id, style, Stage, issale, Age, Weight}
               		   	 this.tableData.push(obj)
               		 })
                }
            })
		},
		changeFun(val){
			this.multipleSelection = val;
		},
		handleMove( row ) {
			this.currentRow = row
			this.sheepid=row.id
			this.dialogMoveVisible = true
			let {userFactory } = this.user
			getSheepBuilding(userFactory).then(res=>{
				if (isReqSuccessful(res)) {
             		this.restaurants=res.data.data
            	}
			})
		},
		handleDead( row ) {
			this.currentRow = row
			this.dialogDeadVisible = true	
			this.sheepid=row.id	
		},

		handleUpdate(row){		
			this.upda.earTag = row.tradeMarkEartag
			this.upda.immuTag = row.immuneEartag
			this.dialogUpdateVisible = true
			//updateData用来头部数据显示
			this.updateData.immu = row.immuneEartag
			this.updateData.earTag = row.tradeMarkEartag
			this.updateData.style = row.style
			this.updateData.period = row.Stage
			//
			this.currentRow = row
			this.sheepid = row.id	
			this.upda.year = row.Age
			this.upda.weight = row.Weight
		},

		updateSheep(){
			this.dialogUpdateVisible = false
			let factory = this.user.userFactory
			let sheepid = this.sheepid
			let tradeMarkEartag = this.upda.earTag
			let breedingSheepBase = this.upda.immuTag
			let type = this.upda.style
			let stage = 0
			for(let i =0;i<this.stageList.length ; i++){
				if(this.upda.stage ==this.stageList[i])
					stage = i
			}
			let age = this.upda.year
			let weight = this.upda.weight
			let param = {
				factory,
				sheepid,
				tradeMarkEartag,
				breedingSheepBase,
				type,
				stage,
				weight,
				age
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
            this.page=currentPage;
            let id = this.$route.params.id
			this.fetchData()
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
        saleSheep(){
        	let array = this.multipleSelection
        	let {userFactory , factoryName } = this.user
        	let sheep=[]
        	for(let i=0;i<array.length;i++){
        		let ob ={trademarkEarTag:array[i].tradeMarkEartag ,immuneEarTag:array[i].immuneEartag ,id:array[i].id}
        		sheep.push(ob)
        	}
        	let startFactory = userFactory
        	let startName = factoryName
        	let endFactory = this.salesheepid
        	let endName = this.state1
        	let obj = {startFactory ,startName ,endFactory ,endName ,sheep}
			makeSaleFac(obj).then(res =>{
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

		moveSheepOnly(){
			console.log(this.multipleSelection)
			if(this.multipleSelection.length == 0){
				this.$alert('请选择要移栏羊只', '警告', {
		          confirmButtonText: '确定',
		        })
			}else{
				this.showMoveSheepOnly = true
				this.sheepMessage = {
					earTag:'',
					location:''
				}
					this.multipleSelection.forEach((item) => {
					  this.sheepMessage.earTag += item.tradeMarkEartag + ";"
					  this.sheepMessage.location = item.l + "栏/" + item.d + "栋" 
					})
				getSheepBuilding(this.user.userFactory).then(res=>{
		            this.builList = res.data.data
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
</style>


