<template>
    <div class="admin-form">
        <p class="card-title">分割</p>

        <div class="card" >
            <p class="card-title" >胴体信息</p>

            <div class="border-main">
                <div class="time el-input-group" style="width:330px">
                    <span class="time-span ellipse" >时间</span>
                    <el-date-picker
                        v-model="carcass.time"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        type="datetime">
                    </el-date-picker>
                </div>

                <div class="time">
                    <span class="time-span ellipse">商标耳牌号</span>
                    <el-input  size="small" v-model="carcass.earTag"></el-input>
                </div>
                <div class="time">
                    <span class="time-span ellipse">胴体编号</span>
                    <el-input  size="small" v-model="carcass.carNumber"></el-input>
                </div>

                <div>
                    <el-radio-group class="checkbox_segment" v-model="radio">
                    <el-radio :label="0">不分割</el-radio>
                    <el-radio :label="1">二分体分割</el-radio>
                    <el-radio :label="2">细分</el-radio>
                    </el-radio-group>
                </div>
                
            </div>
        </div>

    <div class="card" v-if="radio==0">
        <p class="card-title" >胴体信息展示</p>
            <div class="border-main"> 
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
				prop="fatherNumber">
			</el-table-column>

			<el-table-column
				label="胴体编号"
				width="120"
				prop="kidNumber">
			</el-table-column>

            <el-table-column
				label="胴体重量"
				width="120"
				prop="kidWeight">
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
      
 </el-table>
            <div class="block" style="margin-left: 46px">
                    <el-pagination layout="prev, pager, next" :total="total" :page-size="10" @current-change="fetchData" :current-page.sync="page">
                    </el-pagination>
            </div>
    </div>

    </div> 


        <div class="card" v-if="radio==1">
            <p class="card-title" >二分体</p>

            
                
            <div class="border-main"> 
                <div class="time" style="margin-top:10px;width:30%">
                    <span class="time-span ellipse">羊二分体1编号</span>
                    <el-input  size="small" v-model="twocut1.num"></el-input>
                </div>

            <div class="time" style="margin-top:10px; width:30%">
                <span class="time-span" >羊二分体1重量</span>
                <el-input  size="small" v-model="twocut1.weight"></el-input>
            </div>

            <div class="time">
               <el-input v-for="(item, i) in captures"  :key="i" class="select-file" style="postion:relative;bottom:10px;"  size="small"  @click.native="$refs.erfen[0].click()" :value="twocut1.fileName">
                    <template slot="prepend">上传二分体1视频<input type="file" @change="selectFile(twocut1,0,$refs.erfen[0].files[0])" hidden ref="erfen"></template>
                </el-input>
            </div>

                <div class="time" style="margin-top:10px;width:30%">
                    <span class="time-span ellipse">羊二分体2编号</span>
                <el-input  size="small" v-model="twocut2.num"></el-input>
                </div>

            <div class="time" style="margin-top:10px;width:30%">
                <span class="time-span ellipse">羊二分体2重量</span>
                <el-input  size="small" v-model="twocut2.weight"></el-input>
            </div>
            
            <div class="time">
                <el-input  v-for="(item, i) in captures2"  :key="i" class="select-file" style="postion:relative;bottom:10px;" size="small"  @click.native="$refs.erfen[1].click()" :value="twocut2.fileName">
                    <template slot="prepend">上传二分体2视频<input type="file" @change="selectFile(twocut2, 1,$refs.erfen[1].files[0])" hidden ref="erfen"></template>
                </el-input>
            </div>
         </div>
    
        <div class="card">
                <p class="card-title">图片/视频上传进度:</p>
                <el-progress v-for="(item, i) in captures" :text-inside="true" :stroke-width="18" :percentage="captures2[i].per" style="margin-top: 10px" :key="i"></el-progress>
        </div>
    </div> 

