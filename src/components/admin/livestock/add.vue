<template>
	<div class="livestock-add">
		<div class="selectCrowd">
			<el-upload
			  class="upload-demo"
			  action=" "
			  multiple
			  :before-upload="uploadF"
			  >
			  <el-button size="small" type="primary">点击上传耳牌号文件</el-button>
			</el-upload>
			<p>给羊只分配栏/栋</p>
			<el-row>
			<span>栋号：</span>
			   <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="selectD"
				  :fetch-suggestions="querySearch"
				  @select="handleSelect">
				  <i
				    class="el-icon-edit el-input__icon"
				    slot="suffix"
				   >
				  </i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item }}</div>
				  </template>
				</el-autocomplete>
			</el-row>
			<el-row>
				<span>栏号：</span>
				 <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="selectL"
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
			</el-row>
			<div class="single">
			<span>单个分配:</span>
				<el-input size="small" type="text" class="input" v-model="trademarkEarTag" placeholder ="以大写G、M、S开头" @blur="checkValue()">
					<template slot="prepend">商标耳牌号:</template>
				</el-input>
				<el-input size="small" type="text" class="input" v-model="immuneEartag" >
					<template slot="prepend">免疫耳牌号:</template>
				</el-input>		
				<el-popover placement="bottom" trigger="click" popper-class="single-select">
					<el-checkbox-group v-model="checkStyle" :max="1">
						<el-checkbox v-for="(t, index) in crowdStyle" :label="t" :key="index">{{t}}</el-checkbox>
					</el-checkbox-group>
					<el-input size="small" slot="reference"  v-model="selectStyle" placeholder="请选择" ><template slot="prepend">羊只类型:</template>
					</el-input>
				</el-popover>	

				<el-popover placement="bottom" trigger="click" popper-class="single-select" >
					<el-checkbox-group v-model="checkStage" :max="1">
						<el-checkbox v-for="(t, index) in crowdStage" :label="t" :key="index">{{t}}</el-checkbox>
					</el-checkbox-group>
					<el-input size="small" slot="reference"  v-model="selectStage" placeholder="请选择" ><template slot="prepend">生产阶段:</template>
					</el-input>
				</el-popover>	 
				</div>
				<el-button type="small" @click = "submitOne" style="margin-left: 10px">添加</el-button>


			<div class="multiple">
				<span>批量分配:</span>
				<el-popover placement="bottom" width="350" trigger="click" popper-class="multiple-select">
					<el-checkbox-group v-model="checkList">
						<el-checkbox v-for="(t, index) in crowdTag" :label="t" :key="index">{{t}}</el-checkbox>
					</el-checkbox-group>
					<el-input size="small" slot="reference" style="width: 152px" v-model="selectTag" placeholder="请选择" ><template slot="prepend" style="width: 200px">商标耳牌号:</template></el-input>
				</el-popover>
				<el-button type="small" @click = "submitTOG" style="margin-top: 10px;margin-left: 10px">添加</el-button>
			</div>
		</div>
		<el-table :data="tableData" :span-method="objectSpanMethod" :border="true" v-if="reload">
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
				label="本栏羊数"
				width="120"
				prop="lnum"
			>
			</el-table-column>
			<el-table-column
				label="羊只品类"
				width="120"
				prop="sheepStyle"
			></el-table-column>
			<el-table-column
				label="本栋羊数"
				width="120"
			>
				<template slot-scope="scope">
					<p style="text-align: center;">{{dnum.get(scope.row.d)}}</p>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>

