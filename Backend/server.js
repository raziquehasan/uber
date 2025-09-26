
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);

// --- SOCKET.IO SETUP ---
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
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
