<template>
    <div>
        <admin-table
            modpath="getSlaughter/list"
            :getData="getSlaughterAppendageList"
            :headers="headers"
            :isSlaughterManageList="true"
            :hideEartagFilter="true"
            :isAppendage="true"
            >            
        </admin-table>
    </div>
    
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import {deleteAppendage, getSlaughterAppendageList } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getSlaughterAppendageList,
    headers: [
                {prop: 'factoryName', label: '工厂名'},
                //{label: '免疫耳牌号', prop: 'immuneNumber'},
                {label: '商标耳牌号', prop: 'fatherNumber'},
                // {label: '检疫合格证编号', prop: 'quarNumber'},
                // {label: '养殖场', prop: 'breedName'},
                // {label: '货主', prop: 'goodman'},
                // {label: '羊只品种', prop: 'type'},

                {label: '附属物编号', prop: 'appendageNumber'},
                {label: '附属物重量', prop: 'appendageWeight'},
                {label: '附属物照片', prop: 'appendageVideo'},

                // {label: '胴体编号', prop: 'kidNumber'},
                // {label: '胴体重量', prop: 'kidWeight'},
                // {label: '胴体照片', prop: 'kidVideo'},

                {label: '时间', prop: 'slaughterTime'},
                {label: '操作者', prop: 'operatorName'},

             ]
        }
    }
}
</script>


