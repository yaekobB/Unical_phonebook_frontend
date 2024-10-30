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
export default {

    component:{
        AppBar,
        SideNav
    }
    
}
</script>