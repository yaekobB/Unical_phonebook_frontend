// stores/snackbarStore.js
import { defineStore } from 'pinia'
import apiClient from '@/services/axios'
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { useUserStore } from '@/pages/user-account/store';
export const useChatWindowStore = defineStore('chatWindowStore', {
  state: () => ({
    messages: [
       
      ],
    messageBody:'',
    recipientName:'',
    recipientId:'',
    senderId:'',
    chatRoomId:'',
    userStore: useUserStore()
  }),

  actions: {
    connect() {
      this.socket = new SockJS("http://localhost:8084/gs-guide-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        (frame) => {
          console.log("Connected:", frame);
          this.connected = true;
          this.stompClient.subscribe("/topic/greetings", (message) => {
            // alert(JSON.stringify(message))
            // console.log(this.messages)
            // const chat = {
            //   userId: this.recipientId
            // }
            // this.setChatMessage()
           
            // alert(message)
            // const msg ={}
            const chat = JSON.parse(message.body);
            // if(this.recipientId == chat.recipientId){
             const msg = {
                ...chat,
                sender: chat.senderId == this.senderId? true: false,
                
  
  
              }
            // }
         
            // const messageParsed = JSON.parse(message.body);
            console.log(msg)
            this.messages.push(msg);
          });
        },
        (error) => {
          console.error("Connection Error:", error);
          this.connected = false;
        }
      );
    },
   
    async setChatMessage(message){
        console.log("Set ChatWindow called")
        console.log(message)
       if(message.createdBy){
        this.recipientName = message.createdBy
        this.recipientId = message.createrId
       }else{
        this.recipientName = message.fullName,
        this.recipientId = message.userId
       }
       
        this.senderId = this.userStore.user.userId
       
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
          //  this.messages = response.data

        }      
               
      }catch (error) {
        console.log('Error fetching data:', error);
        // console.log(error)
       
      }

    }
    
  },
})
