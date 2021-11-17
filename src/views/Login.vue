<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title"></h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" autocomplete="on" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <img :src="(passwordType === 'password' ? '../../assets/eye.png' : '../../assets/eye-on.png')" width="25px" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script>
  import {
    login
  } from "../network/home";
  export default {
    name: 'Login',

    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '111111'
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            trigger: 'blur'
          }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {

        login(this.loginForm.username, this.loginForm.password).then(res => {
          // console.log(res.status);
          if (res.status == 200) {

            if (res.data.token) {
              // console.log('存储cookie');
              this.$cookie.set('token', res.data.token, {
                expires: 7
              });
            }
            this.$router.push({
              path: "/home",
            });
          }

        })
      }
    }
  }
</script>

<style lang="less">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  @bg: #283443;
  @light_gray: #fff;
  @cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
    .login-container .el-input input {
      color: @cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: @light_gray;
        height: 47px;
        caret-color: @cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @cursor  !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="less" scoped>
  @bg: #2d3a4b;
  @dark_gray: #889aa4;
  @light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: @bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: @dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: @light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 13px;
      font-size: 16px;
      color: @dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>