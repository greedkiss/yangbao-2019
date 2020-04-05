<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.录入系谱档案、存栏档案、免疫档案等生产管理档案，按公母、大小、健康进行分栏</p>
		<p style="margin-left: 55px">2.羊只下车第1天应激营养调理（见方案）</p>
		<p style="margin-left: 55px">3.第2-4天羊应激营养、饲喂（见方案）</p>
		<p style="margin-left: 55px">4.第5天后羊应激营养、饲喂（见方案）</p>
	</el-card>
	<Admintable
	:tableData2="tableData2"
	:sumtext="sumtext"
	:index="index"
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
				tableData2:[
					{proName:"系谱档案初始录入",markTag:"系谱档案"},
					{proName:"第1天羊只下车应激营养调理",markTag:"阶段营养档案"},
					{proName:"第2-4天羊应激营养、饲喂"},
					{proName:"第5天后羊应激营养、饲喂"},
				],
				sumtext:"引种期羊只总数",
				index:1,
				period:"引种应激期"
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