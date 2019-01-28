<template>
    <div>
        <admin-table
            modpath="consumerUnit"
            :has-unpass="false"
            :has-sup="false"
            :no-prac="true"
            :hide-filter="true"
            :headers="headers"
            >
            <!-- :getData="getFarms"
            :deleteData="deleteFarm"
             -->
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
// import { getFarms, deleteFarm } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            // getFarms,
            // deleteFarm,
            headers: [
                {prop: 'unitId', label: '单位编号'},
                {prop: 'unitStyle', label: '单位类型'},
                {prop: 'upId', label: '上级代理编号'},
                {prop: 'unitName', label: '单位名称'},
                {prop: 'unitLocation', label: '单位地理位置'},
                {prop: 'responsiblePersonName', label: '单位负责人'},
                {prop: 'responsiblePersonPhone', label: '单位负责人电话'},
                {prop: 'linkmanName', label: '联系人'},
                {prop: 'linkmanPhone', label: '联系人电话'},
                {prop: 'linkmanId', label: '单位负责人编号'},
                {prop: 'nowSupply', label: '当前供应量'},
                {prop: 'nowneed', label: '当前需求量'},
                {prop: 'inTime', label: '加入时间'}
            ]
        }
    }
}
</script>
