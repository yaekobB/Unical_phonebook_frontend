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
import { useDepartmentStore } from './store';
import dataTable from '../../components/data-table/data-table.vue';

import Snackbar from '@/components/snackbar/Snackbar.vue';
// import { useSideNavStore } from '@/components/side-nav/store';
// import { toRaw } from 'vue';
export default {
  components: { dataTable, Snackbar },

  data() {
    return {
     
    departmentStore: useDepartmentStore(),
      
    };
  },

 async created() {
    const tableStore = useTableStore();
    const departmentStore = useDepartmentStore();
    // const navSideStore = useSideNavStore();
    // const columns = toRaw(departmentStore.tableColumns);
    // navSideStore.setNavigations(departmentStore.navItems)
    tableStore.setColumns(departmentStore.tableColumns);
    tableStore.setFormFields(departmentStore.formFields);
    tableStore.setDialogTitle(departmentStore.dialogTitle);
    tableStore.setComponentName(departmentStore.componentName)
    tableStore.setIcon(departmentStore.icon)
    await departmentStore.getDepartments();
    console.log("Departments")
    console.log(departmentStore.departments)
    
    // console.log(columns)
    // Optionally, initialize with some items
    tableStore.initializeItems(departmentStore.departments);
    // tableStore.initializeItems([
    //   {id:"1", firstName:"Robel", middleName:"Gebrehiwot", lastName:"Brhane", userRole:"Admin",email:"robel@unical.it",phoneNumber:"+393511141072"}
    // ])
  },
}
</script>
