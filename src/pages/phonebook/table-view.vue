<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="tableColumns"
    :items="getContacts"
    item-value="email"
    show-expand
    hide-default-footer
  >
    
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <detail-profile :details="item"/>
        </td>
        
      </tr>
     
 

    </template>
  </v-data-table>
</template>
<script>
import detailProfile from '@/pages/profile/detail-profile/detail-profile.vue';
  export default {
  components: { detailProfile },
     props: {
      contacts: {
        type: Array,
        default: () => []
      }
    },
    computed:{
      getContacts(){
        // const contacts = this.contacts.map(contact => contact.raw)
        
        const mappedContacts = this.contacts.map(contact =>{
          const { firstName,middleName, lastName, ...rest } = contact; // Destructure to exclude firstName and lastName
      return {
        ...rest, // Spread remaining keys
        fullName: `${firstName} ${middleName} ${lastName}` // Add fullName
      };

        
        })
        console.log(mappedContacts)
       return mappedContacts
      }
    },
    data () {
      return {
        expanded: [],
         tableColumns: [
         { title: 'Full Name', key: 'fullName' },
          { title: 'Email', key: 'email' },
          { title: 'Phone Number', key: 'phoneNumber' },
          { title: 'Department', key: 'department' },
          { title: 'Role', key: 'userType' },
          { title: '', key: 'data-table-expand' },
        ],
    
      }
    },
  }
</script>