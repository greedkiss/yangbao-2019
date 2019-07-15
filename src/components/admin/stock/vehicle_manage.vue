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
                            <el-input v-model="tempreture" size="small" placeholder="">
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
				prop="video">
            </el-table-column>
			<el-table-column
                    class="action"
                    label="操作"
                    width="160">
                    <template slot-scope="scope">
                        <div class="opr" >
                                <span @click="deleteItem(scope.$index)">删除</span>
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
    </div>            
</template>

<script>
export default {
    data(){
        return{
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
            tableData:[{carnum:1}],
            dialogcarVisible:false,

        }
    },

    methods:{ 
        handleCell(row,column,event,cell){
          this.rows=row.carnum
          if(column.label=="车辆照片"){
          this.dialogcarVisible = true;

          }
      },
        deleteItem (index) {
            this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[index].id
                this.deleteData(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.fetchData()
                        this.$message.success('删除成功!')
                    }
                })
            }).catch(() => {
                return false
            })
        },
        submit(){

        },
        selectFile (item, idx) {
          let file = this.$refs.erpai[idx].files[0]
          item.model = file.name
          item.file = file
        },

    }

}
</script>
