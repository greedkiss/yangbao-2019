<template>
    <div class="admin-form mod_production">
        <div class="production-search">
            <el-row>
            <el-select v-model="condition" @change="change">
                <el-option
                  v-for="con in conditions"
                  :key="con.value"
                  :label="con.label"
                  :value="con.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-if="condition === 'date'"
                class="search-input"
                v-model="time"
                type="daterange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-input v-else-if="condition !== 'all'" v-model="keyWords" placeholder="请输入查询关键字" class="search-input"></el-input>
            </el-row>
            <div v-if="isBreed">
                <el-row style="margin-top: 20px">
                <div v-if="!isSale" class="time el-input-group select" style="width: 250px; margin-right: 0px">
                        <span class="time-span ellipse"  v-text="'栋号：'" style="width: 80px"></span><el-autocomplete
                            :disabled="disableAll"
                            size="small"
                            v-model="model.building"
                            :fetch-suggestions="produceBuilding"
                            @select="selectBuilding">
                        </el-autocomplete>
                </div>
                <div v-if="!isSale" class="time el-input-group select" style="width: 250px ; margin-right: 0px">
                        <span class="time-span ellipse"  v-text="'栏号：'" style="width: 80px"></span><el-autocomplete
                            :disabled="disableAll"
                            size="small"
                            v-model="model.colnumString"
                            :fetch-suggestions="producecolnum"
                            @select="selectcolnum">
                        </el-autocomplete>
                    </div>

                    <div class="time el-input-group select" style="width: 250px">
                        <span class="time-span ellipse"  v-text="'耳牌号：'" style="width: 100px"></span><el-autocomplete
                            :disabled="disableAll"
                            size="small"
                            v-model="model.earTag"
                            :fetch-suggestions="produceEarTag"
                            @select="selectEarTag">
                        </el-autocomplete>
                    </div>
                </el-row>
            </div>
            <el-row style="margin-top: 20px">
            <el-button type="primary" @click="getAll()">搜索</el-button>
            <el-button v-if="!isSale" @click="getPicture()">图片</el-button>
            <el-button v-if="!isSale" @click="getVeido()">视频</el-button>
            </el-row>
        </div>
        <div class="production-view">
            <div class="production-content" v-for="(item, i) in proList" :key="i">
                <el-card>
                    <i v-if="item.filetype === 1" class="el-icon-caret-right video-icon "></i>
                    <img @click="showPop(i)" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info" v-if="!isDiagnose">商标耳牌：{{ item.brand }}</p>
                    <p v-if="isSale" class="production-info">时间：{{ item.udate }}</p>
                    <p  v-if="!isSale" class="production-info">时间：{{ item.time }}</p>
                    <el-dialog
                      :visible.sync="productionShow[i]"
                      width="50%"
                      center>
                        <!-- FIXME: video 标签兼容性处理 -->
                        <div class="show-detail">
                            <video v-if="item.filetype === 1 || item.filetype === 6" :src="item.urlSpecific" class="production-video" controls="controls" height="400" width="400"></video>
                            <img v-else class="production-image-detail" :src="item.url" :onerror="defaultImg">
                        </div>
                        <div class="show-list">
                            <ul>
                                <li v-if="isDiagnose"><el-tag>商标耳牌</el-tag> {{ item.brand }}</li>
                                <li v-if="isDiagnose"><el-tag>检疫耳牌</el-tag> {{ item.vaccine }}</li>
                                <li v-if="isDiagnose"><el-tag>畜牧性别</el-tag> {{ item.sex }}</li>
                                <li v-if="isDiagnose"><el-tag type="warning">症状描述</el-tag> {{ item.symptom }}</li>
                                <li v-if="isDiagnose"><el-tag type="danger">解决方案</el-tag> {{ item.solution }}</li>
                                <li v-if="isDiagnose"><el-tag type="success">就诊专家</el-tag> {{ item.expert }}</li>
                                <li><el-tag>上传日期</el-tag> {{ item.udate }}</li>
                            </ul>
                        </div>
                        <div slot="footer">
                            <el-button size="small" type="primary" @click="deleteItem(item, i)">删除</el-button>
                        </div>
                    </el-dialog>
                </el-card>
            </div>
        </div>

        <el-pagination
          v-if="!isSale"
          layout="prev, pager, next"
          :total="total"
          :page-size="12"
          :current-page.sync="pageNumb"
          @current-change="changePage">
        </el-pagination>

        <el-pagination
          v-if="isSale"
          layout="prev, pager, next"
          :total="total2"
          :page-size="12"
          :current-page.sync="page2"
          @current-change="getAllSale">
        </el-pagination>
    </div>
    
</template>

