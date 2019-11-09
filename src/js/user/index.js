import login from './login'
import axios from 'axios'
import cookie from 'js-cookie'

Vue.prototype.$ajax = axios;
Vue.prototype.$cookie = cookie;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<login/>',
    components: { login }
});
