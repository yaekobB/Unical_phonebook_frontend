<template>
  <div>
    <dataTable
    />
    <Snackbar/>
  </div>
</template>

<script>
// import { onMounted } from 'vue';
import { useTableStore } from '../../components/data-table/store';
import { useUserStore } from './store';
import dataTable from '../../components/data-table/data-table.vue';

import Snackbar from '@/components/snackbar/Snackbar.vue';
import { useSideNavStore } from '@/components/side-nav/store';
// import { toRaw } from 'vue';
export default {
  components: { dataTable, Snackbar },

  data() {
    return {
     
    userStore: useUserStore(),
      
    };
  },

 async created() {
    const tableStore = useTableStore();
    const userStore = useUserStore();
    const navSideStore = useSideNavStore();
    // const columns = toRaw(userStore.tableColumns);
    navSideStore.setNavigations(userStore.navItems)
    tableStore.setColumns(userStore.tableColumns);
    tableStore.setFormFields(userStore.formFields);
    tableStore.setDialogTitle(userStore.dialogTitle);
    tableStore.setIcon(userStore.icon)
    await userStore.getUsers();
    console.log(userStore.users)
    
    // console.log(columns)
    // Optionally, initialize with some items
    tableStore.initializeItems(userStore.users);
    // tableStore.initializeItems([
    //   {id:"1", firstName:"Robel", middleName:"Gebrehiwot", lastName:"Brhane", userRole:"Admin",email:"robel@unical.it",phoneNumber:"+393511141072"}
    // ])
  },
}
</script>
