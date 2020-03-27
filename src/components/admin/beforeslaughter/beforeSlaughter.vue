<template>
    <div class="admin-form">
        <div class="card" >
                <div class="formAndCarmera">
                    <div class="formWraaper">
                        <div class="inputWrapper">
                            <span class="inputSpan ellipse" style="width:35%">选择羊只</span>
                            <el-input  size="small"  style="width:65% !important" v-model.lazy="tradeMarkEarTag" ></el-input>
                        </div>
                        <div style="margin-top:25px">
                            <div class="inputWrapper">
                                <el-button type="primary" size="small" @click="getWeight" style="width:35%; border-radius:15px">点击获取重量</el-button>
                                <el-input  size="small" style="width:65% !important;" v-model="weight"></el-input>
                            </div>
                            <div class="inputWrapper" style="margin-left:30px">
                                <el-button type="primary" size="small" style="width:35%; border-radius:15px" @click="capture()">点击获取照片</el-button>
                                <el-input size="small" style="width:65% !important" v-model="picSuccess"></el-input>
                            </div>
                        </div>
                        <div class="admin-send" style="margin-top:35px">
                            <template >
                                <el-button type="primary" @click="submit()">提交</el-button>
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
                    </div>
                </div>

        </div>
<div>
    <el-table 
        :data="tableData"
        style="width: 100%">
            <el-table-column
				label="商标耳牌号"
				width="120"
				>
                <template slot-scope="scope">
                    <div class="opr" >
                        <span @click="chooseID(scope.$index)">{{tableData[scope.$index].trademarkEarTag}}</span>
                    </div>
                </template>
			</el-table-column><el-table-column
				label="视频"
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
				label="时间"
				width="120"
				prop="time">
			</el-table-column>
            <el-table-column
				label="来源养殖场"
				width="120"
				prop="breedFactory">
			</el-table-column>
            <el-table-column width="120" label="操作">
                <template slot-scope="scope">
                    <span size="small" style="cursor:pointer" @click="Delete(scope.row)" >删除</span>
                </template>
            </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        @current-change="fetchData"
        :current-page.sync="page">
    </el-pagination>
    <el-dialog title="图片详情"    
    :visible.sync="dialogFormVisible" 
    width="800px">
        <div>
            <video :src="videoSrc" style="width:100%" controls="controls" height="400" width="400"></video>
        </div>
    </el-dialog>
    <div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>
    </div>
</div>
</template>

<script>
import { isReqSuccessful} from '@/util/jskit'
import QRCode from 'qrcodejs2'
import {getUserById,getManageData} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

//getSlaughterManage
export default {
    components: {
    },
    mounted(){
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
            tradeMarkEarTag:"",
            appendageNumber:null,
            weight:null,
            selectRow:null, 
            isSegment:"1",
            video: {},
            canvas: {},
            captures: [],
            picSuccess:'',
            picFlie:null,
            videoFile:null,
            debounce:null,
            dataID: -1,
            emitWatcher:true,
            videoSrc:'',
            dialogFormVisible:false
        }
    },
    watch:{
        tradeMarkEarTag(newval){
            //当手动点击列表选择ID的时候，不需要触发这个查找
            if(this.emitWatcher){
                let reg = /[MSG]\d+/;
                let res = this.tradeMarkEarTag.match(reg);
                if(res){
                    this.tradeMarkEarTag = res[0];
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
        }
    },
    methods:{
       handleCurrentChange(currentRow,oldCurrentRow) {
            this.selectRow = currentRow;
            this.fatherNumber=this.selectRow.trademarkEarTag
            this.appendageNumber=this.fatherNumber+'F';
            this.kidNumber=this.fatherNumber+'D';
        },
        getnumber(){
            this.appendageNumber=this.fatherNumber+'F';
            this.kidNumber=this.fatherNumber+'D';
        },
        submit () {
            let form=new FormData();
            form.append('id',this.dataID);
            form.append('weight', this.weight);
            form.append('file', this.picFlie);
            let headers = {};
            headers[authStr] = window.localStorage.getItem(tokenStr);
            window.fetch(baseUrl + '/slaughter/m', {
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
            let data = {
                certificate:this.qaId,
                trademark:this.tradeMarkEarTag,
                startTime:(this.gmtCreate == null) ? "" : this.gmtCreate[0],
                endTime:(this.gmtCreate == null) ? "" : this.gmtCreate[1],
                page:this.page-1,
                size:10,
                factory:this.user.userFactory,
                type:0
            }
            this.tableData = [];
            /**
            如果是通过扫码输入的数据，进行查询，那么将查询到的数据的ID保存到 dataID中，然后在添加体重和照片的时候直接带上。
             */
            getManageData(data).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data;
                    if(this.tradeMarkEarTag.length >= 7 ){
                        let flag = false;
                        for(let i = 0; i < data.List.length; i++){
                            if(data.List[i].trademarkEarTag == this.tradeMarkEarTag){
                                this.dataID = data.List[i].id;
                                flag = true;
                                break;
                            }
                        }
                        if(!flag){
                            this.$message.warning('没有相关数据');
                        }
                    }
                    this.tableData = data.List;
                    this.total = data.number
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
        gotoList(){
            let id = this.$route.params.id;
            let path = `/admin/${id}/beforeslaughter/list`;
            this.$router.push(path);
        },
        chooseID(index){
            this.dataID = this.tableData[index].id;
            this.emitWatcher = false;
            this.$nextTick(() => {
                this.$set(this, "tradeMarkEarTag", this.tableData[index].trademarkEarTag);
                this.$nextTick(()=>{
                    this.emitWatcher = true;
                })
            })
        },
        view(index){
          this.videoSrc=this.tableData[index].video;
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
                100%
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
