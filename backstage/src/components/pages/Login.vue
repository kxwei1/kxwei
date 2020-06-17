<template>
  <div>
    <el-form ref="loginForm" :model="info" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="info.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="info.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="submitInfo('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      info: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  methods: {

    submitInfo(form) {
        this.$axios({
            url:'/api/userlogin',
            method:'post',
            data:this.info
        }).then(res=>{
            if(res.data.code===200){
                localStorage.setItem('htuser',JSON.stringify(res.data.list))
                this.$router.push('/')
            } 
            else{
                this.$message(res.data.msg)
            }           
        })
    }
  }
};
</script>
<style lang="css" scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 60px 25px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.el-button {
  margin-left: -50px;
  width: 320px;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>