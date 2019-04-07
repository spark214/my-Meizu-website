import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {
            username: null,
            avatar:null,
            phone:null
        },
        receiver:{
            name:null,
            phone:null,
            address:null
        },
        orders:{
            id:null,
            address:null,
            product:[]
        },
        order:{
            id:null,
            address:null,
            product:{}
        },
        orderLoading:false
    },
    mutations: {
        LOGIN(state,userInfo) {
            state.userInfo = userInfo;
        },
        RECEIVER(state,info){
            state.receiver = info;
        },
        ORDERS(state,info){
            state.orders = info;
        },
        ORDER(state,info){
            state.order = info;
        },
        ORDERLOADING(state,info){
            state.orderLoading = info;
        }
    },
    actions: {
        login(ctx, userInfo) {
            ctx.commit('LOGIN', userInfo);
        },
        receiver(ctx,info){
            ctx.commit('RECEIVER',info);
        },
        order(ctx,info){
            ctx.commit('ORDER',info);
        },
        orders(ctx,info){
            ctx.commit('ORDERS',info);
        },
        orderLoading(ctx,info){
            ctx.commit('ORDERLOADING',info);
        }
    }
});

export default store;
