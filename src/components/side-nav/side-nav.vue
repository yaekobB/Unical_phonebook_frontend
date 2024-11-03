<template>
  
      <v-navigation-drawer
        v-model="sideNavStore.drawer"
        :rail="sideNavStore.rail"
       
        @click="sideNavStore.toggleRail"
        color="#2E2E2E"
        floating
       
        >
        <!-- <v-list-item
          
          nav
        >
          <!-- <h3>User Profile</h3>
          <h4>detailed Info</h4> -->
        <!-- </v-list-item> --> 

        <v-divider></v-divider>

        <v-list density="comfortable" nav>
          <div v-for="nav in sideNavStore.navigations" :key="nav.title">
             <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">            
                   <v-list-item :prepend-icon="nav.prependIcon" 
                   :title="nav.title" :value="nav.value"
                   v-bind="props">
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
export default {
   setup() {
    const sideNavStore = useSideNavStore()
    return { sideNavStore }
  }
}
</script>