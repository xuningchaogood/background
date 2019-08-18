<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-input
      placeholder="请输入内容"
      v-model.trim="searchParams.query"
      @input="getUsers"
      class="input-with-select"
    >
      <el-button @clikc="getUsers" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加按钮 -->
    <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
    <!-- 表格 -->
    <el-table :border="true" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="220"></el-table-column>
      <el-table-column property="email" label="邮箱" width="220"></el-table-column>
      <el-table-column property="mobile" label="电话" width="220"></el-table-column>
      <el-table-column property="mg_state" label="用户状态" width="100">
        <!-- 自定义列 -->
        <template slot-scope="scope">
          <!-- 按钮 -->
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeColor(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
          <!-- {{scope.row}} -->
        </template>
      </el-table-column>
      <el-table-column property="phone" label="操作" width="220">
        <!-- 自定义列 -->
        <template slot-scope="scope">
          <!-- 编辑用户 -->
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="show(scope.row)"></el-button>
          <!-- 删除用户 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delUsers(scope.row)"
          ></el-button>
          <!-- 编辑权限 -->
          <el-button
            type="warning"
            icon="el-icon-check"
            plain
            size="mini"
            @click="show2(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchParams.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input class="long" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input class="long" show-password v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px">
          <el-input class="long" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="120px">
          <el-input class="long" v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="修改用户" :visible.sync="dialogTableVisible">
      <el-form :model="toform">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input class="long" v-model="toform.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px">
          <el-input class="long" v-model="toform.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="120px">
          <el-input class="long" v-model="toform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="redUsers(toform)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="diaone">
      <el-form :model="toform">
        <el-form-item label="当前用户" label-width="120px" prop="username">
          <el-input class="long" v-model="toform.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaone = false">取 消</el-button>
        <el-button type="primary" @click="redUsers(toform)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { users, addUsers, status, delUsers, redUsers } from "../api/http";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
          disabled: true
        },
        {
          value: "选项2",
          label: "双皮奶",
          
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      //控制新增对话按钮显示或隐藏的
      dialogFormVisible: false,
      //控制编辑用户信息显示或隐藏
      dialogTableVisible: false,
      //控制编辑权限弹框的显示与隐藏
      diaone: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      toform: {
        username: "",
        email: "",
        mobile: "",
        id: 0
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "change"
          }
        ]
      },
      //表格数据
      tableData: [],
      //总页数
      total: 5,

      //查询参数对象
      searchParams: {
        query: "",
        //当前页码
        pagenum: 1,
        //每页显示条数
        pagesize: 5
      }
    };
  },
  methods: {
    //显示编辑权限弹框
    show2(good) {
      //显示
      this.diaone = true;
    },
    //显示编辑用户的弹框
    show(good) {
      //显示
      this.dialogTableVisible = true;
      //获取被点击的那一行的数据 同步在弹框上面
      this.toform.username = good.username;
      this.toform.email = good.email;
      this.toform.mobile = good.mobile;
      this.toform.id = good.id;
    },
    //编辑用户
    redUsers(good) {
      //请求
      redUsers(this.toform).then(res => {
        //判断
        if (res.data.meta.status == 200) {
          this.$message.success(res.data.meta.msg);
          //隐藏弹框
          this.dialogTableVisible = false;
          //重新渲染页面
          this.getUsers();
        } else {
          //显示后台的报错
          this.$message.error(res.data.meta.msg);
        }
      });
    },
    //删除当前点击的用户
    delUsers(good) {
      // console.log(good);

      delUsers({ id: good.id }).then(res => {
        //判断
        if (res.data.meta.status == 200) {
          //调用插件
          this.$confirm("此操作将永久删除该文件, 是否继续?", "删除用户", {
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //调用重新渲染页面
              this.getUsers();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "讨厌~ 别吓人家嘛"
              });
            });
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },
    //状态改变事件
    changeColor(good) {
      //传入暴露的http
      status({ uId: good.id, type: good.mg_state }).then(res => {
        // console.log(res);
        //判断
        if (res.data.meta.status == 200) {
          this.$message.success(res.data.meta.msg);
        } else {
          this.$message.warning(res.data.meta.msg);
        }
      });
    },
    //新增用户的点击事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUsers(this.form).then(res => {
            //判断
            if (res.data.meta.status == 201) {
              //隐藏弹框
              this.dialogFormVisible = false;
              //重新渲染页面
              this.getUsers();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    //页容量改变事件
    handleSizeChange(size) {
      //改变页容量
      this.searchParams.pagesize = size;
      //页容量发生改变 应该数据从第一页重新显示
      this.searchParams.pagenum = 1;
      //重新获取数据
      this.getUsers();
    },
    //页码改变事件
    handleCurrentChange(page) {
      //修改当前页码为你被点击的页码
      this.searchParams.pagenum = page;
      //发请求获取这一页的数据
      this.getUsers();
    },
    //封装方便调用
    getUsers() {
      if (this.searchParams.query != "") this.searchParams.pagenum = 1;
      users(this.searchParams).then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    }
  },
  //页面一显示就调用
  created() {
    this.getUsers();
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
  margin-right: 5px;
}
.long {
  width: 100%;
}
.el-breadcrumb {
  height: 45px;
  background-color: #d3dce6;
  margin-top: -20px;
  padding-left: 15px;
  line-height: 45px;
}
</style>