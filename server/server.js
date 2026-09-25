const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Create HTTP server
const server = http.createServer(app);

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://lavendroeventplanning.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.set('io', io);

app.use(express.json());

// Database connection
connectDB();

// Socket.IO connection
// Socket.IO connection
io.on('connection', (socket) => {
  console.log('⚡ User connected:', socket.id);

  // Join a support conversation room
  socket.on('join_conversation', (conversationId) => {

    socket.join(conversationId);

    console.log(
      `👤 User ${socket.id} joined conversation: ${conversationId}`
    );
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});
// Test route
app.get('/', (req, res) => {
  res.send('Lavendro Event Planning API is running');
});

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const inquiryRoutes = require('./routes/inquiries');
app.use('/api/inquiries', inquiryRoutes);

const packageRoutes = require('./routes/packages');
app.use('/api/packages', packageRoutes);

const menuRoutes = require('./routes/menus');
app.use('/api/menus', menuRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);



const venueRoutes = require('./routes/venues');
app.use('/api/venues', venueRoutes);

const adminInvitationRoutes = require('./routes/adminInvitationRoutes');
app.use('/api/admin/invitations', adminInvitationRoutes);

const supportRoutes = require('./routes/supportRoutes');
app.use('/api/support', supportRoutes);

// Temporary test route
app.get('/api/admin/invitations/test', (req, res) => {
  res.json({
    success: true,
    message: 'Admin invitation routes are working'
  });
});

const supportInvitationRoutes = require('./routes/supportInvitationRoutes');

app.use(
  '/api/support/invitations',
  supportInvitationRoutes
);

const eventPlannerInvitationRoutes =
  require('./routes/eventPlannerInvitationRoutes');

app.use(
  '/api/admin/event-planners',
  eventPlannerInvitationRoutes
);

app.use(
  '/api/event-planner/invitations',
  eventPlannerInvitationRoutes
);
app.use(
  '/api/event-planner/invitations',
  eventPlannerInvitationRoutes
);

const eventPlannerRoutes =
  require('./routes/eventPlannerRoutes');

app.use(
  '/api/admin/event-planners',
  eventPlannerRoutes
);
 const publicEventPlannerRoutes =
  require('./routes/publicEventPlannerRoutes');

app.use(
  '/api/event-planners',
  publicEventPlannerRoutes
);



const PORT = process.env.PORT || 5000;

// IMPORTANT: Use server.listen(), NOT app.listen()
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});