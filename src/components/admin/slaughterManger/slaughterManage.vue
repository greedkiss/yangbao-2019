<template>
    <div class="slaughterManage">
        <data-cur
            title="屠宰管理"
            modpath="beforeslaughter/slaughterManage"
            @update:models="v => models = v"
            :models.sync="models"
            :items="items"
            :has-remark="false"
            :checkFull="false">
        </data-cur>
                 
        <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%;margin-top:20px;"
        :border="true"
        @current-change="handleCurrentChange"
        @cell-click="handleCell">
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

    </div>
</template>

<script>
import dataCur from '@/components/admin/common/dataCUR'
import {getUserById} from '@/util/getdata'

//getSlaughterManage
export default {
    components: {
        dataCur,
    },
    mounted(){
        var myDate=new Date();
		var myMonth=myDate.getMonth()+1;
        this.models.slaughterTime=myDate.getFullYear()+"-"+myMonth+"-"+myDate.getDate()+"-"+myDate.getHours()+"-"+myDate.getMinutes();
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model    
            }
        }).then(this.fetchData)
    },
    data () {
     
        return {
            user:null,
            tableData:[{tradeMarkEartag:123},{tradeMarkEartag:456}],
            total:0,
            page:1,
            multipleSelection:[],
            items:[
                {label: '屠宰时间', model: 'slaughterTime'},
                {label: '耳牌号', model: 'EarTag',},

                {label: '附属物信息',  type: 'cutline'},
                {label: '附属物编号', model: 'affNumber'}, 
                {label: '附属物重量', model: 'affWeight' }, 
                {label: '附属物视频', model: 'affVideo',type: 'file'}, 

                {label: '胴体  信息',  type: 'cutline' },
                {label: '胴体  编号', model: 'carNumber' }, 
                {label: '胴体  重量', model: 'carWeight' }, 
                {label: '胴体  视频', model: 'carVideo',type: 'file'},
            ],         
            models: {
                slaughterTime:null,
                EarTag:null,

                affNumber:null,
                affWeight:null,
                affVideo :null,

                carNumber:null,
                carWeight :null,
                carVideo:null,
                }, 
            selectRow:null, 
        }
    },
    computed:{
     },
    methods:{
       handleCurrentChange(currentRow,oldCurrentRow) {
        this.selectRow = currentRow;
        this.models.EarTag=this.selectRow.tradeMarkEartag
        this.models.affNumber=this.models.EarTag+'F';
        this.models.carNumber=this.models.EarTag+'D';
      },
        getnumber(){
            this.models.affNumber=this.models.EarTag+'F';
            this.models.carNumber=this.models.EarTag+'D';
        },
        async fetchData(){
			let id = this.user.userFactory
			let param = {
                			start: (this.page - 1)*10,
               				size: 10,
           				} 
						 this.tableData = []
			getSlaughterManage(id , param).then(res => {
                if (isReqSuccessful(res)) {
               		 this.total = Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.all
               		 data.forEach((v) => {
               		   	//  let {tradeMarkEartag , immuneEartag , d , l ,address ,farm, master,style,weight, times,age} = v
               		   	//  let tradeMarkEartag = tradeMarkEartag
                        //  let immuneEartag = immuneEartag
                        //  let d=d
               		   	//  let l=l
                        //  let farm=farm
                        //  let master=master
                        //  let style=style
                        //  let weight=weight
                        //  let times=times
                        //  let age=age
               		   	//  let obj = {tradeMarkEartag , immuneEartag , d , l ,address ,farm, master,style,weight, times,age}
						this.tableData.push(v)
               		 })
                }
            })
		},
    }
}
</script>

<style >

</style>
