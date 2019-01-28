<template>
    <div>
        <admin-table
            modpath="slaughter"
            :has-unpass="false"
            :has-sup="false"
            :no-prac="true"
            :hide-filter="true"
            :isUnit="true"
            :isSlaughter="true"
            :headers="headers"
            :getData="getSlaughter"
            :deleteData="deleteSlaughter"
            >
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getSlaughter, deleteSlaughter } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getSlaughter,
            deleteSlaughter,
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
            ]
        }
    }
}
</script>
