//权限表
//目前整个权限表只是管理了角色权限管理的添加角色选项
//里面的单选框权限数据都是后台返回的，目前没办法做到隐藏按钮
export const relationShip = {
    //权限表
    permit: {
        path: null,
        name: []
    },
    //配种产子
    breeding:{
        path: 'productionTree',
        name: [
            'breedplan', //配种产子管理方案
            'breedprac' //配种产子实施档案
        ]
    },
    //疾病防治
    //对应整个疾病防治
    disease: {
        path: 'productionTree',
        name: [
            'prevention'
        ],
    },
    //卫生消毒档案
    health: {
        path: 'productionTree',
        name: [
            'disinfectprac'
        ]
    },
    //免疫实施档案
    immune: {
        path: 'productionTree',
        name: [
            'immuneplan',
            'immuneprac'
        ]
    },
    //阶段营养
    nutrition: {
        path: 'productionTree',
        name: [
            'stageplan',
            'stageprac'
        ]
    },
    //卫生动物福利档案
    welfare: {
        path: 'productionTree',
        name: [
            'welfareplan',
            'welfareprac'
        ]
    },
    //驱虫实施档案
    antiscolic: {
        path: 'productionTree',
        name: [
            'antiscolicplan',
            'antiscolicprac'
        ]
    },
    //系谱档案
    genealogic: {
        path: 'productionTree',
        name: [
            'genealogic'
        ]
    },
    //角色管理
    roleManage: {
        path: 'adminTree',
        name: [
            'authrole'
        ]
    },
    //用户管理
    userManage: {
        path: 'adminTree',
        name: [
            'account'
        ]
    },
    //专家管理
    professorManage: {
        path: 'productionTree',
        name: [
            'chat'
        ]
    },
    //生产节点智能管理
    intelManage: {
        path: 'productionTree',
        name: [
            'intelManage'
        ]
    },
    //有机环境追溯
    organicTrace: {
        path: 'productionTree',
        name: [
            'trace'
        ]
    },
    //代理管理
    agentManage: {
        path: 'adminTree',
        name: [
            'agent'
        ]
    },
    //羊场管理
    farmManage: {
        path: 'adminTree',
        name: [
            'farm'
        ]
    },
    //栏栋管理
    buildingManage: {
        path: 'productionTree',
        name: [
            'livestock',
            'livestockAdd'
        ]
    },
    //羊只管理
    sheepManager: {
        path: 'productionTree',
        name: [
            'livestockList',
            'livestockSale',
            'livestockBuy',
            'livestockDead'
        ]
    },
    //品种管理
    categoryManage: {
        path: 'adminTree',
        name: [
            'category'
        ]
    },
    //短信平台
    messageManager: {
        path: 'adminTree',
        name: [
            'message'
        ]
    },
    //留言平台
    commentManager: {
        path: 'adminTree',
        name: [
            'commentsum'
        ]
    },
    //信息发布平台
    releaseManager: {
        path: 'adminTree',
        name: [
            'release'
        ]
    },
    //消费实体管理
    customerManager: {
        path: 'adminTree',
        name: [
            'slaughter',
            'consumer'
        ]
    },
    professorJudge: {
        path: null,
        name: []
    },
    //客户关系一览表
    client: {
        path: 'adminTree',
        name: [
            'table'
        ]
    },
    //生产可视
    factoryManager: {
        path: 'productionTree',
        name: [
            'capture',
            'productionSee'
        ]
    },
    //在线直播
    onlineChat: {
        path: 'professorTree',
        name:[
            'courseintro'
        ]
    },
    //在线课堂
    onlineCourse: {
        path: 'professorTree',
        name: [
            'professorCourseVideo'
        ]
    },
    //专家咨询
    professorConsult: {
        path: 'productionTree',
        name: [
            'chat'
        ]
    },
    //育种选育实施档案
    selectionManage: {
        path: 'productionTree',
        name: [
            'seleprac'
        ]
    },
    //商品羊销售管理
    sheepSaleManage: {
        path: 'productionTree',
        name: [
            'sheepSaleManage'
        ]
    },
    //认购管理
    subscription: {
        path: 'slaughterTree',
        name: [
            'subscription'
        ]
    },
    //屠宰管理
    slaughter: {
        path: 'slaughterTree',
        name: [
            'slaughter'
        ]
    },
    //分割管理
    segment: {
        path: 'slaughterTree',
        name: [
            'segment'
        ]
    },
    //库存管理
    stockManage: {
        path: 'slaughterTree',
        name: [
            'stockManage'
        ]
    },
    //车辆管理
    vehicleManage: {
        path: 'slaughterTree',
        name: [
            'vehicleManage'
        ]
    },
    //出库管理
    outWareManage: {
        path:'consumptionTree',
        name: [
            'outWareManage'
        ]
    },
    //屠宰场可视系统管理
    slaughterVisual: {
        path: 'slaughterTree',
        name: [
            'slaughterMedia',
            'slaughterUnitVisual'
        ]
    },
    //消费端可视系统管理
    consumerVisual: {
        path: 'consumptionTree',
        name: [
            'consumerUnitVisual',
            'consumerUnitMedia'
        ]
    },
    //用户手册管理
    appVideoUpload: {
        path: 'adminTree',
        name: [
            'appVideoUpload'
        ]
    }
}


//权限表对应关系
export const tableMap = {
    '权限表' : 'permit',
    '配种产子档案' : 'breeding',
    '疾病防治档案' : 'disease',
    '卫生消毒档案' : 'health',
    '免疫实施档案' : 'immune',
    '阶段营养档案' : 'nutrition',
    '卫生动物福利档案' : 'welfare',
    '驱虫实施档案' : 'antiscolic',
    '系谱档案' : 'genealogic',
    '角色管理' : 'roleManage',
    '用户管理' : 'userManage',
    '专家管理' : 'professorManage',
    '生产节点智能管理' : 'intelManage',
    '有机环境追溯' : 'organicTrace',
    '代理管理' : 'agentManage',
    '羊场管理' : 'farmManage',
    '栏栋管理' : 'buildingManage',
    '羊只管理' : 'sheepManager',
    '品种管理' : 'categoryManage',
    '短信平台' : 'messageManager',
    '留言平台' : 'commentManager',
    '信息发布平台' : 'releaseManager',
    '消费实体管理' : 'customerManager',
    '专家评价' : 'professorJudge',
    '客户关系一览表' : 'client',
    '生产可视' : 'factoryManager',
    '在线直播' : 'onlineChat',
    '在线课堂' : 'onlineCourse',
    '专家咨询' : 'professorConsult',
    '育种选育实施档案' : 'selectionManage',
    '商品羊销售管理' : 'sheepSaleManage',
    '认购管理' : 'subscription',
    '屠宰管理' : 'slaughter',
    '分割管理' : 'segment',
    '库存管理' : 'stockManage',
    '车辆管理' : 'vehicleManage',
    '出库管理' : 'outWareManage',
    '屠宰场可视系统管理' : 'slaughterVisual',
    '消费端可视系统管理' : 'consumerVisual',
    '用户手册管理' : 'appVideoUpload'
}