// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import container from './components/container'
import router from './router'
import axios from 'axios'
import cookie from 'js-cookie'
import Qs from 'Qs'

axios.defaults.transformRequest = [function (data) {
    return Qs.stringify(data);
}];


Vue.prototype.$ajax = axios;
Vue.prototype.$cookie = cookie;

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { container },
  template: '<container/>'
})