<script>
import { diaSearchAll, diaSearchByExpert, diaSearchByDate, diaSearchByBrand, diaSearchByVaccine, diaSearchBySymptom, diaSearchByUploader, deleteDiagnose,findSaleVideo } from '@/util/getdata'
import { baseUrl } from '@/util/fetch'
import { isReqSuccessful , getThumbPicture} from '@/util/jskit'
import {getUserById , getSheepBuilding , getSheepCol ,getSheepEarTag} from '@/util/getdata'

export default {
    props: {
        isBreed: {
            type: Boolean,
            default: true
        },
        isSale:{
            type: Boolean,
            default: false
        },
        conditions: {
            type: Array
        },

        isDiagnose: {
            type: Boolean,
            default: false
        },

        isSlaughter: {
            type: Boolean,
            default: false
        },

        isConsumer: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            diaSearch: { // 查询接口对象
                expert: diaSearchByExpert,
                date: diaSearchByDate,
                brand: diaSearchByBrand,
                vaccine: diaSearchByVaccine,
                symptom: diaSearchBySymptom,
                uploader: diaSearchByUploader
            },
            disableAll:false,
            // 设置出错图片
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            // defaultImg: 'this.src="//otxtxlg3e.bkt.clouddn.com/FA4EA1F6F081AAC90EA490C18481189C.jpg"', 
            condition: 'all',
            time: [],
            keyWords: '',
            productionShow: [],
            proList: [],
            pageNumb: 1,
            total: 0,
            page2:1,
            total2:10,
            limit: 12,
            model:{
                building: '',
                colnum: '',
                earTag: this.$route.query.ramSheepTrademark==undefined?'':this.$route.query.ramSheepTrademark,
                colnumString: ''
            },
            user: null,
            factory: {
                buildingList: [],
                colnumList: [],
                earTagList: []
            },
        }
    },  

    mounted () {
        let id = this.$route.params.id
           getUserById(id).then(res => {
              this.user = res.data.model
           }).then(this.fetchData).then(this.getProList)
    },
    methods: {
        fetchData(){
            if(this.isBreed){
                    getSheepBuilding(this.user.userFactory).then(res => {
                    this.factory.buildingList = res.data.data
                })
            }
        },
        produceBuilding(q, cb){
                let data = []
                this.factory.buildingList.forEach((item) => {
                    let obj = {value:item}
                    data.push(obj)
                })
                cb(data)
        },

        selectBuilding(item){
            this.model.building = item.value
            getSheepCol(this.user.userFactory , this.model.building).then(res=>{
                this.factory.colnumList = res.data.data
        })
        },

        producecolnum(q , cb){
            let data = []
            this.factory.colnumList.forEach((item) => {
                let obj = {value : item}
                data.push(obj)
            })
            cb(data)
        },

        selectcolnum(item){
            this.model.colnumString = item.value.toString()
            this.model.colnum = item.value
            let buildings = [{
                building : this.model.building,
                column : this.model.colnum
            }]
            let factory = this.user.userFactory
            let data = {buildings, factory}
            getSheepEarTag(data).then(res=>{
                this.factory.earTagList = res.data.models
            })
        },

        produceEarTag(q, cb){
            let data = []
            this.factory.earTagList.forEach((item) => {
                let obj = {value : item}
                data.push(obj)
            })
            cb(data)
        },

        selectEarTag(item){
            this.model.earTag=item.value
        },


        //old

        deleteItem (item, index) {
            deleteDiagnose(item.id).then(res => {
                if (isReqSuccessful(res)) {
                    this.$message.success('删除成功')
                    this.$set(this.productionShow, index, true)
                    this.getProList()
                }
            })
        },
        showPop (i) {
            this.$set(this.productionShow, i, true);
        },
        change () {
            this.pageNumb = 1
        },
        changePage(){
            this.getProList(this.isImg)
        },
        getAll(){
            this.pageNumb = 1
            this.getProList()
        },
        getAllSale(){
            this.getProList()
        },
        getPicture(){
            this.pageNumb = 1
            if(this.isBreed)
                this.getProList(0)
            else
                this.getProList(5)
        },
        getVeido(){
            this.pageNumb = 1
            if(this.isBreed)
                this.getProList(1)
            else
                this.getProList(6)
        },
        // 0 只获取图片
        // 1 只获取视频
        // 2 获取全部（默认值）
        getProList (style = 2) {
            
            if(this.isSale){
                let data={
                    factory:this.user.userFactory,
                    page:(this.page2-1)*10,
                    size:10,
                    earTag:this.model.earTag
                }
            findSaleVideo(data).then(res => {
                    if(res.meta.code==0) {
                        if(res.data.result==[]) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        this.proList=[];
                        let arr = [];
                        let i=0;
                        res.data.result.forEach((item) => {
                            i++;
                            let v={
                                url:item.address,
                                brand:item.brand,
                                udate:item.udate,
                                urlSpecific:item.address,
                                filetype:item.filetype
                            }
                            if(item.filetype == 1 || item.filetype == 6){
                                v.url = getThumbPicture(item.filename)
                            }
                            this.proList.push(v)
                        })
                        this.total2 = i
                        console.log(this.total2)
                        this.productionShow = new Array(arr.length).fill(false);
                        return
                    }else{
                    this.$message.error('查询失败')
                    }
                })

                return
            }
            this.isImg = style
            if(this.isBreed == false && this.isImg == 2){
                this.isImg = 3
            }
            if(this.condition === 'all') { // 查询所有数据
                let data = {
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit,
                    filetype: this.isImg,
                    factory: this.user.userFactory,
                    building: this.model.building,
                    colNum: this.model.colnum,
                    brand: this.model.earTag,
                    uploader: this.user.id,
                }
                if(this.isDiagnose == true){
                    let obj = {expert:this.user.userRealname}
                    data = Object.assign(data, obj)
                }
                if(this.isSlaughter){
                    let obj = {factoryType: 1}
                    data = Object.assign(data, obj)
                }
                if(this.isConsumer){
                    let obj = {factoryType: 2}
                    data = Object.assign(data, obj)
                }
                if(this.isBreed){
                    let obj = {factoryType: 0}
                    data = Object.assign(data, obj)
                }
                diaSearchAll(data).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = item.address
                            item.time = item.udate
                            item.urlSpecific= item.address
                            if(item.filetype == 1 || item.filetype == 6){
                                item.url = getThumbPicture(item.filename)
                            }
                        })
                        this.proList = res.data.List
                        this.total = res.data.size
                        this.productionShow = new Array(arr.length).fill(false);
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            }else if(this.condition === 'date') { // 按日期查询
                let data = {
                    sdate: this.time[0] || null,
                    edate: this.time[1] || null,
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit,
                    filetype: this.isImg,
                    factory:this.user.userFactory,
                    building:this.model.building,
                    colNum:this.model.colnum,
                    brand:this.model.earTag,
                    uploader:this.user.id
                }
                if(this.isDiagnose == true){
                    let obj = {expert:this.user.userRealname}
                    data = Object.assign(data, obj)
                }
                if(this.isSlaughter){
                    let obj = {factoryType: 1}
                    data = Object.assign(data, obj)
                }
                if(this.isConsumer){
                    let obj = {factoryType: 2}
                    data = Object.assign(data, obj)
                }
                if(this.isBreed){
                    let obj = {factoryType: 0}
                    data = Object.assign(data, obj)
                }
                diaSearchByDate(data).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = item.address
                            item.time = item.udate
                            item.urlSpecific= item.address
                            if(item.filetype == 1 || item.filetype == 6){
                                item.url = getThumbPicture(item.filename)
                            }
                        })
                        this.proList = res.data.List
                        this.total = res.data.size
                        this.productionShow = new Array(arr.length).fill(false);
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            } else { // 按相应条件查询
                let data = {
                    [this.condition]: this.keyWords,
                    pageNumb: this.pageNumb - 1,
                    limit: this.limit,
                    filetype: this.isImg,
                    factory:this.user.userFactory,
                    building:this.model.building,
                    colNum:this.model.colnum,
                    brand:this.model.earTag,
                    uploader:this.user.id
                }
                if(this.isDiagnose == true){
                    let obj = {expert:this.user.userRealname}
                    data = Object.assign(data, obj)
                }
                if(this.isSlaughter){
                    let obj = {factoryType: 1}
                    data = Object.assign(data, obj)
                }
                if(this.isConsumer){
                    let obj = {factoryType: 2}
                    data = Object.assign(data, obj)
                }
                if(this.isBreed){
                    let obj = {factoryType: 0}
                    data = Object.assign(data, obj)
                }
                this.diaSearch[this.condition](data).then(res => {
                    if(isReqSuccessful(res)) {
                        if(!res.data.List.length) {
                            this.$message.warning('未查询到数据')
                            this.proList = []
                            this.total = 0
                            return
                        }
                        let arr = []
                        res.data.List.forEach((item) => {
                            item.url = item.address
                            item.time = item.udate
                            item.urlSpecific= item.address
                            if(item.filetype == 1 || item.filetype == 6){
                                item.url = getThumbPicture(item.filename)
                            }
                        })
                        this.proList = res.data.List
                        this.total = res.data.size
                    }
                }).catch(_ => {
                    this.$message.error('查询失败')
                })
            } 
        } 
    }
}
</script>

<style lang="stylus">
@import '../../../assets/css/view-list.styl'
</style>
