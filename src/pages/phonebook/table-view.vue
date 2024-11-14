<template>
  <div class="mt-10">
    <v-table
    height="300px"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-left">
          Full Name
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Phone Number
        </th>
        <th class="text-left">
          Department
        </th>
        <th class="text-left">
          Role
        </th>
        <th class="text-left">
          Office
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in contacts"
        :key="item.id"
      >
        <!-- <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td> -->
      </tr>
    </tbody>
  </v-table>
  </div>
</template>
<script>
  export default {
    props: {
  contacts: {
    type: Array,
    default: () => []
  }
},
    data () {
      return {
       
      }
    },
  }
</script>