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
      path:'/mallProduct',
      component:resolve => require(['../components/page/mall-product.vue'], resolve),
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
