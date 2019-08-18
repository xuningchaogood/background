<template>
  <div>
    <bread xx="权限管理" oo="权限列表"></bread>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column property="path" label="路径" width="200"></el-table-column>
      <el-table-column property="level" label="层级" width="200"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rights } from "../api/http";
export default {
  data() {
    return {
      //权限列表
      tableData: []
    };
  },
  created() {
    rights("list").then(res => {
      let data = res.data.data;
      for (let i = 0; i < data.length; i++) {
        switch (data[i].level) {
          case "0":
            data[i].level = "一级";
            break;
          case "1":
            data[i].level = "二级";
            break;
          case "2":
            data[i].level = "三级";
            break;

          default:
            break;
        }
      }

      this.tableData = data;
    });
  }
};
</script>

<style>
</style>