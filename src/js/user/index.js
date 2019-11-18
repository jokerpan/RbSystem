import login from './login'
import axios from 'axios'
import cookie from 'js-cookie'
import Qs from 'Qs'

axios.defaults.transformRequest = [function (data) {
    return Qs.stringify(data);
}];

Vue.prototype.$ajax = axios;

Vue.prototype.$cookie = cookie;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<login/>',
    components: { login }
});
