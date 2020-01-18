<template>
    <div class="admin-form">
        <div class="card" >
            <p class="card-title" >操作流程管理</p>

            <div class="border-main">
                <div class="proSetWrapper">
                    <span>操作流程设置:</span>
                    <div class="checkBoxWrapper">
                        <el-checkbox v-model="subscribe" label="认购" border></el-checkbox>
                        <el-checkbox v-model="beforeSlaughter" label="屠宰前" border></el-checkbox>
                        <el-checkbox v-model="slaughter" label="屠宰" border></el-checkbox>
                        <el-checkbox v-model="segment" label="分割"  border></el-checkbox>
                        <el-checkbox v-model="stock" label="入库销售"  border></el-checkbox>
                    </div>
                </div>
                <div class="proSetWrapper">
                    <span>分割设置:</span>
                    <div class="checkBoxWrapper">
                        <el-checkbox v-model="notSegment" label="不分割" border></el-checkbox>
                        <el-checkbox v-model="twoSegment" label="二分体分割" border></el-checkbox>
                        <el-checkbox v-model="detailSegment" label="细分" border></el-checkbox>
                    </div>

                </div>
                <div class="proSetWrapper">
                    <span>细分设置:</span>
                    <div class="checkBoxWrapper">
                        <el-checkbox v-model="qiantui" label="前腿" border></el-checkbox>
                        <el-checkbox v-model="houtui" label="后退" border></el-checkbox>
                        <el-checkbox v-model="huangguatiao" label="黄瓜条" border></el-checkbox>
                        <el-checkbox v-model="yaoji" label="腰肌" border></el-checkbox>
                        <el-checkbox v-model="datui" label="大腿" border></el-checkbox>
                        <el-checkbox v-model="leipai" label="肋排" border></el-checkbox>
                        <el-checkbox v-model="furou" label="腹肉" border></el-checkbox>
                        <el-checkbox v-model="jianjia" label="肩胛" border></el-checkbox>
                        <el-checkbox v-model="waiji" label="外肌" border></el-checkbox>
                        <el-checkbox v-model="liji" label="里脊" border></el-checkbox>
                    </div>

                </div>
                
            </div>
        </div>

        <div class="admin-send" >
                <template >
                    <el-button type="primary" @click="submit()">提交</el-button>
                </template>
        </div>

    </div>
</template>

<script>
import { isReqSuccessful} from '@/util/jskit'
import {getUserById} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

//getSlaughterManage
export default {
    components: {
    },
    mounted(){
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model    
            }
        })
    },
    data () {
        return {
            user:null,
            subscribe:false,
            beforeSlaughter:false,
            slaughter:false,
            segment:false,
            stock:false,
            notSegment:false,
            twoSegment:false,
            detailSegment:false,
        }
    },
    computed:{
     },
    methods:{
    }
}
</script>

<style scope lang="stylus">
    .proSetWrapper
        margin-top 20px
        .checkBoxWrapper
            margin-top 10px      
</style>
