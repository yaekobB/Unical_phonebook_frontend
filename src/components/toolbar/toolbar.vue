<template>
  <v-app-bar app color="red-darken-4" dark rounded extended class=" pt-3">
    <!-- Toolbar Title -->
    
  
    <!-- <v-row>
      <v-col >
       
         <v-img src="/logo.webp"
           cover
              ></v-img>
       
      </v-col>
    </v-row> -->
   
     <a href="https://unical.it" target="_blank" rel="noopener noreferrer">
      <UnicalLogo/>
    </a>
     
      
      
   
    
        
         
       <!-- <v-toolbar-title>Phonebook</v-toolbar-title> -->
     
   

    <!-- Spacer to push elements to the right -->
    <v-spacer />
    <v-btn size="xl"  class="mr-2">
           <router-link :to="{name: 'phonebook'}">
           <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
          </router-link>
         Phonebook
        </v-btn>
       
    <!-- Search Field (responsive: hides on small screens) -->
    <!-- <v-text-field
    
      append-inner-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="mx-3"
      rounded
      variant="outlined"
       density="compact"
      elevation="10"
    ></v-text-field> -->

   
    <!-- Sign In and Sign Up Buttons -->
     <v-btn-toggle
      rounded="xl"
    >
    <v-btn  elevation="10" class="mx-1" rounded @click="redirect('sign-in')">
      Sign In
      
    </v-btn>
    <v-btn  elevation="10" class="mx-1" rounded @click="redirect('sign-up')">
      Sign Up
    </v-btn>
     </v-btn-toggle>
  </v-app-bar>
</template>

<script>
import router from '@/router/index';
import UnicalLogo from '@/components/toolbar/logo.vue'
export default {
  components:{
    UnicalLogo

  },
  methods: {
    toggleView(viewType) {
      this.$emit("viewChange", viewType);
    },
    redirect(route){
        router.push(route)
    }
  },
};
</script>

<style scoped>
/* Responsive toolbar adjustments */
@media (max-width: 600px) {
  .v-toolbar-title {
    font-size: 16px;
  }
}
.responsive-image { width: 100%; height: auto; }
</style>
