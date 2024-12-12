<template>
  <v-sheet class="d-flex flex-column">
    <v-snackbar
      v-model="snackbarStore.visible"
      :timeout="snackbarStore.timeout"
      :color="snackbarStore.color"
      elevation="24"
      location="top"
      rounded="pill"
    >
      {{ snackbarStore.message }}

     
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { useSnackbarStore } from './store'

export default {
  data() {
    
    return { snackbarStore: useSnackbarStore() }
  }
}
</script>
<style scoped>

</style>
