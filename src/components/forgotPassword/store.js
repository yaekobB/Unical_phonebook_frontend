import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import { useSnackbarStore } from '@/components/snackbar/store';
// import userRole from '@/services/userRole';
import router from '@/router/index';
import { useUserStore } from '@/pages/user-account/store';

export const useForgotPasswordStore = defineStore('ForgotPasswordStore', {
  state: () => ({
    email:'',
    isCodeSent: false,
    isCodeVerified: false,
    isPasswordChanged: false,
    snackbarStore: useSnackbarStore(),
    userStore: useUserStore()
    //
  }),
  actions:{
    async sendCode(email){
        try{
            const response = await apiClient.put("/user/checkemail/"+email);
            console.log(" Email/response/data: ",response.data);
            console.log(" Email/response: ",response);
            console.log("Sent Email: : ", email);
            if(response.data){
                this.email = email;
                this.isCodeSent = true;
                this.snackbarStore.showSnackbar({
                    message: "Code Sent Successfully",
                    color: 'success',
                    timeout: 3000
                  })
            }
          } catch (error) {
            // console.error(error);
            console.log('Email/Error fetching data:', error.response.data.message);
            this.snackbarStore.showSnackbar({
                message: error.response.data.message,
                color: 'error',
                timeout: 3000
          })
      }

    },
    async verifyCode(verificationCode){
        try {
            const response = await apiClient.put("user/send-reset-code",{
                email : this.email,
                verificationCode
               // verificationCode : code
            });
            console.log(" Code/response/data: ",response.data);
            console.log("Code/response/data/Message: ", response.data.message);
            if(response.data){
                this.isCodeVerified = true;
                this.snackbarStore.showSnackbar({
                    message: "Code Verified Successfully",
                    color: 'success',
                    timeout: 3000
                  })
            }
            
        } catch (error) {
            console.log('VerifyCode: Error fetching data: ', error.message);
            this.snackbarStore.showSnackbar({
                message: error.message,
                color: 'error',
                timeout: 3000
            })
        }

    },
    async resetPassword(password){
        try {
            const response = await apiClient.put("/user/forgot-password",{
                email: this.email,
                password,
            });
            if(response.data){
                this.snackbarStore.showSnackbar({
                    message: "Password Reset Successfully",
                    color: 'success',
                    timeout: 3000
                  }) 
                  router.push("/sign-in");
            }
        } catch (error) {
            console.log('Reset Pass: Error fetching data:', error);
            this.snackbarStore.showSnackbar({
            message: error.message,
            color: 'error',
            timeout: 3000
          })
        }

    },
    async changePassword(credentials){
        try{
            console.log("Credentials: ", credentials);
            const response = await apiClient.put("/user/changepassword",credentials);
            console.log("Change Password: ",response);
            if(response.data){
                //this.isPasswordChanged = true;
                this.isPasswordChanged = true;
                console.log('store/isPasswordChanged:', this.isPasswordChanged);
                this.snackbarStore.showSnackbar({
                    message: "Password Changed Successfully",
                    color: "success",
                    timeout: 3000
                })
            }
        }catch(error){
            console.log("CP:Error Message: ",error.message)
            this.snackbarStore.showSnackbar({
                message: "Wrong old Password",
                color: 'error',
                timeout: 3000
              })

        }

    },
    cancel(){
        router.push('/sign-in');
    },

  }
})