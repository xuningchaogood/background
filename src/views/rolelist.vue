<template>
  <div>
    <!-- 面包屑 -->
    <bread xx="权限管理" oo="角色列表"></bread>
    <!-- 点击按钮添加 -->
    <el-button @click="dialogFormVisible=true">添加角色</el-button>
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column width="50">
        <i class="el-icon-arrow-right"></i>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column property="roleName" label="角色名称"></el-table-column>
      <el-table-column property="roleDesc" label="角色描述"></el-table-column>
      <el-table-column property="operation" label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="editRole(scope.row)"
          ></el-button>
          <!-- {{scope.row}} -->
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delRole(scope.row)"
          ></el-button>
          <!-- 分配权限 -->
          <el-button type="warning" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input class="long" v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input class="long" v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleFormVisible">
      <el-form :model="editform" :rules="rules" ref="ruleForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input class="long" v-model="editform.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input class="long" v-model="editform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, addRole, delRole, editRole } from "../api/http";
export default {
  data() {
    return {
      //编辑列表数据
      editform: {
        roleName: "",
        roleDesc: "",
        id: 0
      },
      //角色列表数据
      tableData: [],
      //编辑角色弹框显示与隐藏
      editRoleFormVisible: false,
      //添加角色弹框显示与隐藏
      dialogFormVisible: false,

      //添加角色表格
      form: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //判断是否输入内容并编辑
    submitEditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editRole(this.editform).then(res => {
            // console.log(res);
            if(res.data.meta.status==200) {
                this.$message.success('编辑成功')
                //隐藏
                this.editRoleFormVisible=false;
                //重新渲染
                this.getRoles();
            }else {
                this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //显示编辑框
    editRole(good) {
      //显示弹框
      this.editRoleFormVisible = true;
      //赋值
      this.editform.roleName = good.roleName;
      this.editform.roleDesc = good.roleDesc;
      this.editform.id = good.id;
    },
    //判断是否输入内容并添加角色
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addRole(this.form).then(res => {
            // console.log(res);
            if (res.data.meta.status == 201) {
              this.$message.success("创建成功");
              //隐藏
              this.dialogFormVisible = false;
              //重新渲染页面
              this.getRoles();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    //删除角色
    delRole(good) {
      this.$confirm("此操作将永久该角色, 是否继续?", "是否删除", {
        type: "warning"
      })
        .then(() => {
          //判断
          delRole(good.id).then(res => {
            if (res.data.meta.status == 200) {
              //提示
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //重新渲染页面
              this.getRoles();
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
    //封装函数 方便调用
    getRoles() {
      getRoles().then(res => {
        //   console.log(res);
        this.tableData = res.data.data;
      });
    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style>
</style>