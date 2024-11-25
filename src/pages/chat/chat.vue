<template>
    <v-container fluid>
        <v-row>
            <v-col cols="4">
             <ChatList/>
            </v-col>
            <v-col cols="8">
             <ChatWindow/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ChatList from '@/pages/chat/chat-list.vue'
import ChatWindow from '@/pages/chat/chat-window.vue'
export default {
    name:'chat',
    components:{
      ChatList,
      ChatWindow
    },

}
</script>