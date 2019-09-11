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
const Slaughter = () => import('@/components/admin/slaughter/index')
const SlaughterList = () => import('@/components/admin/slaughter/list')
const Correlation = () => import('@/components/admin/subscribe/correlation')
const CorrelationPicture = () => import('@/components/admin/subscribe/correlation_picture')
const BeforeManage = () => import('@/components/admin/beforeslaughter/before_manage')
const BeforeVideo = () => import('@/components/admin/beforeslaughter/before_video')
const SlaughterManage= () => import('@/components/admin/slaughterManger/slaughterManage')
const SlaughterManageList= () => import('@/components/admin/slaughterManger/slaughterManage_list')
const SegmentManger= () => import('@/components/admin/segment/segmentManger')
const SegmentMangerList= () => import('@/components/admin/segment/segmentManger_list')
const StockManage = () => import('@/components/admin/stock/stock_manage')
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
//屠宰加工管理平台
const SlaughterUnit = () => import('@/components/admin/slaughterUnit/index')
const SlaughterUnitVisual = () => import('@/components/admin/slaughterUnit/productionVisual')
const SlaughterMedia = () => import('@/components/admin/slaughterUnit/media')
const SlaughterCertification = () => import('@/components/admin/slaughterUnit/certification')



//消费实体管理平台
const ConsumerUnit = () => import('@/components/admin/consumerUnit/index')
const ConsumerUnitVisual = () => import('@/components/admin/consumerunit/productionVisual')
const ConsumerUnitMedia = () => import('@/components/admin/consumerunit/media')
const ConsumerCertification = () => import('@/components/admin/consumerunit/certification')

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
        {path: '/mS=G110001', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110002', name: 'mobileSearch', component: mobileSearchRes},
        
        {path: '/mS=G110003', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110004', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110005', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110006', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110007', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110008', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110009', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110010', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110011', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110012', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110013', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110014', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110015', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110016', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110017', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110018', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110019', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110020', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110021', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110022', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110023', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110024', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110025', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110026', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110027', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110028', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110029', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110030', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110031', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110032', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110033', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110034', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110035', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110036', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110037', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110038', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110039', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110040', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110041', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110042', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110043', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110044', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110045', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110046', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110047', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110048', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110049', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110050', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110051', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110052', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110053', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110054', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110055', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110056', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110057', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110058', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110059', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110060', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110061', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110062', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110063', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110064', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110065', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110066', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110067', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110068', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110069', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110070', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110071', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110072', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110073', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110074', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110075', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110076', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110077', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110078', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110079', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110080', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110081', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110082', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110083', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110084', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110085', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110086', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110087', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110088', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110089', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110090', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110091', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110092', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110093', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110094', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110095', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110096', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110097', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110098', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110099', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=G110100', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111001', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111002', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111003', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111004', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111005', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111006', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111007', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111008', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111009', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111010', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111011', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111012', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111013', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111014', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111015', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111016', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111017', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111018', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111019', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111020', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111021', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111022', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111023', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111024', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111025', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111026', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111027', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111028', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111029', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111030', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111031', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111032', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111033', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111034', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111035', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111036', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111037', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111038', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111039', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111040', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111041', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111042', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111043', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111044', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111045', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111046', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111047', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111048', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111049', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111050', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111051', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111052', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111053', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111054', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111055', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111056', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111057', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111058', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111059', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111060', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111061', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111062', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111063', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111064', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111065', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111066', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111067', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111068', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111069', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111070', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111071', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111072', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111073', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111074', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111075', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111076', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111077', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111078', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111079', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111080', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111081', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111082', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111083', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111084', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111085', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111086', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111087', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111088', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111089', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111090', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111091', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111092', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111093', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111094', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111095', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111096', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111097', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111098', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111099', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111100', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111101', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111102', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111103', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111104', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111105', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111106', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111107', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111108', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111109', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111110', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111111', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111112', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111113', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111114', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111115', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111116', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111117', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111118', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111119', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111120', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111121', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111122', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111123', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111124', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111125', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111126', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111127', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111128', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111129', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111130', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111131', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111132', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111133', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111134', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111135', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111136', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111137', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111138', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111139', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111140', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111141', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111142', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111143', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111144', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111145', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111146', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111147', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111148', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111149', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111150', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111151', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111152', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111153', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111154', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111155', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111156', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111157', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111158', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111159', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111160', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111161', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111162', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111163', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111164', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111165', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111166', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111167', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111168', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111169', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111170', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111171', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111172', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111173', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111174', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111175', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111176', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111177', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111178', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111179', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111180', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111181', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111182', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111183', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111184', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111185', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111186', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111187', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111188', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111189', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111190', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111191', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111192', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111193', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111194', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111195', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111196', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111197', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111198', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111199', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111200', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111201', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111202', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111203', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111204', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111205', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111206', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111207', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111208', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111209', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111210', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111211', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111212', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111213', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111214', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111215', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111216', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111217', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111218', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111219', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111220', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111221', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111222', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111223', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111224', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111225', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111226', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111227', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111228', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111229', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111230', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111231', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111232', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111233', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111234', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111235', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111236', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111237', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111238', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111239', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111240', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111241', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111242', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111243', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111244', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111245', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111246', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111247', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111248', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111249', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111250', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111251', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111252', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111253', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111254', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111255', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111256', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111257', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111258', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111259', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111260', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111261', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111262', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111263', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111264', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111265', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111266', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111267', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111268', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111269', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111270', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111271', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111272', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111273', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111274', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111275', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111276', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111277', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111278', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111279', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111280', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111281', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111282', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111283', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111284', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111285', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111286', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111287', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111288', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111289', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111290', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111291', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111292', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111293', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111294', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111295', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111296', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111297', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111298', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111299', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111300', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111301', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111302', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111303', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111304', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111305', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111306', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111307', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111308', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111309', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111310', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111311', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111312', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111313', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111314', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111315', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111316', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111317', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111318', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111319', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111320', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111321', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111322', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111323', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111324', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111325', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111326', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111327', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111328', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111329', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111330', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111331', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111332', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111333', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111334', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111335', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111336', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111337', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111338', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111339', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111340', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111341', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111342', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111343', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111344', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111345', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111346', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111347', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111348', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111349', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111350', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111351', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111352', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111353', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111354', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111355', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111356', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111357', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111358', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111359', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111360', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111361', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111362', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111363', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111364', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111365', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111366', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111367', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111368', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111369', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111370', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111371', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111372', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111373', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111374', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111375', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111376', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111377', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111378', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111379', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111380', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111381', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111382', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111383', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111384', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111385', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111386', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111387', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111388', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111389', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111390', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111391', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111392', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111393', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111394', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111395', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111396', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111397', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111398', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111399', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111400', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111401', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111402', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111403', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111404', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111405', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111406', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111407', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111408', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111409', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111410', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111411', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111412', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111413', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111414', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111415', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111416', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111417', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111418', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111419', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111420', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111421', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111422', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111423', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111424', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111425', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111426', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111427', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111428', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111429', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111430', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111431', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111432', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111433', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111434', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111435', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111436', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111437', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111438', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111439', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111440', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111441', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111442', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111443', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111444', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111445', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111446', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111447', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111448', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111449', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111450', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111451', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111452', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111453', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111454', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111455', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111456', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111457', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111458', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111459', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111460', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111461', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111462', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111463', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111464', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111465', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111466', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111467', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111468', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111469', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111470', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111471', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111472', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111473', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111474', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111475', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111476', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111477', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111478', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111479', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111480', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111481', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111482', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111483', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111484', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111485', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111486', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111487', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111488', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111489', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111490', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111491', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111492', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111493', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111494', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111495', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111496', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111497', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111498', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111499', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111500', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111501', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111502', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111503', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111504', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111505', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111506', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111507', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111508', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111509', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111510', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111511', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111512', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111513', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111514', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111515', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111516', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111517', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111518', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111519', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111520', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111521', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111522', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111523', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111524', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111525', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111526', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111527', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111528', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111529', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111530', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111531', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111532', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111533', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111534', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111535', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111536', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111537', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111538', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111539', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111540', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111541', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111542', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111543', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111544', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111545', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111546', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111547', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111548', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111549', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111550', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111551', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111552', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111553', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111554', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111555', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111556', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111557', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111558', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111559', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111560', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111561', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111562', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111563', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111564', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111565', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111566', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111567', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111568', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111569', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111570', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111571', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111572', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111573', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111574', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111575', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111576', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111577', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111578', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111579', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111580', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111581', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111582', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111583', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111584', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111585', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111586', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111587', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111588', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111589', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111590', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111591', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111592', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111593', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111594', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111595', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111596', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111597', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111598', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111599', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111600', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111601', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111602', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111603', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111604', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111605', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111606', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111607', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111608', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111609', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111610', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111611', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111612', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111613', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111614', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111615', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111616', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111617', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111618', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111619', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111620', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111621', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111622', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111623', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111624', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111625', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111626', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111627', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111628', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111629', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111630', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111631', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111632', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111633', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111634', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111635', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111636', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111637', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111638', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111639', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111640', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111641', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111642', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111643', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111644', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111645', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111646', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111647', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111648', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111649', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111650', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111651', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111652', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111653', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111654', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111655', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111656', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111657', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111658', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111659', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111660', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111661', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111662', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111663', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111664', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111665', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111666', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111667', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111668', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111669', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111670', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111671', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111672', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111673', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111674', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111675', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111676', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111677', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111678', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111679', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111680', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111681', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111682', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111683', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111684', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111685', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111686', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111687', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111688', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111689', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111690', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111691', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111692', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111693', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111694', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111695', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111696', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111697', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111698', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111699', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=M111700', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115001', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115002', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115003', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115004', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115005', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115006', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115007', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115008', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115009', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115010', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115011', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115012', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115013', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115014', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115015', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115016', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115017', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115018', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115019', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115020', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115021', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115022', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115023', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115024', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115025', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115026', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115027', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115028', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115029', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115030', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115031', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115032', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115033', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115034', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115035', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115036', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115037', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115038', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115039', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115040', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115041', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115042', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115043', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115044', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115045', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115046', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115047', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115048', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115049', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115050', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115051', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115052', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115053', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115054', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115055', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115056', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115057', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115058', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115059', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115060', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115061', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115062', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115063', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115064', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115065', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115066', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115067', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115068', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115069', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115070', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115071', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115072', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115073', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115074', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115075', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115076', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115077', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115078', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115079', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115080', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115081', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115082', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115083', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115084', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115085', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115086', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115087', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115088', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115089', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115090', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115091', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115092', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115093', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115094', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115095', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115096', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115097', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115098', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115099', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115100', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115101', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115102', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115103', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115104', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115105', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115106', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115107', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115108', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115109', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115110', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115111', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115112', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115113', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115114', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115115', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115116', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115117', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115118', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115119', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115120', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115121', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115122', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115123', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115124', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115125', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115126', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115127', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115128', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115129', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115130', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115131', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115132', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115133', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115134', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115135', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115136', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115137', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115138', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115139', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115140', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115141', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115142', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115143', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115144', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115145', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115146', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115147', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115148', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115149', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115150', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115151', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115152', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115153', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115154', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115155', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115156', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115157', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115158', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115159', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115160', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115161', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115162', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115163', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115164', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115165', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115166', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115167', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115168', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115169', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115170', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115171', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115172', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115173', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115174', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115175', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115176', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115177', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115178', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115179', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115180', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115181', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115182', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115183', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115184', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115185', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115186', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115187', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115188', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115189', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115190', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115191', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115192', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115193', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115194', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115195', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115196', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115197', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115198', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115199', name: 'mobileSearch', component: mobileSearchRes},

        {path: '/mS=S115200', name: 'mobileSearch', component: mobileSearchRes},

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
        {path: '/findOrganic', name: 'organic', component: FindOrganic},

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
            {path: 'nutrition/breed/plan', name: 'breedplan', component: BreedPlan},
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
            // 客户关系一览表
            {path: 'table', name: 'table', component: TableFound},
            //屠宰加工管理平台
            {path: 'slaughterUnit', name: 'slaughterunit', component: SlaughterUnit},
            {path: 'SUnitVisual', name: 'slaughterUnitVisual', component: SlaughterUnitVisual},
            {path: 'subscribe/correlation', name: 'correlation', component: Correlation},
            {path: 'SCertify', name: 'slaughterCertification', component: SlaughterCertification},
            {path: 'smedia', name: 'slaughterMedia', component: SlaughterMedia},
            {path: 'subscribe/correlationPicture', name: 'correlationPicture', component: CorrelationPicture},
            {path: 'beforeslaughter/beforeManage', name: 'beforeManage', component: BeforeManage},
            {path: 'beforeslaughter/beforeVideo', name: 'beforeVideo', component: BeforeVideo},
            {path: 'slaughterManage/slaughterManage', name: 'slaughterManage', component: SlaughterManage},
            {path: 'slaughterManage/slaughterManagelist', name: 'slaughterManagelist', component: SlaughterManageList},
            {path: 'segment/segmentManger', name: 'segmentManger', component: SegmentManger},
            {path: 'segment/segmentMangerlist', name: 'segmentMangerlist', component: SegmentMangerList},
            {path: 'stock/stockManage', name: 'stockManage', component: StockManage},
            {path: 'stock/orderManage', name: 'orderManage', component: OrderManage},
            {path: 'stock/vehicleManage', name: 'vehicleManage', component: VehicleManage},

            //消费实体管理平台
            {path: 'consumerUnit', name: 'consumerunit', component: ConsumerUnit},
            {path: 'CUnitVisual', name: 'consumerUnitVisual', component: ConsumerUnitVisual},
            {path: 'cmedia', name: 'consumerUnitMedia', component: ConsumerUnitMedia}, 
            {path: 'CCertify', name: 'consumerCertification', component: ConsumerCertification},  
            {path: 'outWareManage', name: 'outWareManage', component: OutWareManage},
            
        ]},
        {path: '*', name: 'notfound', component: NotFound}
        
    ]
})
