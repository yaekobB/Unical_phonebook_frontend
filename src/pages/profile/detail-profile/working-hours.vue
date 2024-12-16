<template>
  <v-timeline align="start" side="end">
    <v-timeline-item
      v-for="(timeline,index) in detail.workingHours"
      :key="index"
      :dot-color="timeline.color"
      size="small"
    >
      <div class="d-flex">
        <strong class="me-4">{{timeline.day}}</strong>
        <div>
         
          <div class="text-caption">
            {{timeline.hours[0]}}
          </div>
        </div>
      </div>
    </v-timeline-item>

   
    
  </v-timeline>
</template>
<script>
export default {
    props:{
        detail:{
            type: Object,
        }
    },
    data(){
        return{

        }
    }
}
</script>