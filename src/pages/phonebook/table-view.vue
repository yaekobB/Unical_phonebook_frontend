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
         <v-sheet   rounded="lg">
            <v-tabs
              v-model="tab"
              :items="tabs"
              align-tabs="left"
              height="60"
              slider-color="red-darken-4"
            >
              <template v-slot:tab="{ item }">
                <v-tab
                  :prepend-icon="item.icon"
                  :text="item.text"
                  :value="item.value"
                  class="text-none"
                ></v-tab>
              </template>

              <template v-slot:item="{ item }">
                <v-tabs-window-item :value="item.value" class="pa-4">
                 Information to be filled
                </v-tabs-window-item>
              </template>
            </v-tabs>
         </v-sheet>
        </td>
        
      </tr>
     
 

    </template>
  </v-data-table>
</template>
<script>
  export default {
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
      tab: 'tab-1',
      tabs: [
        {
          icon: 'mdi-book-open-page-variant',
          text: 'Personal Information',
          value: 'tab-1',
        },
        {
          icon: 'mdi-map-marker',
          text: 'Office',
          value: 'tab-2',
        },
        {
          icon: 'mdi-earth',
          text: 'Social Medias',
          value: 'tab-3',
        },
        {
          icon: 'mdi-alarm',
          text: 'Working Hours',
          value: 'tab-4',
        },
      ],
      }
    },
  }
</script>