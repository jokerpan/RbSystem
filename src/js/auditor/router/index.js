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
            path: '/list/alreadyAudit',
            component: resolve => {require(['@/js/auditor/components/list/alreadyAudit'],resolve)}
        },
        {
            path: '/list/waitforAudit',
            component: resolve => {require(['@/js/auditor/components/list/waitforAudit'],resolve)}
        },
        {
            path: '/list/homePage',
            component: resolve => {require(['@/js/auditor/components/list/homePage'],resolve)}
        },
    ]
})
