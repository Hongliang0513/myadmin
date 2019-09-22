<template>
  <div class="left-nav">
    <header class="left-nav-header">
      <img src="~assets/images/logo.png" alt="logo" />
      <h1>Awesome后台</h1>
    </header>
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#002140"
      text-color="#fff"
      active-text-color="skyblue"
    >
      <el-menu-item index="/home">
        <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>商品</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/category">
              <i class="el-icon-s-operation"></i>
              <span slot="title">品类管理</span>
          </el-menu-item>
          <el-menu-item index="/product">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">商品管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/role">
        <i class="el-icon-s-claim"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">图形图表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/bar">
            <i class="el-icon-coin"></i>
            <span slot="title">柱形图</span>
          </el-menu-item>
          <el-menu-item index="/line">
            <i class="el-icon-s-operation"></i>
            <span slot="title">折线图</span>
          </el-menu-item>
          <el-menu-item index="/pie">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">饼图</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.left-nav {
  color: #fff;
  .left-nav-header {
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: center;
    background-color: #002140;
    img {
      width: 40px;
      height: 40px;
    }
    h1 {
      font-size: 20px;
    }
  }
}
</style>
