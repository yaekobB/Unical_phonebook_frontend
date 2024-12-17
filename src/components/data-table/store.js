// stores/tableStore.js
import { defineStore } from 'pinia';
import { useUserStore } from '@/pages/user-account/store';
import { useDepartmentStore } from '@/pages/department/store';
import { useRoleStore } from '@/pages/role/store';
import { capitalize } from 'vue';
// import { toRaw } from 'vue';

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    items: [],
    columns: [],
    dialogVisible: false,
    dialogDeleteVisible: false,
    dialogEditVisible: false,
    editedItem: {},
    itemToDelete: null,
    dialogTitle:" ",
    icon:" ",
    formFields:[],
    switch: true,
    storeMap : {
      user: useUserStore(),
      department: useDepartmentStore(),
      role: useRoleStore(),
    },
    
    componentName: ''
  }),
  actions: {
    setColumns(newColumns) {
      this.columns = newColumns;
      
    },
    setComponentName(componentName) {
      this.componentName = componentName;
     },
    initializeItems(initialItems) {
           this.items = initialItems;
    },
    setFormFields(fields) {
      this.formFields = fields;
     
    },
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.editedItem = {}; // Reset edited item
    },
    openEditDialog() {
      this.dialogEditVisible = true;
    },
    closeEditDialog() {
      this.dialogEditVisible = false;
      this.editedItem = {}; // Reset edited item
    },
    openDeleteDialog(item) {
      this.itemToDelete = item;
      this.dialogDeleteVisible = true;
    },
    closeDeleteDialog() {
      this.dialogDeleteVisible = false;
      this.itemToDelete = null; // Reset item to delete
    },
    setDialogTitle(dialogTitle){
      this.dialogTitle = dialogTitle;

    },
    setIcon(icon){
      this.icon = icon;

    },
    setSwitch(bool){
      this.switch = bool;

    },
    togglePasswordVisibility(key) {
      console.log("at password toggle")
      const userStore = useUserStore()
      console.log(key)
      userStore.togglePasswordVisibility(key)
     
      
    },
    async saveItem() {
      // const userStore = useUserStore();
      const store = this.storeMap[this.componentName];
      //console.log("@ SaveItem in table store==========")
      // //console.log(store)
      // //console.log(this.editedItem[`${this.componentName}Id`])
      if (this.editedItem[`${this.componentName}Id`]) {
        //console.log("@ table store editing")
        
        // Edit existing item
        const index = this.items.findIndex(item => item[`${this.componentName}Id`] === this.editedItem[`${this.componentName}Id`]);
        //console.log(index)
        if (index !== -1) {
          this.items[index] = { ...this.editedItem };
         // Dynamically get the store
          const actionName = `setEdit${this.capitalize(this.componentName)}`; // Construct the action name dynamically
    
          if (store && typeof store[actionName] === "function") {
            //console.log("at Editing item========")
            store[actionName]({ ...this.editedItem}); 
          

          } 
          // this.userStore.setEditUser({...this.editedItem})
          // await store[`get${this.componentName}s`]

          // await   this.initializeItems(store[`${this.componentName}s`])
          // //console.log(store[`${this.componentName}s`])
          // //console.log(this.items)
          this.closeEditDialog();
        }
      } else {
        // Add new item
        //console.log("@ table store")
        const actionName = `setAdd${this.capitalize(this.componentName)}`; // Construct the action name dynamically
        //console.log(actionName)
        if (store && typeof store[actionName] === "function") {
          //console.log("call for adding ...")
          store[actionName]({ ...this.editedItem}); // Pass the payload
          

        } 
        // this.userStore.setAddUser({...this.editedItem})
        // this.items.push({ ...this.editedItem, id: Date.now() }); 
        // await store[`get${this.componentName}s`]
        // await this.initializeItems(store[`${this.componentName}s`])
        // //console.log(store[`${this.componentName}s`])
        // //console.log(store[`${this.componentName}s`])
        // //console.log(this.items)
        this.closeDialog(); // Assign a new ID
      }
      
    },
    async deleteItem() {
      const store = this.storeMap[this.componentName];
      //console.log("deleting item-----------")
      //console.log(store)
      if (this.itemToDelete) {
        const index = this.items.indexOf(this.itemToDelete);
        //console.log(index)
        if (index !== -1) {
          const actionName = `setDelete${this.capitalize(this.componentName)}`; // Construct the action name dynamically
          //console.log(actionName)
          if (store && typeof store[actionName] === "function") {
            //console.log("call for deleting ...")
            store[actionName]({ ...this.itemToDelete}); 
            

          // Pass the payload
          } 
          // this.userStore.setDeleteUser({...this.itemToDelete})
          // this.items.splice(index, 1);
        }
      }
      // await store[`get${this.componentName}s`]
     
      //  await this.initializeItems(store[`${this.componentName}s`])
      // ////console.log(store[`${this.componentName}s`])
      // ////console.log(this.items)
      this.closeDeleteDialog();
    },
    changeStatus(item){
      const store = this.storeMap[this.componentName];

      const actionName = `changeStatus`; // Construct the action name dynamically
      ////console.log(actionName)
      if (store && typeof store[actionName] === "function") {
        ////console.log("call for changing status ...")
        store[actionName]({ ...item}); // Pass the payload
        // store[`get${this.componentName}s`]
        // this.initializeItems(store[`${this.componentName}s`])


      } 
      // this.userStore.changeStatus({...item})
    },
    capitalize(name){
      return name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()
    }
  },
});
