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