<!--细分------------------------------------------------------------------------------------------------------------------------------------------------->
<!--细分------------------------------------------------------------------------------------------------------------------------------------------------->
<!--细分------------------------------------------------------------------------------------------------------------------------------------------------->
<!--细分------------------------------------------------------------------------------------------------------------------------------------------------->
<!--细分------------------------------------------------------------------------------------------------------------------------------------------------->
<!--细分------------------------------------------------------------------------------------------------------------------------------------------------->
        <div class="card" v-if="radio==2">
            <p class="card-title" >细分</p>
            <div class="border-main"> 
            
            <el-form  :model="qiantuiForm" ref="qiantuiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in qiantuiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊前腿编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊前腿重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>

            <div class="segment-file" >
            <el-input v-model="domain.fileName"  size="small"  style="width:30%"  @click.native="$refs.qiantui[index].click()" >
                    <template slot="prepend">羊前腿视频<input  type="file" @change="selectFile(domain,index,$refs.qiantui[index].files[0])" hidden ref="qiantui"></template>
            </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,qiantuiForm)">删除</el-button>
            <div class="time">
                
            </div>
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(qiantuiForm)">新增前腿</el-button>
            </el-form>

            <el-form :model="houtuiForm" ref="houtuiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in houtuiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊后腿编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊后腿重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            
            <div class="segment-file">
                <el-input   class="select-file" size="small"  style="width:30%" @click.native="$refs.houtui[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊后腿视频<input type="file"  @change="selectFile(domain, (index),$refs.houtui[(index)].files[0])" hidden ref="houtui"></template>
                </el-input>
            </div>
            

                <el-button type="primary" @click.prevent="removeDomain(domain,houtuiForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(houtuiForm)">新增后腿</el-button>
            </el-form>

            <el-form :model="huangguaForm" ref="huangguaForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in huangguaForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">黄瓜条编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">黄瓜条重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>

            <div class="segment-file">
            <el-input  class="select-file" size="small"  style="width:30%"  @click.native="$refs.huanggua[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">黄瓜条视频<input type="file" @change="selectFile(domain, (index),$refs.huanggua[(index)].files[0])" hidden ref="huanggua"></template>
            </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,huangguaForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(huangguaForm)">新增黄瓜条</el-button>
            </el-form>

            <el-form :model="yaojiForm" ref="yaojiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in yaojiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊腰肌编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%" >
                    <span class="time-span" style="margin-top:4px;">羊腰肌重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>

            <div class="segment-file">
            <el-input  class="select-file" size="small" style="width:30%"  @click.native="$refs.yaoji[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊腰肌视频<input type="file" @change="selectFile(domain, (index),$refs.yaoji[(index)].files[0])" hidden ref="yaoji"></template>
            </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,yaojiForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(yaojiForm)">新增羊腰肌</el-button>
            </el-form>

            <el-form :model="datuiForm" ref="datuiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in datuiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊大腿编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%" >
                    <span class="time-span" style="margin-top:4px;">羊大腿重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            <div class="segment-file">
            <el-input  class="select-file" size="small" style="width:30%"  @click.native="$refs.datui[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊大腿视频<input type="file" @change="selectFile(domain, (index),$refs.datui[(index)].files[0])" hidden ref="datui"></template>
            </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,datuiForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(datuiForm)">新增羊大腿</el-button>
            </el-form>

            <el-form :model="yangleiForm" ref="yangleiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in yangleiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%" >
                    <span class="time-span" style="margin-top:4px;">羊肋排编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊肋排重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            <div class="segment-file">
                <el-input  class="select-file" size="small" style="width:30%"  @click.native="$refs.yanglei[(index)].click()" :value="domain.fileName">
                        <template slot="prepend">羊肋排视频<input type="file" @change="selectFile(domain, (index),$refs.yanglei[(index)].files[0])" hidden ref="yanglei"></template>
                </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,yangleiForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(yangleiForm)">新增羊肋排</el-button>
            </el-form>

            <el-form :model="furouForm" ref="furouForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in furouForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊腹肉编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊腹肉重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            <div class="segment-file">
            <el-input  class="select-file" size="small" style="width:30%"   @click.native="$refs.furou[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊腹肉视频<input type="file" @change="selectFile(domain, (index),$refs.furou[(index)].files[0])" hidden ref="furou"></template>
            </el-input>                
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,furouForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(furouForm)">新增羊腹肉</el-button>
            </el-form>

            <el-form :model="jianjiaForm" ref="jianjiaForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in jianjiaForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%" >
                    <span class="time-span" style="margin-top:4px;">羊肩胛编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time"  style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊肩胛重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            <div class="segment-file">
            <el-input  class="select-file" size="small"  style="width:30%"  @click.native="$refs.jianjia[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊肩胛视频<input type="file"  @change="selectFile(domain, (index),$refs.jianjia[(index)].files[0])" hidden ref="jianjia"></template>
            </el-input>                
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,jianjiaForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(jianjiaForm)">新增羊肩胛</el-button>
            </el-form>

            <el-form :model="yangqianForm" ref="yangqianForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in yangqianForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊前编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊前腿重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            <div class="segment-file">
            <el-input  class="select-file" size="small" style="width:30%"  @click.native="$refs.yangqian[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊前视频<input type="file"  @change="selectFile(domain, (index),$refs.yangqian[(index)].files[0])" hidden ref="yangqian"></template>
            </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,yangqianForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(yangqianForm)">新增羊前</el-button>
            </el-form>

            <el-form :model="waijiForm" ref="waijiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in waijiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊外肌编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%">
                    <span class="time-span" style="margin-top:4px;">羊外肌重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>
            <div class="segment-file">
            <el-input  class="select-file" size="small" style="width:30%"  @click.native="$refs.waiji[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊外肌视频<input type="file"  @change="selectFile(domain, (index),$refs.waiji[(index)].files[0])" hidden ref="waiji"></template>
            </el-input>
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,waijiForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(waijiForm)">新增羊外肌</el-button>
            </el-form>

            <el-form :model="lijiForm" ref="lijiForm"  class="demo-dynamic">

            <el-form-item
            v-for="(domain, index) in lijiForm.domains"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            >
            <div class="time" style="width:30%" >
                    <span class="time-span" style="margin-top:4px;">羊里脊编号</span>
            <el-input  size="small" v-model="domain.num"></el-input>
            </div>

            <div class="time" style="width:30%" >
                    <span class="time-span" style="margin-top:4px;">羊里脊重量</span>
            <el-input  size="small" v-model="domain.weight"></el-input>
            </div>

            <div class="segment-file">
            <el-input  class="select-file" size="small"  style="width:30%" @click.native="$refs.liji[(index)].click()" :value="domain.fileName">
                    <template slot="prepend">羊里脊视频<input type="file"  @change="selectFile(domain, (index),$refs.liji[(index)].files[0])" hidden ref="liji"></template>
            </el-input>      
            </div>


                <el-button type="primary" @click.prevent="removeDomain(domain,lijiForm)">删除</el-button>
           
            </el-form-item>
             <el-button type="primary" style="margin-top:-10px;" @click="addDomain(lijiForm)">新增羊里脊</el-button>
            </el-form>
            </div>
        </div>




        <div class="admin-send" >
            <template >
                <el-button type="primary" :disabled="disableBtn" @click="submit()">提交</el-button>
            </template>
        </div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { isReqSuccessful, checkForm, postJump, patchJump } from '@/util/jskit'
