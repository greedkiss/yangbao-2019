<template>
<!--关联检疫证-->
<div class="admin-form">
  <div class="card" >    
        <el-form :inline="true"  class="correlation" style="width:100% ;margin-top:10px" >
            <el-form-item label="">
                <el-input v-model="tradeMarkEarTag"  style="width:100%">
                  <template slot="prepend">认购羊只:</template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="qaId"  style="width:100%">
                  <template slot="prepend">检疫合格证号:</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-for="(item, i) in captures" :key="i" class="select-file" style="width:337px"  @click.native="$refs.erpai[i].click()" :value="item.model">
                  <template slot="prepend">上传检疫合格证:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
                </el-input>
            </el-form-item>
            <el-table
            :data="allEarTag"
            style="display:table-caption"
            stripe
            max-height="200">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
              label="已选羊只"
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
            <div style="width:10%; margin:0 auto;">
              <el-form-item>
                <el-button type="primary"  @click="submit()">提交</el-button>
              </el-form-item>
            </div>
        </el-form> 
  </div>
<!--待选屠宰羊-->
<div>
    <el-table 
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
      label="关联"
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
				label="商标耳牌号"
				width="120"
				prop="tradeMarkEarTag">
			</el-table-column>
			<el-table-column
				label="免疫耳牌号"
				width="120"
				prop="immuneEarTag">
			</el-table-column>
      <el-table-column
				label="视频"
				width="120"
			>
        <template slot-scope="scope">
            <div class="opr" >
                <span @click="view(scope.$index)">查看</span>
            </div>
        </template>
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
			<el-table-column
				label="购买时间"
				width="160"
				prop="buyTime">
			</el-table-column>
			<el-table-column
				label="来源养殖场"
				width="250"
				prop="sourceFactory">
			</el-table-column>
      <el-table-column
                class="action"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <el-button @click="Delete(scope.$index)" type="text">报废</el-button>
                    </div>
                </template>
      </el-table-column>
  </el-table>

  <el-pagination
    layout="prev, pager, next"
    :total="total" 
    :page-size="10" 
    @current-change="fetchData"
    :current-page.sync="page">
  </el-pagination>

  <el-dialog title="图片详情"    
    :visible.sync="dialogFormVisible" 
    width="800px">
    <div>
      <video :src="pic" style="width:100%" controls="controls" height="400" width="400"></video>
    </div>
  </el-dialog>
  </div>
</div>  
</template>

<script>
import { getUserById, getCorrelationData, deleteCorrelationById, deleteSubscribe} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit' 

  export default {
    data() {
      return {
        defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
        pic:"",
        page:1,
        total: 10,
        user: null,
        disableAll: false,
        pictureStyle: '',
        erpai: '',
        captures: [{model: null , per : 0}],
        tableData:[],
        qaId:null,
        multipleSelection:[],
        dialogFormVisible:false,
        tradeMarkEarTag:'',
        allEarTag:[]
      }
    },
    watch: {
      tradeMarkEarTag(newval){
          let reg = /[MSG]\d+/g;
          let canPush = /[MSG]\d{6,}/g;
          let res = this.tradeMarkEarTag.match(reg);
          let canPushRes = this.tradeMarkEarTag.match(canPush);
          if(res){
            //全局匹配，res是一个结果数组，将数组转换为字符串
              this.tradeMarkEarTag = res.join(",");
          }else{
            if(newval.length > 1){  
              this.$message.warning("请输入合法耳牌");
            }
          }
          if(canPushRes){
            //只有数字在六位以上的号码，才是符合规范的，才可以被放入缓存列表中
            this.allEarTag = [];
            canPushRes.forEach(v => {
              this.allEarTag.push({
                number:v
              })
            })
          }
      }
    },
    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
          this.user = res.data.model
        }).then(this.fetchData);
    },
    methods: {
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
      //上传图片并关联检疫合格证号
      selectFile (item, idx) {
          let file = this.$refs.erpai[idx].files[0]
          item.model = file.name
          item.file = file
      },
      submit () {
              let array = this.multipleSelection;
              let len = array.length;
              let sheep='';
              for(let i = 0;i < len-1; i++){
                let erNumber=array[i].tradeMarkEarTag+','
                sheep=sheep+erNumber
              }
              let erNumber = '';
              if(len > 0){
                erNumber = array[len-1].tradeMarkEarTag;
              }
              sheep += erNumber;
              if(this.tradeMarkEarTag != ''){
                if(array.length > 0 ){
                  sheep +=  "," + this.tradeMarkEarTag
                }else{
                  sheep += this.tradeMarkEarTag
                }
              }
              let form=new FormData()
              let qaId=this.qaId
              form.append('userId', this.$route.params.id)
              form.append('eartags',sheep )
              form.append('qaId',qaId )
              form.append('factoryId', this.user.userFactory)
              this.captures.forEach((item, index) => {
                    form.append('file', this.$refs.erpai[index].files[0])
              })
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/slaughter/addqarecord', {
                  method: 'POST',
                  headers,
                  body: form
              }).then(async res => {
                  let body = await res.json()
                    if (isReqSuccessful(body)) {
                        this.$message.success('上传成功')
                        this.fetchData()
                     }
                    else{
                    this.$message.error('请验证检疫合格证号，不能为空或者重复！')
                    }
                })
      },
      //查看图片
      view(index){
          this.pic=this.tableData[index].pic;
          this.dialogFormVisible=true;
      },
      Delete(index){
        let data = {
          id: this.tableData[index].id,
          factory: this.user.userFactory
        }
        this.$confirm('你将删除这条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSubscribe(data).then(res=>{
            if(res){
              if(isReqSuccessful(res)){
                this.$message.success("删除成功");
                this.fetchData();
                return
              }
            }else{
              this.$message({
                type: 'error',
                message: '删除失败'
              }); 
            }
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败'
          });          
        });
      },
      deleteAllEarTag(index){
        this.allEarTag.splice(index, 1);
        let str = '';
        this.allEarTag.forEach(item => {
          str += item.number;
        })
        this.tradeMarkEarTag = str;
      },
      //加载表格信息
      async fetchData(){
        let id=this.user.userFactory;
        let param={
            type: 0,
            page: this.page-1,
            size: 10
        }
        getCorrelationData(id, param).then(res => {
            if (isReqSuccessful(res)) {
                let data = res.data;
                this.tableData = data.List
                this.total = data.number
            }
            
        },)
      },
    }
  }
  
</script>
<style scoped lang="stylus">
    .time
        display inline-block
        font-size 0 !important
        width 21% !important
        .time-span
            box-sizing border-box
            display inline-block
            height h=32px
            width 30%
            line-height h       
            vertical-align top
            font-size 14px
            border 1px solid color-main
            background-color color-main
            color #fff
            &+.el-input
                width calc(100% - 141px)
        .ellipse
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
</style>

