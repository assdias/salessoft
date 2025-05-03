const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'auth', name: 'auth', component: () => import('pages/AuthPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayoutAuth.vue'),
    children: [{ path: 'me', name: 'me', component: () => import('pages/MePage.vue') }],
    meta: {
      requiresAuth: false,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
