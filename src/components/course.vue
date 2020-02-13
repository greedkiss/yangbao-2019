<template>
<div id="ext4">
        <h1 class="title_head_4">专家讲堂 <span class="title_eng"> VIDEO</span></h1>
        <hr align="center" width="96%"></hr>
                <div class="row_cont3">
                    <el-table
                        :data="videoList"
                        stripe
                        style="width: 100%">
                         
                        <el-table-column
                      
                        prop="videoName"
                        label="视频名称"
                        align='center'
                        width="180">
                        </el-table-column>
                        <el-table-column
                      
                        prop="expertName"
                        label="专家姓名"
                        align='center'
                        width="180">
                        </el-table-column>
                        
                        <el-table-column
                        prop="uploadTime"
                        label="上传时间"
                        width="180">
                        </el-table-column>

                        <el-table-column
                        label="操作"
                        align='center'
                        width="160">
                        <template slot-scope="scope">
                            <el-button
                            @click.native.prevent="videoClick(scope.row, scope.column)"
                            type="text"
                            size="small">
                            点击播放
                            </el-button>
                        </template>
                    </el-table-column>

                    </el-table>                   
            </div>

        <div class="app-video">
            <div v-show="showVideo" id="app-video"></div>
            <video v-if="hasVideo" :src="videoUrl" class="production-video" controls="controls" height="500" width="100%"></video>
            <div v-if="!hasVideo" class="app-video-no"> 
                <p class="app-video-tips">请选择播放源</p>
            </div>
        </div>
</div>
    
</template>

<script>
import { baseUrl, vedioUrl} from '@/util/fetch.js'; 
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
            videoList: [],
            hasVideo:false,
            videoUrl:null
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
       videoClick (row){
            this.hasVideo=true
            this.videoUrl=row.link
            // let path =row.link
            // console.log(row)
            // return 
            // this.$router.push(path)
            // console.log(path)
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
                            expertName:item.professorName,
                            uploadTime: item.gmtCreate,
                            videoName: item.fileName,
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
        width: 90%;
        height: 95%;
        border-width: 7px;
        border-color: rgb(97, 153, 240);
        border-style: solid;
        margin: 0 auto;
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
.row_cont3{
    margin-left:100px;
    width:55%;
    float: right;
    margin-top: 20px;
    }
.row_cont3 a{
    font-size: 10px;
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
        width 90%
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
        width 90%
        height 100%
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

    
