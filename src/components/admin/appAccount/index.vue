<template>
    <div>
        <el-table
            v-loading="load"
            ref="table"
            tooltip-effect="light"
            class="admin-table"
            :data="tableData">
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="th.width || 200">
            </el-table-column>
            <el-table-column
                prop="id"
                label="id"
                v-if="false">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="editUser(scope.row)">编辑</span>
                        <span @click="agreeUser(scope.row)">开户</span>
                        <span @click="disAgreeUser(scope.row)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑用户" :visible.sync="changeVisible">
        <el-form :model="formChange">
            <el-form-item label="单位(个人)名称" :label-width="formLabelWidth">
                <el-input size="small" v-model="formChange.factoryName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位类型" :label-width="formLabelWidth">
                <el-input size="small" v-model="formChange.factoryType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" :label-width="formLabelWidth">
                <el-input size="small" v-model="formChange.simpleAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-input size="small" v-model="formChange.detailAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="法人姓名" :label-width="formLabelWidth">
                <el-input size="small" v-model="formChange.responsiblePersonName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input size="small" v-model="formChange.responsiblePersonPhone" auto-complete="off"></el-input>
            </el-form-item>
            
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button size="small" @click="cancleChange()">取消</el-button>
            <el-button size="small" type="primary" @click="confirmChange()">确定</el-button>
        </div>
    </el-dialog>

    <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="fetchData"
        :current-page.sync="page">
    </el-pagination>
    </div>
</template>
<script>
import { getAPPUser, deleteAPPUser, editAPPUser } from '@/util/getdata'

export default {
    data() {
        return{
            headers: [
                {label:'单位(个人)名称',prop:'factoryName'},
                {label:'单位类型',prop:'factoryType'},
                {label:'单位地址',prop:'simpleAddress'},
                {label:'详细地址',prop:'detailAddress'},
                {label:'法人姓名',prop:'responsiblePersonName'},
                {label:'是否开户',prop:'isEnable'},
                {label:'电话',prop:'responsiblePersonPhone'}
            ],
            load: true,
            tableData: [],
            formLabelWidth: '120px',
            changeVisible: false,
            page: 1,
            total: 1,
            formChange: {
                factoryName: null,
                factoryType: null,
                simpleAddress: null,
                detailAddress: null,
                responsiblePersonName: null,
                responsiblePersonPhone: null,
                isEnable: null,
                id: null
            }
        }
    },

    mounted () {
        this.fetchData()
    },

    methods: {
        fetchData() {
            let id = this.$route.params.id
            this.load = true
            getAPPUser(id , this.page - 1).then(res => {
                res.data.List.forEach((item) => {
                    if(item.isEnable == 0)
                        item.isEnable = "否"
                    else
                        item.isEnable = "是"
                });
                this.tableData = res.data.List
                this.load = false
            })
        },

        disAgreeUser(row) {
            deleteAPPUser(row.id).then(this.fetchData())
        },

        agreeUser(row) {
            if(row.isEnable == "是"){
                this.$confirm('该用户已开户', '提示', {
                    type: 'warning'
                })
            }else{
                this.load = false
                row.isEnable = 1
                let id = this.$route.params.id
                editAPPUser(id, row).then(res => {
                    this.fetchData()
                })
            }
        },

        editUser(row) {
            this.formChange = row
            this.changeVisible = true
        },

        cancleChange() {
            this.changeVisible = false
        },

        confirmChange() {
            let id = this.$route.params.id
            if(this.formChange.isEnable == "是"){
                this.formChange.isEnable = 1
            }else{
                this.formChange.isEnable = 0
            }
            editAPPUser(id, this.formChange).then(res => {
                this.fetchData()
            })
            this.changeVisible = false
        }
    }
}
</script>
<style lang="stylus">

</style>