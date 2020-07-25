<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="add" type="primary">添加</el-button>
    <el-table
      :data="cates"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      >
      <el-table-column prop="title" label="用户编号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="edit(item.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="tip" :visible.sync="dialogIsShow" center>
      <el-form label-width="80px" style="width:500px;" :model="info" ref="menuForm">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="info.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="title">
          <el-time-select
            placeholder="起始时间"
            v-model="info.begintime"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="info.endtime"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: info.begintime
    }"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="一级分类" porp="first_cateid">
          <el-select @change="cateChange" v-model="info.first_cateid" placeholder="请选择">
            <el-option value>请选择</el-option>
            <el-option
              v-for="cateitem of firstCates"
              :value="cateitem.id"
              :key="cateitem.id"
              :label="cateitem.catename"
            >{{cateitem.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" porp="second_cateid">
          <el-select @change="scondcateChange" v-model="info.second_cateid" placeholder="请选择">
            <el-option value>请选择</el-option>
            <el-option
              v-for="secondcate of secondCates"
              :value="secondcate.id"
              :key="secondcate.id"
              :label="secondcate.catename"
            >{{secondcate.catename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" porp="goodsid">
          <el-select v-model="info.goodsid" placeholder="请选择">
            <el-option value>请选择</el-option>
            <el-option
              v-for="item of goods"
              :value="item.id"
              :key="item.id"
              :label="item.goodsname"
            >{{item.goodsname}}</el-option>
          </el-select>
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
      goods: [],
      cates: [],
      firstCates: [],
      secondCates: [],
      dialogIsShow: false, //是否出现弹框
      menus: [],
      info: {
        title: "",
        begintime: "",
        first_cateid: "",
        second_cateid: "",
        endtime: "",
        goodsid: "",
        status: true,
      },
    };
  },
  mounted() {
    this.$http.get(this.$apis.goodslist).then((res) => {
      this.goods = res.list;
    });
    let userinfo = JSON.parse(localStorage.getItem("htuser"));
    this.seckupdate();
    this.$http.get(this.$apis.catelist, { pid: 0 }).then((res) => {
      this.firstCates = res.list;
    });
  },
  methods: {
    seckupdate() {
      this.$http.get(this.$apis.secklist).then((res) => {
        this.cates = res.list;
        this.info.status = this.info.status == 1 ? true : false;
      });
    },
    cateChange(e) {
      if (e == "") {
        return false;
      } else {
        this.$http.get(this.$apis.cateslist, { pid: e }).then((res) => {
          this.secondCates = res.list;
        });
      }
    },
    scondcateChange(e) {
      if (e == "") {
        return false;
      } else {
        this.$http.get(this.$apis.cateslist, { pid: e }).then((res) => {
          this.secondCates = res.list;
        });
      }
    },

    submitInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          let url = (url = this.$apis.seckadd);
          this.$http.post(url, data).then((res) => {
            if (res.code == 200) {
              this.dialogIsShow = false;
            } else {
              alert(1);
            }
          });
        }
      });
    },
    add() {
      console.log(this.tip);
      this.dialogIsShow = true;
      this.isAdd = true;
      this.tip='添加'
    },
    edit(id) {
      this.dialogIsShow = true;
      this.tip = "修改";
      console.log(this.cates);
      this.$http.get(this.$apis.seckinfo, { id }).then((res) => {
        console.log(res);
        this.info = res.list;
        this.info.status = this.info.status == 1 ? true : false;
      });
    },
    //编辑事件
    update() {
      console.log("弹出编辑窗口");
      this.dialogIsShow = true;
      this.isAdd = false;
    },
    //删除事件
    del(id) {
      console.log("删除事件");
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post(this.$apis.seckdelete, { id }).then((res) => {
          if (res.code === 200) {
            this.seckupdate();

            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            alert("删除失败");
          }
        });
      });
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
.el-date-editor.el-input {
  width: 200px;
}
.img {
  width: 100px;
  height: 100px;
}
</style>