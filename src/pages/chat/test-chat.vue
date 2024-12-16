<script setup>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1>Web Socket Testing</h1>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  data() {
    return {
      email: "",
      password: "",
      messages: [],
      socket: null,
      stompClient: null,
      connected: false,
    };
  },
  methods: {
    connect() {
      this.socket = new SockJS("http://localhost:8084/gs-guide-websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        (frame) => {
          console.log("Connected:", frame);
          this.connected = true;
          this.stompClient.subscribe("/topic/greetings", (message) => {
            alert(JSON.stringify(message))
            const messageBody = JSON.parse(message.body);
            this.messages.push(messageBody.content || message.body);
          });
        },
        (error) => {
          console.error("Connection Error:", error);
          this.connected = false;
        }
      );
    },
  },
  created() {
    alert("000000000000000000000000")
    this.connect();
  },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
