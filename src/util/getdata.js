import fetch from './fetch'

/**
 * 登录注册，找回密码
 */
export const Login = data => fetch('/login', data, 'POST')

export const Register = data => fetch('/register', data, 'POST')

export const FindPass = data => fetch('/ensurequestion', data, 'POST')

export const GetQuestions = name => fetch('/question?name=' + name)

export const LogOut = id => fetch('/logout/' + id)

/**
 * 添加，展示留言
 */
export const CommentInsert = data => fetch('/messageBoard/insert', data, 'POST')

export const Comment = data => fetch('/messageBoard/search', data, 'POST')

export const deleteComment = data => fetch('/messageBoard/delete', data, 'DELETE')

export const getMessage = (size, page) => fetch(`/messages/?size=${size}&page=${page}`)

/**
 * 系谱档案CURD
 */
export const postGeneaRec = data => fetch('/gf', data, 'POST')

export const updateGeneaRec = (id, data) => fetch(`/gf/${id}`, data, 'PUT')

export const getGeneaRec = id => fetch(`/gf/find/${id}`)

export const deleteGeneaRec = id => fetch('/gf/' + id, null, 'DELETE')

export const getSheepStyle = () => fetch('/var/getAll')

// 获取羊的种类
export const getSheepTypes = id => fetch('/gf/types')

// 系谱档案多条件查询
export const queryGenea = data => fetch('/gf/findshow', data, 'POST')

export const getGeneas = (id, data) => fetch(`/gf/${id}`, data)

/**
 * 存栏档案CURD
 */

 // 获取羊的耳牌
// export const getEarTag = id => fetch('/gf/types')

/**
 * 权限CURD
 */
export const getPermission = _ => fetch('/user')

/**
 * 获取直播或者推流地址
 */

export const getChannelList = () => fetch('/liveBroadcast/getLiveStat')

export const getPushUrl = id => fetch(`/liveBroadcast/getPushUrl/${id}`)

// export const getVideoUrl = (id, type) => fetch(`/liveBroadcast/getPushUrl?userid=${id}&usertype=${type}`)

/**
 * 聊天模块
 */

// 专家匹配, 邀请专家
export const getExpert = agentid => fetch('/getExpert/' + agentid)

// 专家获取聊天好友
export const getClients = proid => fetch('/getClientList/' + proid)

// 获取所有聊天记录 用户传id 专家传talkid
export const getTalkRecord = id => fetch('/getTalkRecord/' + id)

// 保存常用语
export const postExpressions = data => fetch('/expression', data, 'POST')
// 获取常用语
export const getExpressions = expertid => fetch('/getExpression?expert_id=' + expertid)

// 获取好友
// export const getFellows = id => fetch('//' + id)

// 退出聊天评价专家
export const evalulateExpert = data => fetch('/evaluation', data, 'POST')

// 客户评价
export const evaluateChat = data => fetch('/evaluation', data, 'POST')

/**
 * 配种产子
 */
export const postBreeding = data => fetch('/breeding', data, 'POST')

export const updateBreeding = (id, data) => fetch(`/breeding/${id}`, data, 'POST')

export const getAllBreeding = (id, data) => fetch(`/breeding/${id}`, data)

export const getBreeding = (id, data) => fetch(`/breeding/find/${id}`, data)

export const findNutrition = data => fetch(`/breeding/findN`, data, 'POST')

export const deleteBreeding = id => fetch(`/breeding/${id}`, null, 'DELETE')
/**
 * 育种选育
 */
export const postSele = data => fetch('/selection', data, 'POST')

export const updateSele = (id, data) => fetch(`/selection/${id}`, data, 'POST')

export const getAllSele = (id, data) => fetch(`/selection/factory/${id}`, data)

export const getSele= (id, data) => fetch(`/selection/find/${id}`, data)

export const deleteSele = id => fetch(`/selection/${id}`, null, 'DELETE')

/**
 * 消毒RD
 */
export const getAllDisinfects = (id, data) => fetch(`/df/${id}`, data)

