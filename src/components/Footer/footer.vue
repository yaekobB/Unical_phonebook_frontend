<template>
  <v-footer  color="red-darken-4" dark>
    <v-container>
      <v-row>
        <!-- University Address Card -->
      

        <!-- Contact Info Card -->
        <v-col cols="12" md="4" >
          <v-card elevation="2" color="red-darken-4" class="pa-4" rounded="xl">
            <h3 class="white--text">Contact</h3>
           
              <v-icon left elevetion="10">mdi-phone</v-icon>
              +393511111111
              <br>
              <v-icon left elevetion="10">mdi-email</v-icon>
               contact@unical.it
           
          </v-card>
        </v-col>

        <!-- Social Media Card -->
        <v-col cols="12" md="4">
          <v-card elevation="2" color="red-darken-4" class="pa-4" rounded="xl">
            <h3 class="white--text">Follow Us</h3>
            <v-btn v-for="media in socialMedias" :key="media"  icon  :href="media.url" target="_blank">
              <v-icon>{{media.icon}}</v-icon>
            </v-btn>
          
          </v-card>
        </v-col>
          <v-col cols="12" md="4" >
          <v-card elevation="2" color="red-darken-4" class="pa-4" rounded="xl">
          <a href="https://unical.it" target="_blank" rel="noopener noreferrer">
          <UnicalLogo/>
          </a>
           
           
            
            <p> Via Pietro Bucci<br>  87036 Rende CS
            <br> C.F. 80003950781 / P.I. 00419160783
            </p>
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <!-- Footer Note -->
      <v-row class="mt-2">
        <v-col class="text-center white--text">
          &copy; {{ new Date().getFullYear()}} UNIVERSITÀ DELLA CALABRIA All Rights Reserved.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import UnicalLogo from '@/components/toolbar/logo.vue'
export default {
  name: "UniversityFooter",
  components:{
    UnicalLogo
  },
  data(){
    return{
      socialMedias:[
        {icon:"mdi-facebook", url:"https://www.facebook.com/unicalufficiale/"},
        {icon:"mdi-alpha-x-box", url:"https://x.com/UniCalPortale?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"},
        {icon:"mdi-linkedin", url:"https://www.linkedin.com/school/universit%C3%A0-della-calabria/"},
        {icon:"mdi-instagram", url:"https://www.instagram.com/unical_official/"},
        {icon:"mdi-youtube", url:"https://www.youtube.com/@campusunical"},
        {icon:"mdi-github", url:"https://github.com/UniversitaDellaCalabria"},

      ]
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 8px;
}
p {
  margin: 0;
}
</style>
