<template>
<div class="biggest_content">

  <!-- <el-carousel  indicator-position="none" :height="banner.height+'px'" @change="carouselChange">
<el-carousel-item v-for="item in 3" :key="item"> -->
  <div v-if="cardOneVision" :style="banner" class="search-wrapper" ref='searchWrapper'>
    <div class="header">
      <div class="img-wrapper">
        <img class="header-img" src="../assets/imgs/header-logo2.png" alt="云羊宝" height="60px">
      </div>
      <div class="name-wrapper">
        <span class="name">云·羊宝可视化溯源平台</span>
      </div>
    </div>
    <div class="search-contianer">
      <div class="main">
        <div class='video-wrapper'>
          <video  id='factoryVideo' autoplay="autoplay" :src="videoUrl" controls="controls"  muted loop="loop">
          </video>
        </div>
        <div class="pro-manage">生产管理</div>
              <div class='mod-wrapper'>
          <!-- <div class="modLeft"></div>
          <div class="modMiddle"></div>
          <div class="modRight"></div> -->
          <div class="mod-content">
           <div class="mod-title">
                <span class="breedTitle">养殖端</span>
                <span class="slaugTitle2">屠宰端</span>
                <span class="consuTitle2">消费端</span>
            </div>
          <div class="mod">
             <div class='diagonal'  @click="open(modules[0].name,modules[0].id)">
               <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[0].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[1].name,modules[1].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[1].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[7].name,modules[7].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[7].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[2].name,modules[2].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[2].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[3].name,modules[3].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[3].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[4].name,modules[4].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[4].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[5].name,modules[5].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[5].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[6].name,modules[6].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[6].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[8].name,modules[8].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[8].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open2(modules[9].name,modules[9].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[9].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[10].name,modules[10].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[10].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open2(modules[11].name,modules[11].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[11].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[12].name,modules[12].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
                 <div class="diagonal-content">
                  <div class = 'sleft'>优</div>
                  <div class = 'sright'>
                    <div class="modulesName">{{modules[12].text}}</div>
                    <!-- <div class="clickWatch">点击查看</div> -->
                  </div>
                </div>
              </div>

              <div class='diagonal4'  @click="open2(modules[13].name,modules[13].id)">
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[13].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

        </div>
        </div>
        </div>
      </div>
      <div class="left">
        <el-collapse v-model="activeNames" class='leftC'>
          <el-collapse-item title="产品信息" name="1" class='leftC1'>
            <el-tabs type="card" v-model="currentName" @tab-click="handleClick">
              <el-tab-pane label="养殖场" name="first">
                <div class="factory">
                  <div style="width: 48%; float:left;">
                    <span style="color:#84b8be">耳号: </span>
                    <span>{{sheepInfo.trademarkEarTag}}</span>                  
                  </div>
                  <div style="width: 48%; float:right;">
                    <span style="color:#84b8be">颜色: </span>
                    <span>{{sheepInfo.color}}</span>                  
                  </div>
                  <div style="width: 48%; float:left;">
                    <span style="color:#84b8be">品种: </span>
                    <span>{{sheepInfo.typeName}}</span>                  
                  </div>
                  <div style="width: 48%; float:right;">
                    <span style="color:#84b8be">品类: </span>
                    <span>{{sheepInfo.varietyName}}</span>                  
                  </div>
                  <div style="width: 48%; float:left;">
                    <span style="color:#84b8be">体重: </span>
                    <span>{{sheepInfo.weight}}</span>                  
                  </div>
                  <div style="width: 48%; float:right;">
                    <span style="color:#84b8be">月龄: </span>
                    <span>{{sheepInfo.age}}</span>                  
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="屠宰加工厂" name="second">
              </el-tab-pane>
              <el-tab-pane label="消费店" name="third">
              </el-tab-pane>

            </el-tabs>
          </el-collapse-item>
          <!--<el-collapse-item title="企业信息" name="2">-->
            <!--<div class="t-item" v-for="(v, i) in  companyInfo.slice(0,companyInfo.length-1)" :key="i">-->
              <!--<span class="color-gr" v-text="v.label + ':'"></span>-->
              <!--<span v-text="item.company[v.model]"></span>-->
            <!--</div>-->
          <!--</el-collapse-item>-->
          <el-collapse-item title="产品图像" name="3" class='leftC2'>
            <el-carousel height="150px" indicator-position="none">
              <el-carousel-item v-for="(item,index) in pics" :key="index" >
                <video :src="item" autoplay="autoplay"  muted="muted" controls="controls" width='100%' height='140%' loop="loop"></video>
              </el-carousel-item>
            </el-carousel>
          </el-collapse-item>
          <el-collapse-item title="生产环境" name="4" class='leftC3'>
            <div class="organicEnvironment">
              <div class='air' @click="open('air',11)">
                <img src='../assets/imgs/circle1.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>空气质量</div>
              </div>
              <div class="water" type="primary" @click="open('wat',10)">
                <img src='../assets/imgs/circle2.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>水质量</div>
              </div>
              <div class="solid" type="primary" @click="open('soi',9)">
                <img src='../assets/imgs/circle3.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>土壤质量</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right rightC">
        <div class="search">
          <el-input placeholder="在此录入溯源码" size="medium" v-model="key"></el-input>
          <el-button size="medium" @click="search">搜索</el-button>
        </div>
        <el-collapse v-model="activeNames2" class='rightC1'>
          <el-collapse-item title="厂商信息" name="1" class='classD'>
            <!-- <div class='bmap'></div> -->
            <b-map height='100%' style="display:none" ref="bmap1" :longitude = 'sheepInfo.longitude' :latitude = 'sheepInfo.latitude'></b-map>
            <div class="factory">
              <div>
                <span style="color:#84b8be">养殖场名称: </span>
                <span>{{sheepInfo.breedName}}</span>
              </div>
              <div style="width: 39%; float:left;">
                <span style="color:#84b8be">负责人: </span>
                <span>{{sheepInfo.responsiblePersonName}}</span>                  
              </div>
              <div style="width: 60%; float:right;">
                <span style="color:#84b8be">电话: </span>
                <span>{{sheepInfo.telNumber}}</span>                  
              </div>
              <div>
                <span style="color:#84b8be;clear:both">养殖场地址: </span>
                <span>{{sheepInfo.breedLocation}}</span>
                <a style="float:right"  @click="goMap(1)">
                  导航过去
                  <font-awesome-icon icon="map-marker" />
                </a>
              </div>
            </div>

          </el-collapse-item>

        <div class='certificate-wrapper rightC2'>
          <div class='cer-name'>资质证书</div>
          <div class='certificate-inner'>
          <div class='certificate'  v-for="(item) in auPicture"  @click="watchBigPic(item.url,item.name)">
            <div class="cer-picture">
              <img height='100%' v-if='item' :src="item.url"/>
            </div>
            <span class="cer-description">{{item.name}}</span>
          </div>

          </div>
        </div>

          <el-collapse-item title="用户评级" name="2" >
            <div class='qrleft'>
              <div class="qrcontent">
                <span class='ratingContent'>养殖端评级</span>
                <el-rate
                  v-model="value5"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </div>
              <div class="good">
                <!-- <span>点赞</span> -->
                <img src='../assets/imgs/like.jpg'/>
              </div>
              <div class="bad" @click="openissue">
                <!-- <span>投诉</span> -->
                <img src='../assets/imgs/complain.png'/>
              </div>
            </div>
            <div class="qrcode" id="qrcode2" ref="qrcode" style="width:35%;height:30%;"><img alt="Scan me!" style="display: block;" id="qrcodeImg" :src="qrcodeimg"></div>
          </el-collapse-item>
        </el-collapse>

        <div class='platform-rating'>
          <span class='prating'>平台评级</span>
          <span class='pau'>/品质认证</span>
          <el-rate
            v-model="value5"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
      </div>
    </div>
  </div>

  <!--第二个-->

  <div v-if="cardTwoVision" class="search-wrapper" :style="banner" ref='searchWrapper'>
    <div class="header">
      <div class="img-wrapper">
        <img class="header-img" src="../assets/imgs/header-logo2.png" alt="云羊宝" height="60px">
      </div>
      <div class="name-wrapper">
        <span class="name">云·羊宝可视化溯源平台</span>
      </div>
    </div>
    <div class="search-contianer">
      <div class="main">
        <div class='video-wrapper'>
          <video  id='factoryVideo2' autoplay="autoplay"  muted  :src="slaughterFactoryPics" controls="controls" loop="loop">
          </video>
        </div>
        <div class="pro-manage">生产管理</div>
              <div class='mod-wrapper'>
          <!-- <div class="modLeft"></div>
          <div class="modMiddle"></div>
          <div class="modRight"></div> -->
          <div class="mod-content">
           <div class="mod-title">
                <span class="breedTitle2">养殖端</span>
                <span class="slaugTitle">屠宰端</span>
                <span class="consuTitle2">消费端</span>
            </div>
          <div class="mod">
             <div class='diagonal'  @click="open(modules[0].name,modules[0].id)">
               <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[0].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[1].name,modules[1].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[1].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[7].name,modules[7].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[7].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[2].name,modules[2].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[2].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[3].name,modules[3].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[3].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[4].name,modules[4].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[4].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[5].name,modules[5].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[5].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[6].name,modules[6].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[6].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[8].name,modules[8].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[8].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open2(modules[9].name,modules[9].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[9].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[10].name,modules[10].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[10].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open2(modules[11].name,modules[11].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[11].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[12].name,modules[12].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
                 <div class="diagonal-content">
                  <div class = 'sleft'>优</div>
                  <div class = 'sright'>
                    <div class="modulesName">{{modules[12].text}}</div>
                    <!-- <div class="clickWatch">点击查看</div> -->
                  </div>
                </div>
              </div>

              <div class='diagonal4'  @click="open2(modules[13].name,modules[13].id)">
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[13].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

        </div>
        </div>
        </div>
      </div>
      <div class="left">
        <el-collapse v-model="activeNames" class='leftC'>
          <el-collapse-item title="产品信息" name="1" class='leftC1'>
            <el-tabs type="card" v-model="currentName2"  @tab-click="handleClick">
              <el-tab-pane label="养殖场" name="first">
              </el-tab-pane>
              <el-tab-pane label="屠宰加工厂" name="second">
                <div class="factory">
                  <div>
                    <span style="color:#84b8be">产品编码: </span>
                    <span>{{slaughterInfo.productEncoding}}</span>                  
                  </div>
                  <div>
                    <span style="color:#84b8be">产品名称: </span>
                    <span>{{slaughterInfo.productName}}</span>                  
                  </div>
                  <div style="width: 48%; float:left;">
                    <span style="color:#84b8be">产品重量: </span>
                    <span>{{slaughterInfo.productWeight}}</span>                  
                  </div>
                  <div style="width: 48%; float:right; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">
                    <span style="color:#84b8be">出品时间: </span>
                    <span>{{slaughterInfo.outTime}}</span>                  
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="消费店" name="third">
              </el-tab-pane>
            </el-tabs>
          </el-collapse-item>
          <!--<el-collapse-item title="企业信息" name="2">-->
            <!--<div class="t-item" v-for="(v, i) in  companyInfo.slice(0,companyInfo.length-1)" :key="i">-->
              <!--<span class="color-gr" v-text="v.label + ':'"></span>-->
              <!--<span v-text="item.company[v.model]"></span>-->
            <!--</div>-->
          <!--</el-collapse-item>-->
          <el-collapse-item title="产品图像" name="3" class='leftC2'>
<!--             <el-carousel height="150px" indicator-position="none">
              <el-carousel-item v-for="(item,index) in slaughterSheepPics" :key="index" >
                <video :src="item" autoplay="autoplay"  muted="muted" controls="controls" width='100%' height='140%' loop="loop"></video>
              </el-carousel-item>
            </el-carousel> -->
          <el-carousel height="150px">
            <el-carousel-item v-for="item in slaPictures" :key="item">
              <div style="margin: 0 auto;" @click="watchBigPic(item,'产品图像')"><img :src="item" alt="" /></div>
            </el-carousel-item>
          </el-carousel>
          </el-collapse-item>
          <el-collapse-item title="生产环境" name="4" class='leftC3'>
            <div class="organicEnvironment">
              <div class='air' @click="open('air',9)">
                <img src='../assets/imgs/circle1.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>空气质量</div>
              </div>
              <div class="water" type="primary" @click="open('wat',10)">
                <img src='../assets/imgs/circle2.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>水质量</div>
              </div>
              <div class="solid" type="primary" @click="open('soi',11)">
                <img src='../assets/imgs/circle3.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>土壤质量</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right rightC">
        <div class="search">
          <el-input placeholder="在此录入溯源码" size="medium" v-model="key"></el-input>
          <el-button size="medium" @click="search">搜索</el-button>
        </div>
        <el-collapse v-model="activeNames2" class='rightC1'>

          <el-collapse-item title="厂商信息" name="1" class='classD'>
            <!-- <div class='bmap'></div> -->
            <b-map height='100%' style="display:none" ref="bmap2" :longitude = 'slaughterInfo.longitude' :latitude = 'slaughterInfo.latitude'></b-map>
            <div class="factory">
              <div>
                <span style="color:#84b8be">屠宰场名称: </span>
                <span>{{slaughterInfo.breedName}}</span>
              </div>
              <div style="width: 39%; float:left;">
                <span style="color:#84b8be">负责人: </span>
                <span>{{slaughterInfo.responsiblePersonName}}</span>                  
              </div>
              <div style="width: 60%; float:right;">
                <span style="color:#84b8be">电话: </span>
                <span>{{slaughterInfo.telNumber}}</span>                  
              </div>
              <div>
                <span style="color:#84b8be;clear:both">屠宰场地址: </span>
                <span>{{slaughterInfo.breedLocation}}</span>
                <a style="float:right"  @click="goMap(2)">
                  导航过去
                  <font-awesome-icon icon="map-marker" />
                </a>
              </div>
            </div>

          </el-collapse-item>

          <div class='certificate-wrapper rightC2'>
            <div class='cer-name'>资质证书</div>
            <div class='certificate-inner'>
            <div class='certificate'  v-for="(item) in auPictureOfSlaught"  @click="watchBigPic(item.url,item.name)">
              <div class="cer-picture">
                <img height='100%' v-if='item' :src="item.url"/>
              </div>
              <span class="cer-description">{{item.name}}</span>
            </div>
            </div>
          </div>          

          <el-collapse-item title="用户评级" name="1" >
            <div class='qrleft'>
              <!-- <div class='qrhead'>用户评级
                
              </div> -->
              <div class="qrcontent">
                <span class='ratingContent'>屠宰端评级</span>
                <el-rate
                  v-model="value5"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </div>
              <div class="good">
                <!-- <span>点赞</span> -->
                <img src='../assets/imgs/like.jpg'/>
              </div>
              <div class="bad" @click="openissue">
                <!-- <span>投诉</span> -->
                <img src='../assets/imgs/complain.png'/>
              </div>
            </div>
            <div class="qrcode" ref="qrcode" style="width:35%;height:30%;" ><img alt="Scan me!" style="display: block;" id="qrcodeImg" :src="qrcodeimg"></div>
          </el-collapse-item>

        </el-collapse>

        <div class='platform-rating'>
          <span class='prating'>平台评级</span>
          <span class='pau'>/品质认证</span>
          <el-rate
            v-model="value5"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
      </div>
    </div>
  </div>

  <!--第三个-->

  <div v-if="cardThreeVision" :style="banner" class="search-wrapper" ref='searchWrapper'>
    <div class="header">
      <div class="img-wrapper">
        <img class="header-img" src="../assets/imgs/header-logo2.png"  alt="云羊宝" height="60px">
      </div>
      <div class="name-wrapper">
        <span class="name">云·羊宝可视化溯源平台</span>
      </div>
    </div>
    <div class="search-contianer">
      <div class="main">
        <div class='video-wrapper'>
          <video  id='factoryVideo3' autoplay="autoplay"  muted  :src="consumerFactoryPics"   controls="controls" loop="loop">
          </video>
        </div>
        <div class="pro-manage">生产管理</div>
                <div class='mod-wrapper'>
          <div class="mod-content">
           <div class="mod-title">
                <span class="breedTitle2">养殖端</span>
                <span class="slaugTitle2">屠宰端</span>
                <span class="consuTitle">消费端</span>
            </div>
          <div class="mod">
             <div class='diagonal'  @click="open(modules[0].name,modules[0].id)">
               <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[0].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[1].name,modules[1].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[1].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[7].name,modules[7].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[7].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[2].name,modules[2].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[2].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[3].name,modules[3].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[3].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[4].name,modules[4].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[4].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open(modules[5].name,modules[5].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[5].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open(modules[6].name,modules[6].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[6].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[8 ].name,modules[8].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[8].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open2(modules[9].name,modules[9].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[9].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[10].name,modules[10].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
               <div class="diagonal-content">
                 <div class = 'sleft'>优</div>
                <div class = 'sright'>
                  <div class="modulesName">{{modules[10].text}}</div>
                  <!-- <div class="clickWatch">点击查看</div> -->
                </div>
               </div>
              </div>

              <div class='diagonal2'  @click="open2(modules[11].name,modules[11].id)">
                <img class="arrows2" src='../assets/imgs/arrowsUp.png'/>
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[11].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>

              <div class='diagonal'  @click="open2(modules[12].name,modules[12].id)">
                <img class="arrows1" src='../assets/imgs/arrowsDown.png'/>
                 <div class="diagonal-content">
                  <div class = 'sleft'>优</div>
                  <div class = 'sright'>
                    <div class="modulesName">{{modules[12].text}}</div>
                    <!-- <div class="clickWatch">点击查看</div> -->
                  </div>
                </div>
              </div>

              <div class='diagonal4'  @click="open2(modules[13].name,modules[13].id)">
                <div class="diagonal-content2">
                <div class = 'sright'>
                  <!-- <div class="clickWatch">点击查看</div> -->
                  <div  class="modulesName">{{modules[13].text}}</div>
                </div>
                <div class = 'sleft'>优</div>
                </div>
              </div>
        </div>
       </div> 
        </div>
      </div>

      <div class="left">
        <el-collapse v-model="activeNames" class='leftC'>
          <el-collapse-item title="产品信息" name="1" class='leftC1'>
            <el-tabs type="card" v-model="currentName3"  @tab-click="handleClick">
              <el-tab-pane label="养殖场" name="first">
              </el-tab-pane>
              <el-tab-pane label="屠宰加工厂" name="second">
              </el-tab-pane>
              <el-tab-pane label="消费店" name="third">
                <div class="factory">
                  <div>
                    <span style="color:#84b8be">产品编码: </span>
                    <span>{{ConsumerInfo.number}}</span>                  
                  </div>
                  <div>
                    <span style="color:#84b8be">产品名称: </span>
                    <span>{{ConsumerInfo.productName}}</span>                  
                  </div>
                  <div style="width: 48%; float:left;">
                    <span style="color:#84b8be">羊肉用量: </span>
                    <span>{{ConsumerInfo.mutton}}</span>                  
                  </div>
                  <div style="width: 48%; float:right; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">
                    <span style="color:#84b8be">出品时间: </span>
                    <span style="">{{ConsumerInfo.outTime}}</span>                  
                  </div>
                </div>
              </el-tab-pane>
              
            </el-tabs>
          </el-collapse-item>
          <!--<el-collapse-item title="企业信息" name="2">-->
            <!--<div class="t-item" v-for="(v, i) in  companyInfo.slice(0,companyInfo.length-1)" :key="i">-->
              <!--<span class="color-gr" v-text="v.label + ':'"></span>-->
              <!--<span v-text="item.company[v.model]"></span>-->
            <!--</div>-->
          <!--</el-collapse-item>-->
          <el-collapse-item title="产品图像" name="3" class='leftC2'>
<!--             <el-carousel height="150px" indicator-position="none">
              <el-carousel-item v-for="(item,index) in ConsumerSheepPics" :key="index">
                <video :src="item" autoplay="autoplay" muted="muted" controls="controls" width='100%' height='140%' loop="loop"></video>
              </el-carousel-item>
            </el-carousel> -->
          <el-carousel height="150px">
            <el-carousel-item v-for="item in consumePictures" :key="item">
              <div style="margin: 0 auto;" @click="watchBigPic(item,'产品图像')"><img :src="item" alt="" /></div>
            </el-carousel-item>
          </el-carousel>
          </el-collapse-item>
          <el-collapse-item title="生产环境" name="4" class='leftC3'>
            <div class="organicEnvironment">
              <div class='air' @click="open('air',9)">
                <img src='../assets/imgs/circle1.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>空气质量</div>
              </div>
              <div class="water" type="primary" @click="open('wat',10)">
                <img src='../assets/imgs/circle2.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>水质量</div>
              </div>
              <div class="solid" type="primary" @click="open('soi',11)">
                <img src='../assets/imgs/circle3.png'/>
                <div class='equality'>优</div>
                <div class='equality2'>土壤质量</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="right rightC">
        <div class="search">
          <el-input placeholder="在此录入溯源码" size="medium" v-model="key"></el-input>
          <el-button size="medium" @click="search">搜索</el-button>
        </div>


        <el-collapse v-model="activeNames2" class='rightC1'>

          <el-collapse-item title="厂商信息" name="1" class='classD'>
            <!-- <div class='bmap'></div> -->
            <b-map height='100%' style="display:none" ref="bmap3" :longitude = 'ConsumerInfo.longitude' :latitude = 'ConsumerInfo.latitude'></b-map>
            <div class="factory">
              <div>
                <span style="color:#84b8be">终端店名称: </span>
                <span>{{ConsumerInfo.breedName}}</span>
              </div>
              <div style="width: 39%; float:left;">
                <span style="color:#84b8be">负责人: </span>
                <span>{{ConsumerInfo.responsiblePersonName}}</span>                  
              </div>
              <div style="width: 60%; float:right;">
                <span style="color:#84b8be">电话: </span>
                <span>{{ConsumerInfo.telNumber}}</span>                  
              </div>
              <div>
                <span style="color:#84b8be;clear:both">终端店地址: </span>
                <span>{{ConsumerInfo.breedLocation}}</span>
                <a style="float:right"  @click="goMap(3)">
                  导航过去
                  <font-awesome-icon icon="map-marker" />
                </a>
              </div>
            </div>

          </el-collapse-item>

          <div class='certificate-wrapper rightC2'>
            <div class='cer-name'>资质证书</div>
            <div class='certificate-inner'>
            <div class='certificate'  v-for="(item) in auPictureOfConsumer"  @click="watchBigPic(item.url,item.name)" >
              <div class="cer-picture">
                <img height='100%' v-if='item' :src="item.url"/>
              </div>
              <span class="cer-description">{{item.name}}</span>
            </div>
            </div>
          </div>

          <el-collapse-item title="用户评级" name="1" >
            <div class='qrleft'>
              <!-- <div class='qrhead'>用户评级
                
              </div> -->
              <div class="qrcontent">
                <span class='ratingContent'>终端评级</span>
                <el-rate
                  v-model="value5"
                  disabled
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </div>
              <div class="good">
                <!-- <span>点赞</span> -->
                <img src='../assets/imgs/like.jpg'/>
              </div>
              <div class="bad" @click="openissue">
                <!-- <span>投诉</span> -->
                <img src='../assets/imgs/complain.png'/>
              </div>
            </div>
            <div class="qrcode" ref="qrcode" style="width:35%;height:30%;" ><img alt="Scan me!" style="display: block;" id="qrcodeImg" :src="qrcodeimg"></div>
          </el-collapse-item>

        </el-collapse>

        <div class='platform-rating'>
          <span class='prating'>平台评级</span>
          <span class='pau'>/品质认证</span>
          <el-rate
            v-model="value5"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
      </div>
    </div>
  </div>
<!-- 
  </el-carousel-item >
</el-carousel> -->

<el-dialog
      class='issue'
      custom-class="mod_search_dialog"
      :visible.sync="issue"
      width="800px"
      :show-close="true" 
      >
      <div class='ihead'>——————投诉——————</div>
      <div class='ibody'>
        <div class='ihead1'>
          <span>投诉对象</span>
          <input type='text'/>
        </div>
        <div class='ihead2'>
          <span>投诉人</span>
          <input type='text'/>
          <span>联系电话</span>
          <input type='text'/>
        </div>
          <div class='ihead3'>
          <span>投诉事项</span>
          <input type='text'/>
        </div>
      </div>
    </el-dialog>
    <!-- 系谱 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.gen"
      width="800px"
      :show-close="false"
      >
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('gen')" class="btn_close">关闭</span>
      </div>
      <record-table
        type="table"
        title="系谱档案"
        :data="genData">
      </record-table>
    </el-dialog>
    <!-- 福利 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.san"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('san')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
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
            prop="professorName"
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
            prop="supervisorName"
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
      </div>  
    </el-dialog>
    <!-- 消毒 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.dis"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('dis')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
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
      </div>
    </el-dialog>
    <!-- 防疫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.imm"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('imm')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table
          :data="immData"
          style="width: 100%">
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
      </div>
    </el-dialog>
    <!-- 驱虫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.exp"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('exp')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table
          :data="expData"
          style="width: 100%">
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
      </div>
    </el-dialog>
    <!-- 营养 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.nut"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('nut')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table
          :data="nutData"
          style="width: 100%">
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
            prop="professorName"
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
            prop="supervisorName"
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
      </div>
    </el-dialog>
    <!-- 疾病防治 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.dea"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('dea')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table
          :data="deaData"
          style="width: 100%">
          <el-table-column
            prop="diagnosisTime"
            label="记录时间"
            width='180'>
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
            prop="professorName"
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
            prop="supervisorName"
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
      </div>
    </el-dialog>
    <!-- 配种-->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.bre"
      width="800px"
      :show-close="false">
       <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('bre')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
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
     </div>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.air"
      width="800px"
      :show-close="false">
       <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('air')" class="btn_close">关闭</span>
      </div>
        <el-table
          :data="airData"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期"
            width='205px'>
          </el-table-column>
          <el-table-column
            prop="pm"
            label="PM2.5"
            width='205px'>
          </el-table-column>
          <el-table-column
            prop="pmReturn"
            label="状态"
            width='205px'>
          </el-table-column>
        </el-table>
     
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.wat"
      width="800px"
      :show-close="false">
       <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('wat')" class="btn_close">关闭</span>
      </div>
        <el-table
          :data="watData"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="ph"
            label="PH值">
          </el-table-column>
          <el-table-column
            prop="phReturn"
            label="PH值状态">
          </el-table-column>
        </el-table>
     
    </el-dialog>

    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.soi"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('soi')" class="btn_close">关闭</span>
      </div>
        <el-table
          :data="soiData"
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期"
            width='120px'>
          </el-table-column>
          <el-table-column
            prop="tempSoil"
            label="温度"
            width='120px'>
          </el-table-column>
          <el-table-column
            prop="tempSoilReturn"
            label="温度状态"
            width='120px'>
          </el-table-column>
          <el-table-column
            prop="humSoil"
            label="湿度"
            width='120px'>
          </el-table-column>
          <el-table-column
            prop="humSoilReturn"
            label="湿度状态"
            width='120px'>
          </el-table-column>
        </el-table>
      
      </el-dialog>

    <!-- 检疫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.check"
      width="800px"
      :show-close="false"
      >
      <div class="dialog_btn">
        <span @click="close('check')" class="btn_close">关闭</span>
      </div>
      <record-table
        type="table"
        title="检疫"
        :data="checkData">
      </record-table>
    </el-dialog>

    <!-- 宰前 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.befsla"
      width="800px"
      :show-close="false"
      >
      <div class="dialog_btn">
        <span @click="close('befsla')" class="btn_close">关闭</span>
      </div>
      <record-table
        type="table"
        title="宰前"
        :data="befslaData">
      </record-table>
    </el-dialog>

      <!-- 屠宰 -->

      <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.sla"
      width="800px"
      :show-close="false"
      >
      <div class="dialog_btn">
        <span @click="close('sla')" class="btn_close">关闭</span>
      </div>
      <record-table
        type="table"
        title="屠宰"
        :data="slaData">
      </record-table>
    </el-dialog>

    <!-- 分割 -->

    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.segm2"
      width="800px"
      :show-close="false"
      >
      <div class="dialog_btn">
        <span @click="close('segm2')" class="btn_close">关闭</span>
      </div>
      <record-table
        type="table"
        title="分割"
        :data="segmData">
      </record-table>
    </el-dialog>

      <el-dialog
        custom-class="mod_search_dialog"
        :visible.sync="dialog.segm"
        width="800px"
        :show-close="false">
        <div class="dialog_btn">
          <span class="btn_print">打印</span>
          <span @click="close('segm')" class="btn_close">关闭</span>
        </div>
          <el-table
            :data="segmData"
            style="width: 100%">
            <el-table-column
              prop="partNumber"
              label="部件编号"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="partName"
              label="部件名称"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="weight"
              label="重量(公斤)"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格(元)"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="breedName"
              label="养殖场"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="responsiblePersonName"
              label="货主"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="responsiblePersonPhone"
              label="联系电话"
              width='120px'>
            </el-table-column>
          </el-table>
      </el-dialog>

      <!-- 运输 -->

      <el-dialog
        custom-class="mod_search_dialog"
        :visible.sync="dialog.trans2"
        width="800px"
        :show-close="false"
        >
        <div class="dialog_btn">
          <span @click="close('trans2')" class="btn_close">关闭</span>
        </div>
        <record-table
          type="table"
          title="运输"
          :data="transData">
        </record-table>
      </el-dialog>

      <el-dialog
        custom-class="mod_search_dialog"
        :visible.sync="dialog.trans"
        width="800px"
        :show-close="false">
        <div class="dialog_btn">
          <span class="btn_print">打印</span>
          <span @click="close('trans')" class="btn_close">关闭</span>
        </div>
          <el-table
            :data="transData"
            style="width: 100%">

            <el-table-column
              prop="customerName"
              label="客户单位名称"
              width='120px'>
            </el-table-column>

            <el-table-column
              prop="sumWeight"
              label="总重量(公斤)"
              width='120px'>
            </el-table-column>

            <el-table-column
              prop="partNumber"
              label="部件编码"
              width='120px'>
            </el-table-column>

            <el-table-column
              prop="numberPlate"
              label="车牌号"
              width='120px'>
            </el-table-column>

            <el-table-column
              prop="driverName"
              label="司机名称"
              width='120px'>
            </el-table-column>

          </el-table>
      </el-dialog>

      <!-- 终端 -->

      <el-dialog
        custom-class="mod_search_dialog"
        :visible.sync="dialog.end2"
        width="800px"
        :show-close="false"
        >
        <div class="dialog_btn">
          <span @click="close('end2')" class="btn_close">关闭</span>
        </div>
        <record-table
          type="table"
          title="运输"
          :data="endData">
        </record-table>
      </el-dialog>


      <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.end"
      width="800px"
      :show-close="false">
      <div class="dialog_btn">
        <span class="btn_print">打印</span>
        <span @click="close('end')" class="btn_close">关闭</span>
      </div>
        <el-table
          :data="endData"
          style="width: 100%">
          <el-table-column
            prop="partNumber"
            label="成品编号"
            width='120px'>
          </el-table-column>
          <el-table-column
            prop="dishesName"
            label="成品名称"
            width='120px'>
          </el-table-column>
          <el-table-column
            label="成品分量"
            width='120px'>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ Number(scope.row.muttonConsumption)*1000 }}克/份</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="outBoundTime"
            label="时间"
            width='120px'>
          </el-table-column>
          <el-table-column
            label="图片"
            width='120px'>
            <template slot-scope="scope">
                  <div class="opr" >
                      <span @click="mediaWatchPic(scope)">查看</span>
                  </div>
            </template>
          </el-table-column>
        </el-table>
      
    </el-dialog>
    
<el-dialog
        title="展示图片"
        :visible.sync="dialogBigPicVisible"
        style="margin-top:-50px"
        width="50%"
        center
        @closed="closeBigPic"
        >
        <!-- FIXME: video 标签兼容性处理 -->
        <div class="show-detail">
            <img class="production-image-detail" :src="bigPic.url">
        </div>
        <div class="show-list">
            <ul>
                <li><el-tag>图片类型</el-tag> {{ bigPic.name }}</li>
            </ul>
        </div>
  </el-dialog>

  <el-dialog
        title="视频"
        :visible.sync="mediaVisible"
        width="40%">
        <div class="show-detail">
            <video :src="mediaUrl" class="production-video" controls="controls" height="500" width="500"></video>
        </div>
  </el-dialog>             

  <el-dialog
        title="照片"
        :visible.sync="mediaPicVisible"
        width="40%">
        <div class="show-detail">
            <img  class="production-image-detail" :src="mediaUrl" :onerror="defaultImg">
        </div>
  </el-dialog> 

  <div v-show="false" id="qrcode1" class="qrcode" ref="qrcode"></div>
</div>

</template>

<script type="text/ecmascript-6">
import BMap from './map'
import RecordTable from './table'
import QRCode from 'qrcodejs2'
import { getSheepInfo,getPicOfTrace } from '@/util/getdata'
import {getTraceInfo, getTraceAfterSlaughterInfo,getSlaughterInfoByearTag , getConsumerInfoByearTag} from '@/util/getdata'
//import {getRating} from '@/util/getdata'
import {getAuPicture} from '@/util/getdata'
import {getSheepVideo} from '@/util/getdata'
import {getFactoryVideo} from '@/util/getdata'
export default {
  
    data (){
      return {
        cardOneVision: true,
        cardTwoVision: false,
        cardThreeVision: false,
        banner:{
          height:null,
          },
        newBodyHeight:null,
        auPicture:[],
        auPictureOfSlaught:[],
        auPictureOfConsumer:[],
        autoplay1:false,
        autoplay2:false,
        autoplay3:false,
        bigPic:{
          url:null,
          name:null
        },

        defaultImg:'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
        intervalTime:30000,
        isAutoPlay:true,
        dialogBigPicVisible:false,
        mediaVisible:false,
        mediaPicVisible:false,
        issue: false,
        value5: 3.7,
        currentName:'first',
        currentName2:'second',
        currentName3:'third',
        //商品羊信息
        sheepInfo:{
          name:'',
          breedName:'',
          arriveTime:'',
          telNumber:'',
          breedLocation:'',
          longitude:'',
          latitude:'',
        },
        slaughterInfo:{
          name:'',
          breedName:'',
          arriveTime:'',
          telNumber:'',
          breedLocation:'',
          longitude:'',
          latitude:'',        
        },
        ConsumerInfo:{
          name:'',
          breedName:'',
          arriveTime:'',
          telNumber:'',
          breedLocation:'',
          longitude:'',
          latitude:'',        
        },
        slaughterFactoryPics:null,
        consumerFactoryPics:null,
        ConsumerPics:null,
        slaughterSheepPics:[],
        ConsumerSheepPics:[],
        qrcodeimg:null,
        videoUrl:null,
        //走马灯图片
        pics: [],
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
          check: false,
          befsla: false,
          sla: false,
          segm: false,
          segm2: false,
          trans: false,
          tans2: false,
          end: false,
          end2: false
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
        ],
        watData: [

        ],
        soiData: [

        ],
        checkData: [  // 检疫
          { name: 'tradeMarkEarTag', fieldName: '商标耳牌号', fieldValue: '', size: 'large'},
          { name: 'immuneEarTag', fieldName: '免疫耳牌号', fieldValue: '', size: 'large' },
          { name: 'immuneCertified', fieldName: '检疫合格证号', fieldValue: '', size: 'large' },
          { name: 'breedFactory', fieldName: '来源养殖场', fieldValue: '', size: 'large' },
        ],
        befslaData: [ // 宰前
            { name: 'trademarkEarTag', fieldName: '商标耳牌号', fieldValue: '', size: 'large' },
            { name: 'weight', fieldName: '宰前重量', fieldValue: '', size: 'large' },
            { name: 'time', fieldName: '操作时间', fieldValue: '', size: 'large' },
        ],
        slaData: [  // 屠宰
            {name:'fatherNumber',fieldName:'商标耳牌号',fieldValue:'',size: 'large'},
            {name:'carcassProductEncoding',fieldName:'胴体编码',fieldValue:'',size: 'large'},
            {name:'kidWeight',fieldName:'胴体重量(公斤)',fieldValue:'',size: 'large'},
            {name:'carcassTime',fieldName:'操作时间',fieldValue:'',size: 'large'},
            {name:'accessoriesProductEncoding',fieldName:'附属物编码',fieldValue:'',size: 'large'},
            {name:'appendageWeight',fieldName:'附属物重量(公斤)',fieldValue:'',size: 'large'},
            {name:'accessoriesTime',fieldName:'操作时间',fieldValue:'',size: 'large'}
        ],
        segmData: [   // 分割
            {name:'partNumber', fieldName:'部件编号',fieldValue:''},
            {name:'partName', fieldName:'部件名称',fieldValue:''},
            {name:'weight', fieldName:'重量(公斤)',fieldValue:''},
            {name:'price', fieldName:'价格(元)',fieldValue:''},
            {name:'responsiblePersonName', fieldName:'货主',fieldValue:''},
            {name:'responsiblePersonPhone', fieldName:'联系电话',fieldValue:''},
            {name:'breedName', fieldName:'养殖场',fieldValue:'',size:'large'},
        ],
        transData: [    // 运输
            {name:'customerName', fieldName:'客户单位名称',fieldValue:''},
            {name:'sumWeight', fieldName:'总重量(公斤)',fieldValue:''},
            {name:'partNumber', fieldName:'部件编码',fieldValue:''},
            {name:'numberPlate', fieldName:'车牌号',fieldValue:''},
            {name:'driverName', fieldName:'司机名称',fieldValue:''},
        ],
        endData: [    // 终端
            {name:'partNumber', fieldName:'成品编码',fieldValue:''},
            {name:'dishesName', fieldName:'成品名称',fieldValue:''},
            {name:'muttonConsumption', fieldName:'成品分量(克/份)',fieldValue:''},
            {name:'outBoundTime', fieldName:'时间',fieldValue:''},
        ],
        item: {

        },
        mediaUrl: null,
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
          {icon: 'smile', text: '疾病', name: 'dea', id: '7'},
          {icon: 'smile', text: '配种', name: 'bre', id: '8'}, 
          {icon: 'smile', text: '检疫', name: 'check', id: '20'},
          {icon: 'smile', text: '宰前', name: 'befsla', id: '21'},
          {icon: 'smile', text: '屠宰', name: 'sla', id: '22'},
          {icon: 'smile', text: '分割', name: 'segm', id: '23'},
          {icon: 'smile', text: '运输', name: 'trans', id: '24'},
          {icon: 'smile', text: '终端', name: 'end', id: '25'},
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
        tab: 'first',
        docStr:null,
        slaPictures: [],
        consumePictures: [],
      }
    },
    created (){
      if(this.$route.query.code){
/*         let reg = /(G|M|S)\d+/;
        this.code = this.$route.query.code.match(reg)[0];
        console.log(this.code);  */
        this.code = this.$route.query.code;
      }else{
        this.code =  'G400457';
      }

      getPicOfTrace(this.code).then(res => {
        console.log(res.data)
        let data = res.data.lists;
        if(res.meta.code === 0) {
          for(let i in data) {
            if(typeof data[i] == 'object') {
              for(let j in data[i]) {
                this.slaPictures.push(data[i][j]);
              }
            } else {
              this.slaPictures.push(data[i]);
            }
          }
        }
      })

      getSheepInfo(this.code).then((re) => {
        let info = this.sheepInfo;
        let data = re.data;
        console.log(this.code,data);
        if(data != null){
          getAuPicture(this.code).then((re) => {
            re.data.list.forEach((item) => {
              let v={
                url:item.address,
                name:item.certification
              }
              this.auPicture.push(v);
            })
          })
          getSheepVideo('breeding',this.code).then((re) => {
            this.pics.push(re.data.url);
          })
          getFactoryVideo('breeding',this.code).then((re) => {
            this.videoUrl=re.data.url;
          })
          info.name = data.model.varietyName;
          info.breedName = data.model.breedName;
          info.arriveTime = data.model.createTime&&data.model.createTime.slice(0,10);
          info.telNumber = data.model.phone;
          info.breedLocation = data.model.breedLocation + data.model.breedLocationDetail;
          info.longitude = data.model.longitude; 
          info.latitude = data.model.latitude;
          info.responsiblePersonName=data.model.responsiblePersonName;
          info.trademarkEarTag=data.model.trademarkEarTag
          info.color=data.model.color
          info.varietyName=data.model.typeName
          info.typeName=data.model.varietyName
          info.weight=data.model.weight
          info.age=data.model.age
          console.log('long',info.longitude)
          console.log('latitude',info.latitude)
          let EarTag={
            tradeMarkEartag:this.code
          }
        }else{
            this.$notify.info({
              title: '消息',
              message: '没有该羊信息'
            });
        }
      });
      getSlaughterInfoByearTag(this.code).then(re =>{
        let info = this.slaughterInfo;
        let data = re.data;
        console.log(this.code,data,'panda');
        if(data != null){
          info.name = data.factory.type;
          info.breedName = data.factory.name;
          info.arriveTime = data.factory.date&&data.factory.date.slice(0,10);
          info.telNumber = data.factory.charge_person_phone;
          info.breedLocation = data.factory.simple_address + data.factory.detail_address;
          info.longitude = data.factory.longitude;
          info.latitude = data.factory.latitude;
          info.responsiblePersonName=data.factory.responsiblePersonName;
          if(data.product) {
            info.productEncoding = data.product[0].productEncoding;
            info.productName = data.product[0].productName
            info.productWeight = data.product[0].productWeight
            info.outTime = data.product[0].outTime
          }
          console.log('long',info.longitude)
          console.log('latitude',info.latitude)
          this.slaughterFactoryPics = re.data.factoryVideo.pic_address
/*           re.data.sheep.forEach((item) => {
              this.slaughterSheepPics.push(item.video);
          }) */
          re.data.certification.forEach(item =>{
            if(item !== null){
              let v={
                url:item.pic_address,
                name:item.certification
              }
              this.auPictureOfSlaught.push(v)
            }
          })
        }else{
            // this.$notify.info({
            //   title: '消息',
            //   message: '屠宰端没有该羊信息'
            // });
            return
        }
      })
        getConsumerInfoByearTag(this.code).then(re =>{
        let info = this.ConsumerInfo;
        let data = re.data;
        console.log(this.code,data);
        if(data != null){
          info.name = data.factory.type;
          info.breedName = data.factory.name;
          info.arriveTime = data.factory.date&&data.factory.date.slice(0,10);
          info.telNumber = data.factory.charge_person_phone;
          info.breedLocation = data.factory.simple_address + data.factory.detail_address;
          info.longitude = data.factory.longitude;
          info.latitude = data.factory.latitude;
          info.responsiblePersonName=data.factory.responsiblePersonName;
          info.number = data.product.number;
          info.productName = data.product.productName;
          info.outTime = data.product.outTime;
          info.mutton = data.product.mutton;
          this.consumePictures = data.productPhoto;
          console.log('long',info.longitude)
          console.log('latitude',info.latitude)
          this.consumerFactoryPics = re.data.factoryVideo[0].pic_address
          re.data.sheepVideo.forEach((item) => {
              this.ConsumerSheepPics.push(item);
          })
          re.data.certification[0].forEach(item =>{
            if(item !== null){
              let v={
                url:item.pic_address,
                name:item.certification
              }
              console.log(v)
              this.auPictureOfConsumer.push(v)
            }
          })
        }else{
            // this.$notify.info({
            //   title: '消息',
            //   message: '消费终端没有该羊信息'
            // });
            return 
        }
      })

      let newBodyHeight = document.body.clientHeight;
      this.$set(this.banner,'height',`${newBodyHeight}px`)
    },
    mounted () {
      this.copyQr();
      //this.screenFit();
      let ch=this.changeHeight;
      window.onresize = function windowResize () {
          // 通过捕获系统的onresize事件触发我们需要执行的事件
        ch();
      }
        this.currentName ='first'
        this.currentName2 = 'second'
        this.currentName3 = 'third'
    },
    components: {
      BMap,
      RecordTable
    },

    methods: {
      handleClick(tab, event){
        let video0= document.getElementById("factoryVideo")
        let video1= document.getElementById("factoryVideo2")
        let video2= document.getElementById("factoryVideo3")
        if(tab.label=='养殖场'){
          // if(video0.paused){
          //   video0.currentTime=0
          //   video0.play()
          // }
          // if(!video1.paused){
          //   video1.pause()
          // }
          // if(!video2.paused){
          //   video2.pause()
          // }
          this.currentName ='first'
          this.cardOneVision = true
          this.cardTwoVision =  false
          this.cardThreeVision = false
        }
        else if(tab.label=='屠宰加工厂'){
          // if(video1.paused){
          //   video1.currentTime=0
          //   video1.play()
          // }
          // if(!video0.paused){
          //   video0.pause()
          // }
          // if(!video2.paused){
          //   video2.pause()
          // }
          this.currentName2 = 'second'
          this.cardOneVision = false
          this.cardTwoVision =  true
          this.cardThreeVision = false

        }
        else if(tab.label=='消费店'){
          // if(video2.paused){
          //   video2.currentTime=0
          //   video2.play()
          // }
          // if(!video0.paused){
          //   video0.pause()
          // }
          // if(!video1.paused){
          //   video1.pause()
          //   video1.muted=true
          // }
          this.currentName3 = 'third'
          this.cardOneVision = false
          this.cardTwoVision =  false
          this.cardThreeVision = true
        }
      },
      mediaWatch(scope){
            if(scope.column.label=='附属物视频'){
                if(scope.row.appendageVideo!==null){
                    this.mediaUrl=scope.row.appendageVideo
                    console.log(this.mediaUrl)
                    this.mediaVisible=true
                }
                else{
                this.$message.warning('暂无相关视频！')
                }
            }
                if(scope.column.label=='胴体视频'){
                  if(scope.row.kidVideo!==null){
                      this.mediaUrl=scope.row.kidVideo
                      console.log(this.mediaUrl)
                      this.mediaVisible=true
                  }
                  else{
                  this.$message.warning('暂无相关视频！')
                  }
            }
                if(scope.column.label=='分割视频'){
                    if(scope.row.video!==null){
                        this.mediaUrl=scope.row.video
                        console.log(this.mediaUrl)
                        this.mediaVisible=true
                    }
                    else{
                    this.$message.warning('暂无相关视频！')
                    }
            }
                if(scope.column.label=='终端视频'){
                  if(scope.row.video!==null){
                      this.mediaUrl=scope.row.video
                      console.log(this.mediaUrl)
                      this.mediaVisible=true
                  }
                  else{
                  this.$message.warning('暂无相关视频！')
                  }
            }
      },
      mediaWatchPic(scope){
                if(scope.row.pictureOfCar){
                  this.mediaUrl=scope.row.pictureOfCar
                  this.mediaPicVisible=true
                } else if(scope.row.video) {
                  this.mediaUrl=scope.row.video
                  console.log(this.mediaUrl);
                  this.mediaPicVisible=true                  
                }
                else{
                this.$message.error('暂无相关图片！')
                }
      },
      watchBigPic(picUrl,picName){
        this.dialogBigPicVisible=true;
        this.bigPic.url=picUrl;
        this.bigPic.name=picName;
        this.isAutoPlay=false;
      },
      closeBigPic(){
        this.isAutoPlay=true;
      },
      screenFit() {
      console.log(this.$refs.searchWrapper.style.height)
      if(window.screen.width!=1920){
      this.$refs.searchWrapper.style.height='100%'
      console.log('sd',this.$refs.searchWrapper.style.height)
      }
    },
    /**
     * 设置二维码
     */
      async copyQr(){
      await this.waitqr();
      this.docStr = document.getElementById("qrcode1").innerHTML;
      document.getElementById("qrcode2").innerHTML = this.docStr;
      this.qrcodeimg=document.getElementById("qrcode2").children[1].getAttribute("src");
      //获取第一个幻灯片的二维码图片的地址，
      //将这个地址赋给this.qrcodeimg，从而实现第二第三个页面二维码图片的显示
      document.getElementById("qrcode1").innerHTML = "";
    },
    	waitqr(codeNumber){
        //先调用qrcode,生成二维码，然后0.01秒之后返回成功
				this.qrcode()
				return new Promise((resolve)=>{
					setTimeout(resolve,10)
				});
			},
      openissue() {
        this.issue = true;
      },
      search () {
        if (!this.key) {
          this.$message({
            message: '请先输入溯源码',
            type: 'warning'
          })
          return
        }
        let reg = /(G|M|S)\d+/;
        //let searchCode = this.key.match(reg)[0];
        let searchCode = this.key;
        this.$router.push({name: 'search', query: { code: searchCode }});
        this.$emit("searchTo");
      },
       qrcode () {
      let qrcode = new QRCode(this.$refs.qrcode, {
        width: 90,
        height: 90,
        text: `http://${window.location.host}/#/mS?eT=${this.code}`
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
      open2(name, id){
        //this.$set(this.dialog, name, true);
        // 检疫
        if(id==20){
            id=6
            getTraceAfterSlaughterInfo(id,this.code).then(res => {
              this.$set(this.dialog, name, true);
              let data = res.data;
              console.log(data);
              if(data.lists.length === 1) {
                this.checkData.forEach(el => {
                  if(data.lists[0].hasOwnProperty(el.name)){
                    el.fieldValue = data.lists[0][el.name];
                  }
                });
              }
            })
        }
        // 宰前
        else if(id==21){
            id=1
            getTraceAfterSlaughterInfo(id,this.code).then((res) =>{
              this.$set(this.dialog, name, true);
              let data = res.data;
              console.log(data);
              if(data.lists.length === 1) {
                this.befslaData.forEach(el => {
                  if(data.lists[0].hasOwnProperty(el.name)){
                    el.fieldValue = data.lists[0][el.name];
                  }
                });
              }
          })  
        }
        // 屠宰
        else if(id==22){
          id=2
          getTraceAfterSlaughterInfo(id,this.code).then((res) =>{
            this.$set(this.dialog, name, true);
            let data = res.data;
            console.log(data);
            if(data.lists.length === 1) {
              this.slaData.forEach(el => {
                if(data.lists[0].hasOwnProperty(el.name)){
                  el.fieldValue = data.lists[0][el.name];
                }
              });
            }
          })  
        }
        // 分割
        else if(id==23){
          id=3
          getTraceAfterSlaughterInfo(id,this.code).then((res) =>{
            console.log(res.data);
            let code = this.code
            let data=res.data.lists
            if(data.length > 1) {
              this.$set(this.dialog, name, true);
              this.segmData=[];
              data.forEach((item) =>{
                item.fatherNumber = code
                this.segmData.push(item)
              })
            } else {
              this.$set(this.dialog, `${name}2`, true);
                this.segmData.forEach(el => {
                  if(data[0].hasOwnProperty(el.name)){
                    el.fieldValue = data[0][el.name];
                  }
                });
            }
          })  
        }
        // 运输
        else if(id==24){
          id=4
          getTraceAfterSlaughterInfo(id,this.code).then((res) =>{
            console.log(res.data);
            let data=res.data.lists
            if(data.length > 1) {
              this.$set(this.dialog, name, true);
              this.transData=[]
              data.forEach((item) =>{
                this.transData.push(item)
              })
            } else {
              this.$set(this.dialog, `${name}2`, true);
                this.transData.forEach(el => {
                  if(data[0].hasOwnProperty(el.name)){
                    el.fieldValue = data[0][el.name];
                  }
                });              
            }
          })  
        }
        // 终端
        else if(id==25){
          id=5
          getTraceAfterSlaughterInfo(id,this.code).then((res) =>{
            console.log(res.data)
            let data=res.data.lists
            if(data.length > 1) {
              this.$set(this.dialog, name, true);
              this.endData=[]
              data.forEach((item) =>{
                this.endData.push(item)
              })
            } else {
              this.$set(this.dialog, `${name}2`, true);
                this.endData.forEach(el => {
                  if(data[0].hasOwnProperty(el.name)){
                    if(el.name === 'muttonConsumption') {
                      el.fieldValue = Number(data[0][el.name])*1000;
                    } else {
                      el.fieldValue = data[0][el.name];
                    }
                  }
                });                
            }
          })  
        }
      },
      open (name,id) {
        this.$set(this.dialog, name, true);
        getTraceInfo(id,this.code).then((res) => {
          let data = res.data;
          if(id =='1'){
            if(data.lists.length==0){
              this.$set(this.dialog, name, false)
              this.$message.warning('未建立系谱，请完善！')
              return
            }
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
          }else if(id == '9'){
            this.soiData = data.lists;
            console.log(this.soiData);
          }else if(id == '10'){
            this.watData = data.lists;
            console.log(this.watData);
          }else if(id == '11'){
            this.airData = data.lists;
            console.log(this.airData);
          }
        })
      },
      close (name) {
        this.$set(this.dialog, name, false)
      },
      changeHeight(){
        let newBodyHeight = document.body.clientHeight;
        this.$set(this.banner,'height',`${newBodyHeight}px`)
        console.log(this.banner.height)
      },
      goMap(id) {
        let map;
        if(id == 1) {
          map = this.$refs.bmap1;
          map.goBMap();
        } else if(id == 2) {
          map = this.$refs.bmap2;
          map.goBMap();
        } else {
          map = this.$refs.bmap3;
          map.goBMap();
        }
      }
    }
}
</script>

<style  lang="stylus">
@import '../assets/css/color'
  .search-wrapper
    display flex
    flex-direction column
    background-image url(../assets/imgs/background.jpg)
    background-repeat no-repeat
    background-size cover
    width 100%
    height 100%
    overflow-y auto
    .header
      flex 0 0 100px
      text-align center
      background-image url(../assets/imgs/bottomLine.png)
      background-repeat no-repeat
      background-size 100% 50%
      background-position 50% 70%
      .name-wrapper
        display inline-block
        position relative
        top -25px
        .name
          color color-main
          font-size 20px
          font-weight 600
      .img-wrapper
        display inline-block
        margin-top 10px

  .search-contianer
    flex 1
    display flex
    background-image url(../assets/imgs/background.jpg)
    background-repeat no-repeat
    background-size cover
    .main
      display flex
      flex-direction column
      flex 1
      order 1
      width 700px
      .video-wrapper
        flex 1 
        video
          width 100%
          height 100%
      .pro-manage
        text-align center
        color color-main
      .mod-wrapper
        flex 0 1 180px
        border 10px solid transparent
        border-image url(../assets/imgs/border.png)
        background-origin:content-box;
        border-image-slice 30
        border-image-width 2.6
        margin 0px 20px 0px 20px
         
    .left
      flex 0 1 400px
      order 0
      .el-collapse-item__header
        margin-left 5px
        color #2891d1
        font-weight 600
        background-color rgba(0,0,0,0)
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
        color color-green
    .right
      flex 0 1 400px
      order 2
    .el-collapse-item__header
      margin-left 5px
      color #2891d1
      font-weight 600
  .expand-wrapper//规范展开样式
    border none
  .el-collapse-item__content//规范展开样式
    padding 0 0 0 5px
    color #b2aeae
  .organicEnvironment//规范详样式
    display flex
    .air,.water,.solid
      flex 1
      text-align center
    .el-button
      flex 1
      padding 10px
      margin 5px
      width 40px
      color #fff
      border none
      text-align center
      background-color color-green

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
    .dialog_table
      overflow-x auto

  .has-gutter
    tr
      th
        font-weight 100

.el-table thead.is-group th
    background: #2891d1;

.el-collapse-item__wrap
  background-color rgba(0,0,0,0)

.el-collapse-item__header
  background-color rgba(0,0,0,0)
  border none
.el-collapse
  border none
.el-collapse-item
  border 10px solid transparent
  border-image url(../assets/imgs/border.png)
  border-image-slice 30
  border-image-width 2.6

.el-collapse-item__wrap
  border none

 .search-contianer
  .el-input--medium 
    width 186px
    margin-left 9px
    .el-input__inner
      height 25px
      line-height 36px
      background-color rgba(0,0,0,0)

.search-contianer
  .el-button--medium
    padding 5px
    font-size 14px
    border-radius 4px
    background-color rgba(0,0,0,0)
.mod-content
    background: -webkit-linear-gradient(
    left,
    rgba(2,16,61,0.7)0%,
    rgba(2,16,61,0.7)57%,
    rgba(7,25,87,0.7)57%,
    rgba(7,25,87,0.7)92%,
    rgba(8,31,107,0.7)92%
    )
    width:100%
    height:180px
    margin-top:2px
.mod
  margin-left -25px
  font-size 1px
  display flex
  padding: 0px 50px 0px 55px
.mod:last-child
  padding-bottom 10px
 .swrapper
  border: 0.5px solid #00a0ea
  padding: 8px
  background-color: rgba(0,160,234,0.3)
  margin 10px 7px 0px 0px    
.swrapper:last-child
  margin-right 0px
.sleft,.sright
  display block
  color rgb(183,251,250)
  margin-left 10px
.sleft
  height 25px
  width 25px
  border-radius 50%
  background-color rgb(0,160,234)
  color rgb(128,194,107)
  text-align center
  line-height 25px
  font-size 15px
.modulesName
  line-height 25px
  font-size 13px
  color rgb(0,160, 234)
.clickWatch
  color rgba(0,160, 233,0.3)
.air,.water,.solid
  display inline-block
  position relative
.equality
  margin-top -5px
  text-align: center
  font-size: 20px
  color: rgb(229,168,87)
.equality2
    text-align: center
    font-size: 10px
    color: rgb(133,197,206)
    margin-top -5px
.el-tabs__item
  height 30px
  line-height 30px
  padding 0px 10px
  color rgb(5,187,191)
.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2)
  padding-left 10px
.el-tabs--top.el-tabs--card .el-tabs__item:last-child
  padding-right 10px
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active
  border-bottom-color rgb(199,126,85)
  color rgb(199,126,85)
.el-tabs--card>.el-tabs__header .el-tabs__item
  border-bottom-color rgb(199,126,85)
  border-left-color rgb(199,126,85)
.el-tabs--card>.el-tabs__header .el-tabs__nav
  border-color rgb(199,126,85)
.el-tabs__item:hover
  color rgb(5,187,191)
.qrcode,.qrleft
  display inline-block
.qrleft
  width 50%
  position: relative
  top: -5px
  margin-left 5px
  margin-bottom 10px
.el-rate__icon
 font-size 11px
.el-rate
 display inline-block
.el-rate__item
  width 11px
.ratingContent
  font-size 5px
.qrhead
  color rgb(0,255,255)
  font-weight 700
.ratingContent
  color rgb(0,255,255)
.qrcode
  padding-left: 10px;
  border-left: 1px solid rgb(50,78,99);
.certificate-wrapper
  border 10px solid transparent
  border-image url(../assets/imgs/border.png)
  border-image-slice 30
  border-image-width 2.6
  .cer-name
    color: #2891d1;
    font-weight: 600;
    margin: 16px 0px 0px 5px;
    font-size: 14px;
  .certificate
    display inline-block
    text-align center
    margin: -17px 8px 0px 8px;

    .cer-picture
      display block
      height 60px
      background-color rgb(0,46,144)
    .cer-description
      font-size: 5px;
      color: white;

.platform-rating
  border 10px solid transparent
  border-image url(../assets/imgs/border.png)
  border-image-slice 30
  border-image-width 2.6
  text-align: center
  padding: 5px 0 3px 0
  .prating,.pau
    color rgb(7,255,255)
  .prating
    font-weight 600
  .pau
    font-size 10px


.ihead
  text-align center
.ibody
  border: 1px rgb(183,251,252) solid
  border-radius: 10px
  background-color: rgb(183,251,252)
  color: black
  text-align: center
  .ihead1,.ihead2,.ihead3
    margin-bottom 10px
  .ihead1
    span
      color rgb(0,46,144)
    input
      width 50%
  .ihead2
    span
      color rgb(0,46,144)
    input
      width 20%
    input:first-of-type
      margin-right 6px
      width 100px
  .ihead3
    span
      color rgb(0,46,144)
    input
      width 50%
      height 100px
.video-wrapper
  border 10px solid transparent
  border-image url(../assets/imgs/border.png)
  border-image-slice 30
  border-image-width 2.6
  margin 0px 20px 20px 20px
  height 385px
.t-item
  font-size 12px
  >div
    border-bottom 0.5px green solid
.certificate-inner
  display flex
  .certificate
    flex 1
.search-contianer .el-button--medium
  color white
.el-dialog__body
  padding 30px 60px
.issue
  >div
    background-color rgb(0,46,114)
    
.leftC
  display flex
  flex-direction column
  height 100%
  .leftC2
    flex 1
  .leftC1
    flex 1
  .leftC3 
    flex 1
    position relative
    .el-collapse-item__wrap
      position absolute
      width 100%
      top 30%
.rightC
  display flex
  flex-direction column
  .rightC1
    flex 2
    display flex
    flex-direction column
    .classD
      flex 1
      position relative
    .bmap
      margin-top -10px
      .el-collapse-item__wrap
        position relative
        width 100%
        top 5%
  .rightC2
    flex 1
    position relative
    .certificate-inner
      position absolute
      width 100%
      top 40%
.diagonal
  position: relative
  width:  8%
  height: 80px
  background: -webkit-linear-gradient(
  to top right,
    rgba(0,160, 234, 0) 0%,
    rgba(0,160, 234, 0) calc(50% - 1.5px),
    rgba(0,160, 234, 1) 50%,
    rgba(0,160, 234, 0) calc(50% + 1.5px),
    rgba(0,160, 234, 0) 100%
    )
  background: -moz-linear-gradient(
  to top right,
    rgba(0,160, 234, 0) 0%,
    rgba(0,160, 234, 0) calc(50% - 1.5px),
    rgba(0,160, 234, 1) 50%,
    rgba(0,160, 234, 0) calc(50% + 1.5px),
    rgba(0,160, 234, 0) 100%
   )
  background: -o-linear-gradient(
  to top right,
    rgba(0,160, 234, 0) 0%,
    rgba(0,160, 234, 0) calc(50% - 1.5px),
    rgba(0,160, 234, 1) 50%,
    rgba(0,160, 234, 0) calc(50% + 1.5px),
    rgba(0,160, 234, 0) 100%
    )
  background: linear-gradient(
    to top right,
      rgba(0,160, 234, 0) 0%,
      rgba(0,160, 234, 0) calc(50% - 1.5px),
      rgba(0,160, 234, 1) 50%,
      rgba(0,160, 234, 0) calc(50% + 1.5px),
      rgba(0,160, 234, 0) 100%
  )
.arrows1
  position: absolute;
  top: 50%;
  left: 50%;
  margin -8px;
  transform:rotate(20deg)
  -ms-transform:rotate(20deg); /* Internet Explorer */
  -moz-transform:rotate(20deg); /* Firefox */
  -webkit-transform:rotate(20deg); /* Safari 和 Chrome */
  -o-transform:rotate(20deg); /* Opera */
.diagonal-content
  position: relative
  right:22px
  bottom: 10px 
  width:  70px
  height: 50px
.diagonal2
  position: relative
  width:  8%
  height: 80px
  background:linear-gradient(
    to bottom right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 1.5px),
      rgba(0,160, 234, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 1.5px),
      rgba(0, 0, 0, 0) 100%
  )
.arrows2
  position: absolute;
  top: 50%;
  left: 50%;
  margin -10px;
  -ms-transform:rotate(5deg); /* Internet Explorer */
  -moz-transform:rotate(5deg); /* Firefox */
  -webkit-transform:rotate(5deg); /* Safari 和 Chrome */
  -o-transform:rotate(5deg); /* Opera */
.diagonal-content2
  position: relative
  right:22px
  top:35px
  width:  70px
  height: 50px  
.arrows3
  position: absolute
  left: 25px
  top: 1px
  transform:rotate(30deg)
  -ms-transform:rotate(30deg); /* Internet Explorer */
  -moz-transform:rotate(30deg); /* Firefox */
  -webkit-transform:rotate(30deg); /* Safari 和 Chrome */
  -o-transform:rotate(30deg); /* Opera */
.diagonal4
  position: relative
  //right:22px
  //bottom: 10px 
  width:  8%
  height: 50px
.diagonal-content1
  width:  70px
  height: 50px
.mod-title
  display block
  height 50px
  width: 100%
  padding-top 10px
.breedTitle
  color rgb(232,97,0)
  margin-top 20px
  margin-left 27%
.slaugTitle
  color rgb(232,97,0)
  margin-left 38%
.consuTitle
  color rgb(232,97,0)
  float right
//margin-right 10px
.breedTitle2
  color rgb(0,160,234)
  margin-top 20px
  margin-left 27%
.slaugTitle2
  color rgb(0,160,234)
  margin-left 38%
.consuTitle2
  color rgb(0,160,234)
  float right
//margin-right 10px
// .modLeft
//   width:510px
//   height:180px
//   background-color rgb(2,16,61)
// .modMiddle
//   background-color rgb(7,25,87)
//   width:250px
//   height:180px
// .modRight
//   background-color rgb(8,31,107)
//   width:100px
//   height:180px
.factory
  margin 0 auto
  width 90%
  font-size 10px
.factory>div
  border-bottom 1px solid #00469c
  margin-bottom 15px
.el-carousel__button
  display none
</style>
