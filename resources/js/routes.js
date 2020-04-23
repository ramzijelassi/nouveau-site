import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';


//Customer

import CustomersMain from './components/customers/Main.vue';
import CustomersList from './components/customers/List.vue';
import NewCustomer from './components/customers/New.vue';
import Customer from './components/customers/View.vue';

//Category

import CategoriesMain from './components/categories/Main.vue';
import CategoriesList from './components/categories/List.vue';
import NewCategory from './components/categories/New.vue';
import Category from './components/categories/View.vue';



export const routes = [{
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: CustomersMain,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '/',
                component: CustomersList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer
            }
        ]
    },

    {
        path: '/categories',
        component: CategoriesMain,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '/',
                component: CategoriesList
            },
            {
                path: 'new',
                component: NewCategory
            },
            {
                path: ':id',
                component: Category
            }
        ]
    }




];