import { BingoCard } from '../models/BingoCard.js';

export const getCardById = async (req, res) => {
  const userId = req.user.id;
  const cardId = req.params.id;

  try {
    const card = await BingoCard.findByIdWithReservation(cardId, userId);

    if (!card) {
      return res.status(200).json({
        success: false,
        message: 'Cartón no disponible o reservado por otro usuario.'
      });
    }

    res.status(200).json({
      success: true,
      data: card
    });
  } catch (err) {
    console.error('Error al obtener el cartón', err);
    res.status(500).json({ message: 'Error al obtener el cartón.' });
  }
};

export const getUserCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rows } = await BingoCard.findAllByUser(userId);

    if (rows.length === 0) {
      return res.status(200).json({
        success: false,
        code: 404,
        message: 'No tienes cartones reservados actualmente.'
      });
    }

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener cartones' });
  }
};

export const getAvailableCards = async (req, res) => {
  try {
    const { rows } = await BingoCard.findAvailable();

    const message =
      rows.length === 0
        ? 'No hay cartones disponibles actualmente.'
        : 'Cartones disponibles encontrados.';

    res.status(200).json({
      success: true,
      message,
      data: rows,
    });
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
      return res.status(200).json({
        success: false,
        code: 400,
        message: 'Cartón no disponible.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cartón reservado con éxito.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al reservar cartón' });
  }
};

export const cancelReservedCard = async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user.id;

    const { rowsAffected } = await BingoCard.cancelReservation(cardId, userId);

    if (rowsAffected === 0) {
      return res.status(200).json({
        success: false,
        code: 400,
        message: 'No se pudo cancelar. Verifica que el cartón esté reservado por ti.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reserva cancelada con éxito.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al cancelar reserva del cartón.' });
  }
};
