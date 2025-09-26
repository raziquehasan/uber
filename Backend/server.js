
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);

// --- SOCKET.IO SETUP ---
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://68d638fe5be09836e22ea836--ubercreatedbyrazique.netlify.app',
      'https://ubercreatedbyrazique.netlify.app',
      /\.netlify\.app$/
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
// --- END SOCKET.IO SETUP ---

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
