<template>
    <div class="admin-form">
        <div class="card" >
                <!-- <div class="time el-input-group" style="width:330px">
                    <span class="time-span ellipse" >屠宰时间</span>
                    <el-date-picker
                        v-model="slaughterTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        type="datetime">
                    </el-date-picker>
                </div> -->
                <div class="formAndCarmera">
                    <div class="formWraaper">
                        <div class="inputWrapper">
                            <span class="inputSpan ellipse" >选择屠宰羊只</span>
                            <el-input  size="small" style="width:65% !important" v-model="searchCode"></el-input>
                        </div>
                        <div class="inputWrapper">
                                <span class="inputSpan ellipse" >附属编号</span>
                                <el-input  size="small" style="width:65% !important" v-model="appendageNumber"></el-input>
                        </div>
                        <div style="margin-top:25px">
                            
                            <div class="inputWrapper">
                                <el-button type="primary" size="small" style="width:35%; border-radius:15px" @click="getWeight" >点击获取重量</el-button>
                                <el-input  size="small" style="width:65% !important" v-model="appendageWeight"></el-input>
                            </div>
                            <div class="inputWrapper">
                                <el-button type="primary" size="small" style="width:35%; border-radius:15px" @click="capture()">点击获取照片</el-button>
                                <el-input size="small" style="width:65% !important" v-model="picSuccess"></el-input>
                            </div>
                        </div>
                        <div class="admin-send" style="margin-top:35px">
                            <template >
                                <el-button type="primary" @click="submit()">提交/打印</el-button>
                            </template>
                        </div>
                    </div>
                        
                    <div class="cameraWrapper">
                        <div class="videoWrapper">
                            <video ref="video" id="video" width="320" height="240" autoplay></video>
                        </div>
                        <div class="takePhotoBtn">
                            <!--<el-button size="mini" type="primary" @click="capture()">拍照</el-button>-->
                            <vue-record-video v-show="false" id="recordBtn" @result="onResult"/>
                        </div>
                        <canvas v-show="false" ref="canvas" id="canvas" width="320" height="240"></canvas>
                        <!-- <ul>
                            <li v-for="c in captures" :key="c">
                                <img v-bind:src="c" height="50" />
                            </li>
                        </ul> -->
                    </div>
                </div>
        </div>
        <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%;margin-top:20px;"
        :border="true"
        @current-change="handleCurrentChange"
        >
            <el-table-column
				type="index">
			</el-table-column>
            <el-table-column
				label="商标耳牌号"
				width="120"
				prop="trademarkEarTag">
			</el-table-column>
            <el-table-column
				label="照片"
				width="120"
			>
                <template slot-scope="scope">
                    <div class="opr" >
                        <span @click="view(scope.$index)">查看</span>
                    </div>
                </template>
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
      	    <el-table-column
				label="屠宰前时间"
				width="120"
				prop="time">
			</el-table-column>
            <el-table-column width="120" label="操作">
                <template slot-scope="scope">
                    <span size="small" style="cursor:pointer" @click="Delete(scope.row)" >删除</span>
                </template>
            </el-table-column>
        </el-table>
    <div class="block" style="margin-left: 46px">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="fetchData" :current-page.sync="page">
        </el-pagination>
    </div>
    <el-dialog title="图片详情"    
        :visible.sync="dialogFormVisible" 
        width="800px">
            <div>
            <el-card :body-style="{ padding: '0px' }">
                <img :src="pic" class="image" :onerror="defaultImg">
            </el-card>
            </div>
    </el-dialog>
    <div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>
    </div>
</template>

<script>
import { isReqSuccessful, readSerialPort, isInstalled } from '@/util/jskit'
import QRCode from 'qrcodejs2'
import {getUserById,postSlaughter,getAppendageData} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

