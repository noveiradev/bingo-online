import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes 

// Routes for authentication
app.use('/api/auth', authRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🎉 Bingo Online backend with Turso is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

export default app;