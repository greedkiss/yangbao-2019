<template>
<div id="ext4">
        <h1 class="title_head_4">视频下载 <span class="title_eng"> VIDEO</span></h1>
        <hr align="center" width="96%"></hr>
        <div class="box_my3">
            <div class="row4">
                <div class="row_cont3">
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#"> 点击下载</a></p>
                    <p class="news_cont">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx <a href="#">  点击下载</a></p>
                </div>
                
                <button class="button3">查看更多</button>
            </div>
         </div>
    <!-- <img src="../assets/imgs/profile_img.png" class="video_img"> -->
    <div v-show="showVideo" id="app-video"></div>
        <div v-if="showPic" class="app-video-no">
            <!-- <img src="../assets/imgs/profile_img.png"> -->
            <p class="app-video-tips">暂无专家直播</p>
    </div>
</div>   
</template>
<script>
import {baseUrl} from '@/util/fetch.js';
import { getChannelList, getVideoUrl, getVideo } from '@/util/getdata'
import { isReqSuccessful } from '@/util/jskit'
import '@/assets/TcPlayer-2.2.1.js'
export default {
    data () {
        return {
            page: 1,
            total: 0,
            showVideo: false,
            showPic: false,
            videoList: []
        }
    },

    mounted () {
        this.getVideoList()

        getChannelList().then(res => {
            if (isReqSuccessful(res)) {
                if(res.data.liveChannelResp.data.output[0].all_count) {
                    this.showVideo = true
                    let channelName = res.data.liveChannelResp.data.output[0].channel_list[0].channel_name
                    let url = 'http://' + channelName.split('_')[0] + '.liveplay.myqcloud.com/live/' + channelName
                    console.log(url)
                    var player = new TcPlayer('app-video', {
                        'm3u8': url + '.m3u8',
                        // 增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
                        'flv': url + '.flv',
                        'autoplay': true,
                        // iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                        // 视频的显示宽度，请尽量使用视频分辨率宽度
                        'width': '100%',
                        // 视频的显示高度，请尽量使用视频分辨率高度
                        'height': '100%',
                    })
                } else {
                    this.showPic = true
                }

            }
        }, _ => {
            this.$message.error('获取直播信息失败')
        })
    },

    methods: {
        getVideoList () {
            getVideo({
                page: this.page - 1
            }).then(res => {
                this.videoList = []
                if(isReqSuccessful(res)) {
                    this.total = res.data.size || 0
                    res.data.List.forEach((item) => {
                        this.videoList.push({
                            id: item.id,
                            time: item.gmtCreate,
                            name: item.fileName,
                            link: `${baseUrl}/movie/${item.fileName}`
                        })
                    })
                }
            })
        }
    }
}
</script>

<style>
#ext4{
        width: 79%;
        height: 430px;
        border-width: 7px;
        border-color: rgb(97, 153, 240);
        border-style: solid;
        margin: 5% auto;
        display: block;
        background: rgb(255, 255, 255);
    }

#ext4 hr{
        height:1px;
        border:none;
        border-top:1px solid rgb(200, 200, 200);
        }
.title_head_4{
        color: rgb(16, 82, 205);
        font-weight: 700;
        font-size: 22px;
        margin-left: 2%;
        margin-top:2%;
    }
    .title_eng{
        color:rgb(180, 180, 180);
        font-weight: 400;
        font-size: 12px;
        margin-left: 3px;
        }
    .box_my3{
        width: 850px;
        height: 330px;
        float: right;
    } 
    .row4{
        font-size: 15px;
        color: rgb(140, 140, 140);
    }
    .row_cont3{
        width:80%;
        position: relative;
        left: 220px;
        text-align: 8px;
        line-height: 12px;
        }
    .row_cont3 a{
        font-size: 10px;
    }
    #ext4 .button3{
        border-radius:10px;
        border: none;
        background:rgb(238,238,238);
        height:25px;
        width:260px;
        position: relative;
        
        left:330px;
    }
    #app-video{
        width:300px;
        height:215px;
        position: fixed;
     }
     .app-video-no{
        width:300px;
        height:215px;
        position: fixed; 
     }
   
   
    </style>