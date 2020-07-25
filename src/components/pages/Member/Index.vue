<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cates"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      >
      <el-table-column prop="uid" label="用户编号"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="password" label="用户密码"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <!-- <el-button type="primary" @click="edit(item.row.id)">编辑</el-button> -->
          <el-button type="primary" @click="edit(item.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(item.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="tip" :visible.sync="dialogIsShow" center>
      <el-form label-width="80px" style="width:500px;" :model="info" ref="menuForm">
        <el-form-item label="用户编号" prop="title">
          <el-input v-model="info.uid"></el-input>
          <!-- <el-input v-model="info.uid" disabled></el-input> -->
        </el-form-item>
        <el-form-item label="用户昵称" prop="title">
          <el-input v-model="info.nickname"></el-input>
          <!-- <el-input v-model="info.nickname" disabled></el-input> -->
        </el-form-item>
        <el-form-item label="手机号" prop="title">
          <el-input v-model="info.phone"></el-input>
          <!-- <el-input v-model="info.phone" disabled></el-input> -->
        </el-form-item>
        <el-form-item label="用户密码" prop="title">
          <el-input v-model="info.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="info.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitInfo('menuForm')">{{tip}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tip: "添加",
      formLabelWidth: "100px", //label宽度
      defaultProps: {
        children: "children",
        label: "title",
      },
      cates: [],
      dialogIsShow: false, //是否出现弹框
      menus: [],
      info: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: true,
      },
    };
  },
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("htuser"));
    this.$http.get(this.$apis.memberlist).then((res) => {
      this.cates = res.list;
      this.info.status = this.info.status == 1 ? true : false;
    });
  },
  methods: {
    memberup() {
      let userinfo = JSON.parse(localStorage.getItem("htuser"));
      this.$http.get(this.$apis.memberlist).then((res) => {
        this.cates = res.list;
        this.info.status = this.info.status == 1 ? true : false;
      });
    },
    submitInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          let url = (url = this.$apis.memberedit);
          data.uid = this.info.uid;
          this.$http.post(url, data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$router.push("/member");
            } else {
              alert(1);
            }
          });
        }
      });
      this.dialogIsShow = false;
    },
    add() {
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    edit(uid) {
      this.dialogIsShow = true;
      this.tip = "修改";
      this.$http.get(this.$apis.memberinfo, { uid: 1 }).then((res) => {
        console.log(res);
        this.info = res.list;
        this.info.status = this.info.status == 1 ? true : false;
        this.memberup();
      });
    },
    //编辑事件
    update() {
      console.log("弹出编辑窗口");
      this.dialogIsShow = true;
      this.isAdd = false;
    },
    subInfo() {
      //关闭弹框
      this.dialogIsShow = false;
      console.log(this.cates, "表单信息");
    },
    open() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>
<style>
.img {
  width: 100px;
  height: 100px;
}
</style>