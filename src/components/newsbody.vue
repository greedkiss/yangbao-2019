<template>
<div id="ext">
        <h1 class="title_head">新闻动态 <span class="title_eng"> NEWS</span></h1>
        
 
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs_news">
    <el-tab-pane label="公司新闻" name="first" >
        <div class="box_my">
            <div class="row1">
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
             <button class="button1">查看更多</button>
         </div>
    </el-tab-pane>
    <el-tab-pane label="行业新闻" name="second" >
        <div class="box_my">
            <div class="row1">
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
                
                <button class="button1">查看更多</button>
                </div>
                
            </div>
         </div>
    </el-tab-pane>
  </el-tabs>
    <img src="../assets/imgs/profile_img.png" class="news_img">
    
    </div>
</template>
    <script>
     export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style>
.tabs_news{
    float: right;
    margin-right: 30px;
    margin-top:30px;
}
#ext{
        width: 79%;
        height: 430px;
        border-width: 7px;
        border-color: rgb(97, 153, 240);
        border-style: solid;
        margin: 5% auto;
        display: block;
        background: rgb(255, 255, 255);
    }
#ext h2{
        font-size: 13px;
        color: rgb(0,0,0);
    }
#ext p{
        margin: 2px;
        padding: 2px;
    }
    .title_head{
        color: rgb(16, 82, 205);
        width:300px;
        font-weight: 700;
        font-size: 22px;
        margin-left: 2%;
        margin-top:3%;
        position: relative;
        top:30px;
        display:inline;
    }
    .title_eng{
        color:rgb(180, 180, 180);
        font-weight: 400;
        font-size: 12px;
        margin-left: 3px;
        }
    .news_img{
        width:250px;
        height:280px;
        position: relative;
        position: fixed;
        top:286px;
        left:190px;
        }
    .box_my{
        width: 850px;
        height: 330px;
        float: right;
    } 
    .row1{
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
        width:850px;
        height: 100px;
        }
    .row_cont img{
        width:174px;
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
        position: relative;
        left:345px;
    }
    .row_cont_text hr{
        position: relative;
        border-top:1px solid rgb(200, 200, 200);
    }
    .row_cont_text{
        float: right;
        width:620px;
        margin-right:35px;
        margin-top:15px
    }
    .news_cont{
        width: 620px;
    }
 .button1{
        border-radius:10px;
        border: none;
        background:rgb(238,238,238);
        height:25px;
        width:260px;
        position: relative;
        top:50px;
        left:300px;
    }
   
   
    </style>
