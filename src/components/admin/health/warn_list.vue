<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- 选择省市区及日期区间 -->
            <el-form-item label="省/市/区" >
            <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            change-on-select>
            </el-cascader>
            </el-form-item>
            <el-form-item>
            <span class="demonstration">日期区间</span>
            <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
            </el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button @click="fetchData()" size="small" type="primary">查询</el-button>
            <el-button @click="export2xls()" size="small" type="primary" icon="el-icon-download">导出表格</el-button>
            </el-form-item>
            </el-form>
        <admin-table
            name='疫病预警'
            modpath="healthy"
            has-common-header
            has-common-tail-header
            :headers="headers"
            releaseType="false"
            :needBuildingInfo="true"> 
        </admin-table>   
    </div>
</template>

<script>
import AdminTable from '@/components/admin/table'
import dataCur from '@/components/admin/common/dataCUR'
import { regionDataPlus } from 'linxl-element-region'

export default {
    components: {
        AdminTable,
        dataCur
    },

    data () {
        return {
            pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
            options: regionDataPlus,
            selectedOptions: [],
            headers: [
                {label: '养殖场位置', prop: 'factoryPlace', width: '200'},
                {label: '日期', prop: 'diagnosisTime', width: '200'},
                {label: '栏/栋',prop: 'buildingNum'},
                {label: '商标耳牌号', prop: 'earTag'},
                {label: '观察检测分析症状',prop: 'symptom'},
                {label: '诊断结果', prop: 'diagnosisResult'},
                {label: '治疗方案及用药剂量', prop: 'diagnosisMethod'},
                {label: '总用药量',prop: 'dose'},
                {label: '治疗效果',prop: 'treatEffect'},
                {prop: 'remark', label: '备注', width: '200'}
            ]
        }
    },
    methods: {
      handleChange (value) {
        console.log(value)
      },
      
    }
}
</script>