export const getDisinfect = (id, data) => fetch(`/df/find/${id}`, data)

export const deleteDisinfect = id => fetch(`/df/${id}`, null, 'DELETE')

/**
 * 免疫RD
 */
export const getAllImmune = (id, data) => fetch(`/ip/${id}`, data)

export const getImmune = (id, data) => fetch(`/ip/find/${id}`, data)

export const deleteImmune = id => fetch(`/ip/${id}`, null, 'DELETE')

/**
 * 驱虫RD
 */
export const getAllAntiscolic = (id, data) => fetch(`/rp/${id}`, data)

export const getAntiscolic = (id, data) => fetch(`/rp/find/${id}`, data)

export const deleteAntiscolic = id => fetch(`/rp/${id}`, null, 'DELETE')

/**
 * 发布系统CURD
 */
export const postRelease = data => fetch('/notice', data, 'POST')

export const updateRelease = (id, data) => fetch(`/notice/${id}`, data, 'PATCH')

export const getReleaseById = id => fetch(`/notice/find/${id}`)

export const getReleaseByName = name => fetch(`/notice/type/${name}`)

export const getAllRelease = (id, data) => fetch(`/notice`, data)

export const deleteRelease = id => fetch(`/notice/${id}`, null, 'DELETE')

/**
 * 专家审核
 */
export const getAllReviews = data => fetch('/diagnosis', data)

export const doReview = (id, data) => fetch(`/review/${id}`, data, 'PATCH')

/**
 * 阶段营养
 */
export const postStage = data => fetch('/nutrition', data, 'POST')

export const updateStage = (id, data) => fetch(`/nutrition/${id}`, data, 'PUT')

export const getStage = (id, data) => fetch(`/nutrition/find/${id}`, data)

export const getAllStages = (id, data) => fetch(`/nutrition/${id}`, data)

export const deleteStage = id => fetch(`/nutrition/${id}`, null, 'DELETE')

/**
 * 疾病防治
 */
export const postPrevention = data => fetch('/diagnosis', data, 'POST')

export const updatePrevention = (id, data) => fetch('/diagnosis/' + id, data, 'PATCH')

export const getAllPrevention = (id, data) => fetch('/diagnosis/' + id, data)

export const getPrevention = id => fetch('/diagnosis/find/' + id)

export const deletePrevention = id => fetch(`/diagnosis/${id}`, null, 'DELETE')

export const getIllness= data => fetch(`/disease/prediction`, data)

export const geteveryDay= (id, data) => fetch(`/disease/getDailyStatistics/${id}`, data)


/**
 * 用户管理
 */
export const postUser = data => fetch('/user', data, 'POST')

export const getUserById = id => fetch('/user/detail/' + id)

export const getAdminUser = id => fetch('/user/find/' + id)

export const getUserByName = id => fetch('/user/id/' + id)

export const getUsers = (facid, data) => fetch('/user/' + facid, data)

export const updateUser = (id, data) => fetch('/user/' + id, data, 'PUT')

export const deleteUser = id => fetch('/user/' + id, null, 'DELETE')

export const getFactories = agentid => fetch('/factory/' + agentid)

export const getAgentUnit = () => fetch('/agent/fr')

export const getFactoryUnit = () => fetch('/factory/fr')

export const getNameByType = (type) =>fetch('/customer/getAllByType', type , "POST")

export const searchUserInfo = (data, page) => fetch(`/user/query?page=${page}`, data, 'POST')

/**
 * 品种管理
 */
export const postCategory = data => fetch('/var/add', data, 'POST')

export const getCategorys = () => fetch('/var/getAll', 'GET')

export const updateCategory = (id, data) => fetch(`/var/update/${id}`, data, 'POST')

export const getCategory = data => fetch(`/var/getOne/${id}`, data, 'POST')

export const deleteCategory = id =>fetch(`/var/delete/${id}`)



// 修改密码
export const updatePassword = (id, data) => fetch('/user/password/' + id, data, 'PATCH')

/**
 * 代理管理
 */
export const postAgent = data => fetch('/agent', data, 'POST')

