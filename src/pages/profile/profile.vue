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
            
            <v-btn  color="red-darken-4" block variant="outlined" size="large" rounded @click="toggleDialog">
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
    <v-dialog v-model="dialog" max-width = "700px" persistent>
      <v-card  class="elevation-12 forgot-password-card fixed" max-width="500" >
        <v-card-title class="mb-3">
         <router-link >
           <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
         </router-link>
          
         Unical Phonebook: Change Password
        </v-card-title>
        <v-card-text class=" mr-8 ml-8 pa-2" variant="outlined" color="red-darken-4">
          <v-form v-model="valid" ref="form">
            <v-text-field 
              v-model="oldPassword"
              prepend-inner-icon="mdi-lock"
              density = "comfortable"
              label="Old Password"
              :type="showOldPassword ? 'text' : 'password'"
              :rules="[passowrdRules.password, passowrdRules.required]"
               :append-inner-icon="showOldPassword ? 'mdi-eye-off' : 'mdi-eye'"
              required
              variant ="outlined"
              @click:append-inner="toggleOldPasswordVisibility"
            ></v-text-field>
          
            <v-text-field 
              v-model="newPassword"
              prepend-inner-icon="mdi-lock"
              density = "comfortable"
              label="New Password"
              :type="showNewPassword ? 'text' : 'password'"
              :rules="[passowrdRules.password, passowrdRules.required]"
               :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
              required
              variant ="outlined"
              @click:append-inner="toggleNewPasswordVisibility"
            ></v-text-field>

            <v-text-field 
              v-model="confirmPassword"
              prepend-inner-icon="mdi-lock"
              density = "comfortable"
              label="Confirm Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="[passowrdRules.confirmPassword, passowrdRules.required]"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              required
              @click:append-inner="toggleConfirmPasswordVisibility"
              variant ="outlined"
            ></v-text-field>
          </v-form>
        </v-card-text>
            <v-row>
              <v-col class="d-flex justify">
                <v-btn
                  color="error"
                  @click="cancel"
                  variant ="outlined"
                >
                 Cancel
               </v-btn>
              </v-col> 
              <v-col class="d-flex justify-end">
                <v-btn
                  :disabled="!valid"
                  @click="changePassword"
                  variant="outlined"
                >
                 Change
               </v-btn>
              </v-col>                   
           </v-row>
      </v-card>
    </v-dialog>
   <Snackbar/>
  </v-container>
</template>

<script>
import Snackbar from '@/components/snackbar/Snackbar.vue'
import detailProfile from './detail-profile/detail-profile.vue';

import { useForgotPasswordStore } from '../../components/forgotPassword/store';

import { useUserStore } from '@/pages/user-account/store';
import { useTableStore } from '@/components/data-table/store';
import { useDepartmentStore } from '../department/store';
import {useRoleStore} from '../role/store'

export default {
  components: { detailProfile, Snackbar },
  name: "UserProfile",
 
 
  data() {
    return {

      email: '',
        password: '',
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        valid: false,

        passowrdRules:{
          required: (v) => !!v || 'password is Required.',
          password: (v) => v.length >= 6 && v != '' || "Password must be at least 6 characters",
          confirmPassword: (v) => v.length >= 6 && v != '' && v === this.newPassword || "Passwords must match",
        },
      
        userDetail:{},
        dialog:false,
        messages:'',

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

     getUserDetail(){
      // this.userDetail = JSON.parse(localStorage.getItem('userInformation'))
    //  this.userDetail.fullName= this.userDetail.firstName +' '+ this.userDetail.middleName +' '+ this.userDetail.lastName     
    },
    async changePassword(){
        
          // console.log("User Information: ", this.userDetail);
          // console.log("CP Sending request with: ", {
          //   email: this.userStore.user.email,
          //   newPassword: this.newPassword,
          //   oldPassword:this.oldPassword,
          // });
          
          const useChangePassword = useForgotPasswordStore();
          this.email = this.userStore.user.email;

          let credentials ={
            email: this.email,
            newPassword: this.newPassword,
            oldPassword:this.oldPassword,
          }
           const response = await useChangePassword.changePassword(credentials);
          console.log("isPasswordChanged: 1", useChangePassword.isPasswordChanged);
          //this.dialog = !this.dialog;
          if(useChangePassword.isPasswordChanged){
             this.dialog = !this.dialog;
             console.log("dialog", this.dialog);
             useChangePassword.isPasswordChanged = false;
          }
    },    
        toggleOldPasswordVisibility(){
          this.showOldPassword =!this.showOldPassword;
        },
        toggleNewPasswordVisibility(){
          this.showNewPassword =!this.showNewPassword;
        },
        toggleConfirmPasswordVisibility(){
          this.showConfirmPassword =!this.showConfirmPassword;
        },
    toggleDialog(){
        this.dialog = !this.dialog;
      },
      cancel(){
        this.dialog = !this.dialog;

      },

   
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
.forgot-password-card{
  backdrop-filter: blur(6px);
  padding: 24px;
  border-radius: 12px;
}
</style>