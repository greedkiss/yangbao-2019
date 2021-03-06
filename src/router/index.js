import Vue from 'vue'
import Router from 'vue-router'

// 用户模块
import Index from '@/components/index'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import FindPass from '@/components/login/findpass'
import Genea from '@/components/genea/genealogic'
import GeneaDetail from '@/components/genea/genea_detail'
import Course from '@/components/course'

import Header from '@/components/common/oldhead'

const SearchRes = () => import('@/components/search_res2')
const mobileSearchRes = () => import('@/components/search_mobile')
// 隐私服务
const Law = () => import('@/components/law/law')

// 管理员模块首页
const Admin = () => import('@/components/admin/index')
// 专家在线咨询
const Chat = () => import('@/components/admin/user/chat')
const ProChat = () => import('@/components/admin/user/prochat')
// 发布
const ReleaseIndex = () => import('@/components/release') 
const News = () => import('@/components/news')
const Company= () => import('@/components/company')
const Contact= () => import('@/components/contact')
const Videodownload= () => import('@/components/videodownload')
const CourseIntro = () => import('@/components/admin/professorCourseVideo/intro')
// 个人信息
const UserInfo = () => import('@/components/admin/user/user')
const PasswordModify = () => import('@/components/admin/user/pass')
// 审核
const Review = () => import('@/components/admin/review/index')
// 留言
const CommentSummary = () => import('@/components/admin/comment/index')
const AcountComment = () => import('@/components/admin/comment/accountComment')
const CommentResult = () => import('@/components/admin/comment/commentResults')
// 用户权限
const AuthRole = () => import('@/components/admin/auth/role')
const AuthRoleInput = () => import('@/components/admin/auth/input')
const Account = () => import('@/components/admin/account/index')
const AppAccount = () => import('@/components/admin/appAccount/index')
// 系谱档案
const Genealogic = () => import('@/components/admin/genealogic/index')
const GenealogicList = () => import('@/components/admin/genealogic/list')
// 卫生疫控
const DisinfectPrac = () => import('@/components/admin/health/disinfect_prac')
const DisinfectList = () => import('@/components/admin/health/disinfect_list')
const ImmunePlan = () => import('@/components/admin/health/immune_plan')
const ImmunePrac = () => import('@/components/admin/health/immune_prac')
const ImmuneList = () => import('@/components/admin/health/immune_list')
const AntiscolicPlan = () => import('@/components/admin/health/antiscolic_plan')
const AntiscolicPrac = () => import('@/components/admin/health/antiscolic_prac')
const AntiscolicList = () => import('@/components/admin/health/antiscolic_list')

const Warn = () => import('@/components/admin/health/warn')

// 存栏档案
const LivestockPrac = () => import('@/components/admin/livestock/index')
const LivestockList = () => import('@/components/admin/livestock/list')
const LivestockSale = () => import('@/components/admin/livestock/sale')
const LivestockDead = () => import('@/components/admin/livestock/dead')
const LivestockAdd = () => import('@/components/admin/livestock/add')
const LivestockBuy = () => import('@/components/admin/livestock/buy')
const LivestockQrcode = () => import('@/components/admin/livestock/qrcodePrint')
//商品羊销售管理
const SheepSale = () => import('@/components/admin/sheepSaleManage/sheepSale')
const SheepSaleOrder = () => import('@/components/admin/sheepSaleManage/sheepSaleOrder')
const SheepSaleVideo = () => import('@/components/admin/sheepSaleManage/sheepSaleVideo')

//养殖客户基本信息管理
const FarmUnit = () => import('@/components/admin/farmUnit/index')

// 智能管理

