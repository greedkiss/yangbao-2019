<template>
<div id="ext2">
        <div class="company_title_head">集团介绍 <span class="title_eng"> COMPANY PROFILE</span>
        <img src="../assets/imgs/profile_img.png" class="company_img">
        </div>
        
 
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs_company" v-bind:class="{ afterclick: isAfterClick}">
    <el-tab-pane label="平台介绍" name="first">
        <div class="box_my_company" >
                <div class="row_allcont">
                <p class="yourloa"><span >您所在得位置：</span>集团介绍 > 平台介绍</p>
                <hr align="center" width="108%" class="hr2_bule"></hr>
                <div class="row_cont2">
               <h2 class="h2_first">什么是“云·羊宝” ?</h2>
                <p>"云·羊宝”是集(有机)山羊养殖、屠宰加工、终端消费店于一体的(有机)山羊产、 供销，自循环全溯源平台。</p>
                   <h2 class="h2_second">一、养殖生产管理</h2> 
              
                   <p>A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云羊宝”为养殖户提供:</p> 
                    <p>1、提供15年山羊养殖生产管理全套方案</p>
                    <p>2、提供AI—人工智能管理</p>
                    <p>3、提供技术专员远程零距离一对一实时技术审核及执行监管</p>
                    <p>4、提供远程零距离专家讲堂(每周一课）</p>
                    <p>5、提供专家筛选,精准匹配养殖生产物资(饲料、兽药、工具)到户供应</p>
                    <p>6.实现生产管理、养殖环境全过程质量追溯7、提供火羊销售平台,解决销售问题</p>
                    <p>7.提供火羊销售平台，解决销售问题</p>
                    <br>
                    <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                    <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>    


                </div>
                </div>
            
         </div>
    </el-tab-pane>

    <el-tab-pane label="企业介绍" name="second" >
        <div class="box_my_company">
                <div class="row_allcont">
                    <p class="yourloa"><span >您所在得位置：</span>集团介绍 > 企业介绍</p>
                    <hr align="center" width="108%" class="hr2_bule"></hr>
                    <div class="row_cont2">
                        <h2 class="h2_first">什么是“云·羊宝” ?</h2>
                        <p>"云·羊宝”是集(有机)山羊养殖、屠宰加工、终端消费店于一体的(有机)山羊产、 供销，自循环全溯源平台。</p>
                        <h2 class="h2_second">一、养殖生产管理</h2> 
                        <p>A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云羊宝”为养殖户提供:</p> 
                        <p>1、提供15年山羊养殖生产管理全套方案</p>
                        <p>2、提供AI—人工智能管理</p>
                        <p>3、提供技术专员远程零距离一对一实时技术审核及执行监管</p>
                        <p>4、提供远程零距离专家讲堂(每周一课）</p>
                        <p>5、提供专家筛选,精准匹配养殖生产物资(饲料、兽药、工具)到户供应</p>
                        <p>6.实现生产管理、养殖环境全过程质量追溯7、提供火羊销售平台,解决销售问题</p>
                        <p>7.提供火羊销售平台，解决销售问题</p>
                        <br>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                            简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                            坐在养殖户家里,指挥和监督每步操作.</p>
                            <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>    
                     </div>
                 </div>
           
           </div>
    </el-tab-pane>

    <el-tab-pane label="领导致词" name="third" >
        <div class="box_my_company" >
            
                <div class="row_allcont">
                <p class="yourloa"><span >您所在得位置：</span>集团介绍 > 领导致词</p>
                <hr align="center" width="108%" class="hr2_bule"></hr>
                <div class="row_cont2">
               <h2 class="h2_first">什么是“云·羊宝” ?</h2>
                <p>"云·羊宝”是集(有机)山羊养殖、屠宰加工、终端消费店于一体的(有机)山羊产、 供销，自循环全溯源平台。</p>
                   <h2 class="h2_second">一、养殖生产管理</h2> 
              
                   <p>A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云羊宝”为养殖户提供:</p> 
                    <p>1、提供15年山羊养殖生产管理全套方案</p>
                    <p>2、提供AI—人工智能管理</p>
                    <p>3、提供技术专员远程零距离一对一实时技术审核及执行监管</p>
                    <p>4、提供远程零距离专家讲堂(每周一课）</p>
                    <p>5、提供专家筛选,精准匹配养殖生产物资(饲料、兽药、工具)到户供应</p>
                    <p>6.实现生产管理、养殖环境全过程质量追溯7、提供火羊销售平台,解决销售问题</p>
                    <p>7.提供火羊销售平台，解决销售问题</p>
                    <br>
                    <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>    
                    </div>
                </div>
               
           </div>
    </el-tab-pane>

    <el-tab-pane label="组织架构" name="fourth" >
        <div class="box_my_company">
                <div class="row_allcont">
                <p class="yourloa"><span >您所在得位置：</span>集团介绍 > 组织框架</p>
                <hr align="center" width="108%" class="hr2_bule"></hr>
                <div class="row_cont2">
               <h2 class="h2_first">什么是“云·羊宝” ?</h2>
                <p>"云·羊宝”是集(有机)山羊养殖、屠宰加工、终端消费店于一体的(有机)山羊产、 供销，自循环全溯源平台。</p>
                   <h2 class="h2_second">一、养殖生产管理</h2> 
              
                   <p>A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云羊宝”为养殖户提供:</p> 
                    <p>1、提供15年山羊养殖生产管理全套方案</p>
                    <p>2、提供AI—人工智能管理</p>
                    <p>3、提供技术专员远程零距离一对一实时技术审核及执行监管</p>
                    <p>4、提供远程零距离专家讲堂(每周一课）</p>
                    <p>5、提供专家筛选,精准匹配养殖生产物资(饲料、兽药、工具)到户供应</p>
                    <p>6.实现生产管理、养殖环境全过程质量追溯7、提供火羊销售平台,解决销售问题</p>
                    <p>7.提供火羊销售平台，解决销售问题</p>
                    <br>
                    <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>
                        <p> B.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“云。羊宝 ”核心实力便是将15年专业的山羊养殖管理流程及方案植入系统,实现AI-人工智能管理养殖户。
                        简单的说,当养殖户引入该系统,相当于聘请了一位年薪100万,具备15年专业山羊养殖经验的专家团队,
                        坐在养殖户家里,指挥和监督每步操作.</p>    
                    </div>
                </div>
            
         </div>
    </el-tab-pane>

  </el-tabs>
    <el-button class="button2" type="info" plain size="mini" @click="watchMore" v-bind:class="{button_afterclick:isAfterClick}">查看更多</el-button>
    </div>
</template>
    <script>
     export default {
    data() {
      return {
        activeName: 'first',
        isAfterClick: false
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
     watchMore() {
            this.isAfterClick=!this.isAfterClick
        }
    },
   
    };
</script>

<style>
.tabs_company{
    float: right;
    width:70%;
    height: 70%;
    margin-right: 30px;
    margin-top:30px;
    overflow:hidden;
}
#ext2{
        width: 79%;
        height: 100%;
        border-width: 7px;
        border-color: rgb(97, 153, 240);
        border-style: solid;
        margin: 3% auto;
        display: block;
        background: rgb(255, 255, 255);
        overflow-x:hidden
    }

    
.h2_first{
        margin-top:45px;
        font-size: 13px;
        color: rgb(0,0,0);
    }
.h2_second{
        font-size: 13px;
        color: rgb(0,0,0);
    }
#ext2 p{
        margin: 2px;
        padding: 2px;
    }
    .company_title_head{
        color: rgb(16, 82, 205);
        width:20%;
        height: 80%;
        float:left;
        font-weight: 700;
        font-size: 22px;
        display:inline;
        margin-left: 2%;
        margin-top:2%;
    }
    .title_eng{
        color:rgb(180, 180, 180);
        font-weight: 400;
        font-size: 12px;
        margin-left: 3px;
        }
    .company_img{
        width:100%;
        height:90%;
        margin-top: 35px;
        float: left;
        }
    .box_my_company{
        width: 100%;
        float: right;
        font-size: 10px;
        color: rgb(140, 140, 140);
    }
    .afterclick{
        height: 90%;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .yourloa span{
        color: rgb(0,0,0);
        font-weight: 1000;
    }
    .hr2_bule{
        border-top:2px solid rgb(17, 86, 203);
        }
    
    .row_cont2{
        position: relative;
        bottom:30px;
        left: 10px;
        text-align: 8px;
        line-height: 12px;
        }
   .button2{
        width:10%;
        position: relative;
        top:10%;
        left:33%;
    }
   .button_afterclick{
       display: none;
   }
   
    </style>
