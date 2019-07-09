<template>
    <div>
        <admin-table
            class="breed-table"
            modpath="nutrition/breed"
            :getData="getAllBreeding"
            :deleteData="deleteBreeding"
            :headers="headers"
            :isBreedList="true">            
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
                {prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '养殖场'},
                {label: '设定配种时间段', prop: 'nutritionAfterPregnancy'},
                {label: '平均日期', prop: 'averageTime'},
                {label: '配种批次', prop: 'manageFlag'},
                {label: '配种时间', prop: 'breedingTime'},
                {label: '配种后移至栏/栋', prop: 'buildingAfterBreeding'},
                {label: '母羊商标耳牌', prop: 'ramSheepTrademark'},
                {label: '种公商标耳牌', prop: 'eweSheepTrademark'},
                {label: '确定妊娠(配种后20天)', prop: 'isPregnancy'}, 
                {label: '流产记录', prop: 'remark'},     
                {label: '设定产子时间段', prop: 'prenatalImmunityTime'},
                {label: '平均日期', prop: 'manageAverageTime'},
                {label: '产子批次', prop: 'nutritionBreastFeeding'},
                {label: '产羔时间', prop: 'lambingTime'},
                {label: '产羔数量', prop: 'lambingNumber'},   
                {label: '移至待产栏/栋', prop: 'buildingToBeRelocated'},    
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professorName', label: '技术审核'},
                {prop: 'supervisorName', label: '监督执行'},
                {prop: 'professorNotPassReason', label: '审核拒绝原因'},  
                {prop: 'remark', label: '备注'}
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

