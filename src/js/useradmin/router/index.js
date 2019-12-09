import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homePage'
        },
      
        {
            path: '/serverList',
            component: resolve => {require(['@/js/useradmin/components/serverList'],resolve)}
        },
        {
            path: '/form',
            component: resolve => {require(['@/js/useradmin/components/form'],resolve)}
        },
        {
            path: '/rbtable',
            component: resolve => {require(['@/js/useradmin/components/rbtable'],resolve)}
        },
        {
            path: '/homePage',
            component: resolve => {require(['@/js/useradmin/components/homePage'],resolve)}
        },
    ]
})