export const updateAgent = (id, data) => fetch(`/agent/${id}`, data, 'PUT')

export const getAgents = (agentid, data) => fetch(`/agent/${agentid}`, data)

export const getAgent = id => fetch('/agent/find/' + id)

export const deleteAgent = id => fetch(`/agent/${id}`, null, 'DELETE')

/**
 * 羊场管理
 */
export const postFarm = data => fetch('/factory', data, 'POST')

export const updateFarm = (id, data) => fetch(`/factory/${id}`, data, 'PUT')

export const getFarms = (facid, data) => fetch(`/factory/${facid}`, data)

export const getFarmById = id => fetch(`/factory/find/${id}`)

export const getFarmByLocation = loc => fetch(`/factory/location`, {location: loc})

export const deleteFarm = id => fetch(`/factory/${id}`, null, 'DELETE')

export const postYoungSheep = data => fetch('/over/all/statistics/add/sheep', data, 'POST')

 //屠宰加工客户管理
//  export const getCustomerOfSla = (id) => fetch('/customer/getOne/' + id,'GET')
export const postPrice = data => fetch(`/slaughter/part/price`, data, 'POST')

export const getPrice = id => fetch(`/slaughter/part/price/${id}`, {}, 'GET')

export const deletePrice = id => fetch(`/slaughter/part/price/${id}`, {}, 'DELETE')

export const updatePrice = data => fetch(`/slaughter/part/price/modify`, data, 'POST')

export const insertSlaughter = data => fetch(`/customer/insert`, data, 'POST')

export const getSlaughter = (facid, data) => fetch(`/customer/${facid}`, data)

export const getSlaughterById = id => fetch(`/customer/getOne/${id}`)

export const deleteSlaughter = id => fetch(`/customer/delete/${id}`, null, 'DELETE')

export const updateSlaughter = ( data) => fetch(`/customer/update`, data, 'POST')

export const postSlaughter = ( data) => fetch(`/slaughter/`, data, 'POST')

export const getSegmentSheep = (id, data) => fetch('/slaughter/d/' + id, data,'GET')

export const getStockManageNum = id => fetch('/d/order/number/' + id)

export const getSlaughterAppendageList= (id,data) => fetch('/slaughter/d/appendage/' + id,data,'GET')

export const getSlaughterBodyList= (id,data) => fetch('/slaughter/d/body/' + id,data,'GET')

export const getSegmentList= (id,data) => fetch('/division/' + id , data , 'GET')

export const searchSlaInfo = (data, page) => fetch(`/customer/queryAll?page=${page}&type=0`, data, 'POST')

export const deleteAppendage = (data) => fetch('/slaughter/delete/appendage', data, 'DELETE')

export const deleteBody = (data) => fetch('/slaughter/delete/body', data, 'DELETE')

export const deleteBeforeSlaughter = (data) => fetch('/slaughter/before/slaughter', data, 'DELETE')

export const deleteSubscribe = (data) => fetch('/slaughter/subscribe/delete', data, 'DELETE')

//自动认购
export const getAutoSubscribe= (id) => fetch('/slaughter/auto/subscribe?factory='+id , null , 'POST')

// 自动分割

export const postAutoDivision= (id) => fetch(`/division/auto/division?factory=${id}` , null , 'POST')

//消费实体 因为屠宰加工和消费实体在一张表中，所以提交,查询接口不变
export const insertConsumer = data => fetch(`/customer/insert`, data, 'POST')

export const getConsumer = (facid, data) => fetch(`/customer/${facid}`, data)

export const deleteConsumer = id => fetch(`/customer/delete/${id}`, null, 'DELETE')

export const getConsumerById = id => fetch(`/customer/getOne/${id}`)

export const updateConsumer = ( data) => fetch(`/customer/update`, data, 'POST')

export const getoutWareManageNum = id => fetch('/d/out/number/' + id)

export const getoutWareManageDetailed = (data) => fetch('/d/out', data,'POST')

export const PostProductNumber = (data) => fetch('/d/out/division', data,'POST')

