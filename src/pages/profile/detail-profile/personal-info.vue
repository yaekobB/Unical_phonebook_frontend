<template>
    <v-card rounded="xl" variant="outlined"  
          color="error" 
           class="scrollable-card ma-3"
           max-width="700">
             <!-- Contact Information Section -->
            <v-card-item v-for="personal in mapDetail" :key="personal.key">
              <v-card-title class="text-body-2 d-flex align-center">
                <!-- <v-icon  :icon="personal.icon" start></v-icon> -->
               
                 {{formatKey(personal.key)}}
               
                <v-spacer></v-spacer>
              </v-card-title>
              <div class="py-2">
                <div class="font-weight-light text-medium-emphasis">
                 {{personal.value}}
                 
             
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
    computed:{
      mapDetail (){
        console.log(this.detail.personalInfo)
        const mappedDetail =  Object.keys(this.detail.personalInfo).map(key => ({
                key: key,
                value: this.detail.personalInfo[key]
                }));
                return mappedDetail
      }
    },
    data(){
        return{

        }
    },
    methods:{
        formatKey(key) {
        // Add spaces before uppercase letters and capitalize each word
        return key.replace(/([A-Z])/g, ' $1')  // Insert space before uppercase letters
                    .replace(/^./, (str) => str.toUpperCase())  // Capitalize the first letter
                    .trim();  // Remove any leading/trailing spaces
        }
    }
}
</script>