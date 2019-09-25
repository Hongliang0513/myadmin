<template>
  <el-menu-item :index="menu.key">
    <template slot="title">
      <i :class="menu.icon"></i>
      <span slot="title">{{menu.title}}</span>
    </template>
  </el-menu-item>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
</style>
