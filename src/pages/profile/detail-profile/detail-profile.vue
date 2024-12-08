<template>
  <v-card rounded="xl" variant="outlined" color="red-darken-4" class="ma-4">
    <v-sheet rounded="lg">
      <v-tabs
        v-model="tab"
        :items="tabs"
        align-tabs="left"
        height="60"
        slider-color="red-darken-4"
      >
        <template v-slot:tab="{ item }">
          <v-tab
            :prepend-icon="item.icon"
            :text="item.text"
            :value="item.value"
            class="text-none"
          ></v-tab>
        </template>

        <template v-slot:item="{ item }">
          <v-tabs-window-item :value="item.value" class="pa-4">
            <component :is="item.content" :detail="extractDetails"></component>
            
          </v-tabs-window-item>
        </template>
      </v-tabs>
    </v-sheet>
  </v-card>
</template>

<script>
import PersonalInfo from "./personal-info.vue";
import OfficeInfo from "./office-info.vue";
import SocialMedia from "./social-media.vue";
import WorkingHours from "./working-hours.vue";

export default {
  props:{
    details:{
      type: Object,
      default: () => {}
    }

  },
  computed:{
    extractDetails(){
      return {
        personalInfo:{
          fullName: this.details.fullName,
          email: this.details.email,
          phoneNumber: this.details.phoneNumber,
          userStatus:this.details.userStatus,
          department: this.details.department,
          userType: this.details.userType
        },
        officeInfo:{
          address: this.details.address
        },
        workingHours:[
          { day: "Monday", hours: ["8:30 - 12:30 | 2:30 - 5:30"], color: "blue lighten-2" },
          { day: "Tuesday", hours: ["8:30 - 12:30 | 2:30 - 5:30"], color: "blue lighten-1" },
          { day: "Wednesday", hours: ["8:30 - 12:30 | 2:30 - 5:30"], color: "blue" },
          { day: "Thursday", hours: ["8:30 - 12:30 | 2:30 - 5:30"], color: "indigo lighten-1" },
          { day: "Friday", hours: ["8:30 - 12:30 | 2:30 - 5:30"], color: "green darken-1" },
          { day: "Saturday", hours: ["8:30 - 12:30"], color: "orange lighten-2" },
          { day: "Sunday", hours: [""], color: "red lighten-2" },
        ],
        // socialMedias:{
        //   twitter:this.details.twitter,
        //   websiteLink: this.details.websiteLink,
        //   linkedin: this.details.linkedin
        // },
        socialMedias:[
        // {icon:"mdi-facebook", url:"https://www.facebook.com/unicalufficiale/",},
        {icon:"mdi-alpha-x-box", url:this.details.twitter},
        {icon:"mdi-linkedin", url:this.details.linkedin},
        {icon:"mdi-web", url:this.details.websiteLink},
        // {icon:"mdi-youtube", url:"https://www.youtube.com/@campusunical"},
        // {icon:"mdi-github", url:"https://github.com/UniversitaDellaCalabria"},

      ]

      }
    }

  },
  data: () => ({
    tab: "personalInfo",
    tabs: [
      {
        icon: "mdi-book-open-page-variant",
        text: "Personal Information",
        value: "personalInfo",
        content: PersonalInfo,
      },
      {
        icon: "mdi-map-marker",
        text: "Office",
        value: "officeInfo",
        content: OfficeInfo,
      },
      {
        icon: "mdi-earth",
        text: "Social Medias",
        value: "socialMedias",
        content: SocialMedia,
      },
      {
        icon: "mdi-alarm",
        text: "Working Hours",
        value: "workingHours",
        content: WorkingHours,
      },
    ],
  }),
};
</script>
