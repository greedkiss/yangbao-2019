<template>
    <div>
        <data-cur
            title="养殖客户管理"
            modpath="farmUnit"
            :update-submitter="$route.query.edit > 0"
            is-agent
            :models.sync="models"
            :items="items"
            :hasRemark="false"
            :hasUnitRecommand="true"
            :hasSuNe="true"
            :itemsSN="itemsSN"
            :modelsSN="modelsSN"
            >
            <!-- :get-data="getFarmById"
            :post-data="postFarm"
            :update-data="updateFarm" -->
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
// import { postFarm, updateFarm, getFarmById } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        let types = [
            {value: '活羊（只）'},
            {value: '鲜肉（公斤）'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }
        return {
            // getFarmById,
            // postFarm,
            // updateFarm,
            items: [
                {label: '羊场编号', model: 'pkNumber'},
                {label: '羊场名称', model: 'breedName'},
                {label: '羊场地理位置', model: 'breedLocation', type: 'address'},
                {label: '羊场详细位置', model: 'breedLocationDetail'},
                {label: '羊场负责人', model: 'responsiblePersonId'},
                // {label: '消毒场所', model: 'disinfectP'},
                {label: '加入时间', model: 'createTime', type: 'time'},
                {label: '单位负责人', model: 'unitResponsible'},
                {label: '单位负责人电话', model: 'unitResponsiblePhone'},
                {label: '单位联系人', model: 'unitLinkman'},
                {label: '单位联系人电话', model: 'unitLinkmanPhone'},
            ],
            itemsSN: [
                {label: '当前供应', model: 'nowSupply'},
                {label: '供应单位', model: 'supplyUnits', type: 'select',fetchSuggestions: getType},
                {label: '当前需求', model: 'nowNeed'},
                {label: '需求单位', model: 'needUnits', type: 'select',fetchSuggestions: getType}
            ],
            models: {
                unitResponsible: null,
                unitResponsiblePhone: null,
                unitLinkman: null,
                unitLinkmanPhone: null,
                nowSupply: null,
                nowNeed: null,
                pkNumber: null,
                breedName: null,
                breedLocation: null,
                breedLocationDetail: null,
                responsiblePersonId: null,
                // disinfectP: null,
                createTime: null,
                remark: null
            },
            modelsSN: {
                supplyUnits: null,
                needUnits: null
            }
        }
    }
}
</script>
