<template>
  <div class="nav-bar">
    <img class="logo" src="../assets/logo2.png">
    <div class="tabs">
      <div class="tab-item" :class="selected == 0 ? 'active': ''" @click="handleSelectTab(0)">
        <i class="el-icon-date" />
        <p>日程</p>
      </div>
      <div class="tab-item" :class="selected == 1 ? 'active': ''" @click="handleSelectTab(1)">
        <i class="el-icon-document-checked" />
        <p>待办事项</p>
      </div>
    </div>
    <div class="user">
      <img class="avatar" src="https://tse1-mm.cn.bing.net/th?id=OIP-C.M9CUntHQGPvSO5JkAn5Y4AHaFA&w=136&h=100&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2">
      <el-popover placement="top-start" trigger="hover">
        <div class="user-item">个人设置</div>
        <div class="user-item">退出</div>
        <p class="nickname" slot="reference">{{userInfo.nickname}}</p>
      </el-popover>
    </div>
  </div>
</template>

<script>
  import {
    getUserInfo
  } from "../network/home";
  export default {
    name: 'NavBar',
    components: {

    },
    data() {
      return {
        visible: false,
        userInfo: {},
        selected: 0
      }
    },
    methods: {
      handleSelectTab(index) {
        this.selected = index;
        if (index == 0) {
          this.$router.push({
            path: "/home",
          });
        } else {
          this.$router.push({
            path: "/todolist",
          });
        }

      },
      initUserInfo() {
        getUserInfo().then(res => {
          this.userInfo = res.data;
        })
      }
    },
    mounted() {
      this.initUserInfo();
    }
  }
</script>

<style lang="less" scoped>
  @color : #4352d7;
  @font-color: #4a4f58;
  @font-color-t: #93969c;
  @font-color-un: #b6c1d4;
  @back-color-dark: #fbfbfb;

  .nav-bar {
    height: 50px;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .logo {
      width: 50px;
      height: 50px;
    }

    .tabs {
      font-size: 23px;
      color: @font-color;
      width: 300px;
      display: flex;
      justify-content: space-around;
      align-items: center;


      .tab-item {
        display: flex;
        align-items: center;

        p {
          font-size: 14px;
          display: inline-block;
          padding-left: 5px;
        }
      }

      .tab-item.active {
        color: @color;
        font-weight: bold;
      }
    }

    .user {
      display: flex;
      align-items: center;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .nickname {
        font-weight: bold;
        color: rgb(71, 71, 71);
      }


    }
  }

  .user-item {
    height: 30px;
    line-height: 30px;
  }
</style>