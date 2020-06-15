<template>
  <el-container style>
    <v-menu></v-menu>
      
    <router-view class="right container"></router-view>

  </el-container>
</template>

<script>
import vMenu from "../pages/Menu";
import vRight from "../pages/Right";
export default {
  components: {
    vMenu,
    vRight
  }
};
</script>
