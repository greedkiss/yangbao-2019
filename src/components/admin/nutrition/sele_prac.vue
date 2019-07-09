<template>
    <div class="breed_sele">
        <data-cur
            title="育种选育实施档案"
            modpath="nutrition/sele"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :get-data="getSele"
            :post-data="postSele"
            :update-data="updateSele"
            :checkFull="false">
        </data-cur>
    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { getSele, postSele, updateSele } from '@/util/getdata'
import { getStages } from '@/util/dataselect'

export default {
    components: {
        dataCur
    },
    data () {
     var str1
     var str2
     if(this.$route.query.ramSheepTrademark==undefined){
         str1=''
     }
     else{
         str1=this.$route.query.ramSheepTrademark.substr(1)
     }
     if(this.$route.query.eweSheepTrademark==undefined){
         str2=''
     }
     else{
         str2=this.$route.query.eweSheepTrademark.substr(1)  
     }
        let types = [
            {value: '白'},
            {value: '黄'},
            {value: '黑'},
            {value: '黑白花'},
            {value: '白麻'},
            {value: '黑麻'},
            {value: '黄麻'},
            {value: '黄白花'}
        ]

        let getType = (q, cb) => {
            cb(types)
        }
        return {
            getSele,
            postSele,
            updateSele,
            items:[
                {label: '母羊商标耳牌', model: 'girlEarTag'},
                {label: '公羊商标耳牌', model: 'boyEarTag'},
                {label: '羔羊耳号', model: 'trademarkEarTay' },
                {label: '栋/栏', model: 'building', type: 'selectOneCrowd'},
                {label: '颜色', model: 'sex', type: 'select',fetchSuggestions: getType},
                {label: '初生体重', model: 'newbornWeight'},

                {label: '60天',  type: 'cutline'},
                {label: '断奶重', model: 'ablactationWeight'}, 
                {label: '体高', model: 'ablactationHeight'}, 
                {label: '体长', model: 'ablactationLength'}, 
                {label: '胸围', model: 'ablactationBust'},

                {label: '180天',  type: 'cutline'},
                {label: '体重', model: 'sixMonthWeight'}, 
                {label: '体高', model: 'sixMonthBodyHeight'}, 
                {label: '体长', model: 'sixMonthBodyLength'}, 
                {label: '胸围', model: 'sixMonthBust'}, 

                {label: '360天',  type: 'cutline'},
                {label: '体重', model: 'twelveMonthWeight'}, 
                {label: '体高', model: 'twelveMonthHeight'}, 
                {label: '体长', model: 'twelveMonthLength'}, 
                {label: '胸围', model: 'twelveMonthBust'}, 
            ],
            
            models: {
                girlEarTag:'M'+str1,
                boyEarTag:'G'+str2,
                trademarkEarTay: null,
                building: null,
                sex:null,
                newbornWeight:null,
                ablactationWeight:null,
                ablactationHeight:null,
                ablactationLength:null,
                ablactationBust:null,
                sixMonthWeight:null,
                sixMonthBodyHeight:null,
                sixMonthBodyLength:null,
                sixMonthBust:null,
                twelveMonthWeight:null,
                twelveMonthHeight:null,
                twelveMonthLength:null,
                twelveMonthBust:null,
                },  
        }
    },
}
</script>

<style lang="stylus">

</style>
