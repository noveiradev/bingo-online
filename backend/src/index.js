import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bingoCardRoutes from './routes/bingoCardRoutes.js';
import adminBingoRoutes from './routes/adminBingoRoutes.js';
import bingoPatternRoutes from './routes/bingoPatternRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import selectedCardRoutes  from './routes/selectedCardRoutes.js';
import bingoMarkingRoutes from './routes/markedNumberRoutes.js';
// import playerGameRoutes from './routes/playerGameRoutes.js';

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
// app.use('/api/player', playerGameRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🎉 Bingo Online backend with Turso is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

export default app;