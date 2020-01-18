<template>
<!--关联检疫证-->
<div class="admin-form">
  <div class="card" >
    <p class="card-title" >胴体管理</p>
    <div class="border-main">
        <div class="time" >
            <span class="time-span ellipse">耳牌号</span>
            <el-input  size="small" v-model="tradeMarkEarTag"></el-input>
        </div>
        <el-button @click="fetchData()" size="mini" type="primary">查询</el-button>
        <el-form :inline="true"  class="correlation" style="width:100% ;margin-top:10px" >
            <el-form-item label="">
                <el-input v-model="qaId" placeholder="" style="width:100%">
                  <template slot="prepend">检疫合格证号:</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-for="(item, i) in captures" :key="i" class="select-file" style="width:337px"  @click.native="$refs.erpai[i].click()" :value="item.model">
                  <template slot="prepend">上传检疫合格证:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="submit()">上传关联</el-button>
            </el-form-item>
        </el-form> 
    </div>
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
				label="购买时间"
				width="120"
				prop="buyTime">
			</el-table-column>
      <el-table-column
				label="来源地址"
				width="120"
				prop="address">
			</el-table-column>
			<el-table-column
				label="养殖场"
				width="120"
				prop="farm">
			</el-table-column>
			<el-table-column
				label="货主"
				width="120"
				prop="master">
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
     <el-table-column
				label="图片"
				width="120"
				>
        <template slot-scope="scope">
            <div class="opr" >
                <span @click="view(scope.$index)">查看</span>
            </div>
        </template>
			</el-table-column>
  </el-table>

       <el-dialog title="图片详情"    
					:visible.sync="dialogFormVisible" 
					width="800px">
          <div>
          <el-card :body-style="{ padding: '0px' }">
          <img :src="pic" class="image" :onerror="defaultImg">
          </el-card>
          </div>
				</el-dialog>
        
  <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="fetchData"
            :current-page.sync="page">
        </el-pagination>
  </div>
</div>  
</template>

<script>
import { getUserById,getCorrelationData} from '@/util/getdata'
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
        tradeMarkEarTag:''
      }
    },
    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
          this.user = res.data.model
        }).then(this.fetchData)
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
                let array = this.multipleSelection
                console.log(array)
                let len=array.length-1
                let sheep=''
                for(let i = 0;i<len;i++){
                  let erNumber=array[i].tradeMarkEarTag+','
                  sheep=sheep+erNumber
                }
                let erNumber=array[len].tradeMarkEarTag;
                sheep=sheep+erNumber
                console.log(sheep)
              
              let form=new FormData()
              let qaId=this.qaId
              form.append('userId', this.$route.params.id)
              form.append('eartags',sheep )
              form.append('qaId',qaId )
              form.append('factoryId', this.user.userFactory)
              this.captures.forEach((item, index) => {
                    form.append('file', this.$refs.erpai[index].files[0])
              })
              console.log(form)
              
              let headers = {}
              console.log(form);
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //查看图片
       view(index){
            this.pic=this.tableData[index].pic
            this.dialogFormVisible=true
            console.log(this.tableData[index].pic)
        },
      //加载表格信息
      async fetchData(){
        let id=this.user.userFactory;
        let param={
            page:this.page-1,
            size:10
        }
        getCorrelationData(id, param).then(res => {
                    if (isReqSuccessful(res)) {
                        let data = res.data;
                        this.tableData = data.List
                        this.total = data.size
                    }
                    
                },)
      }
    }
  }
  
</script>
<style scope lang="stylus">
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

