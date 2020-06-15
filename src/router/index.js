import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/Index'
import Menusetting from '@/components/pages/Menusetting'
import Menutable from '@/components/pages/Menutable'
import Setting from '@/components/pages/Setting'
import Settinginput from '@/components/pages/Settinginput'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
        {
          path:'Menutable',
          component:Menutable,
          meta:{select:'/Menutable'}

        },
        {
          path:'Menusetting',
          component:Menusetting,
          meta:{select:'/Menutable'}
        },
        {
          path:'Setting',
          component:Setting,
          meta:{select:'/Setting'}
        },
        {
          path:'Settinginput',
          component:Settinginput,
          meta:{select:'/Setting'}
        },
      ]

    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
