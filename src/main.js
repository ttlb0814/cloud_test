import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cloudbase from '@cloudbase/vue-provider'

Vue.use(Cloudbase, {
  env: 'hello-cloudbase-0g6hx4adb7f2444b'//需要写自己的腾讯云的资源ID
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
