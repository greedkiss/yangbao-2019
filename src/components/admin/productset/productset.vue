<template>
    <div class="admin-form">
        <basic-info :items="items" :models.sync="models" :needBuildingInfo="false"></basic-info>
        <div class="choose-radio first-radio">
            <div class="radio-title">
                是否为本店默认出品：
            </div>
            <template>
                <div class="radio">
                    <el-radio v-model="defaultProduct" label="1">是</el-radio>
                </div>
                <div class="radio">
                    <el-radio v-model="defaultProduct" label="0">否</el-radio>
                </div>
            </template>
        </div>
        <div class="choose-radio last-radio">
            <div class="radio-title">
                是否一次性打印成品二维码：
            </div>
            <template>
                <div class="radio">
                    <el-radio v-model="printQcode" label="1">是</el-radio>
                </div>
                <div class="radio">
                    <el-radio v-model="printQcode" label="0">否</el-radio>
                </div>
            </template>
        </div>  
        <div class="footer">
            <el-button size="small" type="primary" @click="submit">提交</el-button>
        </div>    


        <template>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            label="成品种类"
            prop="dishesType"
            width="150">
            </el-table-column>
            <el-table-column
            label="成品名称"
            prop="dishesName"
            width="150">
            </el-table-column>
            <el-table-column
            label="羊肉用量（克/份）"
            width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.mutton*1000}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="默认图片"
            prop="name"
            width="150">
                <template slot-scope="scope">
                    <el-button type="text" @click="openDialog(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
            label="设为本店默认出品"
            prop="isEnable"
            width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.isEnable == 0">否</span>  
                    <span v-else>是</span>
                </template>
            </el-table-column>
            <el-table-column
            label="批量打印"
            prop="isDisposable"
            width="150">
                <template slot-scope="scope">
                    <span v-if="scope.row.isDisposable == 0">否</span>  
                    <span v-else>是</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <div class="block" style="margin-left: 46px">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="getDetailed" :current-page.sync="page">
            </el-pagination>
        </div>

        </template>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>展示图片</span>
        <img :src="showPicSrc" alt="">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import { isReqSuccessful} from '@/util/jskit'
import BasicInfo from '@/components/admin/basic_info'
import { getUserById,getSetPrdocut,setProduct,deleteProduct } from '@/util/getdata'

export default {
    components: {
        BasicInfo
    },

    data () {
        let types = [           // 菜品种类
            {value: '粉面'},
            {value: '包饺'},
            {value: '火锅/汤锅'},
            {value: '小炒'},
            {value: '煮卤炖拌蒸'},
            {value: '腊干腌干'},
            {value: '鲜肉'}
        ]
        let getType = (q, cb) => {
            cb(types)
        }
        return {
            items: [       
                {
                label: '出品类型',
                model: 'finish_type',
                type: 'select',
                fetchSuggestions: getType,
            },
                //{label: '成品种类', type: 'text', model: 'finish_type'},
                {label: '成品名称', type: 'text', model: 'finish_name'},
                {label: '羊肉用量（克/份）', type: 'text', model: 'value'},
                {label: '上传默认图片：',model: 'file',type: 'file'}
            ],
            models: {
                finish_type: '',    // 菜品种类
                finish_name: '',    // 菜品名称
                value: '',          // 菜品种类
                file: null            // 默认图片
            },
            defaultProduct: '0',    // 默认产品
            printQcode: '0',        // 一次性打印二维码
            dishesId: -1,           // 菜品Id
            tableData: [],      
            dialogVisible: false,    // 对话框
            showPicSrc: '',     // 查看图片的src
            total: 10,      // 一页的内容
            page: 1,    // 当前页数
            restaurantId: null,     // 餐厅id
            rId: null
        }
    },
    mounted() {
        // 获取id
        let id = this.$route.params.id;
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                console.log(res.data)
				this.user = res.data.model
                this.rId = this.restaurantId = this.user.userFactory
                console.log(this.restaurantId,this.rId)
            } else {
                this.$message.error('获取店铺失败');
            }
        }).then(this.getDetailed);
    },
    methods: {
        // 提交表单
      submit() {
          let form = new FormData();
          form.append('file',this.models.file);
          form.append('restaurantId',this.restaurantId);
          form.append('id',Number(this.dishesId));
          form.append('dishesType',this.models.finish_type);
          form.append('dishesName',this.models.finish_name);
          form.append('mutton',String(parseFloat(this.models.value)/1000));
          form.append('isEnable',Number(this.defaultProduct));
          form.append('isDisposable',Number(this.printQcode));
          let headers= {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl+ '/dishes/addDishes',{
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res=>{
                    let body = await res.json()
                    console.log(body);
                    if(isReqSuccessful(body)) {
                        this.$message.success('操作成功')
                    }
                    this.dishesId = -1
                    this.getDetailed()
                })
          this.models.finish_type = '';
          this.models.finish_name = '';
          this.models.value = '';
          this.defaultProduct = '0';
          this.printQcode = '0';
          this.id = null;
          console.log(this.tableData);
      },
      // 编辑菜品
      handleEdit(index, row) {
        //console.log(index, row);
        this.models.finish_type = row.dishesType;
        this.models.finish_name = row.dishesName;
        this.models.value = parseFloat(row.mutton)*1000;
        this.models.file = row.picture;
        this.defaultProduct = String(row.isEnable);
        this.printQcode = String(row.isDisposable);
        this.dishesId = row.id;
      },
      // 删除数据
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log(row.id);
            deleteProduct({
                id: String(row.id)
            }).then(res => {
                console.log(res);
                if (isReqSuccessful(res)) {
                    let code = res.meta.code;
                    if(code === 0) {
                        this.$message.success('删除成功');
                    } else {
                        this.$message.error('删除失败');
                    }
                }
                this.models.finish_type = '';
                this.models.finish_name = '';
                this.models.value = '';
            }).then(this.getDetailed());
        }).catch(() => {
          this.$message({ 
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 获取表格数据
        getDetailed(){
            let page = this.page - 1,size = 10;
            getSetPrdocut(this.rId,page,size).then(res => {
                if (isReqSuccessful(res)) {
                    console.log(res.data);
                    this.total = res.data.data.total;
                    this.tableData = res.data.data.list; 
                } else {
                    this.$message.error('获取数据失败');
                }
                console.log(this.tableData);
            })           
        },
        // 关闭页面
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      openDialog(index,row) {
          this.dialogVisible = true;
          this.showPicSrc = row.picture;
      }
    }
}
</script>

<style lang="stylus">
.choose-radio
    float left
    border-bottom  1px solid #2891d1
    padding: 10px
    box-sizing border-box

.first-radio
    width 35%
    border-left 1px solid #2891d1

.last-radio
    width 65%    
    border-right 1px solid #2891d1

.radio-title
    display inline-block

.radio
    width 50px
    display inline-block

.footer
    display flex
    width 100%
    height 60px
    justify-content center
    align-items center
</style>