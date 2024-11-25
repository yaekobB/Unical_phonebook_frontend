<template>
  <v-container class="chat-list-container" fluid>
    <v-row>
      <v-col>
        <!-- Chat List Header -->
        <v-card class="chat-list-card" rounded="xl">
          <v-card-title class="chat-list-header">
            <span class="chat-list-title">Chats</span>
          </v-card-title>
          
          <!-- Chat List Items -->
          <v-list dense>
            <v-list-item
              v-for="(chat, index) in chats"
              :key="index"
              @click="openChat(chat)"
              :class="['rounded-list-item', { 'unread-message': !chat.isRead }]"
              class="rounded-lg ma-2 pa-2"
            >
              <v-list-item-avatar>
                <v-avatar color="grey lighten-2">
                  <img :src="chat.avatar" alt="User Avatar" />
                </v-avatar>
                <strong class="ml-4"> {{chat.name}}</strong>
              </v-list-item-avatar>

              <v-list-item-content>
                <!-- <v-list-item-title>{{ chat.name }}</v-list-item-title> -->
                <v-list-item-subtitle class="last-message ma-2">
                  {{ chat.lastMessage }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-spacer></v-spacer>
                <v-list-item-subtitle class="timestamp mr-2">{{ chat.timestamp }}</v-list-item-subtitle>
                <v-icon v-if="!chat.isRead" color="black-lighten-4">mdi-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      chats: [
        {
          name: 'Robel GH',
          lastMessage: 'Salve! come stai?',
          timestamp: '10:30 AM',
          isRead: false,
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        },
        {
          name: 'Brhane Tama',
          lastMessage: 'Let’s catch up tomorrow.',
          timestamp: 'Yesterday',
          isRead: true,
          avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        },
        {
          name: 'Yaekob Bey',
          lastMessage: 'Sent you the files.',
          timestamp: 'Mon',
          isRead: true,
          avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
         {
          name: 'Robel GH',
          lastMessage: 'Salve! come stai?',
          timestamp: '10:30 AM',
          isRead: false,
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        },
        {
          name: 'Brhane Tama',
          lastMessage: 'Let’s catch up tomorrow.',
          timestamp: 'Yesterday',
          isRead: true,
          avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        },
        {
          name: 'Yaekob Bey',
          lastMessage: 'Sent you the files.',
          timestamp: 'Mon',
          isRead: true,
          avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
         {
          name: 'Robel GH',
          lastMessage: 'Salve! come stai?',
          timestamp: '10:30 AM',
          isRead: false,
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
        },
        {
          name: 'Brhane Tama',
          lastMessage: 'Let’s catch up tomorrow.',
          timestamp: 'Yesterday',
          isRead: true,
          avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
        },
        {
          name: 'Yaekob Bey',
          lastMessage: 'Sent you the files.',
          timestamp: 'Mon',
          isRead: true,
          avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
      ],
    };
  },
  methods: {
    openChat(chat) {
      // Logic to open chat with selected user
      console.log('Opening chat with', chat.name);
    },
  },
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
  display: flex;
  flex-direction: column;
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
