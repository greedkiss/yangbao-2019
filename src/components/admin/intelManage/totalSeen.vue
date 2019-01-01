<template>
    <div>
    <el-card>
      <span style="color:#2891d1;padding-right: 10px">提示：</span>
      <span style="color:#2891d1">点击该列所在表头跳转具体生产环节界面</span>
    </el-card>
    <el-table
    v-loading="load"
    @header-click = "tononpregnantOne"
    :data="tableData"
    style="width: 100%">
    <el-table-column
        prop="stageall"
        label="生产环节"
        width="100"
        align="center"
        label-class-name="bigsize">
      </el-table-column>
    <el-table-column label="空怀阶段" width="240" align="center" label-class-name="bigsize">
      <el-table-column
        prop="nonpregnantOne"
        label="引种应激期（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nonpregnantTwo"
        label="体况调理期（点击进入）"
        width="120"
        align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="妊娠阶段" width="360" align="center" label-class-name="bigsize">
      <el-table-column
        prop="pregnantStageOne"
        label="妊娠前三月（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pregnantStageTwo"
        label="妊娠第四月（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="pregnantStageThree"
        label="妊娠第五月（点击进入）"
        width="120"
        align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column label="哺乳阶段" width="830" align="center" label-class-name="bigsize">
      <el-table-column
        prop="produceStageOne"
        label="产羔0-5日（点击进入）"
        width="110"
        align="center">
      </el-table-column>
      <el-table-column
        prop="produceStageTwo"
        label="产羔6-10日（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="produceStageThree"
        label="产羔11-20日（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="produceStageFour"
        label="产羔21-30日（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="produceStageFive"
        label="产羔31-40日（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="produceStageSix"
        label="产羔41-50日（点击进入）"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="produceStageSeven"
        label="产羔51-60日（点击进入）"
        width="120"
        align="center">
      </el-table-column>
    </el-table-column>
    <el-table-column
            prop="growStage"
            label="生长阶段(点击进入)"
            width="90"
            align="center">
    </el-table-column>
    <el-table-column label="种羊育种阶段" width="180" align="center" label-class-name="bigsize">
          <el-table-column
            prop="breedStageOne"
            label="育种一期(点击进入)"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="breedStageTwo"
            label="育种二期(点击进入)"
            width="90"
            align="center">
          </el-table-column>
    </el-table-column>
    <el-table-column label="商品羊育肥阶段" width="240" align="center" label-class-name="bigsize">
          <el-table-column
            prop="unfatStage"
            label="育肥前期(点击进入)"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="growfatStage"
            label="直线育肥期（点击进入）"
            width="120"
            align="center">
          </el-table-column>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import { getTotalInTable , getUserById , getStageTable ,getTotalFinish} from '@/util/getdata'

export default {
    created(){
      let id = this.$route.params.id
       getUserById(id).then(res => {
          this.user = res.data.model
       }).then(this.fetchData)
    },
    data () {
        return {
            tableData:[{
                stageall:'栏栋号'
            },
            {
                stageall: '羊只数'
            },{
                stageall: '工作进度',
            }],
            // tableData:null,
            load:true,
            user:null,
            propName:new Map([[1,"nonpregnantOne"],
                              [2,"nonpregnantTwo"],
                              [3,"pregnantStageOne"],
                              [4,"pregnantStageTwo"],
                              [5,"pregnantStageThree"],
                              [6,"produceStageOne"],
                              [7,"produceStageTwo"],
                              [8,"produceStageThree"],
                              [9,"produceStageFour"],
                              [10,"produceStageFive"],
                              [11,"produceStageSix"],
                              [12,"produceStageSeven"],
                              [13,"growStage"],
                              [14,"breedStageOne"],
                              [15,"breedStageTwo"],
                              [16,"unfatStage"],
                              [17,"growfatStage"],
                            ]),
            loadNum:1
        }
    },
    methods:{
        tononpregnantOne(column, event){
          let pathid = this.$route.params.id
          if(column.label=="引种应激期（点击进入）"){           
              let path = `/admin/${pathid}/intelManage/shin`
              this.$router.push(path)
          }
          if(column.label=="体况调理期（点击进入）"){
              let path = `/admin/${pathid}/intelManage/bochan`
              this.$router.push(path)
          }
          if(column.label=="妊娠前三月（点击进入）"){
              let path = `/admin/${pathid}/intelManage/stageOne`
              this.$router.push(path)
          }
          if(column.label=="妊娠第四月（点击进入）"){
              let path = `/admin/${pathid}/intelManage/stageTwo`
              this.$router.push(path)
          }
          if(column.label=="妊娠第五月（点击进入）"){
              let path = `/admin/${pathid}/intelManage/stageThree`
              this.$router.push(path)
          }
          if(column.label=="产羔0-5日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageOne`
              this.$router.push(path)
          }
          if(column.label=="产羔6-10日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageTwo`
              this.$router.push(path)
          }
          if(column.label=="产羔11-20日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageThree`
              this.$router.push(path)
          }
          if(column.label=="产羔21-30日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageFour`
              this.$router.push(path)
          }
          if(column.label=="产羔31-40日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageFive`
              this.$router.push(path)
          }
          if(column.label=="产羔41-50日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageSix`
              this.$router.push(path)
          }
          if(column.label=="产羔51-60日（点击进入）"){
              let path = `/admin/${pathid}/intelManage/pdeStageSeven`
              this.$router.push(path)
          }
          if(column.label=="生长阶段(点击进入)"){
              let path = `/admin/${pathid}/intelManage/gstage`
              this.$router.push(path)
          }
          if(column.label=="育种一期(点击进入)"){
              let path = `/admin/${pathid}/intelManage/bStageOne`
              this.$router.push(path)
          }
          if(column.label=="育种二期(点击进入)"){
              let path = `/admin/${pathid}/intelManage/bStageTwo`
              this.$router.push(path)
          }
          if(column.label=="育肥前期(点击进入)"){
              let path = `/admin/${pathid}/intelManage/unfatStage`
              this.$router.push(path)
          }
          if(column.label=="直线育肥期（点击进入）"){
              let path = `/admin/${pathid}/intelManage/gfStage`
              this.$router.push(path)
          }
        },
        fetchData(){
          for(let index = 1;index<18 ; index++){
              getTotalInTable(this.user.userFactory , index).then(res =>{
                  let propName = this.propName.get(index)
                  let buil = {[propName]: res.data.buildings}
                  let num = {[propName]: res.data.number}
                  let obj0 = Object.assign(this.tableData[0],buil)
                  let obj1 = Object.assign(this.tableData[1],num)
                  this.tableData = [obj0,obj1,this.tableData[2]]
              })
          }   
          for(let index = 1;index<18 ; index++){
              getTotalFinish(this.user.userFactory , index).then(res => {
                  let propName = this.propName.get(index)
                  let status
                  if(res.data.result=="true"){
                      status="完成"
                  }else{
                    status="未完成"
                  }
                  let num = {[propName]: status}
                  let obj2 = Object.assign(this.tableData[2],num)
                  this.tableData = [this.tableData[0],this.tableData[1],obj2]
              }).then(this.loadNum++)
              if(this.loadNum > 17){
                this.load = false
              }
          }
          
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
.el-table thead.is-group th
    background #2891d1
    cursor pointer
.bigsize
    font-size 17px
</style>

