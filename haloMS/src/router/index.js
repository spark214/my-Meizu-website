import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios'
Vue.use(Router);
Vue.prototype.$ajax = Axios

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述页面' },
      children: [
        {
        path: '/dashboard',
        component: resolve => require(['../components/page/DashBoard.vue'], resolve),
        meta: { title: '系统首页' }
      },
        {
          path: '/ordermanage',
          component: resolve => require(['../components/page/OrderManage.vue'], resolve),
          meta: { title: '订单管理' }
        },
        {
          path: '/goodsmanage',
          component: resolve => require(['../components/page/GoodsManage.vue'], resolve),
          meta: { title: '商品管理' }
        },
        {
          path: '/usermanage',
          component: resolve => require(['../components/page/UserManage.vue'], resolve),
          meta: { title: '用户管理' }
        },
      ]
    },
    {
      path:'/login',
      component: resolve => require(['../components/page/Login.vue'], resolve),
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
