<template>
    <div>
        <data-cur
            title="消费实体客户管理"
            modpath="consumer"
            is-agent
            :models.sync="models"
            :isSuper="true"
            :items="items"
            :hasRemark="false"
            :hasUnitRecommand="true"
            :post-data="insertConsumer"
            :get-data="getConsumerById"
            :update-data="updateConsumer"
            :update-unit="$route.query.edit > 0"
            :isProduce= "false"
            >
            <!-- 
            :update-data="updateFarm" -->
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { addressToArray } from '@/util/jskit'
import { insertConsumer, getConsumerById, updateConsumer } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    mounted () {
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
            {value: '鲜肉'},
            {value: '餐饮'},
            {value: '熟食'},
            {value: '商超'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }
        return {
            insertConsumer,
            getConsumerById,
            updateConsumer,
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
