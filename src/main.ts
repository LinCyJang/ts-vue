import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message } from '@/components/public/message'
import './assets/css/base.css'
// import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
Vue.prototype.$message = new Message()
// Vue.use(vuetify)
new Vue({
  router,
  store,
  render: (h: (arg0: any) => any) => h(App)
}).$mount('#app')