export const nextPrint = (data) => fetch('/d/out/print/', data)

export const findMakeUpVideo = (id) => fetch('/d/out/find/'+id)

export const searchCuInfo = (data, page) => fetch(`/customer/queryAll?page=${page}&type=1`, data, 'POST')

//消费店 可视系统
export const findCustomerMedia = (data) => fetch(`/comsumerEntitySystem/searchAll/`,data)

export const findConsumerMedia = (data) => fetch(`/comsumerEntitySystem/searchAll/`,data)

export const deleteConsumerMedia = id => fetch('/comsumerEntitySystem/delete/' +id, null ,'DELETE')

export const getRestaurantId = userId => fetch('/dishes/restaurantId/'+userId)

export const getSetPrdocut = (id,page,size) => fetch(`/dishes/${id}?page=${page}&size=${size}`)

export const setProduct = (data) => fetch('/dishes/addDishes',data,'POST')

export const deleteProduct = (data) => fetch('/dishes/delete',data,'POST')

export const deleteWareManageDetailed = (id) => fetch('/d/out/' +id, null ,'DELETE')

export const getProductSet = (id) => fetch('/dishes/getDishesType/'+id)

export const submitPrint = (data) => fetch('/d/out/settlement',data,'POST')

/**
 * 动物福利
 */


export const postWelfare = data => fetch('/of', data, 'POST')

export const updateWelfare = (id, data) => fetch(`/of/${id}`, data, 'PUT')

export const getAllWelfare = (id, data) => fetch(`/of/${id}`, data)

export const getWelfare = id => fetch(`/of/find/${id}`)

export const deleteWelfare = id => fetch(`/of/${id}`, null, 'DELETE')


/**
 * 角色权限管理
 */

export const postRole = data => fetch('/role', data, 'POST')

export const getRoles = (rank, data) => fetch('/role/' + rank, data)

export const getRoleDetail = roleid => fetch('/role/find/' + roleid)

export const deleteRole = roleid => fetch('/role/' + roleid, null, 'DELETE')

export const updateRole = (roleid, data) => fetch('/role/' + roleid, data, 'PUT')

export const getFactoryUsers = (facid, data) => fetch('/user/' + facid, data)

export const updateUserRole = (uid, roleid) => fetch('/user/role/' + uid, {role: roleid}, 'PATCH')

export const updateUserMessage = (uid, data) => fetch('/user/role/'+ uid, data, 'PATCH')

export const getPermit = () => fetch('/permit/find', 'GET')

export const mergeRole = (first, second, data) => fetch('/role/merge/'+ first + '/' + second, data, 'POST')

export const getRoleName = () => fetch('/role/name/get', 'GET')

//疾病预警
export const getDanger= (id, data) => fetch(`/disease/getDangerDiseases/${id}`, data)

/**
 * 短信平台
 */
export const postMessage = data => fetch('/msg/send_group', data, 'POST')

export const postWarningInfo = data => fetch('/msg/setconfig', data, 'POST')

/**
 * 专家课堂视频发布
 */
export const getVideo = data => fetch('/video/find', data, 'POST')

export const deleteVideo = id => fetch('/video/' + id, null, 'DELETE')

export const getUserBook = (data) => fetch('/document/all', data, 'GET')

export const deleteUserBook = (id) => fetch('/document/' + id, null, 'DELETE')

// 审核，监督执行七个生产档案
export const patchWelfare = (id, data) => fetch('/of/s/' + id, data, 'PATCH')
export const patchBreeding = (id, data) => fetch('/breeding/s/' + id, data, 'PATCH')
export const patchPrevention = (id, data) => fetch('/diagnosis/s/' + id, data, 'PATCH')
export const patchDisinfect = (id, data) => fetch('/df/s/' + id, data, 'PATCH')
export const patchImmune = (id, data) => fetch('/ip/s/' + id, data, 'PATCH')
export const patchAntiscolic = (id, data) => fetch('/rp/s/' + id, data, 'PATCH')
export const patchStage = (id, data) => fetch('/nutrition/s/' + id, data, 'PATCH')

