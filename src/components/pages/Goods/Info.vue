<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#/goods">商品列表</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width:800px;" :rules="rules" :model="info" ref="goodForm">
      <el-form-item label="一级分类" porp="first_cateid">
        <el-select @change="cateChange" v-model="info.first_cateid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="cateitem of cates"
            :value="cateitem.id"
            :key="cateitem.id"
            :label="cateitem.catename"
          >{{cateitem.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" porp="second_cateid">
        <el-select v-model="info.second_cateid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="secondcate of secondCates"
            :value="secondcate.id"
            :key="secondcate.id"
            :label="secondcate.catename"
          >{{secondcate.catename}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="goodsname" label="商品名称">
        <el-input v-model="info.goodsname"></el-input>
      </el-form-item>
      <el-form-item prop="price" label="价格">
        <el-input v-model="info.price" type="number"></el-input>
      </el-form-item>
      <el-form-item prop="market_price" label="市场价格">
        <el-input v-model="info.market_price" type="number"></el-input>
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
      <el-form-item label="商品规格" porp="specsid">
        <el-select @change="specsChange" v-model="info.specsid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="specsitem of specsarr"
            :value="specsitem.id"
            :key="specsitem.id"
            :label="specsitem.specsname"
          >{{specsitem.specsname}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格属性" porp="specsattr">
        <el-select multiple v-model="info.specsattr" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="(attrsitem,index) of specsattrs"
            :value="attrsitem"
            :key="index"
            :label="attrsitem"
          >{{attrsitem}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="box" prop="description" label="商品描述">
        <div id="desc"></div>
      </el-form-item>
      <el-form-item label="是否新品">
        <el-radio v-model="info.isnew" :label="1">是</el-radio>
        <el-radio v-model="info.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio v-model="info.ishot" :label="1">是</el-radio>
        <el-radio v-model="info.ishot" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitInfo('goodForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      info: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: true
      },
      secondCates: [],
      img: "",
      tip: "添加",
      rules: {
        specsname: [
          { required: true, message: "属性名称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "菜单名称长度不符合要求" }
        ],
        first_cateid: [
          { required: true, message: "属性值不能为空", trigger: "blur" }
        ],
        goodsname: [
          { required: true, message: "属性值不能为空", trigger: "blur" }
        ],
        second_cateid: [
          { required: true, message: "属性值不能为空", trigger: "blur" }
        ]
      },
      cates: [],
      specsarr: [],
      specsattrs: [],
      editor: null
    };
  },
  mounted() {
    this.editor = new E("#desc");
    this.editor.create();
    this.$http.get(this.$apis.catelist,{pid:0}).then(res => {
      this.cates = res.list;
    });
    this.$http.get(this.$apis.specslist).then(res => {
      this.specsarr = res.list;
    });
    if (this.$route.params.goodsid) {
      this.tip = "修改";
      this.$http
        .get(this.$apis.goodsinfo, { id: this.$route.params.goodsid })
        .then(res => {
          this.img = res.list.img;
          this.fileList = this.img ? [{ url: this.img }] : [];
          this.info = res.list;
          this.info.status = this.info.status == 1 ? true : false;
          if (this.info.first_cateid) {
            this.cateChange(this.info.first_cateid);
          }
          this.editor.txt.html(this.info.description);
          if (this.info.specsid) {
            this.specsChange(this.info.specsid);
            this.info.specsattr = this.info.specsattr
              ? this.info.specsattr.split(",")
              : [];
          }
        });
    }
  },
  methods: {
    specsChange(e) {
      if (e == "") {
        return false;
      } else {
        this.$http.get(this.$apis.specsinfo, { id: e }).then(res => {
          if (res.code === 200) {
            this.specsattrs = res.list ? res.list[0].attrs : [];
          }
        });
      }
    },
    cateChange(e) {
      if (e == "") {
        return false;
      } else {
        this.$http.get(this.$apis.cateslist,{pid:e}).then(res => {
         this.secondCates=res.list
        });
      }
    },
    fileChange(file) {
      this.img = file.raw;
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.info));
          data.description = this.editor.txt.html();
          data.status = data.status ? 1 : 2;
          data.specsattr = data.specsattr ? data.specsattr.join(",") : "";
          let arr = [];
          let url = this.$apis.goodsadd;
          if (this.$route.params.goodsid) {
            (url = this.$apis.goodsedit),
              (data.id = this.$route.params.goodsid);
          }
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          form.append("img", this.img);
          this.$http.post(url, form).then(res => {
            if (res.code == 200) {
              this.$router.push("/goods");
            } else {
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
.box{
  margin-top: 100px;
}
</style>