<template>
    <div class="admin-form">
        <p class="card-title" v-text="title"></p>
        <basic-info ref="info" :radio-index="radioIndex" :items="items" :models.sync="models" :update-submitter="updateSubmitter" :update-unit="updateUnit" :is-produce="isProduce"></basic-info>
        <div class="card" v-if="hasNote">
            <p class="card-title">品种详情:</p>
            <el-input type="textarea" v-model="models.description"></el-input>
        </div>
        <div class="card" v-if="hasRemark">
            <p class="card-title">备注:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="card" v-if="hasRecommand">
            <p class="card-title">羊场介绍:</p>
            <el-input type="textarea" v-model="models.remark"></el-input>
        </div>
        <div class="card" v-if="hasUnitRecommand">
            <p class="card-title">单位介绍:</p>
            <el-input type="textarea" v-model="models.introduction"></el-input>
        </div>
        <div class="card" v-if="hasSuNe">
            <p class="card-title" style="text-align: center; padding-left: 0px">供需信息发布</p>
            <basic-info ref="info" :radio-index="radioIndex" :items="itemsSN" :models.sync="modelsSN"></basic-info>
        </div>


        <!-- <div class="card" v-if="hasSele">
            <p class="card-title" style="text-align: center; padding-left: 0px">60天</p>
            <basic-info ref="info" :radio-index="radioIndex" :items="itemsTwo" :models.sync="modelsTwo"></basic-info>
        </div>

        <div class="card" v-if="hasSele">
            <p class="card-title" style="text-align: center; padding-left: 0px">180天</p>
            <basic-info ref="info" :radio-index="radioIndex" :items="itemsSix" :models.sync="modelsSix"></basic-info>
        </div>

        <div class="card" v-if="hasSele">
            <p class="card-title" style="text-align: center; padding-left: 0px">360天</p>
            <basic-info ref="info" :radio-index="radioIndex" :items="itemsOne" :models.sync="modelsOne"></basic-info>
        </div> -->
        
        <div class="admin-send" v-if="isPrac">
            <template v-if="!check && !view">
                <el-button  type="warning" @click="changeActive2" style="position: relative; top:45px; left:200px;" :disabled="false">点击进入育种选育实施档案</el-button>
            </template>
        </div>

   
        <div class="admin-send" v-if="canModify">
            <template v-if="!check && !view">
                <el-button type="primary" :disabled="disableBtn" @click="submit(checkFull)">提交/更新</el-button>
                <el-button type="primary" v-if="intel_com" :disabled="disableBtn" @click="returnback">返回生产节点统计</el-button>
            </template>
            <!-- <el-button type="primary"  :disabled="disableBtn" @click="submit(checkFull)">提交/更新</el-button> -->
            <template v-else-if="!view">
                <el-button type="primary" :disabled="disableBtn" @click="Spv(1)">通过</el-button>
                <el-button type="primary"  :disabled="disableBtn" @click="Spv(0)">拒绝</el-button>
            </template>
            <el-button type="primary" v-else :disabled="disableBtn" @click="$router.back()">返回</el-button>
        </div>

        

        <div class="admin-send" v-else>已审核</div>
    </div>
</template>

