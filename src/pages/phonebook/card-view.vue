<template>
  <v-container>
    <v-row justify="center">
      <!-- <v-col cols="6"></v-col> -->
      <v-col cols="12"  md="6" lg="4" xl="2"  v-for="contact in contacts"
          :key="contact.id"
          class="mb-4">
        <v-card
         
          color="error"
          variant="outlined"
        
          rounded="xl"
        >
          <!-- Header Section -->
        
          <v-sheet color="#8a3c36">
            <v-card-item>
              <template v-slot:prepend>
                <v-card-title class="text-h6">
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
          <v-card class="ma-2"  rounded="xl" variant="outlined"  color="error">
             <!-- Contact Information Section -->
            <v-card-item>
              <v-card-title class="text-body-2 d-flex align-center">
                <v-icon  icon="mdi-table" start></v-icon>
               
                  Department and Role
               
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                <div class="font-weight-light text-medium-emphasis">
                 <!-- {{contact.department}} -->
                 (Macro) Settore Servizi didattica e studenti DESF - Dipartimento di Economia, Statistica e Finanza
                 
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
                  Address
                </span>
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                
                <div class="font-weight-light text-medium-emphasis">
                 Cubo 30B - MT11
                 
                
                </div>
              </div>
            </v-card-item>
            <v-divider></v-divider>

            <!-- Office Hours Section -->
            <!-- <v-card-item>
              <v-card-title class="text-body-2 d-flex align-center">
                <v-icon color="#949cf7" icon="mdi-clock" start></v-icon>
                <span class="text-medium-emphasis font-weight-bold">
                  Office Hours
                </span>
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                <div class="">Monday - Friday: 9:00 AM - 5:00 PM</div>
                <div class="">Saturday: 10:00 AM - 2:00 PM</div>
              </div>
            </v-card-item> -->
            <v-divider></v-divider>

           
          </v-card>

        

          <!-- Actions Section -->
          <div class="pa-2 d-flex align-center" rounded="xl">
          
            <v-spacer></v-spacer>
              <!-- Social Media Section -->
          <div class="pa-1 d-flex align-center">
            <v-icon color="#e1306c" icon="mdi-phone" size="24" class="me-3"></v-icon>
            <v-icon color="#3b5998" icon="mdi-email" size="24" class="me-3"></v-icon>
             <v-icon color="#0077b5" icon="mdi-web" size="24" class="me-3"></v-icon>
            <v-icon color="#1da1f2" icon="mdi-x" size="24" class="me-3"></v-icon>
            <v-icon color="#0077b5" icon="mdi-linkedin" size="24" class="me-3"></v-icon>
           
           
          </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ContactDetailsCard",
  props: {
  contacts: {
    type: Array,
    default: () => []
  }
},
  data(){
    return{
        
    }

  }
};
</script>

<style scoped>
.v-card-title h3 {
  margin: 0;
  font-weight: bold;
}
</style>
