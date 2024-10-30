// stores/snackbarStore.js
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbarStore', {
  state: () => ({
    message: '',
    visible: false,
    color: 'error',
    timeout: 2000,
  }),

  actions: {
    showSnackbar({ message, color = 'error', timeout = 2000 }) {
      this.message = message
      this.color = color
      this.timeout = timeout
      this.visible = true
    },
    closeSnackbar() {
      this.visible = false
    }
  },
})
