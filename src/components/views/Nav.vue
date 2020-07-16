<template>
  <el-aside style="width:150px;">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      active-text-color="#ffd04b"
      router
      :unique-opened="true"
      :default-active="defaultActive"
    >
      <div v-for="item in userInfo.menus" :key="item.title">
        <el-submenu v-if="item.children" :index="item.url">
          <template slot="title">
            <i :class="item.icon"></i>
            {{ item.title }}
          </template>
          <el-menu-item
            v-for="children in item.children"
            :key="children.title"
            :index="children.url"
          >{{ children.title }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.url">
          <i :class="item.icon"></i>
          {{ item.title }}
        </el-menu-item>
      </div>
    </el-menu>
  </el-aside>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      menus: [],
      defaultActive: ""
    };
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
};
</script>
<style scoped>
.el-aside {
  background-color: #545c64;
}
.el-submenu .el-menu-item {
  min-width: 148px;
}
</style>