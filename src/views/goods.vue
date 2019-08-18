<template>
  <div>
    <!-- 面包屑 -->
    <bread xx="商品管理" oo="商品列表"></bread>
    <!-- 输入框 -->
    <el-input placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加按钮 -->
    <el-button type="success" plain>添加用户</el-button>
    <!-- 表格 -->
    <el-table ref="singleTable" :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="goods_name" label="商品名称" width="500"></el-table-column>
      <el-table-column property="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column property="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column property="add_time" label="创建时间" width="150"></el-table-column>
      <el-table-column property="operation" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delGoods(scope.row)"
          ></el-button>
          <!-- {{scope.row}} -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchParams.pagenum"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="searchParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { goodsList, deleteGoods } from "../api/http";
export default {
  data() {
    return {
      //分页器总页数
      total: 5,
      //列表数据
      tableData: [],
      //查询的对象
      searchParams: {
        //每页显示条数
        pagesize: 50,
        //当前页码
        pagenum: 1,
        //查询参数
        query: ""
      }
    };
  },
  methods: {
    //删除当前商品
    delGoods(good) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "删除商品", {
        type: "warning"
      })
        .then(() => {
          // console.log(good.goods_id);

          deleteGoods(good.goods_id).then(res => {
            //   console.log(res);

            if (res.data.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //重新渲染页面
              this.getGoods();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //当前页改变事件
    handleCurrentChange(page) {
      //修改当前页码为你被点击的页码
      this.searchParams.pagenum = page;
      //重新渲染
      this.getGoods();
    },
    //当前页容量改变事件
    handleSizeChange(size) {
      //改变页容量
      this.searchParams.pagesize = size;
      //页容量发生改变 重新显示第一页
      this.searchParams.pagenum = 1;
      //重新渲染
      this.getGoods();
    },
    //封装渲染页面 方便多次调用
    getGoods() {
      // 渲染页面
      goodsList(this.searchParams).then(res => {
        // console.log(res);
        this.tableData = res.data.data.goods;
        //总数
        this.total = res.data.data.total;
      });
    }
  },
  created() {
    // 渲染页面
    this.getGoods();
  }
};
</script>

<style lang="less" scoped>
.input-with-select {
  width: 300px;
  margin-right: 5px;
}
</style>