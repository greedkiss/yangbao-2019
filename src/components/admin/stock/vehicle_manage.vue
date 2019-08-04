<template>
    <div>
        <div>
            <el-form class=car_form :inline="true" style="width:100%">
                        <el-form-item>
                            <el-input v-model="numberPlate" size="small" placeholder="" style="width:285px">
                            <template slot="prepend">车牌号:</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="driverName" size="small" placeholder="" style="width:285px">
                            <template slot="prepend">司机名称:</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="telephone" size="small" placeholder="" style="width:285px">
                            <template slot="prepend">司机电话:</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-for="(item, i) in captures"  :key="i" class="select-file" style="width:285px" size="small" @click.native="$refs.carpic[0].click()" :value="car.fileName">
                            <template slot="prepend">上传车辆图片:<input type="file" @change="selectFile(car,$refs.carpic[0].files[0])" hidden ref="carpic"></template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="temperature" size="small" placeholder="" style="width:300px">
                            <template slot="prepend">车辆行驶温度:</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">添加</el-button>
                        </el-form-item>
                    </el-form>
        </div>
        
        <el-table class="car_info" :data="tableData" @cell-click="handleCell" >
			<el-table-column
				label="车牌号"
				width="120"
				prop="numberPlate">
			</el-table-column>
			<el-table-column
				label="司机名称"
				width="120"
				prop="driverName">
			</el-table-column>
            <el-table-column
				label="司机电话"
				width="120"
				prop="telephone">
			</el-table-column>
			<el-table-column
				label="车辆照片"
				width="120"
				>
                <template slot-scope="scope">
                    <div class="opr" >
                        <span @click="view(scope.$index)">查看</span>
                    </div>
                </template>
			</el-table-column>
			<el-table-column
				label="车辆行驶温度"
				width="120"
				prop="temperature">
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
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="fetchData"
            :current-page.sync="page">
        </el-pagination>
        <el-dialog title="图片详情"    
					:visible.sync="dialogFormVisible" 
					width="800px">
          <div>
          <el-card :body-style="{ padding: '0px' }">
          <img :src="pictureOfCar" class="image" :onerror="defaultImg">
          </el-card>
          </div>
		</el-dialog>

        <el-dialog
        title="编辑"
        :visible.sync="dialogEditVisible"
        width="30%">
        <el-input v-for="(item, i) in captures"  :key="i" class="select-file2" style="width:415px" size="small" @click.native="$refs.carpic1[0].click()" :value="car1.fileName">
            <template slot="prepend">上传车辆图片:<input width="120" type="file" @change="selectFile(car1,$refs.carpic1[0].files[0])" hidden ref="carpic1"></template>
        </el-input>
        <el-input v-model="driverName1" size="small" >
            <template slot="prepend">司机名称:</template>
        </el-input>
        <el-input v-model="telephone1" size="small" >
            <template slot="prepend">司机电话:</template>
        </el-input>
        <el-input v-model="temperature1" size="small" width="120" >
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
import { getUserById,getCarData,deleteCarinfo} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful } from '@/util/jskit' 

export default {
    data(){
        return{
            car:{
                fileName:null,
                file:null
            },
            car1:{
                fileName:null,
                file:null
            },
            captures: [{model: null , per : 0}],
            carpic:'',
            carpic1:'',
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            dialogFormVisible:false,
            pictureOfCar:'',
            page:1,
            total: 10,
            data:[],
            model:'',
            numberPlate:'',
            driverName:'',
            telephone:'',
            temperature:0,
            numberPlate1:'',
            driverName1:'',
            telephone1:'',
            temperature1:0,
            page:1,
            total: 10,
            user: null,
            disableAll: false,
            pictureStyle: '',
            tableData:[{numberPlate:1,temperature:11}],
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
        //查看图片
       view(index){
            this.pictureOfCar=this.tableData[index].pictureOfCar
            this.dialogFormVisible=true
            console.log(this.tableData[index].pictureOfCar)
        },
        handleCell(row,column,event,cell){
          
          
          if(column.label=="车辆照片"){
          this.dialogcarVisible = true;

          }
      },
        deleteItem (row){
           let id=this.user.userFactory
           let data = {
                numberPlate:row.numberPlate,
                }
           deleteCarinfo(id,data).then(res =>{
               if (isReqSuccessful(res)) {
                this.$message.success("删除成功")}
           }).then(this.fetchData)
        },
        Edit(){
              let form=new FormData()
              let numberPlate=this.numberPlate1
              let driverName=this.driverName1
              let telephone=this.telephone1
              let temperature=this.temperature1
              let id=this.user.userFactory
              form.append('userId', this.$route.params.id)
              form.append('numberPlate',numberPlate )
              form.append('driverName',driverName )
              form.append('telephone',telephone )
              form.append('temperature',temperature )
              form.append('factoryId', this.user.userFactory)
              this.captures.forEach((item, index) => {
              form.append('file', this.car1.file)
              })
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/vehicle/modify/'+id, {
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
                }).then(this.fetchData)
        },
        edit(row){
            this.dialogEditVisible = true;
            this.numberPlate1=row.numberPlate
            this.telephone1=row.telephone
            this.driverName1=row.driverName
            this.temperature1=row.temperature
            
        },
        submit(){
            console.log(this.numberPlate)
            if(this.numberPlate===""||this.telephone===""||this.driverName===""||this.temperature===""){
              this.$message.warning('请完善表单信息')    
            }else{
              let form=new FormData()
              let numberPlate=this.numberPlate
              let driverName=this.driverName
              let telephone=this.telephone
              let temperature=this.temperature
              form.append('userId', this.$route.params.id)
              form.append('numberPlate',numberPlate )
              form.append('driverName',driverName )
              form.append('telephone',telephone )
              form.append('temperature',temperature )
              form.append('factoryId', this.user.userFactory)
              this.captures.forEach((item, index) => {
                    form.append('file', this.car.file)
              })
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/vehicle/add', {
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
                }).then(this.fetchData)
            }
        },
        // Edit(){
        //     this.dialogEditVisible = false;
        //     let data={
        //         file:this.car.file,
        //         numberPlate:this.data.numberPlate,
        //         driverName:this.data.driverName,
        //         telephone:this.data.telephone,
        //         temperature:this.data.temperature,
        //         factoryId:this.user.userFactory
        //     }
        //     editCarInfo(data).then(res => {
        //             if (isReqSuccessful(res)) {
        //                 this.$message.success("上传成功")}
        //         }).then(this.fetchData)
        // },
        selectFile (item, file) {
          item.fileName = file.name
          item.file = file
        },
        async fetchData(){
        let id=this.user.userFactory;
        let param={
            page:this.page-1,
            size:5
        }
        getCarData(id, param).then(res => {
                    if (isReqSuccessful(res)) {
                        let data = res.data;
                        this.tableData = data.List
                        this.total = data.number
                    }
                    
                },)
      }

    }

}
</script>
