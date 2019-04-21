<template>
<div>
<el-card>
	 <el-table
   @row-click="alertDetail"
    :data="tableData1"
    border
    :summary-method="getSummaries"
    show-summary
    :sum-text="sumtext"
    style="width: 100%;
    margin-top: 20px">
    <el-table-column
    	prop="buildingNu"
    	label ="栋号"
    	width="256"
    >
   	</el-table-column>
   	<el-table-column
    	prop="columnNu"
    	label ="栏号"
    	width="256"
    >
   	</el-table-column> 
   	<el-table-column
    	prop="earTagNu"
    	label ="耳牌号"
    	width="256"
    >
   	</el-table-column>   
   	<el-table-column
    	prop="totalNu"
    	label ="数量"
    	width="256"
    >
   	</el-table-column>
  </el-table>
</el-card>

<el-card style="width: 100%;
    margin-top: 20px">
	<el-table
	border
        ref="table"
        tooltip-effect="dark"
        class="admin-table"
        :data="tableData2"
        style="width: 100%;
    	margin-top: 20px"
    >
    <el-table-column
    	prop="display"
    	label ="项目名称"
    	width="205"
    >
   	</el-table-column>
   	<el-table-column
    	prop="comSituation"
    	label ="完成情况"
    	width="205"
    >
   	</el-table-column> 	
   	<el-table-column
    	prop="deadline"
    	label ="疫苗免疫到期时间"
    	width="205"
    >
   	</el-table-column>
   	<el-table-column
    	prop="operation"
    	label ="操作"
    	width="205"
    >
    <template slot-scope="scope" class="corsur:pointer">
          <div>
             <span style="cursor:pointer" @click="cellClick(scope.row)">点击进入</span>
          </div>
     </template>
   	</el-table-column> 	
   	<el-table-column
    	prop="file"
    	label ="备注"
    	width="205"
    >
   	</el-table-column> 	
	</el-table>
	 <!-- <el-button type="primary" @click="addPro" style="margin-top: 20px">添加项目</el-button> -->
</el-card>
<el-button size="small" @click="returnTotal()" type="primary">返回生产环节一览表</el-button>

<el-dialog :visible.sync="dialogFormVisible" title="该栏羊只信息和相关操作" width="40%">
  <template>
  <el-tabs type="border-card">
    <el-tab-pane label="本栏羊只"><p style="word-wrap:break-word;">{{this.showeartag}}</p></el-tab-pane>
    <!-- <el-tab-pane label="本栏羊只"><div>M100069,M100060,M100028,M100055,M100032,M100034,M100059,M1000sadsadadas</div></el-tab-pane> -->
    <el-tab-pane label="单只移栏">
      <div style="margin-left: 20%">
        <el-form :model="form">
        <span>商标耳牌号: </span>
         <el-autocomplete
          popper-class="my-autocomplete"
          v-model="onlySheep.eartag"
          :fetch-suggestions="querySearchEartagOnly"
          @select="handleSelectEartagOnly">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item }}</div>
          </template>
        </el-autocomplete><br/><br/>
        <span>从栋号:&nbsp&nbsp {{this.currentRow.d}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
        <span>栏号: &nbsp&nbsp{{this.currentRow.l}}</span>
        <br/><br/>
        <span>移至</span>
        <span>(先填写栋号再填写栏号)</span><br/><br/>
        <span>栋号：</span>
         <el-autocomplete
          popper-class="my-autocomplete"
          v-model="onlySheep.state"
          :fetch-suggestions="querySearchBuilOnly"
          @select="handleSelectBuilOnly">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item }}</div>
          </template>
        </el-autocomplete>
        <br/><br/>

        <span>栏号：</span>
         <el-autocomplete
          popper-class="my-autocomplete"
          v-model="onlySheep.stateCol"
          :fetch-suggestions="querySearchColOnly"
          @select="handleSelectColOnly">
          <i class="el-icon-edit el-input__icon" slot="suffix">
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item }}</div>
          </template>
        </el-autocomplete>
      </el-form>
      <div style="margin-left: 70px">
        <el-button @click="dialogFormVisible  = false" size="small">取 消</el-button>
        <el-button type="primary" @click="moveSheepFun" size="small">移 动</el-button>
      </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="全栏移栏">
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
      <div style="margin-left: 70px">
        <el-button @click="dialogFormVisible  = false" size="small">取 消</el-button>
        <el-button type="primary" @click="moveSheepAllFun" size="small">移 动</el-button>
      </div>
    </div>
    </el-tab-pane>

    <el-tab-pane label="羊只信息编辑">
       <div style="margin-left: 15%">
        <el-form :model="form">
        <span>原商标耳牌号: </span>
         <el-autocomplete
          popper-class="my-autocomplete"
          v-model="editSheep.eartag"
          :fetch-suggestions="querySearchEartagOnly"
          @select="handleEditEartag">
          <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item }}</div>
          </template>
        </el-autocomplete><br/><br/>
        <span>原免疫耳牌号: {{editSheep.immu}}</span><br/><br/>
        <span>原羊只品类: 种母羊</span><br/><br/>
        <span>原生产阶段: {{editSheep.period}}</span><br/><br/>
        <span>商标耳牌号:</span>
        <el-input v-model="upda.earTag" size="small" style="width:53%"></el-input><br/><br/>
        <span>免疫耳牌号:</span>
        <el-input v-model="upda.immuTag"  size="small" style="width:53%"></el-input><br/><br/>
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
        </el-autocomplete><br/><br/>
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
      </el-form>
      <div style="margin-left: 70px">
        <el-button @click="dialogFormVisible  = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateSheep" size="small">确 定</el-button>
      </div>
    </div>
    </el-tab-pane>
  </el-tabs>
