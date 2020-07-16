<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="$router.push('/goods/add')" type="primary">添加</el-button>
    <el-table
      :data="specs"
      style="width:100%"
      border
      stripe
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template slot-scope="item">
          <img class="img" :src="item.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <el-tag v-if="item.row.isnew==1">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <el-tag v-if="item.row.ishot==1">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
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
      goods: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      specs: [],
      total: 0,
      pagesize: 5,
      nowpage: 1
    };
  },
  mounted() {
    this.getCount();
    this.getPage();
  },
  methods: {
    getCount() {
      this.$http.get(this.$apis.goodscount).then(res => {
        this.total = res.list[0].total;
      });
    },
    getPage() {
      this.$http
        .get(this.$apis.goodslist, { size: this.pagesize, page: this.nowpage })
        .then(res => {
          this.specs = res.list;
        });
    },
    pageChange(n) {
      this.nowpage = n;
      this.getPage();
    },
    edit(specsid) {
      this.$router.push("/goods/" + specsid);
    },
    del(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http.post(this.$apis.goodsdelete, { id }).then(res => {
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
<style scoped>
.img {
  width: 100px;
}
</style>
