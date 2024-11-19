<template>
 <v-app>
    <v-container fluid fill-height class="d-flex align-center justify-center sign-up-background pa-2">
      
        <v-stepper
            v-model="step"
            :items="steps"
            show-actions
            class="sign-up-card elevation-12 "
        >
            <template v-slot:item.1>
                
               <v-card class="" max-width="800" rounded>
                <v-card-title class="mb-3"
                >
                 <router-link :to="{name: 'phonebook'}">
                    <v-icon color="primary" class="mr-2" large>
                        <v-img
                        cover
                        src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
                    </v-icon>
                 </router-link>
                Unical Phonebook  Registartion
                </v-card-title>

                <v-card-text class="pa-2">
                <v-form ref="form" v-model="isValidAdd">
                <v-container>
                    <v-row >
                    <v-col v-for="field in signUpStore.formFields" :key="field.key" :cols="field.cols" :md="field.md" class="pa-1">
                        <v-text-field
                        v-if="field.fieldName == 'input'"
                        v-model="signUpStore.editedItem[field.key]"
                        :label="field.label"
                        :prepend-inner-icon="field.prependIcon"
                        :type="field.type"
                        :rules="field.rules"
                        variant="outlined"
                        density="compact"              
                        ></v-text-field>
                        <v-text-field
                        v-if="field.fieldName == 'password'"
                        v-model="signUpStore.editedItem[field.key]"
                        :label="field.label"
                        :prepend-inner-icon="field.prependIcon"
                        :append-inner-icon="field.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="togglePasswordVisibility(field.key)"
                        :type="field.showPassword ? 'text' : 'password'"
                        :rules="getFieldRules(field.key, field.rules)"
                        variant="outlined"
                        density="compact"
                    
                        ></v-text-field>
                        <v-autocomplete
                        v-if="field.fieldName == 'autocomplete'"
                        v-model="signUpStore.editedItem[field.key]"
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
                <Snackbar/>
            </v-card>
            </template>

        <template v-slot:item.2>
        <v-form ref="form" v-model="isVerifyValid">
           <v-card
            class="mx-auto"
            elevation="1"
            max-width="500"
        >
            <v-card-title class="py-5 font-weight-black">
                Securely access your email verification code
                </v-card-title>
            <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">6 digits of your Email Verification</div>

            <v-text-field
                label="Enter value here"
                variant="outlined"
                single-line
                v-model="verificationCode"
                :rule="verifyRule"
            ></v-text-field>

            <v-btn
               
                :loading="loading"
                class="text-none mb-4"
                color="#8a3c36"
                size="x-large"
                variant="flat"
                block
                @click="verifyEmail"
            >
                Verify Email
            </v-btn>

            <v-btn
                class="text-none"
                color="grey-lighten-3"
                size="x-large"
                variant="flat"
                @click="resendCode"
                block
            >
                Resend Verification Code
            </v-btn>
            </v-card-text>
        </v-card>
        </v-form>
       
            
            </template>
         
        <template v-slot:actions>
          <v-row>
            <!-- Previous Button (on the left) -->
            <v-col
              class="d-flex justify-start"
              :cols="step === 1 ? 6 : 12"
            >
              <v-btn
                @click="prevStep"
                text
                class="mx-2"
                :color="step > 1 ? '#8a3c36' : 'grey'"
                :disabled="step === 1"
              >
                {{ step === 2 ? 'Back' : 'Previous' }}
              </v-btn>
            </v-col>

            <!-- Next/Finish Button (on the right) -->
            <v-col
              class="d-flex justify-end"
              :cols="step === 1 ? 6 : 12"
            >
              <v-btn
                @click="nextStep"
                :color="step === 1 ? '#8a3c36' : 'grey'"
                :loading="loading"
                class="mx-2"
                :disabled="step === 2 || !isValidAdd"
              >
                {{ step === 1 ? 'Register' : 'Next' }}
              </v-btn>
            </v-col>
          </v-row>
        </template>
            
        </v-stepper>

       <Snackbar/>
 
     
     
    </v-container>
  
  </v-app>
  
</template>
<script>
import { useUserStore } from '@/pages/user-account/store.js';
import {useSignUpStore} from '@/layouts/SignUp/store'

import Snackbar from '@/components/snackbar/Snackbar.vue';
  export default {
    data: () => ({
      isValidAdd:false,
      loading: false,
      isVerifyValid:false,
       userStore: useUserStore(),
       signUpStore: useSignUpStore(),
        step: 1,
        steps: [
        'Registartion',
        'Email Verification'
       
      ],
      verificationCode: null,
      verifyRule:[
                    v => !!v || 'Verification code is required',
                    v => /^\d{6}$/.test(v) || 'Verification code must be exactly 6 digits'
                  ]
    }),

    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      },
    },
    methods:{
      togglePasswordVisibility(key){
        this.signUpStore.togglePasswordVisibility(key)
      },
      getFieldRules  (field,rules){
      // Add password match rule if it's the confirmPassword field
     
      if (field === 'confirmPassword') {
        rules.push(
          v => v === this.signUpStore.editedItem.password || "Passwords do not match"
        );
      }
      // console.log(this.signUpStore.editedItem.password)

      return rules;
    },
    async nextStep() {
      if (this.step === 1) {
        // Handle the registration logic here (e.g., POST request)
        try {
          this.loading = true;
          this.signUpStore.saveItem()
          // const response = await this.registerUser(); // Replace with your POST request function
          this.step++;
          this.loading = false;
        } catch (error) {
          console.error(error);
          this.loading = false;
        }
      } else if (this.step === 2) {
        alert("Form submitted successfully!");
        // Final submission logic
      }
    },
    prevStep() {
      if (this.step > 1) {
        this.step--;
      }
    },
    verifyEmail(){
      this.signUpStore.verifyEmail(this.verificationCode)
    },
    resendCode(){
      this.signUpStore.resendCode()
    }

    },
    async created() {
    const signUpStore = useSignUpStore();
    const userStore = useUserStore();
  
    signUpStore.setFormFields(userStore.formFields);
    
    
    
  },
  }
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.sign-up-background {
  background-image: url('/background.webp');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.sign-up-card {
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.7); 
  padding: 24px;
  border-radius: 12px;
}

.sign-up-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: #333;
}

.v-card-title, .v-text-field label, .v-btn {
  font-family: 'Poppins', sans-serif;
}
</style>
