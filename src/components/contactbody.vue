<template>
<div id="ext3">
        <h1 class="title_head_3">联系我们 <span class="title_eng"> COMPANY PROFILE</span></h1>
        <hr align="center" width="96%"></hr>
        <div id="infor">
            <img id="map" src="..\assets\imgs\map_yc.png"></img>
            <p id="phone" class="con_infor">联系电话 : 0856-6995166</p>
            <p class="con_infor">邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱 : 1694478121@qq.com</p>
            <p id="address" class="con_infor">地 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址 : 贵州省铜仁市沿河土家族自治县官舟镇枣树坝村</p>
        </div>
    <div id="message"> 
        <h1 class="leav_mes">在线留言</h1>
        <div id="mes_bo">
            <div id="mes_bo_cen">
           <label class="twostr" for="name">姓名 :</label> &nbsp;<input class="input_mes" type="text">
           <br>
           <label class="twostr" for="phonenumber">电话 :</label> &nbsp;<input class="input_mes" type="text">
           <br>
           <label class="twostr" for="address">地址 :</label> &nbsp;<input class="input_mes" type="text">
           <br>
           <label for="vercode">验证码 :</label> &nbsp;<input type="text"><button id="getvercode">点击获取验证码</button>
           <br>
           <label id="lab_leav" for="leavmess">留言 ：</label>
           <textarea name="leavmess" id="" cols="20" rows="10"></textarea>
           <br>
           <button id="sumleav">提交留言</button>
        </div>
        </div>
    </div>
</div>   
</template>

<style>
    #ext3{
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
     .title_head_3{
        color: rgb(16, 82, 205);
        font-weight: 700;
        font-size: 22px;
        margin-left: 2%;
        margin-top:2%;
    }
    #ext3 .title_eng{
        color:rgb(180, 180, 180);
        font-weight: 400;
        font-size: 12px;
        margin-left: 3px;
        }
   #ext3 hr{
        height:1px;
        border:none;
        border-top:1px solid rgb(200, 200, 200);
        }
     
    #infor{
        width: 40%;
        margin-top:15px;
        margin-left:25px;
        float: left;
        }
    .con_infor{
        font-size: 13px;
        margin-left: 2%;
        } 
    #phone{
        margin-top:25px;
    }
    #message{
        width: 50%;
        height: 300px;
        float:right;
        margin-right: 25px;
        
    }
    .leav_mes{
        color: rgb(16, 82, 205);
        font-weight: 700;
        font-size: 14px;
        }
    #mes_bo{
        width: 100%;
        height:295px;
        background-color: rgb(238, 238, 238);
    }
    #mes_bo_cen{
        margin-left:70px;
        padding-top: 15px;
    }
    .twostr{
        margin-left: 12px;
    }
   #ext3 input{
        border: none;
        height: 23px;
        margin-top: 7px;
        width:180px;
    }
    
    .input_mes{
        width: 290px;
    }
  #ext3  label{
        font-size: 12px;
    }
    #getvercode{
        width: 105px;
        height: 25px;
        font-size: 10px;
        background-color: rgb(26, 100, 209);
        border: none;
        color: rgb(247,250,254);
        margin-left: 5px;
    }
  #ext3  textarea{
        border: none;
        margin-top:7px;
        height: 80px;
        width: 400px;
        margin-left: 2px;
        resize:none;
    }
    #sumleav{
        background: -webkit-gradient(linear, left top, left bottom, from(#faa51a), to(#f47a20));
        color: rgb(247,250,254);
        border: none;
        width: 105px;
        height: 25px;
        font-size: 12px;
        margin-left: 51px;
        margin-top:10px;
        }
    #lab_leav{
        float: left;
        margin-left: 10px;
        margin-top: 10px;
    }
    </style>