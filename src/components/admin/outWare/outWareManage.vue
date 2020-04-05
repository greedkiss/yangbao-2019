<template>
    <div class="admin-form outWare">
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

                </div>
            </div>

    </div>
</template>

<script>
import { isReqSuccessful} from '@/util/jskit'
import QRCode from 'qrcodejs2'
import { getUserById,getoutWareManageNum} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

export default {
   mounted(){
       let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
					this.user = res.data.model
                let {userFactory} = this.user
            }
            }).then(this.getNum)
   },
    data () {
        return {
            numtableData:[],
        }
    },
    methods: {
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

