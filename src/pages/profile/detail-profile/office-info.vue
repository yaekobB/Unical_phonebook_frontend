<template>
    <v-card rounded="xl" variant="outlined"  
          color="error" 
           class="scrollable-card ma-3"
           max-width="500">
             <!-- Contact Information Section -->
            <v-card-item>
              <v-card-title class="text-body-2 d-flex align-center">
                <v-icon  icon="mdi-map-marker" start></v-icon>
               
                 Office Location
               
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                <div class="font-weight-light text-medium-emphasis">
                 {{detail.officeInfo.address}}
                 
             
                </div>
              </div>
             <v-divider></v-divider>
            </v-card-item>
            
            
           
          </v-card>
</template>
<script>
export default {
    props:{
        detail:{
            type: Object,
        }
    },
    data(){
        return{

        }
    }
}
</script>