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
      meta:{
        title:'Halo.'
      }
    },
    {
      path:'/mallProductOther',
      component:resolve => require(['../components/page/mall-product-other.vue'], resolve),
      meta:{
        title:'Halo.'
      }
    },
    {
      path:'/mallCart',
      component:resolve => require(['../components/page/mall-cart.vue'], resolve),
      meta:{
        title:'Halo购物车'
      }
    },
    {
      path:'/mallList',
      component:resolve => require(['../components/page/mall-list.vue'], resolve),
      meta:{
        title:'Halo商城'
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
      path:'/user',
      component: resolve => require(['../components/page/user.vue'], resolve),
      meta:{
        title:'账号管理'
      }
    },
    {
      path:'/mallCheck',
      component: resolve => require(['../components/page/mall-check.vue'], resolve),
      meta:{
        title:'确认订单-Halo.商城'
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
          component: resolve => require(['../components/common/register/page/phone.vue'], resolve),
          meta:{
            title:'Halo 注册'
          },
        },
        {
          path: '/sms',
          component: resolve => require(['../components/common/register/page/smsPage.vue'], resolve),
          meta:{
            title:'Halo 注册'
          },
        },
        {
          path: '/userinfo',
          component: resolve => require(['../components/common/register/page/userInfo.vue'], resolve),
          meta:{
            title:'Halo 注册'
          },
        }
    ]
        },
        {
          path: '/member',
          component: resolve => require(['../components/page/member.vue'], resolve),
          meta: {
            title: 'Halo 会员管理'
          },
          children: [
            {
              path: '/',
              redirect: '/mIndex'
            },
            {
              path: '/mIndex',
              component: resolve => require(['../components/common/member/page/index.vue'], resolve),
              meta: {
                title: 'Halo 会员管理'
              },
            },
            {
              path: '/mAddress',
              component: resolve => require(['../components/common/member/page/address.vue'], resolve),
              meta: {
                title: '地址管理-Halo.商城'
              },
            },
            {
              path: '/advice',
              component: resolve => require(['../components/common/member/page/advice.vue'], resolve),
              meta: {
                title: '建议反馈-Halo.商城'
              },
            },
            {
              path: '/insurance',
              component: resolve => require(['../components/common/member/page/insurance.vue'], resolve),
              meta: {
                title: 'Halo.商城'
              },
            },
            {
              path: '/mcycle',
              component: resolve => require(['../components/common/member/page/mcycle.vue'], resolve),
              meta: {
                title: 'Halo.商城'
              },
            },
            {
              path: '/orderDetail',
              component: resolve => require(['../components/common/member/page/orderDetail.vue'], resolve),
              meta: {
                title: '订单详情-Halo.商城'
              },
            },
            {
              path: '/myOrder',
              component: resolve => require(['../components/common/member/page/myOrder.vue'], resolve),
              name:'我的订单',
              meta: {
                title: '我的订单-Halo.商城'
              },
              children:[
                {
                  path: '/',
                  redirect: '/allOrder'
                },
                {
                  path: '/allOrder',
                  component: resolve => require(['../components/common/member/page/orderPage/allOrder.vue'], resolve),
                },
                {
                  path: '/otherOrder',
                  component: resolve => require(['../components/common/member/page/orderPage/otherOrder.vue'], resolve),
                },
                {
                  path: '/unpayOrder',
                  component: resolve => require(['../components/common/member/page/orderPage/unpayOrder.vue'], resolve),
                },
                {
                  path: '/unsentOrder',
                  component: resolve => require(['../components/common/member/page/orderPage/unsentOrder.vue'], resolve),
                },
                {
                  path: '/sentOrder',
                  component: resolve => require(['../components/common/member/page/orderPage/sentOrder.vue'], resolve),
                },
              ]
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