const intelManage = () => import('@/components/admin/intelManage/totalSeen')
const NonpregnantOne = () => import('@/components/admin/intelManage/sheepIn')
const nonpregnantTwo = () => import('@/components/admin/intelManage/bodyChange')
const pregnantStageOne = () => import('@/components/admin/intelManage/stageOne')
const pregnantStageTwo = () => import('@/components/admin/intelManage/stageTwo')
const pregnantStageThree = () => import('@/components/admin/intelManage/stageThree')
const produceStageOne = () => import('@/components/admin/intelManage/produceStageOne')
const produceStageTwo = () => import('@/components/admin/intelManage/produceStageTwo')
const produceStageThree = () => import('@/components/admin/intelManage/produceStageThree')
const produceStageFour = () => import('@/components/admin/intelManage/produceStageFour')
const produceStageFive = () => import('@/components/admin/intelManage/produceStageFive')
const produceStageSix = () => import('@/components/admin/intelManage/produceStageSix')
const produceStageSeven = () => import('@/components/admin/intelManage/produceStageSeven')
const growStage = () => import('@/components/admin/intelManage/growStage')
const breedStageOne = () => import('@/components/admin/intelManage/breedStageOne')
const breedStageTwo = () => import('@/components/admin/intelManage/breedStageTwo')
const unfatStage = () => import('@/components/admin/intelManage/unfatStage')
const growfatStage = () => import('@/components/admin/intelManage/growfatStage')

// 营养生产
const StagePlan = () => import('@/components/admin/nutrition/stage_plan')
const StagePrac = () => import('@/components/admin/nutrition/stage_prac')
const StageList = () => import('@/components/admin/nutrition/stage_list')
const BreedPlan = () => import('@/components/admin/nutrition/breed_plan')
const BreedPrac = () => import('@/components/admin/nutrition/breed_prac')
const BreedList = () => import('@/components/admin/nutrition/breed_list')
const SeleList = () => import('@/components/admin/nutrition/sele_list')
const SeleMore = () => import('@/components/admin/nutrition/sele_more')
const BreedMore = () => import('@/components/admin/nutrition/breed_more')
const SelePrac = () => import('@/components/admin/nutrition/sele_prac')

// 疫病防治
const PreventionPlan = () => import('@/components/admin/prevention/prevention_plan')
const PreventionPrac = () => import('@/components/admin/prevention/prevention_prac')
const PreventionList = () => import('@/components/admin/prevention/prevention_list')
const EverydayStatis = () => import('@/components/admin/prevention/everydaystatis')
// 可视系统
const Diagnose = () => import('@/components/admin/visual/diagnose')
const DiagnoseList = () => import('@/components/admin/visual/diagnose_list')
const ProductionVisual = () => import('@/components/admin/visual/production')
const ProductionGlance = () => import('@/components/admin/visual/productionGlance')

// 有机养殖环境追溯
const TraceCharts = () => import('@/components/admin/trace/index')
// 动物福利
const Welfare = () => import('@/components/admin/welfare/index')
const WelfareList = () => import('@/components/admin/welfare/list')
const WelfarePlan = () => import('@/components/admin/welfare/plan')
// 有机监管
const Nation = () => import('@/components/admin/supervise/nation')
const Audit = () => import('@/components/admin/supervise/audit')
const Capture = () => import('@/components/admin/supervise/capture')
const RecoveryIndex = () => import('@/components/admin/supervise/recovery_index')
// 羊场管理
const Farm = () => import('@/components/admin/farm/index')
const FarmList = () => import('@/components/admin/farm/list')
//屠宰加工管理
//认购管理
const Correlation = () => import('@/components/admin/subscribe/correlation')
const CorrelationList = () => import('@/components/admin/subscribe/correlation_list')
const CorrelationPicture = () => import('@/components/admin/subscribe/correlation_picture')

const Slaughter = () => import('@/components/admin/slaughter/index')
const SlaughterList = () => import('@/components/admin/slaughter/list')
//const BeforeManage = () => import('@/components/admin/beforeslaughter/before_manage')
const BeforeSlaughterList = () => import('@/components/admin/beforeslaughter/beforeSlaughter_list')
const BeforeSlaughter = () => import('@/components/admin/beforeslaughter/beforeSlaughter')
const BeforeVideo = () => import('@/components/admin/beforeslaughter/before_video')
const kidMange= () => import('@/components/admin/slaughterManger/kid')
const kidMangeList= () => import('@/components/admin/slaughterManger/kid_list')
const appendageMange= () => import('@/components/admin/slaughterManger/appendage')
const appendageMangeList= () => import('@/components/admin/slaughterManger/appendage_list')
const SegmentManger= () => import('@/components/admin/segment/segmentManger')
const SegmentMangerList= () => import('@/components/admin/segment/segmentManger_list')
const StockManage = () => import('@/components/admin/stock/stock_manage')
const productOrder = () => import('@/components/admin/stock/productOrderManage')
const OrderManage = () => import('@/components/admin/stock/order_manage')
const VehicleManage = () => import('@/components/admin/stock/vehicle_manage')


