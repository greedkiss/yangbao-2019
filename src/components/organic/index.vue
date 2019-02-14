<template>
<div class="organic">
	<header class="head">
		<div class="o_logo">
			<router-link to="/">
              <img class="logo_info" src="../../assets/imgs/newlogo.png" alt="云·羊宝（有机）山羊养殖生产管理追溯平台"/>
          </router-link>
		</div>
		<div class="o_title">
			| 云·羊宝（有机）大数据平台
		</div>
	</header>
	<div class="organic_body">
		<div class="o_left">
			<div class="area_type">

			</div>
			<div class="area_info">
				<span>地理位置</span>
				<area-cascader type='text' v-model="item.area" :level='item.level' :data="pcaa"></area-cascader>
			</div>
			
		</div>
	</div>
</div>
</template>
<script>
import pcaa from 'area-data/pcaa'
export default {
	data(){
		return{
			pcaa,
			item: {
				area: null,
				level: 0
			},

		}
	} 
}
</script>
<style lang="stylus">
.organic
	height 100%
	.head
		padding-top 20px
		text-align center
		.o_logo
			display inline
			.logo_info
				vertical-align middle
				height 60px
		.o_title
			display inline
			line-height 20px
			color #01ffff
			font-size 30px
			font-weight bold
</style>