<template>
  <v-container fluid>
    <v-row justify="start">
      <!-- Profile Column -->
      <v-col cols="12" md="4">
        <v-card rounded="xl" class="pa-4 mt-4" variant="outlined" color="red-darken-4">
          <!-- Profile Info in Line -->
          <div class="d-flex align-center">
            <!-- Avatar -->
            <v-avatar size="120" color="red-darken-4" class="text-h3 font-weight-bold mr-4 ">
              {{ userInitials }}
            </v-avatar>
        
            <!-- User Info -->
            <div>
              <div class="text-h6 font-weight-bold">{{ userDetail.firstName }} {{userDetail.middleName}} {{ userDetail.lastName }}</div>
              <div class="text-body-2 text--secondary">{{ userDetail.email }}</div>
            </div>
           
          </div>

          <v-divider class="my-4"></v-divider>
  
          <!-- Profile Details -->
          <v-card-text>
            <v-list >
              <v-list-item class="d-flex align-center">
                <v-list-item-icon>
                  <v-icon color="red-darken-4" class="text-center">mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="d-flex">
                  <v-list-item-title>{{ userDetail.phoneNumber }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red-darken-4">mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ userDetail.address }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <!-- <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Joined: {{ userDetail.joinDate }}</v-list-item-title>
                </v-list-item-content>

              </v-list-item> -->
            </v-list>
          </v-card-text>

          <v-divider></v-divider>

          <!-- Actions -->
          <v-card-actions>
            <v-btn color="red-darken-4" block>
              <v-icon left>mdi-account-edit</v-icon>
              Edit Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Tabs Column -->
      <v-col cols="12" md="8">
       <detail-profile :details="userDetail" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import detailProfile from './detail-profile/detail-profile.vue';
export default {
  components: { detailProfile },
  name: "UserProfile",
  data() {
    return {
      
      userDetail:{}
    };
  },
  computed: {
    userInitials() {
      return `${this.userDetail.firstName[0]}${this.userDetail.lastName[0]}`.toUpperCase();
    },
   
  },
  methods:{
     getUserDetail(){
      this.userDetail = JSON.parse(localStorage.getItem('userInformation'))
     this.userDetail.fullName= this.userDetail.firstName +' '+ this.userDetail.middleName +' '+ this.userDetail.lastName
      
      
    }
  },
  created(){
    this.getUserDetail()
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
