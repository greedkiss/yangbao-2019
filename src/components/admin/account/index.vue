<template>
    <div class="user-table">
        <el-button @click="addUser">添加用户</el-button>

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
                :width="th.width || 150">
            </el-table-column>
            <el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <span @click="changeUser(scope.$index)">编辑</span>
                        <span @click="deleteUser(scope.$index)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加用户" :visible.sync="dialogVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.realname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <div style="padding-left: 49px">
                    <span>角色名称</span>
                    <el-select style="padding-left:10px;padding-bottom: 30px" v-model="form.roleId" placeholder="选择角色名称">
                        <el-option
                            v-for="(item, i) in roleOptions"
                            :key="i"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="padding-left: 49px">
                    <span>单位类型</span>
                    <el-select style="padding-left:10px;padding-bottom: 30px" v-model="form.unit" placeholder="选择单位类型" @change="change">
                        <el-option-group
                          v-for="group in unitOptions"
                          :key="group.label"
                          :label="group.label">
                          <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item"
                            >
                          </el-option>
                        </el-option-group>
                    </el-select>
                </div>
                <div v-if="show.farm" style="padding-left: 50px">
                <span>单位名称</span>
                <el-select v-if="show.farm" size="small" v-model="form.factoryId" filterable placeholder="选择养殖单位" style="padding-left: 10px">
                        <el-option
                            v-for="(item, i) in factoryOptions"
                            :key="i + 'factory'"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                </el-select>
                </div>
                <div v-if="show.slaughter" style="padding-left: 50px">
                <span>单位名称</span>
                <el-select v-if="show.slaughter" size="small" v-model="form.factoryId" filterable placeholder="选择屠宰加工单位" style="padding-left: 10px">
                        <el-option
                            v-for="(item, i) in customerOptions"
                            :key="i + 'factory'"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                </el-select>
                </div>
                <div v-if="show.consumer" style="padding-left: 50px">
                <span>单位名称</span>
                <el-select v-if="show.consumer" size="small" v-model="form.factoryId" filterable placeholder="选择消费店单位" style="padding-left: 10px">
                        <el-option
                            v-for="(item, i) in customerOptions"
                            :key="i + 'factory'"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                </el-select>
                </div>
                <div v-if="show.self" style="padding-left: 50px">
                <span>单位名称</span>
                <el-select v-if="show.self" size="small" v-model="form.factoryId" filterable placeholder="选择代理单位" style="padding-left: 10px">
                        <el-option
                            v-for="(item, i) in agentOptions"
                            :key="i + 'factory'"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                </el-select>
                </div>
            </el-form>

            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button size="small" @click="cancle()">取消</el-button>
                <el-button size="small" type="primary" @click="confirm()">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="changeVisible">
            <el-form :model="formChange">
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input size="small" v-model="formChange.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <div style="padding-left: 49px">
                    <span>角色名称</span>
                    <el-select style="padding-left:10px;padding-bottom: 30px" v-model="formChange.roleId" placeholder="选择角色名称">
                        <el-option
                            v-for="(item, i) in roleOptions"
                            :key="i"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
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
import AdminTable from '@/components/admin/table'
import { getRoles, getUserById, getUsers, deleteUser, postUser, getFactories, getAgentUnit, getFactoryUnit, getFactoryUsers, getNameByType, getRoleName } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import { validatePassword, validateTelephone, validateUsername } from '@/util/validate'
import md5 from 'md5'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            agentRank: null,
            roleOptions:[],
            customerOptions: [],
            unitOptions: [{
                label: "养殖厂",
                options:[{
                        label: "养殖厂",
                        value: "0"
                    }]
                },
                {
                    label: "屠宰加工厂",
                    options:[{
                        label: "屠宰厂",
                        value: "1"
                    },
                    {
                        label: "加工厂",
                        value: "2"
                    }]
                },
                {
                    label: "消费实体店",
                    options:[{
                        label: "鲜肉",
                        value: "3"
                    },
                    {
                        label: "熟食",
                        value: "4"
                    },
                    {
                        label: "餐饮",
                        value: "5"
                    },
                    {
                        label: "商超",
                        value: "6"
                    }]
                },
                {
                    label: "代理单位",
                    options: [{
                        label: "代理单位",
                        value: "7"
                    }]
                },
                {
                    label: "本单位用户",
                    options: [{
                        label: "本单位用户",
                        value: "8"
                    }]
                }
            ],
            form: {
                username: null,
                realname: null,
                telephone: null,
                password: null,
                flag: 0,
                factoryId: null,
                factoryName: '',
                roleId: null,
                unit: null,
                unitName: null,
                roleName: null
            },
            formChange: {
                telephone: null,
                roleName: null
            },
            formLabelWidth: '120px',
            dialogVisible: false,
            changeVisible: false,
            headers: [
                {label: '单位', prop: 'factoryName'},
                {label: '用户名', prop: 'pkUserid'},
                {label: '用户姓名', prop: 'userRealname'},
                {label: '角色名', prop: 'roleName'},
                {label: '角色编号', prop: 'userRole'},
                {label: '手机号', prop: 'userTelephone'},
                {label: '办公电话', prop: 'officialPhone'},
                {label: 'qq', prop: 'qq'},
                {label: '微信', prop: 'msn'}
            ],
            // 代理单位
            agentOptions: [],
            // 羊场单位
            factoryOptions: [],
            isAgentEmpty: false,
            isFactoryEmpty: false,
            user: null,

            tableData: [],
            load: false,
            page: 1,
            total: 1,
            isAdmin: false,
            //单位选择
            show: {
                farm: false,
                slaughter: false,
                consumer: false,
                self: false
            }
        }
    },

    mounted () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                // 系统管理员暂时为 userRole: 3
                this.isAdmin = res.data.userRole === 3
                this.agentRank = res.data.agentRank
            }
        }).then(this.fetchData)
        // 获取代理单位
        getAgentUnit().then(res => {
            if (isReqSuccessful(res)) {
                if (res.data.List && !res.data.List.length) {
                    this.isAgentEmpty = true
                    return
                }
                res.data.List.forEach((item) => {
                    let option = {
                        value: item.id,
                        label: item.agentName
                    }
                    this.agentOptions.push(option)
                })
            }
        }, _ => {
            this.$message.error('获取代理单位失败')
        })
        // 获取羊场单位
        getFactoryUnit().then(res => {
            if (isReqSuccessful(res)) {
                if (res.data.List && !res.data.List.length) {
                    this.isFactoryEmpty = true
                    return
                }
                res.data.List.forEach((item) => {
                    let option = {
                        value: item.id,
                        label: item.breedName
                    }
                    this.factoryOptions.push(option)
                })
            }
        }, _ => {
            this.$message.error('获取羊场单位失败')
        })
    },


    methods: {
        getByType(){
            getNameByType({type: this.form.unitName}).then(res => {
                this.customerOptions = []
                res.data.list.forEach(v => {
                    this.customerOptions.push({label: v.name, value: v.id})
                })
            })
        },
        change(item){
            this.form.factoryId = null
            this.form.unitName = item.label
            if(item.value == 0){
                this.show.slaughter = false
                this.show.consumer = false
                this.show.farm = true
                this.show.self = false
            }
            else if(item.value ==1 || item.value == 2){
                this.show.farm = false
                this.show.consumer =false
                this.show.slaughter = true
                this.show.self = false
                this.getByType()
            }
            else if(item.value == 3 || item.value == 4 || item.value == 5 || item.value ==6){
                this.show.farm = false
                this.show.slaughter = false
                this.show.consumer = true
                this.show.self = false
                this.getByType()
            }
            else if(item.value == 7){
                this.show.farm =false
                this.show.slaughter = false
                this.show.consumer = false
                this.show.self = true
            }
            else if(item.value == 8){
                this.show.farm =false
                this.show.slaughter = false
                this.show.consumer = false
                this.show.self = false
            }
        },

        cancle () {
            this.form = {}
            this.dialogVisible = false
        },

        cancleChange () {
            this.formChange = {}
            this.changeVisible = false
        },

        async fetchData () {
            this.load = true
            let res = await getFactoryUsers(this.user.userFactory, {page: this.page - 1})
            this.tableData = res.data.List
            this.total = res.data.size
            this.load = false
        },

        deleteUser (index) {
            this.$confirm('将永久删除此用户, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                let id = this.tableData[index].id
                deleteUser(id).then(res => {
                    if (isReqSuccessful(res)) {
                        this.fetchData()
                        this.$message.success('删除成功!')
                    }
                })
            }).catch(() => {
                return false
            })
        },

