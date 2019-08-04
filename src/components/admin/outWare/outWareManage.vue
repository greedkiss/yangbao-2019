<template>
    <div class="admin-form">
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

         <div class="outWare-form">
            
            <el-table
            :data="tableData"
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :border="true"
            @cell-click="changeCopies"
            >
                <el-table-column
                    type="index">
                </el-table-column>

                <el-table-column
                    label="产品编号"
                    width="120"  
                    prop="productNumber">
                </el-table-column>

                <el-table-column
                    label="产品名称"
                    width="120"
                    prop="productName">
                </el-table-column>

                <el-table-column
                    label="产品重量"
                    width="120"
                    prop="productWeight">
                </el-table-column>
                
                <el-table-column
                    label="产品视频"
                    width="120"
                    prop="productVideo">
                </el-table-column>

                <el-table-column
                    label="产品价格"
                    width="120"
                    prop="productPrice">
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
                    label="产品份数"
                    width="120"
                    prop="productCopies">
                </el-table-column>

            </el-table>
                    <div class="block" style="margin-left: 46px">
                            <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="fetchData" :current-page.sync="page">
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

            <div class="card" v-if="hasCopies">
                <p class="card-title">成品</p>
                <div class="border-main">
                    
            <el-table
            :data="tableData2"
            highlight-current-row
            style="width: 100%;margin-top:20px;"
            :border="true"
            >
                <el-table-column
                    type="index">
                </el-table-column>

                <el-table-column
                    label="成品编号"
                    width="180"
                    prop="madeupNumber">
                </el-table-column>

                <el-table-column
                    label="时间"
                    width="180"
                    prop="madeupTime">
                </el-table-column>
                
                <el-table-column
                    label="产品视频"
                    width="120"
                    prop="madeupVideo"
                    center>
                    <el-button type="text">查看</el-button>
                </el-table-column>

                <el-table-column
                class="action"
                label="操作"
                align='center'
                width="160">
                <template slot-scope="scope">
                    <div class="opr">
                        <el-button @click="addPicture(scope.row)" type="text">添加视频</el-button>
                        <el-button @click="cellClick(scope.row, scope.column)" type="text">打印</el-button>
                    </div>
                </template>
            </el-table-column>

            </el-table>
      
                <div class="block" style="margin-left: 46px">
                        <el-pagination layout="prev, pager, next" :total="total2" :page-size="1"  @current-change="fetchData"  :current-page.sync="page2">
                        </el-pagination>
                </div>
                </div>
            </div>  
    <div v-show="false"  id="qrcode1" class="qrcode" ref="qrcode"></div>

    </div>
</template>

<script>
import { isReqSuccessful} from '@/util/jskit'
import QRCode from 'qrcodejs2'
import { getUserById } from '@/util/getdata'

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
    data () {
        return {
            tableData:[{productNumber:'G123456'},{productNumber:'G123457'}],
            tableData2:[{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''}],
            numtableData:[{Dnum:'1234',DYnum:'12345'}],
            total:0,
            page:1,
            total2:100,
            page2:1,
            dialogMessage:{
                number:null,
                name:null,
                copies:null,
            },
            dialogFormVisible:false,
            user:{},
            codeNumber:null,
            hasCopies:false,
        }
    },
    methods: {
        //份数
        changeCopies(row,column,cell){
            if(column.label=='产品份数'){
                this.dialogMessage.number=row.productNumber
                this.dialogMessage.name=row.productName
                this.dialogMessage.copies=row.productCopies
                this.dialogFormVisible=true
            }
            
        },
        //份数确认
        sureCopies(){
            this.tableData2=[{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''},{madeupNumber:''},{madeupNumber:''},
            {madeupNumber:''},{madeupNumber:''}];
            this.dialogFormVisible = false
            let number=this.dialogMessage.number
            let copies=this.dialogMessage.copies
            this.tableData.some(function(item,index){
                if(item.productNumber==number){
                    item.productCopies=copies
                    return
                }
            })
            let i=0
            let now=new Date();
            let time=now.toLocaleDateString()+' '+now.toTimeString().slice(0,8)
            //console.log(this.tableData2[0].madeupNumber)
            for(i=0;i<copies;i++){
                this.tableData2[i].madeupNumber=String(number)+i
                this.tableData2[i].madeupTime=time.substr()
            }
            this.hasCopies=true
            
        },
        async cellClick(row){
			this.codeNumber=row.madeupNumber;

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
      	addPicture(row){
		let pathid = this.$route.params.id
        let path = `/admin/${pathid}/supervise/capture`+'?'+'ramSheepTrademark='+row.madeupNumber
		 this.$router.push(path)
		},

        fetchData(){

        }
    }
}
</script>
<style lang="stylus">
.num-form
	.el-table
		display table-caption
	.el-table th
			border-left 2px solid rgb(230,230,230)
			background-color: rgb(238, 241, 246)!important
.outWare-form
    .el-table
		display table-caption
    
</style>


