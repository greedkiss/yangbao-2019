<template>
    <div class="auth-role">
        <el-button @click="addUserVisible = true">添加角色</el-button>
        <el-table
            v-loading="load"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="typeName"
                label="角色名"
                align="center"
                width="240">
            </el-table-column>
            <el-table-column
                prop="id"
                label="角色编号"
                align="center"
                width="240">
            </el-table-column>
            <el-table-column
                prop="roleDescription"
                label="角色说明"
                align="center">
            </el-table-column>
            <el-table-column align="center" width="160" label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="preEdit(scope.$index)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="hanldeDeleteRole(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="fetchRoles"
            :current-page.sync="page">
        </el-pagination>

        <el-dialog
            class="role-dialogue"
            :before-close="handleClose"
            :visible.sync="addUserVisible"
            :model="rules"
            width="50%"
            center>
            <el-input v-model="typeName" size="small">
                <template slot="prepend">角色名:</template>
            </el-input>
            <el-input v-model="roleDescription" size="small">
                <template slot="prepend">角色说明:</template>
            </el-input>
            <div class="rules" v-for="(item, i) in items" :key="i">
                <el-checkbox v-model="checkAll[i]" @change="handleCheckAllChange(item, i)">
                    <span v-text="i"></span>
                </el-checkbox>
                <el-checkbox-group v-model="rules">
                    <template>
                        <el-checkbox v-for="(info, j) in item" :label="changeType(info.permitId)" :key="j">
                            <span v-text="info.permitName"></span>
                        </el-checkbox>
                    </template>
                </el-checkbox-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancle()">取消</el-button>
                <el-button size="small" type="primary" @click="submit()">提交</el-button>
            </div>
        </el-dialog>

        <h3>员工角色</h3>
        <div class="employee">
            员工
            <el-select size="small" v-model="userid" placeholder="请选择">
                <el-option
                    v-for="(item, i) in empOptions"
                    :key="'emo' + i"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            角色
            <el-select size="small" v-model="userrole" placeholder="请选择">
                <el-option
                    v-for="(item, i) in roleOptions"
                    :key="i"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-button size="small" type="primary" @click="updateEmployee()">提交/更新</el-button>
        <h3>角色合并</h3>
        <div class="employee">
            角色一
            <el-select size="small" v-model="roleFirst" placeholder="请选择">
                <el-option
                    v-for="(item, i) in roleOptions"
                    :key="i"
                    :label="item.label"
                    :value="item">
                </el-option>
            </el-select>
            角色二
            <el-select size="small" v-model="roleSecond" placeholder="请选择">
                <el-option
                    v-for="(item, i) in roleOptions"
                    :key="i"
                    :label="item.label"
                    :value="item">
                </el-option>
            </el-select>
            新角色名称
            <el-input v-model="roleNew" placeholder="输入角色名称" class="newRole"></el-input>
        </div>
        <el-button size="small" type="primary" @click="mergeEmployee()">合并/提交</el-button>
    </div>
</template>

<script>
import { isReqSuccessful } from '@/util/jskit'
import { getUserById, getRoles, getUsers, getRoleDetail, getFactoryUsers, postRole, deleteRole, updateRole, updateUserRole, getPermit, mergeRole } from '@/util/getdata'

export default {
    watch: {
        userid (newId) {
            this.userrole = this.empOptions.find(v => v.value === newId).role
        }
    },

    data () {
        return {
            load: false,
            page: 1,
            total: 1,

            userid: null,
            userrole: null,
            roleNew: null,
            empOptions: [],
            roleOptions: [],

            roleFirst: null,
            roleSecond: null,

            typeName: '',
            roleDescription: '',
            rules: [],

            tableData: [],
            addUserVisible: false,
            checkAll: [],
            items: []
        }
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                this.user.agentRank = res.data.agentRank
            }
        }).then(_ => {
            getRoles(this.user.agentRank, {size: 100}).then(res => {
                if (isReqSuccessful(res)) {
                    for (let v of res.data.List) {
                        this.roleOptions.push({
                            label: v.typeName,
                            value: v.id
                        })
                    }
                }
            })
        }).then(_ => {        
            getFactoryUsers(this.user.userFactory).then(res => {
                if (isReqSuccessful(res)) {
                    for (let v of res.data.List) {
                        this.empOptions.push({
                            label: v.pkUserid,
                            value: v.id,
                            role: v.userRole
                        })
                    }
                }
            })
        }).then(this.fetchRoles).then(_ => {
            getPermit().then(res =>{
                this.items = res.data.List
            })
        })
    },

    methods: {
        handleClose (done) {
            this.editId = this.typeName = this.roleDescription = null
            this.rules = []
            done()
        },

        cancle () {
            this.editId = this.typeName = this.roleDescription = null
            this.rules = []
            this.addUserVisible = false
        },

        hanldeDeleteRole (idx) {
            this.$confirm('将永久删除此条记录, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[idx].id
                deleteRole(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('删除成功')
                        this.fetchRoles()
                    }
                })
            }).catch(() => {
                return false
            })
        },

        updateEmployee () {
            updateUserRole(this.userid, this.userrole).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('修改员工角色成功')
                }
            }, _ => {
                this.$message.error('修改员工角色失败')
            })
        },

        fetchRoles () {
            this.load = true
            getRoles(this.user.agentRank, {page: this.page - 1}).then(res => {
                if (isReqSuccessful(res)) {
                    this.tableData = res.data.List
                    this.total = res.data.size
                    this.roleOptions= []
                    for (let v of res.data.List) {
                        this.roleOptions.push({
                            label: v.typeName,
                            value: v.id
                        })
                    }
                }
                this.load = false
            }, _ => {
                this.$message.error('获取角色失败')
                this.load = false
            })

        },

        submit () {
            let { typeName, roleDescription } = this
            if (!typeName) {
                this.$message.warning('请填写角色名')
                return
            }
            if (!roleDescription) {
                this.$message.warning('请填写角色说明')
                return
            }
            if (!this.rules.length) {
                this.$message.warning('请赋予角色权限')
                return
            }

            let data = {
                roleDescription,
                typeName,
                rolePermit: this.rules
            }
            if (!this.editId) {
                postRole(data).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('添加角色成功')
                        this.tableData.unshift({
                            id: res.data.model,
                            typeName,
                            roleDescription,
                            rolePermit: this.rules
                        })
                        if (this.tableData.length > 10) {
                            this.tableData.pop()
                        }
                        this.typeName = this.roleDescription = null
                        this.rules = []
                    }
                    this.addUserVisible = false
                }, _ => {
                    this.$message.success('添加角色失败')
                    this.addUserVisible = false
                })
            } else {
                updateRole(this.editId, data).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('修改角色成功')
                        this.typeName = this.roleDescription = null
                        this.rules = []
                        this.fetchRoles()
                    }
                    this.addUserVisible = false
                }, _ => {
                    this.$message.error('修改角色失败')
                    this.addUserVisible = false
                })
            }
        },

        preEdit (idx) {
            let data = this.tableData[idx]
            let { id, typeName, roleDescription } = data
            this.editId = id
            this.typeName = typeName
            this.roleDescription = roleDescription
            this.rules = data.rolePermit
            this.addUserVisible = true
        },

        handleCheckAllChange (item, idx) {
            item.forEach((info, i) => {
                let value = info.permitId.toString()
                if(!this.rules.includes(value)){
                    if(this.checkAll[idx])
                        this.rules.push(value)
                 }
                if (!this.checkAll[idx]) 
                    this.rules.splice(this.rules.indexOf(value), 1)
            })
        },

        mergeEmployee(){
            if(this.roleFirst == null || this.roleSecond == null){
                this.$message.warning('填写完整信息!')
            }else{
                let merge = this.roleFirst.label + '-' +this.roleSecond.label
                let data = {'roleName': this.roleNew, 'roleDescription': merge}
                mergeRole(this.roleFirst.value, this.roleSecond.value, data).then(res=> {
                    if(isReqSuccessful(res)){
                        this.$message.success("角色合并成功")
                        this.fetchRoles()
                    }
                })
            }
        },

        changeType(item){
            return item.toString()
        }
    }
}
</script>

<style lang="stylus">
.auth-role
    .rules
        margin 10px
        .el-input input
            width 30%

    .employee
        .el-select
            margin-right 30px
            margin-bottom 20px
        &+.el-button
            background-color c=#f78989
            border-color c
        .newRole
            width 20%
            .el-input__inner
                height 32px

    .role-dialogue
        .el-dialog__body
            >.el-input
                margin-bottom 10px

    >.el-button
        margin-bottom 15px
</style>
