<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.执行育肥阶段饲料营养方案</p>
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
				index:16,
				tableData2:[
					{proName:"育肥阶段饲料营养方案",markTag:"阶段营养"},
				],
				sumtext:"育肥前期羊只总数",
				period:"育肥前期"
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