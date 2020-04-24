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


Vue.component('new-post', require('./components/post/New.vue').default)
Vue.component('list-post', require('./components/post/List.vue').default)

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
    routes,
    mode: 'history'
});

// V-form
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form = Form;


// Sweet alert 2
import swal from 'sweetalert2'
window.swal = swal;
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
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