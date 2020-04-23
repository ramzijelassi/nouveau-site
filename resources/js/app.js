require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { routes } from './routes';
import StoreData from './store';
import MainApp from './components/MainApp.vue';
import { initialize } from './helpers/general';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('new-task', require('./components/tasks/New.vue').default)
Vue.component('edit-task', require('./components/tasks/Edit.vue').default)

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

initialize(store, router);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});