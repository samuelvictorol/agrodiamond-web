const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/IndexPage.vue') },
      { path: 'clientes', component: () => import('pages/admin/ClientesPage.vue') }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/IndexPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
