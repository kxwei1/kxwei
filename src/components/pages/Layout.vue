<template>
  <el-container>
    <el-header>
      <el-tag>
        <i class="el-icon-user-solid"></i>
        {{userInfo.username}}
      </el-tag>
      <el-button type="warning" @click="esc()">退出</el-button>
    </el-header>
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
import { mapGetters ,mapActions} from "vuex";
import vNav from "../views/Nav";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(['setAdminUserSync']),
    esc() {
      this.setAdminUserSync({});
      this.$router.push("/login");
    }
  },
  components: {
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
  text-align: right;
  background-color: skyblue;
}
.el-footer {
  background-color: #888;
}
</style>
