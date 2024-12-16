import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useSnackbarStore } from '@/components/snackbar/store'
import { useTableStore } from '@/components/data-table/store'
// import departments from '@/services/departments'
// import router from '@/router/index';

// import roles from '@/services/roles'
export const useDepartmentStore = defineStore('departmentStore', {
  state: () => ({
    componentName: 'department',
    snackbarStore: useSnackbarStore(),
    tableStore:useTableStore(),
    tableColumns: [
      {title:'Id', key:'__id',align:'start'},
      { title: 'Department Name', key: 'departmentName' },
      { title: 'Department Link', key: 'departmentLink' },
    
    //   { title: 'department Status', key: 'departmentStatus' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    formFields:[
        {
            label: "Department Name",
            fieldName: "input",
            type: "text",
           
            key: "departmentName",
            prependIcon:'mdi-domain',
            rules:[
                value=> !!value || 'Department Name is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        {
            label: "Department Link",
            fieldName: "input",
            type: "text",
           
            key: "departmentLink",
            prependIcon:'mdi-web',
            
            rules:[
                value=> !!value || 'Department Link is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
      
      
    
        
        
      
    ],
    icon:"mdi-domain-plus",
    dialogTitle:"Department",
    editIcon:"mdi-account-edit",
    departments:[],
    department:{},
   
  }),
  actions:{
    async getDepartments(){
      
        try {
          
            const url = `/departments`
            const response = await apiClient.get(url);
            // console.log(response.data)
            if(response.data.error){
                // snackbarStore.showSnackbar({
                //     message: this.data.error,
                //     color: 'success',
                //     timeout: 3000
                //   })

            }else{
                // snackbarStore.showSnackbar({
                //     message: 'Hello, this is a reusable snackbar!',
                //     color: 'success',
                //     timeout: 3000
                //   })
                // this.departments = response.data
                  this.departments = response.data.map((dept,index) =>{
                    return {
                      ...dept,
                      __id: index + 1
                    }
                  })

                  console.log(this.departments)
            }
            
            // console.log(response.data)
          } catch (error) {
            // console.log('Error fetching data:', error);
            // console.log(error.message)
            // snackbarStore.showSnackbar({
            //     message: error.message,
            //     color: 'error',
            //     timeout: 3000
            //   })
          }

    },
    async getDepartment(departmentId){
           
    
      try {
        console.log("Getting a department")
        console.log(departmentId)
        
          const url = `/department/${departmentId}`
          const response = await apiClient.get(url);
          console.log(response.data)
          if(response.data.error){
              // snackbarStore.showSnackbar({
              //     message: this.data.error,
              //     color: 'success',
              //     timeout: 3000
              //   })

          }else{
              // snackbarStore.showSnackbar({
              //     message: 'Hello, this is a reusable snackbar!',
              //     color: 'success',
              //     timeout: 3000
              //   })
              // this.departments = response.data
                this.department = response.data
               
             

                
          }
          
          // console.log(response.data)
        } catch (error) {
          // console.log('Error fetching data:', error);
          // console.log(error.message)
          // snackbarStore.showSnackbar({
          //     message: error.message,
          //     color: 'error',
          //     timeout: 3000
          //   })
        }

  },
    async setAddDepartment(department){
      // const snackbarStore = useSnackbarStore();
        try {
            console.log("Adding Department")
            const response = await apiClient.post('/departments',{...department});
            this.data = response.data;
            // console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.message,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             await this.getDepartments()
             this.tableStore.initializeItems(this.departments)

             this.snackbarStore.showSnackbar({
                message: "Successfully registered",
                color: 'success',
                timeout: 3000
              })

            }
            console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
            await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async setEditDepartment(department){
      console.log("Editting Department")
       console.log(department)
      // const snackbarStore = useSnackbarStore();
        try {
           
            const response = await apiClient.put(`/departments/${department.departmentId}`,{...department});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             await this.getDepartments()
             this.tableStore.initializeItems(this.departments)

             this.snackbarStore.showSnackbar({
                message: "Successfully Updated",
                color: 'success',
                timeout: 3000
              })

            }
            console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
   
  
    async setDeleteDepartment(department){
      // const snackbarStore = useSnackbarStore();
        try {
            console.log("Deleting department")
            console.log(department)
          
            const response = await apiClient.delete(`/departments/${department.departmentId}`,{...department});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
            await this.getDepartments()
            this.tableStore.initializeItems(this.departments)

             this.snackbarStore.showSnackbar({
                message: "Successfully Deleted",
                color: 'success',
                timeout: 3000
              })

            }
            console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    }, 
   
  },
 
})
