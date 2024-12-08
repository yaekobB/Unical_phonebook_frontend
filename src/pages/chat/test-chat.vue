
<template>
 <div></div>
</template>

<script>
import router from "@/router";
// import { Validator } from "vee-validate";

import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const dict = {
  custom: {
    password: {
      required: "Please enter password",
      alpha: "Please enter password"
    },
    email: {
      required: "Please enter email",
      alpha: "Please enter email"
    }
  }
};
// Validator.localize("en", dict);
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmedEmail: "",
      verificationtoken: "",
      popupActive: false,
      logedin: false,
      messages: [],
      newMessage: '',
      isToEdit: false,
      orderPaymentVerificationId: "",
      received_messages: [],
      allNotifications: [],
      companyDetails: {
        companyId: "",
        accountId: "",
        companyName: "",
        licenceNumber: "",
        companyStatus: "",
        fileName: "",
        registrationDate: "",
      },
      userDetails: {
        firstName: "",
        lastName: "",
        gfatherName: "",
        email: "",
        mobilePhone: "",
        userType: "",
        companyId: ""
      },
      popUpActive: false,
      oldPassword: "",
      newPassword: "",
      confirmationPassword: "",
      changeProfile: false,
      isFileSelected: false,
      selectedFile: undefined,
      order: {},
      inventories: [],
      previewUploadedDocument: '',
      previewDocumentData: "",
      transactionIds: [
        {
          transactionID: "",
        }
      ],
      transactionID: [],
      files: [],
      tempUrls: '',
    };
  },
  methods: {

    connect() {
      this.socket = new SockJS("http://localhost:8084/gs-guide-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          console.log(frame)
          this.connected = true;
          this.stompClient.subscribe("/topic/greetings", tick => {
            console.log(tick)
            
            alert("mmmmmmmmmmmmmmmmm")
          });
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },



    resend() {
      this.$http.post("/verify/resend/" + this.email).then(function (response) {
        this.$vs.notify({
          title: this.$t("Resend"),
          text: this.$t("Verification token sent agian"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success"
        });
      });
    },
    updateLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale", locale);
    },
    // verifyAccount: function() {
    //   this.$http
    //     .get("/verify/account/"+this.verificationtoken)
    //     .then(function(response) {
    //       router.push('/pages/view-company');
    //       this.$store.state.confirm.email="";
    //       this.$vs.notify({
    //        title: "Verify",
    //       text: "Verified Successfully!",
    //       iconPack: "feather",
    //       icon: "icon-alert-circle",
    //       color: "success"
    //   });
    //     });
    //   this.popupActive = false;
    // },
    login() {
      // Loading
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading();
          const payload = {
            userDetails: {
              email: this.email,
              password: this.password
            },
            notify: this.$vs.notify,
            closeAnimation: this.$vs.loading.close
          };
          this.$store.dispatch("auth/loginAttempt", payload);
        }
      });
    },
    registerUser() {
      this.$router.push("/pages/register");
    }
  },
  computed: {
    isNew() {
      this.confirmedEmail = this.$store.state.confirm.email;
      if (this.$store.state.confirm.email != "") {
        this.confirmedEmail = this.$store.state.confirm.email;
        this.email = this.confirmedEmail;
        return true;
      } else return false;
    },
    validateForm() {
      return !this.errors.any() && this.email != "" && this.password != "";
    },
    getCurrentLocaleData() {
      if (localStorage.getItem("locale") == null) {
        const locale = this.$i18n.locale;
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      } else {
        const locale = localStorage.getItem("locale");
        if (locale == "en") return { flag: "us", lang: "English" };
        else if (locale == "am") return { flag: "am", lang: "Amharic" };
      }
    }
  },
  created() {
    this.connect();
    if (this.$router.query && this.$router.query.email != "") this.email = this.$router.query.email;
    if (
      localStorage.getItem("userId") != null &&
      localStorage.getItem("accessToken") != null
    ) {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
      // if (localStorage.getItem("userId") == "Admin" || localStorage.getItem("userId") == "Customer")
      router.push("/pages/eCommerce/shop");
    }
  }
};
</script>

<style lang="scss">
#page-login {
  .social-login {
    .bg-facebook {
      background-color: #1551b1;
    }

    .bg-twitter {
      background-color: #00aaff;
    }

    .bg-google {
      background-color: #4285f4;
    }

    .bg-github {
      background-color: #333;
    }
  }
}

#email {
  color: blue;
}

.login-navbar {
  height: 120px;
  margin-top: 15px;
  background: rgb(179, 74, 179);
}

// .login-form{
//   margin-left: 950px;
// }
.login-page {
  height: 3000px;
  background: #1d5288;
}
</style>
