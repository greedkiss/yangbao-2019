<template>
    <div>
        <admin-table
            class="breed-table"
            modpath="nutrition/breed"
            :getData="getAllBreeding"
            :deleteData="deleteBreeding"
            :headers="headers"
            :isListSale="true">            
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import { getAllBreeding, deleteBreeding } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllBreeding,
            deleteBreeding,
            headers: [
                {label: '订单ID', prop: 'orderID'},
                {label: '养殖场ID', prop: 'farmID'},
                {label: '目的厂ID', prop: 'factoryID'},
                {label: '商标耳牌号', prop: 'sheepEarNumber'},
                {label: '总重量', prop: 'sumweight'},
                {label: '数量', prop: 'sums'},
                {label: '订单生成时间', prop: 'orderID'},
                {label: '价格', prop: 'price'},
                {label: '负责人', prop: 'manger'}, 
                {label: '负责人联系方式', prop: 'tele'} 
            ]  
        }
    }
}
</script>

<style lang="stylus" scoped>
.breed_sele
    position relative
    .form-info 
        position: absolute;
        width: 40%;
        right: 8%;
        bottom: 268px;
    .form-summary
        height: 730px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    .el-input-group
        width: 445px !important;
    .time 
        display: flex;
    .admin-form .time 
        .time-span
            width: auto; 
            padding-right: 20px; 
        .el-input
            width: auto;         
            flex-grow: 1;
</style>

