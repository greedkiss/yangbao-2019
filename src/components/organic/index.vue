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
		<div class="o_bottom">
			<img src="../../assets/imgs/bottomLine.png">
		</div>
	</header>
	<div class="organic_body">
		<div class="o_left">
			<div class="area_info">
				<span>省</span>
				<el-select v-model="value2" placeholder=" ">
			    <el-option
			      v-for="item in options2"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
				</el-select>
			    <span>市</span>
				<el-select v-model="value2" placeholder=" ">
			    <el-option
			      v-for="item in options2"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
				</el-select>
			    <span>县</span>
				<el-select v-model="value2" placeholder=" ">
			    <el-option
			      v-for="item in options2"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			  	<span>乡镇</span>
				<el-select v-model="value2" placeholder=" ">
			    <el-option
			      v-for="item in options2"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</div>
			<div class="o_check">
				<div class="o_farm">
					<div class="f_top">
					<p>养殖厂</p>
					<el-checkbox v-model="style.checked1">养殖厂</el-checkbox>
					</div>
				</div>
				<div class="o_slaughter">
					<div class="s_top">
						<p>屠宰加工厂</p>
						<el-checkbox v-model="style.checked2" size="medium">屠宰厂</el-checkbox>
						<el-checkbox v-model="style.checked3">加工厂</el-checkbox>
					</div>
				</div>
				<div class="o_customer">
					<div class="c_top">
						<p>消费店</p>
						<el-checkbox v-model="style.checked4">鲜肉</el-checkbox>
						<el-checkbox v-model="style.checked5">餐饮</el-checkbox>
						<el-checkbox v-model="style.checked6">熟食</el-checkbox>
						<el-checkbox v-model="style.checked7">商超</el-checkbox>
					</div>
				</div>
				<div class="o_search">
					<img src="../../assets/imgs/o_search.png" alt="search">
				</div>
			</div>
		</div>
		<div class="o_middle">
			<img src="../../assets/imgs/o_middle.png">
		</div>
		<div class="right">

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
				area: [],
				level: 0,
				model: null
			},
			types: [
				{value: "省", index: 0},
				{value: "市", index: 1},
				{value: "区", index: 2}
			],
			style: {
				checked1: false,
				checked2: false,
				checked3: false,
				checked4: false,
				checked5: false,
				checked6: false,
				checked7: false,
			}
		}
	},
	methods: {
		
	}
}
</script>
<style lang="stylus">
.organic
	height 100%
	background url(http://qiniu.yunyangbao.cn/searchBack.png) no-repeat center
	background-size cover
	color #01ffff
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
			font-size 1.875em
			font-weight bold
		.o_bottom
			position relative
			top -35px
	.organic_body
		font-size 15px
		width 100%
		margin-top -20px
		.o_left
			width 60%
			float left
			.area_info
				font-size 15px
				span
					padding-left 23px
				.el-select
					width 18%
					.el-input .el-select__caret
						color #01ffff
				.el-input__inner
					height 26px
					background-color #002e72
					border 1px solid #01ffff
					border-radius 0px
					// color #01ffff
				span
					vertical-align middle
				.area_select
					display inline-block
			.o_check
				margin-top 20px
				margin-left 20px
				.el-checkbox+.el-checkbox
					margin-left 15px
				.el-checkbox
					color #01ffff
				.el-checkbox__inner
					background-color rgba(0,0,0,0)
				.el-checkbox__label
					font-size 13px
				.o_farm
					padding-left 10px
					width 15%
					height 70px
					float left
					text-align center
					background url(../../assets/imgs/farm.png) no-repeat center
					background-size 100% 55px
					.f_top
						position relative
						top -10px
						p
							line-height 8px
				.o_slaughter
					width 25%
					height 70px
					float left
					margin-left 10px
					text-align center
					background url(../../assets/imgs/slaughter.png) no-repeat center
					background-size 100% 55px
					.s_top
						position relative
						top -10px
						p
							line-height 8px
				.o_customer
					width 40%
					height 70px
					float left
					margin-left 10px
					text-align center
					background url(../../assets/imgs/customer.png) no-repeat center
					background-size 100% 55px
					.c_top
						position relative
						top -7px
						p
							line-height 5px
				.o_search
					img
						padding-top 9px
						width 95px
						cursor pointer
		.o_middle
			img
				float left
				margin-left -20px
				height 580px
			
</style>