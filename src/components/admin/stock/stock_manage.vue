<template>
    <div>
        <div  class="area_management">
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
					<span class="area_name" size='small' style="margin-left:20px">市</span>				
				<el-select v-model="value.city" placeholder="市" size='small' @change="cityChoose">
			    <el-option
			      v-for="item in area.city"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
				</el-select>
				<span class="area_name" size='small' style="margin-left:20px">县</span>		
				<el-select v-model="value.country" size='small' placeholder="县">
			    <el-option
			      v-for="item in area.country"
			      :key="item.value"
			      :label="item.label"
			      :value="item">
			    </el-option>
			  </el-select>
		</div>

        <div style="margin-top:10px">
            <el-form :inline="true" style="width:100%">
				<el-form-item>
					<span class="area_name"  size='small'>终端店</span>
                    <el-autocomplete
                        size='small'
                        popper-class="my-autocomplete"
                        v-model="state1"
                        :fetch-suggestions="querySearch1"
                        placeholder="选择终端店"
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
					<span class="area_name" size='small'>车辆</span>
                    <el-select v-model="values"  size='small' placeholder="请选择司机">
                    <el-option
                    placeholder="选择车辆"
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit" size='small'>生成订单</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="stockManage-form">
            <span>各部分库存数量（个）</span>

            <el-table :data="numtableData" :border="true" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
				label="部位名称"
				width="80"
				>
                <template>
                    <div>
                        <span>数量</span>
                    </div>
                </template>
			</el-table-column>
			<el-table-column
				label="胴体"
				width="78"
				prop="Dnum">
			</el-table-column>
			<el-table-column
				label="二分体"
				width="78"
				prop="DEnum">
			</el-table-column>
			<el-table-column
				label="羊腹肉"
				width="78"
				prop="DFnum">
			</el-table-column>
			<el-table-column
				label="黄瓜条"
				width="78"
				prop="DHnum">
            </el-table-column>
			<el-table-column
                label="羊肩胛"
                width="78"
				prop="DJnum">
            </el-table-column>
            <el-table-column
				label="羊肋排"
				width="78"
				prop="DLnum">
			</el-table-column>
			<el-table-column
				label="羊前"
				width="78"
				prop="DMnum">
			</el-table-column>
		</el-table>

        <el-table :data="numtableData" :border="true" :header-cell-style="{background:'#eef1f6',color:'#606266'}" >
            <el-table-column
				label="部位名称"
				width="80"
				>
                 <template>
                    <div>
                        <span>数量</span>
                    </div>
                </template>
			</el-table-column>
			<el-table-column
				label="羊腰脊"
				width="78"
				prop="DYnum">
			</el-table-column>
			<el-table-column
				label="羊后腿"
				width="78"
				prop="DRnum">
            </el-table-column>
			<el-table-column
                label="羊大腿"
                width="78"
				prop="DDnum">
            </el-table-column>
            <el-table-column
				label="羊前腿"
				width="78"
				prop="DQnum">
			</el-table-column>
			<el-table-column
				label="羊外肌"
				width="78"
				prop="DWnum">
			</el-table-column>
			<el-table-column
				label="羊里脊"
				width="78"
				prop="DInum">
			</el-table-column>
            <el-table-column
				label=""
				width="78"
				prop="">
			</el-table-column>
		</el-table>
        </div>

        
        <div style="margin-top:20px;">
			<span style="margin-bottom:10px;">选择售卖</span>
        <el-table 
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; margin-top:10px;" 
        @selection-change="handleSelectionChange">
            <el-table-column
            label="勾选"
            type="selection"
            width="55">
            </el-table-column>
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
				label="价格"
				width="120"
                prop="price">
			</el-table-column>
            <el-table-column
				label="养殖场"
				width="120"
                prop="farm">
			</el-table-column>
            <el-table-column
				label="货主"
				width="120"
                prop="master">
			</el-table-column>
            <el-table-column
				label="联系电话"
				width="120"
                prop="phonenum">
			</el-table-column>
		</el-table>
        </div>
    </div>
</template>

