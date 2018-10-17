<!--  -->
<template>
  <div class="login-box">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录
        </el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>/* eslint-disable indent,semi */
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: 'admin',
        checkPass: '123456'
      },
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      },
      checked: true
    };
  },
  components: {},

  computed: {},

  created() {
  },

  methods: {
    handleSubmit(e){
      let _this = this;
      this.$refs.loginForm.validate((valid)=>{
        if(valid){
          this.$router.push({
            path:'/user'
          });
        }else{
          debugger
        }
      })
    }
  },
  mounted() {
  },

}
</script>

<style scoped>
  .login-box{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0 auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0 0 35px 0;
  }

</style>
