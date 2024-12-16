<template>
  
      <v-navigation-drawer
        v-model="sideNavStore.drawer"
        :rail="sideNavStore.rail"
       
      
        color="#2E2E2E"
        floating
       
        >
        <!-- <v-list-item
          
          nav
        >
        
          <h4>detailed Info</h4> -->
        <!-- </v-list-item> --> 
          <div class="d-flex align-center mt-4 mb-6 pa-2" >
            <!-- Avatar -->
              <v-avatar :size="sideNavStore.rail? 40: 60" class="text-h6 font-weight-bold mr-2" color="red-darken-4">
                {{ userStore.userInitials }}
              </v-avatar>

            <!-- User Info -->
            <div v-if="!sideNavStore.rail">
             
              <div class="text-h6 font-weight-bold">{{ userStore.user.firstName }}  {{ userStore.user.lastName }}</div>
              <div class="text-body-2 text--secondary">{{ userStore.user.email }}</div>
            </div>
          </div>
        <v-divider></v-divider>

        <v-list density="comfortable" nav>
          <div v-for="nav in sideNavStore.navigations" :key="nav.title">
             <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">   
                         
                   <v-list-item :prepend-icon="nav.prependIcon" 
                   :title="nav.title" :value="nav.value"
                   v-bind="props" 
                   :to="nav.url">
                   </v-list-item>
              
              </template>
                  {{nav.title}}
            </v-tooltip>
         
          </div>
          
        </v-list>
        <template v-slot:append>
            <v-btn
              :icon="sideNavStore.rail? 'mdi-chevron-right':'mdi-chevron-left'"
              variant="text"
              @click.stop="sideNavStore.toggleRail"
            ></v-btn>
          </template>
      </v-navigation-drawer>
      
   
</template>
<script>
import {useSideNavStore} from './store'
import {useUserStore} from '@/pages/user-account/store'
export default {
   data() {   
   
    return { 
       sideNavStore: useSideNavStore(),
       userStore: useUserStore(),
      // user: { },
      
     }
  },
  computed:{
    //  userInitials() {
    //   return `${this.user.firstName[0]}${this.user.lastName[0]}`.toUpperCase();
    // },

  },
  created(){
    // const sideNavStore = useSideNavStore()
    let localStoredUserRole = JSON.parse(localStorage.signInUser).userRole;
    // this.userStore.getUser(localStoredUserRole.role)
    // this.user = this.userStore.user

    const navs = this.sideNavStore.navItems.filter(nav => {
          return nav.role && nav.role.includes(localStoredUserRole);
      });

     console.log(navs)
     this.sideNavStore.setNavigations(navs)
  }
}
</script>