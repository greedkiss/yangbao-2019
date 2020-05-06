<template>
  <!--养殖屠宰管理-->
  <div class="admin-form">
    <div class="card" v-loading="loading">
      <el-form :inline="true" class="correlation" style="width:100% ;margin-top:10px">
        <el-form-item label>
          <el-input placeholder="请输入/扫入认购羊只" v-model="tradeMarkEarTag" style="width:100%">
            <template slot="prepend">商标耳牌号:&nbsp;&nbsp;&nbsp;&nbsp;</template>
          </el-input>
        </el-form-item>
        <el-form-item label>
          <el-input placeholder="请输入胴体重量" v-model="cWeight" style="width:100%">
            <template slot="prepend">胴体重量(公斤):&nbsp;&nbsp;</template>
          </el-input>
        </el-form-item>
        <el-form-item label>
          <el-input placeholder="请输入附属物重量" v-model="aWeight" style="width:100%">
            <template slot="prepend">附属物重量(公斤):</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请上传胴体图片"
            v-for="(item, i) in cphotos"
            :key="i"
            class="select-file"
            style="width:100%"
            @click.native="$refs.cphoto[i].click()"
            :value="item.model"
          >
            <template slot="prepend">
              胴体图片:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                @change="selectFile(item, i)"
                hidden
                ref="cphoto"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请上传附属物图片"
            v-for="(item, i) in aphotos"
            :key="i"
            class="select-file"
            style="width:100%"
            @click.native="$refs.aphoto[i].click()"
            :value="item.model"
          >
            <template slot="prepend">
              附属物图片:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                @change="selectFile2(item, i)"
                hidden
                ref="aphoto"
              />
            </template>
          </el-input>
        </el-form-item>
        <div style="width:10%; margin:0 auto;">
          <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--待选屠宰羊-->
    <div>
      <el-table
        :data="tableData"
        ref="singleTable"
        style="width: 100%"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column label="商标耳牌号" width="120" prop="tradeMarkEarTag"></el-table-column>
        <el-table-column label="来源养殖场" align="center" width="250" prop="sourceFactory"></el-table-column>
        <el-table-column align="center" label="视频" width="120">
          <template slot-scope="scope">
            <div class="opr">
              <span @click="view(scope.$index)">查看</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="购买时间" width="160" align="center" prop="buyTime"></el-table-column>
        <el-table-column label="体重" width="120" align="center" prop="weight"></el-table-column>
        <el-table-column class="action" label="操作" align="center" width="160">
          <template slot-scope="scope">
            <div class="opr">
              <el-button @click="Delete(scope.$index)" type="text">报废</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="10"
        @current-change="fetchData"
        :current-page.sync="page"
      ></el-pagination>

      <el-dialog title="图片详情" :visible.sync="dialogFormVisible" width="800px">
        <div>
          <video :src="pic" style="width:100%" controls="controls" height="400" width="400"></video>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getUserById,
  getFromFactoryData,
  deleteCorrelationById,
  deleteDataFromFactory
} from "@/util/getdata";
import { baseUrl, authStr, tokenStr } from "@/util/fetch";
import { isReqSuccessful } from "@/util/jskit";

export default {
  data() {
    return {
      defaultImg: 'this.src="//qiniu.yunyangbao.cn/logo.jpg"',
      pic: "",
      page: 1,
      total: 10,
      user: null,
      disableAll: false,
      pictureStyle: "",
      cphoto: "",
      cphotos: [{ model: null, per: 0 }],
      aphoto: "",
      aphotos: [{ model: null, per: 0 }],
      tableData: [],
      cWeight: null,
      aWeight: null,
      dialogFormVisible: false,
      tradeMarkEarTag: "",
      weight: "",
      loading: false
    };
  },
  mounted() {
    let id = this.$route.params.id;
    getUserById(id)
      .then(res => {
        this.user = res.data.model;
      })
      .then(this.fetchData);
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      //console.log(val);
      this.currentRow = val;
      this.tradeMarkEarTag = val.tradeMarkEarTag;
      this.weight = val.weight;
    },
    //上传图片并关联检疫合格证号
    selectFile(item, idx) {
      let file = this.$refs.cphoto[idx].files[0];
      item.model = file.name;
      item.file = file;
    },
    selectFile2(item, idx) {
      let file = this.$refs.aphoto[idx].files[0];
      item.model = file.name;
      item.file = file;
    },
    submit() {
      this.loading = true;
      let form = new FormData();
      if (!this.cWeight) {
        this.cWeight = (this.weight * 45) / 95;
      }
      if (!this.aWeight) {
        this.aWeight = (this.weight * 20) / 95;
      }
      form.append("carcassWeight", this.cWeight);
      form.append("appendageWeight", this.aWeight);
      form.append("operator", this.user.id);
      form.append("operatorName", this.user.userRealname);
      form.append("fatherNumber", this.tradeMarkEarTag);
      form.append("restaurantId", this.user.userFactory);
      this.cphotos.forEach((item, index) => {
        form.append("carcassPhoto", this.$refs.cphoto[index].files[0]);
      });
      this.aphotos.forEach((item, index) => {
        form.append("appendagePhoto", this.$refs.aphoto[index].files[0]);
      });
      console.log(form);
      let headers = {};
      headers[authStr] = window.localStorage.getItem(tokenStr);
      window
        .fetch(baseUrl + "/d/out/automaticSlaughter", {
          method: "POST",
          headers,
          body: form
        })
        .then(async res => {
          this.loading = false;
          let body = await res.json();
          if (isReqSuccessful(body)) {
            this.$message.success("提交成功");
            this.tradeMarkEarTag = "";
            this.weight = "";
            this.cWeight = "";
            this.aWeight = "";
            this.cphoto = "";
            this.aphoto = "";
            this.cphotos = [{ model: null, per: 0 }];
            this.aphotos = [{ model: null, per: 0 }];
            this.fetchData();
          } else {
            this.$message.error("提交失败");
          }
        });
    },
    //查看图片
    view(index) {
      this.pic = this.tableData[index].pic;
      this.dialogFormVisible = true;
    },
    Delete(index) {
      let data = {
        id: this.tableData[index].id,
        factory: this.user.userFactory
      };
      this.$confirm("你将删除这条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDataFromFactory(data).then(res => {
            if (res) {
              if (isReqSuccessful(res)) {
                this.$message.success("删除成功");
                this.fetchData();
                return;
              }
            } else {
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败"
          });
        });
    },
    //加载表格信息
    async fetchData() {
      let id = this.user.userFactory;
      let param = {
        type: 0,
        page: this.page - 1,
        size: 10
      };
      getFromFactoryData(id, param).then(res => {
        if (isReqSuccessful(res)) {
          let data = res.data;
          this.tableData = data.List;
          this.total = data.number;
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.time
  display: inline-block
  font-size: 0 !important
  width: 21% !important
  .time-span
    box-sizing: border-box
    display: inline-block
    height: h = 32px
    width: 30%
    line-height: h
    vertical-align: top
    font-size: 14px
    border: 1px solid color-main
    background-color: color-main
    color: #fff
    &+.el-input
      width: calc(100% - 141px)
  .ellipse
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
</style>

