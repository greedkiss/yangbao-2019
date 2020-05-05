<template>
    <div>
        <el-table :data="tableData" :border="true">
		
			<el-table-column
				label="商标耳牌号"
				width="120"
				prop="fatherNumber"
			>
			</el-table-column>

			<el-table-column
				label="胴体编号"
				width="120"
				prop="carcassProductEncoding"
			>
			</el-table-column>

			<el-table-column
				label="'胴体重量"
				width="120"
                prop="kidWeight"
			>
			</el-table-column>

			<el-table-column
				label="胴体照片"
				width="120"
				prop=""
			>
            <template slot-scope="scope">
                  <div class="opr" >
                      <span @click="mediaWatch(scope)">查看</span>
                  </div>
            </template>
			</el-table-column>

			<el-table-column
				label="附属物编号"
				width="120"
				prop="accessoriesProductEncoding"
			>
			</el-table-column>

			<el-table-column
				label="附属物重量"
				width="120"
				prop="appendageWeight"
			>
			</el-table-column>

			<el-table-column
				label="附属物照片"
				width="120"
				prop=""
			>
            <template slot-scope="scope">
                  <div class="opr" >
                      <span @click="mediaWatch2(scope)">查看</span>
                  </div>
            </template>
			</el-table-column>
			
			<el-table-column
				label="时间"
				width="200"
				prop="carcassTime"
			>
			</el-table-column>

			
		</el-table>
		
		<div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>

        <el-dialog
        title="图片"
        :visible.sync="slaughterManageVisible"
        width="50%"
            center>

            <!-- FIXME: video 标签兼容性处理 -->
            <div class="show-detail">
                    <!-- <video v-if="sheepVideo.filetype === 1 || sheepVideo.filetype === 6" :src="sheepVideo.url" class="production-video" controls="controls" height="400" width="400"></video> -->
                    <img class="production-image-detail" :src="mediaVideo" :onerror="defaultImg">
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
import { getUserById , getAllSaleSheep ,watchVideo,getSegmentList,getSlaughterHistory} from '@/util/getdata'
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
			mediaVideo:null,
			slaughterManageVisible:false,
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
		mediaWatch(scope){
                if(scope.row.kidVideo!==null){
                    this.mediaVideo=scope.row.kidVideo
                    console.log(this.mediaVideo)
                    this.slaughterManageVisible=true
                }
                else{
                this.$message.error('暂无相关图片！')
                }
        },
		mediaWatch2(scope){
                if(scope.row.appendageVideo!==null){
                    this.mediaVideo=scope.row.appendageVideo
                    console.log(this.mediaVideo)
                    this.slaughterManageVisible=true
                }
                else{
                this.$message.error('暂无相关视图片！')
                }
        },
		//查看按钮
		handleCell(row,column,event,cell){
        //console.log(row)

		if(column.label=="视频/图片"){
				 this.dialogVideoVisible=true;
				 this.getVideo(row.bodyNumber)
			}	
        },
        
		async fetchData(){
			let id= this.user.userFactory
			let data={
				page:this.page-1,
				size:15
			}
			this.tableData = []
			getSlaughterHistory(id,data).then(res => {
                if (isReqSuccessful(res)) {
               		 //this.total = Math.ceil(res.data.number/param.size)*10
               		let data = res.data.list
               		data.forEach((v) => {
							this.tableData.push(v)
						})
					this.total=res.data.number
                }
            })
		},
		


	}
}
</script>