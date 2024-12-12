<template>
    <v-container fluid fill-height class="d-flex align-center justify-center  forgot-password-background pa-0">
      <v-card v-if="step === 1" class="elevation-12 forgot-password-card fixed" max-width="500" rounded>
        <v-card-title class="mb-3">
         <router-link :to="{name: 'phonebook'}">
           <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
         </router-link>
          
         Unical Phonebook: Forgot Password
        </v-card-title>
        <v-card-text class="pa-2">
          <v-form v-model="valid" ref="form">
            <v-text-field v-if="!isCode"
              v-model="email"
              prepend-inner-icon="mdi-email"
              density = "comfortable"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
              rounded
              variant ="outlined"
            ></v-text-field>
          </v-form>
        </v-card-text>
            <v-row>
              <v-col class="d-flex justify">
                <v-btn
                  color="secondary"
                  @click="cancel"
                  rounded
                >
                 Cancel
               </v-btn>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="sendCode"
                  rounded
                >
                 Send code
               </v-btn>
              </v-col>
              
           </v-row>
      </v-card>
      <v-card v-if="step === 2"  class="elevation-12 forgot-password-card fixed" max-width="500" rounded>
        <v-card-title class="mb-3">
         <router-link :to="{name: 'phonebook'}">
           <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
         </router-link>
         Unical Phonebook: Verify Code
        </v-card-title>
        <v-card-text class="pa-2">
          <v-form v-model="valid" ref="form">
            <v-text-field 
              v-model="code"
              prepend-inner-icon=""
              density = "comfortable"
              label="Code"
              @input="code = code.replace(/[^0-9]/g, '')"
              :rules="[codeRules.code]"
              rounded
              variant ="outlined"
            ></v-text-field>
          </v-form>
        </v-card-text>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="verifyCode"
                  rounded
                >
                 Verify
               </v-btn>
              </v-col>
           </v-row>
      </v-card>

      <v-card v-if="step === 3" class="elevation-12 forgot-password-card fixed" max-width="500" rounded>
        <v-card-title class="mb-3">
         <router-link :to="{name: 'phonebook'}">
           <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
         </router-link>
          
         Unical Phonebook: Reset Password
        </v-card-title>
        <v-card-text class=" mb-0 pa-2">
          <v-form v-model="valid" ref="form">
            <v-text-field 
              v-model="newPassword"
              prepend-inner-icon="mdi-lock"
              density = "comfortable"
              label="New Password"
              :type="showPassword ? 'text' : 'password'"
              :rules="[passowrdRules.password, passowrdRules.required]"
               :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              required
              rounded
              variant ="outlined"
              @click:append-inner="togglePasswordVisibility"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text class=" mb-0 pa-2">
          <v-form v-model="valid" ref="form">
            <v-text-field 
              v-model="confirmPassword"
              prepend-inner-icon="mdi-lock"
              density = "comfortable"
              label="Confirm Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="[passowrdRules.confirmPassword, passowrdRules.required]"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              rounded
              required
              @click:append-inner="toggleConfirmPasswordVisibility"
              variant ="outlined"
            ></v-text-field>
          </v-form>
        </v-card-text>
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="resetPassword"
                  rounded
                >
                 Reset
               </v-btn>
              </v-col>          
           </v-row>
      </v-card>
    </v-container>
  </template>
  <script>
  import apiClient from '@/services/axios'
  export default {
    data() {
      return {
        email: '',
        password:'',
        code: '',
        newPassword:'',
        confirmPassword:'',
        showPassword: false,
        showConfirmPassword: false,
        valid: false,
        step:1,
        rules: {
          required: (value) => !!value || 'Email is Required.',
          email: (value) => /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?unical\.it$/.test(value) || "Invalid Organizational Email ",
        },
        codeRules: {
           code: (v) => v.length == 6 && /^[0-9]+$/.test(v) || "Code must be  6 numbers",
      },
      passowrdRules:{
        required: (v) => !!v || 'password is Required.',
        password: (v) => v.length >= 6 && v != '' || "Password must be at least 6 characters",
        confirmPassword: (v) => v.length >= 6 && v != '' && v === this.newPassword || "Passwords must match",
      }
    };
  },
    methods: {
      async sendCode() {
           try{
            const response = await apiClient.put("/user/checkemail/"+this.email
          //   ,{
          //     params: {email: this.email},
          // }
        );
            console.log("Email then-:",response);
            this.step = 2;
          } catch (error) {
            console.error(error);
            alert("Failed to send reset code. Please try again.");
      }
    },
      async verifyCode(){
        try{
          console.log("Sending request with:", {
          email: this.email,
          verificationCode: this.code,
       });
          const response = await apiClient.put("/user/send-reset-code", {
            verificationCode: this.code,
            email: this.email,
           });
           console.log("Verified Code: ", response);
           this.step = 3;
        } catch (error) {
          console.error(error);
          alert("Invalid code. Please try again.");
      }        
      },
      async resetPassword(){
        try{
          const response = await apiClient.put("user/forgot-password",{
            email: this.email,
            password: this.password
          });
          console.log("Reset success: ", response);
          
            alert("Password reset successfully!");
            this.$router.push("/sign-in"); 
        } catch (error) {
          console.error(error);
          alert("Failed to reset  password. Please try again.");
      }  
    },    
      cancel(){
       this.$router.push("/sign-in");
      } ,
      togglePasswordVisibility(){
        this.showPassword =!this.showPassword;
      },
      toggleConfirmPasswordVisibility(){
        this.showConfirmPassword =!this.showConfirmPassword
      },
    },
  };
  </script>
  
  <style scoped>
  .forgot-password-card{
  backdrop-filter: blur(6px);
  background-color: rgba(243, 230, 230, 0.7); /* Increased transparency */
  padding: 24px;
  border-radius: 12px;
}
.forgot-password-background {
  background-image: url('/background.webp');
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  width: 100%;
  padding: 0%;
}

  </style>
  