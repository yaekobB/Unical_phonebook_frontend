import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useSnackbarStore } from '@/components/snackbar/store'
import { useTableStore } from '@/components/data-table/store'
// import departments from '@/services/departments'
// import router from '@/router/index';

// import roles from '@/services/roles'
export const useRoleStore = defineStore('roleStore', {
  state: () => ({
    componentName: 'role',
    snackbarStore: useSnackbarStore(),
    tableStore:useTableStore(),
    tableColumns: [
      {title:'Id', key:'__id',align:'start'},
      { title: 'Role FullName', key: 'roleFullName' },
      { title: 'Role Name', key: 'roleName' },
     
    //   { title: 'role Status', key: 'roleStatus' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    formFields:[
        {
            label: "Role Full Name",
            fieldName: "input",
            type: "text",
            key: "roleFullName",
            prependIcon:'mdi-badge-account-horizontal',
            rules:[
                value=> !!value || 'Role Name is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        {
            label: "Role Name",
            fieldName: "input",
            type: "text",
            key: "roleName",
            prependIcon:'mdi-account-tie',
            rules:[
                value=> !!value || 'Role Name is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
      
        
        
      
    ],
    icon:"mdi-account-plus",
    dialogTitle:"Role",
    editIcon:"mdi-domain-edit",
  
    roles:[],
    role:{},
  
  }),
  actions:{
    async getRoles(){
       
        try {
          
            const url = `/roles`
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
                // this.roles = response.data
                  this.roles = response.data.map((role,index)=>{
                    return {
                      ...role,
                      __id: index + 1
                    }
                  })
            }
            
            console.log(response.data)
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
    async getRole(roleId){
           
    
      try {
        console.log("Getting a role")
        console.log(roleId)
        
          const url = `/role/${roleId}`
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
              // this.roles = response.data
                this.role = response.data
               
           

                
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
    async setAddRole(role){
      // const snackbarStore = useSnackbarStore();
        try {
            console.log(role)
            const response = await apiClient.post('/roles',{...role});
            this.data = response.data;
            // console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.message,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
            
             this.snackbarStore.showSnackbar({
                message: "Successfully registered",
                color: 'success',
                timeout: 3000
              })

            }
             await this.getRoles()
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
    async setEditRole(role){
      // const snackbarStore = useSnackbarStore();
        try {
           
            const response = await apiClient.put(`/roles/${role.roleId}`,{...role});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             this.getRoles()
             this.getRole(this.data.roleId)
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
   
   
    async setDeleteRole(role){
     
        try {
            
          
            const response = await apiClient.delete(`/roles/${role.roleId}`,{...role});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
           
             this.snackbarStore.showSnackbar({
                message: "Successfully Deleted",
                color: 'success',
                timeout: 3000
              })

            }
            this.getRoles()
            this.tableStore.initializeItems(...this.roles)
            console.log(this.roles)
            console.log(this.tableStore.items)
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
