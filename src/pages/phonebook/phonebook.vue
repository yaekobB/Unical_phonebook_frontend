<template>
    <div>
        <Toolbar/>
        
            <v-card class="ma-10">
             <v-data-iterator
                :items="contacts"
                :items-per-page="6"
                :search="search"
                
                >
                <template v-slot:header>
                    <v-toolbar class="pa-4">
                    <v-text-field
                        v-model="search"
                        density="compact"
                        placeholder="Search Surname"
                        prepend-inner-icon="mdi-magnify"
                        style="max-width: 300px;"
                        variant="outlined"
                        clearable
                        hide-details
                        rounded
                        class="ma-2"
                    ></v-text-field>
                     <v-autocomplete
                        label="Department"
                        style="max-width: 325px;"
                        multiple
                        variant="outlined"
                        density="compact"
                         clearable
                        hide-details
                        rounded
                        class="ma-2"
                    ></v-autocomplete>
                    <v-autocomplete
                        label="Role"
                        style="max-width: 325px;"
                        multiple
                        variant="outlined"
                        density="compact"
                         clearable
                        hide-details
                        rounded
                        class="ma-2"
                    ></v-autocomplete>
                    <v-spacer></v-spacer>
                     <v-btn-toggle
                        rounded="xl"
                        divided
                        >
                        <v-btn icon @click="toggleView('grid')">
                            <v-icon>mdi-view-grid</v-icon>
                        </v-btn>
                        <v-btn icon @click="toggleView('list')">
                            <v-icon>mdi-view-list</v-icon>
                        </v-btn>
                        
                    </v-btn-toggle>
                    </v-toolbar>
                </template>

                <template v-slot:default="{ items }">
                    <CardView :contacts="contacts"/>
                    <!-- <TableView :contacts="contacts"/> -->
                </template>

                <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                    <div class="d-flex align-center justify-center pa-4">
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
                    </div>
                </template>
                </v-data-iterator>
            </v-card>

      
        <Footer/>

    </div>
    
</template>
<script >
import Toolbar from '@/components/toolbar/toolbar.vue'
import Footer from '@/components/Footer/footer.vue'
import CardView from '@/pages/phonebook/card-view.vue'
import { useUserStore } from '@/pages/user-account/store';
export default{
    name:'Phonebook',
    components:{
        Toolbar,
        Footer,
        CardView
    },
    data(){
        return {
    
            contacts:[]
        }
    },
    async created() {
    // const tableStore = useTableStore();
     const userStore = useUserStore();
    // const navSideStore = useSideNavStore();
    // const columns = toRaw(userStore.tableColumns);
    // navSideStore.setNavigations(userStore.navItems)
    // tableStore.setColumns(userStore.tableColumns);
    // tableStore.setFormFields(userStore.formFields);
    // tableStore.setDialogTitle(userStore.dialogTitle);
    // tableStore.setIcon(userStore.icon)
    await userStore.getUsers();
    this.contacts = userStore.users
    console.log(userStore.users)
    
    // console.log(columns)
    // Optionally, initialize with some items
    // tableStore.initializeItems(userStore.users);
    // tableStore.initializeItems([
    //   {id:"1", firstName:"Robel", middleName:"Gebrehiwot", lastName:"Brhane", userRole:"Admin",email:"robel@unical.it",phoneNumber:"+393511141072"}
    // ])
  },

    
}
</script>