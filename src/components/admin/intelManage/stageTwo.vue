<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.母羊饲喂云羊宝妊娠后期饲料</p>
		<p style="margin-left: 55px">2.母羊驱虫：伊维菌素+阿苯达唑、吡喹酮两者间隔10天执行，口服不得超量</p>
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
					{proName:"母羊饲喂云羊宝妊娠后期饲料",markTag:"阶段营养"},
					{proName:"驱虫：伊维菌素+阿苯达唑",markTag:"驱虫档案"},
					{proName:"驱虫：吡喹酮",markTag:"驱虫档案"},
				],
				sumtext:"妊娠第四个月羊只总数",
				index:4,
				period:"妊娠第四月"
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