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
import { getBreeding, findNutrition, getUserById } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import Bus from '@/components/bus.js'
 
export default {

    data () {
        return {
			tableData: [

			],
            user: {

            },
            headers: [{prop: 'ispassCheck', label: '审核状态', width: '80'},
                {prop: 'factoryName', label: '工厂名'},
                {label: '设定配种时间段', prop: 'nutritionAfterPregnancy'},
                {label: '平均日期', prop: 'averageTime'},
                {label: '配种批次', prop: 'manageFlag'},
                {label: '配种时间', prop: 'breedingTime'},
                {label: '配种后移至栏/栋', prop: 'buildingAfterBreeding'},
                {label: '母羊商标耳牌', prop: 'ramSheepTrademark'},
                {label: '种公商标耳牌', prop: 'eweSheepTrademark'},
                {label: '确定妊娠(配种后20天)', prop: 'isPregnancy'}, 
                {label: '流产记录', prop: 'remark'},     
                {label: '设定产子时间段', prop: 'prenatalImmunityTime'},
                {label: '平均日期', prop: 'manageAverageTime'},
                {label: '产子批次', prop: 'nutritionBreastFeeding'},
                {label: '产羔时间', prop: 'lambingTime'},
                {label: '产羔数量', prop: 'lambingNumber'},   
                {label: '移至待产栏/栋', prop: 'buildingToBeRelocated'},    
                {prop: 'operatorName', label: '操作人员'},
                {prop: 'professorName', label: '技术审核'},
                {prop: 'supervisorName', label: '监督执行'},
                {prop: 'professorNotPassReason', label: '审核拒绝原因'},
                {prop: 'remark', label: '备注'}
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
            if (isReqSuccessful(res)) {
                this.tableData.push( res.data.model );
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