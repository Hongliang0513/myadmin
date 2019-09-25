<template>
  <el-container class="container">
    <el-aside width="200px">
      <LeftNav />
    </el-aside>
    <el-container>
      <el-header height="80px">
        <Header />
      </el-header>
      <el-main>
        <div class="admin-main">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer height="40px" class="admin-footer">推荐使用谷歌浏览器，可以获得更佳页面操作体验</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import memoryUtils from 'utils/memoryUtils'

import LeftNav from 'components/content/left-nav/LeftNav'
import Header from '../../components/content/header/Header'

export default {
  data() {
    return {
      user: {},
    }
  },
  created() {
    this.user = memoryUtils.user
    // 如果内存没有存储user ==> 当前没有登陆
    if (!this.user || !this.user._id) {
      // 自动跳转到登陆页
      this.$router.replace('/login')
    }
  },
  components: {
    LeftNav,
    Header,
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .admin-main {
    background-color: #fff;
    height: 100%;
  }
  .admin-footer {
    // background-color: #edf2ef;
    color: #ccc;
    text-align: center;
    line-height: 40px;
  }
}

.el-header {
  padding: 0;
}

.el-aside {
  background-color: #13213e;
}

.el-main {
  background-color: #edf2ef;
  // padding: 0 20px;
}
</style>
