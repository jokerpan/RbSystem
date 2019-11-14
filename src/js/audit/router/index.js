import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/alarm/tpl'
        },
        {
            path: '/alarm/tpl',
            component: resolve => {require(['@/js/audit/components/alarm/tpl'],resolve)},
        },
        {
            path: '/alarm/view',
            component: resolve => {require(['@/js/audit/components/alarm/views'],resolve)},
        },
        {
            path: '/list/serverList',
            component: resolve => {require(['@/js/audit/components/list/serverList'],resolve)}
        },
        {
            path: '/list/scriptList',
            component: resolve => {require(['@/js/audit/components/list/scriptList'],resolve)}
        },
        {
            path: '/list/auditManage',
            component: resolve => {require(['@/js/audit/components/list/auditManage'],resolve)}
        }
    ]
})
