<template>
<div>
	<el-input v-model="textOne" placeholder="请输入内容"></el-input>
	<el-input v-model="textTwo" placeholder="请输入内容"></el-input>
	<el-input v-model="textThree" placeholder="请输入内容"></el-input>
	<el-button @click="submit">提交</el-button>
</div>
</template>
<script>
export default{
	data(){
		return{
			textOne:null,
			textTwo:null,
			textThree:null
		}
	},
	methods: {
		submit(){
			console.log(1)
		}
	}
}
</script>
<style lang="stylus">
	
</style>