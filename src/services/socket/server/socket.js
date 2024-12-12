// const http = require('http');
// const { Server } = require('socket.io');

// const server = http.createServer();
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Allow all origins for testing
//     methods: ['GET', 'POST'],
//   },
// });

// const users = {}; // Store connected users with their socket IDs

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Register a user with their userId when they connect
//   socket.on('register', (userId) => {
//     users[userId] = socket.id; // Map userId to socket.id
//     console.log('User registered:', userId);
//   });

//   // Handle private messages
//   socket.on('chatMessage', ({ to, message }) => {
//     console.log(message)
//     const targetSocketId = users[to]; // Get the recipient's socket ID
//     if (targetSocketId) {
//       io.to(targetSocketId).emit('chatMessage', {
//         from: socket.id,
//         message,
//       });
//     } else {
//       console.log('User not connected:', to);
//     }
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     // Remove the user from the users list
//     for (const userId in users) {
//       if (users[userId] === socket.id) {
//         delete users[userId];
//         console.log('User disconnected:', userId);
//         break;
//       }
//     }
//   });
// });

// server.listen(4000, () => {
//   console.log('Socket.IO server running on http://localhost:3000');
// });

const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (ws) => {
  console.log("Client connected");
  ws.on('message', (message) => {
    console.log("Message received:", message);
    ws.send(`Echo: ${message}`);
  });

  ws.send("Welcome to WebSocket server");
});

