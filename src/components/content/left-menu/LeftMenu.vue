<template>
  <el-menu
    :default-active="menuSetting.defaultActive"
    :router="menuSetting.router"
    class="el-menu-vertical-demo"
    :background-color="menuSetting.backgroundColor"
    :text-color="menuSetting.textColor"
    :active-text-color="menuSetting.activeTextColor"
  >
    <label v-for="menu in menuList" :key="menu.title">
      <el-menu-item v-if="menu.children==null" :key="menu.key" :index="menu.key">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.title}}</span>
        </template>
      </el-menu-item>

      <el-submenu v-if="menu.children" :key="menu.key" :index="menu.key">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.title}}</span>
        </template>
        <label v-for="item in menu.children" :key="item.key">
          <el-menu-item-group v-if="item.children==null">
            <el-menu-item :index="item.key">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </label>
      </el-submenu>
    </label>
  </el-menu>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
    menuSetting: {
      type: Object,
      required: true,
      default() {
        return {
          mode: 'vertical',
          collapse: false,
          backgroundColor: '#fff',
          textColor: '#303133',
          activeTextColor: '#409EFF',
          defaultActive: '',
          defaultOpeneds: [],
          uniqueOpened: false,
          menuTrigger: 'hover',
          router: false,
          collapseTransition: true,
        }
      },
    },
    menuList: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
</style>
