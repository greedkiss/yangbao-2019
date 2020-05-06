<template>
  <div id="bigContent">
    <!-- 顶部条 -->
    <div class="app-bar">养殖生产溯源</div>
    <!-- 底部条 -->
    <div class="bottom-bar">
      <a class="active" :href="location">
        <font-awesome-icon icon="home" />
        <label>首页</label>
      </a>
      <a :href="location">
        <font-awesome-icon icon="comment" />
        <label>最新消息</label>
      </a>
      <a :href="location">
        <font-awesome-icon icon="user" />
        <label>我的</label>
      </a>
    </div>
    <!-- 搜索条 -->
    <div class="search-bar">
      <div class="wrapper">
        <input v-model="key" placeholder="扫描/输入号码" />
        <button @click="search">
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>
    <!-- 栏目切换 -->
    <div class="tab-bar">
      <a :class="{active : isActive}" @click="tabChange(1)">养殖生产</a>
      <a :class="{active : isActive2}" @click="tabChange(2)">屠宰加工</a>
      <a :class="{active : isActive3}" @click="tabChange(3)">终端产品</a>
    </div>
    <!-- 内容块 -->
    <div v-if="tabShow===1">
      <section class="block block-text-video">
        <h2>养殖场基本信息</h2>
        <div class="row">
          <div class="field">
            <label>养殖场名称：</label>
            <span>{{sheepInfo.breedName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>负责人：</label>
            <span>{{sheepInfo.responsiblePersonName}}</span>
          </div>
          <div class="field">
            <label>电话：</label>
            <span>{{sheepInfo.telNumber}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>养殖场地址：</label>
            <span>{{sheepInfo.breedLocation}}</span>
            <a class="map" @click="goMap(1)">
              导航过去
              <font-awesome-icon icon="map-marker" />
            </a>
          </div>
        </div>
        <div class="video">
          <video
            id="factoryVideo"
            autoplay="autoplay"
            controls="controls"
            muted="muted"
            loop="loop"
            :src="videoUrl ? videoUrl : `aaa`"
          />
        </div>
      </section>
      <section v-show="mapVisible" style="height:400px;" class="block block-text-video">
        <b-map
          height="100%"
          :mobile="true"
          ref="bmap1"
          :longitude="sheepInfo.longitude"
          :latitude="sheepInfo.latitude"
        ></b-map>
      </section>
      <!-- 内容块  -->
      <section class="block block-text-video">
        <h2>羊只信息</h2>
        <div class="row">
          <div class="field">
            <label>耳号：</label>
            <span>{{sheepInfo.trademarkEarTag}}</span>
          </div>
          <div class="field">
            <label>颜色：</label>
            <span>{{sheepInfo.color}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>品种：</label>
            <span>{{sheepInfo.typeName}}</span>
          </div>
          <div class="field">
            <label>品类：</label>
            <span>{{sheepInfo.varietyName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>体重：</label>
            <span>{{sheepInfo.weight}}</span>
          </div>
          <div class="field">
            <label>月龄：</label>
            <span>{{sheepInfo.age}}</span>
          </div>
        </div>
        <div class="video">
          <video id="factoryVideo" controls="controls" muted="muted" loop="loop" :src="pics[0]" />
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-gjzs">
        <h2>资质证书</h2>
        <div class="content">
          <span
            v-for="(item,index) in auPicture"
            @click="watchBigPic(item.url,item.name)"
            :key="index"
          >
            <img v-if="item" :src="item.url" />
            <span class="cer-description">{{item.name}}</span>
          </span>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-sc">
        <h2>生产档案</h2>
        <div class="content">
          <div class="items items-1">
            <div class="item" @click="open(modules[0].name,modules[0].id)">
              <a class="value">优</a>
              <a class="text">
                <b>系谱</b>
              </a>
            </div>
            <div class="item" @click="open(modules[1].name,modules[1].id)">
              <a class="value">良</a>
              <a class="text">
                <b>福利</b>
              </a>
            </div>
          </div>
          <div class="items items-2">
            <div class="item" @click="open(modules[2].name,modules[2].id)">
              <a class="value">中</a>
              <a class="text">
                <b>消毒</b>
              </a>
            </div>
            <div class="item" @click="open(modules[3].name,modules[3].id)">
              <a class="value">优</a>
              <a class="text">
                <b>防疫</b>
              </a>
            </div>
          </div>
          <div class="items items-3">
            <div class="item" @click="open(modules[4].name,modules[4].id)">
              <a class="value">良</a>
              <a class="text">
                <b>驱虫</b>
              </a>
            </div>
            <div class="item" @click="open(modules[5].name,modules[5 ].id)">
              <a class="value">优</a>
              <a class="text">
                <b>营养</b>
              </a>
            </div>
          </div>
          <div class="items items-4">
            <div class="item" @click="open(modules[6].name,modules[6].id)">
              <a class="value">优</a>
              <a class="text">
                <b>配种</b>
              </a>
            </div>
            <div class="item" @click="open(modules[7].name,modules[7].id)">
              <a class="value">优</a>
              <a class="text">
                <b>疾病</b>
              </a>
            </div>
          </div>
          <div class="items items-5">
            <div class="item" @click="open2(modules[8].name,modules[8].id)">
              <a class="value">优</a>
              <a class="text">
                <b>检疫</b>
              </a>
            </div>
            <div class="item" @click="open2(modules[9].name,modules[9].id)">
              <a class="value">中</a>
              <a class="text">
                <b>宰前</b>
              </a>
            </div>
            <div class="item slaughter" @click="open2(modules[10].name,modules[10].id)">
              <a class="value">良</a>
              <a class="text">
                <b>屠宰</b>
              </a>
            </div>
          </div>
          <div class="items items-6">
            <div class="item" @click="open2(modules[11].name,modules[11].id)">
              <a class="value">中</a>
              <a class="text">
                <b>分割</b>
              </a>
            </div>
            <div class="item" @click="open2(modules[12].name,modules[12].id)">
              <a class="value">优</a>
              <a class="text">
                <b>运输</b>
              </a>
            </div>
          </div>
          <div class="items items-7">
            <div class="item" @click="open2(modules[13].name,modules[13].id)">
              <a class="value">优</a>
              <a class="text">
                <b>终端</b>
              </a>
            </div>
          </div>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yzhjzs">
        <h2>生产环境</h2>
        <div class="content">
          <span @click="open('air',11)">
            <img src="../assets/imgs/mobile/yzhjzs/1.png" />
            <label>空气</label>
          </span>
          <span @click="open('wat',10)">
            <img src="../assets/imgs/mobile/yzhjzs/2.png" />
            <label>水</label>
          </span>
          <span @click="open('soi',9)">
            <img src="../assets/imgs/mobile/yzhjzs/3.png" />
            <label>土壤</label>
          </span>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yhpj">
        <div class="content">
          <h4>平台评级</h4>
          <div class="stars">
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" />
          </div>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yhpj">
        <div class="content">
          <h4>消费者评级</h4>
          <div class="stars">
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" />
          </div>
        </div>
        <div class="goodOrIssue">
          <a @click="goodSuccess">
            点赞
            <font-awesome-icon icon="thumbs-up" />
          </a>
          <a @click="openissue">
            投诉
            <font-awesome-icon icon="question" />
          </a>
        </div>
      </section>
    </div>

    <!--屠宰加工-->
    <div v-if="tabShow===2">
      <section class="block block-text-video">
        <h2>屠宰场基本信息</h2>
        <div class="row">
          <div class="field">
            <label>屠宰场名称：</label>
            <span>{{slaughterInfo.breedName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>负责人：</label>
            <span>{{slaughterInfo.responsiblePersonName}}</span>
          </div>
          <div class="field">
            <label>电话：</label>
            <span>{{slaughterInfo.telNumber}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>屠宰场地址：</label>
            <span>{{slaughterInfo.breedLocation}}</span>
            <a class="map" @click="goMap(2)">
              导航过去
              <font-awesome-icon icon="map-marker" />
            </a>
          </div>
        </div>
        <div class="video">
          <video
            id="factoryVideo"
            autoplay="autoplay"
            controls="controls"
            muted="muted"
            loop="loop"
            :src="slaughterFactoryPics ? slaughterFactoryPics : `aaa`"
          />
        </div>
      </section>
      <section v-show="mapVisible" style="height:400px;" class="block block-text-video">
        <b-map
          height="100%"
          ref="bmap2"
          :mobile="true"
          :longitude="slaughterInfo.longitude"
          :latitude="slaughterInfo.latitude"
        ></b-map>
      </section>
      <!-- 内容块 -->
      <section class="block block-text-video">
        <h2>产品信息</h2>
        <div class="row">
          <div class="field">
            <label>产品编码：</label>
            <span>{{slaughterInfo.productEncoding}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>产品名称：</label>
            <span>{{slaughterInfo.productName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>产品重量：</label>
            <span>{{slaughterInfo.productWeight}}</span>
          </div>
          <div class="field produce">
            <label class="produceTime">出品时间：</label>
            <span>{{slaughterInfo.divisionTime}}</span>
          </div>
        </div>
        <div class="video">
          <el-carousel trigger="click" height="400px" indicator-position="outside">
            <el-carousel-item v-for="item in slaPictures" :key="item">
              <div>
                <img class="carouselImg" :src="item" alt @click="watchBigPic(item,'产品图像')" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- <div class="video">
        <video
          id="factoryVideo"
          controls="controls"
          muted="muted"
          loop="loop"
          :src="slaughterSheepPics[0]"
          />
        </div>-->
      </section>
      <!-- 内容块 -->
      <section class="block block-gjzs">
        <h2>资质证书</h2>
        <div class="content">
          <span
            v-for="(item,index) in auPictureOfSlaught"
            @click="watchBigPic(item.url,item.name)"
            :key="index"
          >
            <img v-if="item" :src="item.url" />
            <span class="cer-description">{{item.name}}</span>
          </span>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-sc">
        <h2>生产档案</h2>
        <div class="content">
          <div class="items items-1">
            <div class="item" @click="open(modules[0].name,modules[0].id)">
              <a class="value">优</a>
              <a class="text">
                <b>系谱</b>
              </a>
            </div>
            <div class="item" @click="open(modules[1].name,modules[1].id)">
              <a class="value">良</a>
              <a class="text">
                <b>福利</b>
              </a>
            </div>
          </div>
          <div class="items items-2">
            <div class="item" @click="open(modules[2].name,modules[2].id)">
              <a class="value">中</a>
              <a class="text">
                <b>消毒</b>
              </a>
            </div>
            <div class="item" @click="open(modules[3].name,modules[3].id)">
              <a class="value">优</a>
              <a class="text">
                <b>防疫</b>
              </a>
            </div>
          </div>
          <div class="items items-3">
            <div class="item" @click="open(modules[4].name,modules[4].id)">
              <a class="value">良</a>
              <a class="text">
                <b>驱虫</b>
              </a>
            </div>
            <div class="item" @click="open(modules[5].name,modules[5 ].id)">
              <a class="value">优</a>
              <a class="text">
                <b>营养</b>
              </a>
            </div>
          </div>
          <div class="items items-4">
            <div class="item" @click="open(modules[6].name,modules[6].id)">
              <a class="value">优</a>
              <a class="text">
                <b>配种</b>
              </a>
            </div>
            <div class="item" @click="open(modules[7].name,modules[7].id)">
              <a class="value">优</a>
              <a class="text">
                <b>疾病</b>
              </a>
            </div>
          </div>
          <div class="items items-5">
            <div class="item" @click="open2(modules[8].name,modules[8].id)">
              <a class="value">优</a>
              <a class="text">
                <b>检疫</b>
              </a>
            </div>
            <div class="item" @click="open2(modules[9].name,modules[9].id)">
              <a class="value">中</a>
              <a class="text">
                <b>宰前</b>
              </a>
            </div>
            <div class="item slaughter" @click="open2(modules[10].name,modules[10].id)">
              <a class="value">良</a>
              <a class="text">
                <b>屠宰</b>
              </a>
            </div>
          </div>
          <div class="items items-6">
            <div class="item" @click="open2(modules[11].name,modules[11].id)">
              <a class="value">中</a>
              <a class="text">
                <b>分割</b>
              </a>
            </div>
            <div class="item" @click="open2(modules[12].name,modules[12].id)">
              <a class="value">优</a>
              <a class="text">
                <b>运输</b>
              </a>
            </div>
          </div>
          <div class="items items-7">
            <div class="item" @click="open2(modules[13].name,modules[13].id)">
              <a class="value">优</a>
              <a class="text">
                <b>终端</b>
              </a>
            </div>
          </div>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yzhjzs">
        <h2>养殖环境追溯</h2>
        <div class="content">
          <span @click="open('air',11)">
            <img src="../assets/imgs/mobile/yzhjzs/1.png" />
            <label>空气</label>
          </span>
          <span @click="open('wat',10)">
            <img src="../assets/imgs/mobile/yzhjzs/2.png" />
            <label>水</label>
          </span>
          <span @click="open('soi',9)">
            <img src="../assets/imgs/mobile/yzhjzs/3.png" />
            <label>土壤</label>
          </span>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yhpj">
        <div class="content">
          <h4>平台评级</h4>
          <div class="stars">
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" />
          </div>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yhpj">
        <h2>用户评级</h2>
        <div class="content">
          <h4>屠宰端评级：</h4>
          <div class="stars">
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" />
          </div>
        </div>
        <div class="goodOrIssue">
          <a @click="goodSuccess">
            点赞
            <font-awesome-icon icon="thumbs-up" />
          </a>
          <a @click="openissue">
            投诉
            <font-awesome-icon icon="question" />
          </a>
        </div>
      </section>
    </div>

    <!--终端消费-->
    <div v-if="tabShow===3">
      <section class="block block-text-video">
        <h2>终端店基本信息</h2>
        <div class="row">
          <div class="field">
            <label>终端店名称：</label>
            <span>{{ConsumerInfo.breedName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>负责人：</label>
            <span>{{ConsumerInfo.responsiblePersonName}}</span>
          </div>
          <div class="field">
            <label>电话：</label>
            <span>{{ConsumerInfo.telNumber}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>店面地址：</label>
            <span>{{ConsumerInfo.breedLocation}}</span>
            <a class="map" @click="goMap(3)">
              导航过去
              <font-awesome-icon icon="map-marker" />
            </a>
          </div>
        </div>
        <div class="video">
          <video
            id="factoryVideo"
            autoplay="autoplay"
            controls="controls"
            muted="muted"
            loop="loop"
            :src="consumerFactoryPics ? consumerFactoryPics : `aaa`"
          />
        </div>
      </section>
      <!-- 内容块 -->
      <section v-show="mapVisible" style="height:400px;" class="block block-text-video">
        <b-map
          height="100%"
          ref="bmap3"
          :mobile="true"
          :longitude="ConsumerInfo.longitude"
          :latitude="ConsumerInfo.latitude"
        ></b-map>
      </section>
      <section class="block block-text-video">
        <h2>产品信息</h2>
        <div class="row">
          <div class="field">
            <label>产品编码：</label>
            <span>{{ConsumerInfo.number}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>产品名称：</label>
            <span>{{ConsumerInfo.productName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label>羊肉用量：</label>
            <span>{{ConsumerInfo.mutton}}</span>
          </div>
          <div class="field produce">
            <label class="produceTime">出品时间：</label>
            <span>{{ConsumerInfo.outTime}}</span>
          </div>
        </div>
        <div class="video">
          <!-- <video
          id="factoryVideo"
          controls="controls"
          muted="muted"
          loop="loop"
          :src="ConsumerSheepPics[0]"
          />-->
          <el-carousel trigger="click" height="400px" indicator-position="outside">
            <el-carousel-item v-for="item in consumePictures" :key="item">
              <div>
                <img class="carouselImg" :src="item" alt @click="watchBigPic(item,'产品图像')" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-gjzs">
        <h2>资质证书</h2>
        <div class="content">
          <span
            v-for="(item,index) in auPictureOfConsumer"
            @click="watchBigPic(item.url,item.name)"
            :key="index"
          >
            <img v-if="item" :src="item.url" />
            <span class="cer-description">{{item.name}}</span>
          </span>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-sc">
        <h2>生产档案</h2>
        <div class="content">
          <div class="items items-1">
            <div class="item" @click="open(modules[0].name,modules[0].id)">
              <a class="value">优</a>
              <a class="text">
                <b>系谱</b>
              </a>
            </div>
            <div class="item" @click="open(modules[1].name,modules[1].id)">
              <a class="value">良</a>
              <a class="text">
                <b>福利</b>
              </a>
            </div>
          </div>
          <div class="items items-2">
            <div class="item" @click="open(modules[2].name,modules[2].id)">
              <a class="value">中</a>
              <a class="text">
                <b>消毒</b>
              </a>
            </div>
            <div class="item" @click="open(modules[3].name,modules[3].id)">
              <a class="value">优</a>
              <a class="text">
                <b>防疫</b>
              </a>
            </div>
          </div>
          <div class="items items-3">
            <div class="item" @click="open(modules[4].name,modules[4].id)">
              <a class="value">良</a>
              <a class="text">
                <b>驱虫</b>
              </a>
            </div>
            <div class="item" @click="open(modules[5].name,modules[5 ].id)">
              <a class="value">优</a>
              <a class="text">
                <b>营养</b>
              </a>
            </div>
          </div>
          <div class="items items-4">
            <div class="item" @click="open(modules[6].name,modules[6].id)">
              <a class="value">优</a>
              <a class="text">
                <b>配种</b>
              </a>
            </div>
            <div class="item" @click="open(modules[7].name,modules[7].id)">
              <a class="value">优</a>
              <a class="text">
                <b>疾病</b>
              </a>
            </div>
          </div>
          <div class="items items-5">
            <div class="item" @click="open2(modules[8].name,modules[8].id)">
              <a class="value">优</a>
              <a class="text">
                <b>检疫</b>
              </a>
            </div>
            <div class="item" @click="open2(modules[9].name,modules[9].id)">
              <a class="value">中</a>
              <a class="text">
                <b>宰前</b>
              </a>
            </div>
            <div class="item slaughter" @click="open2(modules[10].name,modules[10].id)">
              <a class="value">良</a>
              <a class="text">
                <b>屠宰</b>
              </a>
            </div>
          </div>
          <div class="items items-6">
            <div class="item" @click="open2(modules[11].name,modules[11].id)">
              <a class="value">中</a>
              <a class="text">
                <b>分割</b>
              </a>
            </div>
            <div class="item" @click="open2(modules[12].name,modules[12].id)">
              <a class="value">优</a>
              <a class="text">
                <b>运输</b>
              </a>
            </div>
          </div>
          <div class="items items-7">
            <div class="item" @click="open2(modules[13].name,modules[13].id)">
              <a class="value">优</a>
              <a class="text">
                <b>终端</b>
              </a>
            </div>
          </div>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yzhjzs">
        <h2>养殖环境追溯</h2>
        <div class="content">
          <span @click="open('air',11)">
            <img src="../assets/imgs/mobile/yzhjzs/1.png" />
            <label>空气</label>
          </span>
          <span @click="open('wat',10)">
            <img src="../assets/imgs/mobile/yzhjzs/2.png" />
            <label>水</label>
          </span>
          <span @click="open('soi',9)">
            <img src="../assets/imgs/mobile/yzhjzs/3.png" />
            <label>土壤</label>
          </span>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yhpj">
        <div class="content">
          <h3>平台评级</h3>
          <div class="stars">
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" />
          </div>
        </div>
      </section>
      <!-- 内容块 -->
      <section class="block block-yhpj">
        <h2>用户评级</h2>
        <div class="content">
          <h4>消费端评级：</h4>
          <div class="stars">
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" class="active" />
            <font-awesome-icon icon="star" />
          </div>
        </div>
        <div class="goodOrIssue">
          <a @click="goodSuccess">
            点赞
            <font-awesome-icon icon="thumbs-up" />
          </a>
          <a @click="openissue">
            投诉
            <font-awesome-icon icon="question" />
          </a>
        </div>
      </section>
    </div>

    <el-dialog title="投诉" :visible.sync="issue" width="800px" :show-close="true" height="800px">
      <el-form :model="complaint" style="width:100%">
        <el-col :span="24">
          <el-form-item label="投诉事项" :label-width="formLabelWidth">
            <el-input type="textarea" :rows="4" v-model="complaint.thing"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="投诉对象" :label-width="formLabelWidth">
            <el-input v-model="complaint.o"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="投诉人" :label-width="formLabelWidth">
            <el-input v-model="complaint.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="complaint.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="complaintSubmit">提 交</el-button>
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
        <span @click="close('gen')" class="btn_close">关闭</span>
      </div>
      <record-table type="table" title="系谱档案" :data="genData"></record-table>
    </el-dialog>
    <!-- 福利 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.san"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('san')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="welData" style="width: 100%">
          <el-table-column prop="checkTime" label="自检/主管上级检查时间" width="180"></el-table-column>
          <el-table-column prop="colonyHouse" label="圈舍内外是否合格"></el-table-column>
          <el-table-column prop="warehouseWorkshop" label="饲料库房及加工车间是否合格"></el-table-column>
          <el-table-column prop="killWormDeratization" label="杀虫灭鼠是否合格"></el-table-column>
          <el-table-column prop="sterilizingRoom" label="消毒制度是否执行"></el-table-column>
          <el-table-column prop="operation" label="是否赤手操作"></el-table-column>
          <el-table-column prop="needleSheep" label="是否一羊一针头"></el-table-column>
          <el-table-column prop="vaccine" label="疫苗及针头的消毒处理是否合格"></el-table-column>
          <el-table-column prop="safetyProtection" label="是否做到人员安全防护是否合格"></el-table-column>
          <el-table-column prop="rubbishWater" label="实验室垃圾与排水是否无害化处理"></el-table-column>
          <el-table-column prop="rubbishWater" label="是否遵守操作规范"></el-table-column>
          <el-table-column prop="airTemperature" label="羊舍空气与温度是否合格"></el-table-column>
          <el-table-column prop="exerciseDaylighting" label="羊只运动与采光是否合格"></el-table-column>
          <el-table-column prop="carDisinfect" label="车辆进出是否消毒"></el-table-column>
          <el-table-column prop="professorName" label="技术审核"></el-table-column>
          <el-table-column prop="ispassCheck" label="审核状态"></el-table-column>
          <el-table-column prop="upassReason" label="审核拒绝原因" width="140"></el-table-column>
          <el-table-column prop="supervisorName" label="监督执行"></el-table-column>
          <el-table-column prop="ispassSup" label="监督执行状态"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名称"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 消毒 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.dis"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('dis')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="disData" style="width: 100%">
          <el-table-column prop="disinfectTime" label="消毒时间" width="180"></el-table-column>
          <el-table-column prop="disinfectName" label="消毒药名称" width="180"></el-table-column>
          <el-table-column prop="dose" label="用药剂量"></el-table-column>
          <el-table-column prop="disinfectWay" label="消毒方法"></el-table-column>
          <el-table-column prop="professor" label="技术审核"></el-table-column>
          <el-table-column prop="ispassCheck" label="审核状态"></el-table-column>
          <el-table-column prop="upassReason" label="审核拒绝原因" width="140"></el-table-column>
          <el-table-column prop="supervisor" label="监督执行"></el-table-column>
          <el-table-column prop="ispassSup" label="监督执行状态"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名称"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 防疫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.imm"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('imm')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="immData" style="width: 100%">
          <el-table-column prop="immuneTime" label="接种时间" width="180"></el-table-column>
          <el-table-column prop="immuneKind" label="免疫种类"></el-table-column>
          <el-table-column prop="immuneWay" label="接种方法"></el-table-column>
          <el-table-column prop="dose" label="接种剂量"></el-table-column>
          <el-table-column prop="immuneDuring" label="免疫期"></el-table-column>
          <el-table-column prop="professor" label="技术审核"></el-table-column>
          <el-table-column prop="ispassCheck" label="审核状态"></el-table-column>
          <el-table-column prop="upassReason" label="审核拒绝原因" width="140"></el-table-column>
          <el-table-column prop="supervisor" label="监督执行"></el-table-column>
          <el-table-column prop="ispassSup" label="监督执行状态" width="110"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名称" width="110"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 驱虫 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.exp"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('exp')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="expData" style="width: 100%">
          <el-table-column prop="repellentTime" label="驱虫时间"></el-table-column>
          <el-table-column prop="repellentName" label="药物名称"></el-table-column>
          <el-table-column prop="repellentWay" label="给药途径"></el-table-column>
          <el-table-column prop="dose" label="给药剂量"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="professor" label="技术审核"></el-table-column>
          <el-table-column prop="ispassCheck" label="审核状态"></el-table-column>
          <el-table-column prop="upassReason" label="审核拒绝原因" width="140"></el-table-column>
          <el-table-column prop="supervisor" label="监督执行"></el-table-column>
          <el-table-column prop="ispassSup" label="监督执行状态" width="110"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名称" width="110"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 营养 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.nut"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('nut')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="nutData" style="width: 100%">
          <el-table-column prop="nutritionT" label="营养时间" width="180"></el-table-column>
          <el-table-column prop="period" label="阶段"></el-table-column>
          <el-table-column prop="water" label="水"></el-table-column>
          <el-table-column prop="materialA" label="添加剂"></el-table-column>
          <el-table-column prop="materialM" label="精料"></el-table-column>
          <el-table-column prop="materialO" label="其他"></el-table-column>
          <el-table-column prop="materialWM" label="精料用量（体重%）精料"></el-table-column>
          <el-table-column prop="materialWO" label="精料用量（体重%）其他"></el-table-column>
          <el-table-column prop="roughageP" label="粗饲料配方（%）青料"></el-table-column>
          <el-table-column prop="roughageD" label="粗饲料配方（%）干料"></el-table-column>
          <el-table-column prop="roughageO" label="粗饲料配方（%）其他"></el-table-column>
          <el-table-column prop="roughageWP" label="粗饲料用量（体重%）青料"></el-table-column>
          <el-table-column prop="roughageWD" label="粗饲料用量（体重%）干料"></el-table-column>
          <el-table-column prop="roughageWO" label="粗饲料用量（体重%）其他"></el-table-column>
          <el-table-column prop="professorName" label="技术审核"></el-table-column>
          <el-table-column prop="ispassCheck" label="审核状态"></el-table-column>
          <el-table-column prop="upassReason" label="审核拒绝原因"></el-table-column>
          <el-table-column prop="supervisorName" label="监督执行"></el-table-column>
          <el-table-column prop="ispassSup" label="监督执行状态" width="110"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名称" width="110"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 疾病防治 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.dea"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('dea')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="deaData" style="width: 100%">
          <el-table-column prop="diagnosisTime" label="记录时间" width="180"></el-table-column>
          <el-table-column prop="symptom" label="症状"></el-table-column>
          <el-table-column prop="diagnosisResult" label="诊断结果" width="180"></el-table-column>
          <el-table-column prop="diagnosisMethod" label="治疗方案及用药剂量"></el-table-column>
          <el-table-column prop="dose" label="总用药量"></el-table-column>
          <el-table-column prop="treatEffect" label="治疗效果"></el-table-column>
          <el-table-column prop="gmtSup" label="监督员审核时间"></el-table-column>
          <el-table-column prop="factoryNum" label="羊场id"></el-table-column>
          <el-table-column prop="professorName" label="技术审核"></el-table-column>
          <el-table-column prop="ispassCheck" label="审核状态"></el-table-column>
          <el-table-column prop="upassReason" label="审核拒绝原因" width="140"></el-table-column>
          <el-table-column prop="supervisorName" label="监督执行"></el-table-column>
          <el-table-column prop="ispassSup" label="监督执行状态" width="110"></el-table-column>
          <el-table-column prop="operatorName" label="操作员名称" width="110"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 配种-->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.bre"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('bre')" class="btn_close">关闭</span>
      </div>
      <div class="dialog_table">
        <el-table :data="breData" style="width: 100%">
          <el-table-column prop="breedingTime" label="配种时间" width="180"></el-table-column>
          <el-table-column prop="buildingAfterBreeding" label="配种后移至栏栋"></el-table-column>
          <el-table-column prop="ramSheepTrademark" label="公羊耳牌号"></el-table-column>
          <el-table-column prop="eweSheepTrademark" label="母羊耳牌号"></el-table-column>
          <el-table-column prop="manageFlag" label="管理批次"></el-table-column>
          <el-table-column prop="manageAverageTime" label="批次平均配种时间"></el-table-column>
          <el-table-column prop="nutritionBeforePregnancy" label="妊娠前期营养标准"></el-table-column>
          <el-table-column prop="isPregnancy" label="确定妊娠"></el-table-column>
          <el-table-column prop="nutritionAfterPregnancy" label="妊娠后期营养标准"></el-table-column>
          <el-table-column prop="prenatalImmunityType" label="产前疫苗种类"></el-table-column>
          <el-table-column prop="prenatalImmunityTime" label="产前免疫时间"></el-table-column>
          <el-table-column prop="buildingToBeRelocated" label="待移至栏栋"></el-table-column>
          <el-table-column prop="nutritionBeforeLambing" label="执行产期营养标准"></el-table-column>
          <el-table-column prop="lambingTime" label="产羔时间"></el-table-column>
          <el-table-column prop="lambingNumber" label="产羔数量"></el-table-column>
          <el-table-column prop="averageTime" label="批次平均产羔时间"></el-table-column>
          <el-table-column prop="nutritionBreastFeeding" label="执行哺乳期营养标准(产后一周)"></el-table-column>
          <el-table-column prop="nutritionInsteadBreastFeeding" label="执行羔羊代乳料营养标准(羔羊一月龄)"></el-table-column>
          <el-table-column prop="nutritionBeforeCutBreastFeeding" label="执行羔羊断奶期营养标准-序号:"></el-table-column>
          <el-table-column prop="nutritionCutBreastFeeding" label="执行羔羊断奶期营养标准-序号:"></el-table-column>
          <el-table-column prop="professorName" label="审核专家"></el-table-column>
          <el-table-column prop="ispassCheck" label="是否通过专家审核"></el-table-column>
          <el-table-column prop="supervisorName" label="监督员姓名"></el-table-column>
          <el-table-column prop="ispassSup" label="是否通过专家审核"></el-table-column>
          <el-table-column prop="ispassSup" label="是否通过监督员审核"></el-table-column>
          <el-table-column prop="operatorName" label="操作员姓名"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="factoryNumber" label="羊场编号"></el-table-column>
          <el-table-column prop="factoryName" label="羊场名称"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.air"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('air')" class="btn_close">关闭</span>
      </div>
      <el-table :data="airData" style="width: 100%">
        <el-table-column prop="time" label="日期" width="205px"></el-table-column>
        <el-table-column prop="pm" label="PM2.5" width="205px"></el-table-column>
        <el-table-column prop="pmReturn" label="状态" width="205px"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.wat"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('wat')" class="btn_close">关闭</span>
      </div>
      <el-table :data="watData" style="width: 100%">
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="ph" label="PH值"></el-table-column>
        <el-table-column prop="phReturn" label="PH值状态"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.soi"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('soi')" class="btn_close">关闭</span>
      </div>
      <el-table :data="soiData" style="width: 100%">
        <el-table-column prop="time" label="日期" width="120px"></el-table-column>
        <el-table-column prop="tempSoil" label="温度" width="120px"></el-table-column>
        <el-table-column prop="tempSoilReturn" label="温度状态" width="120px"></el-table-column>
        <el-table-column prop="humSoil" label="湿度" width="120px"></el-table-column>
        <el-table-column prop="humSoilReturn" label="湿度状态" width="120px"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      :title="bigPic.name"
      :visible.sync="dialogBigPicVisible"
      style="margin-top:-50px"
      width="50%"
      center
    >
      <!-- FIXME: video 标签兼容性处理 -->
      <div class="show-detail">
        <img class="production-image-detail" :src="bigPic.url" />
      </div>
      <div class="show-list">
        <ul>
          <li>
            <el-tag>图片类型</el-tag>
            {{ bigPic.name }}
          </li>
        </ul>
      </div>
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
      <record-table type="table" title="检疫档案" :data="checkData"></record-table>
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
      <record-table type="table" title="宰前档案" :data="befslaData"></record-table>
      <!-- <el-table
            :data="befslaData"
            style="width: 100%">
            <el-table-column
              prop="trademarkEarTag"
              label="商标耳牌号"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="breedFactory"
              label="来自养殖场"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="sheepType"
              label="羊只品类"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="weight"
              label="重量"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="age"
              label="月龄"
              width='120px'>
            </el-table-column>
      </el-table>-->
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
      <record-table type="table" title="屠宰档案" :data="slaData"></record-table>
      <!-- <el-table
            :data="slaData"
            style="width: 100%">
            <el-table-column
              prop="fatherNumber"
              label="商标耳牌号"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="slaughterTime"
              label="屠宰时间"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="appendageNumber"
              label="附属物编号"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="appendageWeight"
              label="附属物重量"
              width='120px'>
            </el-table-column>
            <el-table-column
              label="附属物视频"
              width='120px'>
              <template slot-scope="scope">
                    <div class="opr" >
                        <span @click="mediaWatch(scope)">查看</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
              prop="kidNumber"
              label="胴体编号"
              width='120px'>
            </el-table-column>
            <el-table-column
              prop="kidWeight"
              label="胴体重量"
              width='120px'>
            </el-table-column>
            <el-table-column
              label="胴体视频"
              width='120px'>
              <template slot-scope="scope">
                  <div class="opr" >
                      <span @click="mediaWatch(scope)">查看</span>
                  </div>
              </template>
            </el-table-column>
      </el-table>-->
    </el-dialog>

    <!-- 分割表格情况 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.segm2"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('segm2')" class="btn_close">关闭</span>
      </div>
      <record-table type="table" title="分割" :data="segmData"></record-table>
    </el-dialog>

    <!-- 分割列表情况 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.segm"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('segm')" class="btn_close">关闭</span>
      </div>
      <el-table :data="segmData" style="width: 100%">
        <el-table-column prop="partNumber" label="部件编号" width="120px"></el-table-column>
        <el-table-column prop="partName" label="部件名称" width="120px"></el-table-column>
        <el-table-column prop="weight" label="重量(公斤)" width="120px"></el-table-column>
        <el-table-column prop="price" label="价格(元)" width="120px"></el-table-column>
        <el-table-column prop="breedName" label="养殖场" width="120px"></el-table-column>
        <el-table-column prop="responsiblePersonName" label="货主" width="120px"></el-table-column>
        <el-table-column prop="responsiblePersonPhone" label="联系电话" width="120px"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 运输表格情况 -->

    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.trans2"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('trans2')" class="btn_close">关闭</span>
      </div>
      <record-table type="table" title="运输" :data="transData"></record-table>
    </el-dialog>

    <!-- 运输列表情况 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.trans"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('trans')" class="btn_close">关闭</span>
      </div>
      <el-table :data="transData" style="width: 100%">
        <el-table-column prop="customerName" label="客户单位名称" width="120px"></el-table-column>

        <el-table-column prop="sumWeight" label="总重量(公斤)" width="120px"></el-table-column>

        <el-table-column prop="partNumber" label="部件编码" width="120px"></el-table-column>

        <el-table-column prop="numberPlate" label="车牌号" width="120px"></el-table-column>

        <el-table-column prop="driverName" label="司机名称" width="120px"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 终端表格情况 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.end2"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('end2')" class="btn_close">关闭</span>
      </div>
      <record-table type="table" title="终端" :data="endData"></record-table>
    </el-dialog>

    <!-- 终端列表情况 -->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="dialog.end"
      width="800px"
      :show-close="false"
    >
      <div class="dialog_btn">
        <span @click="close('end')" class="btn_close">关闭</span>
      </div>
      <el-table :data="endData" style="width: 100%">
        <el-table-column prop="partNumber" label="成品编号" width="120px"></el-table-column>
        <el-table-column prop="dishesName" label="成品名称" width="120px"></el-table-column>
        <el-table-column label="成品分量" width="120px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.muttonConsumption }}克/份</span>
          </template>
        </el-table-column>
        <el-table-column prop="outBoundTime" label="时间" width="120px"></el-table-column>
        <el-table-column label="图片" width="120px">
          <template slot-scope="scope">
            <div class="opr">
              <span @click="mediaWatchPic(scope)">查看</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- <el-dialog
        title="产品地址"
        :visible.sync="mapVisible"
        style="margin-top:-50px"
        width="50%"
        center
        >
  <div class='bmap'></div>
    <b-map height='100%' :longitude = 'sheepInfo.longitude' :latitude = 'sheepInfo.latitude'></b-map>

    </el-dialog>-->
    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="noSheep"
      width="800px"
      :show-close="false"
    >
      <span style="margin-top:30px;font-size:30px;">没有该羊信息！</span>
    </el-dialog>

    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="goodRatingVisible"
      width="800px"
      :show-close="false"
    >
      <span style="margin-top:30px;font-size:30px;">点赞成功，感谢您对我们的肯定!</span>
    </el-dialog>

    <el-dialog
      custom-class="mod_search_dialog"
      :visible.sync="noGenDataVisible"
      width="800px"
      :show-close="false"
    >
      <span style="margin-top:30px;font-size:30px;">未建立系谱，请完善！</span>
    </el-dialog>

    <!-- <el-dialog
        title="视频"
        :visible.sync="mediaVisible"
        width="80%">
        <div class="show-detail">
            <video :src="mediaUrl" class="production-video" controls="controls" height="500" width="500"></video>
        </div>
    </el-dialog>-->

    <!-- <el-dialog
        title="车辆照片"
        :visible.sync="mediaPicVisible"
        width="80%">
        <div class="show-detail">
            <img  class="production-image-detail" :src="mediaUrl" :onerror="defaultImg">
        </div>
    </el-dialog>-->
    <el-dialog title="照片" :visible.sync="mediaPicVisible" width="40%">
      <div class="show-detail">
        <img class="production-image-detail" :src="mediaUrl" :onerror="defaultImg" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BMap from "./map";
import RecordTable from "./table";
import QRCode from "qrcodejs2";
import {
  getSheepInfo,
  getSlaughterInfoByearTag,
  getConsumerInfoByearTag,
  getPicOfTrace
} from "@/util/getdata";
import { getTraceInfo, getTraceAfterSlaughterInfo } from "@/util/getdata";
import { getAuPicture } from "@/util/getdata";
import { getSheepVideo } from "@/util/getdata";
import { getFactoryVideo } from "@/util/getdata";
export default {
  data() {
    return {
      mapVisible: false,
      location: window.location.href,
      newBodyHeight: null,
      auPicture: [],
      auPictureOfSlaught: [],
      auPictureOfConsumer: [],
      autoplay1: false,
      autoplay2: false,
      autoplay3: false,
      bigPic: {
        url: null,
        name: null
      },
      noGenDataVisible: false,
      intervalTime: 30000,
      isAutoPlay: true,
      dialogBigPicVisible: false,
      issue: false,
      value5: 3.7,
      currentName: "first",
      //商品羊信息
      sheepInfo: {
        name: "",
        breedName: "",
        arriveTime: "",
        telNumber: "",
        breedLocation: "",
        longitude: "",
        latitude: "",
        responsiblePersonName: ""
      },
      slaughterInfo: {
        name: "",
        breedName: "",
        arriveTime: "",
        telNumber: "",
        breedLocation: "",
        longitude: "",
        latitude: ""
      },
      ConsumerInfo: {
        name: "",
        breedName: "",
        arriveTime: "",
        telNumber: "",
        breedLocation: "",
        longitude: "",
        latitude: ""
      },
      slaughterFactoryPics: null,
      consumerFactoryPics: null,
      // slaughterSheepPics:[],
      // ConsumerSheepPics:[],
      defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
      mediaVisible: false,
      mediaPicVisible: false,
      noSheep: false,
      qrcodeimg: null,
      videoUrl: null,
      isActive: true,
      isActive2: false,
      isActive3: false,
      tabShow: 1,
      //走马灯图片
      pics: [],
      //左侧展开的选项
      activeNames: ["1", "2", "3", "4"],
      //右侧展开的选项
      activeNames2: ["1", "2", "3"],
      //商品 企业标签名
      info: [
        {
          label: "商品羊信息",
          children: [
            {
              label: "商品介绍"
            }
          ]
        }
      ],
      mediaUrl: null,
      //输入值
      key: null,
      //公司照片
      companyPhoto: "/static/chang1.png",
      // 溯源码
      code: "",
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
        befsla: false,
        sla: false,
        segm: false,
        trans: false,
        end: false
      },
      tab_san: "first",
      tab_nut: "first",
      checkData: [
        // 检疫
        {
          name: "tradeMarkEarTag",
          fieldName: "商标耳牌号",
          fieldValue: "",
          size: "large"
        },
        {
          name: "immuneEarTag",
          fieldName: "免疫耳牌号",
          fieldValue: "",
          size: "large"
        },
        {
          name: "immuneCertified",
          fieldName: "检疫合格证号",
          fieldValue: "",
          size: "large"
        },
        {
          name: "breedFactory",
          fieldName: "来源养殖场",
          fieldValue: "",
          size: "large"
        }
      ],
      genData: [
        //系谱
        {
          name: "tradeMarkEartag",
          fieldName: "商标耳牌",
          fieldValue: "M004527"
        },
        {
          name: "breedingSheepBase",
          fieldName: "种羊基地",
          fieldValue: "贵州省铜仁市沿河土家族自治县东翔牧业"
        },
        {
          name: "birthTime",
          fieldName: "初登时间",
          fieldValue: "2018-01-13 16:24:25"
        },
        { name: "birthWeight", fieldName: "初登体重", fieldValue: "7.3" },
        { name: "color", fieldName: "颜色", fieldValue: "黑" },
        {
          name: "sex",
          fieldName: "性别",
          fieldValue: 0,
          type: "radio",
          label: ["公羊", "母羊"]
        },
        { name: "eartagOfFather", fieldName: "父号", fieldValue: "G104559" },
        { name: "eartagOfMother", fieldName: "母号", fieldValue: "M102112" },
        {
          name: "eartagOfFathersFather",
          fieldName: "父父号",
          fieldValue: "G203654"
        },
        {
          name: "eartagOfFathersMother",
          fieldName: "父母号",
          fieldValue: "M108850"
        },
        {
          name: "eartagOfMothersFather",
          fieldName: "母父号",
          fieldValue: "G106512"
        },
        {
          name: "eartagOfMothersMother",
          fieldName: "母母号",
          fieldValue: "M602211"
        },
        {
          name: "typeName",
          fieldName: "品种名",
          fieldValue: "黑山羊",
          size: "large"
        },
        { name: "remark", fieldName: "备注", fieldValue: "", size: "large" }
      ],
      befslaData: [
        //宰前
        {
          name: "trademarkEarTag",
          fieldName: "商标耳牌号",
          fieldValue: "",
          size: "large"
        },
        {
          name: "weight",
          fieldName: "重量(公斤)",
          fieldValue: "",
          size: "large"
        },
        { name: "time", fieldName: "时间", fieldValue: "", size: "large" }
      ],
      slaData: [
        //屠宰
        {
          name: "fatherNumber",
          fieldName: "商标耳牌号",
          fieldValue: "",
          size: "large"
        },
        {
          name: "carcassProductEncoding",
          fieldName: "胴体编码",
          fieldValue: "",
          size: "large"
        },
        {
          name: "kidWeight",
          fieldName: "胴体重量(公斤)",
          fieldValue: "",
          size: "large"
        },
        {
          name: "carcassTime",
          fieldName: "操作时间",
          fieldValue: "",
          size: "large"
        },
        {
          name: "accessoriesProductEncoding",
          fieldName: "附属物编码",
          fieldValue: "",
          size: "large"
        },
        {
          name: "appendageWeight",
          fieldName: "附属物重量(公斤)",
          fieldValue: "",
          size: "large"
        },
        {
          name: "accessoriesTime",
          fieldName: "操作时间",
          fieldValue: "",
          size: "large"
        }
      ],
      segmData: [
        // 分割
        { name: "partNumber", fieldName: "部件编号", fieldValue: "" },
        { name: "partName", fieldName: "部件名称", fieldValue: "" },
        { name: "weight", fieldName: "重量(公斤)", fieldValue: "" },
        { name: "price", fieldName: "价格(元)", fieldValue: "" },
        { name: "responsiblePersonName", fieldName: "货主", fieldValue: "" },
        {
          name: "responsiblePersonPhone",
          fieldName: "联系电话",
          fieldValue: ""
        },
        {
          name: "breedName",
          fieldName: "养殖场",
          fieldValue: "",
          size: "large"
        }
      ],
      transData: [
        // 运输
        { name: "customerName", fieldName: "客户单位名称", fieldValue: "" },
        { name: "sumWeight", fieldName: "总重量(公斤)", fieldValue: "" },
        { name: "partNumber", fieldName: "部件编码", fieldValue: "" },
        { name: "numberPlate", fieldName: "车牌号", fieldValue: "" },
        { name: "driverName", fieldName: "司机名称", fieldValue: "" }
      ],
      endData: [
        // 终端
        { name: "partNumber", fieldName: "成品编码", fieldValue: "" },
        { name: "dishesName", fieldName: "成品名称", fieldValue: "" },
        {
          name: "muttonConsumption",
          fieldName: "成品分量(克/份)",
          fieldValue: ""
        },
        { name: "outBoundTime", fieldName: "时间", fieldValue: "" }
      ],
      welData: [
        // 福利信息
      ],
      disData: [
        // 消毒信息
      ],
      immData: [
        // 防疫信息
      ],
      expData: [
        // 驱虫信息
      ],
      nutData: [
        // 营养信息
      ],
      deaData: [
        // 疾病防治
      ],
      breData: [
        // 配种产子
      ],
      airData: [{}],
      watData: [{}],
      soiData: [{}],
      item: {},
      companyInfo: [
        { label: "单位名称", model: "name" },
        { label: "负责人/法人", model: "person" },
        { label: "联系方式", model: "phone" },
        { label: "认证状态", model: "status" },
        { label: "认证时间", model: "time" },
        { label: "单位简介", model: "intro" }
      ],

      modules: [
        { icon: "smile", text: "系谱", name: "gen", id: "1" },
        { icon: "smile", text: "福利", name: "san", id: "2" },
        { icon: "smile", text: "消毒", name: "dis", id: "3" },
        { icon: "smile", text: "防疫", name: "imm", id: "4" },
        { icon: "smile", text: "驱虫", name: "exp", id: "5" },
        { icon: "smile", text: "营养", name: "nut", id: "6" },
        { icon: "smile", text: "疾病", name: "dea", id: "7" },
        { icon: "smile", text: "配种", name: "bre", id: "8" },
        { icon: "smile", text: "检疫", name: "check", id: "20" },
        { icon: "smile", text: "宰前", name: "befsla", id: "21" },
        { icon: "smile", text: "屠宰", name: "sla", id: "22" },
        { icon: "smile", text: "分割", name: "segm", id: "23" },
        { icon: "smile", text: "运输", name: "trans", id: "24" },
        { icon: "smile", text: "终端", name: "end", id: "25" }
      ],
      reports: [
        { text: "土壤检测报告" },
        { text: "水质检测报告" },
        { text: "ISO质量管理体系认证" },
        { text: "食品流通许可证" },
        { text: "ISO食品安全管理体系认证" },
        { text: "空气检测报告" },
        { text: "营养检测报告" }
      ],
      tab: "first",
      docStr: null,
      goodRatingVisible: false,
      complaint: {
        o: null,
        name: null,
        tel: null,
        thing: null
      },
      formLabelWidth: "70px",
      slaPictures: [],
      consumePictures: []
    };
  },
  created() {
    if (this.$route.path != "/ms" || this.$route.path != "/mS") {
      this.code = this.$route.path.slice(4, 11);
    }
    if (this.$route.path == "/ms" || this.$route.path == "/mS") {
      this.code = this.$route.query.eT || "G400457";
    }
    getPicOfTrace(this.code).then(res => {
      console.log(res.data);
      let data = res.data.lists;
      if (res.meta.code === 0) {
        for (let i in data) {
          if (typeof data[i] == "object") {
            for (let j in data[i]) {
              this.slaPictures.push(data[i][j]);
            }
          } else {
            this.slaPictures.push(data[i]);
          }
        }
        console.log("slaPictures:", this.slaPictures);
      }
    });

    getSheepInfo(this.code).then(re => {
      let info = this.sheepInfo;
      let data = re.data;

      if (data != null) {
        info.name = data.model && data.model.varietyName;
        info.breedName = data.model && data.model.breedName;
        info.arriveTime =
          data.model &&
          data.model.createTime &&
          data.model.createTime.slice(0, 10);
        info.telNumber = data.model && data.model.phone;
        info.breedLocation =
          data.model &&
          data.model.breedLocation + data.model.breedLocationDetail;
        info.longitude = data.model && data.model.longitude;
        info.latitude = data.model && data.model.latitude;
        info.responsiblePersonName =
          data.model && data.model.responsiblePersonName;
        info.trademarkEarTag = data.model && data.model.trademarkEarTag;
        info.color = data.model && data.model.color;
        info.varietyName = data.model && data.model.typeName;
        info.typeName = data.model && data.model.varietyName;
        info.weight = data.model && data.model.weight;
        info.age = data.model && data.model.age;
        console.log("long", info.longitude);
        console.log("latitude", info.latitude);
        let EarTag = {
          tradeMarkEartag: this.code
        };
        getAuPicture(this.code).then(re => {
          re.data.list.forEach(item => {
            let v = {
              url: item.address,
              name: item.certification
            };
            this.auPicture.push(v);
          });
        });
        getSheepVideo("breeding", this.code).then(re => {
          this.pics.push(re.data.url);
        });
        getFactoryVideo("breeding", this.code).then(re => {
          this.videoUrl = re.data.url;
          // video.play().then(()=>{
          // console.log('可以自动播放');
          // }).catch((err)=>{
          //     console.log(err);
          //     console.log("不允许自动播放");
          //     video.muted=true;
          // });
        });
      } else {
        this.noSheep = true;
      }
    });
    getSlaughterInfoByearTag(this.code).then(re => {
      let info = this.slaughterInfo;
      let data = re.data;
      console.log("getSlaughterInfoByearTag:", data);
      console.log(this.code, data);
      if (data != null) {
        info.name = data.factory && data.factory.type;
        info.breedName = data.factory && data.factory.name;
        info.arriveTime = data.factory.date && data.factory.date.slice(0, 10);
        info.telNumber = data.factory && data.factory.charge_person_phone;
        info.breedLocation =
          data.factory &&
          data.factory.simple_address + data.factory.detail_address;
        info.longitude = data.factory && data.factory.longitude;
        info.latitude = data.factory && data.factory.latitude;
        console.log("info:", info);
        console.log("slaughterFactoryPicsfactoryVideo123:", data);
        this.slaughterFactoryPics =
          re.data.factoryVideo && re.data.factoryVideo.pic_address;
        info.responsiblePersonName =
          data.factory && data.factory.responsiblePersonName;
        //如果没有产品信息，则这后面的取不到0，有报错的现象，那么product【0】后面的赋值会被阻塞
        info.productEncoding = data.product && data.product[0].productEncoding;
        info.productName = data.product && data.product[0].productName;
        info.productWeight = data.product && data.product[0].productWeight;
        info.divisionTime = data.product && data.product[0].outTime;
        console.log("long", info.longitude);
        console.log("latitude", info.latitude);
        console.log("productPhoto:", data.productPhoto);

        console.log("slaughterFactoryPics.", this.slaughterFactoryPics);
        // re.data.sheep.forEach((item) => {
        //     this.slaughterSheepPics.push(item.video);
        // })
        re.data.certification.forEach(item => {
          if (item !== null) {
            let v = {
              url: item.pic_address,
              name: item.certification
            };
            this.auPictureOfSlaught.push(v);
          }
        });
      } else {
        // this.$notify.info({
        //   title: '消息',
        //   message: '屠宰端没有该羊信息'
        // });
        return;
      }
    });
    getConsumerInfoByearTag(this.code).then(re => {
      let info = this.ConsumerInfo;
      let data = re.data;
      console.log("getConsumerInfoByearTag.data:", data);
      if (data != null) {
        info.name = data.factory && data.factory.type;
        info.breedName = data.factory && data.factory.name;
        info.arriveTime = data.factory.date && data.factory.date.slice(0, 10);
        info.telNumber = data.factory && data.factory.charge_person_phone;
        info.breedLocation =
          data.factory &&
          data.factory.simple_address + data.factory.detail_address;
        info.longitude = data.factory && data.factory.longitude;
        info.latitude = data.factory && data.factory.latitude;
        info.responsiblePersonName =
          data.factory && data.factory.responsiblePersonName;
        console.log("long", info.longitude);
        console.log("latitude", info.latitude);
        info.number = data.product.number;
        info.productName = data.product.productName;
        info.mutton = data.product.mutton
          ? Number(data.product.mutton) * 1000 + `克/份`
          : data.product.mutton;
        info.outTime = data.product.outTime;
        console.log("consumerFactoryPics:", re.data);
        this.consumePictures.push(data.sheepVideo[0]);
        this.consumerFactoryPics = re.data.factoryVideo.pic_address;
        /*           re.data.sheepVideo.forEach((item) => {
               this.ConsumerSheepPics.push(item);
          }) */
        re.data.certification.forEach(item => {
          if (item !== null) {
            let v = {
              url: item.pic_address,
              name: item.certification
            };
            console.log(v);
            this.auPictureOfConsumer.push(v);
          }
        });
      } else {
        // this.$notify.info({
        //   title: '消息',
        //   message: '消费终端没有该羊信息'
        // });
        return;
      }
    });
  },
  components: {
    BMap,
    RecordTable
  },
  methods: {
    close(name) {
      this.$set(this.dialog, name, false);
    },
    tabChange(id) {
      if (id === 1) {
        this.isActive = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.tabShow = 1;
      } else if (id === 2) {
        this.isActive = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.tabShow = 2;
      } else if (id === 3) {
        this.isActive = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.tabShow = 3;
      }
    },
    mediaWatch(scope) {
      if (scope.column.label == "附属物视频") {
        if (scope.row.appendageVideo !== null) {
          this.mediaUrl = scope.row.appendageVideo;
          console.log(this.mediaUrl);
          this.mediaVisible = true;
        } else {
          this.$message.warning("暂无相关视频！");
        }
      }
      if (scope.column.label == "胴体视频") {
        if (scope.row.kidVideo !== null) {
          this.mediaUrl = scope.row.kidVideo;
          console.log(this.mediaUrl);
          this.mediaVisible = true;
        } else {
          this.$message.warning("暂无相关视频！");
        }
      }
      if (scope.column.label == "分割视频") {
        if (scope.row.video !== null) {
          this.mediaUrl = scope.row.video;
          console.log(this.mediaUrl);
          this.mediaVisible = true;
        } else {
          this.$message.warning("暂无相关视频！");
        }
      }
      if (scope.column.label == "终端视频") {
        if (scope.row.video !== null) {
          this.mediaUrl = scope.row.video;
          console.log(this.mediaUrl);
          this.mediaVisible = true;
        } else {
          this.$message.warning("暂无相关视频！");
        }
      }
    },
    mediaWatchPic(scope) {
      if (scope.row.pictureOfCar) {
        this.mediaUrl = scope.row.pictureOfCar;
        this.mediaPicVisible = true;
      } else if (scope.row.video) {
        this.mediaUrl = scope.row.video;
        console.log(this.mediaUrl);
        this.mediaPicVisible = true;
      } else {
        this.$message.error("暂无相关图片！");
      }
    },
    search() {
      if (!this.key) {
        this.$message({
          message: "请先输入溯源码",
          type: "warning"
        });
        return;
      }
      this.$router.push({ name: "mobileSearch", query: { eT: this.key } });
      this.$emit("searchTo");
    },
    watchBigPic(picUrl, picName) {
      this.dialogBigPicVisible = true;
      this.bigPic.url = picUrl;
      this.bigPic.name = picName;
      this.isAutoPlay = false;
    },
    openissue() {
      this.issue = true;
    },
    open2(name, id) {
      // this.$set(this.dialog, name, true);
      // 检疫
      if (id == 20) {
        id = 6;
        getTraceAfterSlaughterInfo(id, this.code).then(res => {
          this.$set(this.dialog, name, true);
          let data = res.data;
          console.log("chechData:", data);
          this.checkData.forEach(el => {
            if (data.lists.length && data.lists[0].hasOwnProperty(el.name)) {
              el.fieldValue = data.lists[0][el.name];
            }
          });
        });
      }
      // 宰前
      if (id == 21) {
        id = 1;
        getTraceAfterSlaughterInfo(id, this.code).then(res => {
          this.$set(this.dialog, name, true);
          let data = res.data;
          console.log("befslaData:", data);
          this.befslaData.forEach(el => {
            if (data.lists.length && data.lists[0].hasOwnProperty(el.name)) {
              el.fieldValue = data.lists[0][el.name];
            }
          });
        });
      }
      // 屠宰
      else if (id == 22) {
        id = 2;
        getTraceAfterSlaughterInfo(id, this.code).then(res => {
          this.$set(this.dialog, name, true);
          let data = res.data;
          console.log("slaData:", data);
          this.slaData.forEach(el => {
            if (data.lists.length && data.lists[0].hasOwnProperty(el.name)) {
              el.fieldValue = data.lists[0][el.name];
            }
          });
        });
      }
      // 分割
      else if (id == 23) {
        id = 3;
        getTraceAfterSlaughterInfo(id, this.code).then(res => {
          let code = this.code;
          let data = res.data.lists;
          if (data.length > 1) {
            this.$set(this.dialog, name, true);
            this.segmData = [];
            data.forEach(item => {
              item.fatherNumber = code;
              this.segmData.push(item);
            });
          } else {
            this.$set(this.dialog, `${name}2`, true);
            this.segmData.forEach(el => {
              if (data[0].hasOwnProperty(el.name)) {
                el.fieldValue = data[0][el.name];
              }
            });
          }
        });
      }
      // 运输
      else if (id == 24) {
        id = 4;
        getTraceAfterSlaughterInfo(id, this.code).then(res => {
          let data = res.data.lists;
          if (data.length > 1) {
            this.$set(this.dialog, name, true);
            this.transData = [];
            data.forEach(item => {
              this.transData.push(item);
            });
          } else {
            this.$set(this.dialog, `${name}2`, true);
            this.transData.forEach(el => {
              if (data[0].hasOwnProperty(el.name)) {
                el.fieldValue = data[0][el.name];
              }
            });
          }
        });
      }
      // 终端
      else if (id == 25) {
        id = 5;
        getTraceAfterSlaughterInfo(id, this.code).then(res => {
          let data = res.data.lists;
          if (data.length > 1) {
            this.$set(this.dialog, name, true);
            this.endData = [];
            console.log("data：", data);
            data.forEach(item => {
              //这个判断是在有重量的情况下才化成克单位，否则为空
              if (item.muttonConsumption) {
                item.muttonConsumption = Number(item.muttonConsumption) * 1000;
              }
              this.endData.push(item);
            });
          } else {
            this.$set(this.dialog, `${name}2`, true);
            this.endData.forEach(el => {
              if (data[0].hasOwnProperty(el.name)) {
                el.fieldValue = data[0][el.name];
              }
            });
            //这个判断是在有重量的情况下才化成克单位，否则为空
            if (this.endData[2].fieldValue) {
              this.endData[2].fieldValue =
                Number(this.endData[2].fieldValue) * 1000;
            }
          }
          // if(this.end)
        });
      }
    },
    open(name, id) {
      this.$set(this.dialog, name, true);
      getTraceInfo(id, this.code).then(res => {
        let data = res.data;
        console.log("getTraceInfo：", data);
        if (id == "1") {
          if (data.lists.length == 0) {
            this.$set(this.dialog, name, false);
            this.noGenDataVisible = true;
            return;
          }
          console.log("data:", data.lists);
          this.genData.forEach(el => {
            if (data.lists[0].hasOwnProperty(el.name)) {
              el.fieldValue = data.lists[0][el.name];
            }
          });
        } else if (id == "2") {
          this.welData = data.lists;
          this.transfer(this.welData);
        } else if (id == "3") {
          this.disData = data.lists;
          this.transfer(this.disData);
        } else if (id == "4") {
          this.immData = data.lists;
          this.transfer(this.immData);
        } else if (id == "5") {
          this.expData = data.lists;
          this.transfer(this.expData);
        } else if (id == "6") {
          this.nutData = data.lists;
          this.transfer(this.nutData);
          console.log(this.nutData);
        } else if (id == "7") {
          this.deaData = data.lists;
          this.transfer(this.deaData);
          console.log(this.deaData);
        } else if (id == "8") {
          this.breData = data.lists;
          this.transfer(this.breData);
          console.log(this.deaData);
        } else if (id == "9") {
          this.soiData = data.lists;
          console.log(this.soiData);
        } else if (id == "10") {
          this.watData = data.lists;
          console.log(this.watData);
        } else if (id == "11") {
          this.airData = data.lists;
          console.log(this.airData);
        }
      });
    },
    transfer(info) {
      for (let i in info) {
        for (let j in info[i]) {
          if (info[i][j] == 1) {
            info[i][j] = "是";
          } else if (info[i][j] == 0) {
            info[i][j] = "否";
          }
          if (j == "ispassSup") {
            if (info[i][j] == "0") {
              info[i][j] = "未通过监督";
            } else if (info[i][j] == "1") {
              info[i][j] = "通过监督";
            } else if (info[i][j] == "2") {
              info[i][j] = "未监督";
            }
          }
          if (j == "ispassCheck") {
            if (info[i][j] == "0") {
              info[i][j] = "未通过";
            } else if (info[i][j] == "1") {
              info[i][j] = "已审核";
            } else if (info[i][j] == "2") {
              info[i][j] = "未审核";
            }
          }
        }
      }
    },
    goMap(id) {
      // this.mapVisible = !this.mapVisible;
      let map;
      console.log("refs:", this.$refs);
      if (id === 1) {
        map = this.$refs.bmap1;
      } else if (id === 2) {
        map = this.$refs.bmap2;
      } else {
        map = this.$refs.bmap3;
      }
      console.log("map:", map);
      map.goBMap();
    },
    goodSuccess() {
      let th = this;
      this.goodRatingVisible = true;
      setTimeout(() => {
        th.goodRatingVisible = false;
      }, 1000);
    },
    complaintSubmit() {
      let data = {
        o: this.complaint.o,
        name: this.complaint.name,
        tel: this.complaint.tel,
        thing: this.complaint.thing
      };
    }
  }
};
</script>

<style lang="scss">
#bigContent {
  background: #f1f1f1;
  padding-top: 178px;
  font-size: 48px;
  padding-bottom: 216px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .app-bar {
    position: fixed;
    top: 0;
    width: 100vw;
    width: 100%;
    height: 0.44rem;
    height: 150px;
    //font-size: 0.14rem;
    font-size: 48px;
    background: #0a4495;
    color: #fff;
    line-height: 0.44rem;
    line-height: 150px;
    text-align: center;
    z-index: 9999;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    width: 100%;
    height: 0.54rem;
    height: 155px;
    background: #fff;
    box-shadow: 0px -2px 8px 0px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: #c4c4c4;
      width: 30vw;
      height: 100%;
      svg {
        font-size: 0.2rem;
        font-size: 80px;
      }
      label {
        font-size: 0.12rem;
        font-size: 41px;
      }
      &.active {
        color: #1ca6f1;
      }
    }
  }

  .ihead {
    text-align: center;
  }

  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.44rem;
    height: 150px;
    background: #fff;
    .wrapper {
      display: flex;
      box-sizing: border-box;
      border: solid 1px #f49a00;
      border-radius: 0.16rem;
      border-radius: 64px;
      width: calc(100% - 109px);
      height: 0.28rem;
      height: 96px;
      overflow: hidden;
      input {
        flex: 1;
        padding: 0 27px;
        border: none;
        outline: none;
        font-size: 27px;
      }
      button {
        border: none;
        outline: none;
        width: 0.64rem;
        width: 220px;
        height: 100%;
        background: #f18000;
        border-radius: 0.16rem;
        border-radius: 55px;
        font-size: 0.14rem;
        font-size: 48px;
        color: #fff;
      }
    }
  }

  .tab-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.08rem;
    margin-top: 27px;
    height: 0.44rem;
    height: 150px;
    background: #fff;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      text-decoration: none;
      color: #7c7c7c;
      border-top: solid 1px #ddd;
      border-bottom: solid 1px #ddd;
      &.active {
        background: #0a4495;
        color: #fff;
        border-color: #0a4495;
      }
    }
  }

  .block {
    margin-top: 0.08rem;
    margin-top: 27px;
    padding: 0.08rem;
    padding: 27px;
    background: #fff;
    h2 {
      margin: 0;
      padding: 0;
      font-size: 0.18rem;
      font-size: 62px;
      color: #0b4496;
    }
  }

  .block-text-video {
    .row {
      margin-top: 0.08rem;
      margin-top: 27px;
      display: flex;
      overflow: hidden;
      .field {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 0.12rem;
        font-size: 41px;
        border-bottom: solid 1px #dadada;
        label {
          width: 0.6rem;
          width: 250px;
          height: 0.3rem;
          height: 103px;
          line-height: 0.3rem;
          line-height: 103px;
          font-weight: bold;
          color: #000;
          text-align: left;
        }
        .produceTime {
          width: 210px;
        }
        span {
          width: 0;
          white-space: nowrap;
          height: 0.3rem;
          height: 103px;
          line-height: 0.3rem;
          line-height: 103px;
          flex: 1;
          color: #7c7c7c;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        a.map {
          padding-left: 0.2rem;
          padding-left: 69px;
          color: #d7d7d7;
          svg {
            color: #e95800;
          }
        }
      }
      .produce {
        flex: 1.3;
      }
    }
    .video {
      margin-top: 0.08rem;
      margin-top: 27px;
      background: #f8f8f8;
      video {
        width: 100%;
      }
      .carouselImg {
        width: 90%;
        height: 100%;
      }
    }
  }

  .block-sc {
    .content {
      width: 100%;
      height: 4.4rem;
      height: 1570px;
      background: url("../assets/imgs/mobile/scbjxx/bg.jpg");
      background-size: 100%;
      .items {
        display: flex;
        justify-content: flex-start;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 0.8rem;
          width: 274px;
          height: 0.58rem;
          height: 199px;
          overflow: hidden;
          a {
            text-decoration: none;
          }
          a.value {
            display: block;
            width: 0.44rem;
            width: 151px;
            height: 0.44rem;
            height: 151px;
            border-radius: 50%;
            text-align: center;
            line-height: 0.44rem;
            line-height: 151px;
            font-size: 0.22rem;
            font-size: 75px;
            color: #07f202;
            overflow: hidden;
          }
          a.text {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            margin-top: 30px;
            b {
              font-size: 0.1rem;
              font-size: 34px;
              color: #1ca6f1;
            }
          }
        }
        // 单独给屠宰这个圆圈调下距离
        .slaughter {
          margin-left: 36px;
        }
        &.items-1 {
          padding: 40px 0 0 185px;
          .item:first-child {
            margin-right: 0.25rem;
            margin-right: 86px;
          }
          .item:last-child {
            margin-left: 35px;
          }
        }
        &.items-2 {
          padding: 20px 0 0 380px;
          .item:first-child {
            margin-right: 0.2rem;
            margin-right: 68px;
          }
          .item:last-child {
            margin-left: 35px;
          }
        }
        &.items-3 {
          padding: 25px 0 0 175px;
          .item:first-child {
            margin-right: 0.2rem;
            margin-right: 68px;
          }
          .item:last-child {
            margin-left: 35px;
          }
        }
        &.items-4 {
          padding: 25px 0 0 360px;
          .item:first-child {
            margin-right: 0.21rem;
            margin-right: 72px;
          }
          .item:last-child {
            margin-left: 30px;
          }
        }
        &.items-5 {
          padding: 25px 0 0 160px;
          .item:first-child {
            margin-right: 0.21rem;
            margin-right: 105px;
          }
        }
        &.items-6 {
          padding: 0.01rem 0 0 0.84rem;
          padding: 25px 0 0 330px;
          .item:first-child {
            margin-right: 0.28rem;
            margin-right: 135px;
          }
        }
        &.items-7 {
          padding: 0.01rem 0 0 1.25rem;
          padding: 25px 0 0 485px;
          .item:first-child {
            margin-right: 0.22rem;
            margin-right: 75px;
          }
        }
      }
    }
  }

  .block-yzhjzs {
    .content {
      display: flex;
      justify-content: space-evenly;
      padding: 69px 0;
      span {
        width: 20vw;
        img {
          width: 100%;
        }
        label {
          font-size: 0.12rem;
          font-size: 41px;
        }
      }
    }
  }

  .block-gjzs {
    .content {
      display: flex;
      justify-content: space-evenly;
      padding: 69px 0;
      margin-bottom: 20px;
      span {
        width: 26vw;
        height: 30vh;
        img {
          width: 100%;
          height: 70%;
        }
        .cer-description {
          font-size: 35px;
        }
      }
    }
  }

  // .block-ptpj {
  //   .content {
  //     display: flex;
  //     align-items: flex-end;
  //     padding: 69px 0;
  //     h3 {
  //       margin: 0;
  //       padding: 0;
  //       font-size: 0.24rem;
  //       font-size: 82px;
  //       i {
  //         font-style: normal;
  //         font-size: 0.16rem;
  //         font-size: 54px;
  //       }
  //     }
  //     .stars {
  //       flex: 1;
  //       display: flex;
  //       justify-content: flex-end;
  //       svg {
  //         color: #7c7c7c;
  //         &.active {
  //           color: #f26b00;
  //         }
  //       }
  //     }
  //   }
  // }

  .block-yhpj {
    .content {
      display: flex;
      align-items: flex-end;
      padding: 69px 0;
      h4 {
        margin: 0;
        padding: 0;
        font-size: 48px;
        color: #0b4496;
      }
      .stars {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        svg {
          color: #7c7c7c;
          &.active {
            color: #f26b00;
          }
        }
      }
    }
    .goodOrIssue {
      display: flex;
      justify-content: space-around;
      a {
        display: flex;
        width: 45%;
        border-radius: 60px;
        height: 109px;
        justify-content: center;
        align-items: center;
        background: #f26b00;
        text-decoration: none;
        color: #fff;
        &:last-child {
          background: #fff;
          border: solid 1px #0b4496;
          color: #0b4496;
        }
        svg {
          margin-left: 27px;
        }
      }
    }
  }

  .mod_search_dialog {
    padding: 0 30px;
    border: 2px solid color-green;
    border-radius: none;
    .el-dialog__header {
      padding: 0;
    }
    .dialog_btn {
      text-align: right;
      font-size: 15px;
      color: #6aaf08;
      cursor: pointer;
      .btn_print {
        margin-right: 30px;
      }
    }
    .dialog_table {
      overflow-x: auto;
    }
  }
  .bmap {
    margin-top: -10px;
    .el-collapse-item__wrap {
      position: relative;
      width: 100%;
      top: 5%;
    }
  }
}
</style>
