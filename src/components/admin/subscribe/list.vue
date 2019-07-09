<template>
<div>
<!-- CONFLICT -->
    <el-form :inline="true" :model="form" class="demo-form-inline">

    <el-form-item label="检疫合格证号码">
        <el-input v-model="jianyi" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="耳牌号">
        <el-input v-model="erpai" placeholder="" ></el-input>
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
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

    </el-form>

    <div>
        <el-table 
        :data="tableData"
        style="width: 100%">
            <el-table-column

				label="检疫合格证号码"

				width="120"
				prop="certificationNum">
			</el-table-column>
            <el-table-column
				label="商标耳牌号"
				width="120"
				prop="tradeMarkEartag">
			</el-table-column>
			<el-table-column
				label="免疫耳牌号"
				width="120"
				prop="immuneEartag">
			</el-table-column>
			<el-table-column
				label="栋号"
				width="120"
				prop="d">
			</el-table-column>
			<el-table-column
				label="栏号"
				width="120"
				prop="l">
			</el-table-column>
			<el-table-column
				label="羊只品类"
				width="120"
				prop="style">
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
			<el-table-column
				label="年龄"
				width="120"
				prop="age">
			</el-table-column>
			<el-table-column
				label="视频"
				width="120"
				prop="video"
				v-if="false">
			</el-table-column>
			<el-table-column
				label="操作"
				width="250">
			</el-table-column>
  </el-table>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
          tableData:[],
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
        form: {

        jianyi: '',
        erpai: '',

          
        }
        
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>