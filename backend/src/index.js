import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import http from 'http';

import { initSocket } from './sockets/socket.js'; 
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bingoCardRoutes from './routes/bingoCardRoutes.js';
import adminBingoRoutes from './routes/adminBingoRoutes.js';
import bingoPatternRoutes from './routes/bingoPatternRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import selectedCardRoutes  from './routes/selectedCardRoutes.js';
import bingoMarkingRoutes from './routes/markedNumberRoutes.js';
import playerGameRoutes from './routes/playerGameRoutes.js';
import mobilePaymentRoutes from './routes/mobilePaymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes 

// Routes for authentication
app.use('/api/auth', authRoutes);

// Routes for user profile
app.use('/api/user', userRoutes);

// Routes for bingo cards
app.use('/api/cards', bingoCardRoutes);

// Routes for admin bingo management
app.use('/api/admin/cards', adminBingoRoutes);

// Routes for bingo patterns
app.use('/api/patterns', bingoPatternRoutes);

// Routes for game management
app.use('/api/game', gameRoutes);

// Routes for user cards
app.use('/api/selected-cards', selectedCardRoutes);

// Routes for marking numbers in bingo
app.use('/api/marked-numbers', bingoMarkingRoutes);

// Routes for player game actions
app.use('/api/player', playerGameRoutes);

// Routes for mobile payments
app.use('/api/payments', mobilePaymentRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🎉 Bingo Online backend with Turso is running!');
});

// Create server http
const server = http.createServer(app);

// Initialize socket.io with the server
initSocket(server);

// Start the server 
server.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

export default app;