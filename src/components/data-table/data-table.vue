<!-- components/data-table.vue -->
<template>
  <div>
    <v-data-table :headers="tableStore.columns" :items="tableStore.items" :search="search">
      
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><strong>{{ tableStore.dialogTitle }}s </strong></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
             
                 <v-text-field
                    v-model="search"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    label="Search"
                    variant="outlined"
                    hide-details
                    single-line
                    rounded
                    class="mr-5"
              
            ></v-text-field>
             
           
          
          <v-btn  color = "#452624"
                  @click="tableStore.openDialog"
                   rounded
                   class="ma-4"
                   elevation = "15"
                   >
                   <v-icon :icon="tableStore.icon"></v-icon>
                    <v-tooltip
                      activator="parent"
                      location="bottom"
                    >Add New {{tableStore.dialogTitle}}</v-tooltip>
            
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn-toggle
            rounded="xl"
            variant="outlined"
            divided
            
          >
            <!-- <v-btn >
              <v-tooltip location="bottom" >
                <template v-slot:activator="{ props }">            
                   <v-switch color="#452624" v-bind="props" v-model="tableStore.switch" size="small">
                  </v-switch>
                </template>
                 Activate {{tableStore.dialogTitle}}
               </v-tooltip>
              
              </v-btn> -->
            <v-btn >
              <v-tooltip location="bottom" >
                <template v-slot:activator="{ props }">            
                    <v-icon class="me-2" size="small" @click="editItem(item)" color="#452624" v-bind="props">
                      mdi-pencil
                    </v-icon>
                </template>
                 Edit {{tableStore.dialogTitle}}
               </v-tooltip>
              </v-btn>
            <v-btn >
              <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">            
                  
                <v-icon size="small" @click="tableStore.openDeleteDialog(item)" color="error" v-bind="props">
                  mdi-delete
                </v-icon>
              </template>
                  Delete {{tableStore.dialogTitle}}
            </v-tooltip>
            </v-btn>
           
          </v-btn-toggle>
        </div>
         
    
        
       
      </template>

      <template v-slot:no-data>
        <v-btn color="#452624" @click="initialize" loading>Reload</v-btn>
      </template>
    </v-data-table>

    <!-- Add Dialog -->
    <v-dialog v-model="tableStore.dialogVisible" max-width="700px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5"> Add {{ tableStore.dialogTitle }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" v-model="isValidAdd">
          <v-container>
            <v-row >
              <v-col v-for="field in tableStore.formFields" :key="field.key" :cols="field.cols" :md="field.md" class="pa-1">
                <v-text-field
                  v-if="field.fieldName == 'input'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :prepend-inner-icon="field.prependIcon"
                 :type="field.type"
                 :rules="field.rules"
                 variant="outlined"
                  density="compact"              
                ></v-text-field>
                <v-text-field
                  v-if="field.fieldName == 'password'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :prepend-inner-icon="field.prependIcon"
                  :append-inner-icon="field.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="tableStore.togglePasswordVisibility(field.key)"
                 :type="field.showPassword ? 'text' : 'password'"
                 :rules="getFieldRules(field.key, field.rules)"
                 variant="outlined"
                  density="compact"
              
                ></v-text-field>
                <v-autocomplete
                   v-if="field.fieldName == 'autocomplete'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :items="field.items"
                  :prepend-inner-icon="field.prependIcon"
                  :rules="field.rules"
                  variant="outlined"
                  density="compact"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="outlined" @click="tableStore.closeDialog">Cancel</v-btn>
          <v-btn color="#452624" variant="outlined" @click="tableStore.saveItem" :disabled="!isValidAdd">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

   <!-- Edit Dialog -->
   <v-dialog v-model="tableStore.dialogEditVisible" max-width="700px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5"> Edit {{ tableStore.dialogTitle }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
           <v-form ref="form" v-model="isValid">
          <v-container>
            <v-row >
              <v-col v-for="field in tableStore.formFields" :key="field.key" :cols="field.cols" :md="field.md" class="pa-1">
                <v-text-field
                  v-if="field.fieldName == 'input'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :prepend-inner-icon="field.prependIcon"
                 :type="field.type"
                 :rules="field.rules"
                 variant="outlined"
                  density="compact"
                  
                ></v-text-field>
                <!-- <v-text-field
                  v-if="field.fieldName == 'password'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :prepend-inner-icon="field.prependIcon"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="togglePasswordVisibility(field.key)"
                 :type="field.type"
                 variant="outlined"
                  density="compact"
              
                ></v-text-field> -->
                <v-autocomplete
                   v-if="field.fieldName == 'autocomplete'"
                  v-model="tableStore.editedItem[field.key]"
                  :label="field.label"
                  :items="field.items"
                  :prepend-inner-icon="field.prependIcon"
                  :rules="field.rules"
                  variant="outlined"
                  density="compact"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="outlined" @click="tableStore.closeEditDialog">Cancel</v-btn>
          <v-btn color="#452624" variant="outlined" @click="tableStore.saveItem" :disabled="!isValid">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="tableStore.dialogDeleteVisible" max-width="500px">
      <v-card>
        <v-card-title class="text-h5" color="warning">Are you sure you want to delete this {{tableStore.dialogTitle}}?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="outlined" @click="tableStore.closeDeleteDialog">Cancel</v-btn>
          <v-btn color="#452624" variant="outlined" @click="tableStore.deleteItem">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useTableStore } from './store';

export default {
  name: 'data-table',
  props: {
    title: {
      type: String,
      default: 'Data Table',
    },
  },
  computed:{
  },
  data() {
    return {
      tableStore: useTableStore(),
      // showPassword: false,
      // showConfirmPassword:false,
      search:'',
      isValid:false,
      isValidAdd:false,
    };
  },
  methods: {
    initialize() {
      this.tableStore.initializeItems([]); // Reset to an empty array or fetch from API
    },
    editItem(item) {
      this.tableStore.editedItem = { ...item }; // Load the item data into the form
      this.tableStore.openEditDialog();
    },
   
    getFieldRules  (field,rules){
      // Add password match rule if it's the confirmPassword field
      if (field === 'confirmPassword') {
        rules.push(
          v => v === this.tableStore.editedItem.password || "Passwords do not match"
        );
      }

      return rules;
    }
  },
};
</script>

<style scoped>
/* Add any styles you need here */
</style>
