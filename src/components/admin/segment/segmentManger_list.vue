<template>
    <div>
        <el-table :data="tableData" :border="true"  @cell-click="handleCell">
			<el-table-column label="分割" type="selection" width="55" ></el-table-column>
			
			<el-table-column
				label="部件编码"
				width="120"
				prop="bodyNumber"
			>
			</el-table-column>

			<el-table-column
				label="部件名称"
				width="120"
				prop="bodyName"
			>
			</el-table-column>

			<el-table-column
				label="重量"
				width="120"
                prop="bodyWeight"
			>
			</el-table-column>

			<el-table-column
				label="视频"
				width="120"
				prop=""
			>
            <el-button type="text">查看</el-button>
			</el-table-column>

			<el-table-column
				label="价格"
				width="120"
				prop="bodyprice"
			>
			</el-table-column>

			<el-table-column
				label="养殖场"
				width="120"
				prop="farm"
			>
			</el-table-column>
			
			<el-table-column
				label="货主"
				width="120"
				prop="master"
			>
			</el-table-column>

			<el-table-column
				label="联系电话"
				width="120"
				prop="telephone"
			>
			</el-table-column>

			<el-table-column
                class="action"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <el-button @click="cellClick(scope.row, scope.column)" type="text">打印</el-button>
                    </div>
                </template>
            </el-table-column>

			
		</el-table>
		
		<div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>

        <el-dialog
        title="羊只视频"
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
                            <li><el-tag>商标耳牌</el-tag> {{ sheepVideo.erNumber }}</li>
                            <li><el-tag>上传日期</el-tag> {{ sheepVideo.time }}</li>
                    </ul>
            </div>
        </el-dialog>

        <div class="block" style="margin-left: 46px">
        <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="fetchData" :current-page.sync="page">
        </el-pagination>
       </div>

    </div>
</template>
<script>
import { isReqSuccessful,getThumbPicture } from '@/util/jskit'
import QRCode from 'qrcodejs2'
import { getUserById , getAllSaleSheep ,watchVideo,getSegmentList} from '@/util/getdata'
export default {
	mounted(){
		let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
								this.user = res.data.model
								console.log(this.user);
                let {userFactory} = this.user
            }
			}).then(this.fetchData)
	},

	data() {
		return {
			total:0,
			page:1,
			tableData:[],
			searchEartag: '',//查询羊只
			onlySheep:{
				building:'',
				col:'',
				colInt:''
			},
			freshCode:false,
			 // 设置出错图片
           defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
			
            user:{},
            sheepVideo:{
				url:null,
				time:null,
				filetype:0,
				erNumber:null
			},
			codeNumber:null,
			dialogVideoVisible:false,
			dialogQrcodeVisible:false
        }
	},
	methods: {
		//查看二维码
		async cellClick(row){
			this.codeNumber=row.bodyNumber;

			document.getElementById("qrcode1").innerHTML = "";

			//异步，等待结果
		    await this.waitqr(this.codeNumber);

			var docStr = document.getElementById("qrcode1").innerHTML;
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
		//查看按钮
		handleCell(row,column,event,cell){
        //console.log(row)

		if(column.label=="视频/图片"){
				 this.dialogVideoVisible=true;
				 this.getVideo(row.bodyNumber)
			}	
        },
        // 查看按钮接口
		getVideo (er) {
				let videoMessage={}
                watchVideo(er).then(res => {
                    if(isReqSuccessful(res)) {
					let arr = []
					let obj={}
							videoMessage.url=res.address
							videoMessage.time=res.udate
							videoMessage.filetype=res.filetype             
                    }
                }).catch(_ => {
                    this.$message.error('获取失败');
								})
								this.sheepVideo.erNumber=er
								this.sheepVideo.url=videoMessage.url
								this.sheepVideo.time=videoMessage.time
								this.sheepVideo.filetype=videoMessage.filetype
        },
        
		async fetchData(){
			let id= this.user.userFactory
						 this.tableData = []
			getSegmentList(id).then(res => {
                if (isReqSuccessful(res)) {
               		 //this.total = Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.all
               		 data.forEach((v) => {
							this.tableData.push(v)
               		 })
                }
            })
		},
		


	}
}
</script>