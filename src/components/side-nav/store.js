// stores/snackbarStore.js
import { defineStore } from 'pinia'

export const useSideNavStore = defineStore('snackbar', {
  state: () => ({
   drawer: true,
   rail:true,
   navigations: []
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
    }
    
  },
})
