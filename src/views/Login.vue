<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="login-content">
        <div class="login-title">
          <img class="login-title-img" src="@/assets/img/login/logo.png" />
          <span class="login-title-content">知识工程管理系统</span>
        </div>
        <el-divider></el-divider>
        <el-form ref="login" :model="loginInfo" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="loginInfo.username"
              prefix-icon="el-icon-user"
              placeholder="请输入登录账号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginInfo.password"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="请输入密码"
              @keyup.enter.native="submitForm()"
            />
          </el-form-item>
          <div class="login-btn" v-loading="isLoading">
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </div>
          <el-form-item prop="rememberMe">
            <el-checkbox v-model="loginInfo.rememberMe" size="small"
              >记住用户名和密码</el-checkbox
            >
          </el-form-item>
        </el-form>
        <div class="login-tips">
          <p>
            <span class="warning-icon-wrapper">
              <i class="el-icon-warning"></i>
            </span>
            秘密级信息系统，非涉密人员限制使用<br />严禁超越密级存储、处理信息
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginInfo: {
        username: '',
        password: '',
        rememberMe: false
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isLoading: false
    }
  },
  methods: {
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.isLoading = true
          this.$store.dispatch('user/login', this.loginInfo).then(() => {
            this.$success('登录成功')
            const redirect = this.$route.query && this.$route.query.redirect
            this.$router.push(redirect || '/')
            this.isLoading = false
          }).catch(() => {
            this.isLoading = false
          })

          this.$store.dispatch('routerMenu/getRouterMenu',"F36A946243D34506A6BE625412739725").then(() => {
          }).catch(() => {

          })

        } else {
          this.$error('请输入账号和密码')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login/cetclog.jpg);
  background-size: 100%;
}
.login-box {
  position: fixed;
  width: 362px;
  height: 380px;
  top: 50%;
  left: 50%;
  margin-left: -181px;
  margin-top: -190px;
  border-radius: 6px;
  background: #fff;
}
.login-content {
  width: 300px;
  height: auto;
  margin: 0 auto;
}
.login-title {
  overflow: auto;
}
.login-title-img {
  float: left;
  margin-top: 27px;
  margin-left: 20px;
  width: 80px;
}
.login-title-content {
  float: left;
  margin: 32px 0px 0px 20px;
  font-size: 18px;
  font-weight: 600;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  margin-top: 16px;
  text-align: center;
  line-height: 16px;
  font-size: 14px;
  color: #666;
}
.warning-icon-wrapper {
  color: #e6a23c;
  font-size: 16px;
}
</style>
