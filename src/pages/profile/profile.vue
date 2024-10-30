<template>
    <h3>{{userRole}}'s profile page </h3>
</template>
<script>
export default {
    data(){
        return{
            userRole:""
        }
    },


    async mounted() {
        this.userRole = JSON.parse(localStorage.signInUser).userRole
    // const tableStore = useTableStore();
    // const userStore = useUserStore();
    // const navSideStore = useSideNavStore();
    // const columns = toRaw(userStore.tableColumns);
    // navSideStore.setNavigations(userStore.navItems)
    // tableStore.setColumns(userStore.tableColumns);
    // tableStore.setFormFields(userStore.formFields);
    // tableStore.setDialogTitle(userStore.dialogTitle);
    // tableStore.setIcon(userStore.icon)
    // await userStore.getUsers();
    // console.log(userStore.users)
    
    // // console.log(columns)
    // // Optionally, initialize with some items
    // tableStore.initializeItems(userStore.users);
    // tableStore.initializeItems([
    //   {id:"1", firstName:"Robel", middleName:"Gebrehiwot", lastName:"Brhane", userRole:"Admin",email:"robel@unical.it",phoneNumber:"+393511141072"}
    // ])
  },
}
</script>