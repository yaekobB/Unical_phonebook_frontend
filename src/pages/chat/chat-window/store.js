// stores/snackbarStore.js
import { defineStore } from 'pinia'
import apiClient from '@/services/axios'

export const useChatWindowStore = defineStore('chatWindowStore', {
  state: () => ({
    messages: [
       
      ],
    messageBody:'',
    recipientName:'',
    recipientId:'',
    senderId:'',
    chatRoomId:'',
  }),

  actions: {
   
    async setChatMessage(message){
        console.log("Set ChatWindow called")
        let userId = JSON.parse(localStorage.userInformation).userId
        this.recipientName = message.fullName
        this.recipientId = message.userId
        this.senderId = userId
       
        console.log(this.recipientName)
        console.log(this.recipientId)
        console.log(this.senderId)
        try {
          console.log("get chat")
               
          const response = await apiClient.get(`/message?recipientId=${this.recipientId}&senderId=${this.senderId}`);
          this.chatRoomId = response.data[0].chatRoomId
          console.log(response.data)
          if(!response.data.error){
             this.messages = response.data
  
          }else{
            this.messages = []
          }      
                 
        }catch (error) {
          this.messages = []
          console.log('Error fetching data:', error);
          // console.log(error)
         
        }
       
    },
    async sendMessage(message){
      // this.messages.push(message)
      try {
        console.log("get chat")

        // let userId = JSON.parse(localStorage.userInformation).userId

              
        const response = await apiClient.post(`/chats/send`,{...message});
        console.log(response.data)
        if(!response.data.error){
           this.messages = response.data

        }      
               
      }catch (error) {
        console.log('Error fetching data:', error);
        // console.log(error)
       
      }

    }
    
  },
})
