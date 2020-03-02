<template>
    <div>
        <el-select v-model="searchInfo.labelName" placeholder="请选择查询信息" style="padding-left: 11px;width: 150px">
            <el-option 
                v-for="(item, i) in labelOption"
                :key="i"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchInfo.searchName"
            style="width: 150px">
        </el-input>
        <el-button @click="searchUser">查询</el-button>
        <admin-table
            modpath="consumer"
            :has-unpass="false"
            :has-sup="false"
            :no-prac="true"
            :hide-filter="true"
            :headers="headers"
            :isUnit="true"
            :isSlaughter="false"
            :getData="getConsumer"
            :deleteData="deleteConsumer"
            >
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getConsumer, deleteConsumer } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getConsumer,
            deleteConsumer,
            headers: [
                {prop: 'id', label: '单位编号'},
                {prop: 'type', label: '单位类型'},
                {prop: 'supAgentId', label: '上级代理编号'},
                {prop: 'name', label: '单位名称'},
                {prop: 'unitLocation', label: '单位地理位置'},
                {prop: 'chargePerson', label: '单位负责人'},
                {prop: 'chargePersonPhone', label: '单位负责人电话'},
                {prop: 'contactPerson', label: '联系人'},
                {prop: 'contactPersonPhone', label: '联系人电话'},
                {prop: 'chargePersonId', label: '单位负责人编号'},
                {prop: 'nowSupply', label: '当前供应量'},
                {prop: 'nowNeed', label: '当前需求量'},
                {prop: 'inDate', label: '加入时间'}
            ],
            labelOption: [
                {label: "单位名称", value: "0"},
                {label: "单位负责人", value: "1"}
            ],
            searchInfo: {
                labelName: null,
                searchName: null
            }
        }
    }
}
</script>
