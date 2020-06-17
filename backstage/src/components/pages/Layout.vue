<template>
  <el-container>
    <el-header>
      <el-tag>
        <i class="el-icon-user-solid"></i>
        {{username}}
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
import vNav from "../views/Nav";
export default {
  data() {
    return {
        username: ""
    };
  },
  mounted(){
    this.username=JSON.parse(localStorage.getItem("htuser")).username
    // console.log(JSON.parse(localStorage.getItem("htuser")).username);
    
  },
  methods:{
    esc(){
      window.localStorage.clear()
      this.$router.push('/login')
    }
  },
  components: {
    vNav
  },
  beforeRouteEnter(to, from, next) {
    let userinfo = localStorage.getItem("htuser") || "";
    if (userinfo) {
      next();
    } else {
      next("/login");
    }
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
