import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import { authHeader } from '@/services/authHeader';

class StompService {
  constructor() {
    // this.socket = null; // Holds the SockJS connection
    // this.stompClient = null; // Holds the Stomp client
    // this.connected = false; // Tracks connection status
    // this.reconnectInterval = 5; // Delay for reconnection in ms
  }
//   initializeStompClient() {
//     return new Promise((resolve, reject) => {
//         // Assuming some async logic here
//         this.stompClient = new Client();  // Initialize client

//         // Perform async setup or connection
//         resolve();
//     });
// }



  connect() {
    // Create a new SockJS connection
    this.stompClient = new Client();
    this.socket = new SockJS("http://localhost:8084/gs-guide-websocket");

    // initializeStompClient()
    // .then(() => {
    //     this.stompClient.debug = (msg) => console.log("[STOMP DEBUG]:", msg);
    // })
    // .catch((err) => {
    //     console.error("Error initializing STOMP client:", err);
    // });
    // Set WebSocket binaryType after connection is established
    this.socket.onopen = () => {
      console.log("SockJS connected");
      this.socket._transport.ws.binaryType = "arraybuffer";
    };
   
    // Create Stomp client over the SockJS connection
    this.stompClient = Stomp.over(this.socket);
     // Enable debug logs if needed
     this.stompClient.debug = (msg) => console.log("[STOMP DEBUG]:", msg);
    // Optionally disable debug logs
    // this.stompClient.debug = null;

    // Connect to the server
    this.stompClient.connect(
      {}, // Optionally send authentication headers
      (frame) => {
        console.log('Connected:', frame);
        this.connected = true;

        // Subscribe to a topic
        this.stompClient.subscribe("/topic/greetings", (message) => {
          // console.log('Received:', message.body);
          alert(JSON.stringify(message.body)); // Show message in alert (or handle it more appropriately)
        });
      },
      (error) => {
        console.error('Connection error:', error);
        this.connected = false;

        // Attempt reconnection after a delay if an error occurs
        // setTimeout(() => this.connect(), this.reconnectInterval);
      }
    );
  }

  disconnect() {
    if (this.stompClient && this.connected) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
        this.connected = false;
      });
    }
  }

  sendMessage(destination, body) {
    if (this.stompClient && this.connected) {
      this.stompClient.send(destination, JSON.stringify(body), authHeader());
      console.log('Message sent:', body);
    } else {
      console.error('Cannot send message, not connected to WebSocket');
    }
  }
}

export default new StompService();