<script>
import pcaa from 'area-data/pcaa'
import { isReqSuccessful,getThumbPicture } from '@/util/jskit'
import { getUserById ,getStockManageNum, getSaleFac,getPlace,watchVideo} from '@/util/getdata'

export default {
    data(){
        return{
            numtableData:[],
            values:null,
            options:[{
                value: '川A88888888',
                label: '何师傅'
            }],
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
            multipleSelection:[],
            state1:'',
            state2:'',
            tableData:[{positionnum:'g1',name:'45'},
            {positionnum:'g2',name:'45'},
            {positionnum:'g21',name:'44'},
            {positionnum:'g22',name:'44'},
            {positionnum:'g23',name:'44'},
            {positionnum:'g11',name:'43'},],
            user:'',
        }
    },

    methods:{ 
        submit(){
            let array = this.multipleSelection
            let id=this.user.userFactory
            let len=array.length-1
            let sheep=''
            for(let i = 0;i<len;i++){
            let erNumber=array[i].positionnum+','
            sheep=sheep+erNumber
            }
            let erNumber=array[len].positionnum
            sheep=sheep+erNumber
            let data={
                address:this.state1,
                car:this.values,
                sheep
            } 
            if(data.address==""||data.car==null){
                this.$message.warning('请完善信息')
            }else{
                console.log(id,data)
                this.$message.success('生成订单成功')
            }
        },
		//获取数量
		getNum(){
			let id=this.user.userFactory
			this.numtableData=[]
			getStockManageNum(id).then(res => {
                if (isReqSuccessful(res)) {
               		let body = res.data.body
					let partData = res.data.part
					let v={Dnum:null,DEnum:null,DFnum:null,DHnum:null,DJnum:null,DLnum:null,DMnum:null,DYnum:null,DRnum:null,DDnum:null,DQnum:null,DWnum:null,DInum:null}
					v.Dnum=body
					partData.forEach(function(item,index){
                        switch (item.part) {
                    case 'F':
                        v.DFnum=Number(item.number)
                        break;
                    case 'H':
                        v.DHnum=Number(item.number)
                        break;
                    case 'Y':
                        v.DYnum=Number(item.number)
                        break;
                    case 'R':
                        v.DRnum=Number(item.number)
                        break;
                    case 'D':
                        v.DDnum=Number(item.number)
                        break;
                    case 'J':
                        v.DJnum=Number(item.number)
                        break;
                    case 'M':
                        v.DMnum=Number(item.number)
                        break;
                    case 'E':
                        v.DEnum=Number(item.number)
                        break;
                    case 'Q':
                        v.DQnum=Number(item.number)
                        break;
                    case 'L':
                        v.DLnum=Number(item.number)
                        break;
                    case 'I':
                        v.DInum=Number(item.number)
                        break;
                    case 'W':
                        v.DWnum=Number(item.number)
                        break;
                
                    default:
                        break;
                }
                    })
               		this.numtableData.push(v);
					   }
					else{
						this.$message.error('获取数据失败')
					}
				})
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
        // querySearch2(queryString, cb) {
	    //     let restaurants = this.restaurants4
	    //     let results = queryString ? restaurants.filter(this.createFilter2(queryString)) : restaurants
	    //     cb(results)
        //   },
        // handleSelect2(item){
		// 	this.state1 = item.breedName.toString()
		// 	this.salesheepid = item.id
        // },
        // createFilter2(queryString) {
	    //     return (restaurant) => {
	    //       return (restaurant.value.toLowerCase().indexOf(queryString) === 0)
	    //     }
        // },
        //复选框
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
    },

    mounted(){
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
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
        }).then(this.getNum)
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
    }
    
}

</script>
<style scoped>
form.table {
font-family: verdana,arial,sans-serif;
font-size:11px;
color:#333333;
border-width: 1px;
border-color: #666666;
border-collapse: collapse;
}
.area_management{
	margin-left:25px;
}
</style>

<style lang="stylus">
.stockManage-form
	.el-table
		display table-caption
	.el-table th
			border-left 2px solid rgb(230,230,230)
			background-color: rgb(238, 241, 246)!important
		
</style>


