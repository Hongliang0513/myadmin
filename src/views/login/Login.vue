<template>
  <div class="login">
    <header class="login-header">
      <img src="~assets/images/logo.png" alt="logo" />
      <h1>Awesome后台管理系统</h1>
    </header>
    <section class="login-content">
      <h2>用户登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm login-form"
      >
        <el-form-item prop="account">
          <el-input
            v-model.number="ruleForm.account"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-form-button" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { reqLogin } from 'api'
import memoryUtils from 'utils/memoryUtils'
import storageUtils from 'utils/storageUtils'

import { Message } from 'element-ui'

export default {
  data() {
    // const checkAccount = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('请输入账号！'))
    //   }
    //   callback()
    // }
    const validatePass = (rule, value, callback) => {
      // if (value === '') {
      //   callback(new Error('请输入密码'))
      // }
      // callback()
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 4) {
        callback(new Error('密码长度不能小于4位'))
      } else if (value.length > 12) {
        callback(new Error('密码长度不能大于12位'))
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        callback(new Error('密码必须是英文、数字或下划线组成'))
      } else {
        callback() // 验证通过
      }
    }
    return {
      ruleForm: {
        account: '',
        pass: '',
      },
      rules: {
        account: [
          // { validator: checkAccount, trigger: 'blur' },
          { required: true, whitespace: true, message: '用户名必须输入' },
          { min: 4, message: '用户名至少4位' },
          { max: 12, message: '用户名最多12位' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    // 如果用户已经登陆, 自动跳转到管理界面
    const user = memoryUtils.user
    if (user && user._id) {
      this.$router.replace('/')
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const username = this.ruleForm.account
          const password = this.ruleForm.pass
          const result = await reqLogin(username, password)
          if (result.status === 0) {
            // 提示登陆成功
            Message.success('登录成功')
            // 保存user
            const user = result.data
            memoryUtils.user = user // 保存在内存中
            storageUtils.saveUser(user) // 保存到local中

            // 跳转到管理界面 (不需要再回退回到登陆)
            this.$router.replace('/')
          } else { // 登陆失败
            // 提示错误信息
            Message.error(result.msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("./images/bg.jpg");
  background-size: 100% 100%;
  .login-header {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: rgba(21, 20, 13, 0.5);
    img {
      width: 40px;
      height: 40px;
      margin: 0 15px 0 50px;
    }
    h1 {
      font-size: 30px;
      color: white;
    }
  }

  .login-content {
    width: 400px;
    height: 300px;
    background-color: #fff;
    margin: 90px auto;
    padding: 20px 40px;
    h2 {
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .login-form {
      .login-form-button {
        width: 100%;
      }
    }
  }
}
</style>
