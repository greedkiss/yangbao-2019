<template>
<div id="ext4">
        <h1 class="title_head_4">视频下载 <span class="title_eng"> VIDEO</span></h1>
        <hr align="center" width="96%"></hr>
        <div class="box_my3">
            <div class="row4">
                <div class="row_cont3">
                    <el-table
                        :data="videoList"
                        stripe
                        style="width: 100%">
                         
                        <el-table-column
                      
                        prop="name"
                        label="视频名称"
                        align='center'
                        width="180">
                        </el-table-column>

                        <el-table-column
                        prop="time"
                        label="上传时间"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">点击播放</el-button>
                        </el-table-column>

                    </el-table>                   
                    <!-- <div class="video-list">
                        <ul>
                            <li v-for="(item, i) in this.videoList" :key="i">
                            <i class="list-item-icon iconfont icon-video"></i>
                            <span v-text="item.name"></span>
                            <span class="list-item-time" v-text="item.time" :title="item.time"></span>
                            <a class="list-item-download" :href="item.link" download>点击观看</a>
                            </li>
                        </ul>
                        <el-pagination
                            class="video-list-page"
                            layout="prev, pager, next"
                            :total="total"
                            @current-change="getVideoList"
                            :current-page.sync="page">
                        </el-pagination>
                    </div>  -->
                </div>
                
                <button class="button3">查看更多</button>
            </div>
         </div>
    <div class="app-video">
        <div v-show="showVideo" id="app-video"></div>
        <div v-if="showPic" class="app-video-no">
            <p class="app-video-tips">暂无专家直播</p>
        </div>
    </div>
</div>
    
</template>

<script>
import { baseUrl, vedioUrl } from '@/util/fetch.js';
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
        handleClick(row){
            let path = link
            this.$router.push(path)
        },
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
                            link: `${vedioUrl}/${item.fileName}`
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
        text-align: 15px;
        line-height: 20px;
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
        width:500px;
        height:315px;
        position: fixed;
        top:286px;
        left:190px;
        }
   
   
    </style>
<style lang="stylus">
@import '../assets/css/color'
.app-video
    display flex
    flex-wrap wrap
    .app-video-no
        position relative
        box-sizing border-box
        width 55%
        min-width 500px
        height 300px
        margin 20px 0 20px 5%
        background-image url('//otxtxlg3e.bkt.clouddn.com/QQ20180511-0.jpg')
        background-size cover
        .app-video-tips
            margin 0
            position absolute
            top 0
            bottom 0
            left 0
            right 0
            line-height 300px
            text-align center
            color #fff
            font-size 16px
            background:url(../assets/imgs/videobg2.png)
            background-repeat:no-repeat
    #app-video
        box-sizing border-box
        width 55%
        min-width 600px
        height 400px
        margin 20px 0 20px 5%
        .vcp-player
            margin 0
        .vcp-error-tips // 视频播放失败样式
            top 0
            height 100%
            line-height 400px
            margin-top 0
            background-color rgba(0, 0, 0, 0.7)
            font-size 16px
            color #fff

</style>

    
