<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.后备种羊布病筛查</p>
		<p style="margin-left: 55px">2.饲喂云羊宝有机种羊料</p>
	</el-card>
	<Admintable
	:index="index"
	:tableData2="tableData2"
	:sumtext="sumtext"
	:period="period">
	</Admintable>
</div>
</template>

<script>
import Admintable from '@/components/admin/intel_table'

export default{
	components:{
		Admintable
	},
	data(){
			return{
				index:14,
				tableData2:[
					{proName:"种羊营养",markTag:"阶段营养"},
					{proName:"布病检测",markTag:"免疫档案"},
				],
				sumtext:"育种一阶段羊只总数",
				period:"育种一期"
			}
		},
}
</script>

<style lang="stylus">
.box-card
	p
	   color #2891d1
	   font-size 15px
</style>