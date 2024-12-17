// stores/snackbarStore.js
import { defineStore } from 'pinia'

export const useSideNavStore = defineStore('sideNavStore', {
  state: () => ({
   drawer: true,
   rail:true,
   navigations: [],
   navItems:[
    {title:"Profile", value:"profile",prependIcon:"mdi-account-circle",url:"profile",role:['Admin','Student','Administrative','Faculty']},
    {title:"Users", value:"user",prependIcon:"mdi-account",url:"users", role:['Admin']},
    {title:"Departments", value:"department",prependIcon:"mdi-domain",url:"departments",role:['Admin']},
    {title:"Roles", value:"role",prependIcon:"mdi-badge-account-horizontal",url:"roles",role:['Admin']},
    {title:"Chat", value:"chat",prependIcon:"mdi-chat",url:"chat",role:['Admin','Student','Administrative','Faculty']},

],
  
  }),

  actions: {
    toggleNav() {
     this.drawer = !this.drawer
    },
    toggleRail() {
        this.rail = !this.rail
    },
    setNavigations(navs){
        console.log("Set Navigations called")
        console.log(navs)
        this.navigations = navs
    },
    setNavItemsRole(role){
      
     this.navItems.forEach(nav => {
      if(nav.value == "chat"|| nav.value =="profile"){
        nav.role = role
      }
      else{
        const adminRole = role.filter(r => r == 'Admin')
        nav.role = adminRole
      }
      // console.log(this.navItems)
     })
    }
    
  },
})