export const patchProWelfare = (id, data) => fetch('/of/p/' + id, data, 'PATCH')
export const patchProPrevention = (id, data) => fetch('/diagnosis/p/' + id, data, 'PATCH')
export const patchProBreeding = (id, data) => fetch('/breeding/p/' + id, data, 'PATCH')
export const patchProDisinfect = (id, data) => fetch('/df/p/' + id, data, 'PATCH')
export const patchProImmune = (id, data) => fetch('/ip/p/' + id, data, 'PATCH')
export const patchProAntiscolic = (id, data) => fetch('/rp/p/' + id, data, 'PATCH')
export const patchProStage = (id, data) => fetch('/nutrition/p/' + id, data, 'PATCH')

export const judgeSupervisor = ()=> fetch('/judge/supervisor', "GET")

// 可视系统
export const getImmuneEarTag = data =>fetch('/s/getImmuneEarTag', data, 'POST')

export const diagnoseUp = data => fetch('/uploadFile/upload', data, 'POST')

export const diaSearchAll = data => fetch('/searchfile/searchAll', data, 'POST')

export const diaSearchByExpert = data => fetch('/searchfile/searchByExpert', data, 'POST')

export const diaSearchByDate = data => fetch('/searchfile/searchByDate', data, 'POST')

export const diaSearchByBrand = data => fetch('/searchfile/searchByBrand', data, 'POST')

export const diaSearchByVaccine = data => fetch('/searchfile/searchByVaccine', data, 'POST')

export const diaSearchBySymptom = data => fetch('/searchfile/searchBySymptom', data, 'POST')

export const diaSearchByUploader = data => fetch('/searchfile/searchByUploader', data, 'POST')

export const deleteDiagnose = id => fetch('/pic/delete/' + id, null, 'DELETE')

export const getTableDetail = (id , flag) => fetch('/client/' + id + '/role/' + flag, 'GET')

export const submitVisual = data => fetch('/uploadFile/productPic' , data , 'POST')

// 存档档案

// 栏栋管理
export const getYangNum = (id ) => fetch ('/bc/getSheepBase/' + id , 'GET')

export const createBC = data => fetch ('/bc/batchCreateBC', data, 'POST')

export const createBCL = data => fetch ('/bc/batchUpdateBC', data, 'POST')

export const getDeadSheep = (id, data) => fetch('/ds/d/' + id, data)

export const getSaleSheep = (id, data) => fetch('/ds/s/' + id, data)

export const getBuySheep = (id, data) => fetch('/ds/b/' + id, data)

export const getAllSheep = (id, data) => fetch('/ds/a/' + id, data)

export const makeDeadSheep = (data) => fetch(`/ds/d/d`, data, 'POST')

export const getSheepBuilding = (id) => fetch('/bc/b/' + id)

export const getSheepCol = (id, data) => fetch('/bc/b/' + id + '/' + data, 'GET')

export const moveSheep = (id, data) => fetch('/bc/changeBC/' + id, data, 'POST')

export const moveSheepAll = data => fetch('/bc/changeBC/w', data, 'POST')

export const getSaleFac = (data) => fetch('/customer/slaughter',data, 'POST')

export const getFarmCus = () => fetch('/factory/factory', 'GET')

export const makeSaleFac = (data) => fetch('/ds/ds', data,'POST')

export const getSheepBCT = (data) => fetch('/s/sp',data,'POST')

export const getSheepTog = (id) => fetch('/s/n/' + id,'GET')

export const submitSheepTog = (data) => fetch('/s/s',data ,'POST')

export const updateSheepTog = (data) => fetch('/s/u',data ,'POST')

export const deleteCol = (id) => fetch('/bc/d/' + id , null , 'DELETE')

export const moveSheepPart = data => fetch('/bc/changeBC/ids', data , 'POST')

export const querySheepStage = () => fetch('/cf/stage' , 'GET')

export const deleteSheep = id => fetch(`/ds/delete/sheep?id=${id}`, null , 'POST')


