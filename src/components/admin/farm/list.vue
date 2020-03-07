<template>
    <div>
        <admin-table
            modpath="farm"
            :has-unpass="false"
            :has-sup="false"
            :no-prac="true"
            :hide-filter="true"
            :searchEnable="true"
            :getData="getFarms"
            :deleteData="deleteFarm"
            :searchMethod="searchFtyInfo"
            :headers="headers"
            :labelOption="labelOption">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getFarms, deleteFarm, searchFtyInfo } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getFarms,
            deleteFarm,
            searchFtyInfo,
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
            ]
        }
    }
}
</script>
