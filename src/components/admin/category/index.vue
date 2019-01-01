<template>
    <div>
      <data-cur
        title="品种管理"
        modpath="category"
        :update-submitter="$route.query.edit > 0"
        :models.sync="models"
        :hasNote="true"
        :get-data="getCategory"
        :post-data="postCategory"
        :update-data="updateCategory"
        :items="items">
      </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getCategory, postCategory, updateCategory } from '@/util/getdata'

export default {
    components: {
        dataCur
    },

    data () {
        return {
            getCategory,
            postCategory,
            updateCategory,
            items: [
                {label: '品种名', model: 'varietyName'},
                {label: '品种产地', model: 'origin'},
            ],
            models: {
                varietyName: null,
                origin: null,
                remark: null,
                description: null
            }
        }
    }
}
</script>
