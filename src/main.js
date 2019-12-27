import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui' // 引入包
import 'element-ui/lib/theme-chalk/index.css' // 引入elementui样式
import './styles/index.less' // 引入初始化样式
import axios from './utils/request'
import Component from './components'

import './permission'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Component)
new Vue({ // 全局注册
  router,
  render: h => h(App)
}).$mount('#app')
