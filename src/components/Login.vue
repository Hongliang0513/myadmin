<template>
  <div class="login-wrapper">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :rules="loginRules"
        :model="loginModel"
        label-width="0px"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-users" v-model="loginModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginModel: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginModel)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登陆成功')
        sessionStorage.setItem('token', res.data.token)
        this.$router.replace('/home')
      })
    },
    handleReset () {
      this.$refs.loginForm.resetFields()
    }
  },
}
</script>

<style lang="less" scoped>
.login-wrapper {
  height: 100%;
  background-color: @theme-color;
  .login-box {
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-form {
      position: absolute;
      bottom: 10px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
