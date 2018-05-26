import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios'
Vue.use(Router);
Vue.prototype.$ajax = Axios

export default new Router({
  routes:[
    {
      path:'/',
      component:resolve => require(['../components/page/index.vue'], resolve),
    },
    {
      path:'/mallIndex',
      component:resolve => require(['../components/page/mall-index.vue'], resolve),
      meta:{
        title:'Halo商城'
      }
    },
    {
      path:'/mallProductPhone',
      component:resolve => require(['../components/page/mall-product-phone.vue'], resolve),
    },
    {
      path:'/mallProductOther',
      component:resolve => require(['../components/page/mall-product-other.vue'], resolve),
    },
    {
      path:'/mallCart',
      component:resolve => require(['../components/page/mall-cart.vue'], resolve),
      meta:{
        title:'Halo购物车'
      }
    },
    {
      path:'/login',
      component: resolve => require(['../components/page/login.vue'], resolve),
      meta:{
        title:'Halo 登录'
      }
    },
    {
      path:'/register',
      component: resolve => require(['../components/page/register.vue'], resolve),
      meta:{
        title:'Halo 注册'
      },
      children:[
        {
          path: '/',
          redirect: '/phone'
        },
        {
          path: '/phone',
          component: resolve => require(['../components/common/register/phone.vue'], resolve),
          meta:{
            title:'Halo 注册'
          },
        },
        {
          path: '/sms',
          component: resolve => require(['../components/common/register/sms.vue'], resolve),
          meta:{
            title:'Halo 注册'
          },
        },
        {
          path: '/userinfo',
          component: resolve => require(['../components/common/register/userInfo.vue'], resolve),
          meta:{
            title:'Halo 注册'
          },
        },
      ]


    },
    {
      path:'/404',
      component:resolve => require(['../components/page/404.vue'], resolve),
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
