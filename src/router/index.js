import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import firebase from  'firebase'
import authStore from '@/store/modules/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register', 
    component: Register,
    meta: { requiresNotAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresNotAuth: true }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = await firebase.getCurrentUser()
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' })
  } 
  else if (to.meta.requiresNotAuth && user) {
    console.log('called ')
    next({ name: 'Home' })
  } 
  else {
    next()
  }
})

export default router
