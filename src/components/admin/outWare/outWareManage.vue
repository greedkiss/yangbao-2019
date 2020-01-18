<template>
    <div class="admin-form outWare">
        <p class="card-title">出库管理</p>
            <div class="card">
                <p class="card-title">羊肉库存列表</p>
                <div class="border-main">
        <div class="num-form">
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

        <div class="card" v-if="hasCopies">
            <p class="card-title">成品</p>
            <div class="border-main">
                <div class="formAndCarmera">
                    <div class="formWraaper">
                        <el-table
                        :data="tableData2"
                        highlight-current-row
                        style="width: 100%;margin-top:20px;"
                        :border="true"
                        @cell-click="watchMakeUpVideo"
                        >
                            <el-table-column v-show="false"
                                label="#"
                                width="80"  
                                prop="id">
                            </el-table-column>

                            <el-table-column
                                label="成品编号"
                                width="220"
                                prop="partNumber">
                            </el-table-column>

                            <el-table-column
                                label="时间"
                                width="180"
                                prop="outBoundTime">
                            </el-table-column>
                            
                            <el-table-column
                                label="成品照片"
                                width="80"
                                center>
                                <template slot-scope="scope">
                                    <div class="opr" >
                                        <span>{{picSuccess}}</span>
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                            class="action"
                            label="操作"
                            align='center'
                            width="160">
                                <template slot-scope="scope">
                                    <div class="opr">
                                        <el-button @click="addPicture(scope.row)" type="text">提交/打印</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table> 
                        <div class="block" style="margin-left: 46px">
                            <el-pagination layout="prev, pager, next" :total="total2"   :page-size="1" :current-page.sync="page2">
                            </el-pagination>
                        </div>
                    </div>
                    <div class="cameraWrapper">
                        <div class="videoWrapper">
                            <video ref="video" id="video" width="320" height="240" autoplay></video>
                        </div>
                        <div class="takePhotoBtn">
                            <el-button size="mini" type="primary" @click="capture()">拍照</el-button>
                            <vue-record-video id="recordBtn"  @result="onResult"/>
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
        </div>  
        <div class="outWare-form">
            <el-table
            :data="tableData"
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :border="true"
            @cell-click="changeCopies"
            >
                <el-table-column v-show="false"
                    label="#"
                    width="120"  
                    prop="id">
                </el-table-column>

                <el-table-column
                    label="产品编号"
                    width="120"  
                    prop="partNumber">
                </el-table-column>

                <el-table-column
                    label="产品名称"
                    width="120"
                    prop="productName">
                </el-table-column>

                <el-table-column
                    label="产品重量"
                    width="120"
                    prop="weight">
                </el-table-column>
                
                <el-table-column
                    label="照片/视频"
                    width="120"
                    prop="video">
                    <template slot-scope="scope">
                        <div class="opr" >
                            <el-button type="text">查看</el-button>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="产品价格"
                    width="120"
                    prop="price">
                </el-table-column>

                 <el-table-column
                    label="养殖场"
                    width="120"
                    prop="breedName">
                </el-table-column>

                 <el-table-column
                    label="货主"
                    width="120"
                    prop="slaughterName">
                </el-table-column>

                <el-table-column
                    label="产品份数"
                    width="120"
                    prop="counts">
                </el-table-column>

            </el-table>
            <div class="block" style="margin-left: 46px">
                <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="getDetailed" :current-page.sync="page">
                </el-pagination>
            </div>
        </div>
        
                </div>
            </div>

            		<el-dialog title="分割份数" 
                        :visible.sync="dialogFormVisible" 
                        width="300px"
                        >
					<el-form :model="dialogMessage" style="width:100%">
                        
						<el-col>
						<el-form-item label="产品编号" >				
						<el-input  v-model="dialogMessage.number" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col>
						<el-form-item label="产品名称" >			
						<el-input  v-model="dialogMessage.name" :disabled="true"></el-input>
						</el-form-item>	
						</el-col>

						<el-col>
						<el-form-item label="产品份数"  >
							<el-input  v-model="dialogMessage.copies" ></el-input>
						</el-form-item>
						</el-col>

					</el-form>

					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="sureCopies()">确认</el-button>
					</div>
				</el-dialog>


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
import { isReqSuccessful} from '@/util/jskit'
import QRCode from 'qrcodejs2'
import { getUserById,getoutWareManageNum,getoutWareManageDetailed,PostProductNumber,nextPrint,findMakeUpVideo} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

export default {
   mounted(){
       let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
					this.user = res.data.model
                let {userFactory} = this.user
            }
            }).then(this.getNum).then(this.getDetailed)
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
            codeNumber:null,
            hasCopies:true,
            video: {},
            canvas: {},
            captures: [],
            picSuccess:'',
        }
    },
    methods: {
        //份数and查看
        changeCopies(row,column,cell){
            if(column.label=='产品份数'){
                if(row.counts>0){
                    return 
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
            if(column.label=="成品照片"){
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
			}	
        },
        async cellClick(row){
            this.tableData2=[];
            this.codeNumber=row.partNumber;
            let id = row.id
                nextPrint(id).then(res => {
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

        getNum(){
            this.numtableData=[]
            let id=this.user.userFactory
			getoutWareManageNum(id).then(res => {
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
        getDetailed(){
            let param = {
                page: this.page - 1,
                size: 10,
                factory: this.user.userFactory
            } 
            this.tableData = [];               
            getoutWareManageDetailed(param).then(res => {
                if (isReqSuccessful(res)) {
               		 this.total = res.data.number //Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.List
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
            this.addPic.file = this.dataURLtoBlob(this.captures.pop());
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
        }
    }
}
</script>
<style  lang="stylus">
.outWare
    .num-form
        .el-table
            display table-caption
        .el-table th
                border-left 2px solid rgb(230,230,230)
                background-color: rgb(238, 241, 246)!important
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
            flex 0 1 60% 
        .cameraWrapper
            flex 0 1 40% 
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


