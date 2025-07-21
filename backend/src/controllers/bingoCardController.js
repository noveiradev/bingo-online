import { BingoCard } from '../models/BingoCard.js';

export const getCardById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user.id;

    const { rows } = await BingoCard.findByIdWithReservation(cardId);

    if (rows.length === 0) {
      return res.status(200).json({
        success: false,
        code: 404,
        message: 'Cartón no encontrado.'
      });
    }

    const card = rows[0];

    if (card.reserved_by && String(card.reserved_by) !== String(userId)) {
      return res.status(200).json({
        success: false,
        code: 403,
        message: 'Cartón no disponible. Ya está reservado por otro usuario.'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...card,
        reserved_by_me: card.reserved_by === userId,
        reservation_status: card.payment_status || 'available'
      }
    });
  } catch (err) {
    console.error('Error al buscar el cartón:', err);
    res.status(500).json({ message: 'Error al buscar el cartón.' });
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
    res.status(200).json({
      success: true,
       message: 'No hay cartones disponibles actualmente.',
      data: rows
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