//消费实体管理
const Consumer = () => import('@/components/admin/consumer/index')
const ConsumerList = () => import('@/components/admin/consumer/list')
const OutWareManage = () => import('@/components/admin/outWare/outWareManage')
// 代理管理
const Agent = () => import('@/components/admin/agent/index')
const AgentList = () => import('@/components/admin/agent/list')

// 品种录入
const category = () => import('@/components/admin/category/index')
const categoryList = () => import('@/components/admin/category/list')

// 发布系统
const Release = () => import('@/components/admin/release/index')
const ReleaseList = () => import('@/components/admin/release/list')
// 短信平台
const Message = () => import('@/components/admin/message/index')
// 专家课堂视频发布
const ProfessorCourseVideo = () => import('@/components/admin/professorCourseVideo/index')

const NotFound = () => import('@/components/not_found')

const TableFound = () => import('@/components/table/app')

const AppVideoUpload = () => import('@/components/admin/appVideoUpload/AppVideoUpload')
//屠宰加工管理平台
const SlaughterUnit = () => import('@/components/admin/slaughterUnit/index')
const SlaughterUnitVisual = () => import('@/components/admin/slaughterUnit/productionVisual')
const SlaughterMedia = () => import('@/components/admin/slaughterUnit/media')
const SlaughterCertification = () => import('@/components/admin/slaughterUnit/certification')
//const SlaughterProcessSet = () => import('@/components/admin/slaughterUnit/processSet')
const SlaughterAllStock = () => import('@/components/admin/slaughterUnit/allStock')
const PriceSet = () => import('@/components/admin/slaughterUnit/priceSet')

//消费实体管理平台
const ConsumerUnit = () => import('@/components/admin/consumerUnit/index')
const ConsumerUnitVisual = () => import('@/components/admin/consumerUnit/productionVisual')
const ConsumerUnitMedia = () => import('@/components/admin/consumerUnit/media')
const ConsumerCertification = () => import('@/components/admin/consumerUnit/certification')
const ProductSet = () => import('@/components/admin/productset/productset')
const ShopManage = () => import('@/components/admin/shopmanage/shopmanage')
const BreedSlaughterMange = () => import('@/components/admin/breedSlaughterManage/breedSlaughterManage.vue')
const BSMlist = () => import('@/components/admin/breedSlaughterManage/bSM_list.vue')

//寻找有机
const FindOrganic = () => import('@/components/organic/index')

Vue.use(Router)