export const changeSaleable = (data) => fetch('/s/c/s', data, 'POST')

export const modifyBuilding = (data) => fetch('/bc/b/n', data, 'POST')

//商品羊销售管理
export const getAllSaleSheep = (id, data) => fetch('/saleOrder/saleAbleSheep/' + id, data,'GET')
export const findAllSheep = (id, data) => fetch('/saleOrder/allSheep/' + id, data,'GET')
export const submitSaleSheep= (data) => fetch('/saleOrder/submitedOrder', data, 'POST')
export const submitSureSaleSheep= (data) => fetch('/saleOrder/add/confirm', data, 'POST')

export const updateSheepAllMe = (data) => fetch('/s/u' ,data ,  'POST')
export const watchVideo = (data) => fetch('/showPicOrVideo',data,'GET')

export const getAllOrder= (id, data) => fetch('/saleOrder/factoryOrder/' + id, data,'GET')
export const sureSaleOrder= (id, data) => fetch('/saleOrder/confirmedOrder/' + id, data,'GET')
export const deleteOrder = (id) => fetch('/saleOrder/deleteOrder/' + id , null , 'DELETE')
export const findSaleVideo = (data) => fetch('/showMedia', data)



//卫生疫控


export const getSheepimmTag = (data) => fetch('/s/i' ,data ,'POST')

export const getSheepEarTag = (data) => fetch('/s/t' ,data ,'POST')


//有机养殖环境追溯


export const getTraceData = (id , page) => fetch('/e/g/' + id + '/' + page  , 'GET' )

//生产节点智能管理
export const getIntelTable = (id , index) => fetch('/nim/' + id + '/s/' + index  , 'GET' )

export const getTotalInTable = (id , index) => fetch('/nim/' + id + '/b/' + index  , 'GET' )

export const getTotalFinish = (id , index) => fetch('/nim/' + id + '/c/' + index  , 'GET' )

export const getStageTable = (id , method , stage , type) => fetch('/nim/' + id + '/w/' + method + '/c/' + stage +'/t/' + type  , 'GET' )

export const getStageDetail = id => fetch('/ns/' + id , 'GET')

export const getFiveDetail = id => fetch('/nim/' + id + '/145' , 'GET')

export const getDouble = (id , stage , type) => fetch('/nim/' + id + '/s/' + stage + '/' + type, 'GET')

//屠宰加工管理平台
export const getSlaughterUnit = (id) => fetch(`/customer/getMyCustomer/` + id , 'GET')

export const updateSlaughterUnit = ( data) => fetch(`/customer/update`, data, 'POST')



//认购管理
export const getCorrelationData = (id,data) => fetch(`/slaughter/`+ id , data, 'GET')

export const getpicsOfFactory = (data) => fetch(`/QaPic/`, data, 'GET')

export const getpicsByEarTagOrQaTag = (data) => fetch(`/QaPic/QueryQaPic/`, data, 'GET')

export const deletePicByQaTag = (id,data) => fetch(`/QaPic/delete/${id}/${data}`, data, 'DELETE')

export const deleteCorrelationById = (id) => fetch(`slaughter/subscribe/delete/${id}`, data, 'POST')



//屠宰前管理

export const getManageData = (data) => fetch(`/slaughter/s`, data, 'POST')

export const getBodyData = (data) => fetch(`/slaughter/s/body`, data, 'POST')

export const getAppendageData = (data) => fetch(`/slaughter/s/appendage`, data, 'POST')

export const getManageEdit = (data) => fetch('/slaughter/m', data, 'POST')

//自动宰前

export const postAutoSlaughter = (data) => fetch('/slaughter/auto/modify', data, 'POST')

//库存管理

export const getstockData = (id,data) => fetch(`/d/order/`+id, data, 'GET')

export const gettotalData = (id) => fetch(`/d/order/number/`+id,'GET')

export const getFac = (data) => fetch(`/customer/customer`,data,'POST')

export const orderCreate = (data) => fetch(`/d/order/add`,data,'POST')

