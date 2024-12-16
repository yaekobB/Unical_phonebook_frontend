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
import Chat from '@/pages/chat/chat.vue'
import UserAccount from '../pages/user-account/user-account.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import Department from '@/pages/department/department.vue'
import Role from '@/pages/role/role.vue'

import userRole from '@/services/userRole'
import Profile from '@/pages/profile/profile.vue'
import Phonebook from '@/pages/phonebook/phonebook.vue'
import forgotPassword  from '../components/forgotPassword/forgotPassword.vue'
// import changePassword from '@/components/changePassword/changePassword.vue'
// import { components } from 'vuetify/dist/vuetify-labs.js'
// import { routes } from 'vue-router/auto-routes'


const  routes = [
  // {path: "/change-password", name: 'changePassword', component: changePassword},
  {path: '/forgot-password', name: 'forgotPassword', component: forgotPassword},
  { path: '/', name:"phonebook", component: Phonebook },
  { path: '/sign-in', name:"signin", component: SignIn },
  { path: '/sign-up', name:"signup", component: SignUp },
  { path: '/test', component: Test},
  { path:'/chat',
    name:'chats', 
    component: Dashboard,
    meta: { authorize: [userRole.admin,userRole.student, userRole.faculty, userRole.administrative] },
    children:[
      {path:'', name:"chat", component:Chat}
    ]
  },
  { 
    path:'/users', 
    name:"users",
    component: Dashboard,
    meta: { authorize: [userRole.admin] },
    children:[
      { path: '', name:"user1", component: UserAccount},
      

    ]

  },
  { 
    path:'/roles', 
    name:"roles",
    component: Dashboard,
    meta: { authorize: [userRole.admin] },
    children:[
      { path: '', name:"role", component: Role},
      

    ]

  },
  { 
    path:'/departments', 
    name:"departments",
    component: Dashboard,
    meta: { authorize: [userRole.admin] },
    children:[
      { path: '', name:"department", component: Department},
      

    ]

  },
  {path:'/profile', name:"profiles",
  component: Dashboard,
  meta: { authorize: [userRole.admin,userRole.student, userRole.faculty, userRole.administrative] },
  children:[
    { path: '', name:"profile1", component: Profile},

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
  const publicPages = ['/','/sign-in','/sign-up','/forgot-password','/change-password'];
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
