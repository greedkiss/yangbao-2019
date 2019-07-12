<template>
<!--关联检疫证-->
<div class="correlation-list">
 <el-form :inline="true" :model="form" class="correlation">
  <el-form-item label="">
    <el-input v-model="form.number" size="small" placeholder="">
    <template slot="prepend">检疫合格证号:</template>
    </el-input>
  </el-form-item>
  <!-- <el-form-item label="">
    <el-upload
    class="upload-demo"
    ref="upload"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="form.fileList"
    :auto-upload="false">
    <el-input slot="trigger" size="small" type="primary"> 
    <template slot="prepend">检疫合格证图像:</template>
    </el-input>
    <el-button size="small" type="primary" @click="submitUpload">上传</el-button>
    </el-upload>
  </el-form-item> -->
  <el-form-item>
    <el-input v-for="(item, i) in captures" :key="i" class="select-file" style="width:610px" size="small" @click.native="$refs.erpai[i].click()" :value="item.model">
                    <template slot="prepend">上传生产可视截图:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
                </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" size="small" @click="submit">上传关联</el-button>
  </el-form-item>
</el-form> 
<!--待选屠宰羊-->
<div>
    <el-table 
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
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
				label="年龄"
				width="120"
				prop="age">
			</el-table-column>
			<el-table-column
				label="视频"
				width="120"
				prop="video"
				v-if="true">
			</el-table-column>
  </el-table>
  </div>
</div>  
</template>

<script>
import { getUserById, getSheepBuilding, getSheepCol, getSheepEarTag} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
  export default {
    data() {
      return {
        model: {
                building:String(this.$route.query.dong)==null?'':this.$route.query.dong,
                column: '',
                earTag: this.$route.query.ramSheepTrademark==null?'':this.$route.query.ramSheepTrademark,
                columnString:String(this.$route.query.lan)==null?'':this.$route.query.lan,
        },
        user: null,
        disableAll: false,
        pictureStyle: '',
        erpai: '',
        captures: [{model: null , per : 0}],
        tableData:[{
          tradeMarkEartag:1,
          immuneEartag:2,
          style:2,
          weight:3,
          age:4,
          video:5
        }],
        form: {
         number:null
        },
      }
    },
     mounted () {
       let id = this.$route.params.id
       getUserById(id).then(res => {
          this.user = res.data.model
       }).then(this.fetchData)
    },
    methods: {
      //关联信息
      onSubmit() {
        let param={
          number:this.form.number,
          filename:this.fileList.name,
          fileurl:this.fileList.url
        };
        // console.log(param.fileList);
        // console.log(param.number);
        if(param.number==null||param.number==''){
          this.$message.warning('请完善表单信息！');
        }
      },
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

      //上传图片
      selectFile (item, idx) {
            let file = this.$refs.erpai[idx].files[0]
            item.model = file.name
            item.file = file
        },

        addCapture () {
            this.captures.push({model: null ,per: 0})
            this.deleteOne = true
        },
        deleteCapture(){
            this.captures.pop()
        },
        submit () {
                let form = new FormData()
                let col
                if(this.model.column == null){
                    col = parseInt(this.model.columnString)
                }else{
                    col = this.model.column
                }
                form.append('userId', this.$route.params.id)
                form.append('building', this.model.building)
                form.append('col', col)
                form.append('brand', this.model.earTag)
                form.append('factoryId', this.user.userFactory)
                form.append('filetype', this.fileType)
                this.captures.forEach((item, index) => {
                     form.append('file[]', this.$refs.erpai[index].files[0])
                })
                let headers = {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl + '/uploadFile/productPic', {
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if(body.data.token != null){
                        this.captures.forEach((item, index) => {
                            let file = this.$refs.erpai[index].files[0]
                            let key = body.data.names[index]
                            let token = body.data.token
                            let putExtra = {
                                fname: "",
                                    params: {},
                                    mimeType: null
                              }
                              let config = {
                                useCdnDomain: true,
                                    disableStatisticsReport: false,
                                    retryCount: 6,
                              }
                              let self = this
                              let observer = {
                                next(res){
                                    self.captures[index].per = parseInt(res.total.percent)
                                },
                                error(res){
                                    self.$message.error()('上传失败')
                                },
                                complete(res){
                                    self.$message.success('上传成功')
                                    let obj = new FormData()
                                    obj.append('name' , key)
                                    let headers = {}
                                    headers[authStr] = window.localStorage.getItem(tokenStr)
                                    window.fetch(baseUrl + '/createThumb', {
                                        method: 'POST',
                                        headers,
                                        body: obj
                                    }).then(async res => {
                                        let body = await res.json()
                                    })
                                }
                              }
                              let observable = qiniu.upload(file, key, token, putExtra, config)
                              observable.subscribe(observer)
                        })
                    }else{
                        this.captures.forEach((item ,index) => {
                            this.captures[index].per = 100
                            this.$message.success('上传成功')
                        })
                    }
                })
                this.fileType = 0
        },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

