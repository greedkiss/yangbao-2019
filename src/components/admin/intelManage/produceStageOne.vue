<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.1小时内吃饱初乳，人工辅助喂奶3天</p>
		<p style="margin-left: 55px">2.手动录入产羔记录</p>
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
				tableData2:[
		
				],
				sumtext:"产羔0-5日羊只总数",
				index:6,
				period:"产羔0-5日"
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