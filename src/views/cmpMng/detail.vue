<template>
  <div class="detail">
    <el-row class="panel-title">
      <el-col :span="24">
        <span>基本信息</span>
      </el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-row style="margin-top:20px">
        <el-col :span="12">
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input v-model.trim="ruleForm.enterpriseName" placeholder="企业名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业规模" prop="enterpriseScale">
            <el-select v-model="ruleForm.enterpriseScale">
              <el-option label="请选择" value></el-option>
              <el-option label="100人以下" value="100人以下"></el-option>
              <el-option label="100人至300人" value="100人至300人"></el-option>
              <el-option label="300人至500人" value="300人至500人"></el-option>
              <el-option label="500人以上" value="500人以上"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业地址" prop="enterpriseAddress">
            <el-input v-model.trim="ruleForm.enterpriseAddress" placeholder="请输入企业地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业logo">
            <div class="upload-btn cur-p">
              <input type="file" class="upload-input" />
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="panel-title">
        <el-col :span="24">
          <span>联系人信息</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人姓名" prop="contactPerson">
            <el-input v-model.trim="ruleForm.contactPerson" placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人手机" prop="contactPhone">
            <el-input v-model.trim="ruleForm.contactPhone" placeholder="请输入联系人手机"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!ruleForm.tenantId">
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model.trim="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { createCmp, updateCmp } from "@/request/apis/cmpMng";
import { deepClone } from "@/libs/util/utils";
export default {
  props: {
    cmpObj: Object
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        enterpriseName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        enterpriseScale: [
          {
            required: true,
            message: "请选择企业规模",
            trigger: "blur"
          }
        ],
        enterpriseAddress: [
          {
            required: true,
            message: "请输入企业地址",
            trigger: "blur"
          }
        ],
        contactPerson: [
          {
            required: true,
            message: "请输入联系人姓名",
            trigger: "blur"
          }
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入联系人手机",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    cmpObj: {
      handler(val) {
        this.$nextTick(() => {
          this.clearForm();
          this.ruleForm = deepClone(val);
        });
      },
      immediate: true
    }
  },
  methods: {
    onConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.ruleForm.tenantId) {
            createCmp(this.ruleForm)
              .then(res => {
                if (res.code == "0") {
                  this.$emit("createSuccess", "add");
                } else {
                  this.$message.error({
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            updateCmp(this.ruleForm.tenantId, this.ruleForm)
              .then(res => {
                console.log('我进来了')
                if (res.code == "0") {
                  this.$emit("createSuccess", "edit");
                } else {
                  this.$message.error({
                    message: res.msg
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });
    },
    clearForm() {
      this.$refs.ruleForm.clearValidate();
    }
  }
};
</script>

<style scoped lang="less">
@import url("detail.less");
</style>
