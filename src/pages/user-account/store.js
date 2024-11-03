import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useSnackbarStore } from '@/components/snackbar/store'

export const useUserStore = defineStore('userAccountStore', {
  state: () => ({
    componentName: 'userAccount',
    snackbarStore: useSnackbarStore(),
    tableColumns: [
      {title:'Id', key:'id',align:'start'},
      { title: 'First Name', key: 'firstName' },
      { title: 'Middle Name', key: 'middleName' },
      { title: 'Last Name', key: 'lastName' },
      { title: 'Email', key: 'email' },
      { title: 'Phone Number', key: 'phoneNumber' },
      { title: 'Department', key: 'department' },
      { title: 'Role', key: 'userType' },
    //   { title: 'User Status', key: 'userStatus' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    formFields:[
        {
            label: "First Name",
            fieldName: "input",
            type: "text",
            value:"",
            key: "firstName",
            prependIcon:'mdi-account-tie',
            required: true,
            rules:[
                value=> !!value || 'First Name is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 4,
        },
        {
            label: "Middle Name",
            fieldName: "input",
            type: "text",
            value:"",
            key: "middleName",
            prependIcon:'mdi-card-account-details-outline',
            required: true,
            rules:[
                value=> !!value || 'Middle Name is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 4,
        },
        {
            label: "Last Name",
            fieldName: "input",
            type: "text",
            value:"",
            key: "lastName",
            prependIcon:'mdi-human',
            required: true,
            rules:[
                value=> !!value || 'Last Name is required *',
                value=> /[a-zA-Z- ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 4,
        },
        {
            label: "Email",
            fieldName: "input",
            type: "text",
            value:"",
            key: "email",
            prependIcon:'mdi-email',
            required: true,
            rules:[
                v => !!v || "Email is required",
                v => /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?unical\.it$/.test(v) || "Invalid Organizational Email "
              ],
                cols: 12,
                md: 6,
        },
        // {
        //     label: "code",
        //     fieldName: "input",
        //     type: "autocomplete",
        //     value:"",
        //     key: "countryCode",
        //     prependIcon:'mdi-flag-variant',
        //     required: true,
        //     validation:()=>{
        //             return {
        //                 required:true,
        //                 rules:[
        //                     value=> !!value || '',
        //                     value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
        //                     // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
        //                 ]
        //             }     
        //         },
        //         cols: 12,
        //         md: 2,
        // },
        {
            label: "Phone Number",
            fieldName: "input",
            type: "text",
            value:"",
            key: "phoneNumber",
            prependIcon:'mdi-phone',
            required: true,
            rules:[
                value=> !!value || 'Phone Number is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        {
            label: "Password",
            fieldName: "password",
            type: "password",
            value:"",
            key: "password",
            prependIcon:'mdi-lock',
            required: true,
            rules: [
                v => !!v || "Password is required",
                v => v.length >= 6 || "Password must be at least 6 characters",
               
              ],
                cols: 12,
                md: 6,
        },
        {
            label: "Confirm Password",
            fieldName: "password",
            type: "password",
            value:"",
            key: "confirmPassword",
            prependIcon:'mdi-lock-check',
            // appendIcon:'',
            required: true,
            rules: [
                v => !!v || "Password is required",
                v => v.length >= 6 || "Password must be at least 6 characters",
               
              ],
                cols: 12,
                md: 6,
        },
        {
            label: "Department",
            fieldName: "autocomplete",
            type: "autocomplete",
            value:"",
            key: "department",
            prependIcon:'mdi-store',
            required: true,
            items:["DeMACS","Finance","Telecommunication","Chemistry"],
            rules:[
                value=> !!value || 'Department is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        {
            label: "Role",
            fieldName: "autocomplete",
            type: "autocomplete",
            value:"",
            key: "userType",
            prependIcon:'mdi-shield-account',
            required: true,
            items:["Faculty","Administrative","Student"],
            rules:[
                value=> !!value || 'Role is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        
      
    ],
    icon:"mdi-account-plus",
    dialogTitle:"User",
    editIcon:"mdi-account-edit",
    navItems:[
        // {title:"Profile", value:"profile",prependIcon:"mdi-account"},
        {title:"Users", value:"user",prependIcon:"mdi-account"},
        {title:"Departments", value:"department",prependIcon:"mdi-domain"},
        {title:"Roles", value:"role",prependIcon:"mdi-badge-account-horizontal"}

    ],
    users:[]
  }),
  actions:{
    async getUsers(){
        // const snackbarStore = useSnackbarStore();
        try {
            console.log("get users")
           
            const response = await apiClient.get('/user');
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
                  this.users = response.data

                  console.log(this.users)
            }
            
            console.log(response.data)
          } catch (error) {
            console.log('Error fetching data:', error);
            // console.log(error.message)
            // snackbarStore.showSnackbar({
            //     message: error.message,
            //     color: 'error',
            //     timeout: 5000
            //   })
          }

    },
    async setAddUser(user){
      // const snackbarStore = useSnackbarStore();
        try {
            console.log("adding user")
            console.log(user)
          
            const response = await apiClient.post('/user/signup',{...user});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 5000
                  })
            }else{
             this.getUsers()
             this.snackbarStore.showSnackbar({
                message: "Successfully registered",
                color: 'success',
                timeout: 5000
              })

            }
            console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
           await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 5000
            })
          }
        
    },
    async setEditUser(user){
      // const snackbarStore = useSnackbarStore();
        try {
            console.log("Editing user")
            console.log(user)
          
            const response = await apiClient.put(`/user/${user.userId}`,{...user});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 5000
                  })
            }else{
             this.getUsers()
             this.snackbarStore.showSnackbar({
                message: "Successfully Updated",
                color: 'success',
                timeout: 5000
              })

            }
            console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 5000
            })
          }
        
    },
    async setDeleteUser(user){
      // const snackbarStore = useSnackbarStore();
        try {
            console.log("Deleting user")
            console.log(user)
          
            const response = await apiClient.delete(`/user/${user.userId}`,{...user});
            this.data = response.data;
            console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 5000
                  })
            }else{
             this.getUsers()
             this.snackbarStore.showSnackbar({
                message: "Successfully Deleted",
                color: 'success',
                timeout: 5000
              })

            }
            console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 5000
            })
          }
        
    }
  }
})
