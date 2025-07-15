import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests 
  message: 'Demasiados intentos de inicio de sesión. Inténtalo de nuevo en 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});