<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.饲喂羔羊精补料至断奶后一月</p>
		<p style="margin-left: 55px">2.羔羊接种传胸疫苗</p>
	</el-card>
	<Admintable
	:index="index"
	:tableData2="tableData2"
	:tableData3="tableData3"
	:sumtext="sumtext"
	:sumtext2="sumtext2"
	:period="period">
	</Admintable>
</div>
</template>

<script>
import Admintable from '@/components/admin/intel_moretable'

export default{
	components:{
		Admintable
	},
	data(){
			return{
				index:9,
				tableData3:[
					{buildingNu:"3栏",columnNu:"3栏" , earTagNu:"G1111111" ,totalNu:"5"},
					{buildingNu:"2栏",columnNu:"3栏" , earTagNu:"G1122222" ,totalNu:"2"},
				],
				tableData2:[
					{proName:"饲喂羔羊精补料至断奶",markTag:"阶段营养"},
					{proName:"羔羊山羊传胸疫苗",markTag:"免疫档案"},
				],
				sumtext:"目前阶段羊只总数",
				sumtext2:"目前阶段羔羊只总数",
				period:"产羔21-30日"
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