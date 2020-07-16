<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/specs">规格列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>规格{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width:600px;" :rules="rules" :model="info" ref="specsForm">
      <el-form-item prop="specsname" label="属性名称">
        <el-input v-model="info.specsname"></el-input>
      </el-form-item>
      <el-form-item leabel="属性值" v-for="(item,index) of specaAttrs" :key="index">
        <div class="attritem">
          <el-input v-model="specaAttrs[index].value"></el-input>
          <el-button type="primary" @click="addAttr" v-if="index==0">新增</el-button>
          <el-button type="danger" @click="removeAttr(index)" v-else>删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfo('specsForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        id: "",
        specsname: "",
        status: true
      },
      tip: "添加",
      specaAttrs: [{ value: "" }],
      rules: {
        specsname: [
          { required: true, message: "属性名称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称长度不符合要求" }
        ],
        attrs: [{ required: true, message: "属性值不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.$route.params.specsid) {
      this.tip = "修改";
      this.$http
        .get(this.$apis.specsinfo, { id: this.$route.params.specsid })
        .then(res => {
          console.log(res);
          this.info = res.list[0];
          this.info.status = this.info.status == 1 ? true : false;
          this.info.attrs.map((d, i) => {
            if (i == 0) {
              this.specaAttrs[0].value = d;
            }else{
              this.specaAttrs.push({ value: d });

            }
          });
        });
    }
  },
  methods: {
    removeAttr(item) {
      this.specaAttrs.splice(item, 1);
    },
    addAttr() {
      this.specaAttrs.push({
        value: ""
      });
    },
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.status = data.status ? 1 : 2;
          let arr = [];
          this.specaAttrs.map(item => {
            arr.push(item.value);
          });
          data.attrs = arr ? arr.join(",") : "";
          let url = this.$apis.specsadd;
          if (this.$route.params.specsid) {
            (url = this.$apis.specsedit), (data.id = this.$route.params.specsid);
          }
          this.$http.post(url, data).then(res => {
            if (res.code == 200) {
              this.$router.push("/specs");
            } else {
              alert(1);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  margin: 20px;
}
.attritem {
  display: flex !important;
}
</style>