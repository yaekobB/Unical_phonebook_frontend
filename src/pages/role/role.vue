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
import { useRoleStore } from './store';
import dataTable from '../../components/data-table/data-table.vue';

import Snackbar from '@/components/snackbar/Snackbar.vue';
// import { useSideNavStore } from '@/components/side-nav/store';
// import { toRaw } from 'vue';
export default {
  components: { dataTable, Snackbar },

  data() {
    return {
     
    roleStore: useRoleStore(),
      
    };
  },

 async created() {
    const tableStore = useTableStore();
    const roleStore = useRoleStore();
    // const navSideStore = useSideNavStore();
    // const columns = toRaw(roleStore.tableColumns);
    // navSideStore.setNavigations(roleStore.navItems)
    tableStore.setColumns(roleStore.tableColumns);
    tableStore.setFormFields(roleStore.formFields);
    tableStore.setDialogTitle(roleStore.dialogTitle);
    tableStore.setComponentName(roleStore.componentName)

    tableStore.setIcon(roleStore.icon)
    await roleStore.getRoles();
   
    
    // console.log(columns)
    // Optionally, initialize with some items
    tableStore.initializeItems(roleStore.roles);
    // tableStore.initializeItems([
    //   {id:"1", firstName:"Robel", middleName:"Gebrehiwot", lastName:"Brhane", userRole:"Admin",email:"robel@unical.it",phoneNumber:"+393511141072"}
    // ])
  },
}
</script>
