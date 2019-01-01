<template>
    <div>
        <admin-table
            modpath="category"
            :has-unpass="false"
            :has-sup="false"
            :no-prac="true"
            :hide-filter="true"
            :getData="getCategorys"
            :deleteData="deleteCategory"
            :headers="headers">
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import { getCategorys, deleteCategory } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            deleteCategory,
            getCategorys,
            headers: [
                {prop: 'varietyName', label: '品种名',width: 100},
                {prop: 'description', label: '品种介绍',width: 600},
                {prop: 'origin', label: '品种产地',width: 350},
                {prop: 'remark', label: '备注',width: 100}
            ]
        }
    }
}
</script>