//getSlaughterManage
export default {
    components: {
    },
    mounted(){
        // var myDate=new Date();
		// var myMonth=myDate.getMonth()+1;
        // this.slaughterTime=myDate.getFullYear()+"-"+myMonth+"-"+myDate.getDate()+"-"+myDate.getHours()+"-"+myDate.getMinutes();
         let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model    
            }
        }).then(this.fetchData)
        this.video = this.$refs.video;
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                if ('srcObject' in video) {
                video.srcObject = stream;
                } else {
                video.src = URL.createObjectURL(stream);
                }
                this.video.play();
            });
        }
    },
    data () {
        return {
            user:null,
            tableData:[],
            total:0,
            page:1,
            multipleSelection:[],
                slaughterTime:null,
                fatherNumber:null,
                searchCode:null,
                appendageNumber:null,
                appendageWeight:null,
                appendVideo:{
                    fileName:null,
                    file:null
                },

                kidNumber:null,
                kidWeight :null,
                kidVideo:{
                    fileName:null,
                    file:null
                },   
            selectRow:null, 
            isSegment:"1",
            video: {},
            canvas: {},
            captures: [],
            picSuccess:'',
            picFlie:null,
            videoFile:null,
            pic:"",
            dialogFormVisible:false,
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
        }
    },
    watch:{
        searchCode(newval){
            let reg = /[MSG]\d+/;
            let res = this.searchCode.match(reg);
            if(res){
                this.searchCode = res[0];
                //防抖，当长度小于 7 的时候，进行防抖处理，当长度大于7的时候，直接查询
                if(newval.length < 7){
                    if(this.debounce != null){
                        clearTimeout(this.debounce);
                    }
                    this.debounce = setTimeout(()=>{
                        this.fetchData();
                    }, 800);
                }else{
                    clearTimeout(this.debounce);
                    this.fetchData();
                }
            }
            //删除到零的时候，直接查询所有数据
            if(newval.length == 0){
                this.fetchData();
            }
        }
    },
    methods:{
       handleCurrentChange(currentRow,oldCurrentRow) {
            this.selectRow = currentRow;
            this.fatherNumber=this.selectRow.trademarkEarTag
            this.appendageNumber=this.fatherNumber+'F';
        },
        getnumber(){
            this.appendageNumber=this.fatherNumber+'F';
        },
        submit () {
            let form=new FormData();
            let date = new Date();
            date = date.getFullYear() + "-" + (date.getMonth() + 1) +"-" +date.getDate() +" "+ date.getHours() + ":" + date.getMinutes() +":" +date.getSeconds();
            console.log(date)
            
            form.append('slaughterTime',date)
            form.append('fatherNumber',this.fatherNumber )
            form.append('appendageNumber',this.appendageNumber)
            form.append('appendageWeight',this.appendageWeight)
            form.append('appendage',this.picFlie)
            form.append('operator',this.user.id)
            form.append('operatorName',this.user.userRealname)
            console.log(form)
            let headers = {}
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/slaughter/appendage', {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                let body = await res.json()
                if (isReqSuccessful(body)) {
                    this.$message.success('上传成功') 
                    this.fetchData()
                    setTimeout(()=>{
                        this.printCode(this.appendageNumber);
                    },200)
                }
                else{
                this.$message.error('上传失败')
                }
            })
        },
        async fetchData(){
			let param = {   
                    factory:this.user.userFactory,
                    page: this.page - 1,
                    size: 10,
                }
            if(this.searchCode){
                param.trademark = this.searchCode
            }
			this.tableData = []
			getAppendageData(param).then(res => {
                if (isReqSuccessful(res)) {
               		this.total = res.data.number // Math.ceil(res.data.number/param.size)*10
               		let data = res.data.List
                    if(this.searchCode && this.searchCode.length >= 7 ){
                        let flag = false;
                        for(let i = 0; i < data.length; i++){
                            if(data[i].trademarkEarTag == this.searchCode){
                                this.appendageNumber = this.searchCode + 'D';
                                flag = true;
                                break;
                            }
                        }
                        if(!flag){
                            this.$message.warning('没有相关数据');
                        }
                    }
               		data.forEach((v) => {
						this.tableData.push(v)
               		})
                }
            })
        },
        async getWeight(){
            if(!isInstalled()){
                window.location='https://qiniu.yunyangbao.cn/goserial.exe'
                return 
            }
            let res = await readSerialPort()
            this.appendageWeight = res || 0
        },
        async printCode(start){
                this.qrcodeimgs=[];
                this.codeNumber=start;
                let urlCode=`http://yyb8.cn/#/mS?eT=${this.codeNumber}`
                document.getElementById("qrcode1").innerHTML = "";
                //异步，等待结果
                await this.waitqr(urlCode);
                let src=document.getElementById("qrcode1").children[1].getAttribute("src");
                let docStr=
                `<div style="page-break-after:always; width:100px"><canvas height="300" style="display: none;"></canvas><div style="margin-top:-5px; text-align:center"><img alt="Scan me!" src="${src}"style="display: block;" width="95"><p style="font-size:10px; transform:scale(0.6,0.6);margin-top:-5px">${this.codeNumber}</p></div>`;
                var newWindow=window.open("打印窗口","_blank");			
                newWindow.document.write(docStr);
                var styles=document.createElement("style");
                styles.setAttribute('type','text/css');//media="print";
                styles.innerHTML="" ;
                newWindow.document.getElementsByTagName('head')[0].appendChild(styles);
                newWindow.print();
                newWindow.close();
        },
        waitqr(codeNumber){
                //先调用qrcode,生成二维码，然后0.01秒之后返回成功
				this.qrcode(codeNumber)
				return new Promise((resolve)=>{
					setTimeout(resolve,10)
				});
        },
		qrcode (codeNumber) {
			let qrcode = new QRCode(this.$refs.qrcode, {
                width: 300,
                height:300,
                text: codeNumber
			})
        },
        capture() {
            this.canvas = this.$refs.canvas;
            var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 320, 240);
            this.captures.push(canvas.toDataURL("image/png"));
            console.log(this.captures);
            this.picSuccess = "拍照成功";
            this.picFlie = this.dataURLtoBlob(this.captures.pop());
            console.log(this.picFlie);
        },
        onResult (data) {
            console.log('The blob data:', data);
            this.picFlie = data;
            this.picSuccess = "视频录制成功";
            console.log('Downloadable audio', window.URL.createObjectURL(data));
            this.vedio = this.$refs.video;
            if ('srcObject' in video) {
                video.srcObject = data.stream;
            } else {
                video.src = URL.createObjectURL(data.stream);
            }
        },
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
        view(index){
            this.pic=this.tableData[index].video;
            this.dialogFormVisible=true;
        },
    }
}
</script>

<style scope lang="stylus">
    .inputWrapper
        display inline-block
        font-size 0
        width 45% 
        .inputSpan
            box-sizing border-box
            display inline-block
            height 32px
            width 35%
            line-height 32px  
            text-align center    
            vertical-align top
            font-size 14px
            color #2891d1
            &+.el-input
                width calc(100% - 80px)!important
    .formAndCarmera
        display flex
        .formWraaper
            flex 0 1 60% 
        .cameraWrapper
            flex 0 1 40% 
            .videoWrapper
                width 100%   
            .takePhotoBtn
                width 80%
                margin 10px auto
                text-align center 
                display flex
                justify-content center
                #recordBtn
                    margin-left 16px
                    div
                        border-radius: 5px !important
                        width 56px
                        height 28px
                        font-size 14px

</style>
