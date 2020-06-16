<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/menu">管理员列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>管理员{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width:600px;" :rules="rules" :model="info" ref="menuForm">
      <el-form-item label="角色" prop="pid">
        <el-select v-model="info.pid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option :value="0" label="顶级菜单">顶级菜单</el-option>
          <el-option
            v-for="menuitem of menus"
            :key="menuitem.id"
            :value="menuitem.id"
            :label="menuitem.title"
          >{{menuitem.title}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="title">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='pwd'>
        <el-input v-model="info.icon"></el-input>
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
        title: "",
        pid: "",
        icon: "",
        url: "",
        status: true,
        type: "1",
        pwd:''
      },
      rules: {
        title: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称长度不符合要求" }
        ],
        pid: [{ required: true, message: "请选择角色" }],
        pwd:[{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.$route.params.menuid) {
      this.tip = "修改";
      this.$axios({
        url: "/api/menuinfo",
        params: { id: this.$route.params.menuid }
      }).then(res => {
        console.log(res);

        this.info = res.data.list;
        this.info.status = this.info.status == 1 ? true : false;
        this.info.type = this.info.type.toString();
      });
    }
    this.$axios({
      url: "/api/menulist"
    }).then(res => {
      this.menus = res.data.list;
      console.log(this.menus);
    });
  },
  methods: {
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          let url = "/api/menuadd";
          if (this.$route.params.menuid) {
            (url = "/api/menuedit"), (data.id = this.$route.params.menuid);
          }
          axios.post(url, data).then(res => {
            console.log(data);
            if (res.data.code == 200) {
              this.$router.push("/menu");
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