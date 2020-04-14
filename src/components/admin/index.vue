<template>
    <div class="app-home">
        <admin-head :username="user.pkUserid" :department="user.factoryName" :name="user.userRealname" :rolename="user.roleName" :nums="msn"></admin-head>
        <el-container class="container bg-blue">
            <el-aside :width="side_width" class="main-aside">
                <el-tree node-key="to" :default-expanded-keys="expanded_key" :data="treedata" :indent="30" accordion @node-click="clickTree"></el-tree>
            </el-aside>

            <el-container class="app-main">
                <el-main>
                    <span class="hide-span" @click="toggleAside"><i ref="hidespan" class="el-icon-arrow-left"></i></span>
                    <div class="admin-hl pos">
                        <b><i class="el-icon-arrow-down"></i>位置：</b>
                        <el-breadcrumb separator="-">
                            <el-breadcrumb-item :to="{name: item.to}" v-for="(item, i) in bread" :key="i">{{item.text}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <!-- <span class="fs"><i class="el-icon-menu"></i>全屏</span> -->
                    </div>

                    <div class="bg-blue pad">
                        <div class="admin-search">
                            <div class="options" v-if="!isProCheck">
                                <el-button class="admin-hl hl-btn" @click="changeActive(module)" type="primary">{{ module.label }}</el-button>
                                <el-button v-if="isProdModule()" class="admin-hl hl-btn" type="primary" @click="changeActive(module, 1)">{{ module.label }}列表</el-button>
                            </div>
                            <div class="options" v-else>
                                <el-button v-for="(item, i) in production" :key="i" class="admin-hl hl-btn" :class="{'active-prod': item.active}" type="primary" @click="activateProd(item, i)">{{ item.label }}</el-button>
                            </div>
   <!--                          <el-input class="search" placeholder="方案搜索" v-model="search_key" size="small">
                                <el-button slot="append" icon="el-icon-search">搜索</el-button>
                            </el-input> -->
                            <el-button v-if="isSlaughter()" class="admin-hl hl-btn" type="primary" style="margin-right:20px; float:right;" @click="gotoSlaughterList(module, 1)">{{ module.label }}列表</el-button>
                        </div>

                        <div class="main-content">
                            <router-view :user="user" :check-mod="checkMod"></router-view>
                        </div>
                    </div>

                </el-main>
            </el-container>
        </el-container>
        <admin-foot></admin-foot>
    </div>
</template>

<script>
import AdminHead from '@/components/common/admin_head'
import AdminFoot from '@/components/common/admin_foot'
import { getUserById, getUsermsg, getPermitTable} from '@/util/getdata'
import { isReqSuccessful ,getModule, judgeAuthorization } from '@/util/jskit'
//导入权限表s
import { relationShip, tableMap } from '@/util/authorization'

/* eslint-disable object-property-newline */
export default {
    components: {
        AdminHead, AdminFoot
    },

    watch: {
        '$route' (newV, oldV) {
            this.isProCheck = newV.name === 'review'
            if(JSON.stringify(getModule(newV.name)) !== "{}"){
                this.module = getModule(newV.name)
            }
        }
    },

    data () {
        return {
            msn: 0,
            checkMod: 'welfare',
            module: {label: '', to: ''},
            side_width: '18%',
            expanded_key: null,
            showEditTable: false,
            treedata: [
                {label: '会员中心', children: [
                    {label: '个人信息修改', to: 'userinfo'},
                    {label: '密码修改', to: 'passmod'},
                    {label: '在线咨询', to: 'chat'}
                ]}    
            ],
            adminTree: {
                label: '系统管理员中心',
                children:[
                    {label: '客户关系一览表', to: 'table'},
                    {label: '代理管理', to: 'agent'},
                    {label: '养殖客户管理', to: 'farm'},
                    {label: '屠宰加工客户管理', to: 'slaughter'},
                    {label: '消费实体客户管理', to: 'consumer'},
                    {label: '用户管理', to: 'account'},
                    {label: 'APP新用户申请', to: 'appAccount'},
                    {label: '角色权限管理', to: 'authrole'},
                    {label: '短信服务平台', to: 'message'},
                    {label: '留言统计', to: 'commentsum'},
                    {label: '专家客户监管', to: 'commentres'},
                    {label: '发布系统', to: 'release'},
                    {label: 'app用户手册发布', to:'appVideoUpload' },
                    {label: '供需调配', to: 'release'},            
                ]
            },
            agentTree: {
                label: '代理管理员中心', to: 'agenttwo',
                children:[
                    {label: '客户关系一览表', to: 'table'},
                    {label: '下级代理管理', to: 'agent'},
                    {label: '养殖客户管理', to: 'farm'},
                    {label: '屠宰加工客户管理', to: 'slaughter'},
                    {label: '消费实体客户管理', to: 'consumer'},
                    {label: '用户管理', to: 'account'},
                    {label: 'APP新用户申请', to: 'appAccount'},
                    {label: '专家客户评价结果', to: 'commentres'}
                ]
            },
            professorTree: {
                label: '专家工作中心',
                children: [
                    {label: '客户评价', to: 'comment'},
                    {label: '在线直播', to: 'courseintro'},
                    {label: '生产档案审核', to: 'review'},
                    {label: '在线诊断', to: 'prochat'},
                    {label: '发布系统', to: 'release'},
                    {label: '专家课堂视频发布', to: 'professorCourseVideo'},
                    {label: '物资管理', to: 'professorCourseVideo'},
                    {label: '物质推荐', to: 'professorCourseVideo'},
                    {label: '疫病预警防预', to: 'warn'},
                    {label: '可视监控', to: 'professorCourseVideo'}
                ]
            },
            productionTree: {
                label: '养殖生产管理中心',
                children: [
                    {label: '单位信息管理', to: 'farmInfo', children: [
                        {label: '基本信息', to: 'farmUnit'},
                        {label: '用户管理', to: 'account'},
                        {label: '品种管理', to: 'category'}
                    ]},
                    {label: '生产节点智能统计管理', to: 'intelManage', children: [
                        {label: '空怀阶段', to: 'nonpregnant' , children:[
                            {label: '引种应激期' , to: 'nonpregnantOne'},
                            {label: '体况调理期' , to: 'nonpregnantTwo'}
                        ]},
                        {label: '妊娠阶段', to: 'pregnantStage',children:[
                            {label :'妊娠前三月' , to : 'pregnantStageOne'},
                            {label :'妊娠第四月' , to : 'pregnantStageTwo'},
                            {label :'妊娠第五月' , to : 'pregnantStageThree'},
                        ]},
                        {label: '哺乳阶段', to: 'produceStage',children:[
                            {label : '产羔0-5日' , to : 'produceStageOne'},
                            {label : '产羔6-10日' , to : 'produceStageTwo'},
                            {label : '产羔11-20日' , to : 'produceStageThree'},
                            {label : '产羔21-30日' , to : 'produceStageFour'},
                            {label : '产羔31-40日' , to : 'produceStageFive'},
                            {label : '产羔41-50日' , to : 'produceStageSix'},
                            {label : '产羔51-60日' , to : 'produceStageSeven'},
                        ]},
                        {label: '生长阶段', to: 'growStage'},
                        {label: '种羊育种阶段', to: 'breedStage',children:[
                            {label: '育种一期', to: 'breedStageOne'},
                            {label: '育种二期', to: 'breedStageTwo'},
                        ]},
                        {label: '商品羊育肥阶段' , to : 'growFat' ,children:[
                        {label: '育肥前期', to: 'unfatStage'}, 
                        {label: '直线育肥期', to: 'growfatStage'}, 
                        ]}
                    ]},
                    {label: '系谱档案', to: 'genealogic'},
                    {label: '存栏档案', to: 'livestock', children: [
                        {label: '栏栋管理', to: 'livestock'},
                        {label: '新增管理', to: 'livestockAdd'},
                        {label: '羊只管理', to: 'livestockList'},
                        {label: '出售管理', to: 'livestockSale'},
                        {label: '购进管理', to: 'livestockBuy'},
                        {label: '死亡管理', to: 'livestockDead'},
                        {label: '二维码打印', to: 'livestockQrcode'}
                    ]},
                    {label: '商品羊销售管理', to: 'sheepSaleManage', children: [
                        {label: '商品羊销售', to: 'sheepSale'},
                        {label: '订单管理', to: 'sheepSaleOrder'},
                        {label: '已售羊只视频', to: 'sheepSaleVideo'},
                    ]},
                    {label: '卫生·疫控', to: 'health', children: [
                        {label: '专家咨询', to: 'chat'},
                        {label: '卫生与动物福利管理方案', to: 'welfareplan'},
                        {label: '卫生与动物福利操作档案', to: 'welfareprac'},
                        {label: '消毒实施档案', to: 'disinfectprac'},
                        {label: '免疫方案', to: 'immuneplan'},
                        {label: '免疫实施档案', to: 'immuneprac'},
                        {label: '驱虫方案', to: 'antiscolicplan'},
                        {label: '驱虫实施档案', to: 'antiscolicprac'}
                    ]},
                    {label: '营养·生产', to: 'nutrition', children: [
                        {label: '专家咨询', to: 'chat'},
                        {label: '阶段营养方案', to: 'stageplan'},
                        {label: '阶段营养实施档案', to: 'stageprac'},
                        {label: '配种产子管理方案', to: 'breedplan'},
                        {label: '配种产子实施档案', to: 'breedprac'},
                        {label: '育种选育实施档案', to: 'seleprac'}
                    ]},
                    {label: '疾病防治', to: 'prevention', children: [
                        {label: '专家咨询', to: 'chat'},
                        {label: '疾病防治方案', to: 'preventionplan'},
                        {label: '疾病防治实施档案', to: 'preventionprac'},
                        {label: '每日统计', to: 'everydaystatis'}
                    ]},
                    {label: '生产物资平台', to: 'app-delivery'},
                    {label: '可视系统', to: 'visual', children: [
                        {label: '诊断可视', to: 'diagnose'},
                        {label: '诊断可视一览', to: 'production'},
                        {label: '生产可视', to: 'capture'},
                        {label: '生产可视一览', to: 'productionSee'},
                        {label: '认证证书', to: 'nation'}
                    ]},
                    {label: '专家课堂', to: 'course'},
                    {label: '有机养殖环境追溯', to: 'trace'},
                    {label: '有机·监管', to: 'supervise', children: [
                        {label: '企业监控认证', children: [
                            {label: '操作流程审核', to: 'audit'},
                            {label: '回收化验指标', to: 'recovery_index'}
                        ]}
                    ]}
                ]
            },
            slaughterTree: {
                label: '屠宰加工管理中心',
                children: [
                    {label: '单位信息管理', to: 'slaughterInfoManage',children:[
                        {label: '基本信息', to: 'slaughterunit'},
                        {label: '用户管理', to: 'account'},
                        {label: '宣传视频', to: 'slaughterMedia'},
                        {label: '认证证书', to: 'slaughterCertification'},
                        {label: '生产可视一览', to: 'slaughterUnitVisual'},
                        //{label: '生产流程设置', to: 'slaughterProcessSet'},
                        {label: '库存统计', to: 'slaughterAllStock'},
                        {label: '价格设置', to: 'priceSet'},
                        {label: '二维码打印', to: 'slaughterQrcode'}
                    ]},

                    {label: '认购管理', to: 'subscription',children:[
                            {label: '关联检疫证', to: 'correlation'},
                            {label: '检疫证书图片', to: 'correlationPicture'},
                    ]},
                    {label: '屠宰前管理', to: 'beforeslaughter',children:[
                            //{label: '宰前管理', to: 'beforeManage'},
                            {label: '宰前管理', to: 'beforeslaughter'},
                            {label: '宰前羊只照片', to: 'beforeVideo'}
                    ]},
                    {label: '屠宰管理', to: 'slaughter',children:[
                        {label: '胴体', to: 'kidMange'},
                        {label: '附属物', to: 'appendageMange'} 
                    ]},
                    {label: '分割管理', to: 'segment',children:[
                        {label: '分割管理', to: 'segmentManger'},
                        
                    ]},
                    {label: '溯源管理', to: 'stock',children:[
                            {label: '销售管理', to: 'stockManage'},
                            {label: '货单管理', to: 'productOrder'},
                            //{label: '订单管理', to: 'orderManage'},
                            {label: '车辆管理', to: 'vehicleManage'}
                    ]},
                    // {label: '可视系统', to: 'visual', children: [
                    //     {label: '生产可视', to: 'slaughterMedia'},
                    //     {label: '生产可视一览', to: 'slaughterUnitVisual'},
                    //     {label: '认证证书', to: 'slaughterCertification'}
                    // ]}
                ]
            },
            consumptionTree: {
                label: '消费实体管理中心',
                children: [
                    {label: '单位信息管理', to: 'consumerInfoManage', children: [
                        {label: '基本信息', to: 'consumerunit'},
                        {label: '用户管理', to: 'account'},
                        {label: '宣传视频', to: 'consumerUnitMedia'},
                        {label: '认证证书', to: 'consumerCertification'},
                        {label: '生产可视一览', to: 'consumerUnitVisual'},
                        {label: '常规出品设置', to: 'productSet'},
                        {label: '二维码打印', to: 'shopQrcode'}
                    ]},
                    {label: '消费店管理', to: 'ShopManage'},
                    {label: '库存一览', to: 'outWareManage'},
                    // {label: '可视系统', to: 'visual', children: [
                    //     {label: '生产可视', to: 'consumerUnitMedia'},
                    //     {label: '生产可视一览', to: 'consumerUnitVisual'},
                    //     {label: '认证证书', to: 'consumerCertification'}
                    // ]},
                ]
            },
            options: [],
            search_key: null,
            showTree: true,
            bread: [
                {text: '溯源管理', to: 'authrole'}
            ],
            isProCheck: false,
            // 审核7大生产环节
            production: [
                {label: '卫生与动物福利', mod: 'welfare', active: true},
                {label: '消毒', mod: 'health/disinfect'},
                {label: '免疫', mod: 'health/immune'},
                {label: '驱虫', mod: 'health/antiscolic'},
                {label: '阶段营养', mod: 'nutrition/stage'},
                {label: '配种产子', mod: 'nutrition/breed'},
                {label: '疫病防治', mod: 'prevention'}
            ],

            user: {}
        }
    },

    created () {        
        // 工厂用户才可以录入信息
        let id = this.$route.params.id
        getUserById(id).then(res => {
            if (isReqSuccessful(res)) {
                this.user = res.data.model
                // let { userRole, flag } = res.data
                // if (flag === 0) {
                //     // 羊场
                //     this.treedata.push(this.productionTree)
                // } else if (flag === 1) {
                //     // 代理
                //     this.treedata.push(this.productionTree)
                //     if ([4, 8, 12, 16].includes(userRole)) {
                //         // 专家代理
                //         this.treedata.push(this.professorTree)
                //     } else {
                //         // 普通代理
                //         this.treedata.push(this.adminTree)
                //     }
                // }
                // flag: 2 普通用户
                getUsermsg(this.user.userTelephone).then(res => {
                    if(isReqSuccessful(res)){
                        this.msn = res.data.msgcount; 
                    }
                })
            }
        })
        //构建树
        // this.buildTree(id)
        this.treedata.push(this.adminTree, this.agentTree, this.professorTree, this.productionTree, this.slaughterTree, this.consumptionTree)

      
    },

    mounted () {
        this.isProCheck = this.$route.name === 'review'

        let path = this.$route.path.substr(7) // rid of '/admin/'
        let [id, parent, child, postfix] = path.split('/')
        let arr = [{text: '溯源管理'}]
        let mod
        let submod
        let treeArr = [this.treedata[0], this.professorTree, this.adminTree, this.productionTree, this.slaughterTree, this.consumptionTree]

        let postfixArr = ['prac', 'list', 'plan']
        let idx = postfixArr.indexOf(child)
        for (let tree of treeArr) {
            if (idx !== -1) {
                mod = tree.children.find(v => v.to === parent || v.to === parent + postfixArr[idx])
            } else {
                mod = tree.children.find(v => v.to === parent)
            }
            if (mod && Array.isArray(mod.children)) {
                submod = mod.children.find(v => v.to === child + postfix || v.to === child + 'prac')
            } else if (mod) {
                break
            }
        }

        if (mod && submod) {
            // open left tree
            if (postfix === 'list') {
                this.expanded_key = [child + 'prac']
            } else {
                this.expanded_key = [child]
            }

            arr.push({text: mod.label, to: mod.to}, {text: submod.label, to: submod.to})
            this.module = submod
        } else if (mod) {
            this.expanded_key = [parent]
            arr.push({text: mod.label, to: mod.to})
            this.module = mod
        } else {
            // default index of admin
            arr.push({text: '会员中心'}, {text: '个人信息修改', to: 'userinfo'})
            this.module = {label: '个人信息修改', to: 'userinfo'}
            this.expanded_key = ['userinfo']
        }
        this.bread = arr
    },

    methods: {
        activateProd (item, idx) {
            this.checkMod = item.mod
            this.production.find(v => v.active && delete v.active)
            this.production[idx].active = true
        },

        isProdModule () {           
            let name = this.$route.name 
            return ['welfare', 'genealogic', 'farm', 'agent', 'release' , 'category', 'consumer'].includes(name) || name.endsWith('prac') || (name.endsWith('list') && !['correlation','beforeslaughter','kidMange','appendageMange', 'slaughter','segmentManger'].includes(name))
        },
        isSlaughter(){
            let name = this.$route.name;
            if(this.$route.path.indexOf('/stock/productOrder') !== -1) {
                return false;
            }
            return ['correlation','beforeslaughter','kidMange','appendageMange', 'slaughter','segmentManger', 'stockManage', 'productOrder'].includes(name);
        },

        changeActive (item, isTo) {
            if (isTo) {
                // itemprac -> itemlist
                let idx = item.to.indexOf('prac')
                if (idx === -1) {
                    this.$router.push({name: item.to + 'list'})
                } else {
                    this.$router.push({name: item.to.substr(0, item.to.indexOf('prac')) + 'list'})
                }
            } else {
                this.$router.push({name: item.to})
            }
        },
        gotoSlaughterList(){
            let id = this.$route.params.id;
            let path = this.$route.path + "/list";
            this.$router.push(path);
        },

        toggleAside () {
            if (this.side_width !== '0') {
                this.side_width = '0'
                this.$refs.hidespan.classList.remove('el-icon-arrow-left')
                this.$refs.hidespan.classList.add('el-icon-arrow-right')
            } else {
                this.side_width = '18%'
                this.$refs.hidespan.classList.remove('el-icon-arrow-right')
                this.$refs.hidespan.classList.add('el-icon-arrow-left')
            }
        },

        //递归
        deleteItem(tree, item){
            if(tree.children === undefined)
                return
            tree = tree.children
            for(let i in tree){
                this.deleteItem(tree[i], item)
                if(tree[i].to == item)
                    tree.splice(i, 1)
            }
        },

        //删除操作,此函数和deleteItem没必要做修改
        //分别对5个大标签树实行删除操作
        deleteAction(deleteTree){
            for(let item in deleteTree.productionTree)
                this.deleteItem(this.productionTree, deleteTree.productionTree[item])
            for(let item in deleteTree.adminTree)
                this.deleteItem(this.adminTree, deleteTree.adminTree[item])
            for(let item in deleteTree.consumptionTree)
                this.deleteItem(this.consumptionTree, deleteTree.consumptionTree[item])
            for(let item in deleteTree.slaughterTree)
                this.deleteItem(this.slaughterTree, deleteTree.slaughterTree[item])
            for(let item in deleteTree.professorTree)
                this.deleteItem(this.professorTree, deleteTree.professorTree[item])
        },

        //build the tree
        async buildTree(id){
            var res = await getPermitTable(id)
            var deleteTree = {
                slaughterTree: [],
                consumptionTree: [], 
                productionTree: [],
                adminTree: [],
                professorTree: []
            }
            for(let i in tableMap){
                if(res.data.tables.indexOf(i) == -1){
                    let item = tableMap[i]
                    if(relationShip[item].path !== null){
                        for(let key in relationShip[item].name){
                            deleteTree[relationShip[item].path].push(relationShip[item].name[key])
                        }
                    }
                }
            }
            await this.deleteAction(deleteTree)
            this.treedata.push(this.adminTree, this.professorTree, this.productionTree, this.slaughterTree, this.consumptionTree)
        },

        

        clickTree (node, data) {
            if(node.to=='intelManage'){
                this.module = {label: node.label, to: node.to}
                this.$router.push({name: node.to})
            }

            if (data.isLeaf) {
                if (node.to === 'app-delivery') {
                    window.open('http://mall.yunyangbao.cn/')
                    return
                }
                // if chat open another page
                // if (node.to === 'chat') {
                //     window.open(window.location.origin + '/#/chat?from=' + window.encodeURIComponent(data.parent.label))
                //     return
                // }

                let arr = [{text: '溯源管理'}]
                let parent = data.parent
                if (Object.prototype.toString.call(parent.data) === '[object Object]') {
                    arr.push({text: parent.data.label})
                }
                arr.push({text: node.label, to: node.to})
                this.bread = arr

                this.module = {label: node.label, to: node.to}
                node.to && this.$router.push({name: node.to})
            }
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/color'
@import '~@/assets/css/admin-form'
@import '~@/assets/css/admin-table'

.fl-l
    float left
.pad
    height calc(100% - 30px)
    padding-left 8px
.bg-blue
    background-color color-main

.app-home
    min-width 1200px
    background-color color-main

.main-aside
    min-height 500px
    padding-left 5px
    transition width .3s
    .el-tree
        padding-left 5px
        background-color color-main
        >div
            border-bottom 1px solid #ddd
            >.el-tree-node__content
                padding-left 20px !important

    .el-tree-node__content
        color #fff
        height 40px
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover
        background-color color-main
    div[role="group"]
        .el-tree-node__content,
        .el-tree-node:focus>.el-tree-node__content
            background-color #fff
            color color-main
        .el-tree-node__content:hover
            background-color #ddd
        .el-tree-node__content
            &::before
                content '·'
                font-size 30px
                margin-right 5px
    .el-tree-node__expand-icon
        display none

.app-main
    div.el-input-group__prepend
        box-sizing border-box
        width 34%
        color #fff
        background-color color-main
    .el-input
        input,
        .el-input-group__prepend
            border-radius 0
            border 1px solid color-main
            &:hover,
            &:focus
                outline 0 none
    .el-main
        position relative
        padding 0
        padding-left 10px
        background-color #fff
        .hide-span
            position absolute
            left 0
            top 50%
            width 14px
            height h=50px
            line-height h
            background-color color-main
            color #fff
            border-left 1px solid #fff
            border-radius 4px
            cursor pointer
            i
                font-size 12px
        .pos
            height h=30px
            line-height h
            padding-left 0
            .fs
                position absolute
                right 310px
        .search
            float right
            width 300px
            .el-input-group__append
                background-color color-main
                color #fff

        .hl-btn
            padding 6px 20px
    .main-content
        min-height 400px
        margin-top 20px
        box-sizing border-box
        height calc(100% - 67px)
        padding 10px
        background-color #fff
        color color-main

// 当前位置和搜索
.admin-hl
    background-color #fff
    color color-main
    padding 0 20px
    i
        font-weight bolder
        margin-right 5px
    .el-breadcrumb
        display inline-block
        .el-breadcrumb__inner
            color color-main
.admin-search
    padding-top 15px
    margin 0 20px 0 20px
    overflow hidden
    .options
        float left
        .el-button
            border-bottom-left-radius 0
            border-bottom-right-radius 0

        .active-prod
            background: rgb(83, 167, 218);
            border-color: rgb(83, 167, 218);
            color: #fff;

</style>
