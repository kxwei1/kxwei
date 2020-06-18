import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
let router= new Router({
    routes: [{
        path: '/',
        component: () => import('@/components/pages/Layout'),
        children: [{
                path: 'home',
                component: () => import('../components/pages/Index'),
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
            {
                path: 'category',
                component: () => import('../components/pages/Category/Index'),
                meta: {
                    select: '/category'
                }
            },
            {
                path: 'category/add',
                component: () => import('../components/pages/Category/Info'),
                meta: {
                    select: '/category'
                }
            },
            {
                path: 'cate/:cateid',
                component: () => import('../components/pages/Category/Info'),
                meta: {
                    select: '/category'
                }
            },
            {
                path: 'specs',
                component: () => import('../components/pages/Specs/Index'),
                meta: {
                    select: '/specs'
                }
            },
            {
                path: 'specs/add',
                component: () => import('../components/pages/Specs/Info'),
                meta: {
                    select: '/specs'
                }
            },
            {
                path: 'specs/:specsid',
                component: () => import('../components/pages/Specs/Info'),
                meta: {
                    select: '/specs'
                }
            },
        ]
    },
    {
        path: '/login',
        component: () => import('../components/pages/Login'),
    },

]
})

router.beforeEach((to, from, next) =>{
    let userinfo = localStorage.getItem("htuser")
      ? JSON.parse(localStorage.getItem("htuser"))
      : null;
    if (userinfo) { 
      userinfo.menus_url.push("/");
      userinfo.menus_url.push("/home");
      let menuarr = userinfo.menus_url;
      let nowpatharr=to.path.split('/');
      let nowpath= '/'+nowpatharr[1];
      let res = menuarr.find(d => {
        return d == nowpath;
      });
      if (res) {
        next();
      } else {
        next("/");
      }
    } else {
        if(to.path=='/login'){
            next()
        }
        else{

            next('/login');
        }
    }
  })
export default router;
