<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/category">菜单列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width:600px;" :rules="rules" :model="info" ref="cateForm">
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="info.pid" placeholder="请选择">

          <el-option value>请选择</el-option>
          <el-option :value='0' label='顶级菜单'></el-option>
          <el-option
            v-for="menuitem of cates"
            :key="menuitem.id"
            :value="menuitem.id"
            :label="menuitem.catename"
          >{{menuitem.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="info.catename"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="fileChange"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfo('cateForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      tip: "添加",
      info: {
        pid: "",
        catename: "",
        status: true
      },
      img: "",
      rules: {
        title: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称长度不符合要求" }
        ],
        pid: [{ required: true, message: "请选择上级菜单" }]
      },
      cates:[]
    };
  },
  mounted() { 
    this.$http.get(this.$apis.catelist).then(res=>{
      this.cates=res.list
      console.log(this.cates);
      
    })
    if (this.$route.params.cateid) {
      this.tip = "修改";
      this.$http
        .get(this.$apis.cateinfo, { id: this.$route.params.cateid })
        .then(res => {
          this.img = res.list.img;
          this.fileList =this.img? [{ url: this.img }]:[];
          this.info = res.list;
          this.info.status = this.info.status == 1 ? true : false;
        });
    }
  },
  methods: {
    fileChange(file) {
      this.img = file.raw;
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          let url = this.$apis.cateadd;
          if (this.$route.params.cateid) {
            url = this.$apis.cateedit;
            data.id = this.$route.params.cateid;
          }
          data.status = data.status ? 1 : 2;
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          form.append("img", this.img);
          this.$http.post(url, form).then(res => {
            if (res.code == 200) {
              this.$router.push("/category");
            } else {
              console.log(3);
              
              alert(res.msg);
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
</style>