//编辑用户
        changeUser(index){
            this.changeVisible = true
            getRoleName().then(res => {
                if (isReqSuccessful(res)) {
                    this.roleOptions = []
                    for (let v of res.data.model) {
                        this.roleOptions.push({
                            label: v.roleName,
                            value: v.roleId
                        })
                    }
                }
            })
            if(this.isAdmin){
                let obj = {
                            label: "系统管理员",
                            options: [{
                                label: "系统管理员",
                                value: "9"
                                }]
                        }
                this.unitOptions.push(obj)
            }
        },

        // 添加用户
        addUser () {
            this.dialogVisible = true
            this.roleOptions = []
            getRoleName(this.agentRank, {size: 100}).then(res => {
                if (isReqSuccessful(res)) {
                    for (let v of res.data.model) {
                        this.roleOptions.push({
                            label: v.roleName,
                            value: v.roleId
                        })
                    }
                }
            })
            if(this.isAdmin){
                let obj = {
                            label: "系统管理员",
                            options: [{
                                label: "系统管理员",
                                value: "9"
                                }]
                        }
                this.unitOptions.push(obj)
            }
        },
        // 提交
        confirm () {
            //通过unit判断flag flag=0为养殖场 flag=1为代理单位 flag=2为系统管理员 flag=3为本单位用户 flag=4为屠宰加工消费实体(为了兼容之前接口)
            let value = this.form.unit.value
            if(value == 0)
                this.form.flag = 0
            else if(value == 1 || value == 2 || value == 3 || value == 4 || value == 5 || value == 6)
                this.form.flag = 4
            else if(value == 7)
                this.form.flag = 1
            else if(value == 8)
                this.form.flag = 3
            else if(value == 9)
                this.form.flag = 2
            // 设置 factoryName
            let flag = this.form.flag
            if(flag === 2) {
                this.form.factoryName = '系统管理员'
            } else if(flag === 1) {
                let len = this.agentOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.agentOptions[i].value) {
                        this.form.factoryName = this.agentOptions[i].label
                        break
                    }
                }
            } else if (flag === 0) {
                let len = this.factoryOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.factoryOptions[i].value) {
                        this.form.factoryName = this.factoryOptions[i].label
                        break
                    }
                }
            } else if (flag === 3) {
                this.form.factoryId = this.user.userFactory
                this.form.factoryName = this.user.factoryName
            } else if (flag === 4){
                let len = this.customerOptions.length
                for(let i=0; i<len; i++) {
                    if(this.form.factoryId === this.customerOptions[i].value) {
                        this.form.factoryName = this.customerOptions[i].label
                        break
                    }
                }
            }

            let warn = this.$message.warning
            let { username, realname, telephone, password, factoryId } = this.form
            let valUs = validateUsername(username)
            if (!username) {
                warn('请输入用户名')
                return
            }
            if (valUs !== true) {
                warn(valUs)
                return
            }
            if (!realname) {
                warn('请输入用户姓名')
                return
            }
            let valPh = validateTelephone(telephone)
            if (telephone && valPh !== true) {
                warn(valPh)
                return
            }
            let valPas = validatePassword(password)
            if (valPas !== true) {
                warn(valPas)
                return
            }
            if (factoryId === null) {
                warn('请选择单位')
                return   
            }

            this.form.password = md5(this.form.password)
            postUser(this.form).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    // 添加成功后 用户名 用户姓名 手机号置空
                    this.form = {}
                    this.fetchData()
                }
                this.dialogVisible = false
            }, _ => {
                this.dialogVisible = false
                // 添加成功后置空密码
                this.form.password = ''
                this.$message.error('添加用户失败')
            })
        }
    }
}
</script>

<style lang="stylus">
.user-table
    >.el-button
        margin-bottom 15px

    .el-dialog
        width 600px
        .el-input
            width 300px
        .el-select
            .el-input
                width 300px
    .el-input__inner
        height 32px
</style>
