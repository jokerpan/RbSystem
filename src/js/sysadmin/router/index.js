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
            component: resolve => {require(['@/js/auditadmin/components/alarm/tpl'],resolve)},
        },
        {
            path: '/alarm/view',
            component: resolve => {require(['@/js/auditadmin/components/alarm/views'],resolve)},
        },
        {
            path: '/list/serverList',
            component: resolve => {require(['@/js/auditadmin/components/list/serverList'],resolve)}
        },
        {
            path: '/list/scriptList',
            component: resolve => {require(['@/js/auditadmin/components/list/scriptList'],resolve)}
        },
        {
            path: '/list/auditManage',
            component: resolve => {require(['@/js/auditadmin/components/list/auditManage'],resolve)}
        },
        {
            path: '/list/reimbursementRecord',
            component: resolve => {require(['@/js/auditadmin/components/list/reimbursementRecord'],resolve)}
        }
    ]
})
