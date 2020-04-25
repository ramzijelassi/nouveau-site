import { getLocalUser } from "./helpers/auth";

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: [],
        categories: [],
        allcategories: [],
        post: [],
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        customers(state) {
            return state.customers;
        },
        categories(state) {
            return state.categories;
        },
        getCategory(state) {
            return state.category
        },
        getPost(state) {
            return state.post
        },
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, { token: payload.access_token });

            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        updateCustomers(state, payload) {
            state.customers = payload;
        },
        updateCategories(state, payload) {
            state.categories = payload;
        },
        updatePosts(state, payload) {
            state.posts = payload;
        },
        categoreis(state, data) {
            return state.category = data
        },
        posts(state, data) {
            return state.post = data
        },
        allcategories(state, payload) {
            return state.allcategories = payload
        },
        allpost(state, payload) {
            return state.post = payload
        },


    },
    actions: {
        login(context) {
            context.commit("login");
        },
        getCustomers(context) {
            axios.get('/api/customers')
                .then((response) => {
                    context.commit('updateCustomers', response.data.customers);
                })
        },
        getCategories(context) {
            axios.get('/api/categories')
                .then((response) => {
                    context.commit('updateCategories', response.data.categories);
                })
        },
        getPosts(context) {
            axios.get('/api/posts')
                .then((response) => {
                    console.log(response.data)
                    context.commit('updatePosts', response.data.posts);
                })
        },


    }
};