<template>
    <div class="admin-form">
        <p class="card-title">生产可视截图</p>

        <div class="border-main">
            <div class="form-summary">
                <div class="time el-input-group select">
                    <span class="time-span ellipse"  v-text="'图片/视频类型：'"></span><el-autocomplete
                        size="small"
                        v-model="pictureStyle"
                        :fetch-suggestions="getPictureStyle"
                        @select="selectStyle">
                    </el-autocomplete>
                </div>
                <div style = "width: 500px"></div>
                <div class="time el-input-group select" style="width: 250px; margin-right: 0px">
                    <span class="time-span ellipse"  v-text="'栋号：'" style="width: 80px"></span><el-autocomplete
                        :disabled="disableAll"
                        size="small"
                        v-model="model.building"
                        :fetch-suggestions="produceBuilding"
                        @select="selectBuilding">
                    </el-autocomplete>
                </div>

                <div class="time el-input-group select" style="width: 200px ; margin-right: 0px">
                    <span class="time-span ellipse"  v-text="'栏号：'" style="width: 80px"></span><el-autocomplete
                        :disabled="disableAll"
                        size="small"
                        v-model="model.columnString"
                        :fetch-suggestions="produceColumn"
                        @select="selectColumn">
                    </el-autocomplete>
                </div>

                <div class="time el-input-group select" style="width: 300px">
                    <span class="time-span ellipse"  v-text="'耳牌号：'" style="width: 100px"></span><el-autocomplete
                        :disabled="disableAll"
                        size="small"
                        v-model="model.earTag"
                        :fetch-suggestions="produceEarTag"
                        @select="selectEarTag">
                    </el-autocomplete>
                </div>

                <el-input v-for="(item, i) in captures" :key="i" class="select-file" style="width:610px" size="small" disabled @click.native="$refs.erpai[i].click()" :value="item.model">
                    <template slot="prepend">上传生产可视截图:<input type="file" @change="selectFile(item, i)" hidden ref="erpai"></template>
                </el-input>
                <el-button size="small" type="primary" @click="addCapture()">增设截图</el-button>
                <el-button v-if="deleteOne" size="small" type="primary" @click="deleteCapture()">删除截图</el-button>
            </div>
        </div>
        <div class="card">
            <p class="card-title">图片/视频上传进度:</p>
            <el-progress v-for="(item, i) in captures" :text-inside="true" :stroke-width="18" :percentage="captures[i].per" style="margin-top: 10px" :key="i"></el-progress>
        </div>
        <div class="card">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="note"></el-input>
        </div>
        <div class="admin-send">
            <el-button type="primary">取消</el-button>
            <el-button type="primary" @click="submit()">提交/更新</el-button>
        </div>
    </div>
