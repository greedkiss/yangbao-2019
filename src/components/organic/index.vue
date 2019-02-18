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
			<div class="o_map">
				<OMap address="贵州省铜仁市沿河县努比亚山羊养殖场" class="map_detail"></OMap>
			</div>
		</div>
		<div class="o_middle">
			<img src="../../assets/imgs/o_middle.png">
		</div>
		<div class="right">
			<div class="o_message">
				<table class="o_sune">
					<tr>
						<th rowspan="3" style="color: #01ffff;font-size: 16px ">可对外</th>
						<th style="width: 50px">供求</th>
						<th style="width: 50px">品类</th>
						<th>活羊（只）</th>
						<th>肉/产品（公斤）</th>
					</tr>
					<tr>
						<td colspan="2">供</td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td colspan="2">求</td>
						<td></td>
						<td></td>
					</tr>
				</table>
				<table class="o_snDetail">
					<caption class="table_head">实时供求发布</caption>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>供</td>
						<td>供</td>
						<td>求</td>
						<td>供</td>
						<td>求</td>
						<td>求</td>
						<td>求</td>
						<td>求</td>
						<td>求</td>
					</tr>
					<tr>
						<td>养殖厂</td>
						<td colspan="2" class="o_double">屠宰厂</td>
						<td colspan="2" class="o_double">加工厂</td>
						<td>餐饮</td>
						<td>鲜肉</td>
						<td>熟食</td>
						<td>商超</td>
					</tr>
					<tr>
						<td class="o_total"></td>
						<td colspan="2" class="o_total"></td>
						<td colspan="2" class="o_total"></td>
						<td class="o_total"></td>
						<td class="o_total"></td>
						<td class="o_total"></td>
						<td class="o_total"></td>
					</tr>
				</table>
				<span class="left_sheep">活羊(只)</span>
				<span class="left_meet">肉/产品(公斤)</span>
				<span class="left_sn">供求</span>
				<span class="left_factory">厂家(个)</span>
			</div>
				<el-container style="height: 200px; border: 1px solid #021e86; width: 450px" class="o_detail">
				  <el-aside width="200px" style="background-color: #021e86">
				  	<el-menu>
				  	<el-menu-item index="1">选项1</el-menu-item>
          			<el-menu-item index="2">选项2</el-menu-item>
          			<el-menu-item index="1">选项1</el-menu-item>
          			<el-menu-item index="2">选项2</el-menu-item>
          			<el-menu-item index="1">选项1</el-menu-item>
          			<el-menu-item index="2">选项2</el-menu-item>
          			<el-menu-item index="1">选项1</el-menu-item>
          			<el-menu-item index="2">选项2</el-menu-item>
          			<el-menu-item index="1">选项1</el-menu-item>
          			<el-menu-item index="2">选项2</el-menu-item>
          			<el-menu-item index="1">选项1</el-menu-item>
          			<el-menu-item index="2">选项2</el-menu-item>
          			</el-menu>
				  </el-aside>
				  <el-container>
				    <el-header style="text-align: left; font-size: 14px; padding-top:20px">
				      <div>管理联系人：John Snow</div>
				      <div>电话： 911</div>
				    </el-header>
				    <el-main>
				      	XXXXXXXXXX
				    </el-main>
				  </el-container>
				</el-container>
				<img src="../../assets/imgs/o_detail.png" class="o_border">
			<!-- <div class="o_detail">
				<div class="o_aside"></div>
				<div class="containerHead"></div>
				<div class="o_container"></div>
			</div> -->
		</div>
	</div>
	<footer class="o_foot">
		<p class="o_footMessage">
            Copyright &copy; 2018.贵州省东骏有机农业科技有限公司(Guizhou Dongjun Organic Agriculture Technology Co., Ltd.) 版权所有 <br/>
            软件著作编号: 2018SR504492; 2018SR503550; 2018SR503571; 2018SR503580; 2018SR503575; 2018SR503564;2018SR504500;
            <a href="http://www.miitbeian.gov.cn/" style="color:#028ca5">黔ICP备18003179号</a><br/>
        </p>
	</footer>
