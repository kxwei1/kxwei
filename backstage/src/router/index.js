import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [{
        path: '/',
        component: () => import('@/components/pages/Layout'),
        children: [{
                path: 'home',
                component: () => import('../components/pages/Index'),
                //设置一个自定义属性，用来告知页面加载时，左侧哪个菜单选中
                meta: {
                    select: '/home'
                }
            },
            {
                path: 'menu',
                component: () => import('../components/pages/Menu/Index'),
                meta: {
                    select: '/menu'
                }
            },
            {
                path: 'menu/add',
                component: () => import('../components/pages/Menu/Info'),
                meta: {
                    select: '/menu'
                }
            },
            {
                path: 'menu/:menuid',
                component: () => import('../components/pages/Menu/Info'),
                meta: {
                    select: '/menu'
                }
            },
            {
                path: 'role',
                component: () => import('../components/pages/Role/Index'),
                meta: {
                    select: '/role'
                }
            },
            {
                path: 'role/add',
                component: () => import('../components/pages/Role/Info'),
                meta: {
                    select: '/role'
                }
            },
            {
                path: 'role/:roleid',
                component: () => import('../components/pages/Role/Info'),
                meta: {
                    select: '/role'
                }
            },
            {
                path: 'user',
                component: () => import('../components/pages/User/Index'),
                meta: {
                    select: '/user'
                }
            },
            {
                path: 'user/add',
                component: () => import('../components/pages/User/Info'),
                meta: {
                    select: '/user'
                }
            },
            {
                path: 'user/:uid',
                component: () => import('../components/pages/User/Info'),
                meta: {
                    select: '/user'
                }
            },
        ]

    },
    {
        path: '/login',
        component: () => import('@/components/pages/Login'),
    }

]
})
