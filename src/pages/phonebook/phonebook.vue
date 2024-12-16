<template>
    <div>
        <Toolbar/>
        
            <v-card class="ma-10">
             <!-- <v-data-iterator
                :items="contacts"
                :items-per-page="pageLimit"
                :search="search"
                >
                <template v-slot:header> -->
                   <v-toolbar class="pa-4">
                    <v-text-field
                        v-model="search"
                        density="compact"
                        placeholder="Search Surname"
                        append-inner-icon="mdi-magnify"
                        style="max-width: 300px;"
                        @click:append-inner="searchFilter()"
                        variant="outlined"
                       
                        hide-details
                        rounded
                        class="ma-2"
                    ></v-text-field>
                     <v-autocomplete
                        label="Department"
                        chips                      
                        variant="outlined"
                        density="compact"
                        :items="departments"
                        item-title="departmentName"
                        hide-details
                        rounded
                        class="ma-2"
                        v-model="selectedDepartments"
                    ></v-autocomplete>
                    <v-autocomplete
                        label="Role"
                         chips
                        variant="outlined"
                        density="compact"
                        :items="roles"
                        item-title="roleName"
                        hide-details
                        rounded
                        class="ma-2"
                        v-model="selectedRoles"
                       
                    ></v-autocomplete>
                 
                    <v-spacer></v-spacer>
                     <v-btn-toggle
                        rounded="xl"
                        divided
                        >
                        <v-btn icon @click="toggleView('card')">
                            <v-icon>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn icon @click="toggleView('table')">
                            <v-icon>mdi-view-list</v-icon>
                        </v-btn>
                        
                    </v-btn-toggle>
                    </v-toolbar>
                <!-- </template>

                <template v-slot:default="{ items }"> -->
                
                    <CardView :contacts="contacts" v-if="viewStat == 'card'"/>
                    <TableView :contacts="contacts" v-if="viewStat == 'table'"/>
                    <v-pagination
                    v-model="currentPage"
                    :length="totalPage"
                    class="my-4"
                    :total-visible="3"
                    next-icon="mdi-menu-right"
                    prev-icon="mdi-menu-left"
                    @click="controlPagination"
                    />
                 
                <!-- </template> -->

                <!-- <template v-slot:footer="{ page, pageCount, prevPage, nextPage }"> -->
                    <!-- <div class="d-flex align-center justify-center pa-4">
                    <v-btn
                        :disabled="page === 1"
                        density="comfortable"
                        icon="mdi-arrow-left"
                        variant="tonal"
                        rounded
                        @click="prevPage"
                    ></v-btn>

                    <div class="mx-2 text-caption">
                        Page {{ page }} of {{ pageCount }}
                    </div>

                    <v-btn
                        :disabled="page >= pageCount"
                        density="comfortable"
                        icon="mdi-arrow-right"
                        variant="tonal"
                        rounded
                        @click="nextPage"
                    ></v-btn>
                    </div> -->
                <!-- </template> -->
                <!-- </v-data-iterator> -->
                
            </v-card>

      
        <Footer/>

    </div>
    
</template>
<script >
import Toolbar from '@/components/toolbar/toolbar.vue'
import Footer from '@/components/Footer/footer.vue'
import CardView from '@/pages/phonebook/card-view.vue'
import TableView from '@/pages/phonebook/table-view.vue'
import { useUserStore } from '@/pages/user-account/store';
import {useDepartmentStore} from '@/pages/department/store'
import {useRoleStore} from '@/pages/role/store'
// import roles from '@/services/roles'
// import departments from '@/services/departments'
export default{
    name:'Phonebook',
    components:{
        Toolbar,
        Footer,
        CardView,
        TableView
    },
    data(){
        return {
            userStore: useUserStore(),
            departmentStore: useDepartmentStore(),
            roleStore: useRoleStore(),
            roles: [],
            departments: [],
            contacts:[],
            viewStat: 'card',
            selectedDepartments:null,
            selectedRoles:null,
            pageLimit: 8,
            search: '',
            totalPage:0,
            currentPage:1,
           

        }
    },
    // computed:{
    //     getTotalPage (){
    //         return this.userStore.users.length / this.pageLimit
    //     }

    // },
    watch: {
    // Fetch data whenever the current page changes
    currentPage() {
      this.controlPagination();
    },
    selectedDepartments(){
        this.controlPagination();
    },
    selectedRoles(){
        this.controlPagination()
    },

    search(){
     this.controlPagination()
     console.log(this.search)
    }
  },
    methods:{
        toggleView(view){
            this.viewStat = view
        },
       async controlPagination(){
        console.log(this.selectedDepartments)
        // console.log("Control pagination called")
           // the fourth parameter is isPublic value which is true for public request
             await this.userStore.getUsers(this.pageLimit, this.currentPage, this.search,this.selectedRoles, this.selectedDepartments,true);
             this.contacts = this.userStore.users
             if(this.contacts.length> 0){
                 this.totalPage = Math.ceil(this.contacts[0].totalUsers / this.pageLimit)
             }
            
             
    
        },
        searchFilter(){
            this.pageLimit = 8
            this.currentPage = 1
            this.controlPagination()
        }

    },
    async mounted() {
        this.controlPagination()
       await this.departmentStore.getDepartments()
       await this.roleStore.getRoles()

        this.departments = this.departmentStore.departments
        this.roles = this.roleStore.roles
        console.log(this.departmentStore.departments)
            // await this.userStore.getUsers('','','');
            // this.totalPage = Math.ceil( this.userStore.users.length / this.pageLimit)
     
    // this.totalPage = this.userStore.users.length / this.pageLimit  // Initial data load
  },
//     async created() {
//     // const tableStore = useTableStore();
//      const userStore = useUserStore();
//     // const navSideStore = useSideNavStore();
//     // const columns = toRaw(userStore.tableColumns);
//     // navSideStore.setNavigations(userStore.navItems)
//     // tableStore.setColumns(userStore.tableColumns);
//     // tableStore.setFormFields(userStore.formFields);
//     // tableStore.setDialogTitle(userStore.dialogTitle);
//     // tableStore.setIcon(userStore.icon)
//     await userStore.getUsers(this.pageLimit, this.currentPage, this.search);
//     this.contacts = userStore.users
//     console.log(userStore.users)
    
//     // console.log(columns)
//     // Optionally, initialize with some items
//     // tableStore.initializeItems(userStore.users);
//     // tableStore.initializeItems([
//     //   {id:"1", firstName:"Robel", middleName:"Gebrehiwot", lastName:"Brhane", userRole:"Admin",email:"robel@unical.it",phoneNumber:"+393511141072"}
//     // ])
//   },

    
}
</script>