</div>
</template>
<script>
import pcaa from 'area-data/pcaa'
import OMap from './o_map'
export default {
	components: {
		OMap,
	},
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
	overflow hidden
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
			font-size 1.675em
			font-weight bold
		.o_bottom
			position relative
			top -40px
	.organic_body
		color #00c5dd
		font-size 15px
		width 100%
		margin-top -30px
		.o_left
			width 59%
			float left
			.area_info
				font-size 15px
				span
					padding-left 25px
				.el-select
					width 16%
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
				font-size 14px
				margin-top 20px
				margin-left 20px
				.el-checkbox+.el-checkbox
					margin-left 15px
				.el-checkbox
					color #9cdbe1
				.el-checkbox__inner
					background-color rgba(0,0,0,0)
				.el-checkbox__label
					font-size 12px
				.o_farm
					padding-left 10px
					width 13%
					height 60px
					float left
					text-align center
					background url(../../assets/imgs/farm.png) no-repeat center
					background-size 100% 50px
					.f_top
						position relative
						top -10px
						p
							line-height 6px
				.o_slaughter
					width 23%
					height 60px
					float left
					margin-left 10px
					text-align center
					background url(../../assets/imgs/slaughter.png) no-repeat center
					background-size 100% 50px
					.s_top
						position relative
						top -10px
						p
							line-height 8px
				.o_customer
					width 38%
					height 60px
					float left
					margin-left 10px
					text-align center
					background url(../../assets/imgs/customer.png) no-repeat center
					background-size 100% 50px
					.c_top
						position relative
						top -7px
						p
							line-height 5px
				.o_search
					img
						padding-left 10px
						padding-top 7px
						width 87px
						cursor pointer
			.o_map
				padding-left 20px
				.map_detail
					width 90%
					height 400px
		.o_middle
			img
				float left
				margin-left -35px
				height 530px
		.right
			color #00c5dd
			text-align center
			.o_message
				float right
				padding-right 10px
				.o_sune
					background-color #002e72 
					font-size 12px
					border-collapse collapse
					tr
						td, th
							border 1px solid #0090d4
							width 103px
							height 25px
				.o_snDetail
					margin-top 10px
					background-color #002e72 
					font-size 12px
					border-collapse collapse
					.table_head
						color #040d2a
						width 427px
						height 40px
						background-color #2c9aef
						line-height 40px
						font-size 20px
						font-weight bold
					tr
						td, th
							border 1px solid #0090d4
							width 44px
							height 25px
				.o_total
					background-color #eb6100
				.left_sheep, .left_meet, .left_sn, .left_factory
					font-size 12px
					color #00c5dd
				.left_sheep
					position relative
					top -135px
					left -165px
				.left_meet
					position relative
					top -110px
					left -242px
				.left_sn
					position relative
					top -80px
					left -273px
				.left_factory
					position relative
					top -50px
					left -320px
			.o_detail
				float right
				margin-top 20px
				margin-right 20px
				.el-menu
					background-color #021e86
					border-right 0px
				.el-menu-item
					color #00b8ee
					height 30px
					line-height 30px
				.el-menu-item:hover
					background-color #00b8ee
				.el-menu-item.is-active
					background-color #00b8ee
					color #00459e
			.o_border
				float right
				position relative
				width 500px
				top -235px
				
			// .o_detail
			// 	float right
			// 	width 450px
			// 	height 200px
			// 	margin-right 10px
			// 	background-color white
			// 	.o_aside
			// 		float left
			// 		width 200px
			// 		height 200px
			// 		background orange
			// 	.containerHead
			// 		float left
			// 		width 250px
			// 		height 50px
			// 		background black
			// 	.o_container
			// 		float left
			// 		width 250px
			// 		height 150px
			// 		background red
					
	.o_foot
		height 40px
		background rgba(0,0,0,0)
		text-align center
		width 100%
		position absolute
		bottom 10px
		font-size 10px
		border-top 1px #01ffff solid
		color #028ca5
		.foot_mess
			margin 0
		    line-height 15px
		    text-align center
</style>