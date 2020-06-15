
    <template>
  <div class="Menutable">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">系统设置</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Menutable' }">菜单设置</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>菜单设置</h1>

    <router-link class="block" to="/Menusetting">
      <el-button type="primary">添加</el-button>
    </router-link>

    <!-- 上级菜单(select)、菜单名称、菜单的图标、菜单地址、状态(switch) -->
    <el-table :data="menucon" stripe style="width: 100%">
      <el-table-column label="上级菜单" width="180">
        <el-select v-model="info.pid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" width="180"></el-table-column>
      <el-table-column label="菜单的图标" width="500">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="item">
          <el-switch v-model="item.row.select" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <router-link class="block" to="/Menusetting">
            <el-button type="primary">添加</el-button>
          </router-link>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style  scoped>
.Menutable {
  width: 100%;
  height: 100%;
}
.inputT {
  width: 50px;
}
.block {
  display: block;
  text-decoration: none;
}
</style>
<script>
export default {
  methods: {
    add(s) {},
    reduce(s) {
      if (s.row.num <= 1) {
        s.row.num = 1;
      } else {
        s.row.num--;
      }
    },
    edit(m) {
      console.log(m);
    }
  },
  data() {
    return {
      options: [
        {
          value: "0",
          label: "系统设置"
        },
        {
          value: "1",
          label: "用户设置"
        },
        {
          value: "2",
          label: "文章管理"
        }
      ],
      info: {
        pid: ""
      },

      menucon: [
        {
          id: 1000001,
          name: "AAAA",
          price: 3999.98,
          num: 1,
          select: true
        },
        {
          id: 1000002,
          name: "BBB",
          price: 599.6,
          num: 1,
          select: true
        },
        {
          id: 1000003,
          name: "CCC",
          price: 399.9,
          num: 1,
          select: true
        }
      ]
    };
  }
};
</script>