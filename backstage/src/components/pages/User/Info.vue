<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/user">管理员列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width:600px;" :rules="rules" :model="info" ref="menuForm">
      <el-form-item prop="roleid" label="角色">
        <el-select v-model="info.roleid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="roleitem of roles"
            :key="roleitem.id"
            :value="roleitem.id"
            :label="roleitem.rolename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input type='password' v-model="info.password"></el-input>
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
        roleid: "",
        username: "",
        password: "",
        status: true
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称长度不符合要求" }
        ],
        roleid: [{ required: true, message: "请选择角色" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      users: [],
      roles: []
    };
  },
  mounted() {
    if (this.$route.params.uid) {
      this.tip = "修改";
      this.$http.get( "/api/userinfo",{ uid: this.$route.params.uid }
      ).then(res => {
        this.info = res.list;
        this.info.status = this.info.status == 1 ? true : false;
      })
    }
    this.$http.get( "/api/rolelist").then(res => {
          this.roles = res.list;
        })
  },
  methods: {
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          let url = "/api/useradd";
          if (this.$route.params.uid) {
            (url = "/api/useredit"), (data.id = this.$route.params.uid);
          }
          this.$http.post(url, data).then(res => {
            if (res.code == 200) {
              this.$router.push("/user");
            } else {
              alert(1);
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