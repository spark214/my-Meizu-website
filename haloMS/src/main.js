import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueHighcharts from 'vue-highcharts';
import store from './store';

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;
Vue.prototype.$rootUrl = '/proxy';
Vue.use(VueHighcharts);

router.beforeEach((to,from,next)=>{
    let expireTime = sessionStorage.getItem('expireTime');
    if(to.path !== '/login'){
        const nowTime = new Date().getTime();
        if (expireTime && nowTime < expireTime) {
            next();
        } else {
            sessionStorage.setItem('pageHistory',from.fullPath);
            next({path: '/login'});
        }
    }else{
        next();
    }
})

new Vue({
    store,
  router,
  render: h => h(App)
}).$mount('#app')
