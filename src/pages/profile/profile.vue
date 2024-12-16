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
              {{ userStore.userInitials }}
            </v-avatar>
        
            <!-- User Info -->
            <div>
              <div class="text-h6 font-weight-bold">{{ userStore.user.firstName }} {{userStore.user.middleName}} {{ userStore.user.lastName }}</div>
              <div class="text-body-2 text--secondary">{{ userStore.user.email }}</div>
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
                  <v-list-item-title>{{ userStore.user.phoneNumber }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red-darken-4">mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ userStore.user.address }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <!-- <v-list-item>
                <v-list-item-icon>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Joined: {{ userStore.user.joinDate }}</v-list-item-title>
                </v-list-item-content>

              </v-list-item> -->
            </v-list>
          </v-card-text>

          <v-divider></v-divider>

          <!-- Actions -->
          <v-card-actions>
            <v-row >
              <v-btn class="mb-2" color="red-darken-4" block variant="outlined" size="large" rounded @click="editPersonalInfo()">
              <v-icon left>mdi-account-edit</v-icon>
              Edit Profile
            </v-btn>
            
            <v-btn  color="red-darken-4" block variant="outlined" size="large" rounded>
              <v-icon left>mdi-lock-reset</v-icon>
              Change Passowrd
            </v-btn>
           
            
              
              <v-tooltip location="bottom" >
                <template v-slot:activator="{ props }">        
                   
                   <v-switch  color="#452624" v-bind="props" 
                              v-model="userStore.user.isPrivacyDisabled" 
                              size="large"
                              @click="changePrivacy()"
                              label="Privacy Setting"
                              class="mx-auto text-h6 font-weight-bold">
                  </v-switch>
                </template>
                {{userStore.user.isPrivacyDisabled? "Disable Private View":"Enable Private View"}} 
               </v-tooltip>
             
           
           
           
            </v-row>
           

          </v-card-actions>
        </v-card>
        
      </v-col>

      <!-- Tabs Column -->
      <v-col cols="12" md="8">
        
       <detail-profile :details="userStore.user" />
      </v-col>
     <v-dialog v-model="editDialog" max-width="700px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5"> Edit Personal Information</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
           <v-form ref="form" v-model="isValid">
          <v-container>
            <v-row >
              <v-col v-for="field in tableStore.formFields" :key="field.key" :cols="field.cols" :md="field.md" class="pa-1">
                <v-text-field
                  v-if="field.fieldName == 'input'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :prepend-inner-icon="field.prependIcon"
                 :type="field.type"
                 :rules="field.rules"
                 variant="outlined"
                  density="compact"
                  
                ></v-text-field>
                <!-- <v-text-field
                  v-if="field.fieldName == 'password'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :prepend-inner-icon="field.prependIcon"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="togglePasswordVisibility(field.key)"
                 :type="field.type"
                 variant="outlined"
                  density="compact"
              
                ></v-text-field> -->
                <v-autocomplete
                   v-if="field.fieldName == 'autocomplete'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :items="field.items"
                  :item-title="field.name"
                  :prepend-inner-icon="field.prependIcon"
                  :rules="field.rules"
                  variant="outlined"
                  density="compact"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="outlined" @click="closeEditDialog">Cancel</v-btn>
          <v-btn color="#452624" variant="outlined" @click="updatePersonalInfo" :disabled="!isValid">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Snackbar/>
    </v-row>
  </v-container>
</template>

<script>
import Snackbar from '@/components/snackbar/Snackbar.vue'
import detailProfile from './detail-profile/detail-profile.vue';
import { useUserStore } from '@/pages/user-account/store';
import { useTableStore } from '@/components/data-table/store';
import { useDepartmentStore } from '../department/store';
import {useRoleStore} from '../role/store'

export default {
  components: { detailProfile, Snackbar },
  name: "UserProfile",
 
 
  data() {
    return {
      userStore: useUserStore(),
      tableStore: useTableStore(),
      departmentStore:useDepartmentStore(),
      roleStore: useRoleStore(),
      // userDetail:{},
      editDialog: false,
      isValid: false,
      userId:null
    };
  },
  computed: {
   
   
  },
  methods:{
   
    changePrivacy(){
      console.log(this.userStore.user)
      this.userStore.changePrivacy({...this.userStore.user})
    
    },
    editPersonalInfo(){
      this.editDialog = true
      this.tableStore.editedItem = {...this.userStore.user}
    },
    updatePersonalInfo(){
       this.userStore.setEditUser(this.tableStore.editedItem)
       this.editDialog = false
       
    },
    closeEditDialog(){
      this.editDialog = false
      this.tableStore.editedItem = {}

    },
    
  },
  async created(){
    //  const user  = JSON.parse(localStorage.getItem('signInUser'))
    // this.userId = user.userId
    // // console.log(this.userId)
    // this.userStore.getUser(this.userId)
    this.tableStore.setFormFields(this.userStore.formFields);
    await this.departmentStore.getDepartments()
    await this.roleStore.getRoles()

    this.userStore.setDepartments(this.departmentStore.departments)
    this.userStore.setRoles(this.roleStore.roles)
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
