import { BingoCard } from '../models/BingoCard.js';

export const getUserCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rows } = await BingoCard.findAllByUser(userId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cartones' });
  }
};

export const getAvailableCards = async (req, res) => {
  try {
    const { rows } = await BingoCard.findAvailable();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cartones disponibles' });
  }
};

export const reserveCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user.id;

    const { rowsAffected } = await BingoCard.reserve(cardId, userId);

    if (rowsAffected === 0) {
      return res.status(400).json({ message: 'Cartón no disponible.' });
    }

    res.json({ message: 'Cartón reservado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al reservar cartón' });
  }
};