<template>
  <div>
    <v-app-bar
      dark
      flat
      app
      class="white--text font-weight-bold text-h6 stretched-app-bar"
      color="#452624"
    
      
    >
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-row align="center" no-gutters class="mt-4 ml-4">
    <!-- Logo Image -->
    <v-col class="d-flex align-center " cols="auto">
      <v-img 
        width="64"
        height="64"
        src="https://unical.esse3.cineca.it/img/layout/favicons/apple-touch-icon.png"
        cover
        @click="sideNavStore.toggleNav"
      />
    </v-col>

    <!-- Title Text -->
    <v-col class="d-flex align-center app-bar-title" cols="auto" style="margin-left: 8px;">
       Unical Phonebook
       <v-icon color="primary" class="ml-2" size="medium">
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon> 
    </v-col>
     <!-- <v-col class="d-flex align-center" cols="auto" style="margin-left: 8px;">
      <v-img src="/favicon.ico"/>
    </v-col> -->
  </v-row>

      <v-spacer></v-spacer>

      <v-btn icon class="mt-2 mr" size="medium" elevation = "25" @click="toggleDialog">
        <v-icon>mdi-logout</v-icon>
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
export default {
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