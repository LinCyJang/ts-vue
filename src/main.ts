import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message } from '@/components/public/message'

Vue.config.productionTip = false
Vue.prototype.$message = new Message()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
