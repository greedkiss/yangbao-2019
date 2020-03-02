<template>
    <div>
        <data-cur
            title="羊场管理"
            modpath="farm"
            :update-submitter="$route.query.edit > 0"
            is-agent
            :models.sync="models"
            :items="items"
            :hasRemark="false"
            :hasRecommand="true"
            :get-data="getFarmById"
            :post-data="postFarm"
            :update-data="updateFarm"
            :needBuildingInfo="true">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { postFarm, updateFarm, getFarmById } from '@/util/getdata'
import { addressToArray } from '@/util/jskit'

export default {
    components: {
        dataCur
    },

    mounted () {
        if(this.$route.query.app){
            this.models.breedName = localStorage.getItem("APP_factoryName")
            this.models.responsiblePersonId = localStorage.getItem("APP_responsiblePersonName")
            this.models.breedLocationDetail = localStorage.getItem("APP_detailAddress")
            this.models.breedLocation = addressToArray(localStorage.getItem("APP_simplyAddress"))
            localStorage.removeItem("APP_responsiblePersonName")
            localStorage.removeItem("APP_detailAddress")
            localStorage.removeItem("APP_simplyAddress")
            localStorage.removeItem("APP_factoryName")
        }
    },

    data () {
        return {
            getFarmById,
            postFarm,
            updateFarm,
            items: [
                {label: '羊场编号', model: 'pkNumber'},
                {label: '羊场名称', model: 'breedName'},
                {label: '羊场地理位置', model: 'breedLocation', type: 'address'},
                {label: '羊场详细位置', model: 'breedLocationDetail'},
                {label: '羊场负责人', model: 'responsiblePersonId', mr: 1},
                // {label: '消毒场所', model: 'disinfectP'},
                {label: '加入时间', model: 'createTime', type: 'time'}
            ],
            models: {
                pkNumber: null,
                breedName: null,
                breedLocation: null,
                breedLocationDetail: null,
                responsiblePersonId: null,
                // disinfectP: null,
                createTime: null,
                remark: null
            }
        }
    }
}
</script>
