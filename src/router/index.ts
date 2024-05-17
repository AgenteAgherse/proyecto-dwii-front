import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        {
            name: 'Login',
            path: '/login',
            component: () => import('@/views/authentication/Login.vue')
        },
        {
            name: 'Registro',
            path: '/register',
            component: () => import('@/views/authentication/Registro.vue')
        },
        MainRoutes,
    ]
});
