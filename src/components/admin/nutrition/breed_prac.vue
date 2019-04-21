<template>
    <div class="breed_prac">
        <data-cur
            title="配种产子实施档案"
            modpath="nutrition/breed"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :get-data="getBreeding"
            :post-data="postBreeding"
            :update-data="updateBreeding"
            :checkFull="false"
            :isPrac="true">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getBreeding, postBreeding, updateBreeding } from '@/util/getdata'
import { getStages } from '@/util/dataselect'

export default {
    components: {
        dataCur
    },
    

    data () {
        return {
            getBreeding,
            postBreeding,
            updateBreeding,
            items: [ 
                {label: '配种阶段',  type: 'cutline'},
                {label: '设定配种时间段', model: 'nutritionAfterPregnancy', type: 'time_3'},
                {label: '平均日期', model: 'averageTime', type: 'time_2'},
                {label: '配种批次', model: 'manageFlag', type: 'number_2'},
                {label: '配种时间', model: 'breedingTime', type: 'time_2'},
                {label: '配种后移至栏/栋', model: 'buildingAfterBreeding', type: 'selectOneCrowd'},
                {label: '母羊商标耳牌', model: 'ramSheepTrademark'},
                {label: '公羊商标耳牌', model: 'eweSheepTrademark'},
                // {label: '管理批次(前后五天内配种，分批次管理)', model: 'manageFlag'},
                // {label: '批次平均分配配种日期', model: 'manageAverageTime', type: 'time_2'},   
                // {label: '执行妊娠前期营养标准(妊娠前三月)-序号', model: 'nutritionBeforePregnancy', type: 'time_2'},
                {label: '确定妊娠(配种后20天)', model: 'isPregnancy'}, 
                {label: '流产记录', model: 'remark'},                                                    
                // {label: '执行妊娠后期营养标准(妊娠后两月)-序号', model: 'nutritionAfterPregnancy',type: 'time_2'},
                // {label: '产前免疫种类(产前10|20天)', model: 'prenatalImmunityType', type: "add", index: 0},
                // {label: '产前免疫时间', model: 'prenatalImmunityTime', type: 'addTime', index: 0},
                // {label: '批次平均产羔时间', model: 'averageTime', type: 'time_2'}, 
                
                {label: '产子阶段',  type: 'cutline'},
                {label: '设定产子时间段', model: 'prenatalImmunityTime', type: 'time_3'},
                {label: '平均日期', model: 'manageAverageTime', type: 'time_2'},
                {label: '产子批次', model: 'nutritionBreastFeeding', type: 'number_2'},
                {label: '产羔时间', model: 'lambingTime', type: 'time_2'},
                {label: '产羔数量', model: 'lambingNumber', type: 'number_2'},
                {label: '移至待产栏/栋', model: 'buildingToBeRelocated', type: 'selectOneCrowd'},                               
                // {label: '执行产期营养标准(产前一周)-序号', model: 'nutritionBeforeLambing', type: 'time_2'}, 
                // {label: '对应母羊耳牌号', model: 'ramSheepTrademark'},
                // {label: '执行哺乳期营养标准(产后一周)-序号', model: 'nutritionBreastFeeding', type: 'time_2'},
                // {label: '执行羔羊代乳料营养标准(羔羊一月龄)-序号', model: 'nutritionInsteadBreastFeeding', type: 'time_2'},
                // {label: '执行断奶前母羊营养标准(断奶前一周)-序号', model: 'nutritionBeforeCutBreastFeeding', type: 'time_2'},
                // {label: '执行羔羊断奶期营养标准-序号', model: 'nutritionCutBreastFeeding', type: 'time_2'},
                
            ],

            models: {
                nutritionAfterPregnancy:[],
                averageTime: null,
                manageFlag:null,
                breedingTime: null,
                buildingAfterBreeding: null,
                ramSheepTrademark: 'M',
                eweSheepTrademark: 'G',
                // manageFlag: null,
                // manageAverageTime: null,
                // nutritionBeforePregnancy: null,
                isPregnancy: null,
                remark:null,
                // nutritionAfterPregnancy: null,
                // prenatalImmunityType: [],
                // prenatalImmunityTime: [],
                // buildingToBeRelocated: null,
                // nutritionBeforeLambing: null,
                // lambingTime: null,
                lambingNumber: null,
                // nutritionBreastFeeding: null,
                // nutritionInsteadBreastFeeding: null,
                // nutritionBeforeCutBreastFeeding: null,
                // nutritionCutBreastFeeding: null,
                // averageTime:null
                //averageTime:null,
                prenatalImmunityTime:[],
                manageAverageTime: null,
                nutritionBreastFeeding:null,
                lambingTime: null,
                buildingToBeRelocated: null,
                
            },
        }
    }
}

</script>

<style lang="stylus">

</style>


