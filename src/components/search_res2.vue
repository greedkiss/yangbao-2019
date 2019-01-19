<template>
  <div class="search-wrapper">
    <div class="header">
      <div class="name-wrapper">
        <span class="name">云·羊宝可视化溯源平台</span>
      </div>
      <div class="img-wrapper">
        <img class="header-img" src="../assets/imgs/header-logo2.png" alt="云羊宝" height="86px">
      </div>
      <div class="search">
        <el-input placeholder="在此录入溯源码" size="medium" v-model="key"></el-input>
        <el-button size="medium" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="container">
      <div class="main">
        <video  src="/i/movie.ogg" controls="controls" height="400px" width="auto">
        </video>
        <div class="pro-manage">生产管理</div>
        <div class="mod">
          <div v-for="(v, i) in modules.slice(0,8)" :key="i">
            <el-button @click="open(v.name,v.id)"  size="small" type="primary">{{v.text}}</el-button>
          </div>
        </div>
      </div>
      <div class="left">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基本信息" name="1">
              <div class="t-item">
                <div>
                  <span class="color-gr">品种:</span>
                  <span v-text="sheepInfo.name"></span>
                </div>
                <div>
                  <span class="color-gr">养殖场:</span>
                  <span v-text="sheepInfo.breedLocation"></span>
                </div>
                <div>
                  <span class="color-gr">出栏时间:</span>
                  <span v-text="sheepInfo.leftTime"></span>
                </div>
                <div>
                  <span class="color-gr">屠宰加工场:</span>
                  <span v-text="sheepInfo.slaughterLocation"></span>
                </div>
                <div>
                  <span class="color-gr">屠宰时间:</span>
                  <span v-text="sheepInfo.slaughterTime"></span>
                </div>
                <div>
                  <span class="color-gr">消费点:</span>
                  <span v-text="sheepInfo.consumeLocation"></span>
                </div>
                <div>
                  <span class="color-gr">到店时间:</span>
                  <span v-text="sheepInfo.arriveTime"></span>
                </div>
                <!-- <el-collapse class="expand-wrapper">
                  <el-collapse-item title="产品简介" class="expand">
                    <span v-text="item['intro']"></span>
                  </el-collapse-item>
                </el-collapse> -->
                <!-- <el-collapse class="expand-wrapper">
                  <el-collapse-item title="单位简介" class="expand">
                    <span v-text="item.company['intro']"></span>
                  </el-collapse-item>
                </el-collapse> -->
              </div>
          </el-collapse-item>
          <!--<el-collapse-item title="企业信息" name="2">-->
            <!--<div class="t-item" v-for="(v, i) in  companyInfo.slice(0,companyInfo.length-1)" :key="i">-->
              <!--<span class="color-gr" v-text="v.label + ':'"></span>-->
              <!--<span v-text="item.company[v.model]"></span>-->
            <!--</div>-->
          <!--</el-collapse-item>-->
          <el-collapse-item title="可视化视频" name="3">
            <el-carousel height="150px">
              <el-carousel-item v-for="(item,index) in pics.length" :key="item">
                <img :src="pics[index]">
              </el-carousel-item>
            </el-carousel>
          </el-collapse-item>
          <el-collapse-item title="有机环境" name="4">
            <div class="organicEnvironment">
              <el-button size="small" type="primary" @click="open('air',9)">空气</el-button>
              <el-button size="small" type="primary" @click="open('wat',10)">水质</el-button>
              <el-button size="small" type="primary" @click="open('soi',11)">土壤</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right">
        <el-collapse v-model="activeNames2">
          <el-collapse-item title="二维码" name="1">
            <div class="qrcode" ref="qrcode"></div>
          </el-collapse-item>
          <el-collapse-item title="产品地址" name="2">
            <b-map address="贵州省铜仁市沿河县努比亚山羊养殖场"></b-map>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 系谱 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.gen"
      width="800px"
      :show-close="false">
      <record-table
        type="table"
        title="系谱档案"
        :data="genData">
      </record-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('gen')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <!-- 福利 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.san"
      width="800px"
      :show-close="false">
        <el-table
          :data="welData"
          style="width: 100%">
          <el-table-column
            prop="checkTime"
            label="自检/主管上级检查时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="colonyHouse"
            label="圈舍内外是否合格">
          </el-table-column>
          <el-table-column
            prop="warehouseWorkshop"
            label="饲料库房及加工车间是否合格">
          </el-table-column>
          <el-table-column
            prop="killWormDeratization"
            label="杀虫灭鼠是否合格">
          </el-table-column>
          <el-table-column
            prop="sterilizingRoom"
            label="消毒制度是否执行">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="是否赤手操作">
          </el-table-column>
          <el-table-column
            prop="needleSheep"
            label="是否一羊一针头">
          </el-table-column>
          <el-table-column
            prop="vaccine"
            label="疫苗及针头的消毒处理是否合格">
          </el-table-column>
          <el-table-column
            prop="safetyProtection"
            label="是否做到人员安全防护是否合格">
          </el-table-column>
          <el-table-column
            prop="rubbishWater"
            label="实验室垃圾与排水是否无害化处理">
          </el-table-column>
          <el-table-column
            prop="rubbishWater"
            label="是否遵守操作规范">
          </el-table-column>
          <el-table-column
            prop="airTemperature"
            label="羊舍空气与温度是否合格">
          </el-table-column>
          <el-table-column
            prop="exerciseDaylighting"
            label="羊只运动与采光是否合格">
          </el-table-column>
          <el-table-column
            prop="carDisinfect"
            label="车辆进出是否消毒">
          </el-table-column>
          <el-table-column
            prop="professor"
            label="技术审核">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="upassReason"
            label="审核拒绝原因"
            width='140'>
          </el-table-column>
          <el-table-column
            prop="supervisor"
            label="监督执行">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="监督执行状态">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员名称">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('san')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <!-- 消毒 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.dis"
      width="800px"
      :show-close="false">
        <el-table
          :data="disData"
          style="width: 100%">
          <el-table-column
            prop="disinfectTime"
            label="消毒时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="disinfectName"
            label="消毒药名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="dose"
            label="用药剂量">
          </el-table-column>
          <el-table-column
            prop="disinfectWay"
            label="消毒方法">
          </el-table-column>
          <el-table-column
            prop="professor"
            label="技术审核">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="upassReason"
            label="审核拒绝原因"
            width='140'>
          </el-table-column>
          <el-table-column
            prop="supervisor"
            label="监督执行">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="监督执行状态">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员名称">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('dis')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <!-- 防疫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.imm"
      width="800px"
      :show-close="false">
        <el-table
          :data="immData"
          style="width: 100%">
          <el-table-column
            prop="crowdNum"
            label="接种栏栋">
          </el-table-column>
          <el-table-column
            prop="immuneTime"
            label="接种时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="immuneKind"
            label="免疫种类">
          </el-table-column>
          <el-table-column
            prop="immuneWay"
            label="接种方法">
          </el-table-column>
          <el-table-column
            prop="dose"
            label="接种剂量">
          </el-table-column>
          <el-table-column
            prop="immuneDuring"
            label="免疫期">
          </el-table-column>
          <el-table-column
            prop="professor"
            label="技术审核">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="upassReason"
            label="审核拒绝原因"
            width='140'>
          </el-table-column>
          <el-table-column
            prop="supervisor"
            label="监督执行">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="监督执行状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员名称"
            width="110">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('imm')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <!-- 驱虫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.exp"
      width="800px"
      :show-close="false">
        <el-table
          :data="expData"
          style="width: 100%">
          <el-table-column
            prop="crowdNum"
            label="驱虫栏栋"
            width="180">
          </el-table-column>
          <el-table-column
            prop="repellentTime"
            label="驱虫时间">
          </el-table-column>
          <el-table-column
            prop="repellentName"
            label="药物名称">
          </el-table-column>
          <el-table-column
            prop="repellentWay"
            label="给药途径">
          </el-table-column>
          <el-table-column
            prop="dose"
            label="给药剂量">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="professor"
            label="技术审核">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="upassReason"
            label="审核拒绝原因"
            width='140'>
          </el-table-column>
          <el-table-column
            prop="supervisor"
            label="监督执行">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="监督执行状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员名称"
            width="110">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('exp')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <!-- 营养 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.nut"
      width="800px"
      :show-close="false">
        <el-table
          :data="nutData"
          style="width: 100%">
          <el-table-column
            prop="building"
            label="栏栋号"
            width="140">
          </el-table-column>
          <el-table-column
            prop="nutritionT"
            label="营养时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="period"
            label="阶段">
          </el-table-column>
          <el-table-column
            prop="water"
            label="水">
          </el-table-column>
          <el-table-column
            prop="materialA"
            label="添加剂">
          </el-table-column>
          <el-table-column
            prop="materialM"
            label="精料">
          </el-table-column>
          <el-table-column
            prop="materialO"
            label="其他">
          </el-table-column>
          <el-table-column
            prop="materialWM"
            label="精料用量（体重%）精料">
          </el-table-column>
          <el-table-column
            prop="materialWO"
            label="精料用量（体重%）其他">
          </el-table-column>
          <el-table-column
            prop="roughageP"
            label="粗饲料配方（%）青料">
          </el-table-column>
          <el-table-column
            prop="roughageD"
            label="粗饲料配方（%）干料">
          </el-table-column>
          <el-table-column
            prop="roughageO"
            label="粗饲料配方（%）其他">
          </el-table-column>
          <el-table-column
            prop="roughageWP"
            label="粗饲料用量（体重%）青料">
          </el-table-column>
          <el-table-column
            prop="roughageWD"
            label="粗饲料用量（体重%）干料">
          </el-table-column>
          <el-table-column
            prop="roughageWO"
            label="粗饲料用量（体重%）其他">
          </el-table-column>
          <el-table-column
            prop="professor"
            label="技术审核">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="upassReason"
            label="审核拒绝原因">
          </el-table-column>
          <el-table-column
            prop="supervisor"
            label="监督执行">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="监督执行状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员名称"
            width="110">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('nut')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <!-- 疾病防治 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.dea"
      width="800px"
      :show-close="false">
        <el-table
          :data="deaData"
          style="width: 100%">
          <el-table-column
            prop="diagnosisTime"
            label="记录时间"
            width='180'>
          </el-table-column>
          <el-table-column
            prop="buildingNum"
            label="栏栋编号">
          </el-table-column>
          <el-table-column
            prop="symptom"
            label="症状">
          </el-table-column>
          <el-table-column
            prop="diagnosisResult"
            label="诊断结果"
            width="180">
          </el-table-column>
          <el-table-column
            prop="diagnosisMethod"
            label="治疗方案及用药剂量">
          </el-table-column>
          <el-table-column
            prop="dose"
            label="总用药量">
          </el-table-column>
          <el-table-column
            prop="treatEffect"
            label="治疗效果">
          </el-table-column>
          <el-table-column
            prop="gmtSup"
            label="监督员审核时间">
          </el-table-column>
          <el-table-column
            prop="factoryNum"
            label="羊场id">
          </el-table-column>
          <el-table-column
            prop="professor"
            label="技术审核">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="审核状态">
          </el-table-column>
          <el-table-column
            prop="upassReason"
            label="审核拒绝原因"
            width='140'>
          </el-table-column>
          <el-table-column
            prop="supervisor"
            label="监督执行">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="监督执行状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员名称"
            width="110">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('dea')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.bre"
      width="800px"
      :show-close="false">
        <el-table
          :data="breData"
          style="width: 100%">
          <el-table-column
            prop="breedingTime"
            label="配种时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="buildingAfterBreeding"
            label="配种后移至栏栋">
          </el-table-column>
          <el-table-column
            prop="ramSheepTrademark"
            label="公羊耳牌号">
          </el-table-column>
          <el-table-column
            prop="eweSheepTrademark"
            label="母羊耳牌号">
          </el-table-column>
          <el-table-column
            prop="manageFlag"
            label="管理批次">
          </el-table-column>
          <el-table-column
            prop="manageAverageTime"
            label="批次平均配种时间">
          </el-table-column>
          <el-table-column
            prop="nutritionBeforePregnancy"
            label="妊娠前期营养标准">
          </el-table-column>
          <el-table-column
            prop="isPregnancy"
            label="确定妊娠">
          </el-table-column>
          <el-table-column
            prop="nutritionAfterPregnancy"
            label="妊娠后期营养标准">
          </el-table-column>
          <el-table-column
            prop="prenatalImmunityType"
            label="产前疫苗种类">
          </el-table-column>
          <el-table-column
            prop="prenatalImmunityTime"
            label="产前免疫时间">
          </el-table-column>
          <el-table-column
            prop="buildingToBeRelocated"
            label="待移至栏栋">
          </el-table-column>
          <el-table-column
            prop="nutritionBeforeLambing"
            label="执行产期营养标准">
          </el-table-column>
          <el-table-column
            prop="lambingTime"
            label="产羔时间">
          </el-table-column>
          <el-table-column
            prop="lambingNumber"
            label="产羔数量">
          </el-table-column>
          <el-table-column
            prop="averageTime"
            label="批次平均产羔时间">
          </el-table-column>
          <el-table-column
            prop="nutritionBreastFeeding"
            label="执行哺乳期营养标准(产后一周)">
          </el-table-column>
          <el-table-column
            prop="nutritionInsteadBreastFeeding"
            label="执行羔羊代乳料营养标准(羔羊一月龄)">
          </el-table-column>
          <el-table-column
            prop="nutritionBeforeCutBreastFeeding"
            label="执行羔羊断奶期营养标准-序号:">
          </el-table-column>
          <el-table-column
            prop="nutritionCutBreastFeeding"
            label="执行羔羊断奶期营养标准-序号:">
          </el-table-column>
          <el-table-column
            prop="professorName"
            label="审核专家">
          </el-table-column>
          <el-table-column
            prop="ispassCheck"
            label="是否通过专家审核">
          </el-table-column>
          <el-table-column
            prop="supervisorName"
            label="监督员姓名">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="是否通过专家审核">
          </el-table-column>
          <el-table-column
            prop="ispassSup"
            label="是否通过监督员审核">
          </el-table-column>
          <el-table-column
            prop="operatorName"
            label="操作员姓名">
          </el-table-column>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="factoryNumber"
            label="羊场编号">
          </el-table-column>
          <el-table-column
            prop="factoryName"
            label="羊场名称">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('bre')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.air"
      width="800px"
      :show-close="false">
        <el-table
          :data="airData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="PM"
            label="PM2.5">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('air')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.wat"
      width="800px"
      :show-close="false">
        <el-table
          :data="watData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="PH"
            label="PH值">
          </el-table-column>
          <el-table-column
            prop="PHState"
            label="PH值状态">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('wat')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.soi"
      width="800px"
      :show-close="false">
        <el-table
          :data="soiData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="temp"
            label="温度">
          </el-table-column>
          <el-table-column
            prop="tempState"
            label="温度状态">
          </el-table-column>
          <el-table-column
            prop="wet"
            label="湿度">
          </el-table-column>
          <el-table-column
            prop="wetState"
            label="湿度状态">
          </el-table-column>
        </el-table>
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('soi')" class="btn_close">关闭</span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import BMap from './map'
import RecordTable from './table'
import QRCode from 'qrcodejs2'
import { getSheepInfo } from '@/util/getdata'
import {getTraceInfo} from '@/util/getdata'
export default {
    data (){
      return {
        //商品羊信息
        sheepInfo:{
          name:'',
          breedLocation:'',
          slaughterLocation:'北京市市辖区东城区',
          consumeLocation:'北京市市辖区东城区',
          leftTime:'2018-12-01',
          slaughterTime:'2018-12-01',
          arriveTime:''
        },
        //走马灯图片
        pics: ["/static/chang1.png","/static/chang1.png"],
        //左侧展开的选项
        activeNames: ['1','2','3','4'],
        //右侧展开的选项
        activeNames2: ['1','2','3'],
        //商品 企业标签名
        info:[{
          label: '商品羊信息',
          children:[{
            label:"商品介绍",
          }]
        }],
        //输入值
        key: null,
        //公司照片
        companyPhoto:'/static/chang1.png',
        // 溯源码
        code: '',
        // 档案完整度
        rate: 3,
        dialog: {
          gen: false,
          san: false,
          nut: false,
          dis: false,
          bre: false,
          dea: false,
          imm: false,
          exp: false,
          air: false,
          wat: false,
          soi: false,
        },
        tab_san: 'first',
        tab_nut: 'first',
        genData: [
          { name: 'tradeMarkEartag', fieldName: '商标耳牌', fieldValue: 'M004527' },
          { name: 'breedingSheepBase', fieldName: '种羊基地', fieldValue: '贵州省铜仁市沿河土家族自治县东翔牧业' },
          { name: 'birthTime', fieldName: '初登时间', fieldValue: '2018-01-13 16:24:25' },
          { name: 'birthWeight', fieldName: '初登体重', fieldValue: '7.3' },
          { name: 'color', fieldName: '颜色', fieldValue: '黑' },
          { name: 'sex', fieldName: '性别', fieldValue: 0, type: 'radio', label: ['公羊', '母羊'] },
          { name: 'eartagOfFather', fieldName: '父号', fieldValue: 'G104559' },
          { name: 'eartagOfMother', fieldName: '母号', fieldValue: 'M102112' },
          { name: 'eartagOfFathersFather', fieldName: '父父号', fieldValue: 'G203654' },
          { name: 'eartagOfFathersMother', fieldName: '父母号', fieldValue: 'M108850' },
          { name: 'eartagOfMothersFather', fieldName: '母父号', fieldValue: 'G106512' },
          { name: 'eartagOfMothersMother', fieldName: '母母号', fieldValue: 'M602211' },
          { name: 'typeName', fieldName: '品种名', fieldValue: '黑山羊', size: 'large' },
          { name: 'remark', fieldName: '备注', fieldValue: '', size: 'large' }
        ],
        welData: [ // 福利信息

        ],
        disData: [ // 消毒信息

        ],
        immData: [ // 防疫信息

        ],
        expData: [ // 驱虫信息

        ],
        nutData: [ // 营养信息

        ],
        deaData: [ // 疾病防治

        ],
        breData: [ // 配种产子

        ],
        airData: [
          {
            date:'2018-11-30 15:29:00.0',
            PM: 4,
            state: '优'
          }
        ],
        watData: [
          {
            date:'2018-11-30 15:29:00.0',
            PH: 35,
            PHState: '极强酸性'
          }
        ],
        soiData: [
          {
            date:'2018-11-30 15:29:00.0',
            temp: 35,
            tempState: '土壤温度过高',
            wet: 35,
            wetState: '土壤湿度过高'
          }
        ],
        item: {

        },
        companyInfo: [
          {label: '单位名称', model: 'name'},
          {label: '负责人/法人', model: 'person'},
          {label: '联系方式', model: 'phone'},
          {label: '认证状态', model: 'status'},
          {label: '认证时间', model: 'time'},
          {label: '单位简介', model: 'intro'}
        ],

        modules: [
          {icon: 'smile', text: '系谱', name: 'gen', id: '1'},
          {icon: 'smile', text: '福利', name: 'san', id: '2'},
          {icon: 'smile', text: '消毒', name: 'dis', id: '3'},
          {icon: 'smile', text: '防疫', name: 'imm', id: '4'},
          {icon: 'smile', text: '驱虫', name: 'exp', id: '5'},
          {icon: 'smile', text: '营养', name: 'nut', id: '6'},
          {icon: 'smile', text: '疾病防治', name: 'dea', id: '7'},
          {icon: 'smile', text: '配种产子', name: 'bre', id: '8'},
          {icon: 'smile', text: '空气', name: 'air', id: '9'},
          {icon: 'smile', text: '水质', name: 'wat', id: '10'},
          {icon: 'smile', text: '土壤', name: 'soi', id: '11'}
        ],
        reports: [
          {text: '土壤检测报告'},
          {text: '水质检测报告'},
          {text: 'ISO质量管理体系认证'},
          {text: '食品流通许可证'},
          {text: 'ISO食品安全管理体系认证'},
          {text: '空气检测报告'},
          {text: '营养检测报告'}
        ],
        tab: 'first'
      }
    },
    created (){
      this.$emit('closeHnF');
      this.code = this.$route.query.code || '';
      getSheepInfo(this.code).then((re) => {
        let info = this.sheepInfo;
        let data = re.data;
        console.log(this.code,data);
        if(data != null){
          info.name = data.model.varietyName;
          info.breedLocation = data.model.breedLocation;
          info.arriveTime = data.model.createTime.slice(0,10);
        }
      })

    },
    mounted () {
      this.qrcode()
    },
    qrcode () {
      let qrcode = new QRCode(this.$refs.qrcode, {
        width: 120,
        height: 120,
        text: window.location.href
      })
    },
    components: {
      BMap,
      RecordTable
    },
    methods: {
      search () {
        if (!this.key) {
          this.$message({
            message: '请先输入溯源码',
            type: 'warning'
          })
          return
        }
        this.$router.push({name: 'search', query: { code: this.key }});
        this.$emit("searchTo");
      },
      qrcode () {
        let qrcode = new QRCode(this.$refs.qrcode, {
          width: 80,
          height: 80,
          text: window.location.href
        })
      },
      //1 0 转换为是否
      transfer (info) {
            for(let i in info){
              for(let j in info[i]){
                if(info[i][j] == 1){
                  info[i][j] = '是';
                }
                else if(info[i][j] == 0){
                  info[i][j] = '否';
                }
                console.log('a',info[i]);
                if(j == 'ispassSup'){
                  if(info[i][j] == '0'){
                    info[i][j] = '未通过监督';
                  }else if(info[i][j] == '1'){
                    info[i][j] = '通过监督';
                  }else if(info[i][j] == '2'){
                    info[i][j] = '未监督'
                  }
                }
                if(j == 'ispassCheck'){
                  if(info[i][j] == '0'){
                    info[i][j] = '未通过';
                  }else if(info[i][j] == '1'){
                    info[i][j] = '已审核';
                  }else if(info[i][j] == '2'){
                    info[i][j] = '未审核'
                  }
                }
              }
            }
      },
      open (name,id) {
        console.log(this.dialog, name);
        this.$set(this.dialog, name, true);
        getTraceInfo(id,this.code).then((res) => {
          let data = res.data;
          if(id =='1'){
              this.genData.forEach(el => {
                if(data.lists[0].hasOwnProperty(el.name)){
                  el.fieldValue = data.lists[0][el.name];
                }
              });
          }else if(id == '2'){
            this.welData = data.lists;
            this.transfer(this.welData);
          }else if(id == '3'){
            this.disData = data.lists;
            this.transfer(this.disData);
          }else if(id == '4'){
            this.immData = data.lists;
            this.transfer(this.immData);
          }else if(id == '5'){
            this.expData = data.lists;
            this.transfer(this.expData);
          }else if(id == '6'){
            this.nutData = data.lists;
            this.transfer(this.nutData);
            console.log(this.nutData);
          }else if(id == '7'){
            this.deaData = data.lists;
            this.transfer(this.deaData);
            console.log(this.deaData);
          }else if(id == '8'){
            this.breData = data.lists;
            this.transfer(this.breData);
            console.log(this.deaData);
          }
        })
      },
      close (name) {
        this.$set(this.dialog, name, false)
      }
    }
}
</script>

