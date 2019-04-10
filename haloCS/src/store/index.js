import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {
            username: null,
            avatar:null,
            phone:null,
            token:null
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
        orderLoading:false,
        imgUpload:false,
        typeList:[],
        updateTopic:{
            typeName:null,
            title:null,
            content:null
        }
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
        },
        IMGUPLOAD(state,info){
            state.imgUpload = info;
        },
        TYPELIST(state,info){
            state.typeList = info;
        },
        UPDATETOPIC(state,info){
            state.updateTopic = info;
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
        },
        imgUpload(ctx,info){
            ctx.commit('IMGUPLOAD',info);
        },
        typeList(ctx,info){
            ctx.commit('TYPELIST',info);
        },
        updateTopic(ctx,info){
            ctx.commit('UPDATETOPIC',info);
        }
    }
});

export default store;
