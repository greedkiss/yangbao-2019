<template>
	<mediaShow
		:isDiagnose="true"
		:conditions="conditions"
	>
	</mediaShow>
</template>
<script>
import mediaShow from '@/components/admin/mediaCommon/mediaShow'

export default {
    components: {
        mediaShow
    },

    data () {
        return {
            conditions: [
                {value: 'all', label: '所有数据'},
                {value: 'expert', label: '专家名'},
                {value: 'date', label: '日期'},
                {value: 'brand', label: '商标耳牌'},
                {value: 'vaccine', label: '检疫耳牌'},
                {value: 'symptom', label: '症状'},
                {value: 'uploader', label: '上传人'}
            ],
        }
    }
}
</script>