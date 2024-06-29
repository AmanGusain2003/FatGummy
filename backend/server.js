import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/index.js';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { saveMessage } from './controllers/message.controller.js';

// dev
import morgan from 'morgan';
config();

const app = express();

app
  .use(cors())
  .use(morgan('tiny'))
  .use(express.json({ limit: '50kb' }))
  .use(express.urlencoded({ extended: true, limit: '50kb' }))
  .use(router);

// Create an HTTP server
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');



    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
      }
    });

    io.on('connect', (socket) => {
      console.log('A user connected: ', socket.id);

      socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
      });
I Play
      socket.on('sendMessage', ({ roomId, messageWithMood }) => {
        io.to(roomId).emit('receiveMessage', messageWithMood);
        // console.log(messageWithMood)
        saveMessage(messageWithMood)
        console.log(`message sent to room id: ${roomId}`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
      });
    });

    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error: ', error.message);
  });
