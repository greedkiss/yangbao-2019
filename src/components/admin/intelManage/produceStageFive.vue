<template>
<div>
	<el-card class="box-card">
		<p>操作提醒:</p>
		<p style="margin-left: 55px">1.母羊驱虫：伊维菌素+阿苯达唑</p>
		<p style="margin-left: 55px">2.羔羊驱虫：伊维菌素+阿苯达唑</p>
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
				index:10,
				tableData3:[
					{buildingNu:"3栏",columnNu:"3栏" , earTagNu:"G1111111" ,totalNu:"5"},
					{buildingNu:"2栏",columnNu:"3栏" , earTagNu:"G1122222" ,totalNu:"2"},
				],
				tableData2:[
					{proName:"母羊驱虫：伊维菌素+阿苯达唑",markTag:"驱虫档案"},
					{proName:"羔羊驱虫：伊维菌素+阿苯达唑",markTag:"驱虫档案"},
				],
				sumtext:"目前阶段母羊只总数",
				sumtext2:"目前阶段羔羊只总数",
				period:"产羔31-40日"
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