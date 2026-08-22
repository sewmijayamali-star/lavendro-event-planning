const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://lavendroeventplanning.vercel.app'],
  credentials: true
}));

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Avendro Event Planning API is running');
});

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



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
