<template>
    <div>
        <admin-table
            class="breed-table"
            modpath="health"
            :getData="getDanger"
            :headers="headers"
            :isWarn="true"
            :isBreedList="true">            
        </admin-table>
    </div>
</template>

<script>
import AdminTable from '@/components/admin/breed_table'
import { getDanger } from '@/util/getdata'

export default {
    components: {
        AdminTable
    },

    data () {
        return {
            getDanger,
            headers: [
                {label: '审核状态', prop: 'ispassCheck'},
                {label: '养殖场位置', prop: 'factoryLocation'},
                {label: '养殖场', prop: 'factoryName'},
                {label: '提交时间', prop: 'gmtCreate'},
                {label: '日期', prop: 'diagnosisTime'},
                {label: '栏/栋',prop: 'buildingNum'},
                {label: '商标耳牌号', prop: 'earTag'},
                {label: '观察检测分析症状',prop: 'symptom'},
                {label: '诊断结果', prop: 'diagnosisResult'},
                {label: '治疗方案及用药剂量', prop: 'diagnosisMethod'},
                {label: '总用药量',prop: 'dose'},
                {label: '治疗效果',prop: 'treatEffect'},
                {prop: 'remark', label: '备注'},
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professorName', label: '技术审核'},
                {prop: 'supervisorName', label: '监督执行'},
                {prop: 'unpassReason', label: '审核拒绝原因'},  
                {prop: 'ispassSup', label: '监督执行状态'},  
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

