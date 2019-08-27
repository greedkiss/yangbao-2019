<template>
    <certification :getType="fetchSuggestions" :isSlaughter="true"></certification>
</template>
<script>
import certification from '@/components/admin/mediaCommon/certification'
export default{
    components: { 
        certification
    },
    data(){
        let types = [
            {value: '营业执照'},
            {value: '防预条件许可证'},
            {value: '羊只检疫合格证'},
            {value: '品质证书'},
            {value: '食品安全管理体系认证'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }
        return{
            fetchSuggestions: getType
        }

    }
}
</script>