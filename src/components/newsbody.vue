<template>
<div id="ext_news">
        <div class="news_title_head">新闻动态 <span class="title_eng"> NEWS</span>
         <img src="../assets/imgs/profile_img.png" class="news_img">
        </div>
<el-tabs v-model="activeName" @tab-click="handleClick" class="tabs_news" v-bind:class="{ afterclick: isAfterClick}">
    <el-tab-pane label="公司新闻" name="first" >
        <div class="box_my_news">
                <div class="row_allcont">
                <p class="yourloa"><span >您所在得位置：</span>新闻动态 > 公司新闻</p>
                <hr align="center" width="108%" class="hr2_bule"></hr>
                <div class="row_cont">
                    <img src="../assets/imgs/news.png">
                    <div class="row_cont_text">
                        <p class="news_title">脱贫攻坚好项目&nbsp;努比亚山羊开启致富路<span>2019-2-18</span></p>
                        <hr align="center" width="100%"></hr>
                        <p class="news_cont">在养殖户老张家里，记者见到了这群为农民带来可观收益得小家伙们。努比亚山羊通身漆黑，头大耳小，被毛细短且富有光泽，脖颈紧实，背宽而直，四肢细长，骨骼坚实，是世界著名的肉用山羊品种...<a href="#">查看更多</a></p>
                    </div>
                </div>
                <div class="row_cont">
                    <img src="../assets/imgs/news.png">
                    <div class="row_cont_text">
                        <p class="news_title">脱贫攻坚好项目&nbsp;努比亚山羊开启致富路<span>2019-2-18</span></p>
                        <hr align="center" width="100%"></hr>
                        <p class="news_cont">在养殖户老张家里，记者见到了这群为农民带来可观收益得小家伙们。努比亚山羊通身漆黑，头大耳小，被毛细短且富有光泽，脖颈紧实，背宽而直，四肢细长，骨骼坚实，是世界著名的肉用山羊品种...<a href="#">查看更多</a></p>
                    </div>
                </div>
                </div>
        </div>
    </el-tab-pane>

    <el-tab-pane label="行业新闻" name="second" >
        <div class="box_my_news">
                <div class="row_allcont">
                <p class="yourloa"><span >您所在得位置：</span>新闻动态 > 行业新闻</p>
                <hr align="center" width="108%" class="hr2_bule"></hr>
                <div class="row_cont">
                    <img src="../assets/imgs/news.png">
                    <div class="row_cont_text">
                        <p class="news_title">脱贫攻坚好项目&nbsp;努比亚山羊开启致富路<span>2019-2-18</span></p>
                        <hr align="center" width="100%"></hr>
                        <p class="news_cont">在养殖户老张家里，记者见到了这群为农民带来可观收益得小家伙们。努比亚山羊通身漆黑，头大耳小，被毛细短且富有光泽，脖颈紧实，背宽而直，四肢细长，骨骼坚实，是世界著名的肉用山羊品种...<a href="#">查看更多</a></p>
                    </div>
                </div>
                <div class="row_cont">
                    <img src="../assets/imgs/news.png">
                    <div class="row_cont_text">
                        <p class="news_title">脱贫攻坚好项目&nbsp;努比亚山羊开启致富路<span>2019-2-18</span></p>
                        <hr align="center" width="100%"></hr>
                        <p class="news_cont">在养殖户老张家里，记者见到了这群为农民带来可观收益得小家伙们。努比亚山羊通身漆黑，头大耳小，被毛细短且富有光泽，脖颈紧实，背宽而直，四肢细长，骨骼坚实，是世界著名的肉用山羊品种...<a href="#">查看更多</a></p>
                    </div>
                </div>
                </div>
         </div>
    </el-tab-pane>
 </el-tabs>
    <el-button class="button1" type="info" plain size="mini" @click="watchMore" v-bind:class="{button_afterclick:isAfterClick}">查看更多</el-button>
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
    }
  };
</script>

<style>
.tabs_news{
    float: right;
    width:70%;
    height: 70%;
    margin-right: 30px;
    margin-top:30px;
    overflow:hidden;
}
#ext_news{
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
#ext p{
        margin: 2px;
        padding: 2px;
    }
.news_title_head{
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
    .news_img{
        width:100%;
        height:90%;
        margin-top: 35px;
        float: left;
        }
    .box_my_news{
        width: 100%;
        height:360px;
        float: right;
    } 
    .row_allcont{
        font-size: 10px;
        color: rgb(140, 140, 140);
    }
    .yourloa span{
        color: rgb(0,0,0);
        font-weight: 1000;
    }
    .hr2_bule{
        border-top:2px solid rgb(17, 86, 203);
        }
    .row_cont{
        margin-top: 10px;
        background: rgb(238,238,238);
        width:100%;
        height: 100px;
        }
    .news_content{
       position:absolute;
       left:480px;
    }
    .row_cont img{
        width:20%;
        height: 100px;
        float: left;
        margin: 0;
    }
    .news_title{
        color:rgb(0, 0, 0);
        font-size: 13px;
        font-weight: 400;
    }
    .news_title span{
        color: rgb(140, 140, 140);
        font-size: 10px;
        float: right;
    }
    .row_cont_text hr{
        margin-top:-5px;
        border-top:1px solid rgb(200, 200, 200);
    }
    .row_cont_text{
        float: left;
        width:73%;
        margin-left:3%;
        margin-top:0px
    }
    .news_cont{
        width: 100%;
    }
    .afterclick{
        height: 90%;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .button1{
        width:10%;
        position: relative;
        top:10%;
        left:33%;
    }
    .button_afterclick{
        display: none;
    }
   
   
    </style>
