<template>
  <v-container>
    <v-row >
      <!-- <v-col cols="6"></v-col> -->
      <v-col cols="12" sm="6" md="4" lg="3" xl="2"  v-for="contact in contacts"
          :key="contact.userId"
          class="mb-4 ">
        <v-card
          color="error"
          variant="outlined"
          min-height="400"
          max-height="400"
          min-width="290"
          rounded="xl"
         
          fixed
         
        >
            <!-- Header Section -->
        
          <v-sheet color="#8a3c36">
            <v-card-item>
              <template v-slot:prepend>
                <v-card-title class="text-body-2">
                      <!-- <v-avatar color="info">
                        <span class="text-h5">RG</span>
                    </v-avatar> -->
                  
                  {{contact.firstName + ' ' + contact.middleName + ' ' + contact.lastName}}
                </v-card-title>
              </template>
              <v-divider class="" vertical></v-divider>
           
              <!-- <template v-slot:append>
                <v-chip
                    prepend-icon="mdi-check"
                    @click="alarm"
                    variant="flat"
                    color="success"
                >
                    Active
                </v-chip>
              </template> -->
            </v-card-item>
          </v-sheet>
          

          <!-- Contact Details Section -->
          <v-card rounded="xl" variant="outlined"  
          color="error" min-height="270"
          max-height="270"
           class="scrollable-card ma-3">
             <!-- Contact Information Section -->
            <v-card-item>
              <v-card-title class="text-body-2 d-flex align-center">
                <v-icon  icon="mdi-table" start></v-icon>
               
                  Department and Role
               
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                <div class="font-weight-light text-medium-emphasis">
                 <router-link to="">
                  {{contact.department}}</router-link> 
                 <!-- (Macro) Settore Servizi didattica e studenti DESF - Dipartimento di Economia, Statistica e Finanza -->
                 
                  <br/>
                {{contact.userType}}
                  
                  
                 <!-- {{contact.userType}} -->
                </div>
              </div>
            </v-card-item>
             <v-divider></v-divider>
            <v-card-item>
              <v-card-title class="text-body-2 d-flex align-center">
                <v-icon  icon="mdi-map-marker" start></v-icon>
                <span class="text-medium-emphasis font-weight-bold">
                  Office
                </span>
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                
                <div class="font-weight-light text-medium-emphasis">
                {{contact.address}}
               
                
                </div>
              </div>
            </v-card-item>
           
          </v-card>

        

          <!-- Actions Section -->
          <div class="d-flex align-center" rounded="xl">
          
            <v-spacer></v-spacer>
              <!-- Social Media Section -->
          <div class=" d-flex align-center">
             <v-btn icon class="white--text " v-if="contact.phoneNumber" href="" target="_blank" v-tooltip="contact.phoneNumber">
              <v-icon color="#e1306c" icon="mdi-phone" size="24" class="ma-3"></v-icon>
            </v-btn>
            <v-btn icon class="white--text" v-if="contact.email" :href="'mailto:'+contact.email" target="_blank">
              <v-icon color="#3b5998" icon="mdi-email" size="24" class="ma-3"></v-icon>
            </v-btn>
            <v-btn icon class="white--text" v-if="contact.websiteLink" :href="contact.websiteLink" target="_blank">
              <v-icon color="#0077b5" icon="mdi-web" size="24" class="ma-3"></v-icon>
            </v-btn>
           
            <v-btn icon class="white--text" v-if="contact.linkedIn" :href="contact.linkedIn" target="_blank">
             
                 <v-icon color="#0077b5" icon="mdi-linkedin" size="24" class="ma-3"></v-icon>
            </v-btn>
           
           
             
          
          
           
           
          </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import  dummyData  from './dummydata';

export default {
  name: "ContactDetailsCard",
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
  computed:{
    // getContacts(){
    //   let mappedContacts = this.contacts.map(contact => contact.raw)
    //   console.log(mappedContacts)
    //   return mappedContacts
    // }

  },
  data(){
    return{
    // contacts: dummyData
      //[
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"(Macro) Settore Servizi didattica e studenti DESF - Dipartimento di Economia, Statistica e Finanza  DESF - Dipartimento di Economia, Statistica e Finanza "},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Area Servizi TA – DIMES: Dipartimento Ingegneria Informatica, Modellistica, Elettronica e Sistemistica"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},
      //   {firstName:"Robel",middleName:"GH", lastName:"Brhane",email:"robel@unical.it", phoneNumber:"+393511141072", department:"Demacs"},

      // ]
        
    }

  }
};
</script>

<style scoped>
.v-card-title h3 {
  margin: 0;
  font-weight: bold;
}
 .scrollable-card {
  overflow-y: auto;
}
</style>
