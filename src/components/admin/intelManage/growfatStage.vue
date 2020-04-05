<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.伊维菌素+阿苯达唑、吡奎酮,间隔10天灌服</p>
		<p style="margin-left: 55px">2.三联四防疫苗、口蹄疫疫苗,间隔10天分别注射</p>
		<p style="margin-left: 55px">3.育肥至300天可以出栏</p>
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
				index:17,
				tableData2:[
					{proName:"三联四防疫苗",markTag:"免疫档案"},
					{proName:"伊维菌素+阿苯达唑",markTag:"驱虫档案"},
					{proName:"口蹄疫疫苗",markTag:"免疫档案"},
					{proName:"吡奎酮",markTag:"驱虫档案"}, 
				],
				sumtext:"直线育肥期羊只总数",
				period:"直线育肥期"
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