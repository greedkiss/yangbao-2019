<template>
  <div class="o_organic">
    <header class="head">
      <div class="o_logo">
        <router-link to="/">
          <img class="logo_info" src="../../assets/imgs/newlogo.png" alt="云·羊宝（有机）山羊养殖生产管理追溯平台" />
        </router-link>
      </div>
      <div class="o_title">| 云·羊宝（有机）大数据平台</div>
      <div class="o_bottom">
        <img src="../../assets/imgs/bottomLine.png" />
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
            ></el-option>
          </el-select>
          <span>市</span>
          <el-select v-model="value.city" placeholder=" " @change="cityChoose">
            <el-option
              v-for="item in area.city"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
          <span>县</span>
          <el-select v-model="value.country" placeholder=" ">
            <el-option
              v-for="item in area.country"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
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
            <img src="../../assets/imgs/o_search.png" alt="search" @click="search(0)" />
          </div>
        </div>
        <div class="o_map">
          <div class="o_boxOut">
            <OMap class="map_detail" :data="data" :mapCenter="mapCenter" :place="place"></OMap>
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
        <img src="../../assets/imgs/o_middle.png" />
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
              <th
                rowspan="3"
                style="color: #01ffff; font-size: 16px;background: #001e85"
                colspan="3"
              >可对外</th>
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
              <td colspan="2" style="background: #001e85">
                <span v-text="total.total_output_sheep"></span>
              </td>
              <td colspan="2" style="background: #001e85">
                <span v-text="total.total_output_meat"></span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="background: #001e85">求</td>
              <td colspan="2" style="background: #001e85">
                <span v-text="total.total_demand_sheep"></span>
              </td>
              <td colspan="2" style="background: #001e85">
                <span v-text="total.total_demand_meat"></span>
              </td>
            </tr>
          </table>
        </div>
        <div class="o_message">
          <table class="o_snDetail" sgtyle="border-bottom:1px solid #0090d4" >
            <tr>
              <th colspan="11" class="table_head">实时供求发布</th>
            </tr>
            <tr>
               
            <th 
                rowspan="1"
                style="color: #01ffff; font-size: 12px;background: #001e85;border:0px; border-left:1px solid #0090d4"
                colspan="2"
                
              >活羊(只)</th>
              <td>
                <span v-text="detail.breed_sheep_supply"></span>
              </td>
              <td>
                <span v-text="detail.slaughter_sheep_supply"></span>
              </td>
              <td>
                <span v-text="detail.slaughter_sheep_demand"></span>
              </td>
              <td>
                <span v-text="detail.process_sheep_supply"></span>
              </td>
              <td>
                <span v-text="detail.process_sheep_demand"></span>
              </td>
              <td>
                <span v-text="detail.dining_sheep_demand"></span>
              </td>
              <td>
                <span v-text="detail.meat_sheep_demand"></span>
              </td>
              <td>
                <span v-text="detail.cook_sheep_demand"></span>
              </td>
              <td>
                <span v-text="detail.market_sheep_demand"></span>
              </td>
            </tr>
            <tr>
              <th
                rowspan="1"
                style="color: #01ffff; font-size: 10px;background: #001e85;border:0px;border-left:1px solid #0090d4"
                colspan="2"
              >肉/产品(公斤)</th>
              <!-- <td class="o_noBack">肉/产品(公斤)</td> -->
              <td>
                <span v-text="detail.breed_meat_supply"></span>
              </td>
              <td>
                <span v-text="detail.slaughter_meat_supply"></span>
              </td>
              <td>
                <span v-text="detail.slaughter_meat_demand"></span>
              </td>
              <td>
                <span v-text="detail.process_meat_supply"></span>
              </td>
              <td>
                <span v-text="detail.process_meat_demand"></span>
              </td>
              <td>
                <span v-text="detail.dining_meat_demand"></span>
              </td>
              <td>
                <span v-text="detail.meat_meat_demand"></span>
              </td>
              <td>
                <span v-text="detail.cook_meat_demand"></span>
              </td>
              <td>
                <span v-text="detail.market_meat_demand"></span>
              </td>
            </tr>
            <tr>
            <th
                rowspan="1"
                style="color: #01ffff; font-size: 12px;background: #001e85;border:0px;border-left:1px solid #0090d4"
                colspan="2"
              >供求</th>
              <!-- <td class="o_noBack">供求</td> -->
              <td>
                <div class="o_font">供</div>
              </td>
              <td>
                <div class="o_font">供</div>
              </td>
              <td>
                <div class="o_font">求</div>  
              </td>
              <td>
                <div class="o_font">供</div>
              </td>
              <td>
                <div class="o_font">求</div>
              </td>
              <td>
                <div class="o_font">求</div>
              </td>
              <td>
                <div class="o_font">求</div>
              </td>
              <td>
                <div class="o_font">求</div>
              </td>
              <td>
                <div class="o_font">求</div>
              </td>
            </tr>
            <tr>
            <th
                rowspan="1"
                style="color: #01ffff; font-size: 12px;background: #001e85; border:0px; border-left:1px solid #0090d4;"
                colspan="2"
              >厂家(个)</th>
              <td colspan="2" class="o_double">
                <div class="o_font">养殖厂</div>
              </td>
              <td colspan="2" class="o_double">
                <div class="o_font">屠宰厂</div>
              </td>
              <td >
                <div class="o_font">加工厂</div>
              </td>
              <td>
                <div class="o_font">餐饮</div>
              </td>
              <td>
                <div class="o_font">鲜肉</div>
              </td>
              <td>
                <div class="o_font">熟食</div>
              </td>
              <td>
                <div class="o_font">商超</div>
              </td>
            </tr>
            <tr>
              <th
                rowspan="1"
                style="color: #01ffff; font-size: 12px;background: #001e85;border:0px; border-left:1px solid #0090d4;border-bottom:1px solid #0090d4"
                colspan="1"
              ></th>
              <td style="border:0px;border-bottom:1px solid #0090d4">&nbsp;</td>
              <td colspan="2" class="o_double">
                <div class="o_font">{{sum.breed}}</div>
              </td>
              <td colspan="2" class="o_double">
                <div class="o_font">{{sum.slaughter}}</div>
              </td>
              <td >
                <div class="o_font">{{sum.process}}</div></td>
              <td >
                <div class="o_font">{{sum.dining}}</div>
              </td>
              <td >
                <div class="o_font">{{sum.meat}}</div>
              </td>
              <td >
                <div class="o_font">{{sum.cook}}</div>
              </td>
              <td >
                <div class="o_font">{{sum.market}}</div>
              </td>
            </tr>
          </table>
        </div>
        <div class="o_sheep_line" >
            <div>
                <ve-line :data="chartData" :settings="chartSettings" :grid="grid" :yAxis="yAxis" :xAxis="xAxis" width="590px" height='220px' :mark-line="markLine" :extend="chartExtend"></ve-line>
            </div>
        </div>
        <div class="o_detail">
          <div class="o_inside">
            <div class="o_aside">
              <div
                class="o_company"
                v-for="(item, i) in items"
                :key="i"
                @click="handleClick(item.id, item.style)"
              >
                <span>{{i+1}}.&nbsp</span>
                <span v-text="item.name"></span>
              </div>
            </div>
            <div class="containerHead">
              <div class="chargeTitle">
                <div class="chargeman">
                  <span>联系人：{{corpation.chargeMan}}</span>
                </div>
                <div class="chargephone">
                  <span>电话：{{corpation.phone}}</span>
                </div>
              </div>
              <div style="background: #2c9aef">
                <div style="width: 100%;float: left">
                  <div class="choseStyleOne" @click="changeColor(0)" ref="one">
                    <span>可销售({{saleAll}}只)</span>
                  </div>
                  <div class="choseStyleTwo" @click="changeColor(1)" ref="two">
                    <span>总存栏({{liveAll}}只)</span>
                  </div>
                </div>
                <!-- <div class= "total_num">
							<span style="padding-left:13px">总数：{{countAll}}</span>
                </div>-->
              </div>
            </div>
            <div class="o_container">
              <div
                style="display: block; width: 68px; height: 20px; float: left;margin-left:15px; cursor: pointer;"
                v-for="(item, i) in eartagList"
                :key="i"
                @click="jump(item);"
              >
                <span>{{item}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footer class="o_foot">
      <p class="o_footMessage">
        Copyright &copy; 2018.贵州省东骏有机农业科技有限公司(Guizhou Dongjun Organic Agriculture Technology Co., Ltd.) 版权所有
        <br />软件著作编号: 2018SR504492; 2018SR503550; 2018SR503571; 2018SR503580; 2018SR503575; 2018SR503564;2018SR504500;
        <a
          href="http://www.miitbeian.gov.cn/"
          style="color:#028ca5"
        >黔ICP备18003179号</a>
        <br />
      </p>
    </footer> -->
  </div>
</template>
<script>
import pcaa from "area-data/pcaa";
import OMap from "./o_map";
import VeLine from  'v-charts/lib/line'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
import 'echarts/lib/component/markLine'
// import getPlace from './method.js'
import {
  getCustomerByAddress,
  getFactoryInformation,
  getCustomerInformation,
  getPlace,
  getAllSaleable,
  gelAllSheep,
  getSalableSheep,
  countSheep,
  getLocationSheep,
  getDataOfChartByAddress
} from "@/util/getdata";
export default {
  components: {
    OMap,VeLine
  },
  data() {
     this.chartSettings = {
          dimension: ['month'],
          xAxisType: 'time',
          legendName: {
          种母羊:'种母羊:0',
          种公羊:'种公羊:0',
          商品羊:'商品羊:0',
          羔羊:'羔羊:0'          
        },
        //可以通过生命周期，在页面加载的时候，从后台请求当前的羊只数量，然后改变legendName后面的数量
        yAxisName: ['只数'],
        min:[1,2]
      }
        this.grid = {
        show: true,
        top: 50,
        left: 10,
        backgroundColor: '#001e85',
        borderColor: '#01ffff',
        right:'7%',
        height:"75%"
      }
    return {
        chartData: {
          columns: ['month', '种母羊','种公羊', '商品羊', '羔羊'],
          rows: []
        },
        yAxis : {
              name:'数量(只)',
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#01ffff'
                  }
              },
              nameTextStyle:{
                color:'#01ffff'
              }
        },
        xAxis : {
            min:1,
            name:'月份',
            nameLocation:'end',
            nameTextStyle:{
              color:'#01ffff'
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#01ffff',
                    align:'left'
                    }
            },
        },
      markLine: {
        lineStyle: {
          show: true,
          color: '#808C94',
          type: 'dashed'
        }
      },
      chartExtend: {
            legend: {
              top:20,
              textStyle:{
              color:'#808C94'
              }
            },
          },
      geographic:{
        province:null,
        city:null,
        district:null
      },
      sum: {
        market: "",
        meat: "",
        slaughter: "",
        breed: "",
        dining: "",
        cook: "",
        process: ""
      },
      saleAll: 0,
      liveAll: 0,
      factoryId: -1,
      factoryType: 1,
      radio: "可销售",
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
        checked7: false
      },
      area: {
        province: [],
        city: [],
        country: [],
        town: []
      },
      value: {
        province: "",
        city: "",
        country: "",
        town: ""
      },
      data: [],
      place: { lan:0,lon:0,level: 11 },
      mapCenter: {
        lon: 0,
        lan: 0,
        level: 0
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
    };
  },
  created() {
    this.getXYbyIP()
    //.then(this.getCount())
  },
  mounted() {
    let url =
      "https://apis.map.qq.com/ws/district/v1/getchildren?key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM";
    let obj = { url };
    getPlace(obj).then(res => {
      res.result.forEach(item => {
        item.forEach(ipv => {
          this.area.province.push({
            label: ipv.fullname,
            value: ipv.id
          });
        });
      });
    });
    let row = this.chartData.rows
    let date = new Date()
    let month = date.getMonth()+1
    for(let i =1; i<=month; i++){
      let obj = { 'month': i,  '种母羊': 0,  '种公羊': 0, '商品羊': 0,  '羔羊': 0}
      row.push(obj)
    }
    for(let i = month+1; i<=12; i++){
      let obj = { 'month': i}
      row.push(obj)
    }
    //this.getXYbyIP()
    //this.search(1);
    this.changeColor(1, 0);
    //this.getCount(); //获取总羊只
  },
  methods: {
    provinceChoose(item) {
      let url =
        "https://apis.map.qq.com/ws/district/v1/getchildren?id=" +
        item.value +
        "&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM";
      let obj = { url };
      this.value.city = "";
      this.value.country = "";
      this.value.town = "";
      if (item.label.indexOf("市") == -1) {
        getPlace(obj).then(res => {
          this.area.city = [];
          res.result.forEach(item => {
            item.forEach(ipv => {
              this.area.city.push({
                label: ipv.fullname,
                value: ipv.id
              });
            });
          });
        });
      } else {
        this.value.city = "市辖区";
        getPlace(obj).then(res => {
          this.area.country = [];
          res.result.forEach(item => {
            item.forEach(ipv => {
              this.area.country.push({
                label: ipv.fullname,
                value: ipv.id
              });
            });
          });
        });
      }
    },
    cityChoose(item) {
      let url =
        "https://apis.map.qq.com/ws/district/v1/getchildren?id=" +
        item.value +
        "&key=DHYBZ-2HQKD-63E4Q-HGKZC-P3GEJ-ISFDM";
      let obj = { url };
      this.value.country = "";
      this.value.town = "";
      getPlace(obj).then(res => {
        this.area.country = [];
        res.result.forEach(item => {
          item.forEach(ipv => {
            this.area.country.push({
              label: ipv.fullname,
              value: ipv.id
            });
          });
        });
      });
    },
    querySearch(qs, cb) {
      cb([
        {
          value: "暂无数据请输入"
        }
      ]);
    },
    handleClick(id, type) {
      this.factoryId = id;
      this.factoryType = type;
      this.changeColor(1, type);
    },
    jump(item) {
      this.$router.push({ path: "/search", query: { code: item } });
    },
    changeColor(id) {
      this.eartagList = [];
      if (id) {
        //总存栏
        this.$refs.two.style.color = "black";
        this.$refs.two.style.background = "#7fcdf4";
        this.$refs.one.style.color = "#2c9aef";
        this.$refs.one.style.background = "rgba(255,255,255,0.01)";
        if (this.factoryId == -1) {
          let simpleAddress = this.geographic.province + this.geographic.city + this.geographic.district
          getLocationSheep(simpleAddress).then(res => {
            res.data.sheeps.forEach(item =>{
              this.eartagList.push(item.trademarkEarTag)
            })
            this.corpation.chargeMan = "";
            this.corpation.phone = "";
          });
          }else {
          if (this.factoryType) {
            getFactoryInformation(this.factoryId).then(res => {
              res.data.sheeps.forEach(item => {
                if (item != null) {
                  this.eartagList.push(item.trademarkEarTag);
                }
              });
              this.getCount(this.factoryId);
              if (res.data.factory !== null) {
                this.corpation.chargeMan =
                res.data.factory.contactPersonName;
                this.corpation.phone = 
                res.data.factory.contactPersonPhone;
              }
            });
          } else {
            getCustomerInformation(this.factoryId).then(res => {
              if (res.data.factory !== null) {
                this.corpation.phone =
                  res.data.responsiblePerson.contactPerson;
                this.corpation.chargeMan =
                  res.data.responsiblePerson.contactPersonPhone;
              }
              this.getCount(this.factoryId);
            });
          }
          }
        
      } else {
        //可销售羊只
        this.$refs.one.style.color = "black";
        this.$refs.one.style.background = "#7fcdf4";
        this.$refs.two.style.color = "#2c9aef";
        this.$refs.two.style.background = "rgba(255,255,255,0.01)";
        if (this.factoryId == -1) {
          let simpleAddress = this.geographic.province + this.geographic.city + this.geographic.district
          getLocationSheep(simpleAddress).then(res => {
            res.data.sheeps.forEach(item =>{
              if(item.canSale){
                _this.eartagList.push(item.trademarkEarTag)
              }
            })
          });
        } else {
          getSalableSheep(this.factoryId).then(res => {
            this.eartagList = res.data.sheep;
            this.corpation.chargeMan = res.data.factory.contactPersonName;
            this.corpation.phone = res.data.factory.contactPersonPhone;
          });
          this.getCount(this.factoryId);
        }
      }
    },
    getCount(id = "") {
      countSheep(id).then(res => {
        this.liveAll = res.data.all;
        this.saleAll = res.data.saleable;
      });
    },
    search(start) {
      let message = {};
      let simpleAddress = ''
      if (start) {
        let type = "养殖厂,屠宰厂,加工厂,鲜肉,餐饮,熟食,商超";
        message = { type, simpleAddress: "", detailAddress: "" };
      } else {
        if (this.value.province != "") {
          this.mapCenter.level = 5;
          simpleAddress += this.value.province.label;
          this.geographic.province = this.value.province.label
          if (simpleAddress.indexOf("市") != -1) {
            this.mapCenter.level = 6;
            simpleAddress += this.value.city;
          } else if (this.value.city != "") {
            this.mapCenter.level = 11;
            simpleAddress += this.value.city.label;
            this.geographic.district = this.value.city.label
          }
        }
        if (this.value.country != "") {
          simpleAddress += this.value.country.label;
          this.geographic.district = this.value.country.label
        }
        let detailAddress = this.value.town;
        let type = "";
        if (this.style.checked1) type += "养殖厂,";
        if (this.style.checked2) type += "屠宰厂,";
        if (this.style.checked3) type += "加工厂,";
        if (this.style.checked4) type += "鲜肉,";
        if (this.style.checked5) type += "餐饮,";
        if (this.style.checked6) type += "熟食,";
        if (this.style.checked7) type += "商超,";
        if (
          !this.style.checked1 &&
          !this.style.checked2 &&
          !this.style.checked3 &&
          !this.style.checked4 &&
          !this.style.checked5 &&
          !this.style.checked6 &&
          !this.style.checked7
        )
        type = "养殖厂,屠宰厂,加工厂,鲜肉,餐饮,熟食,商超,";
        type = type.substring(0, type.lastIndexOf(","));
        message = { type, simpleAddress, detailAddress };
      }
      this.data = [];
      this.items = [];
      let _this = this 
      getLocationSheep(simpleAddress).then(res => {
          _this.saleAll = 0;
          res.data.sheeps.forEach(item =>{
            if(item){
              if(item.canSale){
                _this.saleAll++
              }
            }
          })
          _this.liveAll = res.data.count;
      });
      getCustomerByAddress(message).then(res => {
        //this.getCount()
        if (res.data.factories.length != 0) { 
          res.data.factories.forEach(item => {
            let coordinates = [];
            let type = "Point";
            if (item.longitude != null) {
              this.mapCenter.lon = item.longitude;
              coordinates.push(item.longitude);
            }
            if (item.latitude != null) {
              this.mapCenter.lan = item.latitude;
              coordinates.push(item.latitude);
            }
            let geometry = { type, coordinates };
            let count = 3;
            this.data.push({ geometry, count });
            let id = item.id;
            let name = item.breedName;
            let style = 1; //1表示羊场
            this.items.push({ id, name, style });
          });
        }
        if (res.data.customers.length != 0) {
          res.data.customers.forEach(item => {
            let coordinates = [];
            let type = "Point";
            if (item.longitude != null) {
              this.mapCenter.lon = item.longitude;
              coordinates.push(item.longitude);
            }
            if (item.latitude != null) {
              this.mapCenter.lan = item.latitude;
              coordinates.push(item.latitude);
            }
            let geometry = { type, coordinates };
            let count;
            if (item.type == "屠宰厂" || item.type == "加工厂") {
              count = 1;
            } else {
              count = 2;
            }
            this.data.push({ geometry, count });
            let id = item.id;
            let name = item.name;
            let style = 0; //0表示屠宰加工消费
            this.items.push({ id, name, style });
          });
        }
        //当没有factory时候定位mapcenter
        if(res.data.customers.length == 0 && res.data.factories.length == 0){
            console.log(simpleAddress,"地理位置")
            let url = "https://api.map.baidu.com/geocoding/v3/?address=" +
            simpleAddress + "&output=json&ak=BMsRuPgitTR8eMopPH7FraZSz0t5HP9X&callback=showLocation"
            let new_this = this
            $.ajax({
              url: url,
              type: "POST",
              dataType: "JSONP",
              async: true, 
              cache: true,
              success: function(data) {
                new_this.mapCenter.lon = data.result.location.lng
                new_this.mapCenter.lan = data.result.location.lat
              }
            })
        }
        this.detail = {};
        if (res.data.total_output_sheep != 0) {
          this.total.total_output_sheep = res.data.total_output_sheep;
        }
        if (res.data.total_demand_sheep != 0) {
          this.total.total_demand_sheep = res.data.total_demand_sheep;
        }
        if (res.data.total_output_meat != 0) {
          this.total.total_output_meat = res.data.total_output_meat;
        }
        if (res.data.total_demand_meat != 0) {
          this.total.total_demand_meat = res.data.total_demand_meat;
        }
        if (res.data.statistics["养殖厂"].output != 0) {
          this.detail.breed_sheep_supply = res.data.statistics["养殖厂"].output;
        }
        if (res.data.statistics["屠宰厂"].output_sheep != 0) {
          this.detail.slaughter_sheep_supply =
            res.data.statistics["屠宰厂"].output_sheep;
        }
        if (res.data.statistics["屠宰厂"].demand_sheep != 0) {
          this.detail.slaughter_sheep_demand =
            res.data.statistics["屠宰厂"].demand_sheep;
        }
        if (res.data.statistics["加工厂"].output_sheep != 0) {
          this.detail.process_sheep_supply =
            res.data.statistics["加工厂"].output_sheep;
        }
        if (res.data.statistics["加工厂"].demand_sheep != 0) {
          this.detail.process_sheep_demand =
            res.data.statistics["加工厂"].demand_sheep;
        }
        if (res.data.statistics["餐饮"].demand_sheep != 0) {
          this.detail.dining_sheep_demand =
            res.data.statistics["餐饮"].demand_sheep;
        }
        if (res.data.statistics["鲜肉"].demand_sheep != 0) {
          this.detail.meat_sheep_demand =
            res.data.statistics["鲜肉"].demand_sheep;
        }
        if (res.data.statistics["熟食"].demand_sheep != 0) {
          this.detail.cook_sheep_demand =
            res.data.statistics["鲜肉"].demand_sheep;
        }
        if (res.data.statistics["商超"].demand_sheep != 0) {
          this.detail.market_sheep_demand =
            res.data.statistics["商超"].demand_sheep;
        }
        if (res.data.statistics["屠宰厂"].output_meat != 0) {
          this.detail.slaughter_meat_supply =
            res.data.statistics["屠宰厂"].output_meat;
        }
        if (res.data.statistics["屠宰厂"].demand_meat != 0) {
          this.detail.slaughter_meat_demand =
            res.data.statistics["屠宰厂"].demand_meat;
        }
        if (res.data.statistics["加工厂"].output_meat != 0) {
          this.detail.process_meat_supply =
            res.data.statistics["加工厂"].output_meat;
        }
        if (res.data.statistics["加工厂"].demand_meat != 0) {
          this.detail.process_meat_demand =
            res.data.statistics["加工厂"].demand_meat;
        }
        if (res.data.statistics["餐饮"].demand_meat != 0) {
          this.detail.dining_meat_demand =
            res.data.statistics["餐饮"].demand_meat;
        }
        if (res.data.statistics["鲜肉"].demand_meat != 0) {
          this.detail.meat_meat_demand =
            res.data.statistics["鲜肉"].demand_meat;
        }
        if (res.data.statistics["熟食"].demand_meat != 0) {
          this.detail.cook_meat_demand =
            res.data.statistics["鲜肉"].demand_meat;
        }
        if (res.data.statistics["商超"].demand_meat != 0) {
          this.detail.market_meat_demand =
            res.data.statistics["商超"].demand_meat;
        }
        if (res.data.statistics["商超"].count != 0) {
          this.sum.market = res.data.statistics["商超"].count;
        }
        if (res.data.statistics["熟食"].count != 0) {
          this.sum.cook = res.data.statistics["熟食"].count;
        }
        if (res.data.statistics["鲜肉"].count != 0) {
          this.sum.meat = res.data.statistics["鲜肉"].count;
        }
        if (res.data.statistics["餐饮"].count != 0) {
          this.sum.dining = res.data.statistics["餐饮"].count;
        }
        if (res.data.statistics["加工厂"].count != 0) {
          this.sum.process = res.data.statistics["加工厂"].count;
        }
        if (res.data.statistics["屠宰厂"].count != 0) {
          this.sum.slaughter = res.data.statistics["屠宰厂"].count;
        }
        if (res.data.statistics["养殖厂"].count != 0) {
          this.sum.breed = res.data.statistics["养殖厂"].count;
        }
      });
      getDataOfChartByAddress(message).then(res =>{
            let row = this.chartData.rows
            let youngsheep = res.data['羔羊']
            let ewe = res.data['种母羊']
            let ram = res.data['种公羊']
            let saleSheep = res.data['商品羊']
            let len = Object.getOwnPropertyNames(youngsheep).length
            let top = this.chartSettings.legendName
            for(let i=1 ; i<=len ; i++){
              if(youngsheep[i]!==null){
                row[i-1]['羔羊'] = youngsheep[i]
              }
              else {
                row[i-1]['羔羊'] = 0
              }
              if(ewe[i]!==null){
                row[i-1]['种母羊'] = ewe[i]
              }
              else {
                row[i-1]['种母羊'] = 0
              }
              if(ram[i]!==null){
                row[i-1]['种公羊'] = ram[i]
              }
              else {
                row[i-1]['种公羊'] = 0
              }
              if(saleSheep[i]!==null){
                row[i-1]['商品羊'] = saleSheep[i]
              }
              else {
                row[i-1]['商品羊'] = 0
              }
              if(i==len){
                if(youngsheep[i]!==null){
                  top['羔羊']=`羔羊:${youngsheep[i]}`
                  row[i-1]['羔羊'] = youngsheep[i]
                  }
                else{
                  top['羔羊']='羔羊:0'
                  }
                if(ewe[i]!==null){
                  top['种母羊']=`种母羊:${ewe[i]}`
                  row[i-1]['种母羊'] = ewe[i]
                  console.log(row[i-1]['种母羊'])
                }
                else{
                  top['种母羊']='种母羊:0'
                }
                if(ram[i]!==null){
                  top['种公羊']=`种公羊:${ram[i]}`
                  row[i-1]['种公羊'] = ram[i]
                }
                else{
                  top['种公羊']='种公羊:0'
                }
                if(saleSheep[i]!==null){
                  top['商品羊']=`商品羊:${saleSheep[i]}`
                  row[i-1]['商品羊'] = saleSheep[i]
                }
                else{
                  top['商品羊']='商品羊:0'
                }
              }
            }
        })
    },
    getXYbyIP() {
      let _this = this;
      let url =
        "https://api.map.baidu.com/location/ip?ak=HQi0eHpVOLlRuIFlsTZNGlYvqLO56un3&coor=bd09ll"; //百度
      let res = $.ajax({
        url: url,
        type: "POST",
        dataType: "JSONP",
        async: true, 
        cache: true,
        success: function(data) {
          _this.place.lon = data.content.point.x;
          _this.place.lan = data.content.point.y;
          _this.geographic.province = data.content.address_detail.province
          _this.geographic.city = data.content.address_detail.city
          _this.geographic.district = data.content.address_detail.district
           let detailAddress =""
          console.log(_this.geographic,111)
          let simpleAddress = ''
          simpleAddress = _this.geographic.province + _this.geographic.city + _this.geographic.district
          console.log(_this.geographic.province)
          let type = "养殖厂,屠宰厂,加工厂,鲜肉,餐饮,熟食,商超,"
          let message = {
            simpleAddress,
            detailAddress,
            type
          }
          getCustomerByAddress(message).then((res) =>{
            if (res.data.factories.length != 0) {
          res.data.factories.forEach(item => {
            let coordinates = [];
            let type = "Point";
            if (item.longitude != null) {
              _this.mapCenter.lon = item.longitude;
              coordinates.push(item.longitude);
            }
            if (item.latitude != null) {
              _this.mapCenter.lan = item.latitude;
              coordinates.push(item.latitude);
            }
            let geometry = { type, coordinates };
            let count = 3;
            _this.data.push({ geometry, count });
            let id = item.id;
            let name = item.breedName;
            let style = 1; //1表示羊场
            _this.items.push({ id, name, style });
          });
        }
        if (res.data.customers.length != 0) {
          res.data.customers.forEach(item => {
            let coordinates = [];
            let type = "Point";
            if (item.longitude != null) {
              _this.mapCenter.lon = item.longitude;
              coordinates.push(item.longitude);
            }
            if (item.latitude != null) {
              _this.mapCenter.lan = item.latitude;
              coordinates.push(item.latitude);
            }
            let geometry = { type, coordinates };
            let count;
            if (item.type == "屠宰厂" || item.type == "加工厂") {
              count = 1;
            } else {
              count = 2;
            }
            _this.data.push({ geometry, count });
            let id = item.id;
            let name = item.name;
            let style = 0; //0表示屠宰加工消费
            _this.items.push({ id, name, style });
          });
        }
        _this.detail = {};
        if (res.data.total_output_sheep != 0) {
          _this.total.total_output_sheep = res.data.total_output_sheep;
        }
        if (res.data.total_demand_sheep != 0) {
          _this.total.total_demand_sheep = res.data.total_demand_sheep;
        }
        if (res.data.total_output_meat != 0) {
          _this.total.total_output_meat = res.data.total_output_meat;
        }
        if (res.data.total_demand_meat != 0) {
          _this.total.total_demand_meat = res.data.total_demand_meat;
        }
        if (res.data.statistics["养殖厂"].output != 0) {
          _this.detail.breed_sheep_supply = res.data.statistics["养殖厂"].output;
        }
        if (res.data.statistics["屠宰厂"].output_sheep != 0) {
          _this.detail.slaughter_sheep_supply =
            res.data.statistics["屠宰厂"].output_sheep;
        }
        if (res.data.statistics["屠宰厂"].demand_sheep != 0) {
          _this.detail.slaughter_sheep_demand =
            res.data.statistics["屠宰厂"].demand_sheep;
        }
        if (res.data.statistics["加工厂"].output_sheep != 0) {
          _this.detail.process_sheep_supply =
            res.data.statistics["加工厂"].output_sheep;
        }
        if (res.data.statistics["加工厂"].demand_sheep != 0) {
          _this.detail.process_sheep_demand =
            res.data.statistics["加工厂"].demand_sheep;
        }
        if (res.data.statistics["餐饮"].demand_sheep != 0) {
          _this.detail.dining_sheep_demand =
            res.data.statistics["餐饮"].demand_sheep;
        }
        if (res.data.statistics["鲜肉"].demand_sheep != 0) {
          _this.detail.meat_sheep_demand =
            res.data.statistics["鲜肉"].demand_sheep;
        }
        if (res.data.statistics["熟食"].demand_sheep != 0) {
          _this.detail.cook_sheep_demand =
            res.data.statistics["鲜肉"].demand_sheep;
        }
        if (res.data.statistics["商超"].demand_sheep != 0) {
          _this.detail.market_sheep_demand =
            res.data.statistics["商超"].demand_sheep;
        }
        if (res.data.statistics["屠宰厂"].output_meat != 0) {
          _this.detail.slaughter_meat_supply =
            res.data.statistics["屠宰厂"].output_meat;
        }
        if (res.data.statistics["屠宰厂"].demand_meat != 0) {
          _this.detail.slaughter_meat_demand =
            res.data.statistics["屠宰厂"].demand_meat;
        }
        if (res.data.statistics["加工厂"].output_meat != 0) {
          _this.detail.process_meat_supply =
            res.data.statistics["加工厂"].output_meat;
        }
        if (res.data.statistics["加工厂"].demand_meat != 0) {
          _this.detail.process_meat_demand =
            res.data.statistics["加工厂"].demand_meat;
        }
        if (res.data.statistics["餐饮"].demand_meat != 0) {
          _this.detail.dining_meat_demand =
            res.data.statistics["餐饮"].demand_meat;
        }
        if (res.data.statistics["鲜肉"].demand_meat != 0) {
          _this.detail.meat_meat_demand =
            res.data.statistics["鲜肉"].demand_meat;
        }
        if (res.data.statistics["熟食"].demand_meat != 0) {
          _this.detail.cook_meat_demand =
            res.data.statistics["鲜肉"].demand_meat;
        }
        if (res.data.statistics["商超"].demand_meat != 0) {
          _this.detail.market_meat_demand =
            res.data.statistics["商超"].demand_meat;
        }
        if (res.data.statistics["商超"].count != 0) {
          _this.sum.market = res.data.statistics["商超"].count;
        }
        if (res.data.statistics["熟食"].count != 0) {
          _this.sum.cook = res.data.statistics["熟食"].count;
        }
        if (res.data.statistics["鲜肉"].count != 0) {
          _this.sum.meat = res.data.statistics["鲜肉"].count;
        }
        if (res.data.statistics["餐饮"].count != 0) {
          _this.sum.dining = res.data.statistics["餐饮"].count;
        }
        if (res.data.statistics["加工厂"].count != 0) {
          _this.sum.process = res.data.statistics["加工厂"].count;
        }
        if (res.data.statistics["屠宰厂"].count != 0) {
          _this.sum.slaughter = res.data.statistics["屠宰厂"].count;
        }
        if (res.data.statistics["养殖厂"].count != 0) {
          _this.sum.breed = res.data.statistics["养殖厂"].count;
        }
      })
      getLocationSheep(simpleAddress).then(res => {
        _this.saleAll = 0;
        res.data.sheeps.forEach(item =>{
          _this.eartagList.push(item.trademarkEarTag)
          if(item.canSale){
            _this.saleAll++
          }
        })
        _this.liveAll = res.data.count;
        _this.corpation.chargeMan = "";
        _this.corpation.phone = "";
      });
          getDataOfChartByAddress(message).then(res =>{
                let row = _this.chartData.rows
                let youngsheep = res.data['羔羊']
                let ewe = res.data['种母羊']
                let ram = res.data['种公羊']
                let saleSheep = res.data['商品羊']
                let len = Object.getOwnPropertyNames(youngsheep).length
                let top = _this.chartSettings.legendName
                for(let i=1 ; i<=len ; i++){
                  if(youngsheep[i]!==null){
                    row[i-1]['羔羊'] = youngsheep[i]
                  }
                  else {
                    row[i-1]['羔羊'] = 0
                  }
                  if(ewe[i]!==null){
                    row[i-1]['种母羊'] = ewe[i]
                  }
                  else {
                    row[i-1]['种母羊'] = 0
                  }
                  if(ram[i]!==null){
                    row[i-1]['种公羊'] = ram[i]
                  }
                  else {
                    row[i-1]['种公羊'] = 0
                  }
                  if(saleSheep[i]!==null){
                    row[i-1]['商品羊'] = saleSheep[i]
                  }
                  else {
                    row[i-1]['商品羊'] = 0
                  }
                  if(i==len){
                    if(youngsheep[i]!==null){
                      top['羔羊']=`羔羊:${youngsheep[i]}`
                      }
                    else{
                      top['羔羊']='羔羊:0'
                      }
                  }
                  if(i==len){
                    if(ewe!==null){
                      top['种母羊']=`种母羊:${ewe[i]}`
                    }
                    else{
                      top['种母羊']='种母羊:0'
                    }
                    
                  }
                  if(i==len){
                    if(ram[i]!==null){
                      top['种公羊']=`种公羊:${ram[i]}`
                    }
                    else{
                      top['种公羊']='种公羊:0'
                    }
                  }
                  if(i==len){
                    if(saleSheep[i]!==null){
                      top['商品羊']=`商品羊:${saleSheep[i]}`
                    }
                    top['商品羊']='商品羊:0'
                  }
                }

            })
        },
        error: function(data) {}
      })
    },

  }
};
</script>
<style lang="stylus">
.o_organic
	overflow hidden
	height 100%
	background url(https://qiniu.yunyangbao.cn/searchBack.png) no-repeat center
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
					color #6d9dfb
				.el-autocomplete
					width 16%
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
					height calc(90vh - 200px)
					height -moz-calc(90vh - 200px)
					height -webkit-calc(90vh - 200px)
					height calc(90vh - 200px)
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
					background green
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
				margin-left -60px
				height calc(80vh - 50px)
				height -moz-calc(80vh - 50px)
				height -webkit-calc(80vh - 50px)
				height calc(80vh - 50px)
		.right
			float right
			color #00c5dd
			text-align center
			width 41%
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
							width 4.0vw
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
							width 7vw
							height 19px
							// min-width 30px
            th 
              text-align left
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
			.o_sheep_line
        z-index -1
        font-size 12px
				margin-top 10px
        margin-left 20px
  			height calc(85vh - 250px)
				height -moz-calc(85vh - 250px)
				height -webkit-calc(85vh - 250px)
				height calc(85vh - 250px)
				float right
				width 99%
			.o_detail
				font-size 12px
				margin-top 220px
				float right
				width 99%
				margin-right 5%
				height calc(85vh - 470px)
				height -moz-calc(85vh - 470px)
				height -webkit-calc(85vh - 470px)
				height calc(85vh - 470px)
				background url(../../assets/imgs/mapBack.png) no-repeat center
				background-size 100% 100%
				padding-top 2%
				.o_inside
					margin 0 auto
					height 92%
					width 92%
					border 2px solid #021e86
					.containerHead
						float left
						width 60%
						height 56px
						background rgba(255,255,255,0.01)
						// .total_num
						// 	padding-top 5px
						// 	width 100%
						// 	float left
						// 	color #f29512
						// 	//border-bottom 1px dotted #f29512
						// 	text-align left
						// 	font-size 14px
						.chargeTitle
							padding-top 5px
							height 25px
							font-size 12px
							background rgba(44,154,239,0.1)
							.chargeman
								float left
								width 44%
							.chargephone
								float left
								width 50%
						.choseStyleOne,.choseStyleTwo
							float left
							border 0.5px solid #7fcdf4
							width 49.5%
							height 25px
							text-align center
							line-height 25px
							cursor pointer
						.choseStyleOne
							background-color #7fcdf4
							color black
					.o_container
						overflow auto
						float left
						width 60%
						height calc(100%- 56px)
						background rgba(255,255,255,0.01)
						text-align left
						overflow: -moz-hidden-unscrollable;
						-ms-overflow-style: none//IE 10+滚动条
						overflow: -moz-scrollbars-none//firefox
					.o_company::-webkit-scrollbar { display: none }::-webkit-scrollbar { display: none }
					.o_aside
						//overflow-x scroll
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
							overflow: -moz-hidden-unscrollable;
							-ms-overflow-style: none//IE 10+滚动条
							overflow: -moz-scrollbars-none//firefox
						.o_company:hover
							background-color #00b8ee
							color #00459e
						.o_company::-webkit-scrollbar { display: none }
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