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
import EditCategory from './components/categories/Edit.vue';

//Task
import TasksMain from './components/tasks/Main.vue';
import TasksList from './components/tasks/List.vue';
import NewTask from './components/tasks/New.vue';
import Task from './components/tasks/View.vue';
import EditTask from './components/tasks/Edit.vue';

//Post
import PostMain from './components/post/Main.vue';
import PostsList from './components/post/List.vue';
import NewPost from './components/post/New.vue';
import Post from './components/post/View.vue';
import EditPost from './components/post/Edit.vue';




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
        path: '/tasks',
        component: TasksMain,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '/',
                component: TasksList
            },
            {
                path: 'new',
                component: NewTask
            },
            {
                path: ':id',
                component: Task
            },
            {
                path: 'edit-task/:id',
                component: EditTask
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
            },
            {
                path: 'edit-category/:id',
                component: EditCategory
            }
        ]
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




];