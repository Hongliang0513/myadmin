import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/login/Login'
import Home from '../views/home/Home'
import Category from '../views/category/Category'
import Product from '../views/product/Product'
import User from '../views/user/User'
import Role from '../views/role/Role'
import Bar from '../views/charts/Bar'
import Line from '../views/charts/Line'
import Pie from '../views/charts/Pie'

const Admin = () => import('../views/admin/Admin')

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/login',
      component: Login,
    },
    {
      path: '/',
      component: Admin,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
        },
        {
          path: '/category',
          component: Category,
        },
        {
          path: '/product',
          component: Product,
        },
        {
          path: '/user',
          component: User,
        },
        {
          path: '/role',
          component: Role,
        },
        {
          path: '/bar',
          component: Bar,
        },
        {
          path: '/line',
          component: Line,
        },
        {
          path: '/pie',
          component: Pie,
        },
      ],
    },
  ],
})
