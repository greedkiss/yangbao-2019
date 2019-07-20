<template>
<div>
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="">
        <el-input v-model="qaId" size="small" placeholder="" style="width:210px">
          <template slot="prepend">免疫合格证号:</template>
        </el-input>
    </el-form-item>
    <el-form-item label="">
        <el-input v-model="tradeMarkEarTag" size="small" placeholder="" style="width:210px">
          <template slot="prepend">耳牌号:</template>
        </el-input>
    </el-form-item>
    <el-form-item>
            <span class="demonstration">日期区间</span>
            <el-date-picker
            size="small"
              v-model="gmtCreate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" size="small" @click="fetchData">查询</el-button>
    </el-form-item>
    </el-form>
<div>
        <el-table 
        :data="tableData"
        style="width: 100%">
            <el-table-column
				label="免疫合格证号码"
				width="150"
				prop="immuneCertified">
			</el-table-column>
            <el-table-column
				label="商标耳牌号"
				width="120"
				prop="trademarkEarTag">
			</el-table-column>
			<el-table-column
				label="免疫耳牌号"
				width="120"
				prop="immuneEarTag">
			</el-table-column>
			<el-table-column
				label="栋号"
				width="120"
				prop="d">
			</el-table-column>
			<el-table-column
				label="栏号"
				width="120"
				prop="l">
			</el-table-column>
      <el-table-column
				label="来源地址"
				width="120"
				prop="originAddress">
			</el-table-column>
			<el-table-column
				label="养殖场"
				width="120"
				prop="breedFactory">
			</el-table-column>
			<el-table-column
				label="货主"
				width="120"
				prop="goodman">
			</el-table-column>
			<el-table-column
				label="羊只品类"
				width="120"
				prop="sheepType">
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
      	<el-table-column
				label="时间"
				width="120"
				prop="time">
			</el-table-column>
			<el-table-column
				label="年龄"
				width="120"
				prop="age">
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
      <el-table-column width="200" label="操作">
      <template slot-scope="scope">
        <span size="small" style="cursor:pointer" @click="Syn(scope.row)" >同步</span>
        <span size="small" style="cursor:pointer" @click="Upload(scope.row)">上传</span>
        <span size="small" style="cursor:pointer" @click="Edit(scope.row)">编辑</span>
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
</div>
<el-dialog
  title="上传"
  :visible.sync="dialogUpdataVisible"
  width="30%">
    <el-input v-for="(item, i) in captures" :key="i" class="select-file" style="width:100%" size="small" @click.native="$refs.erpai[i].click()" :value="item.model">
      <template slot="prepend">上传视频:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
    </el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdataVisible = false">取 消</el-button>
    <el-button type="primary" @click=" manageEdit2()">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="编辑"
  :visible.sync="dialogEditVisible"
  width="30%">
  <el-input v-model="weight" size="small" width="120" placeholder="">
    <template slot="prepend">体重:</template>
  </el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogEditVisible = false">取 消</el-button>
    <el-button type="primary"  @click=" manageEdit1()">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="羊只视频"
  :visible.sync="dialogFormVisible"
  width="30%">
   		<video :src="video" class="production-video" controls="controls" height="400" width="400"></video>
</el-dialog>

</div>
</template>

<script>
import { getUserById,getManageData} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit' 

  export default {
    data() {
      return {
          tableData:[],
          video:'',
          filetype:'',
          qaId: '',
          weight:'',
          tradeMarkEarTag: '',
          gmtCreate:'',
          dialogUpdataVisible:false,
          dialogEditVisible:false,
          dialogFormVisible:false,
          erpai: '',
          captures: [{model: null , per : 0}],
          user: null,
          page:1,
          limit:10,
          total:0,
          id:'',
      }
    },
    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
          this.user = res.data.model
        }).then(this.fetchData)
    },
    methods: {
      
      //查看视频
      view(index){
            this.video=this.tableData[index].video
            this.dialogFormVisible=true
            console.log(this.tableData[index].video)
      },
      //同步体重及视频
      Syn(row){
        
        console.log(row.tradeMarkEartag)
        
      },
      //上传视频
      Upload(row){
        this.dialogUpdataVisible = true;
        this.id=row.id
      },
       //编辑体重
      Edit(row){
        this.dialogEditVisible = true;
        this.id=row.id
      },
      //编辑体重
      manageEdit1(){
        this.dialogEditVisible = false;
        let form=new FormData()
              form.append('id',this.id )
              form.append('weight', this.weight)
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/slaughter/m', {
                  method: 'POST',
                  headers,
                  body: form
              }).then(async res => {
                let body = await res.json()
                    if (isReqSuccessful(body)) {
                            this.$message.success('上传成功')
                    }
                    else{
                    this.$message.error('上传失败')
                    }
                }).then(this.fetchData)
              
      },
      //上传视频
      manageEdit2(){
        this.dialogUpdataVisible = false;
        let form=new FormData()
              form.append('id',this.id )
              this.captures.forEach((item, index) => {
                    form.append('file', this.$refs.erpai[index].files[0])
              })
              
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/slaughter/m', {
                  method: 'POST',
                  headers,
                  body: form
              }).then(async res => {
                let body = await res.json()
                    if (isReqSuccessful(body)) {
                            this.$message.success('上传成功')
                    }
                    else{
                    this.$message.error('上传失败')
                    }
                }).then(this.fetchData)
              
      },
      selectFile (item, idx) {
          let file = this.$refs.erpai[idx].files[0]
          item.model = file.name
          item.file = file
          },
     
      
      //获取数据
      async fetchData(){
        // let startTime, endTime;
        // startTime = (this.gmtCreate == null) ? null : this.gmtCreate[0]
        // endTime = (this.gmtCreate == null) ? null : this.gmtCreate[1]
        let data = {
            certificate:this.qaId,
            trademark:this.tradeMarkEarTag,
            startTime:(this.gmtCreate == null) ? "" : this.gmtCreate[0],
            endTime:(this.gmtCreate == null) ? "" : this.gmtCreate[1],
            page:this.page-1,
            size:10,
            factory:this.user.userFactory,
        }
        getManageData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        let data = res.data;
                        this.tableData = data.List
                        this.total = data.number
                        this.video = data.List.video
                    }
                    
                },)
      }
    }
  }
</script>