</template>
</el-dialog>

</div>
</template>

<script>
  import { getIntelTable , getUserById ,getStageDetail ,getStageTable ,getSheepBuilding ,getSheepCol ,moveSheep ,moveSheepAll ,updateSheepAllMe} from '@/util/getdata'
	export default{
    props:{
      sumtext:{
        type: String
      },
      index:{
        type : Number
      },
      period:{
        type: String
      }
    },
    mounted(){
       let id = this.$route.params.id
       getUserById(id).then(res => {
          this.user = res.data.model
       }).then(this.fetchData)
    },
		data(){
      return{
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
        upda:{
          sheepId:null,
          earTag:null,
          immuTag:null,
          style:null,
          stage:null
        },
        editSheep:{
          eartag:null,
          immu:null,
          period:null
        },
        onlySheep:{
          stateCol:'',
          state:'',
          stateColInt:'',
          eartag:'',
          eartagid:''
        },
        builList:[],
        colList:[],
        colListOld:[],
        colListNew:[],
        user: null, 
        tableData1: null,
        earTagList:new Map(),
        dialogFormVisible:false,
        showeartag:null,
        form:{
          name:null,
          region:null
        },
        tableData2:[],
        currentRow:{
          d:null,
          l:null
        },
        earTagArray:[],
        earTagIdArray:[],
        immuneTagArray:[],
        allSheep:{
          oldBuilding:'',
          oldCol:'',
          oldColInt:'',
          newBuilding:'',
          newCol:'',
          newColInt:''
        }
      }
		},
		methods:{
      updateSheep(){
          this.dialogFormVisible= false
          let factory = this.user.userFactory
          let sheepid = this.upda.sheepId
          let tradeMarkEartag = this.upda.earTag
          let breedingSheepBase = this.upda.immuTag
          let type = this.upda.style
          let stage = 0
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
            stage
          }
          updateSheepAllMe(param).then(res=>{
            this.fetchData()
          })
      },
      querySearchStage(queryString, cb){
          let stage = this.stageList
          cb(stage)
      },
      handleSelectStage(item){
        this.upda.stage = item
      },
      querySearchStyle(queryString, cb){
          let style = [
                  '种公羊', 
                  '种母羊', 
                  '后备种母羊', 
                  '羔羊', 
                  '商品羊', 
                  '后备种公羊'
              ]
              cb(style)
      },
      handleSelectStyle(item){
        this.upda.style = item
      },
      querySearchEartagOnly(queryString, cb){
        cb(this.earTagArray)
      },
      handleSelectEartagOnly(item){
        this.onlySheep.eartag = item
        let flag = 0
        for(let i = 0;i < this.onlySheep.length;i++){
          if(this.earTagArray[i] == item)
            flag = i
        }
        this.onlySheep.eartagid = this.earTagIdArray[flag]
      },
      handleEditEartag(item){
        this.editSheep.eartag = item
        this.upda.earTag = item
        this.editSheep.period = this.period
        let flag = 0
        for(let i = 0;i < this.onlySheep.length;i++){
          if(this.earTagArray[i] == item)
            flag = i
        }
        this.upda.sheepId = this.earTagIdArray[flag]
        this.editSheep.immu = this.immuneTagArray[flag]
        this.upda.immuTag = this.immuneTagArray[flag]
      },
      moveSheepAllFun(){
       this.dialogFormVisible = false
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
      },
      moveSheepFun(){
         let factory = this.user.userFactory
         let building = this.onlySheep.state
         let colNum = this.onlySheep.stateColInt
          let param = {
          factory,
          building,
          colNum
          }
          moveSheep(this.onlySheep.eartagid , param).then(res=>{
            this.fetchData()
          })
          this.dialogFormVisible = false
      },
      querySearchBuilOnly(queryString, cb){
          cb(this.builList)
      },
      handleSelectBuilOnly(item){
          this.onlySheep.state = item 
          getSheepCol(this.user.userFactory, item).then(res =>{
               this.colList = res.data.data
        })
      },
      querySearchColOnly(queryString, cb){
          cb(this.colList)
      },
      handleSelectColOnly(item){
          this.onlySheep.stateCol = item.toString() 
          this.onlySheep.stateColInt = item
      },
      //全栏移动
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



      alertDetail(row, column, cell){
          console.dir(row)
          this.showeartag=this.earTagList.get(row.earTagNu)
          this.currentRow.d = row.buildingNu
          this.currentRow.l = row.columnNu
          this.earTagArray = this.showeartag.split(",")
          this.earTagIdArray = row.id.split(',')
          // if(row.immune = null){
          //   this.immuneTagArray
          // }
          this.immuneTagArray = row.immune.split(',')
          this.dialogFormVisible = true
      },
      fetchData(){
        this.tableData1 = []
        this.tableData2 = []
        let stage = this.index
        getIntelTable(this.user.userFactory , stage).then(res => {
          let list = res.data.lists
          list.forEach((item) => {
            let {building , col , number ,trademark , id , immune} = item
            let buildingNu = building + "栋"
            let columnNu = col + "栏"
            let totalNu = number
            let array = trademark.split(",")
            let earTagNu
            if(array.length>3){
              let array = trademark.split(",")
              earTagNu = array[0]+" ,"+array[1]+" ,"+array[2]+"..."
            }
            else{
              earTagNu = trademark
            }
            this.earTagList.set(earTagNu , trademark)
            this.tableData1.push({buildingNu , columnNu , earTagNu ,totalNu ,id ,immune})
          })
        })
        getStageDetail(stage).then(res=>{
            let tabledefault = res.data.models
            tabledefault.forEach((item) => {
                getStageTable(this.user.userFactory , item.id , item.stage , item.rid).then(res=>{
                  let unchecked = res.data.unchecked
                  let nu = res.data.number
                  let store = {store : res.data.models , uncheckedNum : unchecked}
                  let ob
                  if(unchecked == 0 && nu != 0){
                    ob = {comSituation : "完成"}
                  }else{
                    ob = {comSituation : "未完成"}
                  }
                  let obj = Object.assign(tabledefault[item.seq] , ob ,store)
                  this.tableData2.push(obj)
                })
            })
        })
        getSheepBuilding(this.user.userFactory).then(res=>{
            this.builList = res.data.data
        })
      },
			returnTotal(){
				let pathid = this.$route.params.id
	            let path = `/admin/${pathid}/intelManage/total`
	            this.$router.push(path)
			},
			cellClick(row) {
            let pathid = this.$route.params.id
            let path
            localStorage.setItem("store" ,JSON.stringify(row.store))
            localStorage.setItem("num" , row.uncheckedNum)
            localStorage.setItem("period" , this.period)
            localStorage.setItem("immuneType" , row.display)
            if(row.rid == 4){
              path = `/admin/${pathid}/genealogic/prac?intel=4`
            }else if(row.rid == 1){
              path = `/admin/${pathid}/nutrition/stage/prac?intel=1`
            }else if(row.rid == 2){
              path = `/admin/${pathid}/health/immune/prac?intel=2`
            }else if(row.rid == 3){
              path = `/admin/${pathid}/health/antiscolic/prac?intel=3`
            }else{
              path = `/admin/${pathid}/livestock/list`
            }
            this.$router.push(path)   
        },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => { 
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
            sums[index] =' '
          }
          if (index === 0) {
            sums[index] =this.sumtext
            return
          }   
        })
        return sums
      }
    }
	}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/color'
.el-table th
    border-left 2px solid #98c9e6
    color #fff
    background-color color-main !important

.el-button
	margin-top 20px
</style>













