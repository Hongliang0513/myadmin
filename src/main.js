import memoryUtils from 'utils/memoryUtils'
import storageUtils from 'utils/storageUtils'

import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element'

import './filters' // 加载过滤器

// 读取local中保存user, 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