//可视系统
export const findSlaughterMedia = (data) => fetch(`/slaughterFactorySystem/searchAll/`,data)

export const deleteSlaughterMedia = id => fetch('/slaughterFactorySystem/delete/' +id, null ,'DELETE')

//缩略图
export const CreateThumb = data => fetch(`/createThumb?name=${data}` , null ,'POST')
//订单管理

export const getOrderData = (data) => fetch(`/d/order`,data,'POST')

export const deleteOrderData = (id) => fetch(`/d/order/cancel/`+id,'GET')

export const confirmOrderData = (id) => fetch(`/d/order/confirm/`+id, {}, 'GET')

//车辆管理
export const getCarData = (id,data) => fetch(`/vehicle/`+id, data, 'GET')

export const deleteCarinfo = (id,data) => fetch(`/vehicle/delete/`+id, data, 'GET')

//寻找有机
export const getCustomerByAddress = ( data ) => fetch('/customer/getCustomerByAddress', data , 'POST')

export const getFactoryInformation = ( id ) => fetch('/factory/getFactoryFullInformation/' + id , 'GET')

export const getCustomerInformation = ( id ) => fetch('/customer/getFullCustomerInformation/' + id , 'GET')

export const getPlace = (data) => fetch('/customer/cors', data, 'POST')

export const getAllSaleable = () => fetch('/s/allSaleableSheepEarTag', 'GET')

export const gelAllSheep = () => fetch('/s/allSheepEarTag', 'GET')

export const getLocationSheep =(data) => fetch(`/customer/GetCustomerAllSheepByAdress/${data}`, 'GET')

export const getSalableSheep =  (id) =>fetch('/factory/saleableSheep/'+ id, 'GET')

export const countSheep = (id) => fetch('/factory/sheepCount?id=' + id)

export const getDataOfChartByAddress = ( data ) => fetch('/over/all/statistics/show/graphic/' , data , 'GET')

//养殖客户管理
export const getFactoryOne = (id) => fetch('/factory/find/'+ id, 'GET')

export const updateFactory= (data) => fetch('/factory/update', data , 'PUT')

export const searchFtyInfo = (data, page) => fetch(`/factory/query?page=${page}`, data, 'POST')

//搜索平台查询羊信息

export const getSheepInfo = (tag) => fetch('/tr',{trademarkEarTag:tag});

export const getTraceInfo = (id,tag) => fetch(`/tr/product/${id}`,{trademarkEarTag:tag});

export const getPicOfTrace = (tag) => fetch(`/tr/getPicture`,{trademarkEarTag:tag});

export const  getTraceAfterSlaughterInfo= (id,tag) => fetch(`/tr/slaughter/${id}`,{trademarkEarTag:tag});

export const  getSlaughterInfoByearTag = (earTag) => fetch(`/platform/slaughter?earTag=${earTag}`, null,'POST')

export const  getConsumerInfoByearTag = (earTag) => fetch(`/platform/consumer?earTag=${earTag}`, null,'POST')



//认证证书
export const  getCertification = (data) => fetch(`/searchfile/certification`, data, 'POST')

export const  getAuPicture= (EarTag) => fetch(`/searchfile/getCertificationByEarTag`,{tradeMarkEartag:EarTag});

export const  getSheepVideo= (type, tradeMarkEartag) => fetch(`/sheepVideo/${type}/${tradeMarkEartag}`)

export const  getFactoryVideo= (type, tag) => fetch(`/factoryVideo/${type}/${tag}`)

//查询几条记录待审核

export const getUsermsg = (tel) => fetch('/msg/msgcount/' + tel)

//APP端用户接口

export const getAPPUser = (id, page) => fetch(`/userRegister/${id}?page=${page}`)

export const deleteAPPUser = (id) => fetch(`/userRegister/${id}`, null, 'DELETE')

export const editAPPUser = (id, data) => fetch(`/userRegister/${id}`, data, 'PUT')

//权限表获取
export const getPermitTable = (id) => fetch(`/permit/permitTable/${id}`, 'GET')
