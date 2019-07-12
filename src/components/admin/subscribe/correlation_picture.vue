<template>
	<div>
        <el-form :inline="true" :model="form">
        <el-form-item>
        <el-input v-model="Jianyihao" size="small" placeholder="">
        <template slot="prepend">检疫合格证号:</template>
        </el-input>
        </el-form-item>
        <el-form-item>
        <el-input v-model="earTag" size="small" placeholder="">
        <template slot="prepend">耳牌号:</template>
        </el-input>
        </el-form-item>
        <el-form-item>
        <el-button size="small" type="primary" @click="submit()">查询</el-button>
        </el-form-item>
        </el-form>
        <div>
                <div class="production-view">
            <div class="production-content" v-for="(item, i) in proList" :key="i">
                <el-card>
                    <i v-if="item.filetype === 1" class="el-icon-caret-right video-icon "></i>
                    <img @click="showPop(i)" class="production-image" :src="item.url" :onerror="defaultImg">
                    <p class="production-info" v-if="!isDiagnose">商标耳牌：{{ item.brand }}</p>
                    <p class="production-info">时间：{{ item.time }}</p>
                    <el-dialog
                      :visible.sync="productionShow[i]"
                      width="50%"
                      center>
                        <!-- FIXME: video 标签兼容性处理 -->
                        <div class="show-detail">
                            <video v-if="item.filetype === 1 || item.filetype === 6" :src="item.urlSpecific" class="production-video" controls="controls" height="400" width="400"></video>
                            <img v-else class="production-image-detail" :src="item.url" :onerror="defaultImg">
                        </div>
                        <div class="show-list">
                            <ul>
                                <li><el-tag>上传日期</el-tag> {{ item.udate }}</li>
                            </ul>
                        </div>
                        <div slot="footer">
                            <el-button size="small" type="primary" @click="deleteItem(item, i)">删除</el-button>
                        </div>
                    </el-dialog>
                </el-card>
            </div>
        </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="12"
          :current-page.sync="pageNumb"
          @current-change="changePage">
        </el-pagination>
    </div>
</template>
<script>


export default {
    components: {
        
    },

    data () {
        return {
            
        }
    },
    methods:{
        
    }
}
</script>