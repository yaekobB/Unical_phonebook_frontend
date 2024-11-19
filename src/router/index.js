/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
import SignIn from '../layouts/SignIn/SignIn.vue'
import SignUp from '@/layouts/SignUp/sign-up.vue'
// import Test from '../components/data-table/test/test.vue'
import Test from '../components/snackbar/test'
import UserAccount from '../pages/user-account/user-account.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import userRole from '@/services/userRole'
import Profile from '@/pages/profile/profile.vue'
import Phonebook from '@/pages/phonebook/phonebook.vue'
// import { routes } from 'vue-router/auto-routes'

const  routes = [
  { path: '/', name:"phonebook", component: Phonebook },
  { path: '/sign-in', name:"signin", component: SignIn },
  { path: '/sign-up', name:"signup", component: SignUp },
  { path: '/test', component: Test},
  { 
    path:'/users', 
    name:"users",
    component: Dashboard,
    meta: { authorize: [userRole.admin] },
    children:[
      { path: '', name:"user", component: UserAccount},

    ]

  },
  {path:'/profile', name:"profile",
  component: Dashboard,
  meta: { authorize: [userRole.admin,userRole.student, userRole.faculty, userRole.administrative] },
  children:[
    { path: '', name:"profile", component: Profile},

  ]

  },
  // {
  //   path:'*',
  //   component: Phonebook
  // }
  
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/','/sign-in','/sign-up'];
  const authRequired = !publicPages.includes(to.path);
  
  // Redirect to login page if page requires authentication and user is not logged in
  if (authRequired && !localStorage.getItem('signInUser')) {
      return next('/');
  }
  // Role-based Access Conrol List
  const signedInUser =JSON.parse(localStorage.getItem('signInUser'));
  if (to.matched.some(record => record.meta.authorize)) {       
      const routeRole =to.matched[0].meta.authorize
      const userRole =signedInUser.userRole
      if(!routeRole.includes(userRole)){
          console.log('routeRole:'+routeRole);
          console.log('userRole:'+userRole);
          return next('/');
      }
  }
  next();
})
// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
