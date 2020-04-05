<template>
  <div class="mod_professorCourseVideo">
    <el-upload
      class="professorCourseVideo_upload"
      ref="upload"
      :action="upload.url"
      :data="upload.data"
      :headers="headers"
      name="file"
      :file-list="fileList"
      :disabled="disabled"
      :limit="1"
      accept="video/*"
      :on-exceed="exceed"
      :before-upload="checkFile"
      :on-change="change"
      :on-success="success"
      :on-error="error"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取用户手册视频</el-button>
      <el-select style="margin-left: 30px;" size="small" v-model="videoKind" placeholder="请选择用户手册视频类型">
        <el-option value="理念培训" >理念培训</el-option>
        <el-option value="操作培训" >操作培训</el-option>  
      </el-select>
      <el-button style="margin-left: 10px;" :disabled="disabled" size="small" type="success" @click="UploadToUserBook">上传视频</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过500M</div>
    </el-upload>

    <el-table
      ref="table"
      tooltip-effect="light"
      class="admin-table"
      :data="userBookList"
      style="width: 100%">
      <el-table-column
        prop="update"
        label="上传日期"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        prop="filename"
        label="视频名称"
        align='center'>
      </el-table-column>
      <!-- <el-table-column
        label="视频查看"
        align='center'>
        <template slot-scope="scope"> 
          <div class="opr">
            <span class="opr_delete" @click="watchVideo(scope.row.url)">查看</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="fileTypeName"
        label="视频种类"
        align='center'
        width="200">
      </el-table-column>
      <el-table-column
        class="action"
        label="操作"
        align='center'
        fixed="right"
        width="160">
        <template slot-scope="scope">
          <div class="opr">
            <span class="opr_delete" @click="watchVideo(scope.row.url)">查看</span>
            <span class="opr_delete" @click="deleteVideo(scope)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="getUserBookList"
      :current-page.sync="page">
    </el-pagination>

    <el-dialog
        title="照片/视频"
        :visible.sync="videoVisible"
        width="30%">
                <video :src="videoUrl" class="production-video" controls="controls" height="400" width="100%"></video>
    </el-dialog>
  </div>
</template>

<script>
  import { baseUrl, authStr, tokenStr } from '@/util/fetch.js'
  import { getVideo, getUserById, deleteUserBook, getUserBook } from '@/util/getdata.js'
  import { isReqSuccessful } from '@/util/jskit'
  export default {
    data() {
      return {
        // 上传 URL
        upload:{
          url: `${baseUrl}/document`,
          data: {},
        },
        fileList: [],
        // 上传视频参数
        proInfor:{},
        videoKind:"",
        disabled: false,
        videoList: [],
        // 数据总数
        total: 0,
        // 当前页数
        page: 1,
        userBookList:[],
        videoUrl:"",
        videoVisible: false,
        headers: {}
      }
    },
    created () {
      let id = this.$route.params.id
      getUserById(id).then(res => {
        if (isReqSuccessful(res)) {
          this.proInfor = {
            professorId: id,
            professorName: res.data.pkUserid
          }
        }
      })
      this.getUserBookList();   
      this.headers[authStr] = window.localStorage.getItem(tokenStr);
    },
    methods: {
      UploadToUserBook(){
        if(!this.fileList.length) {
          this.$message.warning('请选取视频文件')
          return false
        }
        if(!this.videoKind){
          this.$message.warning('请选择视频类型')
          return false
        }
        this.$set(this.upload, 'data',  {filetype :this.videoKind});
        this.$nextTick(()=>{  
          this.$refs.upload.submit()
          this.disabled = true
        })
      },
      exceed () {
        this.$message.warning('每次只能上传一个视频')
      },
      checkFile (file) {
        const type = file.name.substring(file.name.indexOf('.') + 1)      
        const isExceed = file.size / 1024 / 1024 <= 500
        if(!isExceed) {
          this.$message.warning('视频文件大小不能超过500M')
          return isExceed
        }
        return true
      },
      change (file) {
        if(file.status === 'ready') { // 添加文件时更新文件列表
          this.fileList.push(file)
        }
      },
      success (response) {
        if(isReqSuccessful(response)) {
          // 清空文件上传列表
          this.$refs.upload.clearFiles()
          this.fileList = []
          this.disabled = false
          this.$message.success('视频上传成功')
        }
      },
      error () {
        // 清空文件上传列表
        this.$refs.upload.clearFiles()
        this.fileList = []
        this.disabled = false
        this.$message.error('视频上传失败，请重新上传')
      },
      getUserBookList(){
        this.userBookList = [];
        let data = {
            page: this.page,
            size: 10
        }
        getUserBook(data).then(res =>{
          if(isReqSuccessful(res)){
            res.data.documents.forEach((item) =>{
              this.userBookList.push({
                update: item.udate,
                filename: item.filename,
                fileTypeName: item.fileTypeName,
                id:item.id,
                url:item.address
              }) 
            })
            this.total = res.data.total
          }else{
            this.$message({
              type:"warning",
              messge:'用户手册视频查询失败'
            })
          }
        })
      },
      watchVideo(url){
            if(url !== null){
                this.isImg = false;
                this.videoUrl = url
                this.videoVisible = true
            }
            else{
                this.$message.error('暂无相关视频！')
            }
        },
      downloadLink (index) {
        return `${baseUrl}/movie/${this.videoList[index].fileName}`
      },
      // 删除视频
      deleteVideo (scope) {
        console.log(scope);
        this.$confirm('此操作将永久删除该视频文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserBook(scope.row.id).then(res => {
            if(isReqSuccessful(res)) {
              this.$message.success('该条视频删除成功')
              this.getUserBookList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~@/assets/css/color'
  .mod_professorCourseVideo
    .professorCourseVideo_upload
      margin 0 0 15px 10px
    .opr_download
      color #606266
    .opr_delete
      cursor pointer
    .el-pagination
      margin: 10px 0 0 0
      text-align right 
</style>
