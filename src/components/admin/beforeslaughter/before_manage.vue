<template>
<div>
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="">
        <el-input v-model="qaId" size="small" placeholder="">
          <template slot="prepend">免疫合格证号:</template>
        </el-input>
    </el-form-item>
    <el-form-item label="">
        <el-input v-model="tradeMarkEarTag" size="small" placeholder="" >
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
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
    </el-form-item>
    </el-form>

    <div>
        <el-table 
        :data="tableData"
        style="width: 100%"
        @cell-click="handleCell">
            <el-table-column
				label="免疫合格证号码"
				width="150"
				prop="certificationNum">
			</el-table-column>
            <el-table-column
				label="商标耳牌号"
				width="120"
				prop="tradeMarkEartag">
			</el-table-column>
			<el-table-column
				label="免疫耳牌号"
				width="120"
				prop="immuneEartag">
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
				label="羊只品类"
				width="120"
				prop="style">
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
      	<el-table-column
				label="时间"
				width="120"
				prop="times">
			</el-table-column>
			<el-table-column
				label="年龄"
				width="120"
				prop="age">
			</el-table-column>
			<el-table-column
				label="视频"
				width="120"
				prop="video_img"
			>
			<el-button type="text" >查看</el-button>
			</el-table-column>
      <el-table-column width="200" label="操作">
      <template slot-scope="scope">
        <span size="small" style="cursor:pointer" @click="Syn(scope.row)" >同步</span>
        <span size="small" style="cursor:pointer" @click="Upload(scope.row)">上传</span>
        <span size="small" style="cursor:pointer" @click="Edit(scope.row)">编辑</span>
      </template>
      </el-table-column>
 </el-table>
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
    <el-button type="primary" @click="uploadVideo">确 定</el-button>
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
    <el-button type="primary"  @click="editWeight">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="视频"
  :visible.sync="dialogVideoVisible"
  width="30%">
   <!-- <div class="show-detail">
      <video :src="urlSpecific" class="production-video" controls="controls" height="400" width="400"></video>
   </div> -->
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVideoVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { getUserById} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit' 

  export default {
    data() {
      return {
          tableData:[{
            certificationNum:1,
            tradeMarkEartag:2,
            weight:88
          }],
          rows:'',
          qaId: '',
          weight:'',
          tradeMarkEarTag: '',
          gmtCreate:'',
          dialogUpdataVisible:false,
          dialogEditVisible:false,
          dialogVideoVisible:false,
          erpai: '',
          captures: [{model: null , per : 0}],
          user: null,
      }
    },
    methods: {
      mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
          this.user = res.data.model
        }).then(this.fetchData)
    },
      //查询
      onSubmit() {
        if(this.qaId==''&&this.tradeMarkEarTag==''&&this.gmtCreate==''){
          this.$message.warning('至少完成一项表单信息！');
        }else{
          let tradeMarkEarTag=this.tradeMarkEarTag
          let qaId=this.qaId
          let gmtCreate=this.gmtCreate
          let data = {gmtCreate,tradeMarkEarTag,qaId}
          console.log(data)
        }
        
      },
      //查看视频
      handleCell(row,column,event,cell){
          // console.log(row.tradeMarkEartag)
          // console.log(column.label)
          this.rows=row.tradeMarkEartag
          if(column.label=="视频"){
          this.dialogVideoVisible = true;

          }
      },
      //同步体重及视频
      Syn(row){
        this.$message.success('同步成功')
        console.log(this.weight)
        // console.log(this.rows)
      },
      //上传视频
      Upload(row){
        this.dialogUpdataVisible = true;     
      },
      uploadVideo(){
        this.dialogUpdataVisible = false;
        // console.log(this.rows)
        let form=new FormData()
              let qaId=this.qaId
              form.append('userId', this.$route.params.id)
              form.append('eartags', rows)
              form.append('factoryId', this.user.userFactory)
              this.captures.forEach((item, index) => {
                    form.append('file', this.$refs.erpai[index].files[0])
              })
              console.log(form)
              
              // let headers = {}
              // headers[authStr] = window.localStorage.getItem(tokenStr)
              // window.fetch(baseUrl + '/slaughter/addqarecord', {
              //     method: 'POST',
              //     headers,
              //     body: form
              // }).then(async res => {
              //   if (isReqSuccessful(res)) {
              //           this.$message.success("上传成功")
              //       }else{
              //          this.$message.warning("上传失败")
              //       }
                
              // },_ => {
              //       this.$message.error('上传失败')
              //   })
              
      },
      selectFile (item, idx) {
          let file = this.$refs.erpai[idx].files[0]
          item.model = file.name
          item.file = file
          },
      //编辑体重
      Edit(row){
        this.dialogEditVisible = true;
        console.log(row.weight)
      },
      editWeight(){
        console.log(data)
       console.log(this.rows)
        let data={
          weighi:this.weight,
          eartags:this.rows
          }
        this.dialogEditVisible = false;
      },
      //获取数据
      // async fetchData(){
      //   let id=this.user.userFactory;
      //   let param={
      //       page:this.page-1,
      //       size:15
      //   }
      //   getCorrelationData(id, param).then(res => {
      //               if (isReqSuccessful(res)) {
      //                   let data = res.data;
      //                   this.tableData = data.List
      //                   this.total = data.size
      //               }
                    
      //           },)
      // }
    }
  }
</script>