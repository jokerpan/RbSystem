import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/list/homePage'
        },
        
        {
            path: '/list/reApplyList',
            component: resolve => {require(['@/js/sysadmin/components/list/reApplyList'],resolve)}
        },
        {
            path: '/list/homePage',
            component: resolve => {require(['@/js/sysadmin/components/list/homePage'],resolve)}
        },
        {
            path: '/list/auditManage',
            component: resolve => {require(['@/js/sysadmin/components/list/auditManage'],resolve)}
        },
        {
            path: '/list/reimbursementRecord',
            component: resolve => {require(['@/js/sysadmin/components/list/reimbursementRecord'],resolve)}
        }
    ]
})
