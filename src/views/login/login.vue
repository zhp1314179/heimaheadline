<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:30px" >
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item >
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item >
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户写已和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitLogin" type="primary" style=" width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import { fuchsia } from 'color-name'
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }
        ],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('必须选择'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          // 前端校验成功
          console.log('校验成功' + isOk)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url(../../assets/img/login_bg.jpg);
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 350px;
    .title {
      text-align: center;
      img {
        height: 50px;
      }
    }
  }
}
</style>
