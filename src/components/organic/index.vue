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
					<img src="../../assets/imgs/o_search.png" alt="search"  @click="search(0)">
				</div>
			</div>
			<div class="o_map">
				<div class="o_boxOut">
					<OMap class="map_detail" :data="data" :mapCenter="mapCenter"></OMap>
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
						<td colspan="2" style="background: #001e85"><span v-text="total.total_output_sheep"></span></td>
						<td colspan="2" style="background: #001e85"><span v-text="total.total_output_meat"></span></td>
					</tr>
					<tr>
						<td colspan="2" style="background: #001e85">求</td>
						<td colspan="2" style="background: #001e85"><span v-text="total.total_demand_sheep"></span></td>
						<td colspan="2" style="background: #001e85"><span v-text="total.total_demand_meat"></span></td>
					</tr>
				</table>
				</div>
				<div class="o_message">
				<table class="o_snDetail">
					<tr><th class="o_noBack"></th><th colspan="9" class="table_head">实时供求发布</th></tr>
					<tr>
						<td class="o_noBack">活羊(只)</td>
						<td><span v-text="detail.breed_sheep_supply"></span></td>
						<td><span v-text="detail.slaughter_sheep_supply"></span></td>
						<td><span v-text="detail.slaughter_sheep_demand"></span></td>
						<td><span v-text="detail.process_sheep_supply"></span></td>
						<td><span v-text="detail.process_sheep_demand"></span></td>
						<td><span v-text="detail.dining_sheep_demand"></span></td>
						<td><span v-text="detail.meat_sheep_demand"></span></td>
						<td><span v-text="detail.cook_sheep_demand"></span></td>
						<td><span v-text="detail.market_sheep_demand"></span></td>
					</tr>
					<tr>
						<td class="o_noBack">肉/产品(公斤)</td>
						<td><span v-text="detail.breed_meat_supply"></span></td>
						<td><span v-text="detail.slaughter_meat_supply"></span></td>
						<td><span v-text="detail.slaughter_meat_demand"></span></td>
						<td><span v-text="detail.process_meat_supply"></span></td>
						<td><span v-text="detail.process_meat_demand"></span></td>
						<td><span v-text="detail.dining_meat_demand"></span></td>
						<td><span v-text="detail.meat_meat_demand"></span></td>
						<td><span v-text="detail.cook_meat_demand"></span></td>
						<td><span v-text="detail.market_meat_demand"></span></td>
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
					<div class="o_company" v-for="(item, i) in items" :key="i" @click="handleClick(item.id, item.style)">
						<span>{{i+1}}.&nbsp</span>
						<span v-text='item.name'></span>
					</div>
				</div>
				<div class="containerHead">
					<p>管理联系人：{{corpation.chargeMan}}</p>
					<p>电话：{{corpation.phone}}</p>
				</div>
				<div class="o_container">
					<p v-for="(item, i) in eartagList" :key="i">
						<span v-for="(info, i) in item" :key="i">
							{{info}}，
						</span>
					</p>
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
// import getPlace from './method.js'
import { getCustomerByAddress, getFactoryInformation, getCustomerInformation, getPlace} from '@/util/getdata'
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
			},
			data: [],
	        mapCenter: {
	        	lon: 105.403119,
	        	lan: 34.028658,
	        	level: 4
	        },
	        detail: {
	        	breed_sheep_supply: null,
	        	slaughter_sheep_supply: null,
	        	slaughter_sheep_demand: null,
	        	process_sheep_supply: null,
	        	process_sheep_demand: null,
	        	dining_sheep_demand: null,
	        	meat_sheep_demand: null,
	        	cook_sheep_demand: null,
	        	market_sheep_demand: null,
	        	breed_meat_supply: null,
	        	slaughter_meat_supply: null,
	        	slaughter_meat_demand: null,
	        	process_meat_supply: null,
	        	process_meat_demand: null,
	        	dining_meat_demand: null,
	        	meat_meat_demand: null,
	        	cook_meat_demand: null,
	        	market_meat_demand: null
	        },
	        total: {
	        	total_demand_meat: null,
	        	total_demand_sheep: null,
	        	total_output_meat: null,
	        	total_output_sheep: null
	        },
	        items: [],
	        corpation: {
	        	chargeMan: null,
	        	phone: null
	        },
	        eartagList: []
		}
	},
	mounted() {
		let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
		let obj = {url}
		getPlace(obj).then(res => {
			res.result.forEach((item) =>{
				item.forEach((ipv)=>{
					this.area.province.push({
						label: ipv.fullname,
						value: ipv.id
					})
				})
			})
		})
		this.search(1)
	},
	methods: {
		provinceChoose(item){
			let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?id='+item.value+'&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
			let obj = {url}
			console.log(url)
			this.value.city = ''
			this.value.country = ''
			this.value.town = ''
			if(item.label.indexOf('市') == -1){
				getPlace(obj).then(res => {
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
					this.value.city = '市辖区'
					getPlace(obj).then(res => {
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
			let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?id='+item.value+'&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
			let obj = {url}
			this.value.country = ''
			this.value.town = ''
			getPlace(obj).then(res => {
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
		handleClick(id, type){
			// console.log(id)
			this.eartagList= []
			if(type){
				getFactoryInformation(id).then(res => {
					let list = []
					res.data.sheeps.forEach((item) => {
						list.push(item.trademarkEarTag)
					})
					for(let i = 0; i < list.length;){
						let child = []
						for(let j = 0; j<2, i < list.length; j++, i++){
							child.push(list[i])
						}
						this.eartagList.push(child)
					}
					console.log(this.eartagList)
					this.corpation.chargeMan = res.data.responsiblePerson
				})
			}else{
				getCustomerInformation(id).then(res => {
					this.corpation.phone = res.data.responsiblePerson.chargePersonPhone
					this.corpation.chargeMan = res.data.responsiblePerson.chargePerson
				})
			}
		},
		search(start){
			let message = {}
			if(start){
				let type = "养殖厂,屠宰厂,加工厂,鲜肉,餐饮,熟食,商超"
				message = {type, 'simpleAddress': '' ,'detailAddress': ''}
			}else{
				let simpleAddress = ''
				if(this.value.province != ''){
					this.mapCenter.level = 5
					simpleAddress += this.value.province.label
					if(simpleAddress.indexOf('市') != -1){
						this.mapCenter.level = 6
						simpleAddress += this.value.city
					}
					else if(this.value.city != ''){
						this.mapCenter.level = 7
						simpleAddress += this.value.city.label
					}
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
					type += '商超,'
				if(!this.style.checked1 && !this.style.checked2 && !this.style.checked3 && !this.style.checked4 && !this.style.checked5 && !this.style.checked6 && !this.style.checked7)
					type = '养殖厂,屠宰厂,加工厂,鲜肉,餐饮,熟食,商超,'
				type = type.substring(0, type.lastIndexOf(','))
				message = {type, simpleAddress ,detailAddress}
			}
			this.data = []
			this.items = []
			getCustomerByAddress(message).then(res => {
				if(res.data.factories.length != 0){
						res.data.factories.forEach((item)=>{
						let coordinates = []
						let type = "Point"
						if(item.longitude != null){
							this.mapCenter.lon = item.longitude
							coordinates.push(item.longitude)
						}
						if(item.latitude != null){
							this.mapCenter.lan = item.latitude
							coordinates.push(item.latitude)
						}
						let geometry = {type, coordinates}
						let count = 3
						this.data.push({geometry, count})
						let id = item.id
						let name = item.breedName
						let style = 1//1表示羊场
						this.items.push({id, name, style})
					})
				}
				if(res.data.customers.length != 0){
						res.data.customers.forEach((item) => {
						let coordinates = []
						let type = "Point"
						if(item.longitude != null){
							this.mapCenter.lon = item.longitude
							coordinates.push(item.longitude)
						}
						if(item.latitude != null){
							this.mapCenter.lan = item.latitude
							coordinates.push(item.latitude)
						}
						let geometry = {type, coordinates}
						let count
						if(item.type == "屠宰厂" || item.type == "加工厂"){
							count = 1
						}else{
							count = 2
						}
						this.data.push({geometry, count})
						let id = item.id
						let name = item.name
						let style = 0//0表示屠宰加工消费
						this.items.push({id, name, style})
					})
				}
				this.detail = {}
				if(res.data.total_output_sheep != 0){
					this.total.total_output_sheep = res.data.total_output_sheep
				}
				if(res.data.total_demand_sheep != 0){
					this.total.total_demand_sheep = res.data.total_demand_sheep
				}
				if(res.data.total_output_meat != 0){
					this.total.total_output_meat = res.data.total_output_meat
				}
				if(res.data.total_demand_meat != 0){
					this.total.total_demand_meat = res.data.total_demand_meat
				}
				if(res.data.statistics["养殖厂"].output != 0){
					this.detail.breed_sheep_supply = res.data.statistics["养殖厂"].output
				}
				if(res.data.statistics["屠宰厂"].output_sheep != 0){
					this.detail.slaughter_sheep_supply = res.data.statistics["屠宰厂"].output_sheep
				}
				if(res.data.statistics["屠宰厂"].demand_sheep != 0){
					this.detail.slaughter_sheep_demand = res.data.statistics["屠宰厂"].demand_sheep
				}
				if(res.data.statistics["加工厂"].output_sheep != 0){
					this.detail.process_sheep_supply = res.data.statistics["加工厂"].output_sheep
				}
				if(res.data.statistics["加工厂"].demand_sheep != 0){
					this.detail.process_sheep_demand = res.data.statistics["加工厂"].demand_sheep
				}
				if(res.data.statistics["餐饮"].demand_sheep != 0){
					this.detail.dining_sheep_demand = res.data.statistics["餐饮"].demand_sheep
				}
				if(res.data.statistics["鲜肉"].demand_sheep != 0){
					this.detail.meat_sheep_demand = res.data.statistics["鲜肉"].demand_sheep
				}
				if(res.data.statistics["熟食"].demand_sheep != 0){
					this.detail.cook_sheep_demand = res.data.statistics["鲜肉"].demand_sheep
				}
				if(res.data.statistics["商超"].demand_sheep != 0){
					this.detail.market_sheep_demand = res.data.statistics["商超"].demand_sheep
				}
				if(res.data.statistics["屠宰厂"].output_meat != 0){
					this.detail.slaughter_meat_supply = res.data.statistics["屠宰厂"].output_meat
				}
				if(res.data.statistics["屠宰厂"].demand_meat != 0){
					this.detail.slaughter_meat_demand = res.data.statistics["屠宰厂"].demand_meat
				}
				if(res.data.statistics["加工厂"].output_meat != 0){
					this.detail.process_meat_supply = res.data.statistics["加工厂"].output_meat
				}
				if(res.data.statistics["加工厂"].demand_meat != 0){
					this.detail.process_meat_demand = res.data.statistics["加工厂"].demand_meat
				}
				if(res.data.statistics["餐饮"].demand_meat != 0){
					this.detail.dining_meat_demand = res.data.statistics["餐饮"].demand_meat
				}
				if(res.data.statistics["鲜肉"].demand_meat != 0){
					this.detail.meat_meat_demand = res.data.statistics["鲜肉"].demand_meat
				}
				if(res.data.statistics["熟食"].demand_meat != 0){
					this.detail.cook_meat_demand = res.data.statistics["鲜肉"].demand_meat
				}
				if(res.data.statistics["商超"].demand_meat != 0){
					this.detail.market_meat_demand = res.data.statistics["商超"].demand_meat
				}
			})
		}
	}
}
</script>
<style lang="stylus">
@import './organic'
</style>