const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue'),
        },
        {
            name: 'Compromisos',
            path: '/compromisos',
            component: () => import('@/views/dashboard/compromisos.vue'),
        },
        {
            name: 'Detalle Compromiso',
            path: '/compromisos/:id',
            component: () => import('@/views/dashboard/detalles.vue'),
        },
        {
            name: 'Compromisos Inscritos',
            path: '/compromisos-inscritos',
            component: () => import('@/views/dashboard/registrados.vue'),
        },
        {
            name: 'Ver',
            path: '/compromisos-inscritos/:id',
            component: () => import('@/views/dashboard/novedades.vue'),
        },
        {
            name: 'Actas Realizadas',
            path: '/actas-usuario',
            component: () => import('@/views/dashboard/actas.vue'),
        }
    ]
};

export default MainRoutes;