<style  lang="stylus" scoped>
@import '../assets/css/color'
  .search-wrapper
    /*position: fixed*/
    /*left: 0*/
    /*top: 0*/
    /*bottom: 0*/
    /*z-index: 30*/
    /*width: 100%*/
    /*background: #fff*/
    /*overflow scroll*/
    .header
      text-align center
      height 120px
      .name-wrapper
        .name
          color color-main
          font-size 20px
          font-weight 600
      .img-wrapper
        display inline-block
        float left
        margin-left 30px
      .search
        display inline-block
        float right
        height 86px
        line-height 86px
        .el-input
          width 250px
          vertical-align top
        .el-button
          width 70px
          min-width 70px
          margin-left 10px
          margin-bottom 50px
          background-color color-main
          border-color color-main
          color #fff

  .container
    display flex
    .main
      flex 1
      order 1
      video
        margin 0px 40px 20px 40px
        width 700px
      .pro-manage
        text-align center
        color color-main
    .left
      flex 0 1 300px
      order 0
      .el-collapse-item__header
        margin-left 5px
        color #2891d1
        font-weight 600
      .expand//规范展开样式
        margin-left 5px
        .el-collapse-item__header
          height 24px
          line-height 24px
          color color-green
          font-weight 200
        .el-collapse-item__arrow
          line-height 25px
          margin-right auto
      .color-gr
        margin-left 10px
        color color-green
    .right
      flex 0 1 300px
      order 2
    .el-collapse-item__header
      margin-left 5px
      color #2891d1
      font-weight 600
    .qrcode
      margin 0px 0px 40px 66px
  .expand-wrapper//规范展开样式
    border none
  .el-collapse-item__content//规范展开样式
    padding 0 0 0 5px
  .organicEnvironment//规范详样式
    display flex
    .el-button
      flex 1
      padding 10px
      margin 5px
      width 40px
      color #fff
      border none
      text-align center
      background-color color-green

  .mod//中间生产管理
    width 100%
    display inline-flex
    vertical-align top
    >div
      width 20%
      border none
      >*
        display block
        text-align center
        margin 10px
      >button
        margin 10px auto 10px
        color #fff
        background-color color-green
        border none
      i
        font-size 40px

  .mod_search_dialog
    padding 0 30px
    border 2px solid color-green
    border-radius none
    .el-dialog__header
      padding 0
    .dialog_btn
      text-align right
      font-size 15px
      color color-green
      cursor pointer
      .btn_print
        margin-right 30px

  .has-gutter
    tr
      th
        font-weight 100

.el-table thead.is-group th
    background: #2891d1;
</style>
