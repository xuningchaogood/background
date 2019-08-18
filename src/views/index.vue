<template>
  <el-container>
    <el-header>
      <img src="../assets/logo (1).png" alt />
      <span>徐氏养猪场后台管理</span>
      <a href="#" @click.prevent="logout">退出</a>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :unique-opened="true" router class="el-menu-vertical-demo">
          <el-submenu :index="''+index" v-for="item,index in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/index/'+subItem.path" v-for="subItem in item.children">
                <i class="el-icon-menu"></i>
                {{subItem.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from "../api/http";
export default {
  name:'index',
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    logout() {
      this.$confirm(" 你真的要退出嘛, 是否继续?", "用户退出", {
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          //删掉token
          window.localStorage.removeItem("token");
          //跳回首页
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "嚯? 猪场需要你!"
          });
        });
    }
  },
  created() {
    menus().then(res => {
      //   console.log(res);
      this.menuList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #b3c0d1;
    text-align: center;
    span {
      font-size: 25px;
      color: #fff;
    }
    a {
      color: orange;
      font-size: 20px;
    }
  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>