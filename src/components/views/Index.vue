<template>
  <el-container>
    <v-top></v-top>
    <v-main></v-main>
    <el-footer>footer</el-footer>
  </el-container>
</template>

<script>
import vTop from '../pages/Top'
import vMain from '../views/Main'
import vBottom from '../pages/Bottom'
export default {
  components:{
    vTop,
    vMain,
    vBottom,
  }
};
</script>

<style>
.el-container {
  width: 100;
  height: 100%;
}
.el-footer {
  background-color: #888;
}

</style>
