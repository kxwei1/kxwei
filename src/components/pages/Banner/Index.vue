<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/banner/add')" type="primary">添加</el-button>
    <el-table
      :data="cates"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template slot-scope="item">
          <img class="img" :src="item.row.img" alt />
        </template>
      </el-table-column>
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
      cates: []
    };
  },
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("htuser"));
    this.$http.get("/api/bannerlist", { istree: 1 }).then(res => {
      this.cates = res.list;
    });
  },
  methods: {
    edit(mid) {
      this.$router.push("/banner/" + mid);
    },
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.post("/api/bannerdelete", { id }).then(res => {
          this.$axios.get("/api/bannerlist").then(res => {
            this.menus = res.list;
          });
          if (res.code === 200) {
            this.$http.get("/api/bannerlist", { istree: 1 }).then(res => {
              this.cates = res.list;
            });
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
.img {
  width: 100px;
  height: 100px;
}
</style>