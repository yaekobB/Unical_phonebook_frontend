// stores/tableStore.js
import { defineStore } from 'pinia';
import { useUserStore } from '@/pages/user-account/store';
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
    userStore: useUserStore()
  }),
  actions: {
    setColumns(newColumns) {
      this.columns = newColumns;
      // console.log("@set columns")
      // console.log(newColumns)
    },
    initializeItems(initialItems) {
      // console.log("@Initialize Items")
      // console.log(initialItems)
      this.items = initialItems;
    },
    setFormFields(fields) {
      this.formFields = fields;
      // console.log("@set fields")
      // console.log(fields)
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
          this.closeEditDialog();
        }
      } else {
        // Add new item
        console.log("@ table store")
        this.userStore.setAddUser({...this.editedItem})
        this.items.push({ ...this.editedItem, id: Date.now() }); 
        this.closeDialog(); // Assign a new ID
      }
      
    },
    deleteItem() {
      if (this.itemToDelete) {
        const index = this.items.indexOf(this.itemToDelete);
        console.log(index)
        if (index !== -1) {
          this.userStore.setDeleteUser({...this.itemToDelete})
          this.items.splice(index, 1);
        }
      }
      this.closeDeleteDialog();
    },
  },
});
