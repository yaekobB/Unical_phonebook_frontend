<template>
         <div>
          <v-btn v-for="media in detail.socialMedias" :key="media"  icon  :href="media.url" target="_blank" color="error" class="ma-4 pl-2">
              <v-icon class="pa-4" >{{media.icon}}</v-icon>
            </v-btn>
         </div>
           
        
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-btn {
  display: d-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
}

.v-icon {
  margin-right: 8px;
}
</style>
