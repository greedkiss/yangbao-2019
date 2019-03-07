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
				<el-select v-model="value.province" placeholder=" " @change="provinceChoose">
			    <el-option
			      v-for="item in area.province"
			      :key="item.value"
			      :label="item.label"
			      :value="item"
			      >
			    </el-option>
				</el-select>
			    <span>市</span>
				<el-select v-model="value.city" placeholder=" " @change="cityChoose">
			    <el-option
			      v-for="item in area.city"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
				</el-select>
			    <span>县</span>
				<el-select v-model="value.country" placeholder=" ">
			    <el-option
			      v-for="item in area.country"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
			  </el-select>
			  	<!-- <span>乡镇</span>
				<el-select v-model="value.town" placeholder=" ">
			    <el-option
			      v-for="item in area.town"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select> -->
			  <span class="sub-title">乡镇</span>
			    <el-autocomplete
			      class="inline-input"
			      v-model="value.town"
			      :fetch-suggestions="querySearch"
			      placeholder=" "
			    ></el-autocomplete>
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
					<img src="../../assets/imgs/o_search.png" alt="search"  @click="search">
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
import getArea from './method.js'
import {getCustomerByAddress} from '@/util/getdata'
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
			style: {
				checked1: false,
				checked2: false,
				checked3: false,
				checked4: false,
				checked5: false,
				checked6: false,
				checked7: false,
			},
			area: {
				province: [],
				city: [],
				country: [],
				town: []
			},
			value: {
				province: '',
				city: '',
				country: '',
				town: ''
			}
		}
	},
	mounted() {
		getArea().then(res => {
			res.result.forEach((item) =>{
				item.forEach((ipv)=>{
					this.area.province.push({
						label: ipv.fullname,
						value: ipv.id
					})
				})
			})
		})
	},
	methods: {
		provinceChoose(item){
			this.value.city = ''
			this.value.country = ''
			this.value.town = ''
			if(item.label.indexOf('市') == -1){
				getArea(item.value).then(res => {
					this.area.city = []
					res.result.forEach((item) =>{
						item.forEach((ipv)=>{
							this.area.city.push({
								label: ipv.fullname,
								value: ipv.id
							})
						})
					})
				})
			}else{
					this.value.city = '直辖市'
					getArea(item.value).then(res => {
					this.area.country = []
					res.result.forEach((item) => {
						item.forEach((ipv)=>{
							this.area.country.push({
								label: ipv.fullname,
								value: ipv.id
							})
						})
					})
				})
			}
		},
		cityChoose(item){
			this.value.country = ''
			this.value.town = ''
			getArea(item.value).then(res => {
				this.area.country = []
				res.result.forEach((item) =>{
					item.forEach((ipv)=>{
						this.area.country.push({
							label: ipv.fullname,
							value: ipv.id
						})
					})
				})
			})
		},
		querySearch(qs, cb){
			cb([{
				"value": "暂无数据请输入"
			}])
		},
		search(){
			let simpleAddress = ''
			if(this.value.province != ''){
				simpleAddress += this.value.province.label
				if(simpleAddress.indexOf('市') != -1)
					simpleAddress += this.value.city
				else if(this.value.city != '')
					simpleAddress += this.value.city.label
			}
			if(this.value.country != '')
				simpleAddress += this.value.country.label
			let detailAddress = this.value.town
			let type = ''
			if(this.style.checked1)
			 	type += '养殖厂,'
			if(this.style.checked2)
				type += '屠宰厂,'
			if(this.style.checked3)
				type += '加工厂,'
			if(this.style.checked4)
				type += '鲜肉,'
			if(this.style.checked5)
				type += '餐饮,'
			if(this.style.checked6)
				type += '熟食,'
			if(this.style.checked7)
				type += '商超'
			type = type.substring(0, type.lastIndexOf(','))
			let data = {type, simpleAddress ,detailAddress}
			getCustomerByAddress(data).then(res => {

			})
		}
	}
}
</script>
<style lang="stylus">
@import './organic'
</style>