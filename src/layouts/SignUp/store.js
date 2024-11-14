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
      if (this.editedItem.id) {
        console.log("@ table store editing")

        // Edit existing item
        const index = this.items.findIndex(item => item.id === this.editedItem.id);
        console.log(index)
        if (index !== -1) {
          this.items[index] = { ...this.editedItem };
          this.userStore.setEditUser({...this.editedItem})
        
        }
      } else {
        // Add new item
        console.log("@ table store")
        this.userStore.setAddUser({...this.editedItem})
       
      }
      
    },
   
  },
});
