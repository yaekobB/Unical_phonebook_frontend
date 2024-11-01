<template>
  <v-app>
    <v-container fluid fill-height class="d-flex align-center justify-center sign-in-background pa-2">
      <v-card class="elevation-12 sign-in-card" max-width="500" rounded>
        <v-card-title class="mb-3"
        >
          <v-icon color="primary" class="mr-2" large>
            <v-img
            cover
            src="https://cdn.jsdelivr.net/gh/UniversitaDellaCalabria/unicms-template-unical@1.7.1/src/unicms_template_unical/static/images/addressbook.svg"></v-img>
          </v-icon>
          Unical Phonebook Sign-In
        </v-card-title>

        <v-card-text class="pa-2">
          <v-form ref="form" v-model="isValid">
            <v-text-field
              label="Email"
              prepend-inner-icon="mdi-email"
              v-model="email"
              type="email"
              density="comfortable"
              :rules = "emailRules"
              required
              rounded
              variant="outlined"
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="password"
              :rules = "passwordRules"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
             :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePasswordVisibility"
              variant="outlined"
              density="comfortable"
              required
              rounded
            ></v-text-field>
            
             <v-row>
              
              <v-col class="d-flex justify-end">
                <v-btn color="primary" @click="signIn"  :disabled="!isValid" rounded>
                  Sign In
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
         <Snackbar/>
      </v-card>
    </v-container>
   
  </v-app>
</template>

<script>
import { useSignInStore } from './store';
import Snackbar from '../../components/snackbar/Snackbar.vue'
export default {
  name: "SignIn",
  components:{
    Snackbar
  },
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "Email is required",
        v => /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)?unical\.it$/.test(v) || "Invalid Organizational Email "
      ],
      password: "",
      showPassword: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be at least 6 characters",
      ],
      isValid : false,
    };
  },
  methods: {
    async signIn() {
     const signInStore = useSignInStore();
     let credentials ={
      email: this.email,
      password: this.password
     }
     signInStore.signIn({...credentials})     
    },
     togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
   
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.sign-in-background {
  background-image: url('/background.webp');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.sign-in-card {
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.7); /* Increased transparency */
  padding: 24px;
  border-radius: 12px;
}

.sign-in-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: #333;
}

.v-card-title, .v-text-field label, .v-btn {
  font-family: 'Poppins', sans-serif;
}
</style>
