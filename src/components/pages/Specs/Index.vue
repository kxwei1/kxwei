<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/specs/add')" type="primary">添加</el-button>
    <el-table
      :data="specs"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="specsname" label="属性名称"></el-table-column>
      <el-table-column prop="attrs" label="属性值">
        <template slot-scope="scope">
          <el-tag type="primary" v-for="(item,index) of scope.row.attrs" :key="index">{{item}}</el-tag>
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
      specs: [],
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
      this.$http.get(this.$apis.specscount).then(res => {
        this.total = res.list[0].total;
      });
    },
    getPage() {
      this.$http
        .get(this.$apis.specslist, { size: this.pagesize, page: this.nowpage })
        .then(res => {
          this.specs = res.list;
        });
    },
    pageChange(n) {
      this.nowpage = n;
      this.getPage();
    },
    edit(specsid) {
      console.log();

      this.$router.push("/specs/" + specsid);
    },
    del(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.post(this.$apis.specsdelete, { id }).then(res => {
          if (res.code === 200) {
            this.specs=res.list
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