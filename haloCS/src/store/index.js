import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        userInfo: {
            username: null,
            userid: null,
            brandId: null
        },
        processBar: {
            process: null,
            hide: true
        },
        menu:{
            hide:false
        },
        active:1,
        power: null,
        powerRouterList:[],
        storeSelected:[]
    },
    mutations: {
        LOGIN(state, userInfo) {
            window.sessionStorage.userInfo = JSON.stringify(userInfo);
            state.hasLogin = true;
            state.userInfo = userInfo;
        },
        LOGOUT(state) {
            state.hasLogin = false;
            state.userInfo = null;
        },
        PROCESSBARBEGIN(state, value) {
            state.processBar.hide = false;
            state.processBar.process = value + 'rem';
        },
        PROCESSBAREND(state) {
            state.processBar.process = '10rem';
        },
        PROCESSBARHIDE(state) {
            state.processBar.hide = true;
        },
        HIDEMENU(state){
            state.menu.hide = true;
        },
        SHOWMENU(state){
            state.menu.hide = false;
        },
        TOGGLEMENU(state){
            state.menu.hide = !!!state.menu.hide;
        },
        ACTIVE(state,value){
            state.active=value;
        },
        CLEARPOWER(state){
            state.power = null;
        },
        SAVEPOWER(state,power){
            state.power = power;
        },
        SAVE_POWER_ROUTER_LIST(state,powerRouterList){
            state.powerRouterList = powerRouterList;
        },
        SELECTSTORE(state, storeSelected){
            state.storeSelected = storeSelected;
        }
    },
    actions: {
        processBarBegin(ctx) {
            var ran = ~~(Math.random() * 30).toFixed(2);
            var t = (ran + 2) / 10;
            ctx.commit('PROCESSBARBEGIN', t);
            setTimeout(function() {
                ctx.commit('PROCESSBARBEGIN', t + 2);
            }, 800);
        },
        processBarEnd(ctx) {
            ctx.commit('PROCESSBAREND');
            setTimeout(function() {
                ctx.commit('PROCESSBARHIDE');
            }, 800);
        },
        login(ctx, userInfo) {
            ctx.commit('LOGIN', userInfo);
        },
        logout(ctx) {
            ctx.commit('LOGOUT');
            window.sessionStorage.removeItem('userInfo');
            window.sessionStorage.removeItem('timeStamp');
            //window.location.href="//"+window.location.host;
        },
        hideMenu(ctx) {
            ctx.commit('HIDEMENU');
        },
        showMenu(ctx) {
            ctx.commit('SHOWMENU');
        },
        toggleMenu(ctx){
            ctx.commit('TOGGLEMENU');
        },
        active(ctx,value){
            ctx.commit('ACTIVE',value);
        },
        clearPower(ctx){
            ctx.commit('CLEARPOWER');
        },
        savePower(ctx,power){
            ctx.commit('SAVEPOWER',power);
        },
        savePowerRouterList(ctx,powerRouterList){
            ctx.commit('SAVE_POWER_ROUTER_LIST',powerRouterList);
        },
        selectStore(ctx,storeSelected){
            ctx.commit('SELECTSTORE',storeSelected);
        }
    }
});

export default store;
