export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('_c/Login')
  },
  {
    path: '/home',
    component: () => import('_v/Main')
  }
]
