<template>
    <div>
        <admin-table
            modpath="nutrition/sele"
            :getData="getAllSele"
            :deleteData="deleteSele"
            :headers="headers"
            
            :isSlaughterManageList="true"
            :hideEartagFilter="true"
            >            
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
                {label: '免疫耳牌号', prop: 'immuneEartag'},
                {label: '商标耳牌号', prop: 'EarTag'},
                {label: '检疫合格证编号', prop: 'quarNumber'},
                {label: '养殖场', prop: 'farm'},
                {label: '货主', prop: 'master'},
                {label: '羊只品种', prop: 'kind'},

                {label: '附属物编号', prop: 'affNumber'},
                {label: '附属物重量', prop: 'affWeight'},
                {label: '附属物视频', prop: 'affVideo'},

                {label: '胴体编号', prop: 'carNumber'},
                {label: '胴体重量', prop: 'carWeight'},
                {label: '胴体视频', prop: 'carVideo'},

                {label: '时间', prop: 'slaughterTime'},
                {label: '操作者', prop: 'operator'},

             ]
        }
    }
}
</script>


