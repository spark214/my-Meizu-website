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
    },
    {
      path:'/login',
      component: resolve => require(['../components/page/login.vue'], resolve),
    },
    {
      path:'/register',
      component: resolve => require(['../components/page/register.vue'], resolve),
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