import { getUserById,getSegmentSheep} from '@/util/getdata'
import { baseUrl, authStr, tokenStr } from '@/util/fetch'

export default {
    components: {
        BasicInfo
    },
    computed:{
        newName(){
            return this.carcass.carNumber;
        },
        // newFileName(){
        //     return this.FileName
        // }
    },
    mounted(){
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model    
            }
        }).then(this.fetchData)
    },
    watch:{
        // newFileName(val){
        //     if(this.formFlag=='Q'){
        //         this.qiantuiForm.domains[this.serial].fileName=val
        //         console.log(this.qiantuiForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='R'){
        //         this.houtuiForm.domains[this.serial].fileName=val
        //         console.log(this.houtuiForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='H'){
        //         this.huangguaForm.domains[this.serial].fileName=val
        //         console.log(this.huangguaForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='Y'){
        //         this.yaojiForm.domains[this.serial].fileName=val
        //         console.log(this.yaojiForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='D'){
        //         this.datuiForm.domains[this.serial].fileName=val
        //         console.log(this.datuiForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='L'){
        //         this.yangleiForm.domains[this.serial].fileName=val
        //         console.log(this.yangleiForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='F'){
        //         this.furouForm.domains[this.serial].fileName=val
        //         console.log(this.furouForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='J'){
        //         this.jianjiaForm.domains[this.serial].fileName=val
        //         console.log(this.jianjiaForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='M'){
        //         this.yangqianForm.domains[this.serial].fileName=val
        //         console.log(this.yangqianForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='W'){
        //         this.waijiForm.domains[this.serial].fileName=val
        //         console.log(this.waijiForm.domains[this.serial].fileName)
        //     }
        //     if(this.formFlag=='I'){
        //         this.lijiForm.domains[this.serial].fileName=val
        //         console.log(this.lijiForm.domains[this.serial].fileName)
        //     }
        // },
        newName(val){
            if(val!=''){
                    this.twocut1.num=val+'E'+0;
                    this.twocut2.num=val+'E'+1;
                
            this.qiantuiForm.domains[0].num=val+'Q'+0;
             this.qiantuiForm.domains.splice(1,10);

             this.houtuiForm.domains[0].num=val+'R'+0;
             this.houtuiForm.domains.splice(1,10);

             this.huangguaForm.domains[0].num=val+'H'+0;
             this.huangguaForm.domains.splice(1,10);

             this.yaojiForm.domains[0].num=val+'Y'+0;
             this.yaojiForm.domains.splice(1,10);

             this.datuiForm.domains[0].num=val+'D'+0;
             this.datuiForm.domains.splice(1,10);

             this.yangleiForm.domains[0].num=val+'L'+0;
             this.yangleiForm.domains.splice(1,10);

             this.furouForm.domains[0].num=val+'F'+0;
             this.furouForm.domains.splice(1,10);

             this.jianjiaForm.domains[0].num=val+'J'+0;
             this.jianjiaForm.domains.splice(1,10);

             this.yangqianForm.domains[0].num=val+'M'+0;
             this.yangqianForm.domains.splice(1,10);

             this.waijiForm.domains[0].num=val+'W'+0;
             this.waijiForm.domains.splice(1,10);

             this.lijiForm.domains[0].num=val+'I'+0;
             this.lijiForm.domains.splice(1,10);
                
            }
             else{
             this.twocut1.num=val;
             this.twocut2.num=val;
             this.qiantuiForm.domains[0].num=val
             this.houtuiForm.domains[0].num=val
             this.huangguaForm.domains[0].num=val

             this.yaojiForm.domains[0].num=val
             this.datuiForm.domains[0].num=val
             this.yangleiForm.domains[0].num=val

             this.furouForm.domains[0].num=val
             this.jianjiaForm.domains[0].num=val
             this.yangqianForm.domains[0].num=val

             this.waijiForm.domains[0].num=val
             this.lijiForm.domains[0].num=val
            }
        }
    },

    data () {
        return {
            user:null,
            carcass:{
                time:null,
                earTag:null,
                carNumber:null,
            },
            VideoNum:0,
            user:[],
            radio:0,
            holder:null,
        total:0,
        page:1,
        tableData:[],
        twocut1:{
            num:null,
            weight:null,
            file:null,
            fileName:null
         },
         twocut2:{
            num:null,
            weight:null,
            file:null,
            fileName:null
         },
         formFlag:null,
         FileName:true,
        erfen: null,
        qiantui:'',
        houtui:'',
        huanggua:'',
        yaoji:'',
        datui:'',
        yanglei:'',
        furou:'',
        jianjia:'',
        yangqian:'',
        waiji:'',
        liji:'',
        serial:null,
        captures: [{model: null , per : 0}],
        captures2: [{model: null , per : 0}],
        qiantuiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        houtuiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        huangguaForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        yaojiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        datuiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        yangleiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        furouForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },

        jianjiaForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        yangqianForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        waijiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        lijiForm: {
          domains: [{
            num:null,
            weight:null,
            file:null,
            fileName:null
          }],
        },
        disableBtn:false,
        
    }
    },


    created () {
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
            }
        })
    },


    methods: {
        handleCurrentChange(currentRow,oldCurrentRow) {
        this.selectRow = currentRow;
        this.carcass.earTag=this.selectRow.fatherNumber
        this.carcass.carNumber=this.selectRow.appendageNumber
      },
        returnback(){
            let pathid = this.$route.params.id
            let path = `/admin/${pathid}/intelManage/total`
            this.$router.push(path)
        },

        change (val, cardIndex, itemIndex, index) {
            this.cards[cardIndex].items[itemIndex].inputs.splice(index, 1, val)
        },
        selectFile(item,i,file){
            console.log(file)
            item.file = file
            item.fileName=file.name
            console.log(item.file);
            console.log(item.fileName)
            // let str=item.num
            // this.formFlag=str.substr((str.length-2),1)
            // console.log(this.formFlag)
            // console.log(item);
            // this.serial=i;
            // this.FileName=file.name;
            // console.log(this.FileName)
        },
        removeDomain(item,Form) {
        var index = Form.domains.indexOf(item)
        if (index !== 0) {
          Form.domains.splice(index, 1)
        }
      },
      addDomain(Form) {
          let str= Form.domains[Form.domains.length-1].num; 
          let str2=str.substring(0,str.length-1) //第一个参数代表起始位置，第二个代表结束位置的下一个位置   str.slice()的参数也是一样的
          let num=str.substr(str.length-1,1) //第一个参数代表起始位置，第二个代表截取长度
          Form.domains.push({
          num:str2+(Number(num)+1),
          key: Date.now()
        });
      },
      async fetchData(){
			let id = this.user.userFactory
			let param = {
                			page: (this.page - 1)*10,
               				size: 10,
           				} 
					 this.tableData = []
			getSegmentSheep(id , param).then(res => {
                if (isReqSuccessful(res)) {
               		 this.total = Math.ceil(res.data.number/param.size)*10
               		 let data = res.data.List
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
                              console.log(v)
						this.tableData.push(v)
               		 })
                }
            })
		},

        submit () {
              let form=new FormData()
            if(this.radio==0){
                form.append('divisionTime', this.carcass.time)
                form.append('trademarkEarTag', this.carcass.earTag)
                form.append('kidNumber', this.carcass.carNumber)
                form.append('factoryId', this.user.userFactory)
                form.append('operatorType', this.radio)
              }  
            if(this.radio==1){
                form.append('divisionTime', this.carcass.time)
                form.append('trademarkEarTag', this.carcass.earTag)
                form.append('kidNumber', this.carcass.carNumber)
                form.append('factoryId', this.user.userFactory)
                form.append('operatorType', this.radio)
                form.append('divisions[0].number', this.twocut1.num)
                form.append('divisions[0].weight', this.twocut1.weight)
                form.append('divisions[0].video', this.twocut1.file)
                form.append('divisions[1].number',this.twocut2.num)
                form.append('divisions[1].weight',this.twocut2.weight)
                form.append('divisions[1].video',this.twocut2.file)
              }

              console.log(form)
              let headers = {}
              headers[authStr] = window.localStorage.getItem(tokenStr)
              window.fetch(baseUrl + '/division', {
                  method: 'POST',
                  headers,
                  body: form
              }).then(async res => {
                  let body = await res.json()
                    if (isReqSuccessful(body)) {
                        this.captures2.forEach((item ,index) => {
                            this.captures2[index].per = 100
                            this.$message.success('上传成功')
                        // let path = `/admin/${pathid}/slaughterManage/segmentManagerlist`
                        // this.$router.push(path)
                            this.fetchData()
                        })
                    }
                    else{
                    this.$message.error('上传失败')
                    }
                })
            
        }
    }
}
</script>
 
<style>
.checkbox_segment{
    padding: 0px;
    width:500px;
}
.segment-file{
    display:inline;
    margin-top: -10px;
    height: 10px;
    width:20%;

}.demo-dynamic{
    width:100%;
}
</style>

