
    <template>
  <div class="Menusetting">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">系统设置</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Menutable' }">菜单设置</el-breadcrumb-item>
      <el-breadcrumb-item>菜单编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>菜单编辑</h1>
    <div class="from">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="菜单名称" prop="title">
          <el-input type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <el-input type="text" v-model="ruleForm.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级列表" prop="pid">
          <el-select v-model="ruleForm.pid" placeholder="请选择上级列表">
            <el-option value="0" label="系统设置"></el-option>
            <el-option value="1" label="管理员设置"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="ruleForm.select"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style  scoped>
.Menusetting {
  width: 100%;
  height: 100%;
}
.from {
  width: 500px;
}
.inputT {
  width: 50px;
}
</style>
<script>
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    edit(m) {
      console.log(m);
    }
  },
  data() {
    return {
      ruleForm: {
        title: "",
        icon: "",
        pid: "",
        select: "true"
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        icon: [{ required: true, message: "请输入菜单图片", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级列表", trigger: "blur" }],
        select: [{ required: true, trigger: "blur" }]
      },
      options: [
        {
          value: "选项1",
          label: "系统设置"
        },
        {
          value: "选项2",
          label: "用户设置"
        },
        {
          value: "选项3",
          label: "文章管理"
        }
      ],
      value: "",

      menucon: [
        {
          id: 1000001,
          name: "AAAA",
          icon: 1,
          select: true
        },
        {
          id: 1000002,
          name: "BBB",
          icon: 1,
          select: true
        },
        {
          id: 1000003,
          name: "CCC",
          icon: 1,
          select: true
        }
      ]
    };
  }
};
</script>