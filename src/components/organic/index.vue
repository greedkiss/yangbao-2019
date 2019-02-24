<template>
<div class="o_organic">
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
				<div class="o_boxOut">
					<OMap class="map_detail"></OMap>
				</div>
			</div>
			<div class="o_introduce">
				<div>
				<div class="o_red"></div>
				<span>养殖场</span>
				</div>
				<div>
				<div class="o_blue"></div>
				<span>屠宰加工厂</span>
				</div>
				<div>
				<div class="o_yellow"></div>
				<span>消费店</span>
				</div>
			</div>
		</div>
		<div class="o_middle">
			<img src="../../assets/imgs/o_middle.png">
		</div>
		<div class="right">
			<div class="o_sune">
				<table class="outTable">
					<tr>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
						<td class="o_none"></td>
					</tr>
					<tr>
						<th rowspan="3" style="color: #01ffff; font-size: 16px;background: #001e85" colspan="3">可对外</th>
						<th colspan="2">  
				        <div class="o_cline">  
				          <table>  
				            <thead>  
				              <tr class="o_sn">  
				                <th></th>  
				                <th>品类</th>  
				              </tr>  
				              <tr class="o_kind">  
				                <th>供求</th>  
				                <th></th>  
				              </tr>  
				            </thead>  
				          </table>  
				        </div>  
				      </th>  
						<th colspan="2" style="background: #001e85">活羊(只)</th>
						<th colspan="2" style="background: #001e85">肉/产品(公斤)</th>
					</tr>
					<tr>
						<td colspan="2" style="background: #001e85">供</td>
						<td colspan="2" style="background: #001e85"></td>
						<td colspan="2" style="background: #001e85"></td>
					</tr>
					<tr>
						<td colspan="2" style="background: #001e85">求</td>
						<td colspan="2" style="background: #001e85"></td>
						<td colspan="2" style="background: #001e85"></td>
					</tr>
				</table>
				</div>
				<div class="o_message">
				<table class="o_snDetail">
					<tr><th class="o_noBack"></th><th colspan="9" class="table_head">实时供求发布</th></tr>
					<tr>
						<td class="o_noBack">活羊(只)</td>
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
						<td class="o_noBack">肉/产品(公斤)</td>
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
						<td class="o_noBack">供求</td>
						<td><div class="o_font">供</div></td>
						<td><div class="o_font">供</div></td>
						<td><div class="o_font">求</div></td>
						<td><div class="o_font">供</div></td>
						<td><div class="o_font">求</div></td>
						<td><div class="o_font">求</div></td>
						<td><div class="o_font">求</div></td>
						<td><div class="o_font">求</div></td>
						<td><div class="o_font">求</div></td>
					</tr>
					<tr>
						<td class="o_noBack">厂家(个)</td>
						<td><div class="o_font">养殖厂</div></td>
						<td colspan="2" class="o_double"><div class="o_font">屠宰厂</div></td>
						<td colspan="2" class="o_double"><div class="o_font">加工厂</div></td>
						<td><div class="o_font">餐饮</div></td>
						<td><div class="o_font">鲜肉</div></td>
						<td><div class="o_font">熟食</div></td>
						<td><div class="o_font">商超</div></td>
					</tr>
					<tr>
						<td class="o_noBack"></td>
						<td class="o_total"></td>
						<td colspan="2" class="o_total"></td>
						<td colspan="2" class="o_total"></td>
						<td class="o_total"></td>
						<td class="o_total"></td>
						<td class="o_total"></td>
						<td class="o_total"></td>
					</tr>
				</table>
				</div>
			<div class="o_detail">
			<div class="o_inside">
				<div class="o_aside">
					<div class="o_company">1.贵州省东骏有机农业科技有限公司</div>
					<div class="o_company">2.贵州省东骏有机农业科技有限公司</div>
					<div class="o_company">3.贵州省东骏有机农业科技有限公司</div>
					<div class="o_company">4.贵州省东骏有机农业科技有限公司</div>
					<div class="o_company">5.贵州省东骏有机农业科技有限公司</div>
				</div>
				<div class="containerHead">
					<p>管理联系人：蔡女士</p>
					<p>电话：17612345678</p>
				</div>
				<div class="o_container">
					<p>M121311，M121311，M121311</p>
					<p>M121311，M121311，M121311</p>
					<p>M121311，M121311，M121311</p>
					<p>M121311，M121311，M121311</p>
				</div>
			</div>
			</div>
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
.o_organic
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
					padding-left 3.4%
				.el-select
					width 16%
					.el-input .el-select__caret
						color #01ffff
				.el-input__inner
					height 26px
					background-color #002e72
					border 1px solid #01ffff
					border-radius 0px
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
				padding-top 10px
				.o_boxOut
					padding-top 2.5vh
					width 91%
					height calc(90vh - 250px)
					height -moz-calc(90vh - 250px)
					height -webkit-calc(90vh - 250px)
					height calc(90vh - 250px)
					background url(../../assets/imgs/mapBack.png) no-repeat center
					background-size 100% 100%
					.map_detail
						width 94%
						height 96%
						margin 0 auto
			.o_introduce
				width 80px
				height 60px
				background white
				position relative
				top -80px
				left 40px
				color black
				.o_red
					margin-left 4px
					display inline-block
					width 10px
					height 10px
					background red
					border-radius 50%
				.o_blue
					margin-left 4px
					display inline-block
					width 10px
					height 10px
					background blue
					border-radius 50%
				.o_yellow
					margin-left 4px
					display inline-block
					width 10px
					height 10px
					background yellow
					border-radius 50%
				span
					font-size 10px
					webkit-transform scale(0.83)
		.o_middle
			img
				float left
				margin-left -35px
				height calc(80vh - 50px)
				height -moz-calc(80vh - 50px)
				height -webkit-calc(80vh - 50px)
				height calc(80vh - 50px)
		.right
			float right
			color #00c5dd
			text-align center
			width 40%
			.o_sune
				float right
				margin-right 3.2vw
				margin-top -25px
				font-size 12px
				.outTable
					table-layout fixed
					border-collapse collapse
					.o_none
						background-color rgba(0,0,0,0)
						border 1px solid rgba(0,0,0,0)
						border-bottom 1px solid #0090d4
					tr
						width 100%
						td, th
							border 1px solid #0090d4
							width 3vw
							height 19px
							// min-width 67.5px
					.o_cline
						background url(../../assets/imgs/tableBack.png) no-repeat center
						background-size 106% 106%
						tr
							th
								border 0px
								height 14px		
			.o_message
				float right
				.o_snDetail
					table-layout fixed
					margin-top 10px
					margin-right 3.2vw
					font-size 12px
					border-collapse collapse
					tr
						.table_head
							color #040d2a
							height 30px
							background-color #2c9aef
							line-height 30px
							font-size 16px
							font-weight bold
						td, th
							background-color #001e85 
							border 1px solid #0090d4
							width 3vw
							height 19px
							// min-width 30px
						.o_font
							font-size 10px
							-webkit-transform scale(0.83)
						.o_noBack
							font-size 10px
							-webkit-transform scale(0.83)
							border 0px
							background-color rgba(0,0,0,0)
							width 6vw
							text-align right
							padding-right 10px
						.o_total
							background-color #eb6100
				
			.o_detail
				font-size 12px
				margin-top 10px
				float right
				width 90%
				margin-right 5%
				height calc(85vh - 350px)
				height -moz-calc(85vh - 350px)
				height -webkit-calc(85vh - 350px)
				height calc(85vh - 350px)
				background url(../../assets/imgs/mapBack.png) no-repeat center
				background-size 100% 100%
				padding-top 4%
				.o_inside
					margin 0 auto
					height 92%
					width 92%
					border 2px solid #021e86
					.containerHead
						float left
						width 60%
						height 94px 
						background rgba(255,255,255,0.01)
						p
							font-size 16px
							text-align left
							padding-left 20px
					.o_container
						overflow auto
						float left
						width 60%
						height calc(100%- 94px)
						background rgba(255,255,255,0.01)
					.o_aside
						overflow-x scroll
						white-space nowrap
						overflow auto
						float left
						width 40%
						height 100%
						background-color #021e86
						text-align left
						.o_company
							cursor pointer
							height 20px
							line-height 20px
							background-color #021e86
						.o_company:hover
							background-color #00b8ee
							color #00459e	
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