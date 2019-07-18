<template>
    <div>
        <div>
            <el-form :inline="true">
                        <el-form-item>
                            <el-input v-model="carnum" size="small" placeholder="">
                            <template slot="prepend">车牌号:</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="carname" size="small" placeholder="">
                            <template slot="prepend">司机名称:</template>
                            </el-input>
                        </el-form-item>
                            <el-input v-for="(item, i) in captures" :key="i" class="select-file" style="width:300px" size="small" @click.native="$refs.erpai[i].click()" :value="item.model">
                            <template slot="prepend">上传车辆图片:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
                            </el-input>
                        <el-form-item>
                            <el-input v-model="tempreture" size="small" placeholder="" style="width:285px">
                            <template slot="prepend">车辆行驶温度:</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">添加</el-button>
                        </el-form-item>
                    </el-form>
        </div>
        
        <el-table :data="tableData" @cell-click="handleCell" >
			<el-table-column
				label="车牌号"
				width="120"
				prop="carnum">
			</el-table-column>
			<el-table-column
				label="司机名称"
				width="120"
				prop="carname">
			</el-table-column>
			<el-table-column
				label="车辆照片"
				width="120"
				prop="img">
                <el-button type="text" >查看</el-button>
			</el-table-column>
			<el-table-column
				label="车辆行驶温度"
				width="120"
				prop="tempreture">
            </el-table-column>
			<el-table-column
                    class="action"
                    label="操作"
                    width="160">
                    <template slot-scope="scope">
                        <div class="opr" >
                            <span @click="edit(scope.row)">编辑</span>
                            <span @click="deleteItem(scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
		</el-table>
        <el-dialog
        title="图片"
        :visible.sync="dialogcarVisible"
        width="30%">
        <!--  -->
        </el-dialog>
        <el-dialog
        title="编辑"
        :visible.sync="dialogEditVisible"
        width="30%">
        <el-input v-model="data.tempreture" size="small" width="120" placeholder="">
            <template slot="prepend">行驶温度:</template>
        </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEditVisible = false">取 消</el-button>
            <el-button type="primary"  @click="Edit">确 定</el-button>
        </span>
        </el-dialog>
    </div>            
</template>

<script>        
import { getUserById} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit' 

export default {
    data(){
        return{
            data:[],
            carnum:'',
            carname:'',
            tempreture:'',
            page:1,
            total: 10,
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
            tableData:[{carnum:1,tempreture:11}],
            dialogcarVisible:false,
            dialogEditVisible:false,
        }
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
          this.user = res.data.model
        }).then(this.fetchData)
    },

    methods:{ 
        handleCell(row,column,event,cell){
          this.rows=row.carnum
          if(column.label=="车辆照片"){
          this.dialogcarVisible = true;

          }
      },
        deleteItem (row){
            this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
            let data={
                carnum:row.carnum,
                id:this.user.userFactory
                }
            console.log(data)
            })
        },
        submit(){
              let form=new FormData()
              let carnum=this.carnum
              let carname=this.carname
              let tempreture=this.tempreture
              form.append('userId', this.$route.params.id)
              form.append('carnum',carnum )
              form.append('carname',carname )
              form.append('tempreture',tempreture )
              form.append('factoryId', this.user.userFactory)
              this.captures.forEach((item, index) => {
                    form.append('file', this.$refs.erpai[index].files[0])
              })
              let headers = {}
            //   console.log(form)
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/slaughter/addqarecord', {
                  method: 'POST',
                  headers,
                  body: form
              }).then(async res => {
                if (isReqSuccessful(res)) {
                        this.$message.success("上传成功")
                    }else{
                       this.$message.warning("上传失败")
                    }
                
              },_ => {
                    this.$message.error('上传失败')
                })
        },
        edit(row){
            this.dialogEditVisible = true;
            this.data.carnum=row.carnum
            this.data.carname=row.carname
            this.data.tempreture=row.tempreture
        },
        Edit(){
            this.dialogEditVisible = false;
            let data={
                carnum:this.data.carnum,
                tempreture:this.data.tempreture,
                id:this.user.userFactory
            }
            console.log(data)
        },
        selectFile (item, idx) {
          let file = this.$refs.erpai[idx].files[0]
          item.model = file.name
          item.file = file
        },

    }

}
</script>
