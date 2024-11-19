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

      <!-- <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbarStore.closeSnackbar">
          Close
        </v-btn>
      </template> -->
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { useSnackbarStore } from './store'

export default {
  setup() {
    const snackbarStore = useSnackbarStore()
    return { snackbarStore }
  }
}
</script>
