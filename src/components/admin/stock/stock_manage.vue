<template>
    <div>
        <div class="area_management">
				<span class="area_name" size='small'>省</span>
				<el-select v-model="value.province" placeholder="省" size='small' @change="provinceChoose">
			    <el-option
			      v-for="item in area.province" 
			      :key="item.value"
			      :label="item.label"
			      :value="item"
			      >
			    </el-option>
				</el-select>
					<span class="area_name" size='small'>市</span>				
				<el-select v-model="value.city" placeholder="市" size='small' @change="cityChoose">
			    <el-option
			      v-for="item in area.city"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
				</el-select>
				<span class="area_name" size='small'>县</span>		
				<el-select v-model="value.country" size='small' placeholder="县">
			    <el-option
			      v-for="item in area.country"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
			  </el-select>
		</div>

        <div>
            <el-form :inline="true">
                <el-form-item>
                    <el-autocomplete
                        size='small'
                        popper-class="my-autocomplete"
                        v-model="state1"
                        :fetch-suggestions="querySearch1"
                        placeholder="选择屠宰场或终端店"
                        @select="handleSelect1">
                        <i
                        class="el-icon-edit el-input__icon"
                        slot="suffix"
                        >
                        </i>
                        <template slot-scope="{ item }">
                        <div class="name">{{ item.breedName }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-autocomplete
                        size='small'
                        popper-class="my-autocomplete"
                        v-model="state2"
                        :fetch-suggestions="querySearch2"
                        placeholder="选择车辆"
                        @select="handleSelect2">
                        <i
                        class="el-icon-edit el-input__icon"
                        slot="suffix"
                        >
                        </i>
                        <template slot-scope="{ item }">
                        <div class="name">{{ item.carname }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" size='small'>生成订单</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="tableData" :span-method="objectSpanMethod" :border="true" >
			<el-table-column
				label="部位编码"
				width="120"
				prop="positionnum"
			>
			</el-table-column>
			<el-table-column
				label="部位名称"
				width="120"
				prop="name"
			>
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight"
			>
			</el-table-column>
			<el-table-column
				label="视频"
				width="120"
				prop="video"
			></el-table-column>
			<el-table-column
				label="羊场"
				width="120"
				prop="farm"
				v-if="false"
			></el-table-column>
			<el-table-column
				label="总数量"
				width="120"
            >
				<template slot-scope="scope">
					<!-- <p style="text-align: center;">{{dnum.get(scope.row.name)}}</p> -->
				</template>
			</el-table-column>
		</el-table>
    </div>
</template>

<script>
import pcaa from 'area-data/pcaa'
import { isReqSuccessful,getThumbPicture } from '@/util/jskit'
import { getUserById , getAllSaleSheep ,findAllSheep, submitSaleSheep, makeDeadSheep, getSheepBuilding ,getSheepCol ,moveSheep ,getSaleFac ,makeSaleFac ,updateSheepTog ,moveSheepAll ,moveSheepPart ,querySheepStage ,updateSheepAllMe, changeSaleable, getPlace,watchVideo} from '@/util/getdata'

export default {
    data(){
        return{
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
            state1:'',
            state2:'',
            tableData:[],
        }
    },

    methods:{ 
        submit(){

        },
        provinceChoose(item){
			let url = 'https://apis.map.qq.com/ws/district/v1/getchildren?id='+item.value+'&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM'
			let obj = {url}
			console.log(url)
			this.value.city = null
			this.value.country = null
			this.value.town = null
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
			this.value.country = null
			this.value.town = null
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
        //选择终端店
        querySearch1(queryString, cb) {
	        let restaurants = this.restaurants3
	        let results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants
	        cb(results)
          },
        handleSelect1(item){
			this.state1 = item.breedName.toString()
			this.salesheepid = item.id
        },
        createFilter1(queryString) {
	        return (restaurant) => {
	          return (restaurant.value.toLowerCase().indexOf(queryString) === 0)
	        }
        },
        //选择车辆
        querySearch2(queryString, cb) {
	        let restaurants = this.restaurants4
	        let results = queryString ? restaurants.filter(this.createFilter2(queryString)) : restaurants
	        cb(results)
          },
        handleSelect2(item){
			this.state1 = item.breedName.toString()
			this.salesheepid = item.id
        },
        createFilter2(queryString) {
	        return (restaurant) => {
	          return (restaurant.value.toLowerCase().indexOf(queryString) === 0)
	        }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			let name = row.name
			let flag = 0 
			let len = this.merge.len.get(namename)
			if (columnIndex === 5 || columnIndex == 0) {
				if (this.tableCol.get(rowIndex) === 5 ) {
					return {
						rowspan: len,
						colspan: 1
					};
				}		
				else {
					return {
						rowspan: 0,
						colspan: 0
					};
				}
			}
		},
    },

    mounted(){
    let id = this.$route.params.id
    getUserById(id).then(res => {
        if (isReqSuccessful(res)) {
            this.user = res.data.model
            console.log(this.user);
            let {userFactory} = this.user
            // getcarname(user).then(res =>{
            //     if (isReqSuccessful(res)) {
            //         this.restaurants4 = res.data.data
            //     }
                            
            // })
            getSaleFac(userFactory).then(res =>{
                if (isReqSuccessful(res)) {
                    this.restaurants3 = res.data.data
                }
            })
        }
    }).then(this.fetchData)
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
    },

}


</script>
