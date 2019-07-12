<template>
<div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="">
        <el-input v-model="form.jianyi" size="small" placeholder="">
          <template slot="prepend">免疫合格证号:</template>
        </el-input>
    </el-form-item>
    <el-form-item label="">
        <el-input v-model="form.erpai" size="small" placeholder="" >
          <template slot="prepend">耳牌号:</template>
        </el-input>
    </el-form-item>
    <el-form-item>
            <span class="demonstration">日期区间</span>
            <el-date-picker
            size="small"
              v-model="form.gmtCreate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              align="right">
            </el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
    </el-form-item>
    </el-form>
    <div>
        <el-table 
        :data="tableData"
        style="width: 100%">
            <el-table-column
				label="免疫合格证号码"
				width="150"
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
				label="时间"
				width="120"
				prop="times">
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
				v-if="true">
			</el-table-column>
			<el-table-column
                class="action"
                fixed="right"
                label="操作"
                align='center'
                width="250">
                <template slot-scope="scope">
                    <div class="opr" >
                        <template>
                            <span @click="syn()" >同步视频</span>
                            <span @click="Upload()">上传</span>
                            <span @click="wheight()">同步体重</span>
                            <span @click="edit()">编辑</span>
                        </template>
                    </div>
                </template>
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
          value1: '',
          value2: '',
          form: {
          jianyi: '',
          erpai: '',
          gmtCreate:''
          }
        
      }
    },
    methods: {
      onSubmit() {
        let param={
          jianyi:this.form.jianyi,
          erpai:this.form.erpai,
          gmtCreate:this.form.gmtCreate
        };
        if(param.jianyi==''&&param.erpai==''&&param.gmtCreate==''){
          this.$message.warning('请完善表单信息！');
        }else{
          console.log('成功');
        }
        
      },
      syn(){

      },
      Upload(){

      },
      wheight(){

      },
      edit(){
        
      }
    }
  }
</script>