/* eslint-disable object-property-newline */
export default new Router({
    routes: [
        // 用户模块
        {path: '/', name: 'index', component: Index},
        {path: '/header', name: 'Header', component: Header},
        {path: '/login', name: 'login', component: Login},
        {path: '/register', name: 'register', component: Register},
        {path: '/findpass', name: 'findpass', component: FindPass},
        {path: '/genea', name: 'genea', component: Genea},
        {path: '/geneadetail/:id', name: 'geneadetail', component: GeneaDetail},
        // {path: '/course', name: 'course', component: Course},
        {path: '/course', name: 'course', component: Videodownload},
        {path: '/search', name: 'search', component: SearchRes},
        {path: '/mS', name: 'mobileSearch', component: mobileSearchRes},
        {path: '/mS=*', component: mobileSearchRes},
        // 集团
        {path: '/company', name: 'company', component: Company},
        // 产品
        {path: '/product', name: 'product', component: ReleaseIndex},
        // 有机
        {path: '/organic', name: 'organic', component: ReleaseIndex},
        // 效益
        {path: '/benefit', name: 'benefit', component: ReleaseIndex},
        // 加盟
        {path: '/league', name: 'league', component: ReleaseIndex},
        // 新闻
        {path: '/news', name: 'news', component: News},
        //资料下载
        // {path: '/docDonload', name: 'docDonload', component: Videodownload},
        // 联系我们
        {path: '/contact', name: 'contact', component:Contact},
        //寻找有机
        {path: '/findOrganic', name: 'findorganic', meta:{isKeepAlive: true}, component: FindOrganic},

        {path:'/law', name:'law', component: Law},

        // 管理员模块
        {path: '/admin/:id', component: Admin, meta: {requireAuth: true}, children: [
            {path: '', name: 'userinfo', component: UserInfo},
            // 在线聊天
            {path: 'chat', name: 'chat', component: Chat},
            {path: 'prochat', name: 'prochat', component: ProChat},
            // 留言
            {path: 'message', name: 'message', component: Message},
            {path: 'comment/account', name: 'comment', component: AcountComment},
            {path: 'comment/result', name: 'commentres', component: CommentResult},
            {path: 'comment/summary', name: 'commentsum', component: CommentSummary},
            {path: 'passmod', name: 'passmod', component: PasswordModify},
            // 审核
            {path: 'review', name: 'review', component: Review},
            // 动物福利
            {path: 'welfare/prac', name: 'welfareprac', component: Welfare},
            {path: 'welfare/list', name: 'welfarelist', component: WelfareList},
            {path: 'welfare/plan', name: 'welfareplan', component: WelfarePlan},
            {path: 'authrole', name: 'authrole', component: AuthRole},
            {path: 'authrole/input', name: 'authroleInput', component: AuthRoleInput},
            {path: 'genealogic/prac', name: 'genealogic', component: Genealogic},
            {path: 'genealogic/list', name: 'genealogiclist', component: GenealogicList},
            // 存栏档案
            {path: 'livestock/prac', name: 'livestock', component: LivestockPrac},
            {path: 'livestock/list', name: 'livestockList', component: LivestockList},
            {path: 'livestock/sale', name: 'livestockSale', component: LivestockSale},
            {path: 'livestock/dead', name: 'livestockDead', component: LivestockDead},
            {path: 'livestock/add', name: 'livestockAdd', component: LivestockAdd},
            {path: 'livestock/buy', name: 'livestockBuy', component: LivestockBuy},
            {path: 'livestock/qrcodePrint', name: 'livestockQrcode', component: LivestockQrcode},
            
            //商品羊销售管理
            {path: 'sheepSaleManage/sheepSale', name: 'sheepSale', component: SheepSale},
            {path: 'sheepSaleManage/sheepSaleOrder', name: 'sheepSaleOrder', component: SheepSaleOrder},
            {path: 'sheepSaleManage/sheepSaleVideo', name: 'sheepSaleVideo', component: SheepSaleVideo},
            //养殖客户信息管理
            {path: 'farmunit', name: 'farmUnit', component: FarmUnit},
            // 智能管理
            {path: 'intelManage/total', name: 'intelManage', component: intelManage},
            {path: 'intelManage/shin', name: 'nonpregnantOne', component: NonpregnantOne},
            {path: 'intelManage/bochan', name: 'nonpregnantTwo', component: nonpregnantTwo},
            {path: 'intelManage/stageOne', name: 'pregnantStageOne', component: pregnantStageOne},
            {path: 'intelManage/stageTwo', name: 'pregnantStageTwo', component: pregnantStageTwo},
            {path: 'intelManage/stageThree', name: 'pregnantStageThree', component: pregnantStageThree},
            {path: 'intelManage/pdeStageOne', name: 'produceStageOne', component: produceStageOne},
            {path: 'intelManage/pdeStageTwo', name: 'produceStageTwo', component: produceStageTwo},
            {path: 'intelManage/pdeStageThree', name: 'produceStageThree', component: produceStageThree},
            {path: 'intelManage/pdeStageFour', name: 'produceStageFour', component: produceStageFour},
            {path: 'intelManage/pdeStageFive', name: 'produceStageFive', component: produceStageFive},
            {path: 'intelManage/pdeStageSix', name: 'produceStageSix', component: produceStageSix},
            {path: 'intelManage/pdeStageSeven', name: 'produceStageSeven', component: produceStageSeven},
            {path: 'intelManage/gstage', name: 'growStage', component: growStage},
            {path: 'intelManage/bStageOne', name: 'breedStageOne', component: breedStageOne},
            {path: 'intelManage/bStageTwo', name: 'breedStageTwo', component: breedStageTwo},
            {path: 'intelManage/unfatStage', name: 'unfatStage', component: unfatStage},
            {path: 'intelManage/gfStage', name: 'growfatStage', component: growfatStage},
            {path: 'health/warn', name: 'warn', component: Warn},
            // 卫生疫控
            {path: 'health/disinfect/prac', name: 'disinfectprac', component: DisinfectPrac},
            {path: 'health/disinfect/list', name: 'disinfectlist', component: DisinfectList},
            {path: 'health/immune/plan', name: 'immuneplan', component: ImmunePlan},
            {path: 'health/immune/prac', name: 'immuneprac', component: ImmunePrac},
            {path: 'health/immune/list', name: 'immunelist', component: ImmuneList},
            {path: 'health/antiscolic/plan', name: 'antiscolicplan', component: AntiscolicPlan},
            {path: 'health/antiscolic/prac', name: 'antiscolicprac', component: AntiscolicPrac},
            {path: 'health/antiscolic/list', name: 'antiscoliclist', component: AntiscolicList},
            //{path: 'health/warn/list', name: 'warnlist', component: WarnList},

            // 营养生产
            {path: 'nutrition/breed/plan', name: 'breedplan', component: BreedPlan},
            {path: 'nutrition/breed/prac', name: 'breedprac', component: BreedPrac},
            {path: 'nutrition/sele/prac', name: 'seleprac', component: SelePrac},
            {path: 'nutrition/breed/list', name: 'breedlist', component: BreedList},
            {path: 'nutrition/sele/list', name: 'selelist', component: SeleList},
            {path: 'nutrition/sele/more', name: 'selemore', component: SeleMore},
            {path: 'nutrition/breed/more', name: 'breedmore', component: BreedMore},
            {path: 'nutrition/stage/plan', name: 'stageplan', component: StagePlan},
            {path: 'nutrition/stage/prac', name: 'stageprac', component: StagePrac},
            {path: 'nutrition/stage/list', name: 'stagelist', component: StageList},
            // auth, comment, account
            {path: 'account', name: 'account', component: Account},
            {path: 'appAccount', name: 'appAccount', component: AppAccount},
            // 疾病防治
            {path: 'prevention/plan', name: 'preventionplan', component: PreventionPlan},
            {path: 'prevention/prac', name: 'preventionprac', component: PreventionPrac},
            {path: 'prevention/list', name: 'preventionlist', component: PreventionList},
            {path: 'prevention/everystatis', name: 'everydaystatis', component: EverydayStatis},
            // 可视系统
            {path: 'visual/diagnose', name: 'diagnose', component: Diagnose},
            {path: 'visual/diagnose/list', name: 'diagnose_list', component: DiagnoseList},
            {path: 'visual/production', name: 'production', component: ProductionVisual},
            {path: 'visual/productionSee', name: 'productionSee', component: ProductionGlance},

            // 追溯图表
            {path: 'trace', name: 'trace', component: TraceCharts},
            // 有机监管
            {path: 'supervise/nation', name: 'nation', component: Nation},
            {path: 'supervise/capture', name: 'capture', component: Capture},
            {path: 'supervise/audit', name: 'audit', component: Audit},
            {path: 'supervise/recovery_index', name: 'recovery_index', component: RecoveryIndex},
            // 代理，羊场，发布系统
            {path: 'agent', name: 'agent', component: Agent},
            {path: 'agent/list', name: 'agentlist', component: AgentList},
            {path: 'farm', name: 'farm', component: Farm},
            {path: 'farm/list', name: 'farmlist', component: FarmList},
            {path: 'slaughter', name: 'slaughter', component: Slaughter},
            {path: 'slaughter/list', name: 'slaughterlist', component: SlaughterList},
            
            {path: 'consumer', name: 'consumer', component: Consumer},
            {path: 'consumer/list', name: 'consumerlist', component: ConsumerList},
            {path: 'release', name: 'release', component: Release},
            {path: 'release/list', name: 'releaselist', component: ReleaseList},

            // 品种录入
            {path: 'category', name: 'category', component: category},
            {path: 'category/list', name: 'categorylist', component: categoryList},
            // 专家课堂视频发布
            {path: 'professorCourseVideo', name: 'professorCourseVideo', component: ProfessorCourseVideo},
            {path: 'courseintro', name: 'courseintro', component: CourseIntro},
            //app用户手册视频发布
            {path: 'appVideoUpload', name: 'appVideoUpload', component: AppVideoUpload},
            // 客户关系一览表
            {path: 'table', name: 'table', component: TableFound},
            //屠宰加工管理平台
            {path: 'slaughterUnit', name: 'slaughterunit', component: SlaughterUnit},
            {path: 'SUnitVisual', name: 'slaughterUnitVisual', component: SlaughterUnitVisual},
            {path: 'smedia', name: 'slaughterMedia', component: SlaughterMedia},
            {path: 'SCertify', name: 'slaughterCertification', component: SlaughterCertification},
            //{path: 'slaughterProSet', name: 'slaughterProcessSet', component: SlaughterProcessSet},
            {path: 'allstock', name: 'slaughterAllStock', component: SlaughterAllStock},
            {path: 'priceSet', name: 'priceSet', component: PriceSet},

            {path: 'subscribe/correlation', name: 'correlation', component: Correlation},
            {path: 'subscribe/correlation/list', name: 'correlationList', component: CorrelationList},
            {path: 'subscribe/correlationPicture', name: 'correlationPicture', component: CorrelationPicture},
            //{path: 'beforeslaughter/beforeManage', name: 'beforeManage', component: BeforeManage},
            {path: 'beforeslaughter/beforeslaughter/list', name: 'beforeslaughterList', component: BeforeSlaughterList},
            {path: 'beforeslaughter/beforeslaughter', name: 'beforeslaughter', component: BeforeSlaughter},
            {path: 'beforeslaughter/beforeVideo', name: 'beforeVideo', component: BeforeVideo},
            {path: 'slaughterManage/kidMange', name: 'kidMange', component: kidMange},
            {path: 'slaughterManage/kidMange/list', name: 'kidMangeList', component: kidMangeList},
            {path: 'slaughterManage/appendage', name: 'appendageMange', component: appendageMange},
            {path: 'slaughterManage/appendage/list', name: 'appendageMangeList', component: appendageMangeList},
            {path: 'segment/segmentManger', name: 'segmentManger', component: SegmentManger},
            {path: 'segment/segmentManger/list', name: 'segmentMangerList', component: SegmentMangerList},
            {path: 'stock/stockManage', name: 'stockManage', component: StockManage},
            {path: 'stock/productOrder', name: 'productOrder', component: productOrder},
            {path: 'stock/stockManage/list', name: 'orderManage', component: OrderManage},
            {path: 'stock/vehicleManage', name: 'vehicleManage', component: VehicleManage},
            {path: 'slaughter/qrcodePrint', name: 'slaughterQrcode', component: LivestockQrcode},

            //消费实体管理平台
            {path: 'consumerUnit', name: 'consumerunit', component: ConsumerUnit},
            {path: 'CUnitVisual', name: 'consumerUnitVisual', component: ConsumerUnitVisual},
            {path: 'cmedia', name: 'consumerUnitMedia', component: ConsumerUnitMedia}, 
            {path: 'CCertify', name: 'consumerCertification', component: ConsumerCertification},  
            {path: 'ShopManage', name: 'ShopManage', component: ShopManage},
            {path: 'outWareManage', name: 'outWareManage', component: OutWareManage},
            {path: 'productSet', name: 'productSet', component: ProductSet}, 
            {path: 'shop/qrcodePrint', name: 'shopQrcode', component: LivestockQrcode},    
            {path: 'breedSlaughterMange', name: 'breedSlaughterMange', component: BreedSlaughterMange},       
            {path: 'breedSlaughterMange/list',name: 'breedSlaughterMangeList',component: BSMlist},
        ]},
        {path: '*', name: 'notfound', component: NotFound}
        
    ]
})
