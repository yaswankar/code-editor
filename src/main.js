import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins';
// const appMixins = require('./mixins');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // mixins: appMixins,
  render: h => h(App)
}).$mount('#app')