</template>
<script>
const qiniu = require('qiniu-js')
import { getUserById, getSheepBuilding, getSheepCol, getSheepEarTag} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'
export default {
    data () {
        return {
            model: {
                building: '',
                column: '',
                earTag: '',
                columnString: ''
            },
            user: null,
            disableAll: false,
            pictureStyle: '',
            erpai: '',
            captures: [{model: null , per : 0}],
            note: '',
            factory: {
                buildingList: [],
                columnList: [],
                earTagList: []
            },
            deleteOne:false,
            fileType: 0
        }
    },

    mounted () {
       let id = this.$route.params.id
       getUserById(id).then(res => {
          this.user = res.data.model
       }).then(this.fetchData)
    },

    methods: {
        fetchData () {
            getSheepBuilding(this.user.userFactory).then(res => {
                this.factory.buildingList = res.data.data
            })
        },

        produceBuilding (q, cb) {
                let data = []
                this.factory.buildingList.forEach((item) => {
                    console.log(item)
                    let obj = {value: item}
                    data.push(obj)
                })
                cb(data)
        },

        selectBuilding (item) {
            this.model.building = item.value
        },

        produceBuilding (q, cb) {
                let data = []
                this.factory.buildingList.forEach((item) => {
                    let obj = {value: item}
                    data.push(obj)
                })
                cb(data)
        },

        selectBuilding(item){
            this.model.building = item.value
            getSheepCol(this.user.userFactory , this.model.building).then(res => {
                this.factory.columnList = res.data.data
            })
        },

        produceColumn(q , cb){
            let data = []
            this.factory.columnList.forEach((item) => {
                let obj = {value : item}
                data.push(obj)
            })
            cb(data)
        },

        selectColumn(item){
            this.model.columnString = item.value.toString()
            this.model.column = item.value
            let buildings = [{
                building : this.model.building,
                column : this.model.column
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
            this.model.earTag = item.value
        },

        selectFile (item, idx) {
            let file = this.$refs.erpai[idx].files[0]
            item.model = file.name
            item.file = file
        },

        addCapture () {
            this.captures.push({model: null ,per: 0})
            this.deleteOne = true
        },
        deleteCapture(){
            this.captures.pop()
        },
        submit () {
                let form = new FormData()
                let col
                if(this.model.column == null){
                    col = parseInt(this.model.columnString)
                }else{
                    col = this.model.column
                }
                form.append('userId', this.$route.params.id)
                form.append('building', this.model.building)
                form.append('col', col)
                form.append('brand', this.model.earTag)
                form.append('factoryId', this.user.userFactory)
                form.append('filetype', this.fileType)
                this.captures.forEach((item, index) => {
                     form.append('file[]', this.$refs.erpai[index].files[0])
                })
                let headers = {}
                headers[authStr] = window.localStorage.getItem(tokenStr)
                window.fetch(baseUrl + '/uploadFile/productPic', {
                    method: 'POST',
                    headers,
                    body: form
                }).then(async res => {
                    let body = await res.json()
                    if(body.data.token != null){
                        this.captures.forEach((item, index) => {
                            let file = this.$refs.erpai[index].files[0]
                            let key = body.data.names[index]
                            let token = body.data.token
                            let putExtra = {
                                fname: "",
                                    params: {},
                                    mimeType: null
                              }
                              let config = {
                                useCdnDomain: true,
                                    disableStatisticsReport: false,
                                    retryCount: 6,
                              }
                              let self = this
                              let observer = {
                                next(res){
                                    self.captures[index].per = parseInt(res.total.percent)
                                },
                                error(res){
                                    self.$message.error()('上传失败')
                                },
                                complete(res){
                                    self.$message.success('上传成功')
                                    let obj = new FormData()
                                    obj.append('name' , key)
                                    let headers = {}
                                    headers[authStr] = window.localStorage.getItem(tokenStr)
                                    window.fetch(baseUrl + '/createThumb', {
                                        method: 'POST',
                                        headers,
                                        body: obj
                                    }).then(async res => {
                                        let body = await res.json()
                                    })
                                }
                              }
                              let observable = qiniu.upload(file, key, token, putExtra, config)
                              observable.subscribe(observer)
                        })
                    }else{
                        this.captures.forEach((item ,index) => {
                            this.captures[index].per = 100
                            this.$message.success('上传成功')
                        })
                    }
                })
                this.fileType = 0
        },

        getPictureStyle (q, cb) {
            let typeName = [
                {value: '羊场生产图片', index: '0'},
                {value: '羊场生产视频', index: '1'},
                {value: '羊群生产图片', index: '2'},
                {value: '羊群生产视频', index: '3'},
                {value: '羊只生产图片', index: '4'},
                {value: '羊只生产视频', index: '5'}
            ]
            cb(typeName)
        },

        selectStyle(item){
            this.pictureStyle = item.value
            if(item.index == 4 || item.index == 5) {
                this.disableAll = false
            }
            else{
                this.disableAll = true
            }
            if(item.index == 2 || item.index == 3){
                this.fileType = 9
            }
        },
    }
}
</script>
