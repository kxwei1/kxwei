<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/user/add')" type="primary">添加</el-button>
    <el-table
      :data="users"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所选角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status==1">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" @click="edit(item.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="total"
      @current-change="(n)=>pageChange(n)"
    ></el-pagination>
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
      users: [],
      menus: [],
      total: 0,
      pagesize: 2,
      nowpage: 1
    };
  },
  mounted() {
    this.getCount();
    this.getPage();
  },
  methods: {
    getCount() {
      this.$http.get(this.$apis.usercount).then(res => {
        this.total = res.list[0].total;
      });
    },
    getPage() {
      this.$http
        .get(this.$apis.userlist, { size: this.pagesize, page: this.nowpage })
        .then(res => {
          this.users = res.list;
        });
    },
    pageChange(n) {
      this.nowpage = n;
      this.getPage();
    },
    edit(uid) {
      console.log();

      this.$router.push("/user/" + uid);
    },
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios({
          url: this.$apis.userdelete,
          method: "post",
          data: { id }
        }).then(res => {
          this.getPage();
          this.getCount();
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