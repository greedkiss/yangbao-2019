<template>
	<mediaShow
		:isDiagnose="false"
		:conditions="conditions"
        :isSale="true"
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
                {value: 'date', label: '日期'},
                {value: 'uploader', label: '上传人'}
            ],
        }
    },
    methods:{
        
    }
}
</script>