<template>
    <div>
        <data-cur
            title="屠宰加工客户管理"  
            modpath="slaughter"
            is-agent
            :isSuper="true"
            :models.sync="models"
            :items="items"
            :hasRemark="false"
            :hasUnitRecommand="true"
            :post-data="insertSlaughter"
            :get-data="getSlaughterById"
            :update-data="updateSlaughter"
            :update-unit="$route.query.edit > 0"
            :isProduce="false"
            :isCustomer="true"
            :needBuildingInfo="true"
            >
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { addressToArray } from '@/util/jskit'
import { insertSlaughter, getSlaughterById, updateSlaughter } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    mounted() {
        if(this.$route.query.app){
            this.models.name = localStorage.getItem("APP_factoryName")
            this.models.chargePerson = localStorage.getItem("APP_responsiblePersonName")
            this.models.simpleAddress = addressToArray(localStorage.getItem("APP_simplyAddress"))
            localStorage.removeItem("APP_responsiblePersonName")
            localStorage.removeItem("APP_detailAddress")
            localStorage.removeItem("APP_simplyAddress")
            localStorage.removeItem("APP_factoryName")
        }
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
            updateSlaughter,
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
