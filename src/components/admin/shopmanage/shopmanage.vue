<template>
    <div class="admin-form outWare">
        <div class="border-main">
            <div class="formAndCarmera">
                <div class="formWraaper">
                    <div class="print-manager">
                        <div class="flex-border">
                            <div class="label">取料</div>
                            <div class="input">
                                <el-input v-model="codeNumber" placeholder="请输入/扫入材料编码"></el-input>
                            </div>
                            <div class="button">
                                <button @click="dialogCaiVisible = true">点击修改出产单品</button>
                            </div>
                        </div>
                        <div class="flex-border">
                            <div class="label">成品编码</div>
                            <div class="input">
                                <el-input v-model="qrcodeNumber" placeholder="" readonly></el-input>
                            </div>  
                        </div>
                        <div class="flex-border">
                            <div class="label">
                                <div class="button">
                                    <button @click="getWeight">点击获取重量</button>
                                </div>
                            </div>
                            <div class="input">
                                <el-input v-model="weight" placeholder=""></el-input>
                            </div>  
                            <div class="label">
                                <div class="button">
                                    <button @click="capture()">点击获取成品照片</button>
                                </div>
                            </div>
                            <div class="input">
                                <el-input v-model="picSuccess" placeholder=""></el-input>
                            </div>  
                        </div>
                        <div class="btn-center">
                            <button @click="submitprint">提交打印</button>
                        </div>
                    </div>
                </div>
                <div class="cameraWrapper">
                    <div class="videoWrapper">
                        <video ref="video" id="video" width="320" height="240" autoplay></video>
                    </div>
<!--                     <div class="takePhotoBtn">
                        <el-button size="mini" type="primary" @click="capture()">拍照</el-button>
                        <vue-record-video id="recordBtn"  @result="onResult"/>
                    </div> -->
                    <canvas v-show="false" ref="canvas" id="canvas" width="320" height="240"></canvas>
                </div>
                <el-dialog title="修改出产单品" :visible.sync="dialogCaiVisible">
                        <el-select v-model="opt1value" placeholder="选择成品品类">
                            <el-option
                            v-for="item in productTypes"
                            :key="item"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                        <el-select v-model="opt2value" placeholder="选择成品名称">
                            <el-option
                            v-show="item.dishesType === opt1value"
                            v-for="item in productset"
                            :key="item.dishesName"
                            :label="item.dishesName"
                            :value="item.dishesName">
                            </el-option>
                        </el-select>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogCaiVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureDishes">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div> 
        <div class="outWare-form">
            <el-table
            :data="tableData"
            ref="singleTable"
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :border="true"
            @current-change="handleCurrentChange"
            >
<!--                 <el-table-column v-show="false"
                    label="#"
                    width="120"  
                    prop="id">
                </el-table-column> -->

                <el-table-column
                    label="生产编码"
                    width="120"  
                    prop="partNumber">
                </el-table-column>

                <el-table-column
                    label="产品名称"
                    width="120"
                    prop="productName">
                </el-table-column>
                
                <el-table-column
                    label="照片/视频"
                    width="120"
                    prop="video">
                    <template slot-scope="scope">
                        <div class="opr" >
                            <el-button type="text" @click=" watchMakeUpVideo(scope.$index, scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="产品重量"
                    width="120"
                    prop="weight">
                </el-table-column>

                <el-table-column
                    label="时间"
                    width="200"
                    prop="orderTime">
                </el-table-column>

                <el-table-column
                    label="来源单位"
                    width="240"
                    prop="breedName">
                </el-table-column>

                <el-table-column
                    label="剩余分量"
                    width="120"
                    prop="residualWeight">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteRow(scope.$index, scope.row)">报废</el-button>
                    </template>
            </el-table-column>

            </el-table>
            <div class="block" style="margin-left: 46px">
                <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="getDetailed" :current-page.sync="page">
                </el-pagination>
            </div>
        </div>

            <el-dialog
            title="视频/照片"
            :visible.sync="dialogVideoVisible"
            width="50%"
            center>
                <!-- FIXME: video 标签兼容性处理 -->
                <div class="show-detail">
                    <video v-if="sheepVideo.filetype === 1 || sheepVideo.filetype === 6" :src="sheepVideo.url" class="production-video" controls="controls" height="400" width="400"></video>
                    <img v-else class="production-image-detail" :src="sheepVideo.url" :onerror="defaultImg">
                </div>
                <div class="show-list">
                    <ul>
                        <li><el-tag>产品编号</el-tag> {{ sheepVideo.erNumber }}</li>
                    </ul>
                </div>
            </el-dialog>

            <el-dialog
            title="视频/照片"
            :visible.sync="dialogMakeUpVideoVisible"
            width="50%"
            center>
                <!-- FIXME: video 标签兼容性处理 -->
                <div class="show-detail">
                    <video v-if="makeUpVideoWatch.filetype === 1 || makeUpVideoWatch.filetype === 6" :src="makeUpVideoWatch.url" class="production-video" controls="controls" height="400" width="400"></video>
                    <img v-else class="production-image-detail" :src="makeUpVideoWatch.url" :onerror="defaultImg">
                </div>
                <div class="show-list">
                    <ul>
                        <li><el-tag>成品编号</el-tag> {{ makeUpVideoWatch.Number }}</li>
                    </ul>
                </div>
            </el-dialog>

        <div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>
    </div>
