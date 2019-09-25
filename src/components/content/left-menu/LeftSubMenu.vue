<template>
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
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
</style>
