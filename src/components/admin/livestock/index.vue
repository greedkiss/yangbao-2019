
 <template>
    <div class="livestock-index">
		<p>新建栏栋</p>
		<div class="input-group">
			<el-input size="small" type="text" class="input" v-model="column">
				<template slot="prepend">栋号:</template>
			</el-input>
			<el-input size="small" type="text" class="input" v-model="columnNum">
				<template slot="prepend">栏数:</template>
			</el-input>
			<el-button type="small" @click="addColumn()">新建</el-button>
			<el-button type="small" @click="addNumCol()">增加栏数</el-button>
			<el-button type="small" @click="dialogUpdateVisible  = true">修改栋名</el-button>
			<p style="margin-left: 450px">
				(编辑时栋号不变，栏数只能增加不能减少)
			</p>
		</div>
		<p class="info-p">本厂羊只总数：{{allNum}}</p>
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
				label="sheepid"
				width="120"
				prop="id"
				v-if="false"
			></el-table-column>
			<el-table-column
				label="操作"
				width="120"
			>
			<template slot-scope="scope">
					<span
						size="small"
						style="cursor:pointer"
						@click="handleDelete(scope.$index,scope.row)">删除该栏
					</span>
			</template>
			</el-table-column>
			<el-table-column
				label="本栋羊数"
				width="120"
			>
				<template slot-scope="scope">
					<p style="text-align: center;">{{dnum.get(scope.row.d)}}</p>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :visible.sync="dialogUpdateVisible" style="text-align: center; width: 80%; margin: auto">
			<el-form>
				<div style="margin-bottom: 10px">
				<span>原栋名</span>
				<el-input v-model="oldMe.building" size="small"></el-input><br/>
				</div>
				<div style="margin-bottom: 10px">
				<span>新栋名</span>
				<el-input v-model="newMe.building" size="small"></el-input><br/>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center">
				<el-button @click="dialogUpdateVisible  = false" size="small">取 消</el-button>
				<el-button type="primary" @click="submitMessage" size="small">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>

import { getUserById , getGeneaRec, postGeneaRec, updateGeneaRec, getYangNum, createBC ,createBCL, deleteCol, modifyBuilding} from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit';
// let app = new Vue()

export default {
    components: {

    },
    mounted() {
    	let id = this.$route.params.id
         getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model;
            }
         }).then(this.fetchData)   
	},

	
	
    data () {
        return {
        	user: null,
        	tableCol:new Map(),
        	dialogUpdateVisible:false,
            getGeneaRec,
            postGeneaRec,
			updateGeneaRec,
			allNum:0,
			factory:null,
			reload:true,
			dnum: new Map(),
			merge: {  // 合并单元格需要的数据
				len: new Map(),
				flag: 0,
			},
			oldMe:{
				building: null,
				column: null
			},
			newMe: {
				building: null,
				column: null
			},
			column: null,
			columnNum: null,
            items: [
                {label: '性别', model: 'sex', type: 'radio'},
                {label: '商标耳牌', model: 'tradeMarkEartag', trade: true, block: 1},
                {label: '羊场地理位置', model: 'breedLocation', type: 'address'},
                {label: '出生基地', model: 'breedingSheepBase'},
                {label: '出生时间', model: 'birthTime', type: 'time', mr: 1},
                {label: '初生体重(kg)', model: 'birthWeight'},
                {label: '颜色', model: 'color'},
                {label: '品种名', model: 'typeName', mr: 1},
                {label: '父号', model: 'eartagOfFather'},
                {label: '父父号', model: 'eartagOfFathersFather'},
                {label: '母父号', model: 'eartagOfMothersFather', mr: 1},
                {label: '母号', model: 'eartagOfMother'},
                {label: '父母号', model: 'eartagOfFathersMother'},
                {label: '母母号', model: 'eartagOfMothersMother', mr: 1},
            ],
			tableData: [],
            models: {
                tradeMarkEartag: null,
				breedingSheepBase: null,
            }
		}	
	},
	methods: {
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
					choose.set(index,5)
					for(var value of count.values()){
						index += value
						choose.set(index , 5)
					}
					this.tableCol = choose
                }
            })			
		},
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			let d = row.d
			let flag = 0 
			let len = this.merge.len.get(d)
			if (columnIndex === 5 || columnIndex == 0) {
				if (this.tableCol.get(rowIndex) === 5 ) {
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

		addColumn() {
			let c = this.column
			let n = this.columnNum
			let flag = -1
			let errord = 1
			this.tableData.forEach((ele,index) => {
				if(ele.d==c){
					errord = 0
				}
				flag = index + 1
			})
			if(errord){
			let fac = parseInt(this.factory)
			let newc = c
			let newn =  parseInt(n)
			let data = {"factory":fac, "building":newc, "col":newn}
			createBC(data).then(res => {
                    if (isReqSuccessful(res)) {
                       this.fetchData()
                    }
                })			
			}
			else{
				  this.$alert('栋号已存在', '错误', {
		          confirmButtonText: '确定',
		        });
			}
		},
		submitMessage(){
			let data = {
				factory: this.user.userFactory,
				col: 1,
				old: this.oldMe.building,
				building: this.newMe.building
			}
			modifyBuilding(data).then(res => {
				if(isReqSuccessful(res)){
					this.$message.success("修改成功")
					this.fetchData()
					this.dialogUpdateVisible  = false
				}
			})
		},
		addNumCol(){
			let c = this.column
			let n = this.columnNum
			let flag = -1
			let errord = 0
			let dis = 0
			this.tableData.forEach((ele,index) => {
					if(ele.d == c ){								
						flag = index + 1 
						dis =  ele.l
					}
				})
				if(n > dis ){
					errord = 1
				}
				if(errord){
					let fac = parseInt(this.factory)
					let newl =  parseInt(n)
					let data = {factory:fac, building:c, col:newl}
					createBCL(data).then(res => {
		                    if (isReqSuccessful(res)) {
		                       this.fetchData()
		                    }
		                })	
				}
				else{
					 this.$alert('栋号不存在或栏数小于之前栏数', '错误', {
		          					confirmButtonText: '确定',
		        	});
				}
			},
			handleDelete(index,row){
				if(row.lnum != 0){
					this.$alert('本栏有羊不能删除', '错误', {
		          				confirmButtonText: '确定',
		        });
				}else{
					deleteCol(row.id).then(this.fetchData)
				}
			},
	}
}
</script>

<style lang="stylus">
.livestock-index
	.input-group
		margin 10px 0 30px 10px
	.el-input
		width 270px	!important 
		vertical-align middle
		margin-left: 35px
	.el-button
		margin-left: 10px
	.el-table	
		margin-left 50px
</style>
