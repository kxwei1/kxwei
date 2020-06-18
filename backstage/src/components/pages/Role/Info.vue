<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/role">角色管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width:600px;" :rules="rules" :model="info" ref="menuForm">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="info.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree
          :data="menus"
          :props="defaultProps"
          ref="tree"
          default-expand-all
          node-key="id"
          :default-checked-keys="info.menus"
          show-checkbox
          check-strictly
        ></el-tree>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfo('menuForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tip: "添加",
      menus: [],
      info: {
        rolename: "",
        menus: [],
        status: true
      },
      defaultProps: {
        children: "children",
        label: "title"
      },
      rules: {
        rolename: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称长度不符合要求" }
        ],
        rid: [{ required: true, message: "请选择角色权限" }]
      }
    };
  },
  mounted() {
    console.log(this.$route.params.roleid);
    
    if (this.$route.params.roleid) {
      this.tip = "修改";
      this.$http.get("/api/roleinfo",{ id: this.$route.params.roleid }
      ).then(res => {
        this.info = res.list;
        this.info.status = this.info.status == 1 ? true : false;
        this.info.menus = this.info.menus ? this.info.menus.split(",") : "";
      });
    }
    this.$http.get("/api/menulist",{ istree: 1 }
    ).then(res => {
      this.menus = res.list;
    });
  },
  methods: {
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          let url = "/api/roleadd";
          if (this.$route.params.roleid) {
            (url = "/api/roleedit"), (data.id = this.$route.params.roleid);
          }
          data.menus = this.$refs.tree.getCheckedKeys()
            ? this.$refs.tree.getCheckedKeys().join(",")
            : "";

          this.$http.post(url, data).then(res => {
            if (res.code == 200) {
              this.$router.push("/role");
            } else {
              alert(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  margin: 20px;
}
</style>