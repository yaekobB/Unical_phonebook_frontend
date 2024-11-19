// stores/tableStore.js
import { defineStore } from 'pinia';
import { useUserStore } from '@/pages/user-account/store';
// import { toRaw } from 'vue';

export const useSignUpStore = defineStore('signUpStore', {
  state: () => ({
   
    editedItem: {},
    
    formFields:[],
  
    userStore: useUserStore()
  }),
  actions: {
   
    setFormFields(fields) {
      this.formFields = fields;
      // console.log("@set fields")
      // console.log(fields)
    },
   
    
   
    togglePasswordVisibility(key) {
      this.userStore.togglePasswordVisibility(key)
     
      
    },
    saveItem() {
      // const userStore = useUserStore();
    
        // Add new item
       
        this.userStore.setAddUser({...this.editedItem})
       
      
    },
    verifyEmail(code){
      const email = {
        verificationCode:parseInt(code, 10),
        email: this.editedItem.email
      }
      const verificationStatus = this.userStore.verifyEmail({...email})
      console.log(verificationStatus)
    },
    resendCode(){

      const email = {
        email: this.editedItem.email
      }
     
      this.userStore.resendCode(email)
    }
   
  },
});