<script>
import BasicInfo from '@/components/admin/basic_info'
import { checkForm, isReqSuccessful, postJump, patchJump, addressToArray  } from '@/util/jskit'
import { getUserById, patchWelfare, patchBreeding, patchPrevention, patchProWelfare, patchProPrevention, patchProBreeding } from '@/util/getdata'
export default {
    props: {
        isAgent: {
            type: Boolean,
            default: false
        },
        isSuper: {
            type: Boolean,
            default: false
        },
        modpath: {
            type: String
        },
        title: {
            type: String
        },
        items: {
            type: Array
        },
        itemsSN: {
            type: Array
        },
        itemsBreed:{
            type:Array
        },
        itemsPart:{
            type:Array
        },
        modelsSN:{
            type: Object
        },
        models:{
            type: Object
        },
        modelsBreed:{
            type: Object
        },
        modelsPart:{
            type: Object
        },
        hasRemark: {
            type: Boolean,
            default: true
        },
        hasRecommand: {
            type: Boolean,
            default: false
        },
        hasUnitRecommand: {
            type: Boolean,
            default: false
        },
        hasSuNe: {
            type: Boolean,
            default: false
        },
        hasSele:{
           type: Boolean,
            default: false 
        },
        hasPrac:{
            type: Boolean,
            default: false 
        },
        hasNote: {
            type: Boolean,
            default: false
        },
        checkFull: {
            type: Boolean,
            default: true
        },

        postData: {
            type: Function
        },
        getData: {
            type: Function
        },
        updateData: {
            type: Function
        },
        isPrac:{
            type:Boolean,
            default:false
        },
        radioIndex: {
            type: Number,
            default: 0
        },
        updateSubmitter: {
            type: Boolean,
            default: false
        },
        updateUnit: {
            type: Boolean,
            default:false
        },
        //屠宰加工消费实体 this.edit = false但是需要getmessage
        isCustomer: {
            type: Boolean,
            default: false
        },
        //判断是否是消费实体和屠宰加工，是则不请求/bc/b接口
        isProduce: {
            type: Boolean,
            default: true
        },
        //判断是否是养殖端
        isBreed: {
            type: Boolean,
            default: false
        }
    },

    components: {
        BasicInfo
    },

    watch: {
        '$route' (newV, oldV) {
            // from edit to post
            if (oldV.query.edit && !newV.query.edit) {
                this.edit = false
            }
            this.check = newV.query.check
            this.supervise = newV.query.supervise
            this.view = newV.query.view
        }
    },
    mounted () {
        this.check = this.$route.query.check
        this.supervise = this.$route.query.supervise
        this.view = this.$route.query.view
        this.edit = this.$route.query.edit || this.$route.query.check || this.$route.query.supervise || this.view
        this.intel = this.$route.query.intel
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                this.fetchBreedData(this.user.userFactory)
            }
        })
        if(this.intel == 4){
            this.intel_com = true
        }
        //屠宰加工 消费实体
        if(this.isCustomer){
            this.getData(this.$route.params.id).then(res => {
                if(isReqSuccessful(res)) {
                    let obj = {}
                    let objSN = {}
                    let objBreed={}
                    let objPart={}
                    this.unitId = res.data.customer.id
                    Object.keys(this.models).forEach(v => {
                        obj[v] = res.data.customer[v]
                    })
                    if('simpleAddress' in obj){
                        obj.simpleAddress = addressToArray(obj.simpleAddress)
                    }
                    Object.keys(this.modelsSN).forEach(v => {
                        objSN[v] = res.data.customer[v]
                    })
                    Object.keys(this.modelsBreed).forEach(v => {
                        objBreed[v] = res.data.customer[v]
                    })
                    Object.keys(this.modelsPart).forEach(v => {
                        objPart[v] = res.data.customer[v]
                    })
                    this.$emit('update:models', obj)
                    this.$emit('update:modelsSN', objSN)
                    this.$emit('update:modelsBreed', objBreed)
                    this.$emit('update:modelsPart', objPart)
                }
            })
        }
        if (this.edit) {
            this.getData(this.edit).then(res => {
                if (isReqSuccessful(res)) {
                    let obj = {}
                    // console.log(res.data.model, this.models)
                    Object.keys(this.models).forEach(v => {
                        obj[v] = res.data.model[v]
                    })

                    if('simpleAddress' in obj){
                        obj.simpleAddress = addressToArray(obj.simpleAddress)
                    }

                    if ('breedLocation' in obj) {
                        obj.breedLocation = addressToArray(obj.breedLocation)
                    }

                    if ( 'prenatalImmunityType' in obj ) {
                        obj.prenatalImmunityType = obj.prenatalImmunityType.split(',')
                    }

                    if ( 'prenatalImmunityTime' in obj ) {
                        obj.prenatalImmunityTime = obj.prenatalImmunityTime.split(',')
                        let length = obj.prenatalImmunityTime.length - 1;
                        // console.log(obj.prenatalImmunityTime)
                        // for ( let i = 0; i < length; i++ ) {
                        //     this.$refs.info.$refs.add[0].click()
                        // }
                    }
                    if ( 'nutritionAfterPregnancy' in obj ) {
                        obj.nutritionAfterPregnancy = obj.nutritionAfterPregnancy.split(',')
                        let length = obj.nutritionAfterPregnancy.length - 1;
                        // console.log(obj.prenatalImmunityTime)
                        // for ( let i = 0; i < length; i++ ) {
                        //     this.$refs.info.$refs.add[0].click()
                        // }
                    }
                    

                    // 0审核未通过 1审核通过 2未审核
                    if (res.data.ispassCheck && res.data.ispassCheck === '1') {
                        this.canModify = false
                    }
                    this.$emit('update:models', obj)
                }
            }, _ => {
                this.$message.error(`获取${this.title}失败`)
            })
        }
    },

    data () {
        return {
            edit: false,
            check: false,
            supervise: false,
            view: false,
            canModify: true,
            unitId: null,
            disableBtn: false,
            openIsDisabled:true,
            map: ['', '省级代理', '市级代理', '县级代理'],
            intel:0,
            intel_com:false,
             pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        }
    },

    methods: {
        fetchBreedData(id){
            if(this.isBreed){
                this.getData(id).then(res => {
                    if(isReqSuccessful(res)){
                        let obj = {}
                        let objSN = {}
                        Object.keys(this.models).forEach(v => {
                            obj[v] = res.data.model[v]
                        })
                        if('breedLocation' in obj){
                             obj.breedLocation = addressToArray(obj.breedLocation)
                        }
                        Object.keys(this.modelsSN).forEach(v => {
                            objSN[v] = res.data.model[v]
                        })
                        this.$emit('update:models', obj)
                        this.$emit('update:modelsSN', objSN)
                    }
                })
            }
        },

        returnback(){
            let pathid = this.$route.params.id
            let path = `/admin/${pathid}/intelManage/total`
            this.$router.push(path)
        }, 
        changeActive2() {
            if(!this.models.lambingNumber||!this.models.lambingTime){
                this.$message.warning('请输入产羔时间以及产羔数量！')
            }
            else{
             let pathid = this.$route.params.id
             let path = `/admin/${pathid}/nutrition/sele/prac`+'?'+'ramSheepTrademark='+this.models.ramSheepTrademark+'&'+'eweSheepTrademark='+this.models.eweSheepTrademark
             this.$router.push(path)
            }
            
        },

        Spv (isPass) {
            // let sMap = {
            //     welfare: patchWelfare,
            //     prevention: patchPrevention,
            //     'nutrition/breed': patchBreeding
            // }
            // let pMap = {
            //     welfare: patchProWelfare,
            //     prevention: patchProPrevention,
            //     'nutrition/breed': patchProBreeding
            // }
            // if (this.supervise) {
            //     sMap[this.modpath](this.supervise, {ispassSup: isPass}).then(res => {
            //         if (isReqSuccessful(res)) {
            //             this.$message.success('修改监督状态成功')
            //             this.$router.push({name: 'review'})
            //         }
            //     }, _ => {
            //         this.$message.error('修改监督状态失败')
            //     })
            // } else if (this.check) {
            //     sMap[this.modpath](this.check, {ispassCheck: isPass}).then(res => {
            //         if (isReqSuccessful(res)) {
            //             this.$message.success('审核成功')
            //             this.$router.push({name: 'review'})
            //         }
            //     }, _ => {
            //         this.$message.error('审核失败')
            //     })
            // }
        },

        submit ( checkFull ) {
            if (! checkForm(this.models, checkFull)) {
                return
            }

            let ArrayToString = arr => {
                return arr.join();
            }

            let StringToArray = string => {
                return string.split(',');
            }

            let data = Object.assign({}, this.models)

            //养殖 屠宰 加工
            if(this.isCustomer || this.isBreed){
                data = Object.assign(data, this.modelsSN)
            }

            if ( data.prenatalImmunityType ) {
                data.prenatalImmunityType = ArrayToString(data.prenatalImmunityType);
            }
            if ( data.prenatalImmunityTime ) {
                data.prenatalImmunityTime = ArrayToString(data.prenatalImmunityTime);
            }
             if ( data.nutritionAfterPregnancy ) {
                data.nutritionAfterPregnancy = ArrayToString(data.nutritionAfterPregnancy);
            }

            if (  data.breedLocation && data.breedingSheepBase  )  {
                data.breedingSheepBase  =  data.breedLocation.join('') + data.breedingSheepBase
                delete data.breedLocation
            }  

            if ( data.simpleAddress ){
                data.simpleAddress = data.simpleAddress.join('')
            }

            let { userFactory, userRealname, id, factoryName } = this.user
            data.factoryNum = this.models.factoryNum || userFactory
            
            if(this.isBreed){
                data.id = data.factoryNum
            }
            if (!this.isAgent) {
                data.operatorName = userRealname
                data.operatorId = id
                data.factoryName = factoryName
            }  else if(data.breedLocation != null){
                let area = data.breedLocation
                if (Array.isArray(area)) {
                    if (!area.length) {
                        this.$message.warning('请选择羊场地理位置')
                        return
                    } else {
                        data.breedLocation = area.join('')         
                    }
                }
                data.responsibleId = -1
                data.agent = id
            } else if(this.isSuper && this.edit){
                data.supAgentId = parseInt(userFactory)
                data.id = this.edit
            } else if(this.isCustomer){
                //屠宰加工 消费实体完善信息
                data.id = this.unitId
            }
            else {
                data.supAgentId = parseInt(userFactory)
            }


            this.disableBtn = true
            if (this.edit && this.isSuper == false ) {
                this.updateData(this.edit, data).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump(this.modpath)
                    }
                    this.disableBtn = false
                }, _ => {
                    this.$message.error('修改失败')
                    this.disableBtn = false
                })
            } else if(this.edit && this.isSuper){
                this.updateData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        patchJump(this.modpath)
                    }
                    this.disableBtn = false
                }, _ => {
                    this.$message.error('修改失败')
                    this.disableBtn = false
                })
            } else if(this.isCustomer || this.isBreed){
                this.postData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        this.$message.success('修改成功')
                    }
                }, _ => {
                    this.$message.error('录入失败')
                })
                this.disableBtn = false
            } else {
                this.postData(data).then(res => {
                    if (isReqSuccessful(res)) {
                        postJump(this.modpath)
                    }
                    this.disableBtn = false
                }, _ => {
                    this.$message.error('录入失败')
                    this.disableBtn = false
                })
            }
        }
    }
}
</script>
