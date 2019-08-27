<template>
    <div>
        <data-cur
            title="疫病防治实施档案"
            modpath="prevention"
            @update:models="v => models = v"
            :models.sync="models"
            :symptom="models.symptom"
            :items="items"
            :get-illness="getIllness"
            :has-remark="true"
            :get-data="getPrevention"
            :post-data="postPrevention"
            :update-data="updatePrevention" 
            >
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getPrevention, postPrevention, updatePrevention,getIllness} from '@/util/getdata'
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
            getIllness,
            items: [
                {label: '日期', type: 'time', model: 'diagnosisTime'},
                {label: '栏/栋', model: 'buildingNum', type: 'selectCrowd'},
                {label: '商标耳牌号', model: 'earTag',type:'selectEartag'},
                {label: '观察检测分析症状',model: 'symptom',mr: 1},
                {label: '诊断结果' ,type:'illnessSearch', model: 'diagnosisResult' },
                {label: '治疗方案及用药剂量', model: 'diagnosisMethod'},
                {label: '总用药量',model: 'dose', mr: 1},
                {label: '治疗效果', model: 'treatEffect'}
            ],
            models: {
                diagnosisTime: null,
                buildingNum: null,
                earTag: null,
                symptom:null,
                diagnosisResult:null,
                diagnosisMethod: null, 
                dose: null,
                treatEffect: null,
               
            }
        }
    }
}
</script>
