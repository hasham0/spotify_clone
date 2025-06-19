import 'dotenv/config';
import { Server } from 'socket.io';
import { sendMessageService } from '../../services/message.service.js';

let io;

function initilizeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CROSS_ORIGIN,
      credentials: true,
    },
  });

  const userSockets = new Map();
  const userActivities = new Map();

  // use to store online users
  io.on('connection', (socket) => {
    // connect user
    socket.on('user_connected', (userId) => {
      console.log(`🙍🏻‍♂️ user connected => ${userId}`);
      userSockets.set(userId, socket.id);
      userActivities.set(userId, 'Idle');

      // broadcast online users
      io.emit('user_connected', userId);
      socket.emit('users_online', Array.from(userSockets.keys()));
      io.emit('activities', Array.from(userActivities.entries()));
    });

    // update activity
    socket.on('update_activity', ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit('update_activity', { userId, activity });
    });

    // send message
    socket.on('send_message', async (data) => {
      try {
        const { senderId, receiverId, content } = data;
        const message = await sendMessageService(senderId, receiverId, content);
        const recevierSocketId = userSockets.get(receiverId);
        if (recevierSocketId) {
          io.to(recevierSocketId).emit('received_message', message);
        }
        socket.emit('send_message', message);
      } catch (error) {
        console.error('🚀 ~ socket.on ~ error:', error);
        socket.emit('message_error', error.message);
      }
    });

    // disconnect user
    socket.on('disconnect', () => {
      let disconnectUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectUserId) {
        console.log('❌ Client disconnected:', socket.id);
        io.emit('user_disconnected', disconnectUserId);
      }
    });
  });
}

export { io, initilizeSocket };
