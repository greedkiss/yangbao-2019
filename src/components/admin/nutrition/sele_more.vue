<template>
    <div class="breed_more">
        <el-table 
            ref="table"
            tooltip-effect="dark"
            class="admin-table"
            :data="tableData"
            @cell-click="cellClick"
            @header-click="headerClick"
            >
            <el-table-column
                show-overflow-tooltip
                v-for="(th, i) in headers"
                :key="i"
                align='center'
                :prop="th.prop"
                :label="th.label"
                :width="100"
            >
            </el-table-column>
        </el-table>
        
        <el-button type="primary"  @click="$router.back()">返回</el-button>
    </div>
</template>

<script>
import { updateSele, findNutrition, getUserById } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import Bus from '@/components/bus.js'

export default {

    data () {
        return {
			tableData: [],
            user: {

            },
            headers: [
                {label: '母羊商标耳牌', prop: 'girlEarTag'},
                {label: '公羊商标耳牌', prop: 'boyEarTag'},
                {label: '羔羊耳号', prop: 'trademarkEarTay' },
                {label: '栋/栏', prop: 'building'},
                {label: '颜色', prop: 'sex'},
                {label: '初生体重', prop: 'newbornWeight'},

                {label: '断奶重', prop: 'ablactationWeight'}, 
                {label: '体高', prop: 'ablactationHeight'}, 
                {label: '体长', prop: 'ablactationLength'}, 
                {label: '胸围', prop: 'ablactationBust'},

                {label: '体重', prop: 'sixMonthWeight'}, 
                {label: '体高', prop: 'sixMonthBodyHeight'}, 
                {label: '体长', prop: 'sixMonthBodyLength'}, 
                {label: '胸围', prop: 'sixMonthBust'}, 

                {label: '体重', prop: 'twelveMonthWeight'}, 
                {label: '体高', prop: 'twelveMonthHeight'}, 
                {label: '体长', prop: 'twelveMonthLength'}, 
                {label: '胸围', prop: 'twelveMonthBust'}, 

            ],
        }
	},

    methods: {
        cellClick( row, column, cell ) {
            let text = cell.innerText         
            findNutrition({
                time: text,
                factoryNumber: this.tableData[0].factoryNumber
            }).then(res => {
                if (isReqSuccessful(res)) {
                   if ( res.data.List.length == 0 ) {
                        this.$message.info('未找到对应的数据');
                   } else {
                       this.tableData_2 = res.data.List;
                   }    
                } else {
                    this.$message.error(res.data.errMessage[0].defaultMessage)
                }
            });
        },
        headerClick( column, event) {
            console.log( column)
        }
    },
    
	mounted() {	
        let id = this.$route.query.more
        getBreeding(id).then(res => {
            this.tableData = []
            if (isReqSuccessful(res)) {
                this.tableData.push( res.data.model )
            }
        });
    },

    created () {
        
    },
}
</script>

<style lang="stylus">
.breed_more
    .table-title
        text-align center
        margin-top 50px
    .admin-table-2 
        margin-top 20px
    .el-button
        display: block;
        margin: 20px auto;    
    .el-table
        .cell
            cursor pointer
</style>