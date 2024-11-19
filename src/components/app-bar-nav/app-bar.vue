<template>
  <div>
    <v-app-bar
      dark
      flat
      app
      class="white--text font-weight-bold text-h6 stretched-app-bar"
      color="red-darken-4"
    
      
    >
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-row >
      <UnicalLogo  @click="sideNavStore.toggleNav"/>
  </v-row>
  
      <v-spacer></v-spacer>
      
        <v-btn   class="mr-2" >
           <router-link :to="{name: 'phonebook'}">
           <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
          </router-link>
         Phonebook
        </v-btn>
     
      <v-btn icon class="mr-2" size="medium" elevation = "25" @click="toggleDialog">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm Signout</v-card-title>
        <v-card-text>
          Are you sure you want to Sign Out?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#452624" text @click="toggleDialog">Cancel</v-btn>
          <v-btn color="error" text @click="signOut">Sign Out</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-app-bar>
  </div>
</template>
<script>
import {useSideNavStore} from '../side-nav/store'
import {useSignInStore} from '../../layouts/SignIn/store'
import UnicalLogo from '@/components/toolbar/logo.vue'

export default {
   components:{
    UnicalLogo,
   },
   data() {
  
    // const userStore = usesignInStore()
    return { 
        sideNavStore:useSideNavStore(),
        dialog:false 
    }
    
  },
  methods:{

    signOut(){
      console.log("Sign Out Clicked..")
      const signInStore = useSignInStore()
      signInStore.signOut()
    },
    toggleDialog(){
      this.dialog = !this.dialog
    }
  }
 
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
.app-bar-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: white;
}
.stretched-app-bar {
  width: 100vw; /* Full viewport width */
  max-width: 100%;
  margin: 0 auto;
}

</style>