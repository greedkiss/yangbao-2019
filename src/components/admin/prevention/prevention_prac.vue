<template>
    <div>
        <data-cur
            title="疫病防治实施档案"
            modpath="prevention"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="true"
            :get-data="getPrevention"
            :post-data="postPrevention"
            :update-data="updatePrevention">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getPrevention, postPrevention, updatePrevention } from '@/util/getdata'
import { getDieaseTypes} from '@/util/jskit'
export default {
    components: {
        dataCur
    },

    data () {
        return {
            getPrevention,
            postPrevention,
            updatePrevention,
            items: [
                {label: '日期', type: 'time', model: 'diagnosisTime'},
                {label: '单位选择', model: 'style', type: 'selectStyle',mr: 1},
                {label: '栏/栋', model: 'buildingNum', type: 'selectCrowd'},
                {label: '商标耳牌号', model: 'earTag',type:'selectEartag'},
                {label: '观察检测分析症状',model: 'symptom',mr: 1},
                {label: '诊断结果', model: 'diagnosisResult' ,type: 'select' ,fetchSuggestions: getDieaseTypes },
                {label: '治疗方案及用药剂量', model: 'diagnosisMethod'},
                {label: '总用药量',model: 'dose', mr: 1},
                {label: '治疗效果', model: 'treatEffect'}
            ],
            models: {
                style: null,
                diagnosisMethod: null,
                buildingNum: null,
                diagnosisResult: null,
                symptom:null,
                diagnosisTime: null,
                earTag: null,
                treatEffect: null,
                dose: null,
                remark: null
            }
        }
    }
}
</script>
