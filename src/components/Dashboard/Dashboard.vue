<template>
    <v-app>
        <v-main>
            <AppBar/>
            <SideNav/>
            <v-container fluid>
            <router-view />
          </v-container>
        </v-main>
    </v-app>
</template>
<script>
import AppBar from '../app-bar-nav/app-bar.vue'
import SideNav from '../side-nav/side-nav.vue'
import {useUserStore} from '@/pages/user-account/store'
export default {

    component:{
        AppBar,
        SideNav
    },
     data(){
      return{
        userStore: useUserStore()
      }

    },
     created(){
      const user  = JSON.parse(localStorage.getItem('signInUser'))
      console.log("Dashboard creation")
     console.log(user)
    // console.log(this.userId)
    this.userStore.getUser(user.userId)
    }
    
}
</script>