// import { getEarTag } from '@/util/getdata'
import { getUserById , getSheepBCT , getSheepBuilding ,getSheepCol ,getYangNum ,getSheepTog ,submitSheepTog } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
export default {
	data() {
		return {
			checkStyle:[],
			crowdStyle:["种公羊","种母羊","后备种母羊","羔羊","商品羊","后备种公羊"],
			checkStage:[],
			crowdStage:['其它阶段',
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
				'育种等待期'],
			reload:true,
			checkList:[],
			state1:"",
			restaurantsBuilding:[],
			restaurantsCol:[],
			userFactory:0,
			trademarkEarTag:'',
			immuneEartag: '',
			sheepStyle:'',
			tradeAList: [], // 所有已选择
			crowdTag:[],
			merge: {  // 合并单元格需要的数据
				len: new Map(),
				flag: 0,
			},
			column: 0,
			columnNum: 0,
			allNum: 100,
			selectD: null,
			selectL: null, //单个分配
			tableData:[],
			sheeps:[],
			tableCol:new Map(),
			dnum: new Map(),
		}
	},

	methods: {
		checkValue(){
			let flag = 0
			if(this.trademarkEarTag !==""){
				let start = this.trademarkEarTag.substring(0,1)
				if(start!=="S" && start!=="M" && start!=="G"){
					 this.$alert('此字段需要以大写S,M或者G开头', '错误', {
		          confirmButtonText: '确定',
		        });
				flag = 1
				}
				else if(start == "S" && this.trademarkEarTag.length != 9){
				flag = 1
				this.$alert('此字段需要以大写S开头并且加上7位数字', '错误', {
		          confirmButtonText: '确定',
		        });
				}
				else if(start == "G" && this.trademarkEarTag.length != 7){
				flag = 1
				this.$alert('此字段需要以大写G开头并且加上6位数字', '错误', {
		          confirmButtonText: '确定',
		        });
				}
				else if(start == "M" && this.trademarkEarTag.length != 7){
				flag = 1
				this.$alert('此字段需要以大写M开头并且加上6位数字', '错误', {
		          confirmButtonText: '确定',
		        });
				}
				if(flag==1){
					this.trademarkEarTag = ''
				}
			}
		},
		submitTOG(){
			let data = this.checkList
			this.sheeps = []
			data.forEach((item) => {
			  	let str = item.substring(item.indexOf('(') + 1 , item.indexOf(')'))
			  	let id = parseInt(str)
			  	this.sheeps.push(id)
			})
			let factory = this.userFactory
			let building = this.selectD
			let col = parseInt(this.selectL)
			let sheeps = this.sheeps
			let obj ={factory ,  building , col , sheeps}	
			submitSheepTog(obj).then(res=>{
				this.checkList = []
				this.crowdTag = []
				getSheepTog(this.userFactory).then(res =>{
                	if(isReqSuccessful(res)){
                		let data = res.data.data
                		data.forEach((item) => {
                		  let str = item.trademarkEarTag + " " +item.type + "(" + item.id + ")"
                		  this.crowdTag.push(str)
                		})
                	}
                })
			}).then(this.fetchData)
		},

		async fetchData(){
			let {userFactory } = this.user
			this.factory= userFactory
			this.tableData = []
			getYangNum (userFactory).then(res => {
                if (isReqSuccessful(res)) {
                	let data = res.data.buildingBase
                	data.forEach((item) => {
                	  let d = item.building
                	  let l = item.col
                	  let id = item.id
                	  let sheepStyle = item.type
                	  if(sheepStyle == null){
                	  	sheepStyle = "此栏无羊"
                	  }
                	  let lnum = 0
                	  let obj = {d,l,lnum,sheepStyle,id}
                	  this.tableData.push(obj)
                	})
                	let ldata = res.data.columnBase
                	ldata.forEach((item) => {
                	  let d = item.building
                	  let l = item.col
                	  let lnum = item.number
                	  for(let i=0;i<this.tableData.length;i++){
	                	  	if(this.tableData[i].d==d && this.tableData[i].l == l){
	                	  	this.tableData[i].lnum = lnum
                	  	}
                	  }
                	})
                	let count = new Map()
					let sum = new Map()		
					this.tableData.forEach(ele => {
					if (ele.d) {
					if(sum.get(ele.d) === undefined) {
						sum.set(ele.d , 0)
						count.set(ele.d , 0)
					}
					sum.set(ele.d , parseInt(ele.lnum) + sum.get(ele.d))
					count.set(ele.d , count.get(ele.d) + 1)
					} 
					});
					this.dnum = sum 
					for(var value of sum.values()){
						this.allNum += value 
					}       
					this.merge.len = count
					let choose = new Map()
					let index = 0
					choose.set(index,4)
					for(var value of count.values()){
						index += value
						choose.set(index , 4)
					}
					this.tableCol = choose
                }
            })			
		},
		submitOne(){
			let trademarkEarTag = this.trademarkEarTag
			let immuneEarTag = this.immuneEartag
			let type = this.checkStyle[0]
			let stage = 0
			for(let i =0;i<this.crowdStage.length ; i++){
				if(this.checkStage[0] ==this.crowdStage[i])
					stage = i
			}
			let factory = this.userFactory
			let building =this.selectD
			let col =parseInt(this.selectL)
			let obj = {trademarkEarTag , immuneEarTag ,type , factory, building , col ,stage}
			getSheepBCT(obj).then(res=>{
				this.trademarkEarTag = ""
				this.immuneEartag = ""
				this.checkStyle = []
				if(res.meta.code == 1){
					this.$message.error('耳牌号重复')
					
				}
			}).then(this.fetchData)
		},


		uploadF(file){
			let form =new FormData()
			form.append('file',file)
			let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/s/sps/' +this.userFactory, {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                    let body = await res.json()
                    if (isReqSuccessful(body)) {
                        this.$message.success('提交成功')
                        this.checkList = []
						this.crowdTag = []
						getSheepTog(this.userFactory).then(res =>{
			                if(isReqSuccessful(res)){
			                	let data = res.data.data
			                	data.forEach((item) => {
			                		 let str = item.trademarkEarTag + " " +item.type + "(" + item.id+")"
			                		 this.crowdTag.push(str)
			                	})
			                }
			            })
                    }
                }, _ => {
                this.$message.error('提交失败')
            })
            
		},

		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
					let d = row.d
					let flag = 0 
					let len = this.merge.len.get(d)
					if (columnIndex === 4) {
						if (this.tableCol.get(rowIndex) === 4 ) {
							return {
								rowspan: len,
								colspan: 1
							};
						}		
						else {
							return {
								rowspan: 0,
								colspan: 0
							};
						}
					}
				},

		initPopover() {
			let p = this.$refs.tradeSelect.$refs.popper
			setTimeout(()=> {
				p.style.top = '450px'
				p.style.left = '598px'
			}, 0);
		},
		querySearch(queryString, cb) {
	        let restaurants = this.restaurantsBuilding
	        cb(restaurants)
      	},
		handleSelect(item){
			this.selectD = item.toString()
			getSheepCol(this.userFactory,item).then(res =>{
			if (isReqSuccessful(res)) {
               this.restaurantsCol = res.data.data
            }
			})
		},
		querySearch2(queryString, cb) {
	        let restaurants = this.restaurantsCol
	        cb(restaurants)
      	},
		handleSelect2(item){
			this.selectL=item.toString()
		},
		fetchSuggestions(queryString, cb){
				let style = [
			       '种公羊',
			       '种母羊', 
			       '后备种母羊', 
			       '羔羊',
			       '商品羊', 
			       '后备种公羊'
			    ]
    			cb(style)
			}
	},

	// 

	computed: {
		selectTag() {
			let res = ''
			this.checkList.forEach( ele => {
				res += ele + ';'
			})
			return res 
		},
		selectStyle(){
			return this.checkStyle[0]
		},
		selectStage(){
			return this.checkStage[0]
		},
		tradeMarkEartag() {
			let res = ''
			this.tradeNList.forEach( ele => {
				res += ele + ';'
			})
			return res 
		},
	},

	mounted() {
		let id = this.$route.params.id
         getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                let {userFactory} = this.user
                this.userFactory= userFactory  
                getSheepBuilding(this.userFactory).then(res=>{
				if (isReqSuccessful(res)) {
             		this.restaurantsBuilding=res.data.data
            		}
				})
                getSheepTog(this.userFactory).then(res =>{
                	if(isReqSuccessful(res)){
                		let data = res.data.data
                		data.forEach((item) => {
                		  let str =item.trademarkEarTag + " " +item.type +"(" + item.id +")"
                		  this.crowdTag.push(str)
                		})
                	}
                })
            }
        }).then(this.fetchData)    		          
	},
}
</script>
<style lang="stylus">

