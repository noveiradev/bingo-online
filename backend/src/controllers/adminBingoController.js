import { BingoCard } from '../models/BingoCard.js';

export const getReservedCards = async (req, res) => {
  try {
    const { rows } = await BingoCard.findReservedCards();

    if (rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No hay cartones reservados actualmente.',
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cartones reservados encontrados.',
      data: rows
    });
  } catch (err) {
    console.error('Error al obtener cartones reservados:', err);
    res.status(500).json({ message: 'Error al obtener cartones reservados.' });
  }
};

export const approveReservation = async (req, res) => {
  try {
    const { cardId, userId } = req.body;
    const { rowsAffected } = await BingoCard.approveReservation(cardId, userId);

    if (rowsAffected === 0) {
      return res.status(200).json({ success: false, message: 'No se pudo aprobar la reserva. Verifica los datos.' });
    }

    res.json({ message: 'Reserva aprobada exitosamente.' });
  } catch (err) {
    console.error('Error al aprobar reserva:', err);
    res.status(500).json({ message: 'Error al aprobar reserva.' });
  }
};

export const rejectReservation = async (req, res) => {
  try {
    const { cardId, userId } = req.body;
    const { rowsAffected } = await BingoCard.rejectReservation(cardId, userId);

    if (rowsAffected === 0) {
      return res.status(200).json({ success: false, message: 'No se pudo rechazar la reserva. Verifica los datos.' });
    }

    res.json({ message: 'Reserva rechazada y cartón liberado exitosamente.' });
  } catch (err) {
    console.error('Error al rechazar reserva:', err);
    res.status(500).json({ message: 'Error al rechazar reserva.' });
  }
};

export const approveAllReservations = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Solicitud inválida.'
      });
    }

    const { rowsAffected } = await BingoCard.approveAllReservationsByUser(userId);

    if (rowsAffected === 0) {
      return res.status(200).json({
        success: false,
        message: 'No hay reservaciones disponibles para validar.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Se aprobaron ${rowsAffected} reservaciones exitosamente.`
    });

  } catch (err) {
    console.error('Error al aprobar todas las reservaciones:', err);
    res.status(500).json({
      success: false,
      message: 'Ocurrió un error al procesar la solicitud.'
    });
  }
};