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
            modpath="farm"
            :has-unpass="false"
            :has-sup="false"
            :no-prac="true"
            :hide-filter="true"
            :getData="getFarms"
            :deleteData="deleteFarm"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getFarms, deleteFarm } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getFarms,
            deleteFarm,
            headers: [
                {prop: 'agentName', label: '上级代理名称'},
                {prop: 'agent', label: '上级代理编号'},
                {prop: 'pkNumber', label: '羊场编号'},
                {prop: 'breedName', label: '羊场名称'},
                {prop: 'breedLocation', label: '羊场地理位置', width: 250},
                {prop: 'responsiblePersonName', label: '羊场负责人'},
                {prop: 'id', label: '羊场ID'},
                // {prop: 'disinfectP', label: '消毒场所'}
            ],
            labelOption: [
                {label: "上级代理名称", value: "0"},
                {label: "羊场名称", value: "1"},
                {label: "羊场负责人", value: "2"}
            ],
            searchInfo: {
                labelName: null,
                searchName: null
            }
        }
    }
}
</script>