.livestock-add
	padding-top 30px
	.el-table
		width 481px
		display inline-block
	.selectCrowd
		width: calc(100% - 608px);
		display: inline-block;
		padding: 0px 20px;	
		vertical-align: top;
		.select-group
			.el-input
				width 130px !important
			.el-input-group__prepend
				width 50px	
		.el-autocomplete
			padding-top 30px
		.single
			margin-top 30px
			display: flex
			flex-direction: column
			flex-wrap: wrap
			align-items: flex-start
			.el-input
				width 300px !important
				margin-left 8px
				padding 10px 0 
			.el-button
				width 100px
		.multiple 
			margin-top 30px
			.el-input
				width 400px !important
				margin-left 8px
			.el-input-group__prepend
				width 100px	
.multiple-select
	margin-top: 30px
	.el-checkbox-group
		display flex
		flex-wrap wrap
		justify-content space-around
	.el-checkbox
		margin-left 0px !important
		width 50% !important
.trade-select
	display flex
	top 347px
	left 597px
	.el-checkbox-group
		display flex
		flex-wrap wrap
		flex-direction column
		margin 0 20px
	.el-checkbox
		margin 2px auto !important
		text-align: center;
	.el-tag
		margin-bottom: 5px;	
.single-select
	.el-checkbox-group
		width 50px
		.el-checkbox
			margin-left:0px
	.el-checkbox
		width 40px

</style>
