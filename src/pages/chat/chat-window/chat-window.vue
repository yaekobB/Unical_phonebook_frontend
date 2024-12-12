<template>
  <!-- <v-container class="chat-container" fluid> -->
    <v-row>
      <v-col>
        <!-- Chat Header -->
        <v-card class="chat-card" variant="outlined">
          <v-card-title class="chat-header">
            <v-avatar left>
              <v-icon large>mdi-chat</v-icon>
            </v-avatar>
            <span class="chat-title">{{chatWindowStore.recipientName}}</span>
          </v-card-title>
          
          <!-- Chat Messages Display -->
          <v-card-text class="chat-messages" v-scroll-y>
            <div
              v-for="(message, index) in chatWindowStore.messages"
              :key="index"
              :class="{'my-message': message.sender}"
            >
              <v-card
                class="message-card"
                :class="{'my-message-card': message.sender}"
                outlined
                rounded="xl"
              >
                <v-card-text>{{ message.content }}</v-card-text> 
              </v-card>
            </div>
          </v-card-text>

          <!-- Message Input -->
          <v-card-actions class="chat-input">
            <v-text-field
              v-model="newMessage"
              placeholder="Type your message..."
              clearable
            
              variant="outlined"
              density="comfortable"
              append-inner-icon="mdi-send"
              rounded
              @keyup.enter="sendMessage"
               @click:append-inner="sendMessage"
            ></v-text-field>
            <!-- <v-btn color="#8a3c36" elevation="10" rounded size="x-large">
              <v-icon>mdi-send</v-icon>
               send
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script>
import { useChatWindowStore } from '@/pages/chat/chat-window/store'
// import stompService from '@/services/socket/client/client-socket'


export default {
  data() {
    return {
      newMessage: '',
      isMe: true,
      chatWindowStore: useChatWindowStore(),
      messages: [], // Store received messages
      socket: null,
      stompClient: null,
      connected: false,
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        console.log("Sending message");
        const message = { 
          content: this.newMessage, 
          senderId: this.chatWindowStore.senderId, 
          recipientId: this.chatWindowStore.recipientId,
          chatRoomId: this.chatWindowStore.chatRoomId
        };
        console.log(message);
        this.chatWindowStore.sendMessage(message)
        // stompService.sendMessage('/app/chat', { ...message });
        this.newMessage = '';
      }
    },
    // handleIncomingMessage(msg) {
    //   this.messages.push(msg.content); // Handle received message
    //   console.log("Received message: ", msg);
    // },
   
  },
  created() {
    // Connect to WebSocket and listen for messages
    this.chatWindowStore.connect();
  },
  beforeUnmount() {
    // Disconnect when component is destroyed (for Vue 3)
    // stompService.disconnect();
  },
};
</script>

<style scoped>
.chat-container {
  /* background-color: #f5f5f5; */
  /* min-height: 100vh; */
  /* padding-top: 30px; */
}
.chat-card {
  height: 85vh;
  display: flex;
  flex-direction: column;
}
.chat-header {
  background-color: #b41307;
  color: white;
  display: flex;
  align-items: center;
}
.chat-title {
  margin-left: 10px;
  font-weight: bold;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #e9e9e9;
}
.message-card {
  display: inline-block;
  max-width: 50%;
  margin: 5px 0;
  padding: 8px 12px;
  word-wrap: break-word;
}
.my-message-card {
  margin-left: auto;
  background-color: #a5190f;
  color: white;
}
.my-message {
  text-align: right;
}
.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
