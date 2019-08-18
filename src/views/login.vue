<template>
  <div class="box">
    <div class="form">
      <h1>用户登录</h1>
      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/http";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //在这里发请求
          login(this.ruleForm).then(res => {
            if (res.data.meta.status == 200) {
              //登录成功提示一下
              this.$message.success(res.data.meta.msg);

              //跳转之前先保存token
              window.localStorage.setItem("token", res.data.data.token);
              //跳到首页
              this.$router.push("/index");
            }else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scope>
.box {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 500px;
    height: 360px;
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    .el-button {
      width: 100%;
    }
    h1 {
      margin-bottom: 30px;
    }
  }
}
</style>