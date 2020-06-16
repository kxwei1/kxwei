<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/admin/add')" type="primary">添加</el-button>
    <el-table
      :data="menus"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      >
      <el-table-column prop="id" label="角色" width="80px"></el-table-column>
      <el-table-column prop="title" label="用户名"></el-table-column>
      <el-table-column prop="icon" label="密码"></el-table-column>
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
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title"
      },
      menus: []
    };
  },
  mounted() {
    this.$axios({
      url: "/api/menulist",
      params: { istree: 1 }
    }).then(res => {
      
      this.menus = res.data.list;
    });
  },
  methods: {
    edit(mid) {
      this.$router.push("/menu/" + mid);
    },
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios({
          url: "/api/menudelete",
          method: "post",
          data: { id }
        }).then(res => {
          this.$axios.get("/api/menulist").then(res => {
            console.log(res.data.list);
            this.menus = res.data.list;
          });
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            alert("删除失败");
          }
        });
      });
    }
  }
};
</script>
<style>
</style>