</template>

<script>
import { isReqSuccessful, readSerialPort, isInstalled} from '@/util/jskit'
import QRCode from 'qrcodejs2'
import { getUserById,getoutWareManageNum,getoutWareManageDetailed,PostProductNumber,nextPrint,findMakeUpVideo,getProductSet,submitPrint,deleteWareManageDetailed} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

export default {
   mounted(){
       let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
					this.user = res.data.model
                let {userFactory} = this.user
            }
            }).then(this.getNum).then(this.getDetailed).then(this.getProduct)
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
            tableData:[],
            tableData2:[],
            numtableData:[],
            sheepVideo:{
				url:null,
				filetype:0,
				erNumber:null
            },
            addPic:{
                number:null,
                file:null,
                fileName:null,
            },
            makeUpVideoWatch:{
                url:null,
				filetype:0,
				Number:null
            },
            madeupVideo:null,
            dialogAddPictureVisible:false,
            defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
            total:10,
            page:1,
            total2:1,
            page2:1,
            dialogMakeUpVideoVisible:false,
            dialogVideoVisible:false,
            dialogMessage:{
                number:null,
                name:null,
                copies:null,
                id:null
            },
            dialogFormVisible:false,
            user:{},
            codeNumber: null,
            qrcodeNumber: null,     // 二维码
            hasCopies:true,
            video: {},
            canvas: {},
            captures: [],
            picSuccess:'',
            test: '', // 测试
            dialogCaiVisible: false,    // 切换菜品框开关
            productTypes: [],
            opt1value: '',  // 菜品种类选中项
            opt2value: '',
            defaulttype: '',    // 默认菜品
            defaultname: '',    // 默认菜名
            productset: [],
            pic: null,     // 拍的图片
            productName: '',    // 名字
            divId: 0,       // 分割id
            weight: '',     // 重量
            currentRow: '', // 选择的行
            dishesId: '',   // 所选菜品id
            count: 0,       // 打印计数
            printNumber: 0, // 打印份数
            mutton: 0,      // 羊肉用量
        }
    },
    watch: {
        codeNumber() {
            if(this.codeNumber === '') {
                this.qrcodeNumber = '';
                this.weight = '';
            }
            this.tableData.forEach(item => {
                if(item.partNumber == this.codeNumber) {
                    this.setCurrent(item);
                }
            })  
        },
    },
    methods: {
        //份数and查看
        changeCopies(row,column,cell){
            if(column.label=='产品份数'){
                if(row.counts != -1){
                    this.tableData2=[];
                    let param = {   
                            customerId: this.user.userFactory,
                            divisionId: row.id,
                        } 
                    nextPrint(param).then(res => {
                        if (isReqSuccessful(res)) {
                        let data = res.data.List
                        if(data===null){
                            this.$message.warning('已打印完毕，请分割其他产品！')
                            return
                        }
                            this.tableData2.push(data)
                            this.picSuccess = "";
                        }else{
                            this.$message.error('获取数据失败')
                        }
                    })
                    this.hasCopies=true      
                }else{
                    this.dialogMessage.number=row.partNumber
                    this.dialogMessage.name=row.productName
                    this.dialogMessage.copies=row.counts
                    this.dialogMessage.id=row.id
                    this.dialogFormVisible=true
                }
            }
            if(column.label=="照片/视频"){
                let url='';
                this.sheepVideo.filetype=0
                this.sheepVideo.url=''
				this.dialogVideoVisible=true;
                this.sheepVideo.erNumber=row.partNumber
                this.tableData.some(function(item,index){
                if(item.partNumber==row.partNumber){
                    url=item.video
                    return
                }
            })
                this.sheepVideo.url=url
			}	
        },
        //份数确认
        sureCopies(){
            this.tableData2=[];
            let param = {   
                    customerId:this.user.userFactory,
                    divisionId:this.dialogMessage.id,
                    partNumber:this.dialogMessage.number,
                    productName:this.dialogMessage.name,
                    number:parseInt(this.dialogMessage.copies),
                           } 
            PostProductNumber(param).then(res => {
                if (isReqSuccessful(res)) {
                    this.tableData.some(function(item,index){
                            if(item.partNumber==param.partNumber){
                                item.counts=parseInt(param.number)
                                return
                            }
                        })
                    let data = res.data.List
               		   	this.tableData2.push(data)
                    this.$message.success('分块成功')
                }else{
                    this.$message.error('获取数据失败')
                }
            })
            this.dialogFormVisible = false
            this.hasCopies=true      
        },
        watchMakeUpVideo(row,column){
            console.log('打开媒体');
            let url='';
            this.makeUpVideoWatch.url=''
            this.dialogMakeUpVideoVisible=true;
            this.makeUpVideoWatch.Number=row.partNumber
            let id = row.id
            findMakeUpVideo(id).then(res => {
                if(res.meta.code==0) {
                        let data=res.data.List;
                        this.makeUpVideoWatch.url=data.video;
                        this.makeUpVideoWatch.filetype=data.fileType
                }else{
                    this.$message.error('查询失败')
                }
            })
        },
        async cellClick(row){
            this.tableData2=[];
            this.codeNumber=row.partNumber;
            let param = {   
                customerId: this.user.userFactory,
                divisionId: row.divisionId,
            }
                nextPrint(param).then(res => {
                if (isReqSuccessful(res)) {
                    let data = res.data.List
                    if(data===null){
                        this.$message.warning('已打印完毕，请分割其他产品！')
                        return
                    }
                        this.tableData2.push(data)
                        this.picSuccess = "";
                }else{
                    this.$message.error('获取数据失败')
                }
            })
			document.getElementById("qrcode1").innerHTML = "";

            //异步，等待结果
            let urlCode=`http://yyb8.cn/#/mS?eT=${this.codeNumber}`
            console.log(urlCode);
		    await this.waitqr(urlCode);
            let src=document.getElementById("qrcode1").children[1].getAttribute("src");
            let docStr=
            `<div style="page-break-after:always; width:100px"><canvas height="300" style="display: none;"></canvas><div style="margin-top:-5px; text-align:center"><img alt="Scan me!" src="${src}"style="display: block;" width="95"><p style="font-size:10px; transform:scale(0.6,0.6);margin-top:-5px">${this.codeNumber}</p></div>`;
			var newWindow=window.open("打印窗口","_blank");			
			newWindow.document.write(docStr);
			var styles=document.createElement("style");
			styles.setAttribute('type','text/css');//media="print"
			styles.innerHTML="" 
			newWindow.document.getElementsByTagName('head')[0].appendChild(styles);
			newWindow.print();
			newWindow.close();
		},

		//获取二维码
		waitqr(codeNumber){
                //先调用qrcode,生成二维码，然后0.1秒之后返回成功
				this.qrcode(codeNumber)
				return new Promise((resolve)=>{
					setTimeout(resolve,100)
				});
			},
		qrcode (codeNumber) {

			let qrcode = new QRCode(this.$refs.qrcode, {
                width: 300,
                height:300,
                text: codeNumber
			})

      },
        getDetailed(){
            let param = {
                page: this.page - 1,
                size: 10,
                factory: this.user.userFactory
            } 
            this.tableData = [];               
            getoutWareManageDetailed(param).then(res => {
                if (isReqSuccessful(res)) {
                    console.log(res.data);
               		 this.total = res.data.total //Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.list
               		 data.forEach((v) => {
               		   	this.tableData.push(v)
               		 })
                }else{
                    this.$message.error('获取数据失败')
                }
            })

        },
        //添加视频
      	addPicture(row){
            this.madeupVideo = null;
            this.addPic.number = row.partNumber;
            this.addPic.id = row.id;
            let form = new FormData();
            form.append('id', this.addPic.id);
            form.append('video', this.addPic.file);
            let headers = {};
            this.dialogAddPictureVisible=false;
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/d/out/video', {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                let body = await res.json()
                if (isReqSuccessful(body)) {
                        this.$message.success('上传成功')
                }
                else{
                    this.$message.error('上传失败')
                }
            })
            this.cellClick(row)
		},
        capture() {
            this.canvas = this.$refs.canvas;
            var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 320, 240);
            this.captures.push(canvas.toDataURL("image/png"));
            console.log(this.captures);  
            this.picSuccess = "拍照成功";
            //this.addPic.file = this.dataURLtoBlob(this.captures.pop()); 
            this.pic = this.dataURLtoBlob(this.captures.pop());// 获取图片
            console.log(this.pic);

        },
        onResult (data) {
            console.log('The blob data:', data);
            this.addPic.file = data;
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
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },    
        // 点击一行
        handleCurrentChange(val) {
            this.currentRow = val;
            if(this.currentRow) {
                this.codeNumber = this.currentRow.partNumber;
                this.divId = this.currentRow.id;
                this.count = this.currentRow.counts;
                this.qrcodeNumber = this.codeNumber + this.count;
                this.productName = this.currentRow.productName;
            }
            console.log(this.currentRow);
        },
        // 删除表格一行
        deleteRow(index, rows) {
            console.log(rows);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteWareManageDetailed(rows.id).then(res => {
                            if(res.meta.code === 0) {
                                this.$message.success('删除成功');
                                this.tableData.splice(index,1);
                            } else {
                                this.$message.error('删除失败')
                            }
                        })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    }).then(this.getDetailed);
            window.event.stopPropagation();
        },
        // 加载页面时获取菜品
        getProduct() {
            getProductSet(this.user.userFactory).then(res => {
                console.log(res.data);
                this.productset = res.data.data;
                this.productset.forEach(item => {
                    if(this.productTypes.indexOf(item.dishesType) === -1) {
                        this.productTypes.push(item.dishesType);
                    }
                    if(item.isEnable == 1) {
                        this.defaulttype =  this.opt1value = item.dishesType;
                        this.defaultname = this.opt2value = item.dishesName;
                    }
                })
                this.productset.forEach(item => {
                    if(item.dishesName == this.opt2value) {
                        this.dishesId=item.id;
                        this.mutton = item.mutton;
                    }
                })
            })
        },
        getWeight(){
            isInstalled().then(res => {
                readSerialPort().then(res => {
                    this.weight = res || 0
                })
            }, 
            error => {
                this.$message.warning('请安装goserial文件并双击运行')
                window.location='https://qiniu.yunyangbao.cn/goserial.exe'
            })
        },
        sureDishes() {
            this.dialogCaiVisible = false;
            this.productset.forEach(item => {
                if(item.dishesName == this.opt2value) {
                    this.dishesId=item.id;
                }
            })
        },
        async submitprint() {
            if(this.weight == '') {
                this.weight = 0;
            }
            // 提交

            let form = new FormData();
            form.append('divisionId', this.divId);
            form.append('file', this.pic);
            form.append('customerId', this.user.userFactory);
            form.append('productName', this.productName);
            form.append('dishesId', this.dishesId);
            form.append('partNumber',this.qrcodeNumber)
            form.append('weight', parseFloat(this.weight));
            let headers = {};
            headers[authStr] = window.localStorage.getItem(tokenStr)
            window.fetch(baseUrl + '/d/out/settlement', {
                method: 'POST',
                headers,
                body: form
            }).then(async res => {
                let body = await res.json()
                if (isReqSuccessful(body)) {
                    let code = body.meta.code;
                    if(code === 0){
                        this.$message.warning('提交成功，请打印！')
                        this.printNumber = body.data.total;
                        this.$confirm(`将打印${this.printNumber}份`, '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '成功!'
                            });
                            this.printPage();
                        })
 
                    } else{
                        this.$message.error('提交失败')
                    }
                }
                else{
                    this.$message.error('上传失败')
                }
            }).then(this.getDetailed);        
        },
        async printPage() {
                document.getElementById("qrcode1").innerHTML = "";
                console.log(this.printNumber);
                //异步，等待结果
                let urlCode = '';
                if(this.printNumber == 1) {
                    urlCode=`http://yunyangbao.cn/#/mS?eT=${this.qrcodeNumber}`
                } else {
                    urlCode=`http://yunyangbao.cn/#/mS?eT=${this.codeNumber}`
                }
                console.log(urlCode);
                await this.waitqr(urlCode);
                let src=document.getElementById("qrcode1").children[1].getAttribute("src");
                let docStr = ''
                if(this.printNumber == 1) {
                    docStr=
                    `<div style="page-break-after:always; width:100px"><canvas height="300" style="display: none;"></canvas><div style="margin-top:-5px; text-align:center"><img alt="Scan me!" src="${src}"style="display: block;" width="95"><p style="font-size:10px; transform:scale(0.6,0.6); margin-top:-5px">${this.opt2value} ${this.mutton}斤/分 扫码溯源</p></div>`;
                } else {
                    docStr=
                    `<div style="page-break-after:always; width:100px"><canvas height="300" style="display: none;"></canvas><div style="margin-top:-5px; text-align:center"><img alt="Scan me!" src="${src}"style="display: block;" width="95"><p style="font-size:10px; transform:scale(0.6,0.6); margin-top:-5px">${this.opt2value} ${this.mutton}斤/分 扫码溯源</p></div>`;
                }
                
                var newWindow=window.open("打印窗口","_blank");			
                newWindow.document.write(docStr);
                var styles=document.createElement("style");
                styles.setAttribute('type','text/css');//media="print"
                styles.innerHTML="" 
                newWindow.document.getElementsByTagName('head')[0].appendChild(styles);
                newWindow.print();
                newWindow.close();
                // 处理关闭打印后 数据的恢复
                this.opt1value =  this.defaulttype;
                this.opt2value = this.defaultname; 
                if(this.printNumber !== 1) {
                    this.codeNumber = '';
                    this.qrcodeNumber = '';
                    this.weight = '';
                }
                this.picSuccess = '';
                // 提交之后，让二维码的计数加一
                this.count++;
                this.qrcodeNumber = this.codeNumber + this.count;
        }
    }
}
</script>
<style  lang="stylus">
.outWare
    .print-manager
        width 100%
        height 300px
        .flex-border
            display flex
            width 100%
            height 40px
            padding-top 5px
            padding-bottom 30px
            .label
                width 130px
                text-align right
                line-height 40px
                padding-right 10px
            .input
                margin-right 40px 
        button
            width 130px
            height 40px
            border-radius 20px
            border none
            outline none
            color #2790d2
            background url('../../../assets/imgs/btn-bg.png') center center
        .btn-center
            text-align center
            margin-top 10px
            button
                width 130px
                    
    .outWare-form
        .el-table
            display table-caption
    .inputWrapper
        display inline-block
        font-size 0
        width 32% 
        .inputSpan
            box-sizing border-box
            display inline-block
            height 32px
            width 35%
            line-height 32px  
            text-align center    
            vertical-align top
            font-size 14px
            border 1px solid #2891d1
            background-color #2891d1
            color #fff
            &+.el-input
                width calc(100% - 80px)!important
    .formAndCarmera
        display flex
        .formWraaper
            flex 0 1 72% 
        .cameraWrapper
            flex 0 1 28% 
            .videoWrapper
                width 80%   
                margin 10px auto
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


