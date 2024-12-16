import { Client } from '@stomp/stompjs';
// import apiClient from '@/services/axios'
import  {authHeader}  from '@/services/authHeader';

class StompService {
  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8083/ws', // Backend WebSocket URL
      connectHeaders: authHeader(),
      // debug: (str) => {
      //   console.log(str); // Log STOMP debug information
      // },
      reconnectDelay: 5000, // Attempt reconnection every 5 seconds
      heartbeatIncoming: 4000, // Server pings
      heartbeatOutgoing: 4000, // Client pings
    });
  }

  connect(onMessage) {
    // Connect to the WebSocket server
    this.client.onConnect = () => {
      console.log('Connected to WebSocket');

      // Subscribe to a topic
      this.client.subscribe('/topic/messages', (message) => {
        onMessage(JSON.parse(message.body)); // Handle received message
      });
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.client.activate(); // Activate the WebSocket connection
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate(); // Disconnect from the WebSocket server
      console.log('Disconnected from WebSocket');
    }
  }

  sendMessage(destination, body) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: destination, // e.g., /app/chat
        body: JSON.stringify(body),
      });
    }
  }
}

export default new StompService();



