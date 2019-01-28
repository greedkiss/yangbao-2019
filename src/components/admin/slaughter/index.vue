<template>
    <div>
        <data-cur
            title="屠宰加工客户管理"
            modpath="slaughter"
            :update-submitter="$route.query.edit > 0"
            is-agent
            :isSuper="true"
            :models.sync="models"
            :items="items"
            :hasRemark="false"
            :hasUnitRecommand="true"
            :post-data="insertSlaughter"
            :get-data="getSlaughterById"
            >
            <!-- 
            :update-data="updateFarm" -->

        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { insertSlaughter, getSlaughterById} from '@/util/getdata'

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
        return {
            getSlaughterById,
            insertSlaughter,
            // updateFarm,
            items: [
                {label: '单位类型', model: 'type', type: 'select', fetchSuggestions: getType},
                {label: '单位名称', model: 'name'},
                {label: '单位负责人', model: 'chargePerson' , mr: 1},
                {label: '单位地址', model: 'simpleAddress', type: 'address'},
                {label: '加入时间', model: 'inDate', type: 'time'}
            ],
            models: {
                type: null,
                name: null,
                chargePerson: null,
                simpleAddress: null,
                inDate: null,
                introduction: null
            }
        }
    }
}
</script>
