<template>
    <div>
        <admin-table
            class="breed-table"
            modpath="sheepSaleManage/sheepSaleOrder"
            :getData="getAllOrder"
            :deleteData="deleteOrder"
            :headers="headers"
            :isListSale="true"
            :isSaleOrder="true">            
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import { getAllOrder,deleteOrder} from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllOrder,
            deleteOrder,
            headers: [
                {label: '订单ID', prop: 'id'},
                {label: '订单状态', prop: 'state'},
                {label: '养殖场', prop: 'sourceFactoryName'},
                {label: '客户单位', prop: 'destinationFactoryName'},
                {label: '总重量', prop: 'totalWeight'},
                {label: '数量', prop: 'count'},
                {label: '耳牌号', prop: 'trademark'},
                {label: '订单生成时间', prop: 'saleTime'},
                {label: '价格', prop: 'price'},
                {label: '负责人', prop: 'responsiblePerson'}, 
                {label: '负责人联系方式', prop: 'responsiblePersonPhone'} 
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

