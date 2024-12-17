import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useSnackbarStore } from '@/components/snackbar/store'
import { useTableStore } from '@/components/data-table/store'
import { useDepartmentStore } from '../department/store'
import { useRoleStore } from '../role/store'
// import departments from '@/services/departments'
import router from '@/router/index';
import userRole from '@/services/userRole'

// import roles from '@/services/roles'
export const useUserStore = defineStore('userStore', {
  state: () => ({
    componentName: 'user',
    snackbarStore: useSnackbarStore(),
    tableStore:useTableStore(),
    departmentStore: useDepartmentStore(),
    roleStore: useRoleStore(),
    tableColumns: [
      {title:'Id', key:'__id',align:'start'},
      { title: 'First Name', key: 'firstName' },
      { title: 'Middle Name', key: 'middleName' },
      { title: 'Last Name', key: 'lastName' },
      { title: 'Email', key: 'email' },
      { title: 'Phone Number', key: 'phoneNumber' },
      { title: 'Department', key: 'departmentName' },
      { title: 'Role', key: 'roleName' },
    //   { title: 'User Status', key: 'userStatus' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    formFields:[
        {
            label: "First Name",
            fieldName: "input",
            type: "text",
           
            key: "firstName",
            prependIcon:'mdi-account-tie',
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
           
            key: "middleName",
            prependIcon:'mdi-card-account-details-outline',
            
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
            key: "lastName",
            prependIcon:'mdi-human',
            
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
           
            key: "email",
            prependIcon:'mdi-email',
            
            rules:[
                v => !!v || "Email is required",
                v => /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?unical\.it$/.test(v) || "Invalid Organizational Email "
              ],
                cols: 12,
                md: 6,
        },
       
        {
            label: "Phone Number",
            fieldName: "input",
            type: "text",
           
            key: "phoneNumber",
            prependIcon:'mdi-phone',
            
            rules:[
                value=> !!value || 'Phone Number is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid',
                
            ],  
                cols: 12,
                md: 6,
        },
        {
            label: "Password",
            fieldName: "password",
            type: "password",
            showPassword:false,
            key: "password",
            prependIcon:'mdi-lock',
            
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
            showPassword:false,
            key: "confirmPassword",
            prependIcon:'mdi-lock-check',
            // appendIcon:'',
            
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
           
            key: "departmentName",
            name:"departmentName",
            prependIcon:'mdi-store',
            items:[],
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
            key: "roleName",
            name:"roleName",
            prependIcon:'mdi-shield-account',
            items:[],
            rules:[
                value=> !!value || 'Role is required *',
                value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid String',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        {
          label: "Personal Webiste Link",
          fieldName: "input",
          type: "text",
          key: "websiteLink",
          prependIcon:'mdi-web',
          
          rules:[
              // value=> !!value || 'Phone Number is required *',
              // value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid',
              // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
          ],  
              cols: 12,
              md: 6,
       },
       {
            label: "LinkedIn",
            fieldName: "input",
            type: "text",
           
            key: "linkedIn",
            prependIcon:'mdi-linkedin',
            
            rules:[
                // value=> !!value || 'Phone Number is required *',
                // value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid',
                // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
            ],  
                cols: 12,
                md: 6,
        },
        {
          label: "Twitter",
          fieldName: "input",
          type: "text",
         
          key: "twitter",
          prependIcon:'mdi-alpha-x-box',
          rules:[
              // value=> !!value || 'Phone Number is required *',
              // value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid',
              // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
          ],  
              cols: 12,
              md: 6,
      },
      {
        label: "Address",
        fieldName: "input",
        type: "text",
        key: "address",
        prependIcon:'mdi-map-marker',
        
        // rules:[
        //     value=> !!value || 'Phone Number is required *',
        //     value=> /[a-zA-Z0-9 - ]*/.test(value) || 'Invalid',
        //     // value => /^[a-zA-Z0-9 ]*$/.test(value) || 'Invalid Branch Name'
        // ],  
            cols: 12,
            md: 6,
    },
        
        
      
    ],
    icon:"mdi-account-plus",
    dialogTitle:"User",
    editIcon:"mdi-account-edit",
    navItems:[
        // {title:"Profile", value:"profile",prependIcon:"mdi-account"},
        {title:"Users", value:"user",prependIcon:"mdi-account",url:"users"},
        {title:"Departments", value:"department",prependIcon:"mdi-domain"},
        {title:"Roles", value:"role",prependIcon:"mdi-badge-account-horizontal"},
        {title:"Chat", value:"chat",prependIcon:"mdi-chat",url:"chat"},

    ],
    users:[],
    user:{},
    userInitials: null
  }),
  actions:{
    async getUsers(pageLimit = 25 ,pageNumber = 1, searchKey= '', role ='', department='', isPublic = false){
        // const snackbarStore = useSnackbarStore();
        // console.log("at get user-----------")
        department = department == null? '':department
        role = role == null? '':role

      
        try {
          
            const url = `/user?limit=${pageLimit}&page=${pageNumber}&searchKey=${searchKey}&isPublic=${isPublic}&roleId=${role}&departmentId=${department}`
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
                // this.users = response.data
                // console.log(response.data)
                  this.users = response.data.map((user,index) =>{
                    return {
                      ...user,
                      __id: index + 1,
                      isActive: user.userStatus == 'Active'?true:false,
                      departmentName: user.departmentResponseModel.departmentName,
                      departmentId: user.departmentResponseModel.departmentId,
                      roleName: user.roleResponseModel.roleName,
                      roleId: user.roleResponseModel.roleId,
                      departmentLink: user.departmentResponseModel.departmentLink
                      // departmentName: user.department,
                      // departmentId: this.findDepartmentId(user.department),
                      // roleName: user.userType,
                      // roleId: this.findRoleId(user.userType),

                    }
                  })

                  // console.log(this.users)
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
    async getUser(userId){
           
    
      try {
        // console.log("Getting a user")
        // console.log(userId)
        
          const url = `/user/${userId}`
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
              // this.users = response.data
              // console.log(response.data)
              this.user = response.data
               
              this.user.fullName= this.user.firstName +' '+ this.user.middleName +' '+ this.user.lastName
              this.user.departmentName = this.user.departmentResponseModel.departmentName
              this.user.roleName = this.user.userType
      
              this.userInitials = (this.user.firstName[0] + this.user.lastName[0]).toUpperCase();
                           

                
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
    async setAddUser(user){
      // const snackbarStore = useSnackbarStore();
        try {
            // console.log("Adding user+++++++++")
            // console.log(user)
            user.departmentId =  this.findDepartmentId(user.departmentName)
            user.roleId = this.findRoleId(user.roleName)
            user.userType = user.roleId
            // const mappedUser = user.map()
            const response = await apiClient.post('/user/signup',{...user});
            this.data = response.data;
            // console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.message,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             await this.getUsers()
             this.tableStore.initializeItems(this.users)

             this.snackbarStore.showSnackbar({
                message: "Successfully registered",
                color: 'success',
                timeout: 3000
              })

            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
            await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async setEditUser(user){
      // const snackbarStore = useSnackbarStore();
        try {
          // console.log("@Editing a user ++++++")
          // console.log(user)
          user.departmentId =  this.findDepartmentId(user.departmentName)
          user.roleId = this.findRoleId(user.roleName)
          user.userType = user.roleName

          // console.log(user.departmentId)
          // console.log(user.roleId)
           
            const response = await apiClient.put(`/user/${user.userId}`,{...user});
            this.data = response.data;
            // console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             await this.getUsers()
             this.tableStore.initializeItems(this.users)

             this.getUser(this.data.userId)
             this.snackbarStore.showSnackbar({
                message: "Successfully Updated",
                color: 'success',
                timeout: 3000
              })

            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async changeStatus(user){
      // const snackbarStore = useSnackbarStore();
        try {
            // console.log("change user status")
            // console.log(user)
            const  status = {
              userStatus: user.userStatus == "Active"? "NotVerified":"Active"
            }
            const response = await apiClient.put(`/user/changestatus/${user.userId}`,status);
            this.data = response.data;
            // console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             await this.getUsers()
             this.tableStore.initializeItems(this.users)

             this.snackbarStore.showSnackbar({
                message: "Successfully Updated",
                color: 'success',
                timeout: 3000
              })

            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async changePrivacy(user){
      // const snackbarStore = useSnackbarStore();
        try {
           
            const  isPrivacy = {
              isPrivacyDisabled: !user.isPrivacyDisabled
            }
            // console.log("at changing privacy")
            // console.log(user.userId)
            // console.log(isPrivacy)
           
            const response = await apiClient.put(`/user/changeprivacy/${user.userId}`,isPrivacy);
            this.data = response.data;
           
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
              // console.log("successfully enabled or disabled")
            //  await this.getUsers()
             this.snackbarStore.showSnackbar({
                message: "Successfully Updated",
                color: 'success',
                timeout: 3000
              })

            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async setDeleteUser(user){
      // const snackbarStore = useSnackbarStore();
        try {
            // console.log("Deleting user")
            // console.log(user)
          
            const response = await apiClient.delete(`/user/${user.userId}`,{...user});
            this.data = response.data;
            // console.log(this.data)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.error,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             await this.getUsers()
             this.tableStore.initializeItems(this.users)

             this.snackbarStore.showSnackbar({
                message: "Successfully Deleted",
                color: 'success',
                timeout: 3000
              })

            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
             await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async verifyEmail(email){
      // const snackbarStore = useSnackbarStore();
        try {
          //  console.log(email)
          
            const response = await apiClient.put('/user/verify',{...email});
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
                message: this.data.message,
                color: 'success',
                timeout: 3000
              })
            router.push('/sign-in')
            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
           await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },
    async resendCode(email){
      // const snackbarStore = useSnackbarStore();
        try {
          //  console.log("at resendcode store ===============")
          //  console.log(email)
          
            const response = await apiClient.put('/user/resend-code',{...email});
            this.data = response.data;
            // console.log(this.data.message)
            if(this.data.error){
             this.snackbarStore.showSnackbar({
                    message: this.data.message,
                    color: 'error',
                    timeout: 3000
                  })
            }else{
             this.getUsers()
             this.snackbarStore.showSnackbar({
                message: this.data.message,
                color: 'success',
                timeout: 3000
              })

            }
            // console.log(this.data)
          } catch (error) {
            console.error('Error fetching data:', error);
           await  this.snackbarStore.showSnackbar({
              message: error,
              color: 'error',
              timeout: 3000
            })
          }
        
    },

    togglePasswordVisibility(key) {
      console.log(key)
     
      this.formFields.forEach(field => {
        if (field.key === key) {
          // Toggle the showPassword value for the matching field
          field.showPassword = !field.showPassword;
        }
      });   
      
    },
    setDepartments(departments){
      this.formFields.forEach(field =>{
        if(field.name == "departmentName"){
          field.items = departments
        }
      })
    },
    setRoles(roles){
      this.formFields.forEach(field =>{
        if(field.name == "roleName"){
          field.items = roles
        }
      })
    },
    findDepartmentId(department){
      const deptId =this.departmentStore.departments.filter(dept =>dept.departmentName == department)           
      // console.log(deptId)
      return deptId[0].departmentId
    },
    findRoleId(role){
      const roleId =  this.roleStore.roles.filter(r => r.roleName == role)
      // console.log(roleId.roleId)
      return roleId[0].roleId
    },
   

    // getFieldRules (key,password){
      // console.log("@user store password confirmation rule")
      // console.log(password)
      // console.log(key)
      // // Add password match rule if it's the confirmPassword field
      // this.formFields.forEach(field => {
      //   if (field.key === 'confirmPassword') {
      //     // Toggle the showPassword value for the matching field
      //     field.rules.push(
      //       v => v === password || "Passwords do not match"
      //     );
      //   }
      // });   
      // console.log(this.formFields)
     
    // }
    
   
  },
 
})
