<template>
    <div>
        <data-cur
            title="屠宰加工客户管理"
            modpath="slaughterUnit"
            :update-submitter="$route.query.edit > 0"
            is-agent
            :models.sync="models"
            :items="items"
            :hasRemark="false"
            :hasUnitRecommand="true"
            :isInfomChange="true"
            :isProduce="true"
            :hasSuNe="true"
            :itemsSN="itemsSN"
            :modelsSN.sync="modelsSN"
            :get-data="getSlaughterUnit"
            :isCustomer="true"
            :post-data="updateSlaughterUnit"
            :needBuildingInfo="false"
            >
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getSlaughterUnit, updateSlaughterUnit} from '@/util/getdata'

export default {
    components: {
        dataCur
    },
    data () {
        let types = [
            {value: '屠宰厂'},
            {value: '加工厂'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }

        let typesUnits = [
            {value: '活羊（只）'},
            {value: '鲜肉（公斤）'}
        ]

        let getTypeUnits = (q, cb) => {
            cb(typesUnits)
        }
        return {
            getSlaughterUnit,
            updateSlaughterUnit,
            // updateFarm,
            items: [
                {label: '单位类型', model: 'type', type: 'select', fetchSuggestions: getType},
                {label: '单位名称', model: 'name'},
                {label: '加入时间', model: 'inDate', type: 'time'},
                {label: '单位地址', model: 'simpleAddress', type: 'address'},
                {label: '单位详细地址', model: 'detailAddress'},
                {label: '单位负责人', model: 'chargePerson'},
                {label: '单位负责人电话', model: 'chargePersonPhone'},
                {label: '单位联系人', model: 'contactPerson'},
                {label: '单位联系人电话', model: 'contactPersonPhone'},
            ],
            itemsSN: [
                {label: '当前供应', model: 'output'},
                {label: '供应单位', model: 'outputUnit', type: 'select',fetchSuggestions: getTypeUnits},
                {label: '当前需求', model: 'demand'},
                {label: '需求单位', model: 'demandUnit', type: 'select',fetchSuggestions: getTypeUnits}
            ],
            models: {
                type: null,
                name: null,
                simpleAddress: null,
                chargePerson: null,
                inDate: null,
                remark: null,
                unitResponsible: null,
                detailAddress: null,
                chargePersonPhone: null,
                contactPerson: null,
                contactPersonPhone: null,
            },
            modelsSN: {
                output: null,
                demand: null,
                outputUnit: null,
                demandUnit: null
            }
        }
    }
}
</script>
