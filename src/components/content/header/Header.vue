<template>
  <div class="header">
    <div class="header-top">
      <span>欢迎，{{user.username}}</span>
      <!-- <a href="javascript:" @click="logout">退出</a> -->
      <link-button title="退出" :buttonClick="logout"/>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-left">{{title}}</div>
      <div class="header-bottom-right">
        <span>{{ctime | date-format('yyyy-MM-dd HH:mm')}}</span>
        <img :src="dayPictureUrl" alt="weather" />
        <span>{{weather}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import memoryUtils from 'utils/memoryUtils'
import storageUtils from 'utils/storageUtils'
import { reqWeather } from 'api/index'

import LinkButton from '../../common/link-button/LinkButton'

import menus from '../../../config/menuConfig'

export default {
  data() {
    return {
      user: memoryUtils.user,
      dayPictureUrl: '',
      weather: '',
      ctime: Date.now(),
    }
  },
  methods: {
    logout() {
      this.$confirm('是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.$router.replace('/login')
        this.$message({
          type: 'success',
          message: '退出成功!',
        })
      }).catch(() => {})
    },
  },
  computed: {
    title() {
      const { path } = this.$route
      let title
      menus.forEach(item => {
        if (item.key === path) {
          title = item.title
        } else if (item.children) {
          const cItem = item.children.find(cItem => cItem.key === path)
          if (cItem) {
            title = cItem.title
          }
        }
      })
      return title
    },
  },
  created() {
    reqWeather('杭州').then((result) => {
      this.dayPictureUrl = result.dayPictureUrl
      this.weather = result.weather
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted() {
    this.timeId = setInterval(() => {
      this.ctime = Date.now()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timeId) {
      clearInterval(this.timeId) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  components: {
    LinkButton,
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 100%;
  color: #303133;
  font-size: 14px;
  .header-top {
    height: 40px;
    line-height: 40px;
    text-align: right;
    border-bottom: 1px solid #1da57a;
    padding-right: 30px;
    span {
      margin-right: 15px;
    }
    a {
      color: skyblue;
    }
  }
  .header-bottom {
    height: 40px;
    display: flex;
    align-items: center;
    .header-bottom-left {
      position: relative;
      width: 25%;
      font-size: 20px;
      text-align: center;
      &::after {
        content: "";
        position: absolute;
        right: 50%;
        top: 100%;
        transform: translateX(50%);
        border-top: 20px solid white;
        border-right: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 20px solid transparent;
      }
    }
    .header-bottom-right {
      width: 75%;
      line-height: 40px;
      text-align: right;
      margin-right: 30px;
      img {
        vertical-align: middle;
        margin: 0 15px;
        width: 30px;
        height: 20px;
      }
    }
  }
}
</style>
