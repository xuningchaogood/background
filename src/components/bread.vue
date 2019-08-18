<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{xx}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{oo}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["xx", "oo"]
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 45px;
  background-color: #d3dce6;
  margin-top: -20px;
  padding-left: 15px;
  line-height: 45px;
}
</style>