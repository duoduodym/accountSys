<template>
  <div class="container">
    <pagePanel
      ref="pagePanel"
      :url="apis.cmpMng.find"
      fromType="tenants"
      :searchForm="searchForm"
      :joinForm="searchForm"
    >
      <template slot="search-item">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关键字搜索">
              <el-input v-model="searchForm.enterpriseNameAndPhoneMatch" placeholder="企业名称/联系人/手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业规模">
              <el-select v-model="searchForm.enterpriseScale">
                <el-option label="请选择" value></el-option>
                <el-option label="100人以下" value="1"></el-option>
                <el-option label="100人至300人" value="2"></el-option>
                <el-option label="300人至500人" value="3"></el-option>
                <el-option label="500人以上" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template slot="operation-bar">
        <el-button type="primary" size="small" @click="createCmp">新增</el-button>
      </template>
      <template slot="column">
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="enterpriseScale" label="企业规模"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人"></el-table-column>
        <el-table-column prop="contactPhone" label="联系人电话"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="table-btn-blue"
              @click="editCmp(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              class="table-btn-red"
              v-if="scope.row.tenantStatus == 2"
              @click="onSwitch(scope.row)"
            >停用</el-button>
            <el-button
              type="text"
              size="small"
              class="table-btn-blue"
              v-if="scope.row.tenantStatus == 1"
              @click="onSwitch(scope.row)"
            >启用</el-button>
            <el-button type="text" size="small" class="table-btn-red" @click="onDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </pagePanel>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="900px"
      top="2vh"
      :close-on-click-modal="false"
    >
      <detail ref="detail" :cmpObj="cmpObj" @createSuccess="createSuccess" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagePanel from "@/components/pagePanel/pagePanel";
import detail from "./detail";
import apis from "@/request/apis/apis";
import { switcheCmp, delCmp } from "@/request/apis/cmpMng";
export default {
  components: {
    pagePanel,
    detail
  },
  data() {
    return {
      title: "",
      cmpObj: {},
      apis,
      dialogFormVisible: false,
      searchForm: {}
    };
  },

  methods: {
 
    onDel(row) {
      this.$messageBox
        .confirm("是否要删除所选数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          delCmp(row.tenantId).then(res => {
            if (res.code == "0") {
              setTimeout(() => {
                this.$refs.pagePanel.onSearch();
              }, 2000);
              this.$message.success("删除成功");
            } else {
              this.$message.error({
                message: res.msg
              });
            }
          });
        });
    },
    onSwitch(row) {
      const state = row.tenantStatus == 1 ? 2 : 1;
      const str = state == 2 ? "是否要停用所选数据?" : "是否要启用所选数据?";
      const str1 = state == 2 ? "停用成功" : "启用成功";
      this.$messageBox
        .confirm(str, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(res => {
          switcheCmp(row.tenantId, {
            status: state
          }).then(res => {
            if (res.code == 0) {
              this.$message.success(str1);
            }
          });
        });
    },
    editCmp(row) {
      this.title = "编辑企业";
      this.cmpObj = row;
      this.dialogFormVisible = true;
    },
    createSuccess(type) {
      const str = type == "add" ? "添加成功" : "编辑成功";
      this.$message.success({
        message: str
      });
      setTimeout(() => {
        this.$refs.pagePanel.onSearch();
        this.dialogFormVisible = false;
      }, 2000);
    },
    createCmp() {
      this.title = "新增企业";
      this.cmpObj = {};
      this.dialogFormVisible = true;
    },

    onConfirm() {
      this.$refs.detail.onConfirm();
    }
  }
};
</script>

<style scoped lang="less">
</style>
