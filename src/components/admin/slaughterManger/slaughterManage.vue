<template>
    <div class="admin-form">
        <div class="card" >
            <p class="card-title" >屠宰管理</p>

            <div class="border-main">
                <div class="time el-input-group" style="width:330px">
                    <span class="time-span ellipse" >屠宰时间</span>
                    <el-date-picker
                        v-model="slaughterTime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        type="datetime">
                    </el-date-picker>
                </div>

                <div class="time" style="width:330px">
                    <span class="time-span ellipse">耳牌号</span>
                    <el-input  size="small" v-model="fatherNumber"></el-input>
                </div>

                <div style=" margin-bottom:10px;">
                    <div style="height:10px;"> </div>
                    <el-alert  title="附属物信息" type="info" center :closable="false" >
                    </el-alert>
                </div> 
                
                <div class="time" style="width:330px">
                    <span class="time-span ellipse">附属物编号</span>
                    <el-input  size="small" v-model="appendageNumber"></el-input>
                </div>
                <div class="time" style="width:330px">
                    <span class="time-span ellipse">附属物重量</span>
                    <el-input  size="small" v-model="appendageWeight"></el-input>
                </div>

                <div class="time">
                <el-input v-for="(item, i) in captures"  :key="i" class="select-file" style="postion:relative;bottom:10px;"  size="small"  @click.native="$refs.video[0].click()" :value="appendVideo.fileName">
                    <template slot="prepend">附属物视频<input type="file" @change="selectFile(appendVideo,0,$refs.video[0].files[0])" hidden ref="video"></template>
                </el-input>
                </div>



                 <div style=" margin-bottom:10px;">
                    <div style="height:10px;"> </div>
                    <el-alert  title="胴体 信息" type="info" center :closable="false" >
                    </el-alert>
                </div> 

                <div class="time" style="width:330px">
                    <span class="time-span ellipse">胴体 编号</span>
                    <el-input  size="small" v-model="kidNumber"></el-input>
                </div>
                <div class="time" style="width:330px">
                    <span class="time-span ellipse">胴体 重量</span>
                    <el-input  size="small" v-model="kidWeight"></el-input>
                </div>

                <div class="time">
                <el-input  v-for="(item, i) in captures2"  :key="i" class="select-file" style="postion:relative;bottom:10px;" size="small"  @click.native="$refs.video[1].click()" :value="kidVideo.fileName">
                    <template slot="prepend">胴体 视频<input type="file" @change="selectFile(kidVideo, 1,$refs.video[1].files[0])" hidden ref="video"></template>
                </el-input>
                </div>
 
            </div>
        </div>

    <div class="card">
            <p class="card-title">图片/视频上传进度:</p>
            <el-progress v-for="(item, i) in captures" :text-inside="true" :stroke-width="18" :percentage="captures2[i].per" style="margin-top: 10px" :key="i"></el-progress>
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
				prop="tradeMarkEartag">
			</el-table-column>
			<el-table-column
				label="免疫耳牌号"
				width="120"
				prop="immuneEartag">
			</el-table-column>
			<el-table-column
				label="栋号"
				width="120"
				prop="d">
			</el-table-column>
			<el-table-column
				label="栏号"
				width="120"
				prop="l">
			</el-table-column>
      <el-table-column
				label="来源地址"
				width="120"
				prop="address">
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
				label="羊只品类"
				width="120"
				prop="style">
			</el-table-column>
			<el-table-column
				label="重量"
				width="120"
				prop="weight">
			</el-table-column>
      	<el-table-column
				label="时间"
				width="120"
				prop="times">
			</el-table-column>
			<el-table-column
				label="年龄"
				width="120"
				prop="age">
			</el-table-column>
      
 </el-table>
    <div class="block" style="margin-left: 46px">
            <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="fetchData" :current-page.sync="page">
            </el-pagination>
    </div>

    <div class="admin-send" >
            <template >
                <el-button type="primary" @click="submit()">提交</el-button>
            </template>
    </div>

    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import { isReqSuccessful} from '@/util/jskit'
import {getUserById,postSlaughter} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

//getSlaughterManage
export default {
    components: {
        dataCur,
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
    },
    data () {
        return {
            video:'',
            user:null,
            tableData:[{tradeMarkEartag:123},{tradeMarkEartag:456}],
            total:0,
            page:1,
            multipleSelection:[],
                slaughterTime:null,
                fatherNumber:null,

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
            captures: [{model: null , per : 0}],
            captures2: [{model: null , per : 0}],    
            selectRow:null, 
        }
    },
    computed:{
     },
    methods:{
            selectFile(item,i,file){
            console.log(file)
            item.file = file
            item.fileName=file.name
            console.log(item.file);
            console.log(item.fileName)
        },
       handleCurrentChange(currentRow,oldCurrentRow) {
        this.selectRow = currentRow;
        this.fatherNumber=this.selectRow.tradeMarkEartag
        this.appendageNumber=this.fatherNumber+'F';
        this.kidNumber=this.fatherNumber+'D';
      },
        getnumber(){
            this.appendageNumber=this.fatherNumber+'F';
            this.kidNumber=this.fatherNumber+'D';
        },

        submit () {
              let form=new FormData()
              form.append('slaughterTime',this.slaughterTime)
              form.append('fatherNumber',this.fatherNumber )
              form.append('appendageNumber',this.appendageNumber )
              form.append('kidNumber',this.kidNumber )
              form.append('appendageWeight',this.appendageWeight )
              form.append('kidWeight',this.kidWeight )
              form.append('appendage',this.appendVideo.file)
              form.append('kid',this.kidVideo.file )
              form.append('operator',this.user.id )
              form.append('operatorName',this.user.userRealname )
              console.log(form)
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/slaughter/', {
                  method: 'POST',
                  headers,
                  body: form
              }).then(async res => {
                  let body = await res.json()
                    if (isReqSuccessful(body)) {
                        this.captures2.forEach((item ,index) => {
                            this.captures2[index].per = 100
                            this.$message.success('上传成功')
                        // let path = `/admin/${pathid}/slaughterManage/slaughterManagelist`
                        // this.$router.push(path)
                        })
                    }
                    else{
                    this.$message.error('上传失败')
                    }
                })
            
        },
        async fetchData(){
			let id = this.user.userFactory
			let param = {
                			start: (this.page - 1)*10,
               				size: 10,
           				} 
			// 			 this.tableData = []
			// getSlaughterManage(id , param).then(res => {
            //     if (isReqSuccessful(res)) {
            //    		 this.total = Math.ceil(res.data.number/param.size)*10
            //    		 let data = res.data.all
            //    		 data.forEach((v) => {
            //    		   	//  let {tradeMarkEartag , immuneEartag , d , l ,address ,farm, master,style,weight, times,age} = v
            //    		   	//  let tradeMarkEartag = tradeMarkEartag
            //             //  let immuneEartag = immuneEartag
            //             //  let d=d
            //    		   	//  let l=l
            //             //  let farm=farm
            //             //  let master=master
            //             //  let style=style
            //             //  let weight=weight
            //             //  let times=times
            //             //  let age=age
            //    		   	//  let obj = {tradeMarkEartag , immuneEartag , d , l ,address ,farm, master,style,weight, times,age}
			// 			this.tableData.push(v)
            //    		 })
            //     }
            // })
		},
    }
}
</script>

<style >

</style>
