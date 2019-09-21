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
            :isPrac="true"
            :needBuildingInfo="true">
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
                {label: '确定妊娠(配种后20天)', model: 'isPregnancy'}, 
                {label: '流产记录', model: 'remark'},  
                
                {label: '产子阶段',  type: 'cutline'},
                {label: '设定产子时间段', model: 'prenatalImmunityTime', type: 'time_3'},
                {label: '平均日期', model: 'manageAverageTime', type: 'time_2'},
                {label: '产子批次', model: 'nutritionBreastFeeding', type: 'number_2'},
                {label: '产羔时间', model: 'lambingTime', type: 'time_2'},
                {label: '产羔数量', model: 'lambingNumber', type: 'number_2'},
                {label: '移至待产栏/栋', model: 'buildingToBeRelocated', type: 'selectOneCrowd'},
            ],

            models: {
                nutritionAfterPregnancy:[],
                averageTime: null,
                manageFlag:null,
                breedingTime: null,
                buildingAfterBreeding: null,
                ramSheepTrademark: 'M',
                eweSheepTrademark: 'G',
               
                isPregnancy: null,
                remark:null,
                lambingNumber: null,
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


