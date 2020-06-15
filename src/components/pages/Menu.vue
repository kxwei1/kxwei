<template>
  <el-aside>
    <el-menu
      :default-active="defaultActive"
      router
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Setting">管理员管理</el-menu-item>
          <el-menu-item index="/Menutable">菜单设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: "管理员管理",
          path: "/index/Setting"
        },
        {
          title: "菜单设置",
          path: "/index/Menusetting"
        }
      ],
      defaultActive: ""
    };
  },
  mounted() {
    this.defaultActive = this.$route.meta.select;
  },
  watch: {
    $route(newVal) {
      this.defaultActive = newVal.meta.select;
    }
  }
};
</script>

<style lang='css' scoped>
.el-aside {
  background-color: #545c64;
}
</style>