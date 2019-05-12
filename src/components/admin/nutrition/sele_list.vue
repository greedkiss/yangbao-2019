<template>
    <div>
        <admin-table
            modpath="nutrition/sele"
            :getData="getAllSele"
            :deleteData="deleteSele"
            :headers="headers"
            :isSeleList="true">            
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import {deleteSele, getAllSele } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getAllSele,
            deleteSele,
    headers: [
                {prop: 'factoryName', label: '工厂名'},
                {label: '商标耳牌', prop: 'eartagOfFather'},
                {label: '品种', prop: 'fatherTypeName'},
                {label: '颜色', prop: 'fatherColor'},

                {label: '商标耳牌号', prop: 'eartagOfMother'},
                {label: '品种', prop: 'motherTypeName'},
                {label: '颜色', prop: 'motherColor'},
                {label: '胎次', prop: 'manageFlag'},
                {label: '产羔时间', prop: 'breedingTime'},
                {label: '产羔数量', prop: 'lambingNumber'},

                {label: '初生体重', prop: 'newbornWeight'},
                {label: '公/母', prop: 'sex'},
                {label: '羔羊耳号', prop: 'trademarkEartag'},
                
                {label: '断奶重', prop: 'ablactationWeight'},
                {label: '体高', prop: 'ablactationHeight'},   
                {label: '体长', prop: 'ablactationLength'},
                {label: '胸围', prop: 'ablactationBust'},                                                
                {label: '体重', prop: 'sixMonthWeight'},
                {label: '体高', prop: 'sixMonthBodyHeight'},
                {label: '体长', prop: 'sixMonthBodyLength'},   
                {label: '胸围',  prop: 'sixMonthBust'},                               
                {label: '体重', prop: 'twelveMonthWeight'}, 
                {label: '体高', prop: 'twelveMonthHeight'},   
                {label: '体长', prop: 'twelveMonthLength'},     
                {label: '胸围', prop: 'twelveMonthBust'},  
             ]
        }
    }
}
</script>


