<template>
  <!-- <v-container class="chat-list-container" fluid> -->
    <v-row>
      <v-col>
        <!-- Chat List Header -->

        <v-card class="chat-list-card" variant="outlined">
          <v-card-title class="chat-list-header">
            <span class="chat-list-title">Chats</span>
          </v-card-title>
          
          <!-- Chat List Items -->
          
          <v-list dense>
        <v-autocomplete 
          :items="chatListStore.users" 
          item-title="fullName" 
          label="Search User"
          rounded
          variant="outlined"
          class="mt-4 ml-4 mr-4"
          :search-input="search"
         hide-no-data
        >
          <template v-slot:item="{ props, item }">
            
            <v-list-item v-bind="props" @click="openChat(item.raw)">
              <v-list-item-title>{{ item.firstName }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.raw.department }}</v-list-item-subtitle>
            </v-list-item>
          </template>
        </v-autocomplete>

             <v-virtual-scroll
                :items="chatListStore.chats"
                height="600"
                item-height="100"
              >
                <template v-slot:default="{ item }">
                 
                  <v-list-item
                   
                    @click="openChat(item)"
                    :class="['rounded-list-item', { 'unread-message': !item.isRead }]"
                    class="rounded-lg ma-2 pa-2"
                  >
                  
                    <v-list-item-avatar>
                      <!-- <v-avatar color="grey lighten-2">
                        <img :src="item.avatar" alt="User Avatar" />
                      </v-avatar> -->
                      <v-avatar  class="text-h6 font-weight-bold mr-2" color="red-darken-4">
                              {{item.avatar}}
                      </v-avatar>

                      <strong class="ml-4"> {{item.fullName}}</strong>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <!-- <v-list-item-title>{{ chat.name }}</v-list-item-title> -->
                      <v-list-item-subtitle class="last-message ma-2">
                        {{ item.lastMessage }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-spacer></v-spacer>
                      <v-list-item-subtitle class="timestamp mr-2">{{ item.timestamp }}</v-list-item-subtitle>
                      <v-icon v-if="!item.isRead" color="black-lighten-4">mdi-circle</v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </template>
             </v-virtual-scroll>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script>
import {useChatListStore} from '@/pages/chat/chat-list/store'
import {useChatWindowStore} from '@/pages/chat/chat-window/store'
import { useUserStore } from '@/pages/user-account/store';

export default {
  data() {
    return {
      chatListStore: useChatListStore(),
      chatWindowStore: useChatWindowStore(),
      userStore: useUserStore(),
      search:"",
      user:''

     
    };
  },
  computed:{
    getContactList(){
      if(!this.search){
        return this.chatListStore.users
      }else{
        return []
      }
    }
      // getContactList(){
      //   const mappedContacts = this.chatListStore.users.map(contact =>{
      //     const { firstName,middleName, lastName, ...rest } = contact; // Destructure to exclude firstName and lastName
      // return {
      //   ...rest, // Spread remaining keys
      //   fullName: `${firstName} ${middleName} ${lastName}` // Add fullName
      // };

        
      //   })
      //   console.log(mappedContacts)
      //  return mappedContacts
      // }
      
  },
  methods: {
    openChat(chat) {
      // Logic to open chat with selected user
      console.log('Opening chat with');
      console.log(chat)
      // console.log(chat.raw.userId)
      this.chatWindowStore.setChatMessage(chat)

    },
  },
 async created(){
    await this.chatListStore.getUsers()
    
   await this.chatListStore.getChatList()
    
    // this.users = await this.chatListStore.users;
    // console.log(this.users)
    
  }
};
</script>

<style scoped>
.chat-list-container {
  /* background-color: #f5f5f5; */
  min-height: 90vh;
  /* padding-top: 30px; */
}
.chat-list-card {
  height: 85vh;
  /* display: flex; */
  flex-direction: column;
  /* overflow-y: auto; */
}
.chat-list-header {
  background-color: #b41308;
  color: white;
  text-align: center;
  padding: 15px;
}
.chat-list-title {
  font-size: 20px;
  font-weight: bold;
}
.unread-message {
  background-color: #e3f2fd;
}
.last-message {
  color: gray;
  font-size: 0.9rem;
}
.timestamp {
  color: gray;
  font-size: 0.8rem;
}
</style>
