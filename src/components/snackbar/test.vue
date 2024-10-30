// <template>
//   <div>
//     <h2>Snackbar Demo</h2>
//     <v-btn color="primary" @click="triggerSnackbar">
//       Show Snackbar
//     </v-btn>

//     <!-- Include the reusable Snackbar component -->
//     <Snackbar />
    
//   </div>
// </template>

// <script>
// import { useSnackbarStore } from './store'
// import Snackbar from './Snackbar' // Adjust path as necessary

// export default {
//   components: {
//     Snackbar
//   },
//   setup() {
//     const snackbarStore = useSnackbarStore()

//     const triggerSnackbar = () => {
//       snackbarStore.showSnackbar({
//         message: 'Hello, this is a reusable snackbar!',
//         color: 'success',
//         timeout: 3000
//       })
//     }

//     return { triggerSnackbar }
//   }
// }
// </script>
