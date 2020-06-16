<template>
  <el-container>
    <el-header>header</el-header>
    <el-container>
      <v-nav></v-nav>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>footer</el-footer>
  </el-container>
</template>

<script>
import vNav from '../views/Nav'
export default {
    components:{
        vNav
    }
};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: skyblue;
}
.el-footer {
  background-color: #888;
}
</style>
