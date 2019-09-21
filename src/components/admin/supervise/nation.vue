<template>
    <certification :getType="fetchSuggestions" :isBreed="true" :needBuildingInfo="true"></certification>
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
            {value: '土壤检测报告'},
            {value: '水质检测报告'},
            {value: 'ISO质量管理体系认证'},
            {value: '食品安全管理体系认证'},
            {value: '空气检测报告'}
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