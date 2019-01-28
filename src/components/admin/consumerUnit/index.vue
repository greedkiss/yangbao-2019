<template>
    <div>
        <data-cur
            title="消费实体客户管理"
            modpath="consumerUnit"
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
        let typesUnits = [
            {value: '活羊（只）'},
            {value: '鲜肉（公斤）'}
        ]

        let getTypeUnits = (q, cb) => {
            cb(typesUnits)
        }

        let types = [
            {value: '鲜肉'},
            {value: '餐饮'},
            {value: '熟食'},
            {value: '商超'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }
        return {
            // getFarmById,
            // postFarm,
            // updateFarm,
            items: [
                {label: '单位类型', model: 'unitStyle', type: 'select', fetchSuggestions: getType},
                {label: '单位名称', model: 'unitName'},
                {label: '单位负责人', model: 'responsiblePerson'},
                {label: '加入时间', model: 'createTime', type: 'time'},
                {label: '单位地址', model: 'unitLocation', type: 'address'},
                {label: '单位详细地址', model: 'unitaddress'},
                {label: '单位负责人', model: 'unitResponsible'},
                {label: '单位负责人电话', model: 'unitResponsiblePhone'},
                {label: '单位联系人', model: 'unitLinkman'},
                {label: '单位联系人电话', model: 'unitLinkmanPhone'},
            ],
            itemsSN: [
                {label: '当前供应', model: 'nowSupply'},
                {label: '供应单位', model: 'supplyUnits', type: 'select',fetchSuggestions: getTypeUnits},
                {label: '当前需求', model: 'nowNeed'},
                {label: '需求单位', model: 'needUnits', type: 'select',fetchSuggestions: getTypeUnits}
            ],
            models: {
                unitResponsible: null,
                unitaddress: null,
                unitResponsiblePhone: null,
                unitLinkman: null,
                unitLinkmanPhone: null,
                nowSupply: null,
                nowNeed: null,
                unitStyle: null,
                unitName: null,
                unitLocation: null,
                responsiblePerson: null,
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
