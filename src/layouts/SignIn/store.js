import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useSnackbarStore } from '@/components/snackbar/store';
import userRole from '@/services/userRole';
import router from '@/router/index';
import { useUserStore } from '@/pages/user-account/store';

export const useSignInStore = defineStore('signInStore', {
  state: () => ({
    email:{
        

    },
    snackbarStore: useSnackbarStore(),
    userStore: useUserStore()
    //
  }),
  actions:{
    async signIn(credentials){
      try {
        console.log("try to login")
        console.log(credentials)
       
        const response = await apiClient.post('/user/login',{...credentials});
        console.log(response.data)
        if(response.data.error){
            this.snackbarStore.showSnackbar({
                message: response.data.message,
                color: 'error',
                timeout: 3000
              })

        }else{
            // this.snackbarStore.showSnackbar({
            //     message: 'Hello, this is a reusable snackbar!',
            //     color: 'success',
            //     timeout: 3000
            //   })
           
            let localStorageVariable = {userRole: response.data.userType, token: response.data.accessToken}
            localStorage.setItem("signInUser",JSON.stringify(localStorageVariable))
            localStorage.setItem("userInformation",JSON.stringify(response.data))

                    
              let localStoredUserRole = JSON.parse(localStorage.signInUser).userRole
              if(localStoredUserRole == userRole.admin){
                // console.log("true")
                this.userStore.getUsers()
                router.push('users')
              }else{
                router.push('profile')
              }
            
        }
        
        console.log(response.data)
      } catch (error) {
        console.log('Error fetching data:', error);
        // console.log(error)
        this.snackbarStore.showSnackbar({
            message: error.response.data.message,
            color: 'error',
            timeout: 3000
          })
      }


    },
    async signOut(){
      localStorage.clear()
      router.push('/sign-in')
      // this.snackbarStore.showSnackbar({
      //   message: "Signed Out successfully",
      //   color: 'success',
      //   timeout: 3000 
      // })
      

  }
  }
})