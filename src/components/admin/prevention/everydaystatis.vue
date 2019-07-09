<template>
    <div>
        <admin-table
            class="breed-table"
            modpath="prevention"
            :getData="geteveryDay"
            :headers="headers"
            :isBreedList="true"
            :isStatis="true">            
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import { geteveryDay } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            geteveryDay,
            headers: [
                {label: '名称', prop: 'name'},
                {label: '总数', prop: 'sum'},
                {label: '日期', prop: 'statisticsDate'},
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

