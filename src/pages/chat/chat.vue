<template>
    <v-container fluid>
        <v-row no-gutters>
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
import ChatList from '@/pages/chat/chat-list/chat-list.vue'
import ChatWindow from '@/pages/chat/chat-window/chat-window.vue'
export default {
    name:'chat',
    components:{
      ChatList,
      ChatWindow
    },

}
</script>
<style scoped>
.no-gap {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>